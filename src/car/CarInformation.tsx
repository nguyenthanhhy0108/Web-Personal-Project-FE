'use client';

import { brandCountries, brandLogos } from '@/constants';
import { Vehicle } from '@/constants/interface';
import { NotInterested } from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from 'next/image';

export default function CarInformation({
  vehicleName,
  brandName,
  vehiclePrice,
  numberOfRemaining,
  vehicleDescription,
}: Vehicle) {
  const handleDepositeClick = () => {
    const url = new URL(window.location.href);
    url.pathname = '/deposite';
    window.location.href = url.toString();
  };

  return (
    <div className='dark:text-white text-black w-1/2 pr-16 flex flex-col gap-9 mb-9'>
      <div className='flex flex-col mx-auto gap-3'>
        <h1 className='mx-auto flex text-6xl font-bold text-center'>
          {vehicleName.toUpperCase().toString()}
        </h1>
        <h2 className='italic flex mx-auto text-lg dark:text-gray-400'>
          Choose smart, choose brave
        </h2>
      </div>
      <div className='flex mx-auto mb-9 gap-3'>
        <div className='flex flex-col justify-center items-center mx-auto my-auto'>
          <Image
            className='object-contain w-auto h-[80px] justify-center flex items-center mx-auto my-auto'
            src={brandLogos.get(brandName?.toLowerCase() ?? '') || ''}
            alt='Brand Image'
            width={300}
            height={300}
          />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <p className='text-3xl font-semibold'>
            {brandName.toUpperCase().toString()}
          </p>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-lg dark:text-gray-400'>Number of seats</h3>
          <p className='text-3xl font-semibold'>4</p>
        </div>
        <div className='border-y-2 border-2'></div>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-lg dark:text-gray-400'>Style</h3>
          <p className='text-3xl font-semibold'>Sport</p>
        </div>
        <div className='border-y-2 border-2'></div>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-lg dark:text-gray-400'>Fule Type</h3>
          <p className='text-3xl font-semibold'>Gasoline</p>
        </div>
      </div>
      <div className='flex justify-between text-black dark:text-white text-2xl'>
        <div className='flex gap-2'>
          <h3 className='dark:text-gray-400'>From:</h3>
          <div className='font-semibold'>{brandCountries.get(brandName)}</div>
        </div>
        <div className='flex gap-2'>
          <h3 className='dark:text-gray-400 '>Price:</h3>
          <div className='font-semibold dark:text-violet-400 text-violet-600'>
            {vehiclePrice + ' VND'}
          </div>
        </div>
      </div>
      <div className='flex justify-center gap-11'>
        <button
          onClick={handleDepositeClick}
          title={`${numberOfRemaining == 0 ? 'Sold Out' : 'Deposite'}`}
          disabled={numberOfRemaining == 0}
          className={`p-6 px-20 bg-red-500 font-bold rounded-2xl text-2xl flex justify-center items-center hover:scale-[1.02] transition-all duration-75 ${numberOfRemaining == 0 ? 'disable cursor-default hover:scale-[1] hover:bg-red-500' : 'hover:bg-red-600'}`}
        >
          {numberOfRemaining == 0 ? 'Sold Out ' : 'Deposite'}{' '}
          {numberOfRemaining == 0 ? <NotInterested /> : <AttachMoneyIcon />}
        </button>
        <button className='p-6 px-10 font-semibold bg-pink-400 rounded-2xl text-2xl flex justify-center items-center hover:scale-[1.02] hover:bg-pink-500 transition-all duration-75'>
          Add to favorites <FavoriteBorderIcon />
        </button>
      </div>
    </div>
  );
}
