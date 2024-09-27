package controllers

import (
	"Sila/config"
	"Sila/models"
	"Sila/utils"
	"github.com/gofiber/fiber/v2"
	"strconv"
	"time"
)

func getSessionIDFromParams(c *fiber.Ctx) (int, error) {
	sessionID, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return 0, fiber.NewError(fiber.StatusBadRequest, "Invalid session ID")
	}
	return sessionID, nil
}

// StartWorkoutSession godoc
// @Summary Start a workout session
// @Description This endpoint starts a workout session for a specific exercise and optionally returns the last completed session if available.
// @Tags Workout
// @Accept json
// @Produce json
// @Param data body models.StartWorkoutRequest true "Exercise ID"
// @Success 200 {object} models.StartWorkoutResponse "New workout session and last session (if any)"
// @Failure 400 {object} map[string]string "Invalid input or Exercise ID missing"
// @Failure 500 {object} map[string]string "Failed to start workout session"
// @Router /workout/start [post]
func StartWorkoutSession(c *fiber.Ctx) error {
	var req models.StartWorkoutRequest
	lang := utils.GetLanguage(c)

	if err := c.BodyParser(&req); err != nil {
		return utils.HandleError(c, fiber.StatusBadRequest, "Invalid input", err.Error())
	}

	if req.ExerciseID == 0 {
		return utils.HandleError(c, fiber.StatusBadRequest, "Exercise ID is required", "")
	}

	var exercise models.Exercise
	if err := config.DB.First(&exercise, req.ExerciseID).Error; err != nil {
		return utils.HandleError(c, fiber.StatusBadRequest, "Exercise not found", err.Error())
	}

	user, err := utils.GetUserFromContext(c)
	if err != nil {
		return err
	}

	session := models.WorkoutSession{
		UserID:     user.ID,
		ExerciseID: req.ExerciseID,
	}

	if err := config.DB.Create(&session).Error; err != nil {
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to start workout session", err.Error())
	}

	var lastSession models.WorkoutSession
	if err := config.DB.
		Where("user_id = ? AND exercise_id = ? AND is_completed = ?", user.ID, req.ExerciseID, true).
		Order("created_at DESC").
		Preload("Sets").
		Preload("Exercise.MuscleGroup").
		First(&lastSession).Error; err != nil {
		return c.JSON(fiber.Map{
			"session_id":   session.ID,
			"is_completed": session.IsCompleted,
			"created_at":   session.CreatedAt,
			"last_session": nil,
		})
	}

	exerciseName := exercise.NameEng
	muscleGroupName := lastSession.Exercise.MuscleGroup.NameEng
	if lang == "ru" {
		exerciseName = exercise.NameRu
		muscleGroupName = lastSession.Exercise.MuscleGroup.NameRu
	}

	lastSessionResponse := models.WorkoutSessionResponse{
		ID:          lastSession.ID,
		Note:        lastSession.Note,
		IsCompleted: lastSession.IsCompleted,
		CreatedAt:   lastSession.CreatedAt,
		Sets:        lastSession.Sets,
	}
	lastSessionResponse.Exercise.ID = lastSession.Exercise.ID
	lastSessionResponse.Exercise.Name = exerciseName
	lastSessionResponse.Exercise.MuscleGroup.ID = lastSession.Exercise.MuscleGroup.ID
	lastSessionResponse.Exercise.MuscleGroup.Name = muscleGroupName

	return c.JSON(fiber.Map{
		"session_id":   session.ID,
		"is_completed": session.IsCompleted,
		"created_at":   session.CreatedAt,
		"last_session": lastSessionResponse,
	})
}

// AddSetToWorkout godoc
// @Summary Add a set to a workout session
// @Description This endpoint allows adding a set (reps and weight) to an ongoing workout session.
// @Tags Workout
// @Accept json
// @Produce json
// @Param id path int true "Workout session ID"
// @Param data body models.AddSetRequest true "Set data"
// @Success 200 {object} map[string]interface{} "Set added successfully"
// @Failure 400 {object} map[string]string "Invalid input or session ID"
// @Failure 404 {object} map[string]string "Workout session not found"
// @Failure 500 {object} map[string]string "Failed to add set"
// @Router /workout/add-set/{id} [post]
func AddSetToWorkout(c *fiber.Ctx) error {
	sessionID, err := getSessionIDFromParams(c)
	if err != nil {
		return utils.HandleError(c, fiber.StatusBadRequest, "Invalid session ID", err.Error())
	}

	var req models.AddSetRequest

	if err := c.BodyParser(&req); err != nil {
		return utils.HandleError(c, fiber.StatusBadRequest, "Invalid input", err.Error())
	}

	if req.Weight <= 0 || req.Reps <= 0 {
		return utils.HandleError(c, fiber.StatusBadRequest, "Weight and Reps must be greater than 0", "")
	}

	var session models.WorkoutSession
	if err := config.DB.First(&session, sessionID).Error; err != nil {
		return utils.HandleError(c, fiber.StatusNotFound, "Workout session not found", err.Error())
	}

	set := models.Set{
		WorkoutSessionID: sessionID,
		Weight:           req.Weight,
		Reps:             req.Reps,
	}

	if err := config.DB.Create(&set).Error; err != nil {
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to add set to workout session", err.Error())
	}

	return c.JSON(fiber.Map{
		"id":     set.ID,
		"weight": set.Weight,
		"reps":   set.Reps,
	})
}

