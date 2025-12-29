// ========================================
// ActivityChart Component - Simple Bar Chart
// ========================================

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface ActivityChartProps {
  data: ChartData[];
  title?: string;
}

export function ActivityChart({ data, title = 'Activity Overview' }: ActivityChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      {/* Gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500" />

      <div className="relative glass rounded-xl p-6 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80">
        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold gradient-text">{title}</h2>
          <div className="text-xs text-text-muted">
            Total: <span className="text-text-primary font-semibold">{totalValue}</span>
          </div>
        </div>

        <div className="space-y-6">
          {data.map((item, index) => {
            const percentage = totalValue > 0 ? Math.round((item.value / totalValue) * 100) : 0;
            const barWidth = maxValue > 0 ? (item.value / maxValue) * 100 : 0;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group/bar"
              >
                {/* Label & Value */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-text-muted">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-text-muted">{percentage}%</span>
                    <span className="text-sm font-bold gradient-text">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-4 bg-bg-secondary rounded-full overflow-hidden border border-white/5">
                  {/* Animated gradient bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{
                      duration: 1,
                      delay: index * 0.15,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="relative h-full rounded-full overflow-hidden"
                    style={{
                      background: `linear-gradient(90deg, ${item.color}55, ${item.color})`,
                    }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: index * 0.3,
                      }}
                      className="absolute inset-0 w-1/3"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${item.color}88, transparent)`,
                      }}
                    />

                    {/* Glow effect */}
                    <div
                      className="absolute inset-0 opacity-50"
                      style={{
                        boxShadow: `inset 0 0 12px ${item.color}44`,
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Legend */}
        {data.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 pt-4 border-t border-cyan-500/10"
          >
            <div className="flex items-center justify-center gap-6 text-xs">
              {data.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-bg-secondary"
                    style={{
                      backgroundColor: item.color,
                      ringColor: `${item.color}33`,
                    }}
                  />
                  <span className="text-text-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
