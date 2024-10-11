import IntroductionImage from '@/cars/IntroductionImage';
import SearchCar from '@/cars/SearchCar';

export default function page() {
  return (
    <div className='w-screen '>
      <IntroductionImage />
      <SearchCar />
    </div>
  );
}
