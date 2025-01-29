package routes

import (
	"Sila/internal/handlers"
	middleware2 "Sila/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupAdminRoutes(api fiber.Router) {
	admin := api.Group("/admin", middleware2.Authenticate, middleware2.RequirePermission("admin"))
	{
		admin.Get("/fitness-levels", middleware2.RequirePermission("view_fitness_levels"), handlers.GetFitnessLevels)
	}
}
