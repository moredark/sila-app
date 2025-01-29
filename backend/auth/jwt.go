package auth

import (
	"Sila/internal/models"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"time"
)

var jwtSecret []byte

type Claims struct {
	Email string `json:"email"`
	Role  string `json:"role"`
	jwt.RegisteredClaims
}

func GenerateToken(userID string, userEmail string, userRole string) (string, error) {
	claims := Claims{
		Email: userEmail,
		Role:  userRole,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(6 * time.Hour)), // 6 HOURS
			Subject:   userID,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func GenerateRefreshToken(userID string, userEmail string, userRole string) (string, error) {
	claims := Claims{
		Email: userEmail,
		Role:  userRole,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(30 * 24 * time.Hour)), // 30 Days
			Subject:   userID,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func ParseToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	if err != nil {
		return nil, fmt.Errorf("invalid token: %w", err)
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("invalid token claims")
	}

	return claims, nil
}

func RefreshTokens(refreshTokenStr string) (string, string, error) {
	claims, err := ParseToken(refreshTokenStr)
	if err != nil {
		return "", "", fmt.Errorf("invalid refresh token: %w", err)
	}

	accessToken, err := GenerateToken(claims.Subject, claims.Email, claims.Role)
	if err != nil {
		return "", "", fmt.Errorf("error generating access token: %w", err)
	}

	newRefreshToken, err := GenerateRefreshToken(claims.Subject, claims.Email, claims.Role)
	if err != nil {
		return "", "", fmt.Errorf("error generating refresh token: %w", err)
	}

	return accessToken, newRefreshToken, nil
}

func ExtractTokenFromHeader(c *fiber.Ctx) string {
	tokenString := c.Get("Authorization")
	if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
		return tokenString[7:]
	}
	return tokenString
}

func GenerateTokensAndRespond(c *fiber.Ctx, user models.User) error {
	if user.Role == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "User role is not set"})
	}

	accessToken, err := GenerateToken(user.ID.String(), user.Email, user.Role.Name)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error generating access token")
	}

	refreshToken, err := GenerateRefreshToken(user.ID.String(), user.Email, user.Role.Name)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error generating refresh token")
	}

	return c.JSON(fiber.Map{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
	})
}
