import Image from 'next/image';

export default function CarImage({ carImage }: { carImage: string }) {
  return (
    <div>
      <Image
        className='object-contain w-[810px] h-auto'
        alt='Car Image'
        src={carImage}
        width={900}
        height={900}
      />
    </div>
  );
}
