// ========================================
// RecentActivity Component - Transaction List
// ========================================

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { formatRelativeTime } from '@/utils/helpers';

interface Activity {
  id: string;
  type: 'increment' | 'decrement' | 'reset';
  amount: number;
  timestamp: Date;
  txId?: string;
}

interface RecentActivityProps {
  activities: Activity[];
  title?: string;
}

export function RecentActivity({ activities, title = 'Recent Activity' }: RecentActivityProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'increment':
        return { icon: '↑', color: 'text-green-400 bg-green-500/10 border-green-500/30', glow: '#22c55e' };
      case 'decrement':
        return { icon: '↓', color: 'text-red-400 bg-red-500/10 border-red-500/30', glow: '#ef4444' };
      case 'reset':
        return { icon: '↺', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30', glow: '#eab308' };
    }
  };

  const getActivityLabel = (activity: Activity) => {
    switch (activity.type) {
      case 'increment':
        return `+${activity.amount}`;
      case 'decrement':
        return `-${activity.amount}`;
      case 'reset':
        return 'Reset to 0';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      {/* Gradient border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500" />

      <div className="relative glass rounded-xl p-6 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80">
        <h2 className="text-xl font-semibold gradient-text mb-4">{title}</h2>

        {activities.length === 0 ? (
          <div className="text-center py-12">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-4xl mb-3"
            >
              📭
            </motion.div>
            <p className="text-text-muted text-sm">No activity yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {activities.map((activity, index) => {
              const { icon, color, glow } = getActivityIcon(activity.type);

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.05,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  whileHover={{
                    scale: 1.02,
                    x: 4,
                  }}
                  className="relative group/item"
                >
                  {/* Hover glow effect */}
                  <div
                    className="absolute -inset-0.5 rounded-lg opacity-0 group-hover/item:opacity-100 blur transition duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${glow}22, transparent)`,
                    }}
                  />

                  <div className="relative flex items-center gap-3 p-3 rounded-lg bg-bg-secondary/50 hover:bg-bg-secondary border border-white/5 transition-all duration-300">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center border ${color} shadow-lg`}
                      style={{
                        boxShadow: `0 4px 12px ${glow}22`,
                      }}
                    >
                      <span className="text-lg font-bold">{icon}</span>
                    </motion.div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-primary">
                        {getActivityLabel(activity)}
                      </p>
                      <p className="text-xs text-text-muted">
                        {formatRelativeTime(activity.timestamp)}
                      </p>
                    </div>

                    {/* Transaction Link */}
                    {activity.txId && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://explorer.hiro.so/txid/${activity.txId}?chain=${
                          process.env.NEXT_PUBLIC_NETWORK || 'mainnet'
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-md text-xs font-medium bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all"
                      >
                        View →
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
