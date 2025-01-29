package routes

import (
	"Sila/internal/handlers"
	middleware2 "Sila/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupExercisesRoutes(api fiber.Router) {
	exercises := api.Group("/exercises")
	{
		exercises.Get("/", handlers.GetExercises)
		exercises.Use(middleware2.Authenticate, middleware2.RequirePermission("admin"))
		exercises.Post("/", handlers.CreateExercise)
		exercises.Put("/:id", handlers.UpdateExercise)
	}

}
