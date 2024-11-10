'use client';

import { AuthenticationContext } from '@/contexts/AuthenticationContext';
import { ThemeContext } from '@/contexts/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Menu, X } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import AccountMenu from './AccountMenu';
import Loading from './Loading';
import Logo from './Logo';
import NavBarItem from './NavBarItem';

export default function NavBar() {
  const themeValues = useContext(ThemeContext);

  const authenticationValues = useContext(AuthenticationContext);

  const [isOpen, setIsOpen] = useState(false);

  const [isLandingPage, setIsLandingPage] = useState(false);

  useEffect(() => {
    const urlString = window.location.toString();

    const url = new URL(urlString);

    console.log(url.pathname);

    if (url.pathname == '/') {
      setIsLandingPage(true);
    }
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // console.log(themeValues)

  if (themeValues == null || themeValues.isChangeTheme == false) {
    return <Loading />;
  }

  return (
    <header
      className={`text-black dark:text-white top-0 flex-wrap z-50 mx-auto flex w-full items-center justify-between dark:border-0 lg:border-2 pb-0 ${isLandingPage ? 'bg-transparent absolute top-0 text-white' : 'dark:bg-dark-mode bg-light-mode'}`}
    >
      <Logo
        src={
          themeValues.themeMode === 'white' && isLandingPage == false
            ? '/images/black-logo.png'
            : '/images/white-logo.png'
        }
        alt='logo'
      />
      <nav className='flex flex-wrap'>
        <div className='hidden lg:flex ml-auto'>
          <div className='flex gap-6'>
            <NavBarItem title='About' toLink='#' />
            <NavBarItem title='Vehicles' toLink='/vehicles' />
            <NavBarItem title='Parts' toLink='#' />
            <NavBarItem title='Contact' toLink='#' />
            {authenticationValues?.isLogin == 'logged-in' && <AccountMenu />}
            <button
              className={`${isLandingPage ? 'hidden' : ''}`}
              onClick={themeValues.toggleThemeButton}
            >
              {themeValues.themeMode === 'dark' ? (
                <div className='px-3'>
                  <LightModeIcon />
                </div>
              ) : (
                <div className='px-3'>
                  <ModeNightIcon />
                </div>
              )}
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={toggleNavbar}
            className={`lg:hidden ml-auto ${isLandingPage ? 'hidden' : ''}`}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div
          className={`flex flex-wrap flex-col items-center justify-center bg-white dark:bg-black dark:text-white w-screen ${isLandingPage ? 'hidden' : ''}`}
        >
          <NavBarItem title='About' toLink='#' />
          <NavBarItem title='Vehicles' toLink='/vehicles' />
          <NavBarItem title='Services' toLink='#' />
          <NavBarItem title='Contact' toLink='#' />
          {authenticationValues?.isLogin == 'logged-in' && <AccountMenu />}
          <button
            className='mb-3 hover:text-blue-900'
            onClick={themeValues.toggleThemeButton}
          >
            {themeValues.themeMode === 'dark' ? (
              <div className='py-3'>
                <LightModeIcon />
              </div>
            ) : (
              <div className='py-3'>
                <ModeNightIcon />
              </div>
            )}
          </button>
        </div>
      )}
    </header>
  );
}
