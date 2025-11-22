"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Player from 'lottie-react';
import styles from "./LoadingScreen.module.scss";
import astronautAnimation from '../../../public/Astronaut.json';
import { imagePreloader } from "@/utils/imagePreloader";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(5); // Start with 5% to show immediately
  const [animationError, setAnimationError] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Mark body as react-loaded when component mounts to remove CSS placeholder
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('react-loaded');
    }
  }, []);

  // Start asset preloading immediately when component mounts
  useEffect(() => {
    let isMounted = true;
    
    const preloadAssets = async () => {
      try {
        // Start with minimal progress
        if (isMounted) {
          setProgress(5);
        }

        // Preload all portfolio images with progress tracking
        await imagePreloader.preloadAllPortfolioImages((progressData) => {
          if (isMounted) {
            // Update progress: 5% initial + 90% for images + 5% buffer
            const imageProgress = Math.min(90, (progressData.loaded / progressData.total) * 90);
            setProgress(5 + imageProgress);
          }
        });

        // Mark as loaded and complete
        if (isMounted) {
          setImagesLoaded(true);
          setProgress(100);
          
          // Small delay to show 100% before completing
          setTimeout(() => {
            if (isMounted) {
              onLoadingComplete();
            }
          }, 300);
        }
      } catch (error) {
        console.error('Preloading failed:', error);
        if (isMounted) {
          setImagesLoaded(true);
          setProgress(100);
          // Still complete loading even if there's an error
          setTimeout(() => {
            if (isMounted) {
              onLoadingComplete();
            }
          }, 300);
        }
      }
    };

    preloadAssets();

    return () => {
      isMounted = false;
    };
  }, [onLoadingComplete]);

  // Fallback: Complete loading after maximum 8 seconds to prevent infinite loading
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!imagesLoaded) {
        console.warn('Loading timeout reached, completing anyway');
        setProgress(100);
        setImagesLoaded(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 300);
      }
    }, 8000); // 8 seconds maximum

    return () => clearTimeout(fallbackTimer);
  }, [imagesLoaded, onLoadingComplete]);

  // Always render loading screen when isLoading is true, no animation delay
  if (!isLoading) {
    return null;
  }

  return (
    <motion.div
      className={styles.loadingScreen}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999
      }}
    >
          {/* Animated Background Grid */}
          <div className={styles.animatedGrid} />
          
          {/* Particle Effects */}
          <div className={styles.particles}>
            {[...Array(20)].map((_, i) => (
              <div key={i} className={styles.particle} style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }} />
            ))}
          </div>

          <div className={styles.loadingContent}>
            {/* Animation Container with Glow Effect */}
            <motion.div 
              className={styles.animationContainer}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.glowRing} />
              {!animationError ? (
                <Player
                  animationData={astronautAnimation}
                  loop={true}
                  autoplay={true}
                  style={{ width: "100%", height: "100%", zIndex: 2 }}
                  onError={() => setAnimationError(true)}
                />
              ) : (
                <div className={styles.fallbackAnimation} />
              )}
            </motion.div>

            {/* Loading Text with Typewriter Effect */}
            <motion.div
              className={styles.loadingText}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2>
                <span className={styles.gradientText}>Loading Portfolio</span>
                <span className={styles.cursor}>|</span>
              </h2>
              <p className={styles.subtitle}>
                Crafting an immersive experience...
              </p>
              <div className={styles.skillTags}>
                <span className={styles.tag}>React</span>
                <span className={styles.tag}>Next.js</span>
                <span className={styles.tag}>TypeScript</span>
                <span className={styles.tag}>UI/UX</span>
              </div>
            </motion.div>

            {/* Enhanced Progress Bar */}
            <motion.div
              className={styles.progressContainer}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className={styles.progressShine} />
                </motion.div>
                <div className={styles.progressGlow} style={{ left: `${progress}%` }} />
              </div>
              <div className={styles.progressInfo}>
                <span className={styles.progressText}>{Math.round(progress)}%</span>
                <span className={styles.progressLabel}>Complete</span>
              </div>
            </motion.div>
          </div>

          {/* Background Effects */}
          <div className={styles.backgroundEffects}>
            <div className={styles.gradientOrb1} />
            <div className={styles.gradientOrb2} />
            <div className={styles.gradientOrb3} />
            <div className={styles.gradientOrb4} />
          </div>
        </motion.div>
  );
};

export default LoadingScreen;
