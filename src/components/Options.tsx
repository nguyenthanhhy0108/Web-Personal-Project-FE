'use client';

import { ThemeContext } from '@/contexts/ThemeContext';
import Image from 'next/image';
import { useContext } from 'react';

export default function Options() {
  const themeValues = useContext(ThemeContext);
  return (
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
  );
}
