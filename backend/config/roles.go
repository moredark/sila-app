package config

import (
	"gorm.io/gorm"
	"log"
)

func CreateRoles(db *gorm.DB) {
	err := db.Exec("INSERT INTO roles (id, name) VALUES (1, 'user') ON CONFLICT (id) DO NOTHING;").Error
	if err != nil {
		log.Fatalf("Failed to insert role 'user' with id 1: %v", err)
	}

	err = db.Exec("INSERT INTO roles (id, name) VALUES (2, 'admin') ON CONFLICT (id) DO NOTHING;").Error
	if err != nil {
		log.Fatalf("Failed to insert role 'admin' with id 2: %v", err)
	}

	err = db.Exec("INSERT INTO roles (id, name) VALUES ((SELECT MAX(id) + 1 FROM roles), 'admin') ON CONFLICT (name) DO NOTHING;").Error
	if err != nil {
		log.Fatalf("Failed to insert role 'admin': %v", err)
	}
}
