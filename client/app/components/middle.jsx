"use client";
import React, { useEffect, useState } from "react";
import Crops from "@/app/components/Crops";
import Ngos from "@/app/components/Ngos";
import Funds from "@/app/components/Funds";

const Middle = () => {
  const [select, setSelect] = useState("crops");

  return (
    <div className="bg-white text-black h-screen">
      <div>
        <ul className="flex justify-around items-center border-2 p-1 ">
          <li
            onClick={() => setSelect("crops")}
            className={`w-full text-center pb-1 border-r-2 ${
              select === "crops" ? "border-b-2 border-b-red-600" : ""
            }`}
          >
            Crops
          </li>
          <li
            onClick={() => setSelect("funds")}
            className={`w-full text-center border-r-2 pb-1 ${
              select === "funds" ? "border-b-2 border-b-slate-500" : ""
            }`}
          >
            Funds
          </li>
          <li
            onClick={() => setSelect("ngos")}
            className={`w-full text-center pb-1 ${
              select === "ngos" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Ngos
          </li>
        </ul>
      </div>

      {select == "crops" && (
        <>
          <Crops />
        </>
      )}

      {select == "funds" && (
        <>
          <Funds />
        </>
      )}

      {select == "ngos" && (
        <>
          <Ngos />
        </>
      )}
    </div>
  );
};

export default Middle;
