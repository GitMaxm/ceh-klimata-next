'use client';

import './style.css';

import { useDarkMode } from './hooks/useDarkMode';

const BtnDarkMode = () => {
  const { isDark, handleDarkModeClick } = useDarkMode();

  return (
    <button
      type="button"
      className="dark-mode-btn"
      onClick={handleDarkModeClick}
      aria-label="Тёмная тема"
      aria-pressed={isDark ?? undefined}
    >
      <img src="/img/icons/dark-mode/sun.svg" alt="" className="dark-mode-btn__icon" />
      <img src="/img/icons/dark-mode/moon.svg" alt="" className="dark-mode-btn__icon" />
    </button>
  );
};

export { BtnDarkMode };
