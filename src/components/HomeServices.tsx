"use client"

import { mainServices, otherServices } from "@/constants";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import CardCarousel from "./CardCarousel";

export default function HomeServices() {

  const [choosenService, setChoosenService] = useState(2);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Mock
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const chooseFixingService = () => {
    setChoosenService(1);
  }

  const chooseCaringService = () => {
    setChoosenService(2);
  }

  return (
    <div className="flex flex-col justify-center font-bold gap-10 dark:text-white text-black p-6">
      <h1 className="lg:text-4xl text-2xl mt-20 flex">
        ABOUT OUR SERVICES
      </h1>
      {/* <h3 className="font-medium text-2xl text-gray-600 dark:text-white mt-9 flex justify-center">
        Discover our impressive cars
      </h3> */}
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:border-b-2 font-semibold text-xl">
        <button 
          onClick={chooseCaringService}
          className={`${choosenService == 2 ? "border-b-red-600 border-b-2 dark:border-b-blue-600 dark:text-blue-600": ""} hover:text-blue-900 border-b-2`}>
          Caring and Others services
        </button>
        <div className={`lg:hidden ${choosenService == 1 ? "hidden transition-all duration-1000" : ""}`}>
          {loading ? (
            <Skeleton variant="rounded" animation="wave" width="100%" height={300} />
          ) : (
            <CardCarousel
              cards={otherServices}
            />
          )}
        </div>
        <button 
          onClick={chooseFixingService}
          className={`${choosenService == 1 ? "border-b-red-600 border-b-2 dark:border-b-blue-600 dark:text-blue-600": ""} hover:text-blue-900 border-b-2`}>
          Fixing and Maintaining services
        </button>
        <div className={`lg:hidden ${choosenService == 2 ? "hidden transition-all duration-1000" : ""}`}>
          {loading ? (
            <Skeleton variant="rounded" animation="wave" width="100%" height={300} />
          ) : (
            <CardCarousel
              cards={mainServices}
            />
          )}
        </div>
      </div>
      <div className="hidden lg:flex">
        {loading ? (
          <Skeleton variant="rounded" animation="wave" width="100%" height={300} />
        ) : 
          (<CardCarousel
            cards={choosenService === 1 ? mainServices : otherServices}
          />)
        }
      </div>
    </div>
  )
}
