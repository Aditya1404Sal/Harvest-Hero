"use client";


import React, { useState, useEffect } from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";



const page = () => {
  return (
    <>
      <div className="mockup-browser border-2 border-orange-500 m-6">
        <div className="mockup-browser-toolbar">
          <div className="input border border-orange-500">
            https://HarvestHero.com
          </div>
        </div>
        <div className="flex justify-center px-4 py-16 border-t border-orange-500 font-bold">
        Equity, Prosperity, Sustainability!
        </div>
      </div>
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        <li>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start md:text-end mb-10">
            <time className="font-mono italic">Step:-1</time>
            <div className="text-lg font-black ">
            Crop Planning and Diversification:
            </div>
            <li><b>Assess Local Conditions:</b> Understand the soil type, climate, and water availability in your area to select the most suitable crops.</li>
            <li><b>Crop Rotation:</b> Rotate crops seasonally to improve soil fertility, manage pests, and reduce disease risks.</li>
            <li><b>Introduce Cash Crops:</b> Balance staple food crops with high-value cash crops to diversify income streams.</li>
            <iframe
              className="p-6 w-full  "
              width="560"
              height="400"
              src="https://www.youtube.com/embed/xFqecEtdGZ0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end mb-10">
            <time className="font-mono italic">Step:-2</time>
            <div className="text-lg font-black">
            Adopt Modern Farming Practices:
            </div>
            <li><b>Organic Farming:</b> Reduce reliance on synthetic chemicals by using organic fertilizers and pest control methods.</li>
           <li><b>Precision Farming:</b> Use technology for precise application of inputs like water and fertilizers, optimizing resource use.</li>
            <li><b>Water Conservation:</b> Implement drip irrigation or rainwater harvesting to conserve water and ensure efficient irrigation.</li>
            <iframe
              className="p-6 w-full  "
              width="560"
              height="400"
              src="https://www.youtube.com/embed/mYdt6CAwKAY"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start md:text-end mb-10">
            <time className="font-mono italic">Step:- 3</time>
            <div className="text-lg font-black">
            Market Awareness and Selling Strategies:
            </div>
            <li><b>Monitor Market Trends:</b>Stay updated on market prices and demand patterns for different crops.</li>
            <li><b>Direct Marketing:</b>Explore setting up roadside stalls, participating in farmers' markets, or using online platforms to sell produce directly to consumers.</li>
            <li><b>Value-Based Pricing:</b>Differentiate products based on quality or unique attributes to command higher prices.</li>
            <iframe
              className="p-6 w-full "
              width="560"
              height="400"
              src="https://www.youtube.com/embed/LDc0QuAll2Q"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end mb-10">
            <time className="font-mono italic">Step:- 4</time>
            <div className="text-lg font-black">
             Join Agricultural Cooperatives:
            </div>
            <li><b>Form or Join Cooperatives:</b> Collaborate with other farmers to collectively purchase inputs at lower costs and negotiate better prices for produce.</li>
            <li><b>Access Shared Resources:</b> Share machinery, storage facilities, or transportation to reduce individual costs and improve efficiency.</li>
            <li><b>Benefit from Collective Bargaining:</b> Increase bargaining power with buyers and government agencies through collective action.</li>
            <iframe
              className="p-6 w-full "
              width="560"
              height="400"
              src="https://www.youtube.com/embed/uJK63oTy374"
            ></iframe>
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start md:text-end mb-10">
            <time className="font-mono italic">Step:- 5</time>
            <div className="text-lg font-black">Value Addition and Income Diversification:</div>
            <li><b>Processing and Packaging:</b> Explore value addition by processing farm produce into products like jams, pickles, or dried fruits.</li>
            <li><b>Livestock or Fishery:</b> Integrate animal husbandry or fish farming into agricultural operations for diversified income streams.</li>
            <li><b>Agro-Tourism:</b> Offer farm stays, guided tours, or workshops to generate additional income and promote rural tourism.</li>
            <iframe
              className="p-6 w-full "
              width="560"
              height="400"
              src="https://www.youtube.com/embed/QyM7OWlEbHo"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </li>
      </ul>

      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4 border-2 border-neutral-700 px-4 py-2 rounded-2xl">
          <a className="link link-hover">Crops</a>
          <a className="link link-hover">Funds</a>
          <a className="link link-hover">NGOs</a>
        </nav>
        <nav className="gap-6">
          <span>Made with ❤️ By :-</span>
          <span className="flex gap-32">
            {" "}
            <div className="items-center justify-center flex-col flex gap-y-2 ">
              <Image
                className="rounded-full border-2 border-black"
                height={60}
                width={60}
               src="https://avatars.githubusercontent.com/u/114144836?s=400&u=b6e489363b59e9cb5e6bff71f1c86b1e503c355e&v=4"
              />
              <div className="grid grid-flow-col gap-4">
                <Link href="https://twitter.com/Yashrajstwt">
                  <FaSquareXTwitter size={24} />
                </Link>
                <Link href="https://github.com/yash-raj10">
                  <AiFillGithub size={24} />
                </Link>
                <Link href="https://www.linkedin.com/in/yash-raj-in/">
                  <FaLinkedin size={24} />
                </Link>
              </div>
            </div>
            <div className="items-center justify-center flex-col flex gap-y-2 ">
              <Image
                className="rounded-full border-2 border-black"
                height={60}
                width={60}
                src="https://avatars.githubusercontent.com/u/91340059?v=4"
              />
              <div className="grid grid-flow-col gap-4">
                <Link href="https://twitter.com/AdiTechSavvy">
                  <FaSquareXTwitter size={24} />
                </Link>
                <Link href="https://github.com/Aditya1404Sal">
                  <AiFillGithub size={24} />
                </Link>
                <Link href="https://www.linkedin.com/in/aditya-salunkhe-24477a256/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                  <FaLinkedin size={24} />
                </Link>
              </div>
            </div>
          </span>
        </nav>
        <aside>
          <p>Copyright © 2024 - harvesthero!</p>
        </aside>
      </footer>
    </>
  );
};

export default page;