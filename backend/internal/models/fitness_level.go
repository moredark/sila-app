package models

type FitnessLevel struct {
	ID      int    `gorm:"primaryKey" json:"id"`
	NameEng string `gorm:"type:varchar(255);not null;unique" json:"name_eng" binding:"required" validate:"required"`
	NameRu  string `gorm:"type:varchar(255);not null;unique" json:"name_ru" binding:"required" validate:"required"`
}

func (*FitnessLevel) TableName() string {
	return "fitness_levels"
}
