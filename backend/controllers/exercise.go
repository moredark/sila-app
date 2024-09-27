package controllers

import (
	"Sila/config"
	"Sila/models"
	"Sila/utils"
	"github.com/gofiber/fiber/v2"
)

// GetExercises godoc
// @Summary Get all exercises
// @Description Get a list of all exercises with information on muscle groups in the requested language (English or Russian). Supports filtering by muscle_group_id and searching by name.
// @Tags Exercises
// @Param muscle_group_id query int false "Filter by muscle group ID"
// @Param search query string false "Search by exercise name (both in Russian and English)"
// @Produce json
// @Success 200 {array} models.ExerciseResponse "List of exercises"
// @Failure 500 {object} map[string]string "Failed to retrieve exercises"
// @Router /exercises [get]
func GetExercises(c *fiber.Ctx) error {
	var exercises []models.Exercise

	muscleGroupID := c.Query("muscle_group_id")
	search := c.Query("search")

	query := config.DB.Preload("MuscleGroup")

	if muscleGroupID != "" {
		query = query.Where("muscle_group_id = ?", muscleGroupID)
	}

	if search != "" {
		searchPattern := "%" + search + "%"
		query = query.Where("name_ru ILIKE ? OR name_eng ILIKE ?", searchPattern, searchPattern)
	}

	if err := query.Find(&exercises).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to retrieve exercises", "details": err.Error()})
	}

	lang := utils.GetLanguage(c)

	response := make([]fiber.Map, 0)
	for _, exercise := range exercises {
		var (
			name            string
			description     string
			muscleGroupName string
		)

		if lang == "ru" {
			name = exercise.NameRu
			description = exercise.DescriptionRu
			muscleGroupName = exercise.MuscleGroup.NameRu
		} else {
			name = exercise.NameEng
			description = exercise.DescriptionEng
			muscleGroupName = exercise.MuscleGroup.NameEng
		}

		response = append(response, fiber.Map{
			"id":          exercise.ID,
			"name":        name,
			"description": description,
			"muscle_group": fiber.Map{
				"id":   exercise.MuscleGroup.ID,
				"name": muscleGroupName,
			},
			"created_at": exercise.CreatedAt,
		})
	}

	return c.JSON(response)
}

// CreateExercise godoc
// @Summary Create a new exercise
// @Description Create a new exercise with names in both English and Russian, and specify the muscle group.
// @Tags Exercises
// @Accept json
// @Produce json
// @Param exercise body models.CreateExerciseRequest true "Create new exercise"
// @Success 200 {object} models.Exercise "Created exercise"
// @Failure 400 {object} map[string]string "Invalid input"
// @Failure 500 {object} map[string]string "Failed to create exercise"
// @Router /exercises [post]
func CreateExercise(c *fiber.Ctx) error {
	var req models.CreateExerciseRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Invalid input",
				"details": err.Error(),
			},
		})
	}

	errors := make(map[string]string)
	if req.NameEng == "" {
		errors["name_eng"] = "English name is required"
	}
	if req.NameRu == "" {
		errors["name_ru"] = "Russian name is required"
	}
	if req.MuscleGroupID == 0 {
		errors["muscle_group_id"] = "Muscle group ID is required"
	}

	if len(errors) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": errors,
		})
	}

	exercise := models.Exercise{
		NameEng:        req.NameEng,
		NameRu:         req.NameRu,
		DescriptionEng: req.DescriptionEng,
		DescriptionRu:  req.DescriptionRu,
		ImageURL:       req.ImageURL,
		MuscleGroupID:  req.MuscleGroupID,
	}

	if err := config.DB.Create(&exercise).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Failed to create exercise",
				"details": err.Error(),
			},
		})
	}

	if err := config.DB.Preload("MuscleGroup").First(&exercise, exercise.ID).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Failed to load muscle group",
				"details": err.Error(),
			},
		})
	}

	return c.JSON(exercise)
}

// UpdateExercise godoc
// @Summary Update an existing exercise
// @Description Update an existing exercise with new names in both English and Russian, and update the muscle group.
// @Tags Exercises
// @Accept json
// @Produce json
// @Param id path int true "Exercise ID"
// @Param exercise body models.UpdateExerciseRequest true "Update exercise"
// @Success 200 {object} models.Exercise "Updated exercise"
// @Failure 400 {object} map[string]string "Invalid input"
// @Failure 404 {object} map[string]string "Exercise not found"
// @Failure 500 {object} map[string]string "Failed to update exercise"
// @Router /exercises/{id} [put]
func UpdateExercise(c *fiber.Ctx) error {
	exerciseID := c.Params("id")
	if exerciseID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Map{
				"id": "Exercise ID is required",
			},
		})
	}

	var exercise models.Exercise
	if err := config.DB.First(&exercise, exerciseID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Exercise not found",
				"details": err.Error(),
			},
		})
	}

	var req models.UpdateExerciseRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Invalid input",
				"details": err.Error(),
			},
		})
	}

	errors := make(map[string]string)
	if req.NameEng == "" {
		errors["name_eng"] = "English name is required"
	}
	if req.NameRu == "" {
		errors["name_ru"] = "Russian name is required"
	}
	if req.MuscleGroupID == 0 {
		errors["muscle_group_id"] = "Muscle group ID is required"
	}

	if len(errors) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": errors,
		})
	}

	exercise.NameEng = req.NameEng
	exercise.NameRu = req.NameRu
	exercise.DescriptionEng = req.DescriptionEng
	exercise.DescriptionRu = req.DescriptionRu
	exercise.ImageURL = req.ImageURL
	exercise.MuscleGroupID = req.MuscleGroupID

	if err := config.DB.Save(&exercise).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Failed to update exercise",
				"details": err.Error(),
			},
		})
	}

	if err := config.DB.Preload("MuscleGroup").First(&exercise, exercise.ID).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Failed to load muscle group",
				"details": err.Error(),
			},
		})
	}

	return c.JSON(exercise)
}
