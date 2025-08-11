"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Player from 'lottie-react';
import styles from "./LoadingScreen.module.scss";
import astronautAnimation from '../../../public/Astronaut.json';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [animationError, setAnimationError] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Start with immediate partial progress when loading begins
  useEffect(() => {
    if (isLoading) {
      setProgress(20); // Show immediate progress
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          const targetProgress = imagesLoaded ? 100 : 80;
          if (prev >= targetProgress) {
            clearInterval(interval);
            return targetProgress;
          }
          return prev + 10; // Fast increments
        });
      }, 100); // Frequent updates

      return () => clearInterval(interval);
    }
  }, [isLoading, imagesLoaded]);

  // Start asset preloading immediately
  useEffect(() => {
    const preloadAssets = async () => {
      try {
        // Preload critical assets
        const { projects } = await import('@/data/projects');
        const imageUrls = projects.flatMap(project => [
          project.image,
          ...(project.carouselImages || []),
          ...(project.images || [])
        ].filter(Boolean));
        
        await Promise.all(
          imageUrls.map(url => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = url;
              img.onload = resolve;
              img.onerror = resolve; // Continue even if some images fail
            });
          })
        );
        setImagesLoaded(true);
        setProgress(100); // Jump to 100% when done
      } catch (error) {
        console.error('Preloading failed:', error);
        setImagesLoaded(true);
        setProgress(100); // Continue anyway
      }
    };

    preloadAssets();
  }, []);

  // Transition immediately when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      onLoadingComplete();
    }
  }, [progress, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.loadingScreen}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.loadingContent}>
            {/* Animation Container */}
            <motion.div 
              className={styles.animationContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {!animationError ? (
                <Player
                  animationData={astronautAnimation}
                  loop={true}
                  autoplay={true}
                  style={{ width: "100%", height: "100%" }}
                  onError={() => setAnimationError(true)}
                />
              ) : null}
            </motion.div>

            {/* Loading Text */}
            <motion.div
              className={styles.loadingText}
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: { delay: 0.2, duration: 0.5 }
              }}
            >
              <h2>Loading Portfolio</h2>
              <p>Preparing the experience...</p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className={styles.progressContainer}
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: "100%", 
                opacity: 1,
                transition: { delay: 0.4, duration: 0.5 }
              }}
            >
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              <span className={styles.progressText}>{Math.round(progress)}%</span>
            </motion.div>
          </div>

          {/* Background Effects */}
          <div className={styles.backgroundEffects}>
            <div className={styles.gradientOrb1} />
            <div className={styles.gradientOrb2} />
            <div className={styles.gradientOrb3} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
