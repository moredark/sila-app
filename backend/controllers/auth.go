package controllers

import (
	"Sila/auth"
	"Sila/config"
	"Sila/models"
	"Sila/utils"
	"errors"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"log"
	"net/http"
	"time"
)

func timePtr(t time.Time) *time.Time {
	return &t
}

// Register godoc
// @Summary Register a new user
// @Description This endpoint registers a new user with email, password, and username
// @Tags Auth
// @Accept json
// @Produce json
// @Param register body models.User true "Register user"
// @Success 200 {object} models.TokensResponse "Tokens"
// @Failure 400 {object} map[string]string "Invalid input"
// @Failure 409 {object} map[string]string "Email already in use"
// @Router /auth/register [post]
func Register(c *fiber.Ctx) error {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		Username string `json:"username"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	var existingUser models.User
	if err := config.DB.Where("email = ?", req.Email).First(&existingUser).Error; err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "Email already in use"})
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error hashing password"})
	}

	var role models.Role
	if err := config.DB.First(&role, 1).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid role ID"})
	}

	newUser := models.User{
		Email:        req.Email,
		PasswordHash: string(hash),
		Username:     req.Username,
		CreatedAt:    time.Now(),
		RoleID:       role.ID,
	}

	if err := config.DB.Create(&newUser).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error saving user"})
	}

	if err := config.DB.Preload("Role").First(&newUser, newUser.ID).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error loading user role"})
	}

	if newUser.Role == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "User role is not set"})
	}

	return auth.GenerateTokensAndRespond(c, newUser)
}

// Login godoc
// @Summary Login user
// @Description This endpoint logs in a user and returns tokens
// @Tags Auth
// @Accept json
// @Produce json
// @Param login body models.LoginRequest true "Login user"
// @Success 200 {object} models.TokensResponse "Tokens"
// @Failure 400 {object} map[string]string "Invalid input"
// @Failure 401 {object} map[string]string "Invalid credentials"
// @Router /auth/login [post]
func Login(c *fiber.Ctx) error {
	var req models.LoginRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	var user models.User
	if err := config.DB.Preload("Role").Where("email = ?", req.Email).First(&user).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	if user.Role == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "User role is not set"})
	}

	return auth.GenerateTokensAndRespond(c, user)
}

// RefreshToken godoc
// @Summary Refresh JWT tokens
// @Description Refreshes the access and refresh tokens using a valid refresh token.
// @Tags Auth
// @Accept json
// @Produce json
// @Param data body models.RefreshTokenRequest true "Refresh token"
// @Success 200 {object} map[string]string "access_token" "refresh_token"
// @Failure 400 {object} map[string]string "error" "Invalid input or Refresh token required"
// @Failure 401 {object} map[string]string "error" "Unauthorized"
// @Router /auth/refresh-token [post]
func RefreshToken(c *fiber.Ctx) error {
	var req models.RefreshTokenRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	if req.RefreshToken == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Refresh token required"})
	}

	newAccessToken, newRefreshToken, err := auth.RefreshTokens(req.RefreshToken)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{
		"access_token":  newAccessToken,
		"refresh_token": newRefreshToken,
	})
}

// ValidateToken godoc
// @Summary Validate user token
// @Description This endpoint validates a user's JWT token
// @Tags Auth
// @Produce json
// @Success 200 {object} map[string]string "Valid token"
// @Failure 401 {object} map[string]string "Invalid token"
// @Router /auth/validate-token [get]
func ValidateToken(c *fiber.Ctx) error {
	tokenString := auth.ExtractTokenFromHeader(c)
	if tokenString == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "No token provided"})
	}

	claims, err := auth.ParseToken(tokenString)
	if err != nil {
		log.Printf("Invalid token: %v", err)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
	}

	return c.JSON(fiber.Map{
		"valid":  true,
		"claims": claims,
	})
}

// GoogleTokenLogin godoc
// @Summary Google OAuth2 Token Login
// @Description Logs in a user using Google OAuth2 Access Token.
// @Tags Authentication
// @Accept json
// @Produce json
// @Param request body models.GoogleTokenRequest true "Google OAuth2 Access Token"
// @Success 200 {object} models.TokensResponse "Access and refresh tokens"
// @Failure 400 {object} models.ErrorResponse "Invalid request payload or access token is required"
// @Failure 500 {object} models.ErrorResponse "Failed to get user info from Google or error creating/updating user"
// @Router /auth/google/token [post]
func GoogleTokenLogin(c *fiber.Ctx) error {
	var requestData struct {
		AccessToken string `json:"access_token"`
	}

	if err := c.BodyParser(&requestData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{Error: "Invalid request payload"})
	}

	if requestData.AccessToken == "" {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{Error: "Access token is required"})
	}

	userInfo, err := auth.GetGoogleUser(requestData.AccessToken)
	if err != nil {
		log.Printf("Failed to get user info from Google: %v", err)
		return c.Status(http.StatusInternalServerError).JSON(models.ErrorResponse{Error: "Failed to get user info from Google"})
	}

	providerName := "google"
	var googleProvider models.Provider
	log.Printf("Attempting to find or create provider with name: %s", providerName)

	if err := config.DB.Where("name = ?", providerName).FirstOrCreate(&googleProvider, models.Provider{Name: providerName}).Error; err != nil {
		log.Printf("Failed to find or create provider: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{Error: "Failed to find or create provider"})
	}

	var user models.User

	err = config.DB.Where("provider_id = ? AND provider_user_id = ?", googleProvider.ID, userInfo.ID).Preload("Role").First(&user).Error
	if err == nil {
		log.Printf("User with provider_user_id %s already exists, logging in", userInfo.ID)
		user.LastLogin = timePtr(time.Now())
		if err := config.DB.Save(&user).Error; err != nil {
			log.Printf("Failed to update user's last login: %v", err)
		}
		return auth.GenerateTokensAndRespond(c, user)
	}

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		log.Printf("Error finding user by provider_user_id: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{Error: "Failed to retrieve user"})
	}

	newUser := models.User{
		ID:             uuid.New(),
		Email:          userInfo.Email,
		ProviderID:     &googleProvider.ID,
		ProviderUserID: &userInfo.ID,
		CreatedAt:      time.Now(),
		LastLogin:      timePtr(time.Now()),
		Username:       userInfo.Email,
		AvatarURL:      &userInfo.Picture,
		RoleID:         1,
	}

	log.Printf("Creating new user with email: %s", userInfo.Email)
	if err := config.DB.Create(&newUser).Error; err != nil {
		log.Printf("Failed to create user: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{Error: "Error creating user"})
	}

	if err := config.DB.Preload("Role").First(&newUser, "id = ?", newUser.ID).Error; err != nil {
		log.Printf("Failed to load user role after creation: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{Error: "User role is not set"})
	}

	return auth.GenerateTokensAndRespond(c, newUser)
}

// GetUserProfile godoc
// @Summary Get User Profile
// @Description Retrieves the profile information of the authenticated user, including email, username, fitness level, avatar, and role.
// @Tags User
// @Produce  json
// @Success 200 {object} models.GetUserProfileResponse "Returns the user profile data"
// @Failure 401 {object} map[string]string "No token provided or invalid token"
// @Failure 404 {object} map[string]string "User not found"
// @Router /user/profile [get]
// @Security BearerAuth
func GetUserProfile(c *fiber.Ctx) error {
	tokenString := auth.ExtractTokenFromHeader(c)
	if tokenString == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "No token provided"})
	}

	claims, err := auth.ParseToken(tokenString)
	if err != nil {
		log.Printf("Invalid token: %v", err)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
	}

	userID := claims.Subject

	var user models.User
	if err := config.DB.Preload("FitnessLevel").Preload("Role").Where("id = ?", userID).First(&user).Error; err != nil {
		log.Printf("User not found: %v", err)
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
	}

	fitnessLevelName := utils.GetFitnessLevelName(c, &user)
	roleName := utils.GetRoleName(&user)

	// Обработка возможных nil значений
	avatarURL := ""
	if user.AvatarURL != nil {
		avatarURL = *user.AvatarURL
	}

	bio := ""
	if user.Bio != nil {
		bio = *user.Bio
	}

	var lastLogin time.Time
	if user.LastLogin != nil {
		lastLogin = *user.LastLogin
	}

	response := models.GetUserProfileResponse{
		Email:        user.Email,
		Username:     user.Username,
		AvatarURL:    avatarURL,
		Bio:          bio,
		CreatedAt:    user.CreatedAt,
		LastLogin:    lastLogin,
		FitnessLevel: fitnessLevelName,
		Role:         roleName,
	}

	return c.JSON(response)
}
