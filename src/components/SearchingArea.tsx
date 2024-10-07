"use client"

import { brandLogosList } from "@/constants";
import useDebounce from "@/hooks/useDebounce";
import { fetchAllBrandNames, fetchRecommendedCarNames } from "@/utils/SearchService";
import { useEffect, useState } from "react";
import CarBrand from "./CarBrand";
import MainSearchRecommend from "./MainSearchRecommend";

export default function SearchingArea() {

  const [mainInput, setMainInput] = useState<string>("");
  const debouncedMainSearch = useDebounce(mainInput, 666);
  const [isMore, setIsMore] = useState(false);
  const [mainSearchRecommend, setMainSearchRecommend] = useState<string[]>([]);
  const [isMainSearchRecommend, setIsMainSearchRecommend] = useState(true);
  const [brandsRecommend, setBrandsRecommend] = useState<string []>([]);
  const [brandsInitialData, setBrandsInitialData] = useState<string []>([]);
  const [brandSearchField, setBrandSearchField] = useState("");
  const [choosenBrand, setChoosenBrand] = useState<string|undefined>("");
  const [isChooseBrand, setIsChooseBrand] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async() => {
      const data = await fetchAllBrandNames();
      setBrandsInitialData(data);
    }
    fetchData();
  }, [])

  useEffect(() => {
    if (choosenBrand)
      setBrandSearchField(choosenBrand);
  }, [choosenBrand])

  useEffect(() => {
    setMainInput("");
    const fetchData = async() => {
      if (debouncedMainSearch == "") {
        return
      }
      const data = await fetchRecommendedCarNames(debouncedMainSearch);
      setMainSearchRecommend(data);
    }
    fetchData();
    console.log(mainSearchRecommend)
  }, [debouncedMainSearch])

  const handleClickMoreOptions = () => {
    setIsMore(!isMore);
    setIsMainSearchRecommend(false);
  }

  const handleClickFind = () => {
    // setIsMore(!isMore);
  }

  const handleChangeMainSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == "") {
      setIsMainSearchRecommend(false);
    } else {
      setIsMainSearchRecommend(true);
      setMainInput(event.target.value);
    }
  }

  const handleBrandClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsChooseBrand(true);
    if (event.currentTarget.textContent?.toString())
      setBrandSearchField(event.currentTarget.textContent?.toString());
    setChoosenBrand(event.currentTarget.textContent?.toString());
  }

  const handleChangeBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChooseBrand(false)
    setBrandSearchField(event.target.value);
    setBrandsRecommend(brandsInitialData.filter((brand) => {
      return brand.includes(event.target.value.toLowerCase());
    }))
  }

  return (
    <div>
      <div className="w-screen h-auto py-14 bg-gray-200 dark:bg-gray-900">
        <h1 className="flex justify-center mb-6 text-4xl font-bold text-black dark:text-white">
          SEARCH
        </h1>
        <div className="w-3/4 flex mx-auto relative justify-between">
          <input
            className="border-2 border-gray-700 dark:border-gray-700 p-3 rounded-lg text-black w-full pl-10 hover:border-blue-800 focus:border-blue-800 outline-none"
            type="text"
            readOnly={isMore}
            disabled={isMore}
            placeholder="Which car do you want to find ?"
            onChange={handleChangeMainSearch}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M15 11a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </div>
          {
            !isMore && (
              <div className="px-3 ease-in-out duration-100">
                <button
                  onClick={handleClickFind}
                  className={`px-12 py-4 items-center flex rounded-xl bg-red-500 hover:bg-red-700 hover:scale-[1.05] duration-75 transition-all`}
                  type="button"
                  title="Find"
                >
                  Find
                </button>
              </div>
            )
          }
          <div className="px-3">
            <button
              onClick={handleClickMoreOptions}
              className={`px-3 py-1 items-center flex rounded-xl
                ${isMore ? "bg-gray-700 dark:bg-gray-700 scale-[1.05]": "bg-gray-600 dark:bg-gray-500"}
                hover:bg-gray-700 dark:hover:bg-gray-700
                hover:scale-[1.05] duration-75 transition-all`}
              type="button"
              title="More Options"
            >
              More Options...
              {
                !isMore && (
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                )
              }
              {
                isMore && (
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                )
              }
            </button>
          </div>
        </div>
        {
          isMainSearchRecommend && (
            <MainSearchRecommend
              mainSearchRecommend={mainSearchRecommend}
            />
          )
        }
      </div>
      {/* Brands */}
      <div className={`hidden bg-gray-200 dark:bg-gray-900 mx-auto justify-center gap-3 ${isMore ? "lg:flex lg:flex-col" : ""}  py-6`}>
        <div className="flex justify-between items-center gap-3">
          {
            brandLogosList.map((object, index) => {
              if (index > 6) return;
              return (
                <CarBrand
                  handleClick={handleBrandClick}
                  currentBrand={choosenBrand}
                  key={index}
                  brandName={object[0]}
                />
              )
            })
          }
        </div>
        <div className="flex justify-between gap-3">
          {
            brandLogosList.map((object, index) => {
              if (index < 7 || index > 13) return;
              return (
                <CarBrand
                  handleClick={handleBrandClick}
                  currentBrand={choosenBrand}
                  key={index}
                  brandName={object[0]}
                />
              )
            })
          }
        </div>
        <div className="flex justify-between gap-3">
          {
            brandLogosList.map((object, index) => {
              if (index < 14 || index > 20) return;
              return (
                <CarBrand
                  handleClick={handleBrandClick}
                  currentBrand={choosenBrand}
                  key={index}
                  brandName={object[0]}
                />
              )
            })
          }
        </div>
        <div className="flex justify-between gap-3">
          <div className="flex justify-center flex-grow">
            <CarBrand
              handleClick={handleBrandClick}
              currentBrand={choosenBrand}
              brandName={brandLogosList[21][0]}
            />
          </div>
          <div className="flex justify-center flex-grow">
            <CarBrand
              handleClick={handleBrandClick}
              currentBrand={choosenBrand}
              brandName={brandLogosList[22][0]}
            />
          </div>
        </div>
      </div>
      {
        isMore && (
          <div>
            <div className="flex justify-between gap-16 bg-gray-200 dark:bg-gray-900">
              <div className="flex-grow relative p-6">
                <div className="text-black dark:hidden flex text-xl font-bold absolute -translate-y-1/2 bg-gray-100 translate-x-1/2 px-3 rounded-xl">
                  <h2>Brand (1)</h2>
                </div>
                <div className="bg-gray-900 hidden dark:flex text-xl font-bold dark:text-white px-3">
                  <h2>Brand (1)</h2>
                </div>
                <div>
                  <input
                    className="border-2 border-gray-700 py-3 rounded-lg text-black w-full pl-3 hover:border-blue-800 focus:border-blue-800 outline-none"
                    type="text"
                    placeholder={"Which brand do you want to find ?"}
                    onChange={handleChangeBrand}
                    value={brandSearchField}
                  />
                  {
                    brandsRecommend.map((brand, index) => {
                      if (brandSearchField == "" || isChooseBrand) {
                        return null;
                      } else {
                        if (index > 3) {
                          return null;
                        } else {
                          return (
                            <button
                              onClick={handleBrandClick}
                              type="button"
                              className={`h-auto py-3 pl-3 bg-white w-full items-center font-bold flex ${index == 0 ? "rounded-t-lg" : ""} ${index == brandsRecommend.length - 1 ? "rounded-b-lg" : ""} ${brandsRecommend.length == 1 ? "rounded-lg" : ""}`}
                              key={index}>{brand.toUpperCase()}</button>
                          )
                        }
                      }
                    })
                  }
                </div>
              </div>
              <div className="flex-grow relative p-6">
                <div className="dark:hidden text-black text-xl font-bold absolute -translate-y-1/2 bg-gray-100 translate-x-1/2 px-3 rounded-xl">
                  <h2>Car Name (2)</h2>
                </div>
                <div className="bg-gray-900 hidden dark:flex text-xl font-bold dark:text-white px-3">
                  <h2>Car Name (2)</h2>
                </div>
                <input
                  className="border-2 border-gray-700 p-3 rounded-lg text-black w-full pl-3 hover:border-blue-800 focus:border-blue-800 outline-none"
                  type="text"
                  placeholder="Which car do you want to find ?"
                  disabled={brandSearchField == ""}
                />
              </div>
            </div>
            <div className="pb-6 bg-gray-200 dark:bg-gray-900">
              <button
                type="button"
                title="Find"
                className="flex justify-center items-center bg-red-500 hover:bg-red-700 mx-auto px-16 py-4 font-bold rounded-3xl text-2xl"
              >
                Find
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}
