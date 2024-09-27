package middleware

import "github.com/gofiber/fiber/v2"

func COOPMiddleware(c *fiber.Ctx) error {
	c.Set("Cross-Origin-Opener-Policy", "same-origin")
	return c.Next()
}
