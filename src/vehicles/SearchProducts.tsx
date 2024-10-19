'use client';

import { Vehicle } from '@/constants/interface';
import { getURL } from '@/utils/GeneralServices';
import { getRelevantCars } from '@/utils/SearchService';
import { priceNumberToString } from '@/utils/VehicleService';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import CarCard from './Card';

interface SearchProductsProps {
  brandName: string;
  carName: string;
  isClickFind: boolean;
  setIsClickFind: (state: boolean) => void;
}

export default function SearchProducts({
  brandName,
  carName,
  isClickFind,
  setIsClickFind,
}: SearchProductsProps) {
  const [carsData, setCarsData] = useState<Vehicle[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [isDisplay, setIsDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (isClickFind) {
      const fetchData = async () => {
        const urlParams = getURL().searchParams;
        let data;
        const pageParam = urlParams.get('page');
        console.log(brandName);
        console.log(carName);
        if (pageParam != null) {
          const pageNumber = parseInt(pageParam);
          data = await getRelevantCars(carName, brandName, pageNumber);
        } else {
          data = await getRelevantCars(carName, brandName);
        }
        if (data.code == 9034 || data.code == 9035) {
          setError('Not Found');
        } else {
          setError('');
          setCarsData(data.BEData.cars);
          setTotalPages(data.BEData.totalPages);
          setCurrentPage(data.currentPage);
        }
      };
      fetchData();

      setIsClickFind(false);
      setIsDisplay(true);
    }
  }, [isClickFind]);

  useEffect(() => {
    const urlParams = getURL().searchParams;
    if (urlParams.get('page')) {
      setIsClickFind(!isClickFind);
    }
  }, []);

  const handleResetSearch = () => {
    window.location.href = '/vehicles?brand=' + '&search=' + '&page=1';
  };

  const handlePageButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const page = event.currentTarget.textContent?.trim();
    if (page) {
      window.location.href =
        '/vehicles?brand=' + brandName + '&search=' + carName + '&page=' + page;
    }
  };

  const handlePrevButton = () => {
    window.location.href =
      '/vehicles?brand=' +
      brandName +
      '&search=' +
      carName +
      '&page=' +
      (currentPage - 1).toString();
  };

  const handleNextButton = () => {
    window.location.href =
      '/vehicles?brand=' +
      brandName +
      '&search=' +
      carName +
      '&page=' +
      (currentPage + 1).toString();
  };

  return (
    <div className={`w-screen pb-24 ${!isDisplay ? "hidden" :""}`}>
      {error == 'Not Found' ? (
        <div className='flex flex-col justify-center items-center mx-auto text-3xl font-bold dark:text-white text-black'>
          <hr className='h-3 w-full mx-auto flex justify-center' />
          <div className='mt-4'>Not Found!</div>
          <div className='mt-4 flex justify-center text-center'>
            Can Not Find Any Cars In Our Inventory
          </div>
          <button
            onClick={handleResetSearch}
            className='mt-16 p-6 bg-gray-50 text-blue-800 rounded-3xl'
          >
            Reset Search Engine
          </button>
        </div>
      ) : null}
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 pb-12'>
        {Array.isArray(carsData) && carsData.length > 0 && error != 'Not Found'
          ? carsData.map((carData, index) => {
              return (
                <CarCard
                  key={index}
                  title={carData.vehicleName}
                  description={carData.vehicleDescription}
                  imageLink={carData.vehicleImageUrl}
                  price={
                    priceNumberToString(parseInt(carData.vehiclePrice)) + ' VND'
                  }
                />
              );
            })
          : null}
      </div>
      {!(error == 'Not Found') ? (
        <div className='lg:flex hidden justify-center mx-auto gap-3 dark:text-white text-black text-xl'>
          {totalPages > 9 && currentPage > 4 ? (
            <button onClick={handlePrevButton}>
              <ArrowBackIos className='hover:text-red-600' />
            </button>
          ) : null}
          <div className='justify-center flex'>
            {Array.from({ length: totalPages + 1 }, (_, index) => {
              if (
                index != 0 &&
                index >= currentPage - 4 &&
                index <= currentPage + 4
              ) {
                return (
                  <button
                    onClick={handlePageButton}
                    className={`mx-2 p-3 bg-gray-300 w-9 h-9 items-center flex font-bold text-black justify-center rounded-full hover:ring-4 hover:ring-red-600  ${currentPage == index ? 'text-white bg-red-600' : ''}`}
                    key={index}
                  >
                    {index}
                  </button>
                );
              }
              return null;
            })}
          </div>
          {totalPages > 9 && currentPage < totalPages - 4 ? (
            <button onClick={handleNextButton}>
              <ArrowForwardIos className='hover:text-red-600' />
            </button>
          ) : null}
        </div>
      ) : null}

      {!(error == 'Not Found') ? (
        <div className='flex lg:hidden justify-center mx-auto gap-3 dark:text-white text-black text-xl'>
          {totalPages > 5 && currentPage > 2 ? (
            <button onClick={handlePrevButton}>
              <ArrowBackIos className='hover:text-red-600' />
            </button>
          ) : null}
          <div className='justify-center flex'>
            {Array.from({ length: totalPages + 1 }, (_, index) => {
              if (
                index != 0 &&
                index >= currentPage - 2 &&
                index <= currentPage + 2
              ) {
                return (
                  <button
                    onClick={handlePageButton}
                    className={`mx-2 p-3 bg-gray-300 w-9 h-9 items-center flex font-bold text-black justify-center rounded-full hover:ring-4 hover:ring-red-600  ${currentPage == index ? 'text-white bg-red-600' : ''}`}
                    key={index}
                  >
                    {index}
                  </button>
                );
              }
              return null;
            })}
          </div>
          {totalPages > 5 && currentPage < totalPages - 2 ? (
            <button onClick={handleNextButton}>
              <ArrowForwardIos className='hover:text-red-600' />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
