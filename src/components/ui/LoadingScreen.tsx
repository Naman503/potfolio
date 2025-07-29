"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LoadingScreen.module.scss";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  // Simple progress animation
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 60);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Auto complete loading after progress reaches 100
  useEffect(() => {
    if (progress >= 100 && isLoading) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [progress, isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.loadingScreen}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { 
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
        >
          <div className={styles.loadingContent}>
            {/* Walking Animation */}
            <motion.div
              className={styles.animationContainer}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { duration: 0.3 }
              }}
            >
              <Image
                src="/Walking.gif"
                alt="Loading animation"
                width={200}
                height={200}
                priority
                unoptimized
                className={styles.walkingAnimation}
              />
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
