'use client';

import { Fullscreen, VolumeOff, VolumeUp } from '@mui/icons-material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IconButton } from '@mui/material';
import { PauseIcon } from 'lucide-react';
import { useRef, useState } from 'react';
export default function VideoPlayer({ videoLink }: { videoLink: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoRefBG = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current && videoRefBG.current) {
      if (isPlaying) {
        videoRef.current.pause();
        videoRefBG.current.pause();
      } else {
        videoRef.current.play();
        videoRefBG.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current && videoRefBG.current) {
      if (isMute) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
      setIsMute(!isMute);
    }
  };

  const handleZoomToggle = () => {
    const videoElement = videoRef.current;
    if (!isZoomed) {
      if (videoElement) {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        }
      }
    }
    setIsZoomed(false);
  };

  
  return (
    <div className='w-full h-full relative group'>
      <video
        ref={videoRefBG}
        className='w-full h-full z-0 group-hover:block rounded-3xl object-fill bg-black opacity-[0.15] backdrop-blur absolute'
        muted
      >
        <source src={videoLink} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <video
        ref={videoRef}
        className='w-full h-full z-20 group-hover:block rounded-3xl absolute'
      >
        <source src={videoLink} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <div className='absolute top-1/2 z-50 -translate-y-1/2 left-1/2 -translate-x-1/2 group-hover:block hidden'>
        <IconButton
          className='p-12 text-6xl'
          onClick={handlePlayPause}
          color='error'
          size='large'
        >
          {isPlaying ? (
            <PauseIcon fontSize='inherit' />
          ) : (
            <PlayArrowIcon fontSize='inherit' />
          )}
        </IconButton>
      </div>
      <div className='absolute z-50 right-0 bottom-0 group-hover:block hidden'>
        <div className='flex'>
          <IconButton onClick={handleMute} color='error' size='large'>
            {isMute ? (
              <VolumeOff fontSize='inherit' />
            ) : (
              <VolumeUp fontSize='inherit' />
            )}
          </IconButton>
          <IconButton onClick={handleZoomToggle} color='error' size='large'>
            <Fullscreen fontSize='inherit' />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