// CompleteWorkoutSession godoc
// @Summary Complete a workout session
// @Description Marks a workout session as completed and allows adding a final note.
// @Tags Workout
// @Accept json
// @Produce json
// @Param id path int true "Workout session ID"
// @Param data body models.CompleteWorkoutRequest true "Completion note"
// @Success 200 {object} map[string]interface{} "Workout session completed successfully"
// @Failure 400 {object} map[string]string "Invalid input or session ID"
// @Failure 404 {object} map[string]string "Workout session not found"
// @Failure 500 {object} map[string]string "Failed to complete workout session"
// @Router /workout/complete/{id} [put]
func CompleteWorkoutSession(c *fiber.Ctx) error {
	sessionID, err := getSessionIDFromParams(c)
	if err != nil {
		return utils.HandleError(c, fiber.StatusBadRequest, "Invalid session ID", err.Error())
	}

	var session models.WorkoutSession
	if err := config.DB.First(&session, sessionID).Error; err != nil {
		return utils.HandleError(c, fiber.StatusNotFound, "Workout session not found", err.Error())
	}

	var req models.CompleteWorkoutRequest

	if err := c.BodyParser(&req); err != nil {
		return utils.HandleError(c, fiber.StatusBadRequest, "Invalid input", err.Error())
	}

	session.IsCompleted = true
	session.Note = req.Note

	if err := config.DB.Save(&session).Error; err != nil {
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to complete workout session", err.Error())
	}

	return c.JSON(fiber.Map{
		"session_id":   session.ID,
		"is_completed": session.IsCompleted,
		"created_at":   session.CreatedAt,
		"note":         session.Note,
	})
}

// GetWorkoutSession godoc
// @Summary Get details of a workout session
// @Description Retrieve details of a specific workout session including sets, exercise info, and muscle group.
// @Tags Workout
// @Accept json
// @Produce json
// @Param id path int true "Workout session ID"
// @Success 200 {object} models.WorkoutSessionResponse "Workout session details"
// @Failure 400 {object} map[string]string "Invalid session ID"
// @Failure 404 {object} map[string]string "Workout session not found"
// @Router /workout/{id} [get]
func GetWorkoutSession(c *fiber.Ctx) error {
	sessionID, err := getSessionIDFromParams(c)
	lang := utils.GetLanguage(c)

	if err != nil {
		return utils.HandleError(c, fiber.StatusBadRequest, "Invalid session ID", err.Error())
	}

	var session models.WorkoutSession
	if err := config.DB.Preload("Sets").Preload("Exercise.MuscleGroup").First(&session, sessionID).Error; err != nil {
		return utils.HandleError(c, fiber.StatusNotFound, "Workout session not found", err.Error())
	}

	exerciseName := session.Exercise.NameEng
	muscleGroupName := session.Exercise.MuscleGroup.NameEng
	if lang == "ru" {
		exerciseName = session.Exercise.NameRu
		muscleGroupName = session.Exercise.MuscleGroup.NameRu
	}

	response := models.WorkoutSessionResponse{
		ID:          session.ID,
		Note:        session.Note,
		IsCompleted: session.IsCompleted,
		CreatedAt:   session.CreatedAt,
		Sets:        make([]models.Set, 0),
	}

	if len(session.Sets) > 0 {
		response.Sets = session.Sets
	}

	response.Exercise.ID = session.Exercise.ID
	response.Exercise.Name = exerciseName
	response.Exercise.MuscleGroup.ID = session.Exercise.MuscleGroup.ID
	response.Exercise.MuscleGroup.Name = muscleGroupName

	return c.JSON(response)
}

