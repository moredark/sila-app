package routes

import (
	_ "Sila/docs"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
)

func Setup(app *fiber.App) {
	api := app.Group("/api")

	SetupAuthRoutes(api)
	SetupUserRoutes(api)
	SetupAdminRoutes(api)
	SetupFitnessLevelsRoutes(api)
	SetupMuscleGroupRoutes(api)
	SetupExercisesRoutes(api)
	SetupWorkoutRoutes(api)
	SetupPlanRoutes(api)

	api.Get("/swagger/*", swagger.HandlerDefault)
}
