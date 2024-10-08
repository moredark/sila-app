package routes

import (
	"Sila/controllers"
	"Sila/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupMuscleGroupRoutes(api fiber.Router) {
	muscleGroups := api.Group("/muscle-groups")
	{
		muscleGroups.Get("/", controllers.GetMuscleGroups)
		muscleGroups.Use(middleware.Authenticate, middleware.RequirePermission("admin"))
		muscleGroups.Post("/", controllers.CreateMuscleGroup)
		muscleGroups.Put("/:id", controllers.UpdateMuscleGroup)
	}

}
