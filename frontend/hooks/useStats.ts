// ========================================
// useStats Hook - Dashboard Statistics
// ========================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getCounterValue } from '@/lib/contract';

// Types for statistics
interface Activity {
  id: string;
  type: 'increment' | 'decrement' | 'reset';
  amount: number;
  timestamp: Date;
  txId?: string;
}

interface Stats {
  currentValue: number;
  totalOperations: number;
  totalIncrements: number;
  totalDecrements: number;
  recentActivities: Activity[];
  isLoading: boolean;
  error: string | null;
}

const STORAGE_KEY = 'tickstx_stats';
const MAX_ACTIVITIES = 20;

/**
 * Custom hook for dashboard statistics
 * Fetches counter value and tracks activity in localStorage
 */

