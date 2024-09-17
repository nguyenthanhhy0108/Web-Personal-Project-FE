"use client"

import React, { createContext, useEffect, useState } from "react";

interface ThemeValues {
  themeMode: string,
  toggleThemeButton: () => void;
}

export const ThemeContext = createContext<ThemeValues | undefined>(undefined);

export const ThemeProvider = ({children} : {children:React.ReactNode}) => {

  const currentTheme = localStorage.getItem("theme");

  const [themeMode, setThemeMode] = useState<string>(currentTheme === null ? "light" : currentTheme);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if(currentTheme === null) {
      setThemeMode("light");
    } else {
      setThemeMode(currentTheme)
    }
  }, []);

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  const toggleThemeButton = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const themeValues = {
    themeMode,
    toggleThemeButton,
  }

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
}
