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
