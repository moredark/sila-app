package models

import (
	"github.com/google/uuid"
	"time"
)

type WorkoutSession struct {
	ID          int       `gorm:"primaryKey" json:"id"`
	UserID      uuid.UUID `json:"user_id"`
	User        User      `gorm:"foreignKey:UserID" json:"user"`
	ExerciseID  int       `json:"exercise_id"`
	Exercise    Exercise  `gorm:"foreignKey:ExerciseID" json:"exercise"`
	Note        string    `json:"note,omitempty"`
	IsCompleted bool      `json:"is_completed"`
	CreatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	Sets        []Set     `gorm:"foreignKey:WorkoutSessionID" json:"sets,omitempty"`
}

func (WorkoutSession) TableName() string {
	return "workout_sessions"
}

type StartWorkoutRequest struct {
	ExerciseID int `json:"exercise_id" example:"1"`
}

type CompleteWorkoutRequest struct {
	Note string `json:"note" example:"Great workout!"`
}

type StartWorkoutResponse struct {
	SessionID   int                     `json:"session_id" validate:"required"`
	IsCompleted bool                    `json:"is_completed" validate:"required"`
	CreatedAt   string                  `json:"created_at" validate:"required"`
	LastSession *WorkoutSessionResponse `json:"last_session,omitempty"`
}
