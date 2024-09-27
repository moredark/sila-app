package routes

import (
	"Sila/controllers"
	"Sila/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupUserRoutes(app *fiber.App) {
	user := app.Group("/user", middleware.Authenticate)
	{
		user.Get("/profile", controllers.GetUserProfile)
	}
}
