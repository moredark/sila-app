package config

import (
	"Sila/models"
	"gorm.io/gorm"
	"log"
)

func SeedFitnessLevels(db *gorm.DB) {
	fitnessLevels := []models.FitnessLevel{
		{ID: 1, NameEng: "Beginner", NameRu: "Новичок"},
		{ID: 2, NameEng: "Intermediate", NameRu: "Средний"},
		{ID: 3, NameEng: "Advanced", NameRu: "Продвинутый"},
		{ID: 4, NameEng: "Boss of the Gym", NameRu: "Босс качалки"},
	}

	for _, level := range fitnessLevels {
		var existingLevel models.FitnessLevel
		if err := db.First(&existingLevel, "id = ?", level.ID).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				if err := db.Create(&level).Error; err != nil {
					log.Printf("Failed to insert fitness level %s: %v", level.NameEng, err)
				} else {
					log.Printf("Inserted fitness level: %s", level.NameEng)
				}
			} else {
				log.Printf("Error checking for fitness level %s: %v", level.NameEng, err)
			}
		}
	}
}
