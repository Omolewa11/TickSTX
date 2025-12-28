// ========================================
// StatsCard Component - Dashboard Statistics Display
// ========================================

'use client';

import React from 'react';
import { motion } from 'framer-motion';

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
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`glass rounded-xl p-6 border border-border-default ${className}`}
    >
      {/* Icon & Title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/30">
            <span className="text-2xl">{icon}</span>
          </div>
          <h3 className="text-sm font-medium text-text-muted">{title}</h3>
        </div>

        {/* Trend Indicator */}
        {trend && (
          <div
            className={`text-xs font-medium ${
              trend.isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="text-3xl font-bold gradient-text">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </motion.div>
  );
}
