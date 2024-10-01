'use client';

import { ThemeContext } from '@/contexts/ThemeContext';
import { useContext } from 'react';
import Logo from './Logo';
import NavBarItem from './NavBarItem';

export default function Footer() {
  const themeValues = useContext(ThemeContext);

  return (
    <footer>
      <div className='hidden lg:flex bg-gray-500 dark:bg-black pt-3 pb-3 -z-50 text-white lg:justify-between justify-center'>
        <div className='flex items-center text-sm'>
          <Logo
            src={
              themeValues?.themeMode === 'dark'
                ? '/images/white-logo.png'
                : '/images/black-logo.png'
            }
            alt='logo'
          />
        </div>
        <div className='flex flex-col text-sm absolute left-1/2 transform -translate-x-1/2 text-center'>
          <div className='lg:flex justify-between'>
            <NavBarItem title='Term' toLink='#' />
            <NavBarItem title='Privacy' toLink='#' />
            <NavBarItem title='Security' toLink='#' />
            <NavBarItem title='Contact' toLink='#' />
            <NavBarItem title='Docs' toLink='#' />
          </div>
          <div className='flex justify-center items-center italic'>
            Do not share your personal information
          </div>
        </div>
        <div className='flex items-center italic'>
          ©{' ' + new Date().getFullYear() + ' '}
          Unreal, Inc.
        </div>
      </div>

      <div className='lg:hidden flex bg-gray-500 dark:bg-black pt-3 pb-3 -z-50 text-white lg:justify-between justify-center'>
        <div className='flex items-center text-sm italic justify-center'>
          <Logo
            src={
              themeValues?.themeMode === 'dark'
                ? '/images/white-logo.png'
                : '/images/black-logo.png'
            }
            alt='logo'
          />
          ©{' ' + new Date().getFullYear() + ' '}
          Unreal, Inc.
        </div>
      </div>
    </footer>
  );
}
