package main

import (
	"Sila/config"
	"Sila/internal/middleware"
	"Sila/internal/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

// @title Sila API
// @version 1.0
// @host sila-danila.ru
// @BasePath /api
// @schemes http, https
// @openapi 3.0.0

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
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

	log.Fatal(app.Listen("0.0.0.0:8080"))
}
