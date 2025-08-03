'use client';

import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

type Metric = {
  id: string;
  name: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
};

type PerformancePaintTiming = PerformanceEntry & {
  renderTime?: number;
  loadTime?: number;
};

export default function PerformanceMonitor() {
  // Track Web Vitals
  useReportWebVitals((metric) => {
    console.log(metric);
    // Here you can send metrics to analytics service
  });

  useEffect(() => {
    // Track custom performance metrics
    const trackPerformance = () => {
      if (window.performance) {
        const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0] as PerformancePaintTiming;
        const lcpEntry = performance.getEntriesByName('largest-contentful-paint')[0] as PerformancePaintTiming;
        
        const metrics: Metric[] = [
          {
            id: 'ttfb',
            name: 'Time to First Byte',
            value: navigationTiming.responseStart - navigationTiming.startTime,
          },
          {
            id: 'fcp',
            name: 'First Contentful Paint',
            value: fcpEntry?.startTime || 0,
          },
          {
            id: 'lcp',
            name: 'Largest Contentful Paint',
            value: lcpEntry?.renderTime || lcpEntry?.startTime || 0,
          },
        ];

        console.log('Performance Metrics:', metrics);
      }
    };

    // Run after page load
    const timer = setTimeout(trackPerformance, 1000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
