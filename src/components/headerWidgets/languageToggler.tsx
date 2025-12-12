'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

interface LanguageToggleButtonProps {
  className?: string;
}

const LanguageToggleButton: React.FC<LanguageToggleButtonProps> = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const currentLocale = useLocale();
  
  // Ensure component is mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  // Use fallback during SSR to prevent hydration mismatch
  const nextLanguage = mounted
    ? (languages.find(lang => lang.code !== currentLocale) || languages[1])
    : languages[1];

  const handleLanguageToggle = async () => {
    const newLocale = nextLanguage.code;
    if (newLocale === currentLocale) return;
    
    setIsLoading(true);

    try {
      // Preserve current theme
      const currentTheme = localStorage.getItem('theme') || 'light';
      
      // Set the locale cookie
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      
      // Ensure theme is preserved in localStorage
      localStorage.setItem('theme', currentTheme);
      
      // Reload the page to apply the new locale
      window.location.reload();
    } catch (error) {
      console.error('Error changing language:', error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLanguageToggle}
      disabled={isLoading}
      className={`
        te-navbar-icon-button flex items-center justify-center
        transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      title={mounted ? `Switch to ${nextLanguage.name}` : 'Switch language'}
      aria-label={mounted ? `Switch to ${nextLanguage.name}` : 'Switch language'}
      suppressHydrationWarning
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
      ) : (
        <div className="flex items-center space-x-1" suppressHydrationWarning>
          <span className="text-lg">{nextLanguage.flag}</span>
          
        </div>
      )}
    </button>
  );
};

export default LanguageToggleButton;
