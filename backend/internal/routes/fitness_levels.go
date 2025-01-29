package routes

import (
	"Sila/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

func SetupFitnessLevelsRoutes(api fiber.Router) {
	fitnessLevels := api.Group("/fitness-levels")
	{
		fitnessLevels.Get("/", handlers.GetFitnessLevels)
	}
}
