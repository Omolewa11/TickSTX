// ========================================
// Counter Display - Main Counter Visualization
// ========================================

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/UI/Card';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import { formatCounterValue } from '@/utils/helpers';
import { useCounter } from '@/hooks/useCounter';

export function CounterDisplay() {
  const { value, isLoading, error, refresh } = useCounter();
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [isIncreasing, setIsIncreasing] = useState<boolean | null>(null);

  // Track value changes for animation
  useEffect(() => {
    if (value !== null && prevValue !== null && value !== prevValue) {
      setIsIncreasing(value > prevValue);

      // Reset animation state after animation completes
      const timeout = setTimeout(() => setIsIncreasing(null), 400);
      return () => clearTimeout(timeout);
    }

    if (value !== null) {
      setPrevValue(value);
    }
  }, [value, prevValue]);

  return (
    <Card variant="cyber" className="relative overflow-hidden">
      {/* Loading State */}
      {isLoading && value === null && (
        <div className="flex flex-col items-center justify-center py-20">
          <LoadingSpinner size="lg" variant="spinner" />
          <p className="mt-4 text-text-secondary">Loading counter...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-neon-red mb-4">{error}</p>
          <button
            onClick={refresh}
            className="px-4 py-2 rounded-lg bg-neon-red bg-opacity-20 border border-neon-red text-neon-red hover:bg-opacity-30 transition-all"
          >
            Retry
          </button>
        </div>
      )}

      {/* Counter Value */}
      {!error && value !== null && (
        <div className="flex flex-col items-center justify-center py-12">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-text-secondary mb-4 tracking-wider uppercase"
          >
            Current Counter
          </motion.p>

          {/* Counter Number */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={value}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <h1
                  className={`
                    text-8xl md:text-9xl font-bold font-heading counter-glow
                    ${isIncreasing === true ? 'glow-green' : ''}
                    ${isIncreasing === false ? 'glow-pink' : ''}
                    ${isIncreasing === null ? 'glow-cyan' : ''}
                  `}
                  style={{
                    background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {formatCounterValue(value)}
                </h1>

                {/* Change Indicator */}
                <AnimatePresence>
                  {isIncreasing !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 0, scale: 0.5 }}
                      animate={{ opacity: 1, y: -20, scale: 1 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.4 }}
                      className={`
                        absolute -right-12 top-1/2 -translate-y-1/2
                        text-4xl
                        ${isIncreasing ? 'text-neon-green' : 'text-neon-pink'}
                      `}
                    >
                      {isIncreasing ? '⬆️' : '⬇️'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {/* Animated Pulse Ring */}
            {isIncreasing !== null && (
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`
                  absolute inset-0 rounded-full border-4
                  ${isIncreasing ? 'border-neon-green' : 'border-neon-pink'}
                `}
              />
            )}
          </div>

          {/* Refresh Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={refresh}
            disabled={isLoading}
            className="mt-8 px-4 py-2 rounded-lg glass border border-neon-cyan border-opacity-30 text-sm text-text-secondary hover:text-neon-cyan hover:border-opacity-60 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg
              className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </motion.button>
        </div>
      )}
    </Card>
  );
}
