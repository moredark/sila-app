package models

type Provider struct {
	ID    int    `gorm:"primaryKey" json:"id"`
	Name  string `gorm:"type:varchar(255);not null;unique" json:"name"`
	Users []User `gorm:"foreignKey:ProviderID" json:"users"`
}

func (*Provider) TableName() string {
	return "providers"
}
