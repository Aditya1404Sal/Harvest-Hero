package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"github.com/yash-raj10/farm2ngo-Backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const Link = "mongodb+srv://yashrajse:kQZFWGFkOHlnIopp@cluster1.jxx6eoc.mongodb.net/test"

var collection *mongo.Collection
var collection2 *mongo.Collection
var collection3 *mongo.Collection

// mongoDB initialization
func init() {
	clientOption := options.Client().ApplyURI(Link)

	client, err := mongo.Connect(context.TODO(), clientOption)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Print("Connection Success\n")

	collection = client.Database("farm2ngo").Collection("profiles")
	collection2 = client.Database("farm2ngo").Collection("crops")
	collection3 = client.Database("farm2ngo").Collection("funds")
	fmt.Print("Instance is Ready\n")
}

// mongo helper
func addOneProfile(profile models.Profile) {
	added, err := collection.InsertOne(context.Background(), profile)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Added profile with id:", added.InsertedID)
}

func getAllProfile() []bson.M {
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	var profiles []bson.M

	for cursor.Next(context.Background()) {
		var profile bson.M
		err := cursor.Decode(&profile)
		if err != nil {
			log.Fatal(err)
		}
		profiles = append(profiles, profile)
	}

	defer cursor.Close(context.Background())
	return profiles

}

func getOneProfile(userEmail string) (bson.M, error) {

	var profile bson.M
	err := collection.FindOne(context.Background(), bson.M{"mail": userEmail}).Decode(&profile)
	if err != nil {
		return nil, err
	}

	return profile, err

}

// Real Once
func GetOneProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	email := strings.ToLower(params["userEmail"])

	singleProfile, err := getOneProfile(email)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if singleProfile == nil {
		http.Error(w, "Profile not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(singleProfile)
}

func GetAllProfiles(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	allProfiles := getAllProfile()
	json.NewEncoder(w).Encode(allProfiles)
}

func AddProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")

	var profile models.Profile
	fmt.Println("Request Body:", r.Body)
	err := json.NewDecoder(r.Body).Decode(&profile)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	addOneProfile(profile)
	json.NewEncoder(w).Encode(profile)
}

func UpdateProfile(w http.ResponseWriter, r *http.Request) {
	// w.Header().Set("Access-Control-Allow-Methods", "PUT")
	// // w.Header().Set("Allow-Control-Allow-Methods", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, PUT")
	w.Header().Set("Content-Type", "application/json")

	var UpdatedProfile models.Profile //getting from req
	var ProfileDetails models.Profile // getting from db

	params := mux.Vars(r)
	email := strings.ToLower(params["userEmail"])

	filter := bson.M{"mail": email}

	err := collection.FindOne(context.Background(), filter).Decode(&ProfileDetails)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err1 := json.NewDecoder(r.Body).Decode(&UpdatedProfile)
	if err1 != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if UpdatedProfile.About != " " {
		ProfileDetails.About = UpdatedProfile.About
		update := bson.M{"$set": bson.M{"about": ProfileDetails.About}}

		_, err := collection.UpdateOne(context.Background(), filter, update)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	// 	if UpdatedProfile.Name != ProfileDetails.Name {
	// 		ProfileDetails.Name = UpdatedProfile.Name
	// 		update := bson.M{"$set": bson.M{"name": ProfileDetails.Name}}

	// 		_, err := collection.UpdateOne(context.Background(), filter, update )
	// 		if err != nil {
	// 		   http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	   return
	// 	   }
	//     }

	//    if UpdatedProfile.ImageSrc != ProfileDetails.ImageSrc {
	// 	ProfileDetails.ImageSrc = UpdatedProfile.ImageSrc
	// 	update := bson.M{"$set": bson.M{"imagesrc": ProfileDetails.ImageSrc}}

	// 	_, err := collection.UpdateOne(context.Background(), filter, update )
	// 	if err != nil {
	// 	   http.Error(w, err.Error(), http.StatusInternalServerError)
	//    return
	//    }
	// }

	// if UpdatedProfile.Website != ProfileDetails.Website {
	// 	ProfileDetails.Website = UpdatedProfile.Website
	// 	update := bson.M{"$set": bson.M{"website": ProfileDetails.Website}}

	// 	_, err := collection.UpdateOne(context.Background(), filter, update )
	// 	if err != nil {
	// 	   http.Error(w, err.Error(), http.StatusInternalServerError)
	//    return
	//    }
	// }
	// if UpdatedProfile.Lat != ProfileDetails.Lat {
	// 	ProfileDetails.Lat = UpdatedProfile.Lat
	// 	update := bson.M{"$set": bson.M{"lat": ProfileDetails.Lat}}

	// 	_, err := collection.UpdateOne(context.Background(), filter, update )
	// 	if err != nil {
	// 	   http.Error(w, err.Error(), http.StatusInternalServerError)
	//    return
	//    }
	// }

	// if UpdatedProfile.Lon != ProfileDetails.Lon  {
	// 	ProfileDetails.Lon  = UpdatedProfile.Lon
	// 	update := bson.M{"$set": bson.M{"lon": ProfileDetails.Lon }}

	// 	_, err := collection.UpdateOne(context.Background(), filter, update )
	// 	if err != nil {
	// 	   http.Error(w, err.Error(), http.StatusInternalServerError)
	//    return
	//    }
	// }

	// if UpdatedProfile.Add1 != ProfileDetails.Add1 {
	// 	ProfileDetails.Add1 = UpdatedProfile.Add1
	// 	update := bson.M{"$set": bson.M{"add1": ProfileDetails.Add1}}

	// 	_, err := collection.UpdateOne(context.Background(), filter, update )
	// 	if err != nil {
	// 	   http.Error(w, err.Error(), http.StatusInternalServerError)
	//    return
	//    }
	// }

	// if UpdatedProfile.Add2 != ProfileDetails.Add2 {
	// 	ProfileDetails.Add2 = UpdatedProfile.Add2
	// 	update := bson.M{"$set": bson.M{"add2": ProfileDetails.Add2}}

	// 	_, err := collection.UpdateOne(context.Background(), filter, update )
	// 	if err != nil {
	// 	   http.Error(w, err.Error(), http.StatusInternalServerError)
	//    return
	//    }
	// }

	// if UpdatedProfile.Mail != ProfileDetails.Mail {
	// 	ProfileDetails.Mail = UpdatedProfile.Mail
	// 	update := bson.M{"$set": bson.M{"mail": ProfileDetails.Mail}}

	// 	_, err := collection.UpdateOne(context.Background(), filter, update )
	// 	if err != nil {
	// 	   http.Error(w, err.Error(), http.StatusInternalServerError)
	//    return
	//    }
	// }

	// if UpdatedProfile.Phone != ProfileDetails.Phone {
	// 	ProfileDetails.Phone = UpdatedProfile.Phone
	// 	update := bson.M{"$set": bson.M{"phone": ProfileDetails.Phone}}

	// 	_, err := collection.UpdateOne(context.Background(), filter, update )
	// 	if err != nil {
	// 	   http.Error(w, err.Error(), http.StatusInternalServerError)
	//    return
	//    }
	// }

	json.NewEncoder(w).Encode(ProfileDetails)

}
