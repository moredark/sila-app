package routes

import (
	"Sila/controllers"
	"Sila/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupMuscleGroupRoutes(app *fiber.App) {
	muscleGroups := app.Group("/muscle-groups")
	{
		muscleGroups.Get("/", controllers.GetMuscleGroups)
		muscleGroups.Use(middleware.Authenticate, middleware.RequirePermission("admin"))
		muscleGroups.Post("/", controllers.CreateMuscleGroup)
		muscleGroups.Put("/:id", controllers.UpdateMuscleGroup)
	}

}
