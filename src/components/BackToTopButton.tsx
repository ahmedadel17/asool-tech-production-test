'use client';

import React, { useEffect, useState } from 'react';

export default function BackToTopButton() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  // Only show on large screens
  if (!isLargeScreen) {
    return null;
  }

  return (
    <button
      className={`te-footer-back-to-top back-to-top ${show ? 'show' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      suppressHydrationWarning
    >
      <svg
        className="te-footer-back-to-top-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 9 7-7 7 7"></path>
        <path d="M12 16V2"></path>
        <circle cx="12" cy="21" r="1"></circle>
      </svg>
    </button>
  );
}

