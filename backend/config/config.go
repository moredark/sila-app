package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() error {
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable TimeZone=UTC",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)

	var err error
	for i := 0; i < 10; i++ {
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}
		log.Printf("Could not connect to the database, retrying in 5 seconds... (%d/10)", i+1)
		time.Sleep(5 * time.Second)
	}

	if err != nil {
		return fmt.Errorf("failed to connect to database after multiple attempts: %w", err)
	}

	if err := DB.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";").Error; err != nil {
		return fmt.Errorf("failed to create extension uuid-ossp: %w", err)
	}

	Migrate(DB)

	Seed(DB)

	log.Println("Database connection successfully established")
	return nil
}
