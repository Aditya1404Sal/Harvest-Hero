package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/yash-raj10/farm2ngo-Backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func addOneCrop(Crop models.Crop) {
	added, err := collection2.InsertOne(context.Background(), Crop)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Added Crop with id:", added.InsertedID)
}

func AddCrop(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")

	var Crop models.Crop
	fmt.Println("Request Body:", r.Body)
	err := json.NewDecoder(r.Body).Decode(&Crop)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	addOneCrop(Crop)
	json.NewEncoder(w).Encode(Crop)
}

func getOneCrop(cropID string) (bson.M, error) {
	id, _ := primitive.ObjectIDFromHex(cropID)

	var Crop bson.M
	err := collection2.FindOne(context.Background(), bson.M{"_id": id}).Decode(&Crop)
	if err != nil {
		return nil, err
	}

	return Crop, err
}

func GetOneCrop(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	singleCrop, err := getOneCrop(params["id"])
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if singleCrop == nil {
		http.Error(w, "Crop not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(singleCrop)
}

func getAllCrops() []bson.M {
	cursor, err := collection2.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	var Crops []bson.M

	for cursor.Next(context.Background()) {
		var Crop bson.M
		err := cursor.Decode(&Crop)
		if err != nil {
			log.Fatal(err)
		}
		Crops = append(Crops, Crop)
	}

	defer cursor.Close(context.Background())
	return Crops
}

func GetAllCrops(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	allCrops := getAllCrops()
	json.NewEncoder(w).Encode(allCrops)
}
