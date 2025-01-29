package routes

import (
	"Sila/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

func SetupAuthRoutes(api fiber.Router) {
	auth := api.Group("/auth")
	{
		auth.Post("/register", handlers.Register)
		auth.Post("/login", handlers.Login)
		auth.Post("/refresh-token", handlers.RefreshToken)
		auth.Get("/validate-token", handlers.ValidateToken)
		auth.Post("/google/token", handlers.GoogleTokenLogin)
	}
}
