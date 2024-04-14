package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/yash-raj10/farm2ngo-Backend/controllers"
)

func main(){

	r := mux.NewRouter()

	r.HandleFunc("/api/profiles", controllers.GetAllProfiles).Methods("GET")
	r.HandleFunc("/api/profile/{userEmail}", controllers.GetOneProfile).Methods("GET")
	r.HandleFunc("/api/addProfile", controllers.AddProfile).Methods("POST")
	r.HandleFunc("/api/profile/{userEmail}", controllers.UpdateProfile).Methods("PUT")
	
	r.HandleFunc("/api/addCrop", controllers.AddCrop).Methods("POST")
	r.HandleFunc("/api/crops", controllers.GetAllCrops).Methods("GET")
	r.HandleFunc("/api/crop/{id}", controllers.GetOneCrop).Methods("GET")

	r.HandleFunc("/api/addFund", controllers.AddFund).Methods("POST")
	r.HandleFunc("/api/funds", controllers.GetAllFunds).Methods("GET")
	r.HandleFunc("/api/fund/{id}", controllers.GetOneFund).Methods("GET")

	cors := handlers.CORS(
		handlers.AllowedHeaders([]string{"Content-Type"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowCredentials(),
	)

	http.Handle("/", cors(r))

	fmt.Println("Listening at port 4000")
	log.Fatal(http.ListenAndServe(":4000", nil))

}