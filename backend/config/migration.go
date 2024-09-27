package config

import (
	"Sila/models"
	"gorm.io/gorm"
	"log"
)

func Migrate(db *gorm.DB) {
	err := db.AutoMigrate(
		&models.User{},
		&models.Provider{},
		&models.FitnessLevel{},
		&models.Role{},
		&models.Permission{},
		&models.MuscleGroup{},
		&models.Exercise{},
		&models.WorkoutSession{},
		&models.Set{},
	)
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}
}

func Seed(db *gorm.DB) {
	CreateRoles(db)
	SeedFitnessLevels(db)
}
