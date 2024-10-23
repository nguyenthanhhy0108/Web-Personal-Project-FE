'use client';

import Image from 'next/image';

export default function CarDescription({ carImage }: { carImage: string }) {
  return (
    <div className='px-6 mt-28 flex flex-col'>
      <div className='dark:text-white text-black text-4xl font-bold'>
        <p>DESCRIPTION</p>
      </div>
      <div className='flex dark:text-white text-black w-full gap-6 pt-6'>
        <div className='lg:w-1/2 w-full text-xl flex justify-center items-center'>
          <ul className='list-disc list-inside'>
            <li className='text-gray-400'>
              <strong className='text-red-500'>High-Performance Design:</strong>{' '}
              Sports cars are built for speed, agility, and precision driving.
            </li>
            <li className='text-gray-400'>
              <strong className='text-red-500'>Aerodynamic and Stylish:</strong>{' '}
              Sleek designs improve both looks and performance.
            </li>
            <li className='text-gray-400'>
              <strong className='text-red-500'>Powerful Engines:</strong>{' '}
              Advanced engines deliver fast acceleration and high speeds.
            </li>
            <li className='text-gray-400'>
              <strong className='text-red-500'>Superior Handling:</strong>{' '}
              Engineered for precise control and sharp cornering.
            </li>
            <li className='text-gray-400'>
              <strong className='text-red-500'>Rear-Wheel Drive:</strong> Many
              sports cars use rear-wheel drive for better balance and handling.
            </li>
            <li className='text-gray-400'>
              <strong className='text-red-500'>Performance and Luxury:</strong>{' '}
              Modern sports cars combine power with luxury and technology.
            </li>
            <li className='text-gray-400'>
              <strong className='text-red-500'>Exhilarating Experience:</strong>{' '}
              Ideal for enthusiasts seeking excitement and dynamic control.
            </li>
          </ul>
        </div>
        <div className='w-1/2 lg:flex hidden items-center justify-center'>
          <Image
            className='object-contain w-[810px] h-auto'
            alt='Car Image'
            src={carImage}
            width={900}
            height={900}
          />
        </div>
      </div>
    </div>
  );
}
