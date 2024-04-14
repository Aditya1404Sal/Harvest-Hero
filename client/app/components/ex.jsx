"use client"
import axios from "axios";
import { useEffect, useState} from "react";
import {GoogleMap} from '@react-google-maps/api';
import { decode } from "@googlemaps/polyline-codec";

import { Polyline } from "@react-google-maps/api";

function Descriptioncard() {

// const [deals , setDeals] = useState([]);
// const [map, setMap] = useState(null);

const API_KEY = '';

// const getfarmerlocation = async(farmer_id) => {
//     try {
//         const res = await axios.get('/api/deals');
//     } catch (error) {
//         console.log(error);
//     }
// }


function initMap(encodedPath) {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center:{lat:0,lng:-180},
    mapTypeId: "terrain",
  });
 const coordinates = google.maps.geometry.encoding.decodePath(encodedPath)
 console.log(coordinates)
  const flightPlanCoordinates = [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ];
  const RoadPath = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  RoadPath.setMap(map);
}

useEffect(()=> {
  const {encoding} =  google.maps.importLibrary("geometry");
  lastfunc();
})

function lastfunc(){
  const origin = {
    latitude : 39.4197,
    longitude : -102.0827784,
}
//get the lats and longs of the origin and destination of the deal.

const destination = {
    latitude : 32.417670,
    longitude : -112.079595,
}

getDirections(origin,destination).then((res) => {
  const enc = res.data.routes[0].polyline.encodedPolyline;
  initMap(enc)
})

}


const getDirections = (origin, destination) => {
  const requestBody = {
    origin: {
      location: {
        latLng: {
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
      },
    },
    destination: {
      location: {
        latLng: {
          latitude: destination.latitude,
          longitude: destination.longitude,
        },
      },
    },
    travelMode: 'DRIVE',
    routingPreference: 'TRAFFIC_AWARE',
    computeAlternativeRoutes: false,
    routeModifiers: {
      avoidTolls: false,
      avoidHighways: false,
      avoidFerries: false,
    },
    languageCode: 'en-US',
    units: 'IMPERIAL',
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': 'routes.polyline.encodedPolyline',
  };

  return axios({
    method: 'POST',
    url: https://routes.googleapis.com/directions/v2:computeRoutes,
    headers,
    data: requestBody,
  });

};
    
  return (
    <div class="flex flex-col bg-white shadow-lg rounded-lg w-1/5 h-80 mx-14 my-16 transform scale-125">
    <div class="flex flex-col justify-center items-center w-full h-1/2 px-2">
        <div class="flex justify-between w-full py-1">
            <img class="w-16 h-16" src="image1.jpg" alt="Image 1"/>
            <div class="flex justify-center items-center">
                <i class="fas fa-icon"></i>
            </div>
            <img class="w-16 h-16" src="image2.jpg" alt="Image 2"/>
        </div>
        <div id="map" class="w-full h-2/3 border-2 border-black ">

        </div>
    </div>
    <div class="flex flex-col justify-center items-center w-full p-2 h-1/2">
        <div class="w-full h-1/2 border-2 border-black p-2 ">
            <p>Price: </p>
            <p>Grain: X kg</p>
        </div>
        <div class="flex justify-around w-full h-1/2 m-3">
            <button class="bg-black hover:bg-blue-700 text-white font-bold py-1 px-3 mx-2 my-2 rounded">
                Fund
            </button>
            <button class="bg-black hover:bg-green-700 text-white font-bold py-1 px-3 mx-2 my-2 rounded">
                View
            </button>
        </div>
    </div>
    <script src="https://maps.googleapis.com/maps/api/js?key="></script> 
</div>
  )
}

export default Descriptioncard