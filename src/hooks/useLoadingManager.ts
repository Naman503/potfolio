"use client";

import { useState, useEffect } from "react";

export const useLoadingManager = (componentIds: string[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload ALL images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        // All project images including carousel images
        const allImages = [
          // Profile image
          "/images/Profile/Naman_B.jpeg",
          
          // Bwsala project images
          "/images/projects/Bwsala/Bwsala_carasol_1.png",
          "/images/projects/Bwsala/Bwsala_carasol_2.png",
          "/images/projects/Bwsala/Bwsala_carasol_3.png",
          "/images/projects/Bwsala/Bwsala_carasol_4.png",
          "/images/projects/Bwsala/Bwsala_carasol_5.png",
          
          // Caprics project images
          "/images/projects/Caprics/Caprics_carasol_1.png",
          "/images/projects/Caprics/Caprics_carasol_2.png",
          "/images/projects/Caprics/Caprics_carasol_3.png",
          
          // QLM project images
          "/images/projects/QLM/QLM_carasol_1.png",
          "/images/projects/QLM/QLM_carasol_2.png",
          "/images/projects/QLM/QLM_carasol_3.png",
          "/images/projects/QLM/QLM_carasol_4.png",
          
          // Golavi project images
          "/images/projects/Golavi/Golavi_carasol_1.png",
          "/images/projects/Golavi/Golavi_carasol_2.png",
          
          // Smart Air Admin project images
          "/images/projects/Smart_Air_bangladesh_React_Admin/SmartAirAdmin_carasol_1.png",
          "/images/projects/Smart_Air_bangladesh_React_Admin/SmartAirAdmin_carasol_2.png",
          "/images/projects/Smart_Air_bangladesh_React_Admin/SmartAirAdmin_carasol_3.png",
          "/images/projects/Smart_Air_bangladesh_React_Admin/SmartAirAdmin_carasol_4.png",
          "/images/projects/Smart_Air_bangladesh_React_Admin/SmartAirAdmin_carasol_5.png",
          
          // Smart Air Mobile project images
          "/images/projects/Smart_Air_Mobile/SmartAir_carasol_1.png",
          "/images/projects/Smart_Air_Mobile/SmartAir_carasol_2.png",
          "/images/projects/Smart_Air_Mobile/SmartAir_carasol_3.png",
          "/images/projects/Smart_Air_Mobile/SmartAir_carasol_4.png"
        ];

        // Load images in batches to avoid overwhelming the browser
        const batchSize = 5;
        for (let i = 0; i < allImages.length; i += batchSize) {
          const batch = allImages.slice(i, i + batchSize);
          const batchPromises = batch.map(src => {
            return new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.onerror = () => resolve(); // Resolve anyway to not block
              img.src = src;
            });
          });
          
          await Promise.all(batchPromises);
        }
        
        setImagesLoaded(true);
      } catch (error) {
        console.warn("Image preloading failed:", error);
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  // Complete loading when images are loaded or after timeout
  useEffect(() => {
    if (imagesLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded]);

  // Fallback timer to ensure loading doesn't get stuck
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // Maximum 6 seconds
    
    return () => clearTimeout(fallbackTimer);
  }, []);

  return {
    isLoading,
    imagesLoaded,
    totalComponents: componentIds.length,
    markComponentLoaded: () => {},
    loadingProgress: {
      components: 100,
      is3DLoaded: true,
      areImagesLoaded: imagesLoaded,
      isFontLoaded: true,
      overall: imagesLoaded ? 100 : 50,
    },
  };
};