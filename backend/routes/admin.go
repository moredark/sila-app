package routes

import (
	"Sila/controllers"
	"Sila/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupAdminRoutes(app *fiber.App) {
	admin := app.Group("/admin", middleware.Authenticate, middleware.RequirePermission("admin"))
	{
		admin.Get("/fitness-levels", middleware.RequirePermission("view_fitness_levels"), controllers.GetFitnessLevels)
	}
}
