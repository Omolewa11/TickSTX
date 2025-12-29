// ========================================
// About Page - Project Information
// ========================================

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  const features = [
    {
      icon: '🔐',
      title: 'Blockchain Secured',
      description: 'Smart contract deployed on Stacks blockchain for maximum security and transparency',
    },
    {
      icon: '⚡',
      title: 'Real-time Updates',
      description: 'Instant counter updates with smooth animations and real-time transaction tracking',
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Comprehensive statistics and visualizations of all counter operations',
    },
    {
      icon: '🎨',
      title: 'Modern UI/UX',
      description: 'Beautiful cyber-themed interface with smooth animations and glassmorphism',
    },
    {
      icon: '👛',
      title: 'Wallet Integration',
      description: 'Seamless integration with Stacks wallets (Hiro, Xverse, Leather)',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Optimized for all devices - desktop, tablet, and mobile',
    },
  ];

  const techStack = [
    { name: 'Clarity', category: 'Smart Contract', color: '#00f0ff' },
    { name: 'Stacks', category: 'Blockchain', color: '#a855f7' },
    { name: 'Next.js 14', category: 'Frontend', color: '#00f0ff' },
    { name: 'TypeScript', category: 'Language', color: '#3178c6' },
    { name: 'Tailwind CSS', category: 'Styling', color: '#38bdf8' },
    { name: 'Framer Motion', category: 'Animation', color: '#ff0055' },
    { name: '@stacks/connect', category: 'Web3', color: '#a855f7' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center shadow-2xl shadow-cyan-500/50">
              <span className="text-5xl">⚡</span>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            TickSTX
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            A decentralized counter application built on the Stacks blockchain
          </p>

          {/* Quick Actions */}
          <div className="flex items-center justify-center gap-4">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all"
              >
                Try Counter
              </motion.button>
            </Link>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-semibold transition-all"
              >
                View Dashboard
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* What is TickSTX Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500" />
            <div className="relative glass rounded-xl p-8 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80">
              <h2 className="text-3xl font-bold gradient-text mb-4">What is TickSTX?</h2>
              <div className="text-text-secondary space-y-4">
                <p>
                  TickSTX is a decentralized counter application demonstrating the power of smart contracts on the Stacks blockchain. It allows anyone to interact with a shared counter by incrementing, decrementing, or viewing its current value.
                </p>
                <p>
                  Built with modern web technologies and deployed on Stacks mainnet, TickSTX showcases how blockchain technology can create transparent, immutable, and decentralized applications that anyone can use and verify.
                </p>
                <p>
                  Every operation is recorded permanently on the blockchain, creating an immutable history of all counter changes. The application features a beautiful, responsive interface with real-time updates and comprehensive analytics.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                <div className="relative glass rounded-xl p-6 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80 h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
            Technology Stack
          </h2>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500" />
            <div className="relative glass rounded-xl p-8 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-lg bg-bg-secondary/50 border border-white/5 hover:border-cyan-500/30 transition-all"
                  >
                    <div
                      className="w-3 h-3 rounded-full mb-2"
                      style={{ backgroundColor: tech.color }}
                    />
                    <h4 className="text-text-primary font-semibold mb-1">{tech.name}</h4>
                    <p className="text-xs text-text-muted">{tech.category}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Smart Contract Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
            Smart Contract
          </h2>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500" />
            <div className="relative glass rounded-xl p-8 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Contract Address
                  </h3>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-3 rounded-lg bg-bg-secondary/80 border border-cyan-500/20 text-cyan-400 font-mono text-sm overflow-x-auto">
                      {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'SP37E1R5QCZKJDKKAW7XH8J8WYTRQV39NWADG6WH4.TickStx-'}
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Network
                  </h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-purple-400 font-semibold">
                      {process.env.NEXT_PUBLIC_NETWORK === 'testnet' ? 'Testnet' : 'Mainnet'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    Available Functions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { name: 'increment', desc: 'Increase counter by 1', type: 'write' },
                      { name: 'decrement', desc: 'Decrease counter by 1', type: 'write' },
                      { name: 'increment-by', desc: 'Increase by custom amount', type: 'write' },
                      { name: 'decrement-by', desc: 'Decrease by custom amount', type: 'write' },
                      { name: 'reset-counter', desc: 'Reset to 0 (owner only)', type: 'write' },
                      { name: 'get-counter', desc: 'Read current value', type: 'read' },
                    ].map((func) => (
                      <div
                        key={func.name}
                        className="p-3 rounded-lg bg-bg-secondary/50 border border-white/5"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <code className="text-cyan-400 text-sm font-mono">{func.name}</code>
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              func.type === 'write'
                                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                                : 'bg-green-500/10 text-green-400 border border-green-500/30'
                            }`}
                          >
                            {func.type}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted">{func.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-500" />
            <div className="relative glass rounded-xl p-8 border border-cyan-500/20 backdrop-blur-xl bg-bg-secondary/80">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Ready to Try It Out?
              </h3>
              <p className="text-text-secondary mb-6 max-w-md">
                Connect your wallet and start interacting with the counter on the blockchain!
              </p>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all"
                >
                  Launch App →
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
