package models

import (
	"Sila/pkg/types"
	"time"
)

type WorkoutSessionResponse struct {
	ID          int                         `json:"id" binding:"required" validate:"required"`
	Note        string                      `json:"note,omitempty"`
	IsCompleted bool                        `json:"is_completed" binding:"required" validate:"required"`
	CreatedAt   time.Time                   `json:"created_at" binding:"required" validate:"required"`
	Sets        []Set                       `json:"sets" binding:"required" validate:"required"`
	Exercise    ExerciseResponse            `json:"exercise" binding:"required" validate:"required"`
	LastSession *LastWorkoutSessionResponse `json:"last_session,omitempty"`
	User        UserBasicInfo               `json:"user" binding:"required" validate:"required"`
}

type LastWorkoutSessionResponse struct {
	ID          int              `json:"id" example:"1" binding:"required" validate:"required"`
	Note        string           `json:"note,omitempty" example:"Previous workout notes"`
	IsCompleted bool             `json:"is_completed" example:"true" binding:"required" validate:"required"`
	CreatedAt   time.Time        `json:"created_at" example:"2023-10-01T10:00:00Z" binding:"required" validate:"required"`
	Sets        []Set            `json:"sets" binding:"required" validate:"required"`
	Exercise    ExerciseResponse `json:"exercise" binding:"required" validate:"required"`
}

type IncompleteWorkoutResponse struct {
	ID          int              `json:"id" binding:"required" validate:"required"`
	Note        string           `json:"note,omitempty"`
	IsCompleted bool             `json:"is_completed" binding:"required" validate:"required"`
	CreatedAt   time.Time        `json:"created_at" binding:"required" validate:"required"`
	Exercise    ExerciseResponse `json:"exercise" binding:"required" validate:"required"`
	Sets        []Set            `json:"sets" binding:"required" validate:"required"`
}

type ErrorResponse struct {
	Error string `json:"error" binding:"required" validate:"required"`
}

type PaginatedExerciseHistoryResponse = types.Pagination[ExerciseHistoryEntry]
