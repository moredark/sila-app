package models

import "time"

type Set struct {
	ID               int            `gorm:"primaryKey" json:"id"`
	WorkoutSessionID int            `json:"workout_session_id"`
	WorkoutSession   WorkoutSession `gorm:"foreignKey:WorkoutSessionID" json:"-"`
	Weight           float64        `gorm:"type:decimal(5,2)" json:"weight"`
	Reps             int            `json:"reps"`
	CreatedAt        time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
}

func (Set) TableName() string {
	return "sets"
}

type AddSetRequest struct {
	Weight float64 `json:"weight" example:"50.5" binding:"required" validate:"required"`
	Reps   int     `json:"reps" example:"10" binding:"required" validate:"required"`
}
