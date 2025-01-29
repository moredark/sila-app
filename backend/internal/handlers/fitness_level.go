package handlers

import (
	"Sila/config"
	"Sila/internal/models"
	"github.com/gofiber/fiber/v2"
)

// GetFitnessLevels godoc
// @Summary Get all fitness levels
// @Description Получение списка всех уровней физической подготовки с названиями на английском и русском языках.
// @Tags FitnessLevels
// @Accept json
// @Produce json
// @Success 200 {array} models.FitnessLevel "List of fitness levels"
// @Failure 500 {object} map[string]string "Failed to retrieve fitness levels"
// @Router /fitness-levels [get]
func GetFitnessLevels(c *fiber.Ctx) error {
	var fitnessLevels []models.FitnessLevel

	if err := config.DB.Find(&fitnessLevels).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve fitness levels",
		})
	}

	return c.JSON(fitnessLevels)
}
