'use client';

import './style.css';

import { useEffect, useRef } from 'react';

import { detectDarkMode, useLocalStorage } from '@/shared/lib';

const BtnDarkMode = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', detectDarkMode);

  useEffect(() => {
    if (darkMode === 'dark') {
      document.body.classList.add('dark');
      btnRef.current?.classList.add('dark-mode-btn--active');
    } else {
      document.body.classList.remove('dark');
      btnRef.current?.classList.remove('dark-mode-btn--active');
    }
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (event: MediaQueryListEvent) => {
      const newTheme = event.matches ? 'dark' : 'light';

      setDarkMode(newTheme);
    };

    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, [setDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button ref={btnRef} className="dark-mode-btn" onClick={toggleDarkMode}>
      <img src="/img/icons/dark-mode/sun.svg" alt="Light mode" className="dark-mode-btn__icon" />
      <img src="/img/icons/dark-mode/moon.svg" alt="Dark mode" className="dark-mode-btn__icon" />
    </button>
  );
};

export { BtnDarkMode };
