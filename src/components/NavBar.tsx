"use client"

import { ThemeContext } from "@/contexts/ThemeContext";
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Menu, X } from "lucide-react";
import { useContext, useState } from 'react';
import Loading from "./Loading";
import Logo from "./Logo";
import NavBarItem from "./NavBarItem";

export default function NavBar() {
  
  const themeValues = useContext(ThemeContext)

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  }

  // console.log(themeValues)

  if (themeValues == null || themeValues.isChangeTheme == false) {
    return <Loading />;
  }

  return (
    <header className="bg-light-mode text-black dark:bg-dark-mode dark:text-white top-0 flex-wrap z-50 mx-auto flex w-full items-center justify-between dark:border-0 lg:border-2 pb-0">
      <Logo 
        src={themeValues.themeMode === "dark" ? "/images/white-logo.png" : "/images/black-logo.png"}
        alt="logo"
      />
      <nav className='flex flex-wrap'>
        <div className='hidden lg:flex ml-auto'>
          <div className='flex gap-6'>
            <NavBarItem title="About" toLink="#"/>
            <NavBarItem title="Contact" toLink="#"/>
            <NavBarItem title="News" toLink="#"/>
            <button onClick={themeValues.toggleThemeButton}>
              {themeValues.themeMode === "dark" ? <LightModeIcon/> : <ModeNightIcon/>}
            </button>
          </div>
        </div>
        <div>
          <button onClick={toggleNavbar} className="lg:hidden ml-auto">
            {isOpen ? <X/> : <Menu />}
          </button>
        </div>
      </nav>
      {
        isOpen && (
          <div className='flex flex-wrap flex-col items-center justify-center bg-white dark:bg-black dark:text-white w-screen'>
            <NavBarItem title="About" toLink="#"/>
            <NavBarItem title="Contact" toLink="#"/>
            <NavBarItem title="News" toLink="#"/>
            <button 
              className="mb-3 hover:text-blue-900"
              onClick={themeValues.toggleThemeButton}>
              {themeValues.themeMode === "dark" ? <LightModeIcon/> : <ModeNightIcon/>}
            </button>
          </div>
        )
      }
    </header>
  )
}
