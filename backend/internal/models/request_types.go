package models

type GoogleTokenRequest struct {
	AccessToken string `json:"access_token" validate:"required"`
}
