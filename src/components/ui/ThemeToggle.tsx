'use client';

import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
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
      aria-label="Dark mode"
      aria-live="polite"
      disabled
    >
      <FiMoon className={styles.icon} />
    </button>
  );
};

export default ThemeToggle;
