package handlers

import (
	"Sila/config"
	"Sila/internal/models"
	"Sila/pkg/types"
	"Sila/utils"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// CreatePlan creates a new training plan
// CreatePlan godoc
// @Summary Create a new training plan
// @Description Create a new training plan for the authenticated user.
// @Tags Plans
// @Accept json
// @Produce json
// @Param plan body models.CreatePlanRequest true "Plan data"
// @Success 201 {object} models.PlanSummaryResponse "Created plan summary"
// @Failure 400 {object} models.ErrorResponse "Invalid request body"
// @Failure 500 {object} models.ErrorResponse "Failed to create plan"
// @Router /plans [post]
// @Security BearerAuth
func CreatePlan(c *fiber.Ctx) error {
	user, err := utils.GetUserFromContext(c)
	if err != nil {
		return err
	}

	var req models.CreatePlanRequest
	if err := c.BodyParser(&req); err != nil {
		return utils.HandleError(c, fiber.StatusBadRequest, "Invalid request body", err.Error())
	}

	plan := models.Plan{
		Name:        req.Name,
		Description: req.Description,
		UserID:      user.ID,
	}

	tx := config.DB.Begin()

	if err := tx.Create(&plan).Error; err != nil {
		tx.Rollback()
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to create plan", err.Error())
	}

	for _, exerciseReq := range req.Exercises {
		planExercise := models.PlanExercise{
			PlanID:      plan.ID,
			ExerciseID:  exerciseReq.ExerciseID,
			Order:       exerciseReq.Order,
			Description: exerciseReq.Description,
		}
		if err := tx.Create(&planExercise).Error; err != nil {
			tx.Rollback()
			return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to create plan exercises", err.Error())
		}
	}

	if err := tx.Commit().Error; err != nil {
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to commit transaction", err.Error())
	}

	response := models.PlanSummaryResponse{
		ID:          plan.ID,
		Name:        plan.Name,
		Description: plan.Description,
	}

	return c.Status(fiber.StatusCreated).JSON(response)
}

// GetPlans godoc
// @Summary Get all training plans
// @Description Get all training plans for the authenticated user.
// @Tags Plans
// @Produce json
// @Param limit query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {object} models.PaginatedPlanResponse "Paginated list of plans"
// @Failure 500 {object} models.ErrorResponse "Failed to retrieve plans"
// @Router /plans [get]
// @Security BearerAuth
func GetPlans(c *fiber.Ctx) error {
	user, err := utils.GetUserFromContext(c)
	if err != nil {
		return err
	}

	var query types.PaginationQuery
	if err := c.QueryParser(&query); err != nil {
		return utils.HandleError(c, fiber.StatusBadRequest, "Invalid pagination parameters", err.Error())
	}
	query.SetDefaults()

	var total int64
	config.DB.Model(&models.Plan{}).Where("user_id = ?", user.ID).Count(&total)

	var plans []models.Plan
	if err := config.DB.Where("user_id = ?", user.ID).Offset(query.Offset).Limit(query.Limit).Preload("Exercises.Exercise.MuscleGroup").Find(&plans).Error; err != nil {
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to retrieve plans", err.Error())
	}

	lang := utils.GetLanguage(c)
	var response []models.PlanDetailResponse
	for _, plan := range plans {
		var exerciseResponses []models.PlanExerciseResponse
		for _, pe := range plan.Exercises {
			exerciseName := pe.Exercise.NameEng
			muscleGroupName := pe.Exercise.MuscleGroup.NameEng
			if lang == "ru" {
				exerciseName = pe.Exercise.NameRu
				muscleGroupName = pe.Exercise.MuscleGroup.NameRu
			}

			exerciseResponses = append(exerciseResponses, models.PlanExerciseResponse{
				Order:       pe.Order,
				Description: pe.Description,
				Exercise: models.ExerciseResponse{
					ID:   pe.Exercise.ID,
					Name: exerciseName,
					MuscleGroup: models.GetMuscleGroupsResponse{
						ID:   pe.Exercise.MuscleGroup.ID,
						Name: muscleGroupName,
					},
				},
			})
		}

		response = append(response, models.PlanDetailResponse{
			ID:          plan.ID,
			Name:        plan.Name,
			Description: plan.Description,
			Exercises:   exerciseResponses,
		})
	}

	return c.JSON(models.PaginatedPlanResponse{
		Items: response,
		Total: total,
	})
}

// GetPlan godoc
// @Summary Get a single training plan
// @Description Get a single training plan by ID for the authenticated user.
// @Tags Plans
// @Produce json
// @Param id path int true "Plan ID"
// @Success 200 {object} models.PlanDetailResponse "Plan details"
// @Failure 404 {object} models.ErrorResponse "Plan not found"
// @Failure 500 {object} models.ErrorResponse "Failed to retrieve plan"
// @Router /plans/{id} [get]
// @Security BearerAuth
func GetPlan(c *fiber.Ctx) error {
	user, err := utils.GetUserFromContext(c)
	if err != nil {
		return err
	}

	planID := c.Params("id")
	var plan models.Plan
	if err := config.DB.Where("id = ? AND user_id = ?", planID, user.ID).Preload("User").Preload("Exercises.Exercise.MuscleGroup").First(&plan).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return utils.HandleError(c, fiber.StatusNotFound, "Plan not found", "")
		}
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to retrieve plan", err.Error())
	}

	lang := utils.GetLanguage(c)
	var exerciseResponses []models.PlanExerciseResponse
	for _, pe := range plan.Exercises {
		exerciseName := pe.Exercise.NameEng
		muscleGroupName := pe.Exercise.MuscleGroup.NameEng
		if lang == "ru" {
			exerciseName = pe.Exercise.NameRu
			muscleGroupName = pe.Exercise.MuscleGroup.NameRu
		}

		exerciseResponses = append(exerciseResponses, models.PlanExerciseResponse{
			Order:       pe.Order,
			Description: pe.Description,
			Exercise: models.ExerciseResponse{
				ID:   pe.Exercise.ID,
				Name: exerciseName,
				MuscleGroup: models.GetMuscleGroupsResponse{
					ID:   pe.Exercise.MuscleGroup.ID,
					Name: muscleGroupName,
				},
			},
		})
	}

	response := models.PlanDetailResponse{
		ID:          plan.ID,
		Name:        plan.Name,
		Description: plan.Description,
		Exercises:   exerciseResponses,
		User: models.UserBasicInfo{
			ID:        plan.User.ID,
			Username:  plan.User.Username,
			Email:     plan.User.Email,
			AvatarURL: plan.User.AvatarURL,
		},
	}

	return c.JSON(response)
}

