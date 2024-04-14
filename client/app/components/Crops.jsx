import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Crops = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const loadCrops = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/crops`);
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(`error getting crops`, error);
      }
    };
    loadCrops();
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,

    // libraries: ['places'],
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <div className=" mt-4 px-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
      {data?.map((crops) => (
        <>
          <div key={crops._id} className="cards" id="cards">
            {/* {console.log(typeof parseInt(crops.lat))} */}
            <Link href={`./crop/${crops._id}`}>
              <div className="col-span-1  group border-2 border-red-400 rounded-md text-center ">
                <div className=" flex flex-col gap-2 w-full justify-center items-center mt-2">
                  <div className=" aspect-square w-3/4 relative overflow-hidden rounded-xl ">
                    <Image
                      fill
                      alt="Listings"
                      src={crops.imagesrc}
                      className=" object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute -bottom-[2px] -right-[0px] px-2 pb-[2px] mb-[2px] text-sm  rounded-full border  bg-white ">
                      {crops.add1}
                    </div>
                    <div className="absolute top-[1px] px-1  text-xs  rounded-none border  bg-white ">
                      Farmer:- {crops.farmername}
                    </div>
                  </div>

                  <div className=" border-2  w-3/4 h-36 relative overflow-hidden rounded-xl ">
                    <GoogleMap
                      center={{
                        lat: parseInt(crops.lat),
                        lng: parseInt(crops.lon),
                      }}
                      zoom={6}
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                    >
                      <Marker
                        position={{
                          lat: parseInt(crops.lat),
                          lng: parseInt(crops.lon),
                        }}
                      />
                    </GoogleMap>
                  </div>
                </div>

                <div className="font-semibold  mt-1 text-lg flex flex-row items-center justify-around">
                  <div>{crops.grainname}</div>
                  <div className="  gap-2 flex flex-row text-xs border-2 px-1 py-[2px] rounded-md text-red-600 border-red-400 ">
                    {crops.website && (
                      <>
                        <Link href={"https://www.linkedin.com/in/"}>
                          {" "}
                          <button> website/Social</button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                <div className=" mt-1  flex flex-row items-center border-t p-2 justify-around">
                  <div className="text-sm">
                    <span className="font-bold">Quantity:-</span>{" "}
                    {crops.quantity} Kgs
                  </div>

                  <div className="text-sm">Cost/kg :- ₹{crops.cost} </div>
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
