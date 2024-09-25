"use client"

import { imageLinks } from "@/constants";
import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export default function ImageSlider() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageLinks.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const handleNextImage = () => {
    if(currentImageIndex == imageLinks.length - 1) {
      setCurrentImageIndex(0);
    }
    else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }

  const handlePrevImage = () => {
    if(currentImageIndex == 0) {
      setCurrentImageIndex(imageLinks.length - 1);
    }
    else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }
  
  const handleClickImageNavigator = (imgLinkIndex: number) => {
    setCurrentImageIndex(imgLinkIndex)
  }

  return (
    <div className="h-[300px] lg:h-[800px] max-w-[1450px] w-screen m-auto pt-6 px-4 relative group">
      <div className="w-full h-full bg-center bg-cover duration-300 rounded-2xl" style={{backgroundImage: `url(${imageLinks[currentImageIndex].url})`}}></div>
      <div 
        onClick={handlePrevImage}
        className="hidden group-hover:block absolute top-[50%] translate-x-0 left-5 p-2 bg-black/20 rounded-3xl text-white cursor-pointer">
        <BsChevronCompactLeft size={50}/>
      </div>
      <div 
        onClick={handleNextImage}
        className="hidden group-hover:block absolute top-[50%] translate-x-0 right-5 p-2 bg-black/20 rounded-3xl text-white cursor-pointer">
        <BsChevronCompactRight size={50}/>
      </div>
      <div className="absolute bottom-2 flex justify-center gap-3 -translate-x-1/2 left-1/2 p-2 rounded-full text-white bg-black/20 transition-all">
        {imageLinks.map((imgLink) => {
          return <button 
            className={` ${imgLink.id == currentImageIndex ? "px-3 bg-white/30 rounded-full transition-all duration-100" : ""}`}
            onClick={() => handleClickImageNavigator(imgLink.id)}
            key={imgLink.id}>
            {imgLink.id == currentImageIndex ? (<div></div>) : (<div className="p-1 bg-white/30 rounded-full"/>)}            
          </button>
        })}
      </div>
    </div>
  )
}