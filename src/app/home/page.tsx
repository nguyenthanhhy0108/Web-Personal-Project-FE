import HomeNotification from '@/components/HomeNotification';
import HomeProducts from '@/components/HomeProducts';
import HomeServices from '@/components/HomeServices';
import HomeTechnology from '@/components/HomeTechnology';

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
