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

  return (
    <div className="glass rounded-xl p-6 border border-border-default">
      <h2 className="text-xl font-semibold text-text-primary mb-6">{title}</h2>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.label}>
            {/* Label & Value */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-muted">{item.label}</span>
              <span className="text-sm font-semibold text-text-primary">
                {item.value.toLocaleString()}
              </span>
            </div>

            {/* Bar */}
            <div className="h-3 bg-bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${item.color}88, ${item.color})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      {data.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border-default">
          <div className="flex items-center justify-center gap-6 text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              <span>Increments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span>Decrements</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
