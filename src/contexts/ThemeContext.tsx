'use client';

import React, { createContext, useEffect, useState } from 'react';

interface ThemeValues {
  themeMode: string;
  toggleThemeButton: () => void;
  isChangeTheme: boolean;
}

export const ThemeContext = createContext<ThemeValues | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setThemeMode] = useState<string>('light');
  const [isChangeTheme, setIsChangeTheme] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === null) {
      setIsChangeTheme(true);
    } else {
      setIsChangeTheme(true);
      setThemeMode(currentTheme);
    }

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (themeMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', themeMode);
    }
  }, [themeMode]);

  const toggleThemeButton = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const themeValues = {
    themeMode,
    toggleThemeButton,
    isChangeTheme,
  };

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
};
