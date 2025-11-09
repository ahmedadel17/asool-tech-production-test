'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
  mounted: false,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load mode from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode === "true") {
        setDarkMode(true);
      } else if (savedMode === "false") {
        setDarkMode(false);
      } else {
        // No preference saved, use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
      }
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
      setDarkMode(false);
    }
  }, []);

  // Apply/remove class on <html> and <body>
  useEffect(() => {
    if (!mounted) return;
    
    try {
      const html = document.documentElement;
      const body = document.body;
      
      if (darkMode) {
        html.classList.add("dark");
        html.classList.remove("light");
        if (body) {
          body.classList.add("dark");
          body.classList.remove("light");
        }
      } else {
        html.classList.add("light");
        html.classList.remove("dark");
        if (body) {
          body.classList.add("light");
          body.classList.remove("dark");
        }
      }
      
      localStorage.setItem("darkMode", darkMode.toString());
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [darkMode, mounted]);

  // Listen for system theme changes (only if no user preference is set)
  useEffect(() => {
    if (!mounted) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      const savedMode = localStorage.getItem("darkMode");
      if (!savedMode) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [mounted]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

