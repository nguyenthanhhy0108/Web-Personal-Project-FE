'use client';

import { accessories } from '@/constants';
import AccessoryCard from './AccessoryCard';

export default function AccessorySuggests() {
  return (
    <div className='px-6 my-28 flex flex-col'>
      <div className='dark:text-white text-black text-4xl font-bold'>
        <p>ACCESSORIES</p>
      </div>
      <div className='grid lg:grid-cols-3 grid-cols-1 w-full h-full dark:text-white text-black gap-6 pt-6'>
        <AccessoryCard
          description={accessories[0].description}
          imageLink={accessories[0].url}
          price={accessories[0].price}
          title={accessories[0].title}
        />
        <AccessoryCard
          description={accessories[1].description}
          imageLink={accessories[1].url}
          price={accessories[1].price}
          title={accessories[1].title}
        />
        <AccessoryCard
          description={accessories[2].description}
          imageLink={accessories[2].url}
          price={accessories[2].price}
          title={accessories[2].title}
        />
      </div>
    </div>
  );
}
