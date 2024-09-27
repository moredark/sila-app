package auth

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var googleOauthConfig = &oauth2.Config{
	RedirectURL:  os.Getenv("REDIRECT_URL"),
	ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
	ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
	Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
	Endpoint:     google.Endpoint,
}

type GoogleUser struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Picture       string `json:"picture"`
}

func GetGoogleOAuthURL(state string) string {
	return googleOauthConfig.AuthCodeURL(state)
}

func GetGoogleUser(accessToken string) (*GoogleUser, error) {
	log.Printf("Attempting to use access token: %s", accessToken)

	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken)
	if err != nil {
		log.Printf("Failed to make request to Google API: %v", err)
		return nil, fmt.Errorf("failed to get user info from Google: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Printf("Non-200 status code from Google API: %d", resp.StatusCode)
		return nil, fmt.Errorf("failed to get user info from Google: status code %d", resp.StatusCode)
	}

	var user GoogleUser
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		log.Printf("Failed to decode user info: %v", err)
		return nil, fmt.Errorf("failed to decode user info: %v", err)
	}

	log.Printf("Successfully retrieved user info: %+v", user)
	return &user, nil
}
