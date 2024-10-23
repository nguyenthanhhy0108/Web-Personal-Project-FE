'use client';

import { brandLogos, brandLogosList } from '@/constants';
import useDebounce from '@/hooks/useDebounce';
import { getURL } from '@/utils/GeneralServices';
import {
  fetchAllBrandNames,
  fetchRecommendedCarNames,
  fetchRecommendedCarNamesByBrand,
} from '@/utils/SearchService';
import { getBrandNameByVehicleName } from '@/utils/VehicleService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CarBrand from './CarBrand';
import MainSearchRecommend from './MainSearchRecommend';

interface SearchingAreaProps {
  setCarName: (carName: string) => void;
  setBrandName: (brandName: string) => void;
  setIsClickFind: (isClicked: boolean) => void;
}

export default function SearchingArea({
  setCarName,
  setBrandName,
  setIsClickFind,
}: SearchingAreaProps) {
  const [vehicleSearchField, setVehicleSearchField] = useState('');
  const debouncedMainSearch = useDebounce(vehicleSearchField, 100);
  const [isMore, setIsMore] = useState(false);
  const [mainSearchRecommend, setMainSearchRecommend] = useState<string[]>([]);
  const [isMainSearchRecommend, setIsMainSearchRecommend] = useState(false);
  const [vehicleNameSearchRecommend, setVehicleNameSearchRecommend] = useState<
    string[]
  >([]);
  const [isVehicleNameSearchRecommend, setIsVehicleNameSearchRecommend] =
    useState(true);
  const [isBrandSearchRecommend, setIsBrandSearchRecommend] = useState(true);
  const [brandsRecommend, setBrandsRecommend] = useState<string[]>([]);
  const [brandsInitialData, setBrandsInitialData] = useState<string[]>([]);
  const [brandSearchField, setBrandSearchField] = useState('');
  const [choosenVehicle, setChoosenVehicle] = useState<string | undefined>('');
  const debouncedVehicleNameSearch = useDebounce(vehicleSearchField, 100);
  const [choosenBrand, setChoosenBrand] = useState<string | undefined>('');
  const [isChooseBrand, setIsChooseBrand] = useState<boolean>(false);
  const [isChooseVehicle, setIsChooseVehicle] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllBrandNames();
      setBrandsInitialData(data);
    };
    fetchData();

    const urlParams = getURL().searchParams;

    setChoosenBrand(urlParams.get('brand')?.toString() || '');
    setChoosenVehicle(urlParams.get('search') || '');
    setBrandSearchField(urlParams.get('brand')?.toString() || '');
    setVehicleSearchField(urlParams.get('search') || '');
  }, []);

  useEffect(() => {
    if (choosenBrand) setBrandSearchField(choosenBrand);
  }, [choosenBrand]);

  useEffect(() => {
    if (choosenVehicle) setVehicleSearchField(choosenVehicle);
  }, [choosenVehicle]);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedMainSearch == '') {
        return;
      }
      const data = await fetchRecommendedCarNames(debouncedMainSearch);
      setMainSearchRecommend(data);
    };
    fetchData();
  }, [debouncedMainSearch]);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedVehicleNameSearch == '') {
        return;
      }
      if (brandSearchField) {
        const data = await fetchRecommendedCarNamesByBrand(
          brandSearchField,
          debouncedVehicleNameSearch,
        );
        setVehicleNameSearchRecommend(data);
      }
    };
    fetchData();
  }, [debouncedVehicleNameSearch]);

  const handleResetSearch = () => {
    window.location.href = '/vehicles?brand=' + '&search=' + '&page=1';
  };

  const handleChangeVehicleName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCarName(event.target.value);
    // changeSearchStateValue("carName", event.target.value);
    setIsChooseVehicle(false);
    if (event.target.value == '') {
      setIsVehicleNameSearchRecommend(false);
      setVehicleSearchField(event.target.value);
    } else {
      setIsVehicleNameSearchRecommend(true);
      setVehicleSearchField(event.target.value);
    }
  };

  const handleMainInputClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsMainSearchRecommend(false);
    setIsChooseVehicle(true);
    if (event.currentTarget.textContent) {
      setChoosenVehicle(event.currentTarget.textContent);
      setCarName(event.currentTarget.textContent);
      // changeSearchStateValue("carName", event.currentTarget.textContent);
    }
    let brandName = '';
    const findBrand = async () => {
      brandName = await getBrandNameByVehicleName(
        event.currentTarget.textContent,
      );

      if (brandSearchField !== brandName && brandName !== undefined) {
        setBrandSearchField(brandName.toUpperCase());
        setChoosenBrand(brandName.toUpperCase());
        setBrandName(brandName.toUpperCase());
        // changeSearchStateValue("brandName", brandName.toUpperCase());
      }
    };

    findBrand();
  };

  const handleClickMoreOptions = () => {
    setIsMore(!isMore);
    setIsMainSearchRecommend(false);
    setIsVehicleNameSearchRecommend(false);
    setIsBrandSearchRecommend(false);
    setBrandName('');
    // changeSearchStateValue("brandName", "");
    setChoosenBrand('');
  };

  const handleClickFind = () => {
    setIsClickFind(true);
    setIsMainSearchRecommend(false);
    setIsVehicleNameSearchRecommend(false);
    setIsBrandSearchRecommend(false);
    const urlParams = getURL().searchParams;
    if (urlParams.get('page') == null) {
      router.push(
        '/vehicles?brand=' +
          brandSearchField.toString() +
          '&search=' +
          vehicleSearchField.toString() +
          '&page=1',
      );
    } else {
      router.push(
        '/vehicles?brand=' +
          brandSearchField.toString() +
          '&search=' +
          vehicleSearchField.toString() +
          '&page=' +
          urlParams.get('page'),
      );
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClickFind();
    }
  };

  const handleChangeMainSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCarName(event.target.value);
    // changeSearchStateValue("carName", event.target.value);
    setIsMainSearchRecommend(true);
    if (event.target.value == '') {
      setIsMainSearchRecommend(false);
      setVehicleSearchField(event.target.value);
    } else {
      setIsMainSearchRecommend(true);
      setVehicleSearchField(event.target.value);
    }
  };

  const handleBrandClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsChooseBrand(true);
    if (event.currentTarget.textContent?.toString()) {
      setBrandSearchField(event.currentTarget.textContent?.toString());
      setBrandName(event.currentTarget.textContent?.toString());
      // changeSearchStateValue("brandName", event.currentTarget.textContent.toString());
    }

    setChoosenBrand(event.currentTarget.textContent?.toString());
  };

  const handleVehicleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.textContent?.toString()) {
      setVehicleSearchField(event.currentTarget.textContent?.toString());
      setChoosenVehicle(event.currentTarget.textContent?.toString());
      setIsChooseVehicle(true);
      setCarName(event.currentTarget.textContent.toString());
      // changeSearchStateValue("carName", event.currentTarget.textContent);
    }
  };

  const handleChangeBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChooseBrand(false);
    setIsBrandSearchRecommend(true);
    setBrandSearchField(event.target.value);
    setBrandsRecommend(
      brandsInitialData.filter((brand) => {
        return brand.includes(event.target.value.toLowerCase());
      }),
    );
    setBrandName(event.target.value);
    // changeSearchStateValue("brandName", event.target.value);
    if (event.target.value == '') {
      setIsBrandSearchRecommend(false);
    }
  };

  const handleClearClick = () => {
    setIsBrandSearchRecommend(false);
    setIsMainSearchRecommend(false);
    setIsVehicleNameSearchRecommend(false);
  };

  return (
    <div onClick={handleClearClick}>
      <div
        className={`w-screen h-full py-14 flex-grow bg-gray-200 ${!isMore ? 'pb-48 lg:pb-24' : ''}  dark:bg-gray-900`}
      >
        <h1 className='flex justify-center mb-6 text-4xl font-bold text-black dark:text-white'>
          SEARCH
        </h1>
        <div className='lg:w-3/4 w-10/12 lg:flex mx-auto relative justify-between'>
          <input
            className='border-2 border-gray-700 dark:border-gray-700 p-3 rounded-lg text-black w-full pl-10 hover:border-blue-800 focus:border-blue-800 outline-none'
            type='text'
            onKeyDown={handleKeyDown}
            readOnly={isMore}
            disabled={isMore}
            value={vehicleSearchField}
            placeholder='Which car do you want to find ?'
            onChange={handleChangeMainSearch}
          />
          {isMainSearchRecommend && (
            <MainSearchRecommend
              handleClick={handleMainInputClick}
              className='flex lg:hidden'
              mainSearchRecommend={mainSearchRecommend}
            />
          )}
          <div
            className={`absolute ${isMainSearchRecommend ? 'hidden lg:flex' : ''} inset-y-0 left-0 flex items-center pl-3 pointer-events-none`}
          >
            <svg
              className='w-5 h-5 text-gray-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-4.35-4.35M15 11a4 4 0 11-8 0 4 4 0 018 0z'
              ></path>
            </svg>
          </div>
          {!isMore && (
            <div className='px-3 ease-in-out duration-100 hidden lg:flex'>
              <button
                onClick={handleClickFind}
                className={`px-12 py-4 items-center flex rounded-xl bg-red-500 hover:bg-red-700 hover:scale-[1.05] duration-75 transition-all`}
                type='submit'
                title='Find'
              >
                Find
              </button>
            </div>
          )}

          <div className='px-3 lg:flex hidden'>
            <button
              onClick={handleClickMoreOptions}
              className={`px-3 py-1 items-center flex rounded-xl
                ${isMore ? 'bg-gray-700 dark:bg-gray-700 scale-[1.05]' : 'bg-gray-600 dark:bg-gray-500'}
                hover:bg-gray-700 dark:hover:bg-gray-700
                hover:scale-[1.05] duration-75 transition-all`}
              type='button'
              title='More Options'
            >
              More Options...
              {!isMore && (
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
              {isMore && (
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
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className='flex justify-between w-3/4 relative mx-auto pt-3 lg:hidden'>
          {!isMore && (
            <div className='ease-in-out duration-100 lg:hidden'>
              <button
                onClick={handleClickFind}
                className={`px-12 py-4 items-center flex rounded-xl bg-red-500 hover:bg-red-700 hover:scale-[1.05] duration-75 transition-all`}
                type='button'
                title='Find'
              >
                Find
              </button>
            </div>
          )}
          <div className={`${isMore ? 'flex-grow w-full' : ''} lg:hidden`}>
            <button
              onClick={handleClickMoreOptions}
              className={`px-3 py-4 items-center flex rounded-xl flex-grow mx-auto justify-center ${isMore ? 'w-full' : ''}
                ${isMore ? 'bg-gray-700 dark:bg-gray-700 scale-[1.05]' : 'bg-gray-600 dark:bg-gray-500'}
                hover:bg-gray-700 dark:hover:bg-gray-700
                hover:scale-[1.05] duration-75 transition-all`}
              type='button'
              title='More Options'
            >
              More Options...
              {!isMore && (
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
              {isMore && (
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
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        {isMainSearchRecommend && (
          <MainSearchRecommend
            handleClick={handleMainInputClick}
            className='hidden lg:flex'
            mainSearchRecommend={mainSearchRecommend}
          />
        )}
      </div>
      {/* Brands */}
      <div
        className={`hidden bg-gray-200 dark:bg-gray-900 mx-auto justify-center gap-3 ${isMore ? 'lg:flex lg:flex-col' : ''}  py-6`}
      >
        <div className='flex justify-between items-center gap-3'>
          {brandLogosList.map((object, index) => {
            if (index > 6) return;
            return (
              <CarBrand
                handleClick={handleBrandClick}
                currentBrand={choosenBrand}
                key={index}
                brandName={object[0]}
              />
            );
          })}
        </div>
        <div className='flex justify-between gap-3'>
          {brandLogosList.map((object, index) => {
            if (index < 7 || index > 13) return;
            return (
              <CarBrand
                handleClick={handleBrandClick}
                currentBrand={choosenBrand}
                key={index}
                brandName={object[0]}
              />
            );
          })}
        </div>
        <div className='flex justify-between gap-3'>
          {brandLogosList.map((object, index) => {
            if (index < 14 || index > 20) return;
            return (
              <CarBrand
                handleClick={handleBrandClick}
                currentBrand={choosenBrand}
                key={index}
                brandName={object[0]}
              />
            );
          })}
        </div>
        <div className='flex justify-between gap-3'>
          <div className='flex justify-center flex-grow'>
            <CarBrand
              handleClick={handleBrandClick}
              currentBrand={choosenBrand}
              brandName={brandLogosList[21][0]}
            />
          </div>
          <div className='flex justify-center flex-grow'>
            <CarBrand
              handleClick={handleBrandClick}
              currentBrand={choosenBrand}
              brandName={brandLogosList[22][0]}
            />
          </div>
        </div>
      </div>
      {isMore && (
        <div>
          <div className='flex lg:flex-row flex-col justify-between lg:gap-16 bg-gray-200 dark:bg-gray-900'>
            <div className='flex-grow relative p-6'>
              <div className='text-black dark:hidden lg:flex hidden text-xl font-bold absolute -translate-y-1/2 bg-gray-100 translate-x-1/2 px-3 rounded-xl'>
                <h2>Brand (1)</h2>
              </div>
              <div className='bg-gray-900 hidden lg:dark:flex text-xl font-bold dark:text-white px-3'>
                <h2>Brand (1)</h2>
              </div>
              <div className='dark:bg-gray-900 text-black w-fit lg:hidden text-xl font-bold dark:text-white mx-auto'>
                <h2>Brand (1)</h2>
              </div>
              <div>
                <input
                  className='border-2 border-gray-700 py-3 rounded-lg text-black w-full pl-3 hover:border-blue-800 focus:border-blue-800 outline-none'
                  type='text'
                  placeholder={'Which brand do you want to find ?'}
                  required={true}
                  onChange={handleChangeBrand}
                  value={brandSearchField}
                />
                {brandsRecommend.map((brand, index) => {
                  if (
                    brandSearchField == '' ||
                    isChooseBrand ||
                    !isBrandSearchRecommend
                  ) {
                    return null;
                  } else {
                    if (index > 3) {
                      return null;
                    } else {
                      return (
                        <button
                          onClick={handleBrandClick}
                          type='button'
                          className={`h-auto py-3 pl-3 hover:bg-blue-300 bg-white text-black w-full items-center font-bold flex ${index == 0 ? 'rounded-t-lg' : ''} ${index == brandsRecommend.length - 1 || index == 3 ? 'rounded-b-lg' : ''} ${brandsRecommend.length == 1 ? 'rounded-lg' : ''}`}
                          key={index}
                        >
                          {brand.toUpperCase()}
                        </button>
                      );
                    }
                  }
                })}
              </div>
            </div>
            <div className='flex-grow relative p-6'>
              <div className='dark:hidden lg:flex hidden text-black text-xl font-bold absolute -translate-y-1/2 bg-gray-100 translate-x-1/2 px-3 rounded-xl'>
                <h2>Car Name (2)</h2>
              </div>
              <div className='bg-gray-900 hidden lg:dark:flex text-xl font-bold dark:text-white px-3'>
                <h2>Car Name (2)</h2>
              </div>
              <div className='dark:bg-gray-900 text-black w-fit lg:hidden text-xl font-bold dark:text-white mx-auto'>
                <h2>Car Name (2)</h2>
              </div>
              <input
                className='border-2 border-gray-700 p-3 rounded-lg text-black w-full pl-3 hover:border-blue-800 focus:border-blue-800 outline-none'
                type='text'
                onChange={handleChangeVehicleName}
                onKeyDown={handleKeyDown}
                value={vehicleSearchField}
                placeholder='Which car do you want to find ?'
                disabled={
                  brandSearchField == '' ||
                  !brandLogos.has(
                    brandSearchField ? brandSearchField.toLowerCase() : '',
                  )
                }
              />
              {vehicleNameSearchRecommend.map((vehicle, index) => {
                if (!isVehicleNameSearchRecommend || isChooseVehicle) {
                  return null;
                } else {
                  if (index > 3) {
                    return null;
                  } else {
                    return (
                      <button
                        onClick={handleVehicleClick}
                        type='button'
                        className={`h-auto py-3 pl-3 text-black hover:bg-blue-300 bg-white w-full items-center font-bold flex ${index == 0 ? 'rounded-t-lg' : ''} ${index == vehicleNameSearchRecommend.length - 1 || index == 3 ? 'rounded-b-lg' : ''} ${vehicleNameSearchRecommend.length == 1 ? 'rounded-lg' : ''}`}
                        key={index}
                      >
                        {vehicle.toUpperCase()}
                      </button>
                    );
                  }
                }
              })}
            </div>
          </div>
          <div className='flex pb-6 gap-6 justify-center bg-gray-200 dark:bg-gray-900'>
            <button
              type='button'
              title='Find'
              onClick={handleClickFind}
              className='flex items-center px-16 lg:mt-0 bg-red-500 hover:bg-red-700 py-4 font-bold rounded-3xl text-2xl'
            >
              Find
            </button>
            <button
              type='button'
              title='Reset Search Engine'
              onClick={handleResetSearch}
              className='flex items-center px-6 lg:mt-0 bg-gray-400 hover:bg-gray-500 py-4 font-bold rounded-3xl text-lg'
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
