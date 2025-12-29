// ========================================
// Leaderboard Page - Top Contributors
// ========================================

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { truncateAddress } from '@/utils/helpers';
import { useLeaderboard, type LeaderboardCategory } from '@/hooks/useLeaderboard';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';

export default function LeaderboardPage() {
  const [category, setCategory] = useState<LeaderboardCategory>('all');

  // Fetch real blockchain data
  const { entries, isLoading, error, refresh } = useLeaderboard(category);

  const categories = [
    { id: 'all' as LeaderboardCategory, label: 'Overall', icon: '🏆' },
    { id: 'incrementers' as LeaderboardCategory, label: 'Top Incrementers', icon: '⬆️' },
    { id: 'decrementers' as LeaderboardCategory, label: 'Top Decrementers', icon: '⬇️' },
    { id: 'active' as LeaderboardCategory, label: 'Most Active', icon: '⚡' },
  ];

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500 to-orange-500';
      case 2:
        return 'from-gray-300 to-gray-400';
      case 3:
        return 'from-orange-400 to-yellow-600';
      default:
        return 'from-cyan-500 to-purple-500';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-6xl"
            >
              🏆
            </motion.div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Leaderboard
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Top contributors to the TickSTX counter
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(cat.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  category === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-bg-secondary/50 text-text-secondary hover:bg-bg-secondary border border-cyan-500/20'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard Table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500" />
            <div className="relative glass rounded-xl border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-6 border-b border-cyan-500/10 bg-bg-secondary/50">
                <div className="col-span-1 text-text-muted font-semibold text-sm">Rank</div>
                <div className="col-span-5 text-text-muted font-semibold text-sm">Address</div>
                <div className="col-span-2 text-text-muted font-semibold text-sm text-center">
                  Operations
                </div>
                <div className="col-span-2 text-text-muted font-semibold text-sm text-center">
                  Increments
                </div>
                <div className="col-span-2 text-text-muted font-semibold text-sm text-center">
                  Net
                </div>
              </div>

              {/* Leaderboard Entries */}
              <div className="divide-y divide-cyan-500/10">
                {entries.map((entry, index) => (
                  <motion.div
                    key={entry.address}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4, backgroundColor: 'rgba(6, 182, 212, 0.05)' }}
                    className="grid grid-cols-12 gap-4 p-6 transition-all"
                  >
                    {/* Rank */}
                    <div className="col-span-1 flex items-center">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className={`text-2xl font-bold ${
                          entry.rank <= 3 ? '' : 'gradient-text'
                        }`}
                      >
                        {getMedalEmoji(entry.rank)}
                      </motion.div>
                    </div>

                    {/* Address */}
                    <div className="col-span-5 flex items-center">
                      <div className="relative group/address">
                        <div
                          className={`absolute -inset-1 bg-gradient-to-r ${getRankColor(
                            entry.rank
                          )} rounded-lg opacity-0 group-hover/address:opacity-20 blur transition duration-300`}
                        />
                        <code className="relative px-3 py-2 rounded-lg bg-bg-secondary/80 border border-cyan-500/20 text-cyan-400 font-mono text-sm">
                          {truncateAddress(entry.address)}
                        </code>
                      </div>
                    </div>

                    {/* Operations */}
                    <div className="col-span-2 flex items-center justify-center">
                      <div className="px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/30">
                        <span className="text-purple-400 font-bold">
                          {entry.operations}
                        </span>
                      </div>
                    </div>

                    {/* Increments */}
                    <div className="col-span-2 flex items-center justify-center">
                      <div className="px-3 py-1 rounded-md bg-green-500/10 border border-green-500/30">
                        <span className="text-green-400 font-semibold">
                          ↑ {entry.increments}
                        </span>
                      </div>
                    </div>

                    {/* Net Contribution */}
                    <div className="col-span-2 flex items-center justify-center">
                      <div
                        className={`px-3 py-1 rounded-md ${
                          entry.netContribution > 0
                            ? 'bg-cyan-500/10 border border-cyan-500/30'
                            : 'bg-red-500/10 border border-red-500/30'
                        }`}
                      >
                        <span
                          className={`font-bold ${
                            entry.netContribution > 0 ? 'text-cyan-400' : 'text-red-400'
                          }`}
                        >
                          {entry.netContribution > 0 ? '+' : ''}
                          {entry.netContribution}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {entries.length === 0 && !isLoading && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    No Data Yet
                  </h3>
                  <p className="text-text-muted">
                    Be the first to interact with the counter!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Total Participants', value: mockLeaderboard.length, icon: '👥' },
            {
              label: 'Total Operations',
              value: mockLeaderboard.reduce((sum, e) => sum + e.operations, 0),
              icon: '⚡',
            },
            {
              label: 'Net Counter Change',
              value: mockLeaderboard.reduce((sum, e) => sum + e.netContribution, 0),
              icon: '📈',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
              <div className="relative glass rounded-xl p-6 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80 text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-text-muted">
            Rankings are updated in real-time based on blockchain transactions
          </p>
        </motion.div>
      </div>
    </div>
  );
}
