"use client"

import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import Banner from "./Banner";

interface Banner {
  bannerId: string;
  bannerTitle: string;
  bannerDescription: string;
  bannerUrl: string;
  bannerCreatedAt: string;
  bannerImageId: {
    timestamp: number;
    date: string;
  };
}

export default function HomeNotification() {

  const [bannerList, setBannerList] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let banners: Banner[];

    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/notification/banners`;
    const fetchData = async () => {
      try {
        const response = await fetch(
          url,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
    
        const data = await response.json();
    
        if (data.code == 1000) {
          banners = data.data;
          console.log(banners);
        }
      } catch (error) {
        console.log('Error');
      }
    }
    fetchData()
    setTimeout(() => {
      if (banners != undefined) {
        setBannerList(banners);
        setIsLoading(false);
      }
    }, 1000);
  }, [])

  console.log(bannerList);

  return (
    <div className='flex flex-col p-3 pb-12 w-screen dark:bg-gray-900 dark:text-white'>
      <div className='flex mr-auto justify-center font-bold dark:text-white text-black p-6'>
        <h2 className='lg:text-4xl text-2xl mt-12 flex'>
          UP TO DATE WITH OUR NEWEST NOTIFICATIONS
        </h2>
      </div>
      <div className='lg:hidden flex flex-col h-full w-full justify-between'>
        <div className='bg-black my-auto rounded-2xl'>
          {
            (isLoading || bannerList.length < 3) ?
              (
                <Skeleton
                  className='rounded-md'
                  animation="wave"
                  key={2}
                  sx={{ bgcolor: 'grey.1000' }}
                  variant='rectangular'
                  width={500}
                  height={500}
                />
              ) : (
                <Banner
                  id={bannerList[2].bannerId}
                  title={bannerList[2].bannerTitle}
                  description={bannerList[2].bannerDescription}
                  url={bannerList[2].bannerUrl}
                />
              )
          }
        </div>
        <div className='flex bg-black h-[400px] rounded-2xl'>
          {
            (isLoading || bannerList.length < 3) ?
              (
                <Skeleton
                  className='rounded-md'
                  animation="wave"
                  key={1}
                  sx={{ bgcolor: 'grey.1000' }}
                  variant='rectangular'
                  width={500}
                  height={500}
                />
              ) : (
                <Banner
                  id={bannerList[1].bannerId}
                  title={bannerList[1].bannerTitle}
                  description={bannerList[1].bannerDescription}
                  url={bannerList[1].bannerUrl}
                />
              )
          }
        </div>
        <div className='flex bg-black h-[400px] rounded-2xl'>
          {
            (isLoading || bannerList.length < 3) ?
              (
                <Skeleton
                  className='rounded-md'
                  animation="wave"
                  key={0}
                  sx={{ bgcolor: 'grey.1000' }}
                  variant='rectangular'
                  width={500}
                  height={400}
                />
              ) : (
                <Banner
                  id={bannerList[0].bannerId}
                  title={bannerList[0].bannerTitle}
                  description={bannerList[0].bannerDescription}
                  url={bannerList[0].bannerUrl}
                />
              )
          }
        </div>
      </div>
      <div className='hidden lg:grid grid-cols-2 h-full w-full gap-3 rounded-2xl'>
        <div className='row-span-2 my-auto rounded-2xl'>
          {
            (isLoading || bannerList.length < 3) ?
              (
                <Skeleton
                  className='rounded-md'
                  animation="wave"
                  key={2}
                  sx={{ bgcolor: 'grey.1000' }}
                  variant='rectangular'
                  width={700}
                  height={500}
                />
              ) : (
                <Banner
                  id={bannerList[2].bannerId}
                  title={bannerList[2].bannerTitle}
                  description={bannerList[2].bannerDescription}
                  url={bannerList[2].bannerUrl}
                />
              )
          }
        </div>
        <div className='flex h-[400px] rounded-2xl'>
          {
            (isLoading || bannerList.length < 3) ?
              (
                <Skeleton
                  className='rounded-md'
                  animation="wave"
                  key={1}
                  sx={{ bgcolor: 'grey.1000' }}
                  variant='rectangular'
                  width={700}
                  height={400}
                />
              ) : (
                <Banner
                  id={bannerList[1].bannerId}
                  title={bannerList[1].bannerTitle}
                  description={bannerList[1].bannerDescription}
                  url={bannerList[1].bannerUrl}
                />
              )
          }
        </div>
        <div className='flex h-[400px] rounded-2xl'>
          {
            (isLoading || bannerList.length < 3) ?
              (
                <Skeleton
                  className='rounded-md'
                  animation="wave"
                  key={0}
                  sx={{ bgcolor: 'grey.1000' }}
                  variant='rectangular'
                  width={700}
                  height={400}
                />
              ) : (
                <Banner
                  id={bannerList[0].bannerId}
                  title={bannerList[0].bannerTitle}
                  description={bannerList[0].bannerDescription}
                  url={bannerList[0].bannerUrl}
                />
              )
          }
        </div>
      </div>
    </div>
  );
}
