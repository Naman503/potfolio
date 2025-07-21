'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button 
        className={styles.themeToggle} 
        aria-label="Toggle theme"
        style={{ visibility: 'hidden' }}
      >
        <FiSun className={styles.icon} />
      </button>
    );
  }

  return (
    <button 
      className={styles.themeToggle} 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-live="polite"
    >
      {theme === 'light' ? (
        <FiMoon className={styles.icon} />
      ) : (
        <FiSun className={styles.icon} />
      )}
    </button>
  );
};

export default ThemeToggle;
