package models

type LoginRequest struct {
	Email    string `json:"email" binding:"required" validate:"required"`
	Password string `json:"password" binding:"required" validate:"required"`
}

type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required" validate:"required"`
}

type TokensResponse struct {
	AccessToken  string `json:"access_token" binding:"required" validate:"required"`
	RefreshToken string `json:"refresh_token" binding:"required" validate:"required"`
}
