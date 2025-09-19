package routes

import (
	"Sila/internal/handlers"
	"Sila/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupPlanRoutes(api fiber.Router) {
	plan := api.Group("/plans", middleware.Authenticate)
	{
		plan.Post("/", handlers.CreatePlan)
		plan.Get("/", handlers.GetPlans)
		plan.Get("/:id", handlers.GetPlan)
		plan.Put("/:id", handlers.UpdatePlan)
		plan.Delete("/:id", handlers.DeletePlan)
	}
}
