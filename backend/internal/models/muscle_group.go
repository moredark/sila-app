package models

type MuscleGroup struct {
	ID       int    `gorm:"primaryKey" json:"id"`
	NameEng  string `gorm:"type:varchar(100);not null" json:"name_eng" binding:"required" example:"Chest" validate:"required"`
	NameRu   string `gorm:"type:varchar(100);not null" json:"name_ru" binding:"required" example:"Грудь" validate:"required"`
	ImageURL string `gorm:"type:varchar(255)" json:"image_url,omitempty" example:"http://example.com/chest.jpg"`
}

func (MuscleGroup) TableName() string {
	return "muscle_groups"
}

type GetMuscleGroupsResponse struct {
	ID       int    `json:"id"  validate:"required"`
	Name     string `json:"name"  validate:"required"`
	ImageURL string `json:"image_url,omitempty"`
}

type CreateMuscleGroupRequest struct {
	NameEng  string `json:"name_eng" example:"Chest" validate:"required"`
	NameRu   string `json:"name_ru" example:"Грудь" validate:"required"`
	ImageURL string `json:"image_url,omitempty" example:"http://example.com/chest.jpg"`
}

type UpdateMuscleGroupRequest struct {
	NameEng  string `json:"name_eng" example:"Chest" validate:"required"`
	NameRu   string `json:"name_ru" example:"Грудь" validate:"required"`
	ImageURL string `json:"image_url,omitempty" example:"http://example.com/chest.jpg"`
}
