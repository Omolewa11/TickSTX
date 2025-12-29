// ========================================
// useCountUp Hook - Animated Number Counting
// ========================================

import { useEffect, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
}

/**
 * Custom hook for animating numbers counting up
 * @param end - The final number to count to
 * @param duration - Animation duration in milliseconds (default: 1000)
 * @param start - Starting number (default: 0)
 */
export function useCountUp({ end, duration = 1000, start = 0 }: UseCountUpOptions): number {
  const [count, setCount] = useState(start);

  useEffect(() => {
    // If end is 0 or same as start, no animation needed
    if (end === start) {
      setCount(end);
      return;
    }

    const startTime = Date.now();
    const difference = end - start;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutExpo)
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(start + difference * easeOut);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, start]);

  return count;
}
