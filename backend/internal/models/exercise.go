package models

import (
	"time"
)

type Exercise struct {
	ID             int         `gorm:"primaryKey" json:"id"`
	NameEng        string      `gorm:"type:varchar(255);not null" json:"name_eng"`
	NameRu         string      `gorm:"type:varchar(255);not null" json:"name_ru"`
	DescriptionEng string      `gorm:"type:text" json:"description_eng,omitempty"`
	DescriptionRu  string      `gorm:"type:text" json:"description_ru,omitempty"`
	ImageURL       string      `gorm:"type:varchar(255)" json:"image_url,omitempty"`
	MuscleGroupID  int         `gorm:"not null" json:"-"`
	MuscleGroup    MuscleGroup `gorm:"foreignKey:MuscleGroupID;references:ID" json:"muscle_group"`
	CreatedAt      time.Time   `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
}

func (Exercise) TableName() string {
	return "exercises"
}

type CreateExerciseRequest struct {
	NameEng        string `json:"name_eng" example:"Bench Press" validate:"required"`
	NameRu         string `json:"name_ru" example:"Жим лежа" validate:"required"`
	DescriptionEng string `json:"description_eng,omitempty" example:"A basic chest exercise."`
	DescriptionRu  string `json:"description_ru,omitempty" example:"Базовое упражнение для груди."`
	MuscleGroupID  int    `json:"muscle_group_id" example:"1" validate:"required"`
	ImageURL       string `json:"image_url,omitempty" example:"https://example.com/benchpress.jpg"`
}

type UpdateExerciseRequest struct {
	NameEng        string `json:"name_eng" example:"Bench Press" validate:"required"`
	NameRu         string `json:"name_ru" example:"Жим лежа" validate:"required"`
	DescriptionEng string `json:"description_eng,omitempty" example:"A basic chest exercise."`
	DescriptionRu  string `json:"description_ru,omitempty" example:"Базовое упражнение для груди."`
	MuscleGroupID  int    `json:"muscle_group_id" example:"1" validate:"required"`
	ImageURL       string `json:"image_url,omitempty" example:"https://example.com/benchpress.jpg"`
}

type ExerciseResponse struct {
	ID          int                     `json:"id"`
	Name        string                  `json:"name"`
	Description string                  `json:"description,omitempty"`
	MuscleGroup GetMuscleGroupsResponse `json:"muscle_group"`
	CreatedAt   time.Time               `json:"created_at"`
}

type MuscleGroupDTO struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
