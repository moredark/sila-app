package middleware

import (
	"Sila/config"
	"Sila/internal/models"
	"github.com/gofiber/fiber/v2"
)

func RequirePermission(permissionName string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		userInterface := c.Locals("user")
		if userInterface == nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "User not authenticated"})
		}

		user, ok := userInterface.(*models.User)
		if !ok {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to cast user"})
		}

		var role models.Role
		if err := config.DB.Preload("Permissions").First(&role, user.RoleID).Error; err != nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Role not found"})
		}

		for _, perm := range role.Permissions {
			if perm.Name == permissionName {
				return c.Next()
			}
		}

		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Permission denied"})
	}
}
