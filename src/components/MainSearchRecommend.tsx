"use client";

import { useEffect, useState } from "react";

interface MainSearchRecommendProps {
  mainSearchRecommend: string[];
}

export default function MainSearchRecommend({ mainSearchRecommend }: MainSearchRecommendProps) {
  const [displayedItems, setDisplayedItems] = useState<string[]>([]);

  useEffect(() => {
    setDisplayedItems(mainSearchRecommend);
  }, [mainSearchRecommend]);

  // alert(mainSearchRecommend)

  return (
    <div>
      {
        displayedItems.length != 0 ? (
          displayedItems.map((carName, index) => {
            if (index > 3) {
              return null;
            }
            return <div className={`flex relative w-3/4 mx-auto`} key={index}>
              <div className={`w-full pl-10 border-2 border-gray-200 hover:bg-blue-300 hover:border-blue-300 bg-white items-center flex font-bold ${index === 0 ? "rounded-t-lg" : ""}${index === 3 ? "rounded-b-lg" : ""}`} key={index}>{carName}</div>
              <div className="px-3 ease-in-out duration-100">
                <div
                  className={`disabled px-12 py-4 items-center flex rounded-xl opacity-0`}
                >
                  Find
                </div>
              </div>
              <div className="px-3">
                <div
                  className={`px-3 py-1 items-center flex rounded-xl opacity-0`}
                >
                  More Options...
                  {
                    true && (
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
                </div>
              </div>
            </div>
          })
        ) : (<div></div>)
      }
    </div>
  )
}
