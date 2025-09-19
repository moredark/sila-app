package models

import (
	"Sila/pkg/types"
	"time"

	"github.com/google/uuid"
)

type Plan struct {
	ID          int            `gorm:"primaryKey" json:"id"`
	Name        string         `gorm:"type:varchar(255);not null" json:"name"`
	Description string         `gorm:"type:text" json:"description"`
	UserID      uuid.UUID      `gorm:"type:uuid;not null" json:"user_id"`
	User        User           `gorm:"foreignKey:UserID" json:"user"`
	CreatedAt   time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt   time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
	Exercises   []PlanExercise `gorm:"foreignKey:PlanID" json:"exercises"`
}

func (Plan) TableName() string {
	return "plans"
}

type PlanExercise struct {
	PlanID      int      `gorm:"primaryKey" json:"plan_id"`
	ExerciseID  int      `gorm:"primaryKey" json:"exercise_id"`
	Exercise    Exercise `gorm:"foreignKey:ExerciseID" json:"exercise"`
	Order       int      `gorm:"not null" json:"order"`
	Description string   `gorm:"type:text" json:"description"`
}

func (PlanExercise) TableName() string {
	return "plan_exercises"
}

type PlanExerciseRequest struct {
	ExerciseID  int    `json:"exercise_id" binding:"required"`
	Order       int    `json:"order" binding:"required"`
	Description string `json:"description"`
}

type CreatePlanRequest struct {
	Name        string                `json:"name" binding:"required"`
	Description string                `json:"description"`
	Exercises   []PlanExerciseRequest `json:"exercises"`
}

type UpdatePlanRequest struct {
	Name        string                `json:"name"`
	Description string                `json:"description"`
	Exercises   []PlanExerciseRequest `json:"exercises"`
}

type PlanExerciseResponse struct {
	Exercise    ExerciseResponse `json:"exercise"`
	Order       int              `json:"order"`
	Description string           `json:"description"`
}

type PlanDetailResponse struct {
	ID          int                    `json:"id"`
	Name        string                 `json:"name"`
	Description string                 `json:"description"`
	Exercises   []PlanExerciseResponse `json:"exercises"`
	User        UserBasicInfo          `json:"user"`
}

type PlanSummaryResponse struct {
	ID          int          `json:"id"`
	Name        string       `json:"name"`
	Description string       `json:"description"`
}

type PaginatedPlanResponse = types.Pagination[PlanDetailResponse]

