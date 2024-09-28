package routes

import (
	"Sila/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupAuthRoutes(api fiber.Router) {
	auth := api.Group("/auth")
	{
		auth.Post("/register", controllers.Register)
		auth.Post("/login", controllers.Login)
		auth.Post("/refresh-token", controllers.RefreshToken)
		auth.Get("/validate-token", controllers.ValidateToken)
		auth.Post("/google/token", controllers.GoogleTokenLogin)
	}
}
