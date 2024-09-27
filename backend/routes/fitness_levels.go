package routes

import (
	"Sila/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupFitnessLevelsRoutes(app *fiber.App) {
	fitnessLevels := app.Group("/fitness-levels")
	{
		fitnessLevels.Get("/", controllers.GetFitnessLevels)
	}
}
