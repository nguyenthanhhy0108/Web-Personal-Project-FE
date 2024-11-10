'use client';

import LandingContent from '@/landing/LandingContent';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useRef, useState } from 'react';

export default function LandingPage() {
  const [isPlayed, setIsPlayed] = useState<boolean>(false);

  const videoDesktopRef = useRef<HTMLVideoElement | null>(null);
  const videoMobileRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayVideos = () => {
    setIsPlayed(true);
    if (videoDesktopRef.current) {
      videoDesktopRef.current.play();
    }
    if (videoMobileRef.current) {
      videoMobileRef.current.play();
    }
  };

  const handlePauseVideos = () => {
    setIsPlayed(false);
    if (videoDesktopRef.current) {
      videoDesktopRef.current.pause();
    }
    if (videoMobileRef.current) {
      videoMobileRef.current.pause();
    }
  };

  return (
    <div className='text-white'>
      <video
        ref={videoDesktopRef}
        className='absolute top-0 left-0 w-full h-full object-cover z-[-1] hidden lg:block'
        loop
        muted
      >
        <source src='/videos/landing.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <video
        ref={videoMobileRef}
        className='absolute top-0 left-0 w-full h-full object-cover z-[-1] lg:hidden'
        loop
        muted
      >
        <source src='/videos/landing-mobile.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      <div className='flex w-screen h-screen bg-transparent'>
        <LandingContent />
        {isPlayed ? (
          <button
            onClick={handlePauseVideos}
            title='Play'
            className='absolute bottom-12 right-6 lg:text-xl text-md items-center flex justify-center gap-1 hover:px-3 hover:py-1 hover:bg-gray-400 hover:bg-opacity-95 hover:rounded-full'
          >
            <PauseCircleOutlineIcon className='' />
            <p>See the video</p>
          </button>
        ) : (
          <button
            onClick={handlePlayVideos}
            title='Play'
            className='absolute bottom-12 right-6 lg:text-xl text-md items-center flex justify-center gap-1 hover:px-3 hover:py-1 hover:bg-gray-400 hover:bg-opacity-95 hover:rounded-full'
          >
            <PlayCircleOutlineIcon className='' />
            <p>See the video</p>
          </button>
        )}
      </div>
    </div>
  );
}
