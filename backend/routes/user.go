package routes

import (
	"Sila/controllers"
	"Sila/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupUserRoutes(api fiber.Router) {
	user := api.Group("/user", middleware.Authenticate)
	{
		user.Get("/profile", controllers.GetUserProfile)
	}
}
