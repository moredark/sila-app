package models

type GoogleTokenRequest struct {
	AccessToken string `json:"access_token" binding:"required" validate:"required"`
}
