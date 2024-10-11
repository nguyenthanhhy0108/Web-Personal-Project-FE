import HomeNotification from '@/home/HomeNotification';
import HomeProducts from '@/home/HomeProducts';
import HomeServices from '@/home/HomeServices';
import HomeTechnology from '@/home/HomeTechnology';

export default function page() {
  return (
    <div className='flex-col justify-center mx-auto w-screen'>
      <HomeProducts />
      <HomeServices />
      <HomeTechnology />
      <HomeNotification />
    </div>
  );
}
