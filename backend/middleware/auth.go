package middleware

import (
	"Sila/auth"
	"Sila/config"
	"Sila/models"
	"github.com/gofiber/fiber/v2"
)

func Authenticate(c *fiber.Ctx) error {
	tokenString := auth.ExtractTokenFromHeader(c)
	if tokenString == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Token is missing",
			},
		})
	}

	claims, err := auth.ParseToken(tokenString)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Invalid token",
				"details": err.Error(),
			},
		})
	}

	if claims.Subject == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Failed to retrieve user ID from token",
			},
		})
	}

	var user models.User
	if err := config.DB.Where("id = ?", claims.Subject).First(&user).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "User not found",
			},
		})
	}

	c.Locals("user", &user)
	return c.Next()
}
