package models

import "time"

type Set struct {
	ID               int            `gorm:"primaryKey" json:"id" binding:"required" validate:"required"`
	WorkoutSessionID int            `json:"workout_session_id" binding:"required" validate:"required"`
	WorkoutSession   WorkoutSession `gorm:"foreignKey:WorkoutSessionID" json:"-"`
	Weight           float64        `gorm:"type:decimal(5,2)" json:"weight" binding:"required" validate:"required"`
	Reps             int            `json:"reps" binding:"required" validate:"required"`
	CreatedAt        time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"created_at" binding:"required" validate:"required"`
}

func (Set) TableName() string {
	return "sets"
}

type AddSetRequest struct {
	Weight float64 `json:"weight" example:"50.5" binding:"required" validate:"required"`
	Reps   int     `json:"reps" example:"10" binding:"required" validate:"required"`
}
