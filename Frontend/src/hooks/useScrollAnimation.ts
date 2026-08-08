import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * Triggers isVisible when element enters the viewport.
 * Once visible, stays visible (one-time trigger).
 */
export function useScrollAnimation(threshold: number = 0.12): {
  isVisible: boolean;
  ref: RefObject<HTMLElement>;
} {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { isVisible, ref: elementRef };
}
