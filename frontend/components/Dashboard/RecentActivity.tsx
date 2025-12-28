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
        return { icon: '↑', color: 'text-green-400 bg-green-500/10 border-green-500/30' };
      case 'decrement':
        return { icon: '↓', color: 'text-red-400 bg-red-500/10 border-red-500/30' };
      case 'reset':
        return { icon: '↺', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' };
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
    <div className="glass rounded-xl p-6 border border-border-default">
      <h2 className="text-xl font-semibold text-text-primary mb-4">{title}</h2>

      {activities.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-muted text-sm">No activity yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity, index) => {
            const { icon, color } = getActivityIcon(activity.type);

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-bg-secondary/50 hover:bg-bg-secondary transition-colors"
              >
                {/* Icon */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border ${color}`}
                >
                  <span className="text-lg font-bold">{icon}</span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">
                    {getActivityLabel(activity)}
                  </p>
                  <p className="text-xs text-text-muted">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>

                {/* Transaction Link */}
                {activity.txId && (
                  <a
                    href={`https://explorer.hiro.so/txid/${activity.txId}?chain=${
                      process.env.NEXT_PUBLIC_NETWORK || 'mainnet'
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    View →
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
