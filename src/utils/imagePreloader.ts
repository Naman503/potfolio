export interface ImageToPreload {
  src: string;
  priority?: boolean;
}

export interface PreloadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export type ProgressCallback = (progress: PreloadProgress) => void;

export class ImagePreloader {
  private loadedImages = new Set<string>();
  private loadingPromises = new Map<string, Promise<void>>();
  private progressCallbacks: Set<ProgressCallback> = new Set();

  /**
   * Subscribe to progress updates
   */
  onProgress(callback: ProgressCallback): () => void {
    this.progressCallbacks.add(callback);
    return () => {
      this.progressCallbacks.delete(callback);
    };
  }

  /**
   * Notify all progress callbacks
   */
  private notifyProgress(loaded: number, total: number): void {
    const progress: PreloadProgress = {
      loaded,
      total,
      percentage: total > 0 ? Math.round((loaded / total) * 100) : 0,
    };
    this.progressCallbacks.forEach((callback) => callback(progress));
  }

  /**
   * Preload a single image with caching support
   */
  async preloadImage(src: string, priority: boolean = false): Promise<void> {
    // Normalize the src path
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
    
    if (this.loadedImages.has(normalizedSrc)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(normalizedSrc)) {
      return this.loadingPromises.get(normalizedSrc)!;
    }

    const promise = new Promise<void>((resolve) => {
      const img = new Image();
      
      // Set fetch priority for better performance
      if (priority && 'fetchPriority' in img) {
        (img as HTMLImageElement & { fetchPriority?: 'high' | 'low' | 'auto' }).fetchPriority = 'high';
      }
      
      img.onload = () => {
        this.loadedImages.add(normalizedSrc);
        this.loadingPromises.delete(normalizedSrc);
        resolve();
      };
      
      img.onerror = () => {
        this.loadingPromises.delete(normalizedSrc);
        // Still mark as "loaded" to not block progress
        this.loadedImages.add(normalizedSrc);
        resolve(); // Resolve anyway to not block loading
      };
      
      // Use link preload for better browser caching
      if (typeof document !== 'undefined') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = normalizedSrc;
        if (priority) {
          link.setAttribute('fetchpriority', 'high');
        }
        document.head.appendChild(link);
      }
      
      img.src = normalizedSrc;
    });

    this.loadingPromises.set(normalizedSrc, promise);
    return promise;
  }

  /**
   * Preload multiple images with progress tracking
   */
  async preloadImages(
    images: ImageToPreload[],
    onProgress?: ProgressCallback
  ): Promise<void> {
    if (images.length === 0) {
      return;
    }

    // Remove duplicates
    const uniqueImages = Array.from(
      new Map(images.map((img) => [img.src, img])).values()
    );

    // Sort by priority (priority images first)
    const sortedImages = uniqueImages.sort((a, b) => {
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;
      return 0;
    });

    const total = sortedImages.length;
    let loaded = 0;

    // Progress callback wrapper
    const progressCallback = () => {
      loaded++;
      this.notifyProgress(loaded, total);
      if (onProgress) {
        onProgress({ loaded, total, percentage: Math.round((loaded / total) * 100) });
      }
    };

    // Preload priority images first (in parallel)
    const priorityImages = sortedImages.filter((img) => img.priority);
    if (priorityImages.length > 0) {
      await Promise.all(
        priorityImages.map(async (img) => {
          await this.preloadImage(img.src, true);
          progressCallback();
        })
      );
    }

    // Then load regular images in batches to avoid overwhelming the browser
    const regularImages = sortedImages.filter((img) => !img.priority);
    const batchSize = 5; // Increased batch size for faster loading
    
    for (let i = 0; i < regularImages.length; i += batchSize) {
      const batch = regularImages.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (img) => {
          await this.preloadImage(img.src, false);
          progressCallback();
        })
      );
    }
  }

  /**
   * Collect all images from projects data
   */
  async collectAllImages(): Promise<ImageToPreload[]> {
    try {
      const { projects } = await import('@/data/projects');
      
      const allImages: ImageToPreload[] = [];
      const seen = new Set<string>();

      // Add profile images (priority)
      const profileImages = [
        '/images/Profile/Naman_B.jpeg',
        '/images/Profile/charactor_Image.png', // Correct case: Profile (capital P)
        '/images/profile/charactor_Image.png', // Also include lowercase variant for compatibility
      ];

      profileImages.forEach((src) => {
        if (!seen.has(src)) {
          allImages.push({ src, priority: true });
          seen.add(src);
        }
      });

      // Add all project images
      projects.forEach((project) => {
        // Main project image
        if (project.image && !seen.has(project.image)) {
          allImages.push({ src: project.image, priority: false });
          seen.add(project.image);
        }

        // Carousel images
        if (project.carouselImages) {
          project.carouselImages.forEach((imgSrc) => {
            if (imgSrc && !seen.has(imgSrc)) {
              allImages.push({ src: imgSrc, priority: false });
              seen.add(imgSrc);
            }
          });
        }

        // Additional images
        if (project.images) {
          project.images.forEach((imgSrc) => {
            if (imgSrc && !seen.has(imgSrc)) {
              allImages.push({ src: imgSrc, priority: false });
              seen.add(imgSrc);
            }
          });
        }
      });

      return allImages;
    } catch (error) {
      console.error('Error collecting images:', error);
      return [];
    }
  }

  /**
   * Preload all portfolio images
   */
  async preloadAllPortfolioImages(
    onProgress?: ProgressCallback
  ): Promise<void> {
    const images = await this.collectAllImages();
    await this.preloadImages(images, onProgress);
  }

  isImageLoaded(src: string): boolean {
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
    return this.loadedImages.has(normalizedSrc);
  }

  getLoadedCount(): number {
    return this.loadedImages.size;
  }

  /**
   * Clear loaded images cache (useful for testing)
   */
  clearCache(): void {
    this.loadedImages.clear();
    this.loadingPromises.clear();
  }
}

export const imagePreloader = new ImagePreloader();
