package routes

import (
	"Sila/controllers"
	"Sila/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupExercisesRoutes(app *fiber.App) {
	exercises := app.Group("/exercises")
	{
		exercises.Get("/", controllers.GetExercises)
		exercises.Use(middleware.Authenticate, middleware.RequirePermission("admin"))
		exercises.Post("/", controllers.CreateExercise)
		exercises.Put("/:id", controllers.UpdateExercise)
	}

}
