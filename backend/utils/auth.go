package utils

import (
	"Sila/models"
	"github.com/gofiber/fiber/v2"
)

func GetUserFromContext(c *fiber.Ctx) (*models.User, error) {
	user, ok := c.Locals("user").(*models.User)
	if !ok {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to retrieve user from context")
	}
	return user, nil
}
