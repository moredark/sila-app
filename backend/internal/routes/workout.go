package routes

import (
	"Sila/internal/handlers"
	"Sila/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupWorkoutRoutes(api fiber.Router) {
	workout := api.Group("/workout", middleware.Authenticate)
	{
		workout.Post("/start", handlers.StartWorkoutSession)
		workout.Post("/add-set/:id", handlers.AddSetToWorkout)
		workout.Put("/complete/:id", handlers.CompleteWorkoutSession)
		workout.Get("/incomplete", handlers.GetIncompleteWorkouts)
		workout.Get("/:id", handlers.GetWorkoutSession)
		workout.Get("/exercise/:exercise_id", handlers.GetWorkoutsByExercise)
		workout.Delete("/set/:id", handlers.DeleteSet)
		workout.Delete("/:id", handlers.DeleteWorkoutSession)
	}
}
