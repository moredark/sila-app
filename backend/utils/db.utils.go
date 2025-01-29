package utils

import (
	"Sila/config"
	"Sila/internal/models"
	"github.com/gofiber/fiber/v2"
)

func GetFitnessLevelName(c *fiber.Ctx, user *models.User) string {
	lang := GetLanguage(c)

	if user.FitnessLevel != nil {
		if lang == "ru" {
			return user.FitnessLevel.NameRu
		}
		return user.FitnessLevel.NameEng
	}

	var firstFitnessLevel models.FitnessLevel
	if err := config.DB.Order("id").First(&firstFitnessLevel).Error; err == nil {
		if lang == "ru" {
			return firstFitnessLevel.NameRu
		}
		return firstFitnessLevel.NameEng
	}

	return ""
}

func GetRoleName(user *models.User) string {
	if user.Role != nil {
		return user.Role.Name
	}

	var defaultRole models.Role
	if err := config.DB.Where("name = ?", "user").First(&defaultRole).Error; err == nil {
		return defaultRole.Name
	}

	return ""
}
