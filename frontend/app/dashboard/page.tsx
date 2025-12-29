// ========================================
// Dashboard Page - Statistics & Analytics
// ========================================

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { ActivityChart } from '@/components/Dashboard/ActivityChart';
import { RecentActivity } from '@/components/Dashboard/RecentActivity';
import { EmptyState } from '@/components/Dashboard/EmptyState';
import { useStats } from '@/hooks/useStats';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';

export default function DashboardPage() {
  const {
    currentValue,
    totalOperations,
    totalIncrements,
    totalDecrements,
    recentActivities,
    isLoading,
    error,
    refresh,
  } = useStats();

  // Prepare chart data
  const chartData = [
    {
      label: 'Increments',
      value: totalIncrements,
      color: '#00f0ff', // cyan
    },
    {
      label: 'Decrements',
      value: totalDecrements,
      color: '#a855f7', // purple
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                Dashboard
              </h1>
              <p className="text-text-muted">
                Counter statistics and analytics
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={refresh}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Refreshing...' : '↻ Refresh'}
              </button>
              <Link href="/">
                <button className="px-4 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all">
                  ← Back to Counter
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400">
            ⚠️ {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && !error ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          /* Dashboard Content Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Cards Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Stats Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard
                  title="Current Value"
                  value={currentValue}
                  icon="📊"
                />
                <StatsCard
                  title="Total Operations"
                  value={totalOperations}
                  icon="⚡"
                />
                <StatsCard
                  title="Net Change"
                  value={`${totalIncrements > totalDecrements ? '+' : ''}${
                    totalIncrements - totalDecrements
                  }`}
                  icon="📈"
                  trend={
                    totalIncrements + totalDecrements > 0
                      ? {
                          value: `${Math.round(
                            (totalIncrements / (totalIncrements + totalDecrements)) * 100
                          )}% inc`,
                          isPositive: totalIncrements >= totalDecrements,
                        }
                      : undefined
                  }
                />
              </div>

              {/* Activity Chart */}
              {totalOperations > 0 ? (
                <ActivityChart data={chartData} title="Operations Breakdown" />
              ) : (
                <div className="glass rounded-xl p-6 border border-border-default text-center">
                  <p className="text-text-muted">
                    No operations recorded yet. Start using the counter to see statistics!
                  </p>
                </div>
              )}
            </motion.div>

            {/* Sidebar Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Recent Activity */}
              <RecentActivity
                activities={recentActivities}
                title="Recent Activity"
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
