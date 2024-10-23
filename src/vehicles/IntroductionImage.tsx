import Image from 'next/image';

export default function IntroductionImage() {
  return (
    <div className='w-screen lg:h-[450px] border-y-2 border-gray-300 dark:border-gray-700 flex'>
      <Image
        width={1920}
        height={450}
        className=' w-full h-full object-cover'
        src='/images/car-banner.jpg'
        alt='Car banner'
      />
    </div>
  );
}
