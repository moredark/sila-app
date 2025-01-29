package test

import (
	"Sila/config"
	"Sila/internal/models"
	"golang.org/x/crypto/bcrypt"
	"testing"
)

func CreateTestUser(t *testing.T) *models.User {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.DefaultCost)
	role := models.Role{Name: "user"}
	config.DB.FirstOrCreate(&role, models.Role{Name: "user"})
	user := models.User{
		Email:        "testuser@example.com",
		PasswordHash: string(hashedPassword),
		Username:     "testuser",
		RoleID:       role.ID,
		Role:         &role,
	}
	if err := config.DB.Create(&user).Error; err != nil {
		t.Fatalf("Failed to create test user: %v", err)
	}
	return &user
}
