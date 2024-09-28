package routes

import (
	"Sila/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupFitnessLevelsRoutes(api fiber.Router) {
	fitnessLevels := api.Group("/fitness-levels")
	{
		fitnessLevels.Get("/", controllers.GetFitnessLevels)
	}
}
