"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const Crops = () => {
  const [fundsData, setFundsData] = useState();

  useEffect(() => {
    const loadFunds = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/funds`);
        console.log(res.data);
        setFundsData(res.data);
      } catch (error) {
        console.log(`error getting funds`, error);
      }
    };
    loadFunds();
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return null;
  }

  // async function calculateRoute(...cords) {
  //   // const origin1 = (parseInt(cropData.lat), parseInt(cropData.lon));
  //   // const destination1 = (parseInt(ngoData.lat), parseInt(ngoData.lon));
  //   // if (origin1 === "" || destination1 === "") {
  //   //   return;
  //   // }

  //   // eslint-disable-next-line no-undef
  //   const directionsService = new google.maps.DirectionsService();
  //   const results = await directionsService.route({
  //     origin: new google.maps.LatLng(parseInt(cords[0]), parseInt(cords[1])),
  //     destination: new google.maps.LatLng(
  //       parseInt(cords[2]),
  //       parseInt(cords[3])
  //     ),

  //     // eslint-disable-next-line no-undef
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   });
  //   return results;
  //   // // console.log("this is " + results);
  //   // setDirectionsResponse(results);
  //   // setDistance(results.routes[0].legs[0].distance.text);
  //   // setDuration(results.routes[0].legs[0].duration.text);
  // }

  return (
    <div className=" mt-4 px-9 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
      {}
      {fundsData?.map((fund) => (
        <>
          <div key={fund._id} className=" cards" id="cards">
            <Link href={`./fund/${fund._id}`}>
              <div className="col-span-1  group border-2 border-slate-500 rounded-md text-center ">
                <div className=" flex  gap-2 p-1  w-full justify-center items-center">
                  <div className="  border-2  w-3/4 h-80 relative overflow-hidden rounded-xl ">
                    <GoogleMap
                      center={{
                        lat: parseInt(fund.ngolat),
                        lng: parseInt(fund.ngolon),
                      }}
                      zoom={6}
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                    >
                      <Marker
                        position={{
                          lat: parseInt(fund.ngolat),
                          lng: parseInt(fund.ngolon),
                        }}
                      />
                      {/* {calculateRoute(
                          fund.ngolat,
                          fund.ngolon,
                          fund.croplat,
                          fund.ngolat
                        ) && (
                          <DirectionsRenderer
                            directions={calculateRoute(
                              fund.ngolat,
                              fund.ngolon,
                              fund.croplat,
                              fund.ngolat
                            )}
                          />
                        )} */}
                    </GoogleMap>
                    <div className="absolute top-[1px] px-1  text-base font-bold  rounded-none border  bg-white ">
                      Location of NGO.
                    </div>
                  </div>

                  <div className=" aspect-square w-3/4 h-80 border-2 relative overflow-hidden rounded-xl ">
                    <Image
                      fill
                      alt="Listings"
                      src={fund.imagesrc}
                      className=" object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute -bottom-[2px] -right-[0px] px-2 pb-[2px] mb-[2px] text-sm  rounded-full border  bg-white ">
                      {fund.add1}
                    </div>
                    <div className="absolute top-[1px] px-1  text-base font-bold  rounded-none border  bg-white ">
                      Picture of Grain to be transported.
                    </div>
                  </div>
                </div>

                {/* <div className="font-semibold  mt-1 text-lg flex flex-row items-center justify-around">
                  <div>{fund.description}</div>{" "}
                  <div className="  gap-2 flex flex-row text-xs border-2 px-1 py-[2px] rounded-md text-red-600 border-red-400 ">
                    {fund.website && (
                      <>
                        <Link href={"https://www.linkedin.com/in/"}>
                          {" "}
                          <button> website/Social</button>
                        </Link>
                      </>
                    )}
                  </div>
                </div> */}

                <div className=" mt-1 gap-2 flex flex-row items-center border-t p-2 justify-around">
                  <div className="text-sm">
                    <span className="font-bold">Quantity:-</span>{" "}
                    {fund.quantity} Kgs
                  </div>

                  <div className="text-sm">
                    <span className="font-bold">NGO Contact:-</span>{" "}
                    {fund.ngomail}
                  </div>
                </div>

                <div className="">
                  <button className="border-2 px-2 rounded-md py-1 bg-slate-500 mb-2">
                    Click to view full Details{" "}
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </>
      ))}
    </div>
  );
};

export default Crops;
