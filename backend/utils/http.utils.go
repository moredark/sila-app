package utils

import "github.com/gofiber/fiber/v2"

func GetLanguage(c *fiber.Ctx) string {
	return c.Get("Accept-Language", "en") // Default to English if not provided
}
