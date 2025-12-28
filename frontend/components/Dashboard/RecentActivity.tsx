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
