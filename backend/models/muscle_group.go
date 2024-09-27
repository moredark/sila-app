package models

type MuscleGroup struct {
	ID       int    `gorm:"primaryKey" json:"id"`
	NameEng  string `gorm:"type:varchar(100);not null" json:"name_eng"`
	NameRu   string `gorm:"type:varchar(100);not null" json:"name_ru"`
	ImageURL string `gorm:"type:varchar(255)" json:"image_url,omitempty"`
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
