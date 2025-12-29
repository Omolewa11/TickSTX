// ========================================
// StatsCard Component - Dashboard Statistics Display
// ========================================

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon, trend, className = '' }: StatsCardProps) {
  // Animate number counting for numeric values
  const displayValue = typeof value === 'number'
    ? useCountUp({ end: value, duration: 1500 })
    : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        y: -4,
      }}
      transition={{ duration: 0.3 }}
      className={`relative group ${className}`}
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200" />

      {/* Card content */}
      <div className="relative glass rounded-xl p-6 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80 hover:bg-bg-secondary/90 transition-all duration-300">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon & Title */}
        <div className="relative flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center border border-cyan-500/40 shadow-lg shadow-cyan-500/20"
            >
              <span className="text-2xl">{icon}</span>
            </motion.div>
            <h3 className="text-sm font-medium text-text-muted">{title}</h3>
          </div>

          {/* Trend Indicator */}
          {trend && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-xs font-medium px-2 py-1 rounded-md ${
                trend.isPositive
                  ? 'text-green-400 bg-green-500/10 border border-green-500/30'
                  : 'text-red-400 bg-red-500/10 border border-red-500/30'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </motion.div>
          )}
        </div>

        {/* Value */}
        <div className="relative text-4xl font-bold gradient-text">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}
