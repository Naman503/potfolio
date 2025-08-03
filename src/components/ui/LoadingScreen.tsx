"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';
import styles from "./LoadingScreen.module.scss";

// Dynamically import the Lottie player to avoid SSR and reduce initial load
const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then(mod => mod.DotLottieReact),
  { 
    ssr: false,
    loading: () => <div className={styles.fallbackAnimation} />
  }
) as React.ComponentType<{
  src: string;
  loop: boolean;
  autoplay: boolean;
  style: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}>;

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [animationError, setAnimationError] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Simple progress animation
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          // Don't exceed 50% until images are loaded
          const maxProgress = imagesLoaded ? 100 : 50;
          if (prev >= maxProgress) {
            clearInterval(interval);
            return maxProgress;
          }
          return prev + 2;
        });
      }, 60);

      return () => clearInterval(interval);
    }
  }, [isLoading, imagesLoaded]);

  // Preload project images
  useEffect(() => {
    if (isLoading) {
      const preloadImages = async () => {
        try {
          const { projects } = await import('@/data/projects');
          const imageUrls = projects.flatMap(project => [
            project.image,
            ...(project.carouselImages || []),
            ...(project.images || [])
          ].filter(Boolean));
          
          // Track loaded images for progress
          let loadedCount = 0;
          const totalImages = imageUrls.length;
          
          await Promise.all(
            imageUrls.map(url => {
              return new Promise((resolve) => {
                const img = new Image();
                img.src = url;
                img.onload = () => {
                  loadedCount++;
                  // Update progress based on image loading
                  setProgress(Math.min(100, Math.floor((loadedCount / totalImages) * 50) + 50));
                  resolve(null);
                };
                img.onerror = resolve; // Continue even if some images fail
              });
            })
          );
          setImagesLoaded(true);
        } catch (error) {
          console.error('Error preloading images:', error);
          setImagesLoaded(true); // Continue anyway
        }
      };
      
      preloadImages();
    }
  }, [isLoading]);

  // Complete loading when both animation and images are ready
  useEffect(() => {
    if ((animationLoaded || animationError) && imagesLoaded && progress >= 100) {
      onLoadingComplete();
    }
  }, [animationLoaded, animationError, imagesLoaded, progress, onLoadingComplete]);

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
                <DotLottieReact
                  src="https://lottie.host/d04b9411-97bd-4cf1-b997-9cfe38ff9cc9/m428irsJF8.lottie"
                  loop={true}
                  autoplay={true}
                  style={{ width: "100%", height: "100%" }}
                  onLoad={() => setAnimationLoaded(true)}
                  onError={() => setAnimationError(true)}
                />
              ) : (
                <div className={styles.fallbackAnimation} />
              )}
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
                  transition={{ duration: 0.3, ease: "easeOut" }}
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
