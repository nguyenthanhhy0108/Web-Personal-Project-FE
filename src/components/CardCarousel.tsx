'use client';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import CarCard from './Card';

interface GivenCard {
  title: string;
  description: string;
  img: string;
}

type GivenCards = GivenCard[];

const CardCarousel = ({ cards }: { cards: GivenCards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // console.log("Rerendered")
  // console.log(currentIndex)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 3));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= cards.length - 3 ? 0 : prevIndex + 3,
    );
  };

  const handleClickIndicator = ({ index }: { index: number }) => {
    setCurrentIndex(index * 3);
  };

  return (
    <div className='relative w-full mx-auto'>
      <div className='overflow-hidden'>
        <div
          className='flex flex-col lg:flex-row transition-transform duration-500 justify-between'
          style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }}
        >
          {cards.map((card, index) => {
            return (
              <div
                key={index}
                className={`lg:w-1/3 h-full lg:flex-shrink-0 lg:px-3 py-3 transition-opacity duration-500  ${
                  index >= currentIndex && index < currentIndex + 3
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none hidden lg:flex'
                }`}
              >
                <CarCard
                  price=''
                  title={card.title}
                  description={card.description}
                  imageLink={card.img}
                />
              </div>
            );
          })}
        </div>
      </div>

      <IconButton
        className={`hidden lg:flex absolute top-1/2 left-0 transform -translate-y-1/2 dark:bg-gray-200 dark:text-black bg-transparent text-black hover:bg-gray-600`}
        onClick={handlePrev}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Transparent background
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker on hover
          },
          borderRadius: '50%', // Circular button
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <IconButton
        className='hidden lg:flex absolute top-1/2 right-0 transform -translate-y-1/2 dark:bg-gray-200 dark:text-black bg-transparent text-black hover:bg-gray-600'
        onClick={handleNext}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          borderRadius: '50%',
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      <div className='lg:flex justify-center mt-4 space-x-2 hidden'>
        {cards
          .filter((_, index) => index % 3 == 0)
          .map((_, index) => {
            // console.log(index)
            // console.log(currentIndex)
            return (
              <button
                onClick={() => handleClickIndicator({ index })}
                key={index}
                className={`h-2 w-6 ${
                  index === currentIndex / 3
                    ? 'bg-gray-800 dark:bg-white'
                    : 'bg-gray-400 dark:bg-gray-700'
                }`}
              ></button>
            );
          })}
      </div>
    </div>
  );
};

export default CardCarousel;
