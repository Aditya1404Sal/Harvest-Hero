import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Ngos = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const loadCrops = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/profiles`);
        // console.log(res.data);
        setData(res.data.filter((profile) => profile.isa === "ngo"));
      } catch (error) {
        console.log(`error getting profiles`, error);
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
      {data?.map((profile) => (
        <>
          <div key={profile._id} className="cards" id="cards">
            <div className="col-span-1  group border-2 border-blue-400 rounded-md text-center ">
              <div className=" flex flex-col gap-2 w-full justify-center items-center mt-2">
                <div className=" aspect-square w-3/4 relative overflow-hidden rounded-xl ">
                  <Image
                    fill
                    alt="Listings"
                    src={profile.imagesrc}
                    className=" object-cover h-full w-full group-hover:scale-110 transition"
                  />
                  <div className="absolute -bottom-[2px] -right-[0px] px-2 pb-[2px] mb-[2px] text-sm  rounded-full border  bg-white ">
                    {profile.add1}
                  </div>
                </div>

                <div className=" border-2  w-3/4 h-36 relative overflow-hidden rounded-xl ">
                  <GoogleMap
                    center={{
                      lat: parseInt(profile.lat),
                      lng: parseInt(profile.lon),
                    }}
                    zoom={6}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                  >
                    <Marker
                      position={{
                        lat: parseInt(profile.lat),
                        lng: parseInt(profile.lon),
                      }}
                    />
                  </GoogleMap>
                </div>
              </div>

              <div className="font-semibold  mt-1 text-lg flex flex-row items-center justify-around">
                <div>{profile.name}</div>
                <div className="   flex flex-row text-xs border-2 px-1 py-[2px] rounded-md text-blue-600 border-blue-400 ">
                  {profile.website && (
                    <>
                      <Link href={"https://www.linkedin.com/in/"}>
                        {" "}
                        <button> website/Social</button>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div className=" m-2 text-sm  border-t pt-1">
                <span className="font-semibold">About:-</span> {profile.about}
              </div>

              <div className="border bg-blue-500 text-slate-100">
                Donate at :- xyz@paytm.com{" "}
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Ngos;
