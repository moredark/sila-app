package controllers

import (
	"Sila/config"
	"Sila/models"
	"Sila/utils"
	"github.com/gofiber/fiber/v2"
)

// GetMuscleGroups godoc
// @Summary Get all muscle groups
// @Description Get a list of all muscle groups in the requested language (English or Russian).
// @Tags MuscleGroups
// @Accept json
// @Produce json
// @Success 200 {array} models.GetMuscleGroupsResponse "List of muscle groups"
// @Failure 500 {object} map[string]string "Failed to retrieve muscle groups"
// @Router /muscle-groups [get]
func GetMuscleGroups(c *fiber.Ctx) error {
	var muscleGroups []models.MuscleGroup
	if err := config.DB.Find(&muscleGroups).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Failed to retrieve muscle groups",
			"details": err.Error(),
		})
	}

	lang := utils.GetLanguage(c)

	response := make([]map[string]interface{}, 0)
	for _, muscleGroup := range muscleGroups {
		muscleGroupName := muscleGroup.NameEng

		if lang == "ru" {
			muscleGroupName = muscleGroup.NameRu
		}

		response = append(response, map[string]interface{}{
			"id":        muscleGroup.ID,
			"name":      muscleGroupName,
			"image_url": muscleGroup.ImageURL,
		})
	}

	return c.JSON(response)
}

// CreateMuscleGroup godoc
// @Summary Create a new muscle group
// @Description Create a new muscle group with names in both English and Russian.
// @Tags MuscleGroups
// @Accept json
// @Produce json
// @Param data body models.CreateMuscleGroupRequest true "Muscle group data"
// @Success 200 {object} models.MuscleGroup "Created muscle group"
// @Failure 400 {object} map[string]interface{} "Invalid input"
// @Failure 500 {object} map[string]interface{} "Failed to create muscle group"
// @Router /muscle-groups [post]
func CreateMuscleGroup(c *fiber.Ctx) error {
	var req models.CreateMuscleGroupRequest
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

	if len(errors) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": errors,
		})
	}

	muscleGroup := models.MuscleGroup{
		NameEng:  req.NameEng,
		NameRu:   req.NameRu,
		ImageURL: req.ImageURL,
	}

	if err := config.DB.Create(&muscleGroup).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Failed to create muscle group",
				"details": err.Error(),
			},
		})
	}

	return c.JSON(muscleGroup)
}

// UpdateMuscleGroup godoc
// @Summary Update a muscle group
// @Description Обновление информации о группе мышц с учетом названий на двух языках.
// @Tags MuscleGroups
// @Accept json
// @Produce json
// @Param id path string true "Muscle group ID"
// @Param data body models.MuscleGroup true "Updated muscle group data"
// @Success 200 {object} models.MuscleGroup "Updated muscle group"
// @Failure 400 {object} map[string]interface{} "Invalid input"
// @Failure 404 {object} map[string]interface{} "Muscle group not found"
// @Failure 500 {object} map[string]interface{} "Failed to update muscle group"
// @Router /muscle-groups/{id} [put]
func UpdateMuscleGroup(c *fiber.Ctx) error {
	muscleGroupID := c.Params("id")
	if muscleGroupID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Map{
				"id": "Muscle group ID is required",
			},
		})
	}

	var muscleGroup models.MuscleGroup
	if err := config.DB.First(&muscleGroup, muscleGroupID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Muscle group not found",
				"details": err.Error(),
			},
		})
	}

	if err := c.BodyParser(&muscleGroup); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Invalid input",
				"details": err.Error(),
			},
		})
	}

	errors := make(map[string]string)

	if muscleGroup.NameEng == "" {
		errors["name_eng"] = "English name is required"
	}
	if muscleGroup.NameRu == "" {
		errors["name_ru"] = "Russian name is required"
	}

	if len(errors) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": errors,
		})
	}

	if err := config.DB.Save(&muscleGroup).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Failed to update muscle group",
				"details": err.Error(),
			},
		})
	}

	return c.JSON(muscleGroup)
}
