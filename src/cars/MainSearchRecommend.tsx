'use client';

import { useEffect, useState } from 'react';

interface MainSearchRecommendProps {
  mainSearchRecommend: string[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
}

export default function MainSearchRecommend({
  mainSearchRecommend,
  className,
  handleClick,
}: MainSearchRecommendProps) {
  const [displayedItems, setDisplayedItems] = useState<string[]>([]);

  useEffect(() => {
    setDisplayedItems(mainSearchRecommend);
  }, [mainSearchRecommend]);

  // alert(mainSearchRecommend)

  return (
    <div>
      {displayedItems.length != 0 ? (
        displayedItems.map((carName, index) => {
          if (index > 3) {
            return null;
          }
          return (
            <div
              className={`flex relative w-full lg:h-auto h-16 lg:w-3/4 mx-auto ${className}`}
              key={index}
            >
              <button
                onClick={handleClick}
                type='button'
                className={`w-full text-base pl-10 border-2 text-black border-gray-200 hover:bg-blue-300 hover:border-blue-300 bg-white items-center flex font-bold ${index === 0 ? 'rounded-t-lg' : ''} ${index === 3 || index === displayedItems.length - 1 || index == 3 ? 'rounded-b-lg' : ''} ${displayedItems.length == 1 ? 'rounded-lg' : ''}`}
                key={index}
              >
                {carName}
              </button>
              <div className='px-3 ease-in-out duration-100 hidden lg:flex'>
                <div
                  className={`disabled px-12 py-4 items-center flex rounded-xl opacity-0 `}
                >
                  Find
                </div>
              </div>
              <div className='px-3 hidden lg:flex'>
                <div
                  className={`px-3 py-1 items-center flex rounded-xl opacity-0`}
                >
                  More Options...
                  {true && (
                    <svg
                      className='w-4 h-4 ml-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 9l-7 7-7-7'
                      ></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}
