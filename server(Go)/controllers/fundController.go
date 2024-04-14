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


func addOneFund(Fund models.Fund){
	added, err := collection3.InsertOne(context.Background(), Fund)
	if err!= nil{
		log.Fatal(err)
	}

	fmt.Println("Added Fund with id:", added.InsertedID)
}

func AddFund(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")
	

	var Fund models.Fund
	fmt.Println("Request Body:", r.Body)
	err := json.NewDecoder(r.Body).Decode(&Fund)
	
	if err != nil{
		http.Error(w, err.Error(), http.StatusBadRequest)
        return
	}
	
	addOneFund(Fund)
	json.NewEncoder(w).Encode(Fund)
}





func getOneFund( fundID string) (bson.M, error) {
	id, _ := primitive.ObjectIDFromHex(fundID)
	
	var Fund bson.M
	err := collection3.FindOne(context.Background(), bson.M{"_id": id}).Decode(&Fund)
    if err != nil {
		return nil, err
    }

	return Fund, err
}

func GetOneFund(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	singleFund, err := getOneFund(params["id"])
	if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

	if singleFund == nil {
        http.Error(w, "Fund not found", http.StatusNotFound)
        return
    }

	json.NewEncoder(w).Encode(singleFund)
}




func getAllFunds() []bson.M {
	cursor, err := collection3.Find(context.Background(), bson.M{})
	if err != nil{
		log.Fatal(err)
	}

	var Funds []bson.M

	for cursor.Next(context.Background()){
		var Fund bson.M
		err:= cursor.Decode(&Fund)
		if err != nil{
			log.Fatal(err)
		}
		Funds = append(Funds,Fund)
	}

	defer cursor.Close(context.Background())
	return Funds
}

func GetAllFunds(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	allFunds := getAllFunds()
	json.NewEncoder(w).Encode(allFunds)
}


