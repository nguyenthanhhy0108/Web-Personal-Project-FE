'use client';

import { Vehicle } from '@/constants/interface';
import { ThemeContext } from '@/contexts/ThemeContext';
import { getInitialVehicle, priceNumberToString } from '@/utils/VehicleService';
import { Skeleton } from '@mui/material';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import CarCard from '../vehicles/Card';
import ImageSlider from './ImageSlider';

interface VehiclePrice {
  index: number;
  price: number;
}

export default function HomeProducts() {
  const themeValues = useContext(ThemeContext);

  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  const [impressiveVehicle, setImpressiveVehicle] = useState<Vehicle[]>(
    new Array(6).fill({} as Vehicle),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getInitialVehicle();
      setVehicleData(data);
    }
    fetchData();
  }, []);

  // console.log(vehicleData)

  useEffect(() => {
    let vehiclePrice = null;

    if (vehicleData != undefined) {
      vehiclePrice = vehicleData.map((vehicle, index) => {
        const price = vehicle.vehiclePrice;
        if (parseInt(price) == 0) {
          return { index: index, price: 0 };
        } else {
          return { index: index, price: parseInt(price) };
        }
      });
    } else {
      return;
    }

    const impressiveVehicleIndex = vehiclePrice
      .sort((a: VehiclePrice, b: VehiclePrice) => b.price - a.price)
      .slice(0, 6)
      .map((item) => item.index);

    const vehicles = impressiveVehicleIndex.map((index) => {
      return vehicleData[index];
    });

    setTimeout(() => {
      if (vehicles.length != 0) {
        setImpressiveVehicle(vehicles);
        setIsLoading(false);
      } else {
        setImpressiveVehicle(new Array(6).fill({} as Vehicle));
      }
    }, 1000);
  }, [vehicleData]);

  return (
    <div className='flex flex-col justify-between'>
      <ImageSlider />
      <div className='flex mr-auto justify-center font-bold dark:text-white text-black p-6'>
        <h2 className='lg:text-4xl text-2xl mt-12 flex'>
          DISCOVER OUR IMPRESSIVE CARS
        </h2>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-5'>
        {impressiveVehicle.map((vehicle, index) => {
          if (isLoading) {
            return (
              <Skeleton
                className='rounded-md'
                key={index}
                sx={{ bgcolor: 'grey.1000' }}
                variant='rectangular'
                width={460}
                height={300}
              />
            );
          } else {
            return (
              <div key={vehicle.vehicleId}>
                <CarCard
                  title={vehicle.vehicleName}
                  description={vehicle.vehicleDescription}
                  imageLink={vehicle.vehicleImageUrl}
                  price={
                    priceNumberToString(parseInt(vehicle.vehiclePrice)) + ' VND'
                  }
                />
              </div>
            );
          }
        })}
      </div>

      <div className='flex justify-center w-11/12 border-t-2 border-b-2 border-gray-300 dark:border-white mt-24 items-center mx-auto'>
        <div className='grid grid-cols-3 gap-14 lg:gap-32 my-3'>
          <button
            className='flex flex-col items-center hover:scale-[1.06]'
            title='Discount'
          >
            <Image
              src={`${themeValues?.themeMode == 'dark' ? '/images/discount-logo-white.png' : '/images/discount-logo.png'}`}
              alt='Discount'
              width={80}
              height={80}
            />
            <h3 className='font-bold text-xl text-black dark:text-white'>
              Discount
            </h3>
          </button>
          <button
            className='flex flex-col items-center hover:scale-[1.06]'
            title='Prices List'
          >
            <Image
              src={`${themeValues?.themeMode == 'dark' ? '/images/price-white.png' : '/images/price.png'}`}
              alt='Prices List'
              width={80}
              height={80}
            />
            <h3 className='font-bold text-xl text-black dark:text-white'>
              Prices List
            </h3>
          </button>
          <button
            className='flex flex-col items-center hover:scale-[1.06]'
            title='Test Drive'
          >
            <Image
              src={`${themeValues?.themeMode == 'dark' ? '/images/steering-wheel-white.png' : '/images/steering-wheel.png'}`}
              alt='Test Drive'
              width={80}
              height={80}
            />
            <h3 className='font-bold text-xl text-black dark:text-white'>
              Test Drive
            </h3>
          </button>
        </div>
      </div>
    </div>
  );
}
