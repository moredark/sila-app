package main

import (
	"Sila/config"
	"Sila/internal/middleware"
	"Sila/internal/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"log"
)

// @title Sila API
// @version 1.0
// @host sila-danila.ru
// @BasePath /api
// @schemes http, https
// @openapi 3.0.0

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file")
	}

	if err := config.ConnectDatabase(); err != nil {
		log.Fatalf("Could not connect to the database: %v", err)
	}

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization, Accept-Language",
	}))

	app.Use(middleware.COOPMiddleware)

	routes.Setup(app)

	log.Fatal(app.Listen(":8080"))
}
