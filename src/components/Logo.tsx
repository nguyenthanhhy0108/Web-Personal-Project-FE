"use client"

import Image from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
}

export default function Logo(
  {
    src,
    alt,
  }: ImageProps
) {

  const handleClick = () => {
    window.location.href = "/home"
  }

  return (
    <button title="Home"
      onClick={handleClick}  
    >
      <Image
        className="logo w-28 items-center justify-center"
        src={src}
        alt={alt}
        width={900}
        height={900}
      />
    </button>
  )
}
