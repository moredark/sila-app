package routes

import (
	"Sila/controllers"
	"Sila/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupWorkoutRoutes(api fiber.Router) {
	workout := api.Group("/workout", middleware.Authenticate)
	{
		workout.Post("/start", controllers.StartWorkoutSession)
		workout.Post("/add-set/:id", controllers.AddSetToWorkout)
		workout.Put("/complete/:id", controllers.CompleteWorkoutSession)
		workout.Get("/incomplete", controllers.GetIncompleteWorkouts)
		workout.Get("/:id", controllers.GetWorkoutSession)
		workout.Get("/exercise/:exercise_id", controllers.GetWorkoutsByExercise)
		workout.Delete("/set/:id", controllers.DeleteSet)
		workout.Delete("/:id", controllers.DeleteWorkoutSession)
	}
}
