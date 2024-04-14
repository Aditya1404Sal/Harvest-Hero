"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GiClick } from "react-icons/gi";
import { CldUploadWidget } from "next-cloudinary";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import axios from "axios";

export const AddGrains = ({ add1, name, mail, phone, social }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const { register, reset, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      imageSrc: "",
    },
  });

  const fetchLocation = () => {
    return navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = JSON.stringify(position.coords.latitude);
        let lon = JSON.stringify(position.coords.longitude);
        console.log(lat + "," + lon);
        setLatitude(lat);
        setLongitude(lon);
      },
      () => {
        console.log("issue fetching location");
      }
    );
  };

  const onSubmit = async (data) => {
    data.quantity = parseInt(data.quantity);
    data.cost = parseInt(data.cost);
    try {
      const res = await axios.post("http://localhost:4000/api/addCrop", data);

      if (res.data.success) {
        console.log(res.data.message);
      } else {
        console.log(res.data.error);
      }
    } finally {
      reset();
    }
    console.log(data);
  };

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onChange = (value) => {
    setCustomValue("imageSrc", value);
  };

  const handleUpload = useCallback((result) => {
    onChange(result.info.secure_url);
  }, []);

  let imageSrc = watch("imageSrc");

  return (
    <>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center gap-3 mb-2">
          <div
            className="border-2 p-2 rounded-xl max-w-48 bg-purple-400"
            onClick={() => fetchLocation()}
          >
            <span className="flex gap-2">
              Get Live Location <GiClick size={24} />
            </span>
          </div>
          <div>
            {latitude && (
              <div className="text-sm">
                <input
                  className="hidden"
                  type=""
                  id={latitude}
                  value={latitude}
                  {...register("lat")}
                />
                <span className="font-semibold">Latitude :-</span> {latitude}
              </div>
            )}
            {longitude && (
              <div className="text-sm">
                <input
                  className="hidden"
                  type=""
                  id={longitude}
                  value={longitude}
                  {...register("lon")}
                />
                <span className="font-semibold">Latitude :-</span> {longitude}
              </div>
            )}
          </div>
        </div>
        <div className="  w-full ">
          <div className="flex-col mx-8  ">
            <div className=" w-full  flex items-center justify-center my-4 ">
              <div className=" w-2/3  ">
                <CldUploadWidget
                  onUpload={handleUpload}
                  uploadPreset="jifxbwzs"
                  options={{ maxFiles: 1 }}
                >
                  {({ open }) => {
                    return (
                      <div className="">
                        <div
                          onClick={() => open?.()}
                          className="  relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral flex flex-col justify-center items-center gap-4 text-neutral-600"
                        >
                          <TbPhotoPlus size={30} />
                          <div className="font-semibold text-sm">
                            Click to Upload Crops Picture
                          </div>
                          {imageSrc && (
                            <div className="absolute inset-0 w-full h-full ">
                              <Image
                                alt="Upload"
                                fill
                                style={{ objectFit: "cover" }}
                                src={imageSrc}
                              ></Image>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }}
                </CldUploadWidget>
              </div>
            </div>

            <div className="w-full  relative  ">
              <input
                {...register("grainName")}
                placeholder=" "
                className={` peer  w-full p-5 pb-4  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Name of the grain
              </label>
            </div>

            <div className="w-full  relative pt-1">
              <input
                {...register("quantity")}
                placeholder=" "
                className={` peer  w-full p-5 pb-4 font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Quantity in Kgs
              </label>
            </div>
            <div className="w-full  relative pt-1">
              <input
                {...register("cost")}
                placeholder=" "
                className={` peer  w-full p-5 pb-4 font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Cost/Kg
              </label>
            </div>

            <div className="w-full  relative pt-1">
              <input
                {...register("description")}
                placeholder=" "
                className={` peer  w-full p-5 pb-4 font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Description
              </label>
            </div>

            <div className="w-full  relative pt-1">
              <input
                {...register("add2")}
                placeholder=" "
                className={` peer  w-full p-5 pb-4 font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Address:- (City, Street, Pin, etc)
              </label>
            </div>

            <div className="">
              <input
                className="hidden"
                type=""
                defaultValue={add1}
                {...register("add1")}
              />
            </div>
            <div className="">
              <input
                className="hidden"
                type=""
                defaultValue={mail}
                {...register("mail")}
              />
            </div>
            <div className="">
              <input
                className="hidden"
                type=""
                defaultValue={name}
                {...register("name")}
              />
            </div>
            <div className="">
              <input
                className="hidden"
                type=""
                defaultValue={phone}
                {...register("phone")}
              />
            </div>

            <div className="">
              <input
                className="hidden"
                type=""
                defaultValue={social}
                {...register("website")}
              />
            </div>
          </div>
        </div>
        <div className="justify-center items-center flex mt-3">
          <button
            className="border-gray-400 bg-purple-400 border-2 px-2 py-1 rounded-lg"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
