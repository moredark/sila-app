package routes

import (
	"Sila/internal/handlers"
	middleware2 "Sila/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupMuscleGroupRoutes(api fiber.Router) {
	muscleGroups := api.Group("/muscle-groups")
	{
		muscleGroups.Get("/", handlers.GetMuscleGroups)
		muscleGroups.Use(middleware2.Authenticate, middleware2.RequirePermission("admin"))
		muscleGroups.Post("/", handlers.CreateMuscleGroup)
		muscleGroups.Put("/:id", handlers.UpdateMuscleGroup)
	}

}
