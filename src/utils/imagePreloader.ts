export interface ImageToPreload {
  src: string;
  priority?: boolean;
}

export class ImagePreloader {
  private loadedImages = new Set<string>();
  private loadingPromises = new Map<string, Promise<void>>();

  async preloadImage(src: string): Promise<void> {
    if (this.loadedImages.has(src)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src)!;
    }

    const promise = new Promise<void>((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        this.loadedImages.add(src);
        this.loadingPromises.delete(src);
        resolve();
      };
      
      img.onerror = () => {
        this.loadingPromises.delete(src);
        console.warn(`Failed to preload image: ${src}`);
        resolve(); // Resolve anyway to not block loading
      };
      
      img.src = src;
    });

    this.loadingPromises.set(src, promise);
    return promise;
  }

  async preloadImages(images: ImageToPreload[]): Promise<void> {
    // Sort by priority (priority images first)
    const sortedImages = images.sort((a, b) => {
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;
      return 0;
    });

    // Preload priority images first
    const priorityImages = sortedImages.filter(img => img.priority);
    const regularImages = sortedImages.filter(img => !img.priority);

    // Load priority images first
    if (priorityImages.length > 0) {
      await Promise.all(priorityImages.map(img => this.preloadImage(img.src)));
    }

    // Then load regular images in batches to avoid overwhelming the browser
    const batchSize = 3;
    for (let i = 0; i < regularImages.length; i += batchSize) {
      const batch = regularImages.slice(i, i + batchSize);
      await Promise.all(batch.map(img => this.preloadImage(img.src)));
    }
  }

  isImageLoaded(src: string): boolean {
    return this.loadedImages.has(src);
  }

  getLoadedCount(): number {
    return this.loadedImages.size;
  }
}

export const imagePreloader = new ImagePreloader();
