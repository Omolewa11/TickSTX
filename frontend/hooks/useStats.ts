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


export function useStats() {
  const [stats, setStats] = useState<Stats>({
    currentValue: 0,
    totalOperations: 0,
    totalIncrements: 0,
    totalDecrements: 0,
    recentActivities: [],
    isLoading: true,
    error: null,
  });

  /**
   * Load activities from localStorage
   */
  const loadActivities = useCallback((): Activity[] => {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      // Convert timestamp strings back to Date objects
      return parsed.map((activity: Activity) => ({
        ...activity,
        timestamp: new Date(activity.timestamp),
      }));
    } catch (error) {
      console.error('Failed to load activities:', error);
      return [];
    }
  }, []);

  /**
   * Save activity to localStorage
   */
  const saveActivity = useCallback((activity: Omit<Activity, 'id' | 'timestamp'>) => {
    if (typeof window === 'undefined') return;

    try {
      const activities = loadActivities();
      const newActivity: Activity = {
        ...activity,
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date(),
      };

      // Add to beginning and limit to MAX_ACTIVITIES
      const updated = [newActivity, ...activities].slice(0, MAX_ACTIVITIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Update stats
      setStats((prev) => ({
        ...prev,
        recentActivities: updated,
        totalOperations: prev.totalOperations + 1,
        totalIncrements:
          activity.type === 'increment'
            ? prev.totalIncrements + 1
            : prev.totalIncrements,
        totalDecrements:
          activity.type === 'decrement'
            ? prev.totalDecrements + 1
            : prev.totalDecrements,
      }));
    } catch (error) {
      console.error('Failed to save activity:', error);
    }
  }, [loadActivities]);
