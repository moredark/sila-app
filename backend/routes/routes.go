package routes

import (
	_ "Sila/docs"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
)

func Setup(app *fiber.App) {
	SetupAuthRoutes(app)
	SetupUserRoutes(app)
	SetupAdminRoutes(app)
	SetupFitnessLevelsRoutes(app)
	SetupMuscleGroupRoutes(app)
	SetupExercisesRoutes(app)
	SetupWorkoutRoutes(app)

	app.Get("/swagger/*", swagger.HandlerDefault)
}
