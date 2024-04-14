package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Crop struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	GrainName      string     `json:"grainName"`
	Quantity   float32        `json:"quantity"`
	FarmerName   string        `json:"name"`
	ImageSrc string        `json:"imageSrc"`
	Website   string        `json:"website"`
	Lat string        `json:"lat"`
	Lon string        `json:"lon"`
	Add1   string        `json:"add1"`
	Add2 string        `json:"add2"`
	Description   string        `json:"description" `
	Mail   string        `json:"mail" `
	Phone   string        `json:"phone" `
	Cost   float32   `json:"cost"`
}