"use client"

import { Vehicle } from "@/constants/interface";
import { getURL } from "@/utils/GeneralServices";
import { getRelevantCars } from "@/utils/SearchService";
import { priceNumberToString } from "@/utils/VehicleService";
import { useEffect, useState } from "react";
import CarCard from "./Card";

interface SearchProductsProps {
  brandName: string,
  carName: string,
  isClickFind: boolean,
  setIsClickFind: (state: boolean) => void;
}

export default function SearchProducts({brandName, carName, isClickFind, setIsClickFind} : SearchProductsProps) {

  const [carsData, setCarsData] = useState<Vehicle[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isClickFind) {
      const fetchData = async() => {
        const url = getURL();
        let data;
        const pageParam = url.searchParams.get("page");
        if (pageParam != null) {
          const pageNumber = parseInt(pageParam);
          data = await getRelevantCars(carName, brandName, pageNumber);
          const state = {
            "brandName": brandName,
            "carName": carName
          }
          localStorage.setItem('searchState', JSON.stringify(state));
        } else {
          data = await getRelevantCars(carName, brandName);
        }
        if (data.code == 9034) {
          setError("Not Found");
        } else {
          setError("");
          setCarsData(data.BEData.cars);
          setTotalPages(data.BEData.totalPages);
          setCurrentPage(data.currentPage);
        }
      }
      fetchData();

      setIsClickFind(false);
    }

  }, [isClickFind])

  const handleBackToPage1 = () => {
    window.location.href = "/cars?page=1";
  }

  console.log(currentPage)

  return (
    <div className="w-screen pb-24">
      {
        error == "Not Found" ? (
          <div className="flex flex-col justify-center items-center mx-auto text-3xl font-bold dark:text-white text-black">
            <hr className="h-3 w-full mx-auto flex justify-center" />
            <div className="mt-4">Not Found!</div>
            <div className="mt-4">Can Not Find Any Cars In Our Inventory</div>
            <button 
              onClick={handleBackToPage1}
              className="mt-16 p-6 bg-gray-50 text-blue-800 rounded-3xl">
              Back To Page 1
            </button>
          </div>
        ) : null
      }
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 pb-12">
        {
          (Array.isArray(carsData) && carsData.length > 0) && error != "Not Found"?
            carsData.map((carData, index) => {
              return (
                <CarCard
                  key={index}
                  title={carData.vehicleName}
                  description={carData.vehicleDescription}
                  imageLink={carData.vehicleImageUrl}
                  price={priceNumberToString(parseInt(carData.vehiclePrice)) + " VND"}
                />
              )
            }) : null
        }
      </div>
      <div className="flex justify-center mx-auto gap-3 dark:text-white text-black text-xl">
        {
          totalPages > 5 && currentPage > 3 ? 
            <button className="justify-items-end">
              &lt; ...
            </button>
            : null
        }
        <div
          className="justify-center flex"
        >
          {
            Array.from({ length: totalPages + 1 }, (_, index) => {
              if (index != 0 && index >= currentPage - 2 && index <= currentPage + 2) {
                return (
                  <button className={`px-2 ${currentPage == index ? "underline text-blue-600" : ""}`} key={index}>
                    {index}
                  </button>
                );
              }
              return null;
            })
          }
        </div>
        {
          totalPages > 5 && currentPage < totalPages - 2 ? 
            <button>
              ...
              &gt;
            </button>
            : null
        }
      </div>
    </div>
  )
}