// UpdatePlan godoc
// @Summary Update a training plan
// @Description Update an existing training plan for the authenticated user.
// @Tags Plans
// @Accept json
// @Produce json
// @Param id path int true "Plan ID"
// @Param plan body models.UpdatePlanRequest true "Plan data"
// @Success 200 {object} models.PlanDetailResponse "Updated plan details"
// @Failure 400 {object} models.ErrorResponse "Invalid request body"
// @Failure 404 {object} models.ErrorResponse "Plan not found"
// @Failure 500 {object} models.ErrorResponse "Failed to update plan"
// @Router /plans/{id} [put]
// @Security BearerAuth
func UpdatePlan(c *fiber.Ctx) error {
	user, err := utils.GetUserFromContext(c)
	if err != nil {
		return err
	}

	planID := c.Params("id")
	var plan models.Plan
	if err := config.DB.Where("id = ? AND user_id = ?", planID, user.ID).First(&plan).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return utils.HandleError(c, fiber.StatusNotFound, "Plan not found", "")
		}
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to retrieve plan", err.Error())
	}

	var req models.UpdatePlanRequest
	if err := c.BodyParser(&req); err != nil {
		return utils.HandleError(c, fiber.StatusBadRequest, "Invalid request body", err.Error())
	}

	plan.Name = req.Name
	plan.Description = req.Description

	tx := config.DB.Begin()

	if err := tx.Save(&plan).Error; err != nil {
		tx.Rollback()
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to update plan", err.Error())
	}

	if err := tx.Where("plan_id = ?", plan.ID).Delete(&models.PlanExercise{}).Error; err != nil {
		tx.Rollback()
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to delete old plan exercises", err.Error())
	}

	for _, exerciseReq := range req.Exercises {
		planExercise := models.PlanExercise{
			PlanID:      plan.ID,
			ExerciseID:  exerciseReq.ExerciseID,
			Order:       exerciseReq.Order,
			Description: exerciseReq.Description,
		}
		if err := tx.Create(&planExercise).Error; err != nil {
			tx.Rollback()
			return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to create new plan exercises", err.Error())
		}
	}

	if err := tx.Commit().Error; err != nil {
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to commit transaction", err.Error())
	}

	if err := config.DB.Where("id = ?", plan.ID).Preload("Exercises.Exercise.MuscleGroup").First(&plan).Error; err != nil {
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to retrieve updated plan", err.Error())
	}

	lang := utils.GetLanguage(c)
	var exerciseResponses []models.PlanExerciseResponse
	for _, pe := range plan.Exercises {
		exerciseName := pe.Exercise.NameEng
		muscleGroupName := pe.Exercise.MuscleGroup.NameEng
		if lang == "ru" {
			exerciseName = pe.Exercise.NameRu
			muscleGroupName = pe.Exercise.MuscleGroup.NameRu
		}

		exerciseResponses = append(exerciseResponses, models.PlanExerciseResponse{
			Order:       pe.Order,
			Description: pe.Description,
			Exercise: models.ExerciseResponse{
				ID:   pe.Exercise.ID,
				Name: exerciseName,
				MuscleGroup: models.GetMuscleGroupsResponse{
					ID:   pe.Exercise.MuscleGroup.ID,
					Name: muscleGroupName,
				},
			},
		})
	}

	response := models.PlanDetailResponse{
		ID:          plan.ID,
		Name:        plan.Name,
		Description: plan.Description,
		Exercises:   exerciseResponses,
	}

	return c.JSON(response)
}

// DeletePlan godoc
// @Summary Delete a training plan
// @Description Delete a training plan by ID for the authenticated user.
// @Tags Plans
// @Param id path int true "Plan ID"
// @Success 204 "No Content"
// @Failure 404 {object} models.ErrorResponse "Plan not found"
// @Failure 500 {object} models.ErrorResponse "Failed to delete plan"
// @Router /plans/{id} [delete]
// @Security BearerAuth
func DeletePlan(c *fiber.Ctx) error {
	user, err := utils.GetUserFromContext(c)
	if err != nil {
		return err
	}

	planID := c.Params("id")
	tx := config.DB.Begin()

	if err := tx.Where("plan_id = ?", planID).Delete(&models.PlanExercise{}).Error; err != nil {
		tx.Rollback()
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to delete plan exercises", err.Error())
	}

	if err := tx.Where("id = ? AND user_id = ?", planID, user.ID).Delete(&models.Plan{}).Error; err != nil {
		tx.Rollback()
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to delete plan", err.Error())
	}

	if err := tx.Commit().Error; err != nil {
		return utils.HandleError(c, fiber.StatusInternalServerError, "Failed to commit transaction", err.Error())
	}

	return c.SendStatus(fiber.StatusNoContent)
}
