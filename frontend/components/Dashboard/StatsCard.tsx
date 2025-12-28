// ========================================
// StatsCard Component - Dashboard Statistics Display
// ========================================

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}
