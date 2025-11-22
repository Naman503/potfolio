"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Player from 'lottie-react';
import styles from "./LoadingScreen.module.scss";
import astronautAnimation from '../../../public/Astronaut.json';
import { imagePreloader } from "@/utils/imagePreloader";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [animationError, setAnimationError] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

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
              <p>
                Preparing the experience...
              </p>
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
