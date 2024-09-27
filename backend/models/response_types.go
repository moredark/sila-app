package models

import "time"

type WorkoutSessionResponse struct {
	ID          int       `json:"id"`
	Note        string    `json:"note,omitempty"`
	IsCompleted bool      `json:"is_completed"`
	CreatedAt   time.Time `json:"created_at"`
	Exercise    struct {
		ID          int    `json:"id"`
		Name        string `json:"name"`
		MuscleGroup struct {
			ID   int    `json:"id"`
			Name string `json:"name"`
		} `json:"muscle_group"`
	} `json:"exercise"`
	Sets []Set `json:"sets"`
}

type IncompleteWorkoutResponse struct {
	ID          int       `json:"id"`
	Note        string    `json:"note,omitempty"`
	IsCompleted bool      `json:"is_completed"`
	CreatedAt   time.Time `json:"created_at"`
	Exercise    Exercise  `json:"exercise"`
	Sets        []Set     `json:"sets"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}
