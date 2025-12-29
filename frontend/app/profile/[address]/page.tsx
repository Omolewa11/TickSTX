// ========================================
// User Profile Page - Individual Statistics
// ========================================

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import { CopyButton } from '@/components/UI/CopyButton';
import { truncateAddress } from '@/utils/helpers';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const address = params?.address as string;

  // Fetch real user data from blockchain
  const { profile, isLoading, error } = useUserProfile(address);

  // Use profile data or provide defaults
  const userProfile = profile || {
    address: address,
    rank: 0,
    totalOperations: 0,
    increments: 0,
    decrements: 0,
    netContribution: 0,
    firstSeen: null,
    lastActive: null,
    achievements: [],
    recentTransactions: [],
  };

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  if (!address) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-text-muted hover:text-cyan-400 transition-colors"
        >
          <span>←</span>
          <span>Back</span>
        </motion.button>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group mb-8"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-xl blur opacity-60" />
            <div className="relative glass rounded-xl p-6 border border-red-500/30 backdrop-blur-xl bg-bg-secondary/80">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-1">Error Loading Profile</h3>
                  <p className="text-sm text-text-muted">{error}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-text-muted">Loading profile...</p>
            </div>
          </div>
        )}

        {/* Profile Content */}
        {!isLoading && !error && (
          <>
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group mb-8"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500" />
              <div className="relative glass rounded-xl p-8 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-4xl shadow-lg shadow-cyan-500/50"
                    >
                      👤
                    </motion.div>

                    {/* Address & Rank */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold gradient-text font-mono">
                          {truncateAddress(address, 8)}
                        </h1>
                        <CopyButton text={address} label="" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
                          <span className="text-yellow-400 font-bold text-lg">
                            {getMedalEmoji(userProfile.rank)} Rank {userProfile.rank}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Full Address */}
                  <div className="md:text-right">
                    <p className="text-xs text-text-muted mb-1">Full Address</p>
                    <code className="text-xs text-cyan-400 font-mono break-all">{address}</code>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {[
                { label: 'Operations', value: userProfile.totalOperations, icon: '⚡', color: 'purple' },
                { label: 'Increments', value: userProfile.increments, icon: '⬆️', color: 'green' },
                { label: 'Decrements', value: userProfile.decrements, icon: '⬇️', color: 'red' },
                { label: 'Net Impact', value: userProfile.netContribution, icon: '📈', color: 'cyan' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                  <div className="relative glass rounded-xl p-6 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80 text-center">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold gradient-text mb-1">
                      {stat.value > 0 ? '+' : ''}{stat.value}
                    </div>
                    <div className="text-xs text-text-muted">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Activity */}
              <div className="lg:col-span-2 space-y-8">
                {/* Recent Transactions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500" />
                  <div className="relative glass rounded-xl p-6 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80">
                    <h2 className="text-xl font-semibold gradient-text mb-6">Recent Transactions</h2>

                    <div className="space-y-3">
                      {userProfile.recentTransactions.map((tx, index) => (
                        <motion.div
                          key={tx.txId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          whileHover={{ x: 4 }}
                          className="flex items-center justify-between p-4 rounded-lg bg-bg-secondary/50 border border-white/5 hover:border-cyan-500/30 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              tx.type === 'increment'
                                ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                                : 'bg-red-500/10 border border-red-500/30 text-red-400'
                            }`}>
                              <span className="text-lg font-bold">
                                {tx.type === 'increment' ? '↑' : '↓'}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-text-primary">
                                {tx.type === 'increment' ? `+${tx.amount}` : `-${tx.amount}`}
                              </p>
                              <p className="text-xs text-text-muted">
                                {tx.timestamp.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <a
                            href={`https://explorer.hiro.so/txid/${tx.txId}?chain=${process.env.NEXT_PUBLIC_NETWORK || 'mainnet'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-md text-xs font-medium bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all"
                          >
                            View →
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Achievements */}
              <div className="space-y-8">
                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500" />
                  <div className="relative glass rounded-xl p-6 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80">
                    <h2 className="text-xl font-semibold gradient-text mb-6">Achievements</h2>

                    <div className="space-y-3">
                      {userProfile.achievements.map((achievement, index) => (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/5 to-orange-500/5 border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-3xl">{achievement.icon}</div>
                            <div>
                              <h3 className="font-semibold text-text-primary mb-1">
                                {achievement.name}
                              </h3>
                              <p className="text-xs text-text-muted">
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Profile Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500" />
                  <div className="relative glass rounded-xl p-6 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80">
                    <h2 className="text-xl font-semibold gradient-text mb-6">Profile Info</h2>

                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-text-muted mb-1">First Seen</p>
                        <p className="text-text-primary font-semibold">
                          {userProfile.firstSeen.toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-muted mb-1">Last Active</p>
                        <p className="text-text-primary font-semibold">
                          {userProfile.lastActive.toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-muted mb-1">Total Contribution</p>
                        <p className={`font-bold text-lg ${
                          userProfile.netContribution > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {userProfile.netContribution > 0 ? '+' : ''}{userProfile.netContribution}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
