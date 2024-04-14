package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Fund struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Code      string     `json:"code"`
	Fund      string     `json:"fund"`
	Quantity   string        `json:"quantity"`
	FarmerName   string        `json:"farmerName"`
	NgoSocial   string        `json:"ngoSocial"`
	NgoMail   string        `json:"ngoMail"`
	NgoName   string        `json:"ngoName"`
	DonationId   string        `json:"donationId"`
	CropLat string        `json:"cropLat"`
	CropLon string        `json:"cropLon"`
	NgoLat string        `json:"ngoLat"`
	NgoLon string        `json:"ngoLon"`
	Description   string        `json:"description" `
	ImageSrc string        `json:"imageSrc"`
}