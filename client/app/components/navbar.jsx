"use client";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { GiClick } from "react-icons/gi";
import { MdAccountBox } from "react-icons/md";
import { useForm } from "react-hook-form";
import { AddGrains } from "./model/addGrains";
import { CldUploadWidget } from "next-cloudinary";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { user, isLoading } = useUser();
  const [showCompleatModal, setShowCompleatModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [profile, setProfile] = useState("farmer");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [Data, setData] = useState();
  const [showGrainsBtn, setShowGrainsBtn] = useState(false);
  const [farmerData, setFarmerData] = useState();
  const [farmerCrops, setFarmerCrops] = useState();

  const { register, reset, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      imageSrc: "",
    },
  });

  const onSubmitCompleat = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/addProfile",
        data
      );

      if (res.data.success) {
        console.log(res.data.message);
      } else {
        console.log(res.data.error);
      }
    } finally {
      console.log(data);
      reset();
      setShowCompleatModal(false);
    }
  };

  const onSubmitEdit = async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/profile/${user.email}`,
        data
      );
      console.log(user.email);
    } finally {
      console.log(data);
      reset();
      setEditShowModal(false);
    }
  };

  const open = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/profile/${user.email}`
      );
      let x = res.data;
      console.log(x);

      if (res.data) {
        setEditShowModal(true);
        setData(res.data);
      } else {
        setShowCompleatModal(true);
        console.log("registered user not found");
      }
    } catch (error) {
      setShowCompleatModal(true);
      console.log(`Data not Found`, error);
    }
  };

  useEffect(() => {
    const forGrains = async () => {
      try {
        if (!user) {
          return console.log("wait");
        }
        const res = await axios.get(
          `http://localhost:4000/api/profile/${user.email}`
        );
        console.log(res.data);

        if (res.data.isa == "farmer") {
          setShowGrainsBtn(true);
          setFarmerData(res.data);

          const resp = await axios.get(`http://localhost:4000/api/crops`);
          setFarmerCrops(
            resp.data.filter((crops) => crops.mail === user.email)
          );
          // setFarmerCrops(resp.data);

          // console.log("this is farmer data " + resp.data.name);
          // setFarmerCrops()
          // console.log("yesssss");
        } else {
          console.log("user is not a farmer");
        }
      } catch (error) {
        console.log(`some error at navbar`, error);
      }
    };
    forGrains();
  }, [user]);

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

  const logoutHandler = () => {
    window.location.reload();
    }

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

  function Fill({
    emaill,
    nameLabel,
    abtLabel,
    name,
    website,
    add1,
    add2,
    about,
    phone,
    image,
  }) {
    return (
      <>
        <div className="  w-full ">
          <div className="flex-col ">
            <div className="w-full  flex items-center justify-center my-4 ">
              <div className="  w-2/3  ">
                <CldUploadWidget
                  onUpload={handleUpload}
                  uploadPreset="jifxbwzs"
                  options={{ maxFiles: 1 }}
                >
                  {({ open }) => {
                    return (
                      <div
                        onClick={() => open?.()}
                        className="  relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-12 border-neutral flex flex-col justify-center items-center gap-1 text-neutral-600"
                        // style={{ zIndex: "20" }}
                      >
                        <TbPhotoPlus size={24} />

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
                    );
                  }}
                </CldUploadWidget>
              </div>
            </div>

            <div className="w-full  relative  ">
              <input
                {...register("name")}
                defaultValue={name}
                placeholder=" "
                className={` peer  w-full p-5 pb-4  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                {nameLabel}
              </label>
            </div>

            <div className="w-full  relative pt-1">
              <input
                {...register("add1")}
                defaultValue={add1}
                placeholder=" "
                className={` peer  w-full p-5 pb-4 font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Address :- (Country, State)
              </label>
            </div>

            <div className="w-full  relative pt-1">
              <input
                {...register("add2")}
                defaultValue={add2}
                placeholder=" "
                className={` peer  w-full p-5 pb-4 font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                (City, Street, Pin, etc)
              </label>
            </div>

            <div className="w-full  relative pt-1">
              <input
                {...register("about")}
                defaultValue={about}
                placeholder=" "
                className={` peer  w-full p-5 pb-4 font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                {abtLabel}
              </label>
            </div>

            <div className="w-full pt-1 relative">
              <input
                {...register("mail")}
                defaultValue={emaill}
                placeholder=" "
                type="text"
                className={` peer  w-full p-5 pb-4 font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Mail ID
              </label>
            </div>

            <div className="w-full pt-1  relative">
              <input
                {...register("phone")}
                defaultValue={phone}
                placeholder=" "
                className={` peer  w-full p-5 pb-4 font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Phone
              </label>
            </div>

            <div className="w-full pt-1  relative">
              <input
                {...register("website")}
                defaultValue={website}
                placeholder=" "
                className={` peer  w-full p-5 pb-4 font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Website / Any social link
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-white text-black">
        {user && (
          <div className="navbar bg-base-100 gap-2   shadow-md border">
            <div className="w-full flex justify-between">
              <div className="">
                <a className="btn btn-neutral text-xl bg-zinc-600"><Link href="/">HarvestHero</Link></a>
              </div>

              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 md:w-auto"
                />
              </div>

              {showGrainsBtn && (
                <button
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                  className="rounded-2xl py-3 px-4 border-2  bg-blue-500 text-gray-100"
                >
                  Add Your Grains
                </button>
              )}
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={user.picture} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 text-black rounded-box w-52"
              >
                <li>
                  <a className="justify-between" onClick={open}>
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                {showGrainsBtn && (
                  <li>
                    <button
                      onClick={() =>
                        document.getElementById("my_modal_5").showModal()
                      }
                    >
                      Your Grains
                    </button>
                  </li>
                )}
                <li>
                  <Link href="/learn">
                    Learn
                  </Link>
                </li>
                <li>
                  <a onClick={logoutHandler}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}

        <>
          <div
          // className="-z-50"
          >
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box ">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg text-center">
                  Add your grains!
                </h3>
                <p className="py-4">
                  Please Provide a detailed Description about the Excess Crops
                  left.
                </p>{" "}
                {farmerData && (
                  <AddGrains
                    add1={farmerData.add1}
                    name={farmerData.name}
                    mail={farmerData.mail}
                    phone={farmerData.phone}
                    social={farmerData.website}
                  />
                )}
              </div>
            </dialog>
          </div>
        </>

        <>
          <div>
            <dialog id="my_modal_5" className="modal">
              <div className="modal-box ">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg text-center">
                  Your Listed Grains.
                </h3>

                <div className="bg-white py-2  ">
                  {farmerCrops?.map((crops) => (
                    <>
                      <div key={crops._id} className="cards mb-2" id="cards">
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
                              <span>
                                Code :-{" "}
                                <span className="border-2 border-black px-1 rounded-lg">
                                  {crops._id}
                                </span>{" "}
                              </span>

                              <span className="text-xs pt-1 ">
                                (*Note please provide this code to the NGO after
                                the transaction only.)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </dialog>
          </div>
        </>

        {!isLoading && !user && (
          <p>
            <a href="/api/auth/login">Sign in</a>
          </p>
        )}
        {/* ------------------------------------------------------------------------------------------------------------------------------------------ */}
        {showCompleatModal && (
          <>
            <div className="mw z-10 fixed left-0 right-0 bottom-0 top-0 backdrop-blur "></div>
            <div className="mc z-20 fixed  left-1/2 right-0 bottom-0 top-16 border  rounded-3xl px-6 bg-slate-300 text-center">
              <div className="w-full mt-1  text-right">
                {" "}
                <button
                  onClick={() => setShowCompleatModal(false)}
                  className="text-lg font-bold"
                >
                  X
                </button>
              </div>

              <h2 className="font-bold text-3xl p-2 pt-0 mt-0">
                <span className="flex justify-center items-center gap-1">
                  {" "}
                  <MdAccountBox size={36} />
                  Compleat Profile
                </span>
              </h2>

              <form onSubmit={handleSubmit(onSubmitCompleat)}>
                <div className="flex  justify-center">
                  <div
                    className="border-2 p-2 rounded-xl bg-purple-400"
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
                        <span className="font-semibold">Latitude :-</span>{" "}
                        {latitude}
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
                        <span className="font-semibold">Latitude :-</span>{" "}
                        {longitude}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="join gap-1 pt-2">
                    <input
                      onClick={() => setProfile("farmer")}
                      className="join-item btn btn-square p-2 w-20"
                      type="radio"
                      name="options"
                      value="farmer"
                      aria-label="farmer"
                      id="farmer"
                      {...register("isA")}
                    />

                    <input
                      onClick={() => setProfile("ngo")}
                      className=" w-20 join-item btn btn-square p-2"
                      type="radio"
                      name="options"
                      aria-label="ngo"
                      id="ngo"
                      value="ngo"
                      {...register("isA")}
                    />
                  </div>
                </div>

                {profile == "farmer" && (
                  <Fill
                    emaill={user.email}
                    nameLabel={"Farmer full Name"}
                    abtLabel={"About Farmer"}
                  />
                )}
                {profile == "ngo" && (
                  <Fill
                    emaill={user.email}
                    nameLabel={"NGO Name"}
                    abtLabel={" Description (Which niche it is working on)"}
                  />
                )}

                <button
                  className=" py-4 px-6  m-2 rounded-2xl bg-zinc-500 text-black font-semibold"
                  type="submit"
                >
                  Submit!
                </button>
              </form>
            </div>
          </>
        )}
        {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
        {showEditModal && (
          <>
            {/* <addGrains /> */}

            <div className="mw z-10 fixed left-0 right-0 bottom-0 top-0 backdrop-blur "></div>
            <div className="mc z-20 fixed  left-1/2 right-0 bottom-0 top-16 border  rounded-3xl px-6 bg-slate-300 text-center">
              <div className="w-full mt-1  text-right">
                {" "}
                <button
                  onClick={() => setEditShowModal(false)}
                  className="text-lg font-bold"
                >
                  X
                </button>
              </div>
              <h2 className="font-bold text-3xl p-2 pt-0 mt-0">
                <span className="flex justify-center items-center gap-1">
                  {" "}
                  <MdAccountBox size={40} />
                  Edit Profile
                </span>
              </h2>
              <form onSubmit={handleSubmit(onSubmitEdit)}>
                <div className="flex gap-2  justify-center">
                  <div className="text-base text-white">
                    <input
                      className=" rounded-xl  text-center p-2 bg-violet-500 w-20"
                      type="text"
                      defaultValue={Data.isa}
                      name="options"
                      value={Data.isa}
                      aria-label={Data.isa}
                      id={Data.isa}
                      {...register("isA")}
                    />
                  </div>

                  <div
                    className="border-2 p-2 rounded-xl bg-purple-400"
                    onClick={() => fetchLocation()}
                  >
                    <span className="flex gap-2 text-sm">
                      Get Live Location <GiClick size={24} />
                    </span>
                  </div>

                  <div>
                    {latitude && (
                      <div className="text-sm">
                        <input
                          className="hidden"
                          type=""
                          defaultValue={Data.lat}
                          id={latitude}
                          value={latitude}
                          {...register("lat")}
                        />
                        <span className="font-semibold">Latitude :-</span>{" "}
                        {latitude}
                      </div>
                    )}
                    {longitude && (
                      <div className="text-sm">
                        <input
                          className="hidden"
                          type=""
                          defaultValue={Data.lon}
                          id={longitude}
                          value={longitude}
                          {...register("lon")}
                        />
                        <span className="font-semibold">Latitude :-</span>{" "}
                        {longitude}
                      </div>
                    )}
                  </div>
                </div>

                {Data.isa == "farmer" && (
                  <Fill
                    emaill={user.email}
                    name={Data.name}
                    website={Data.website}
                    add1={Data.add1}
                    add2={Data.add2}
                    about={Data.about}
                    phone={Data.phone}
                    image={Data.imageSrc}
                    nameLabel={"Farmer full Name"}
                    abtLabel={"About Farmer"}
                  />
                )}
                {Data.isa == "ngo" && (
                  <Fill
                    emaill={user.email}
                    name={Data.name}
                    website={Data.website}
                    add1={Data.add1}
                    add2={Data.add2}
                    about={Data.about}
                    phone={Data.phone}
                    image={Data.imageSrc}
                    nameLabel={"NGO Name"}
                    abtLabel={" Description (Which niche it is working on)"}
                  />
                )}

                <button
                  className=" py-4 px-6  m-2 rounded-2xl bg-zinc-500 text-black font-semibold"
                  type="submit"
                >
                  Submit!
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
