'use client';

import { ArrowUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ScrollToTopButton: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    scrollToTopWithDuration(600);
  };

  const scrollToTopWithDuration = (duration: number) => {
    const start = window.scrollY;
    const startTime = performance.now();

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeInOutQuad(progress);

      window.scrollTo(0, start - start * easeProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white rounded-full opacity-45 hover:opacity-100 p-6"
          title="Go to top"
        >
          
          <ArrowUp
            className='bg-transparent'
          />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
