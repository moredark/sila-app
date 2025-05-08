package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID             uuid.UUID     `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id"`
	Email          string        `gorm:"unique;not null" json:"email"`
	PasswordHash   string        `gorm:"not null" json:"-"`
	ProviderID     *int          `json:"provider_id,omitempty"`
	Provider       Provider      `gorm:"foreignKey:ProviderID;references:ID"`
	ProviderUserID *string       `json:"provider_user_id,omitempty"`
	CreatedAt      time.Time     `json:"created_at"`
	LastLogin      *time.Time    `json:"last_login,omitempty"`
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
	Email        string    `json:"email" binding:"required" validate:"required"`
	Username     string    `json:"username" binding:"required" validate:"required"`
	AvatarURL    string    `json:"avatar_url,omitempty"`
	Bio          string    `json:"bio,omitempty"`
	CreatedAt    time.Time `json:"created_at" binding:"required" validate:"required"`
	LastLogin    time.Time `json:"last_login,omitempty"`
	FitnessLevel string    `json:"fitness_level" binding:"required" validate:"required"`
	Role         string    `json:"role" binding:"required" validate:"required"`
}

type UserBasicInfo struct {
	ID        uuid.UUID `json:"id" binding:"required" validate:"required"`
	Username  string    `json:"username" binding:"required" validate:"required"`
	Email     string    `json:"email" binding:"required" validate:"required"`
	AvatarURL *string   `json:"avatar_url,omitempty"`
}
