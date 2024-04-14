package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Profile struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	IsA    string        `json:"isA"`
	Name   string        `json:"name"`
	ImageSrc string        `json:"imageSrc"`
	Website   string        `json:"website"`
	Lat string        `json:"lat"`
	Lon string        `json:"lon"`
	Add1   string        `json:"add1"`
	Add2 string        `json:"add2"`
	About   string        `json:"about" `
	Mail   string        `json:"mail" `
	Phone		 string		 `json:"phone"`
}