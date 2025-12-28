// ========================================
// Dashboard Page - Statistics & Analytics
// ========================================

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
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

            {/* Back to Counter Button */}
            <Link href="/">
              <button className="px-4 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all">
                ← Back to Counter
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Placeholder for Stats Cards */}
            <div className="glass rounded-xl p-6 border border-border-default">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Statistics Overview
              </h2>
              <p className="text-text-muted">
                Stats cards will be added in the next step
              </p>
            </div>

            {/* Placeholder for Activity Chart */}
            <div className="glass rounded-xl p-6 border border-border-default">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Activity Chart
              </h2>
              <p className="text-text-muted">
                Chart will be added in the next step
              </p>
            </div>
          </motion.div>

          {/* Sidebar Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Placeholder for Recent Activity */}
            <div className="glass rounded-xl p-6 border border-border-default">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Recent Activity
              </h2>
              <p className="text-text-muted">
                Activity list will be added in the next step
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
