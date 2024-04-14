"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const Crops = () => {
  const [data, setData] = useState();
  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadCrops = async () => {
      try {
        // if (!user) {
        //   return console.log("wait");
        // }
        const res = await axios.get(`http://localhost:4000/api/crops`);
        console.log(res.data);
        setData(
          res.data.filter((crops) => crops.mail === "yashraj.se10@gmail.com")
        );
      } catch (error) {
        console.log(`error getting crops`, error);
      }
    };
    loadCrops();
  }, []);

  return (
    <div className="bg-white py-2 px-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
      {data?.map((crops) => (
        <>
          <div key={crops._id} className="cards" id="cards">
            {/* {console.log(typeof parseInt(crops.lat))} */}

            <div className="col-span-1  group border-2 border-slate-500 rounded-md text-center ">
              <div className=" flex flex-col gap-2 w-full justify-center items-center mt-2">
                <div className=" aspect-square w-3/4 relative overflow-hidden rounded-xl ">
                  <Image
                    fill
                    alt="Listings"
                    src={crops.imagesrc}
                    className=" object-cover h-full w-full group-hover:scale-110 transition"
                  />
                </div>
              </div>

              <div className="font-semibold  mt-1 text-lg flex flex-row items-center justify-around">
                <div className="text-black">{crops.grainname}</div>
                <div className="  gap-2 flex flex-row text-xs border-2 px-1 py-[2px] rounded-md text-red-600 border-red-400 ">
                  <div className="text-sm">
                    <span className="font-bold ">Quantity:-</span>{" "}
                    {crops.quantity} Kgs
                  </div>
                </div>
              </div>

              <div className=" mt-1   items-center border-t p-2 justify-around">
                <div className="text-sm flex flex-col font-semibold text-black border-2 px-2 rounded-lg py-1">
                  <span>Code :- {crops._id} </span>

                  <span className="text-xs font-semibold">
                    (*Note please provide this code to the NGO after the
                    transaction only.)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Crops;
