import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

interface GoogleAnalyticsProps {
  measurementId?: string;
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

const GoogleAnalytics = ({ measurementId = GA_MEASUREMENT_ID }: GoogleAnalyticsProps) => {
  const location = useLocation();

  useEffect(() => {
    if (!measurementId) return;

    // Load GA script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_path: location.pathname,
    });

    return () => {
      document.head.removeChild(script1);
    };
  }, [measurementId]);

  // Track page views on route change
  useEffect(() => {
    if (!measurementId || !window.gtag) return;
    
    window.gtag('config', measurementId, {
      page_path: location.pathname + location.search,
    });
  }, [location, measurementId]);

  return null;
};

// Helper function to track events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export default GoogleAnalytics;
