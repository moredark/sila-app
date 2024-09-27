package utils

import "github.com/gofiber/fiber/v2"

func HandleError(c *fiber.Ctx, statusCode int, message string, details string) error {
	return c.Status(statusCode).JSON(fiber.Map{
		"error": fiber.Map{
			"message": message,
			"details": details,
		},
	})
}
