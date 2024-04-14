"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useForm } from "react-hook-form";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");

// async function getCrop(id) {
//   try {
//     const response = await axios.get(`http://localhost:4000/api/crop/${id}`);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.log(`Error fetching data`, error);
//   }
// }

export default function Page({ params }) {
  const [btn, setBtn] = useState(false);
  const [cropData, setCropData] = useState();
  const [ngoData, setNgoData] = useState();
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const { user, isLoading } = useUser();

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    const forGrains = async () => {
      const id = params.id;
      try {
        if (!user) {
          return console.log("wait");
        }
        const res = await axios.get(
          `http://localhost:4000/api/profile/${user.email}`
        );
        const response = await axios.get(
          `http://localhost:4000/api/crop/${id}`
        );
        setCropData(response.data);
        setNgoData(res.data);

        if (res.data.isa == "ngo") {
          setBtn(true);
        } else {
          console.log("user is not a f");
        }
      } catch (error) {
        console.log(`user is not a farmer`, error);
      }
    };
    forGrains();
  }, [user]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return null;
  }

  const onSubmit = async (data) => {
    if (data.code === cropData._id) {
      try {
        const res = await axios.post("http://localhost:4000/api/addFund", data);

        if (res.data.success) {
          console.log(res.data.message);
        } else {
          console.log(res.data.error);
        }
      } finally {
        reset();
        console.log(data);
      }
    } else {
      console.log("please enter the right code");
    }
  };

  async function calculateRoute() {
    // const origin1 = (parseInt(cropData.lat), parseInt(cropData.lon));
    // const destination1 = (parseInt(ngoData.lat), parseInt(ngoData.lon));
    // if (origin1 === "" || destination1 === "") {
    //   return;
    // }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: new google.maps.LatLng(
        parseInt(cropData.lat),
        parseInt(cropData.lon)
      ),
      destination: new google.maps.LatLng(
        parseInt(ngoData.lat),
        parseInt(ngoData.lon)
      ),

      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    // console.log("this is " + results);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
  }

  return (
    <>
      {cropData && (
        <div data-theme="light h-screen">
          <div className=" flex flex-col mx-6 mb-1  ">
            <span className="font-semibold ">{cropData.grainname}</span>
            <span>{cropData.add2}</span>
            <span>{cropData.add1}</span>
          </div>
          <span className="flex ">
            {" "}
            <div className=" border-2 aspect-square  w-1/2 h-96  relative overflow-hidden rounded-xl mx-6">
              <Image
                fill
                alt="Listings"
                src={cropData.imagesrc}
                className=" object-cover h-full w-full group-hover:scale-110 transition"
              />
            </div>
            <div className=" border-2 aspect-square  w-1/2 h-96 relative overflow-hidden rounded-xl ">
              <GoogleMap
                center={{
                  lat: parseInt(cropData.lat),
                  lng: parseInt(cropData.lon),
                }}
                zoom={6}
                mapContainerStyle={{ width: "100%", height: "100%" }}
              >
                <Marker
                  position={{
                    lat: parseInt(cropData.lat),
                    lng: parseInt(cropData.lon),
                  }}
                />
              </GoogleMap>
            </div>
          </span>
          <div className=" flex-col flex  w-full p-4 ">
            <span className="font-semibold">
              Description(About the Crop and Location) :-
            </span>
            <div className="w-full p-5  border-2 mt-2 border-neutral-300 rounded-md ">
              <p>{cropData.description}</p>
            </div>
            <span className="font-semibold mt-2">
              Quantity of the {cropData.grainname} and Cost Per/Kg :-
            </span>
            <div className="w-full p-5  border-2 mt-2 border-neutral-300 rounded-md ">
              <p>
                {cropData.quantity} Kgs || {cropData.cost} per/kg
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="w-1/2">
                <span className="font-semibold mt-6">
                  Contact Phone & Social :-
                </span>
                <div className="w-full p-5  border-2 mt-2 border-neutral-300 rounded-md ">
                  <p>
                    {cropData.phone} / {cropData.mail}
                  </p>
                </div>
              </div>
              <div className="w-1/2">
                <span className="font-semibold mt-6">Social/website:-</span>
                <div className="w-full p-6 flex items-center justify-center   border-2 mt-2 border-neutral-300 rounded-md ">
                  <Link href={cropData.website}>
                    <FaExternalLinkAlt />
                  </Link>
                </div>
              </div>
            </div>

            {btn && (
              <div
                className=" flex items-center justify-center"
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                <button
                  onClick={calculateRoute}
                  className="border-2 p-2 rounded-xl mt-4 bg-blue-500 text-gray-100"
                >
                  Raise Funding!
                </button>
              </div>
            )}

            <>
              <div>
                <dialog id="my_modal_4" className="  modal ">
                  <div className="modal-box ">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg text-center pb-2">
                      Raise Funding!
                    </h3>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                      <div className="w-full relative">
                        <input
                          {...register("code")}
                          placeholder=" "
                          className={` peer  w-full p-6 pb-2  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
                        />
                        <label
                          className={`absolute text-sm duration-150 transform -translate-y-[14px] top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
                        >
                          Paste the Code provided by Farmer after Purchase.
                        </label>
                      </div>

                      <div className=" mt-2 border-2 h-72 relative overflow-hidden rounded-xl ">
                        <GoogleMap
                          zoom={5}
                          mapContainerStyle={{ width: "100%", height: "100%" }}
                        >
                          {directionsResponse && (
                            <DirectionsRenderer
                              directions={directionsResponse}
                            />
                          )}
                        </GoogleMap>
                        {console.log(directionsResponse)}
                      </div>

                      <div>
                        Approximate distance is {distance} from Farm to Ngo{" "}
                      </div>
                      <div className="w-full relative mt-1">
                        <input
                          {...register("fund")}
                          placeholder=" "
                          className={` peer  w-full pt-4 pb-2  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
                        />
                        <label
                          className={`absolute text-sm duration-150 transform -translate-y-[14px] top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
                        >
                          Required Fund for transportation in $(Including all
                          miscellaneous)
                        </label>
                      </div>
                      <div className="w-full relative mt-1">
                        <input
                          {...register("description")}
                          placeholder=" "
                          className={` peer  w-full pt-5 pb-2  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
                        />
                        <label
                          className={`absolute text-sm duration-150 transform -translate-y-[14px] top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
                        >
                          Description
                        </label>
                      </div>

                      <div className="flex gap-2">
                        <div className="w-full relative mt-1">
                          <input
                            {...register("ngoMail")}
                            defaultValue={ngoData.mail}
                            placeholder=" "
                            className={` peer  w-full pt-4 pb-2  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
                          />
                          <label
                            className={`absolute text-sm duration-150 transform -translate-y-[14px] top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
                          >
                            Ngo mail (for contact)
                          </label>
                        </div>

                        <div className="w-full relative mt-1">
                          <input
                            {...register("ngoSocial")}
                            // defaultValue={name}
                            placeholder=" "
                            defaultValue={ngoData.website}
                            className={` peer  w-full pt-4 pb-2  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
                          />
                          <label
                            className={`absolute text-sm duration-150 transform -translate-y-[14px] top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
                          >
                            Ngo Social
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-4 ">
                        <div className=" w-3/5 relative mt-1">
                          <input
                            {...register("donationId")}
                            placeholder=" "
                            className={` peer  w-full pt-5 pb-2  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
                          />
                          <label
                            className={`absolute text-sm duration-150 transform -translate-y-[14px] top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
                          >
                            Solana Address for fund transfer.
                          </label>
                        </div>
                        <div className="w-2/5 mt-2 ">
                          <WalletMultiButton />
                        </div>
                      </div>

                      <div className="">
                        <input
                          className="hidden"
                          type=""
                          defaultValue={cropData.farmername}
                          {...register("farmerName")}
                        />
                      </div>

                      <div className="">
                        <input
                          className="hidden"
                          type=""
                          defaultValue={ngoData.name}
                          {...register("ngoName")}
                        />
                      </div>

                      <div className="">
                        <input
                          className="hidden"
                          type=""
                          defaultValue={cropData.lat}
                          {...register("cropLat")}
                        />
                      </div>

                      <div className="">
                        <input
                          className="hidden"
                          type=""
                          defaultValue={cropData.lon}
                          {...register("cropLon")}
                        />
                      </div>

                      <div className="">
                        <input
                          className="hidden"
                          type=""
                          defaultValue={ngoData.lat}
                          {...register("ngoLat")}
                        />
                      </div>

                      <div className="">
                        <input
                          className="hidden"
                          type=""
                          defaultValue={ngoData.lon}
                          {...register("ngoLon")}
                        />
                      </div>

                      <div className="">
                        <input
                          className="hidden"
                          type=""
                          defaultValue={cropData.quantity}
                          {...register("quantity")}
                        />
                      </div>

                      <div className="">
                        <input
                          className="hidden"
                          type=""
                          defaultValue={cropData.imagesrc}
                          {...register("imageSrc")}
                        />
                      </div>

                      <button className="border-2 p-2 w-full rounded-xl mt-2 bg-blue-500 text-gray-100">
                        Add for Funding!
                      </button>
                    </form>
                  </div>
                </dialog>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
}
