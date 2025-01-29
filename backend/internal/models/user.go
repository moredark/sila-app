package models

import (
	"github.com/google/uuid"
	"time"
)

type User struct {
	ID             uuid.UUID     `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id"`
	Email          string        `gorm:"unique;not null" json:"email"`
	PasswordHash   string        `gorm:"not null" json:"-"`
	ProviderID     *int          `json:"provider_id,omitempty"`
	Provider       Provider      `gorm:"foreignKey:ProviderID;references:ID"`
	ProviderUserID *string       `json:"provider_user_id,omitempty"`
	CreatedAt      time.Time     `json:"created_at" json:"created_at"`
	LastLogin      *time.Time    `json:"last_login,omitempty" json:"last_login"`
	FitnessLevelID *int          `json:"fitness_level_id,omitempty"`
	FitnessLevel   *FitnessLevel `gorm:"foreignKey:FitnessLevelID;references:ID" json:"fitness_level,omitempty"`
	Username       string        `json:"username"`
	AvatarURL      *string       `json:"avatar_url,omitempty"`
	Bio            *string       `json:"bio,omitempty"`
	RoleID         int           `json:"role_id"`
	Role           *Role         `gorm:"foreignKey:RoleID" json:"role"`
}

func (*User) TableName() string {
	return "users"
}

type GetUserProfileResponse struct {
	Email        string    `json:"email"`
	Username     string    `json:"username"`
	AvatarURL    string    `json:"avatar_url,omitempty"`
	Bio          string    `json:"bio,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
	LastLogin    time.Time `json:"last_login,omitempty"`
	FitnessLevel string    `json:"fitness_level"`
	Role         string    `json:"role"`
}
