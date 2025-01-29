package models

import "time"

type WorkoutSessionResponse struct {
	ID          int                         `json:"id"`
	Note        string                      `json:"note,omitempty"`
	IsCompleted bool                        `json:"is_completed"`
	CreatedAt   time.Time                   `json:"created_at"`
	Sets        []Set                       `json:"sets"`
	Exercise    ExerciseResponse            `json:"exercise"`
	LastSession *LastWorkoutSessionResponse `json:"last_session,omitempty"`
}

type LastWorkoutSessionResponse struct {
	ID          int              `json:"id" example:"1"`
	Note        string           `json:"note,omitempty" example:"Previous workout notes"`
	IsCompleted bool             `json:"is_completed" example:"true"`
	CreatedAt   time.Time        `json:"created_at" example:"2023-10-01T10:00:00Z"`
	Sets        []Set            `json:"sets"`
	Exercise    ExerciseResponse `json:"exercise"`
}

type IncompleteWorkoutResponse struct {
	ID          int              `json:"id"`
	Note        string           `json:"note,omitempty"`
	IsCompleted bool             `json:"is_completed"`
	CreatedAt   time.Time        `json:"created_at"`
	Exercise    ExerciseResponse `json:"exercise"`
	Sets        []Set            `json:"sets"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}
