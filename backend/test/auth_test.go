package test

import (
	"Sila/config"
	"Sila/internal/models"
	"Sila/internal/routes"
	"bytes"
	"encoding/json"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/stretchr/testify/assert"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"
)

func TestMain(m *testing.M) {
	rootDir, err := filepath.Abs("../")
	if err != nil {
		log.Fatalf("Could not determine the root directory: %v", err)
	}

	envPath := filepath.Join(rootDir, ".env.test")

	if err := godotenv.Load(envPath); err != nil {
		log.Fatalf("Error loading .env.test file from path %s: %v", envPath, err)
	}

	if err := config.ConnectDatabase(); err != nil {
		log.Fatalf("Could not connect to the test database: %v", err)
	}

	config.DB.Exec("TRUNCATE TABLE users RESTART IDENTITY CASCADE;")

	code := m.Run()

	os.Exit(code)
}
func TestRegister(t *testing.T) {
	app := fiber.New()
	routes.SetupAuthRoutes(app)

	payload := map[string]string{
		"email":    "test@example.com",
		"password": "password",
		"username": "testuser",
	}

	body, _ := json.Marshal(payload)

	req := httptest.NewRequest("POST", "/auth/register", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	resp, _ := app.Test(req, -1)

	assert.Equal(t, http.StatusOK, resp.StatusCode)

	var user models.User
	err := config.DB.Where("email = ?", payload["email"]).First(&user).Error
	if err != nil {
		t.Fatalf("User not found in the database: %v", err)
	}

	assert.Equal(t, payload["email"], user.Email)
	assert.Equal(t, payload["username"], user.Username)

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(payload["password"]))
	assert.NoError(t, err, "Password should match the hashed password in the database")
}

func TestLogin(t *testing.T) {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.DefaultCost)
	user := models.User{
		Email:        "test@example.com",
		PasswordHash: string(hashedPassword),
		Username:     "testuser",
		RoleID:       1,
	}
	config.DB.Create(&user)

	app := fiber.New()
	routes.SetupAuthRoutes(app)

	payload := map[string]string{
		"email":    user.Email,
		"password": "password",
	}

	body, _ := json.Marshal(payload)

	req := httptest.NewRequest("POST", "/auth/login", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	resp, _ := app.Test(req, -1)

	assert.Equal(t, http.StatusOK, resp.StatusCode)

	var foundUser models.User
	err := config.DB.Where("email = ?", payload["email"]).First(&foundUser).Error
	if err != nil {
		t.Fatalf("User not found in the database: %v", err)
	}

	assert.Equal(t, user.Email, foundUser.Email)
	assert.Equal(t, user.Username, foundUser.Username)
	assert.Equal(t, user.RoleID, foundUser.RoleID)

	err = bcrypt.CompareHashAndPassword([]byte(foundUser.PasswordHash), []byte(payload["password"]))
	assert.NoError(t, err, "Password should match the hashed password in the database")
}
