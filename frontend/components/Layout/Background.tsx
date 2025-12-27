// ========================================
// Background Component - Cyber Grid Background
// ========================================

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary" />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 grid-background opacity-30" />

      {/* Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan opacity-10 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-neon-purple opacity-10 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-neon-pink opacity-10 blur-3xl"
      />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-bg-primary to-bg-primary opacity-50" />

      {/* Scan Line Effect */}
      <motion.div
        animate={{
          y: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-20"
      />
    </div>
  );
}