// GetIncompleteWorkouts godoc
// @Summary Get incomplete workout sessions
// @Description Retrieve all incomplete workout sessions for the authenticated user, with support for different languages.
// @Tags Workout
// @Produce json
// @Success 200 {array} models.IncompleteWorkoutResponse "List of incomplete workouts"
// @Failure 500 {object} map[string]interface{} "Failed to retrieve incomplete workouts"
// @Router /workout/incomplete [get]
func GetIncompleteWorkouts(c *fiber.Ctx) error {
	user, err := utils.GetUserFromContext(c)
	if err != nil {
		return err
	}

	lang := utils.GetLanguage(c)
	var sessions []models.WorkoutSession
	if err := config.DB.Where("user_id = ? AND is_completed = ?", user.ID, false).
		Order("created_at DESC").
		Preload("Exercise.MuscleGroup").Preload("Sets").Find(&sessions).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Failed to retrieve incomplete workouts",
				"details": err.Error(),
			},
		})
	}

	type MuscleGroupResponse struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	}

	type ExerciseResponse struct {
		ID          int                 `json:"id"`
		Name        string              `json:"name"`
		MuscleGroup MuscleGroupResponse `json:"muscle_group"`
	}

	type IncompleteWorkoutResponse struct {
		ID          int              `json:"id"`
		Note        string           `json:"note,omitempty"`
		IsCompleted bool             `json:"is_completed"`
		CreatedAt   time.Time        `json:"created_at"`
		Exercise    ExerciseResponse `json:"exercise"`
		Sets        []models.Set     `json:"sets,omitempty"`
	}

	response := make([]IncompleteWorkoutResponse, 0)

	for _, session := range sessions {
		exerciseName := session.Exercise.NameEng
		muscleGroupName := session.Exercise.MuscleGroup.NameEng

		if lang == "ru" {
			exerciseName = session.Exercise.NameRu
			muscleGroupName = session.Exercise.MuscleGroup.NameRu
		}

		incompleteWorkoutResponse := IncompleteWorkoutResponse{
			ID:          session.ID,
			Note:        session.Note,
			IsCompleted: session.IsCompleted,
			CreatedAt:   session.CreatedAt,
			Exercise: ExerciseResponse{
				ID:   session.Exercise.ID,
				Name: exerciseName,
				MuscleGroup: MuscleGroupResponse{
					ID:   session.Exercise.MuscleGroup.ID,
					Name: muscleGroupName,
				},
			},
			Sets: session.Sets,
		}

		response = append(response, incompleteWorkoutResponse)
	}

	return c.JSON(response)
}

// GetWorkoutsByExercise godoc
// @Summary Get workout sessions by exercise
// @Description Retrieve paginated workout sessions for a specific exercise for the authenticated user, with support for different languages.
// @Tags Workout
// @Accept json
// @Produce json
// @Param exercise_id path int true "Exercise ID"
// @Param limit query int false "Limit the number of results"
// @Param offset query int false "Offset for pagination"
// @Success 200 {object} map[string]interface{} "Paginated list of workout sessions"
// @Failure 400 {object} map[string]string "Invalid exercise ID"
// @Failure 500 {object} map[string]string "Failed to retrieve workout sessions"
// @Router /workout/exercise/{exercise_id} [get]
func GetWorkoutsByExercise(c *fiber.Ctx) error {
	user, err := utils.GetUserFromContext(c)
	if err != nil {
		return err
	}

	exerciseID, err := strconv.Atoi(c.Params("exercise_id"))
	if err != nil {
		return utils.HandleError(c, fiber.StatusBadRequest, "Invalid exercise ID", err.Error())
	}

	limit, _ := strconv.Atoi(c.Query("limit", "10"))
	offset, _ := strconv.Atoi(c.Query("offset", "0"))

	var total int64
	config.DB.Model(&models.WorkoutSession{}).Where("user_id = ? AND exercise_id = ?", user.ID, exerciseID).Count(&total)

	var sessions []models.WorkoutSession
	if err := config.DB.Where("user_id = ? AND exercise_id = ?", user.ID, exerciseID).
		Order("created_at DESC").
		Offset(offset).Limit(limit).
		Preload("Exercise.MuscleGroup").Preload("Sets").
		Find(&sessions).Error; err != nil {
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to retrieve workout sessions", err.Error())
	}

	lang := utils.GetLanguage(c)
	response := make([]models.IncompleteWorkoutResponse, 0)

	for _, session := range sessions {
		exerciseName := session.Exercise.NameEng
		muscleGroupName := session.Exercise.MuscleGroup.NameEng
		if lang == "ru" {
			exerciseName = session.Exercise.NameRu
			muscleGroupName = session.Exercise.MuscleGroup.NameRu
		}

		workoutResponse := models.IncompleteWorkoutResponse{
			ID:          session.ID,
			Note:        session.Note,
			IsCompleted: session.IsCompleted,
			CreatedAt:   session.CreatedAt,
			Exercise: models.Exercise{
				ID:      session.Exercise.ID,
				NameEng: exerciseName,
				MuscleGroup: models.MuscleGroup{
					ID:      session.Exercise.MuscleGroup.ID,
					NameEng: muscleGroupName,
				},
			},
			Sets: session.Sets,
		}

		response = append(response, workoutResponse)
	}

	return c.JSON(fiber.Map{
		"items": response,
		"total": total,
	})
}
