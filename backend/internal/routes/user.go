package routes

import (
	"Sila/internal/handlers"
	"Sila/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupUserRoutes(api fiber.Router) {
	user := api.Group("/user", middleware.Authenticate)
	{
		user.Get("/profile", handlers.GetUserProfile)
	}
}
