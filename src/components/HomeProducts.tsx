"use client"

import { ThemeContext } from "@/contexts/ThemeContext";
import Image from "next/image";
import { useContext } from "react";
import ImgMediaCard from "./Card";
import ImageSlider from "./ImageSlider";

export default function HomeProducts() {

  const themeValues = useContext(ThemeContext)

  return (
    <div className="flex flex-col justify-between">
      <ImageSlider/>
      <div className="flex mr-auto justify-center font-bold dark:text-white text-black p-6">
        <h1 className="lg:text-4xl text-2xl mt-12 flex">
          DISCOVER OUR IMPRESSIVE CARS
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-5">
        <div className="">
          <ImgMediaCard
            title=""
            description=""
            imageLink="/images/background.jpg"
          />
        </div>
        <div>
          <ImgMediaCard
            title=""
            description=""
            imageLink="/images/background.jpg"
          />
        </div>
        <div>
          <ImgMediaCard
            title=""
            description=""
            imageLink="/images/background.jpg"
          />
        </div>
        <div>
          <ImgMediaCard
            title=""
            description=""
            imageLink="/images/background.jpg"
          />
        </div>
        <div>
          <ImgMediaCard
            title=""
            description=""
            imageLink="/images/background.jpg"
          />
        </div>
        <div>
          <ImgMediaCard
            title=""
            description=""
            imageLink="/images/background.jpg"
          />
        </div>
      </div>

      <div className="flex justify-center w-11/12 border-t-2 border-b-2 border-gray-300 dark:border-white mt-24 items-center mx-auto">
        <div className="grid grid-cols-3 gap-14 lg:gap-32 my-3">
          <button className="flex flex-col items-center hover:scale-[1.06]" title="Discount">
            <Image
              src={`${themeValues?.themeMode == 'dark' ? '/images/discount-logo-white.png' : "/images/discount-logo.png"}`}
              alt="Discount"
              width={80}
              height={80}
            />
            <h3 className="font-bold text-xl text-black dark:text-white">
              Discount
            </h3>
          </button>
          <button className="flex flex-col items-center hover:scale-[1.06]" title="Prices List">
            <Image
              src={`${themeValues?.themeMode == 'dark' ? '/images/price-white.png' : "/images/price.png"}`}
              alt="Prices List"
              width={80}
              height={80}
            />
            <h3 className="font-bold text-xl text-black dark:text-white">
              Prices List
            </h3>
          </button>
          <button className="flex flex-col items-center hover:scale-[1.06]" title="Test Drive">
            <Image
              src={`${themeValues?.themeMode == 'dark' ? '/images/steering-wheel-white.png' : "/images/steering-wheel.png"}`}
              alt="Test Drive"
              width={80}
              height={80}
            />
            <h3 className="font-bold text-xl text-black dark:text-white">
              Test Drive
            </h3>
          </button>
        </div>
      </div>
    </div>
  )
}
