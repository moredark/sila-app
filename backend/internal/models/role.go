package models

type Permission struct {
	ID   int    `gorm:"primaryKey" json:"id"`
	Name string `gorm:"unique;not null" json:"name" binding:"required" validate:"required"`
}

type Role struct {
	ID          int          `gorm:"primaryKey" json:"id"`
	Name        string       `gorm:"unique;not null" json:"name" binding:"required" validate:"required"`
	Permissions []Permission `gorm:"many2many:role_permissions" json:"permissions"`
}
