'use client';

import Options from '@/components/Options';
import { Vehicle } from '@/constants/interface';
import { getURL } from '@/utils/GeneralServices';
import {
  getVehicleByBrandNameVehicleName,
  priceNumberToString,
} from '@/utils/VehicleService';
import IntroductionImage from '@/vehicles/IntroductionImage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AccessorySuggests from './AccessorySuggests';
import CarDescription from './CarDescription';
import CarImage from './CarImage';
import CarInformation from './CarInformation';
import CarIntroductionMobile from './CarIntroductionMobile';

export default function CarPage() {
  const [vehicleData, setVehicleData] = useState<Vehicle>();

  const router = useRouter();

  useEffect(() => {
    const urlParams = getURL();
    if (
      urlParams.searchParams.get('brandName') != null &&
      urlParams.searchParams.get('vehicleName') != null
    ) {
      const brandName = urlParams.searchParams.get('brandName');
      const vehicleName = urlParams.searchParams.get('vehicleName');

      const getVehicleData = async () => {
        let data = await getVehicleByBrandNameVehicleName(
          brandName,
          vehicleName,
        );
        setVehicleData(data);
      };

      getVehicleData();
    } else {
      router.push('/home');
    }
  }, []);

  console.log(vehicleData);

  return (
    <div className='w-screen top-0 flex flex-col h-full mb-auto'>
      <IntroductionImage />
      <div className='w-screen -mt-9 mb-9'>
        <Options />
      </div>
      <div className='lg:flex hidden gap-16 mt-20 justify-center items-center'>
        <CarImage
          carImage={
            vehicleData?.vehicleImageUrl
              ? vehicleData?.vehicleImageUrl.toString()
              : ''
          }
        />
        <CarInformation
          brandName={
            vehicleData?.brandName ? vehicleData?.brandName.toString() : ''
          }
          vehicleName={
            vehicleData?.vehicleName ? vehicleData?.vehicleName.toString() : ''
          }
          vehiclePrice={
            vehicleData?.vehiclePrice
              ? priceNumberToString(parseInt(vehicleData.vehiclePrice))
              : ''
          }
          numberOfRemaining={
            vehicleData?.numberOfRemaining ? vehicleData?.numberOfRemaining : 0
          }
          vehicleDescription={
            vehicleData?.vehicleDescription
              ? vehicleData?.vehicleDescription
              : ''
          }
          vehicleId=''
          vehicleImageUrl=''
        />
      </div>

      <CarIntroductionMobile
        brandName={
          vehicleData?.brandName ? vehicleData?.brandName.toString() : ''
        }
        vehicleName={
          vehicleData?.vehicleName ? vehicleData?.vehicleName.toString() : ''
        }
        vehiclePrice={
          vehicleData?.vehiclePrice
            ? priceNumberToString(parseInt(vehicleData.vehiclePrice))
            : ''
        }
        numberOfRemaining={
          vehicleData?.numberOfRemaining ? vehicleData?.numberOfRemaining : 0
        }
        vehicleDescription={
          vehicleData?.vehicleDescription ? vehicleData?.vehicleDescription : ''
        }
        vehicleId=''
        vehicleImageUrl={
          vehicleData?.vehicleImageUrl ? vehicleData?.vehicleImageUrl : ''
        }
      />

      <div>
        <CarDescription
          carImage={
            vehicleData?.vehicleImageUrl
              ? vehicleData?.vehicleImageUrl.toString()
              : ''
          }
        />
      </div>
      <div>
        <AccessorySuggests />
      </div>
    </div>
  );
}
