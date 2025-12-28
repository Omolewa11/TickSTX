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

  /**
   * Fetch current counter value from contract
   */
  const fetchCounterValue = useCallback(async () => {
    try {
      const value = await getCounterValue();
      setStats((prev) => ({ ...prev, currentValue: value, isLoading: false, error: null }));
    } catch (error) {
      console.error('Failed to fetch counter value:', error);
      setStats((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch counter value',
      }));
    }
  }, []);

  /**
   * Calculate statistics from activities
   */
  const calculateStats = useCallback(() => {
    const activities = loadActivities();
    const totalIncrements = activities.filter((a) => a.type === 'increment').length;
    const totalDecrements = activities.filter((a) => a.type === 'decrement').length;
    const totalOperations = activities.length;

    setStats((prev) => ({
      ...prev,
      recentActivities: activities,
      totalOperations,
      totalIncrements,
      totalDecrements,
    }));
  }, [loadActivities]);

  /**
   * Refresh all stats
   */
  const refresh = useCallback(async () => {
    setStats((prev) => ({ ...prev, isLoading: true }));
    await fetchCounterValue();
    calculateStats();
  }, [fetchCounterValue, calculateStats]);

  /**
   * Clear all statistics
   */
  const clearStats = useCallback(() => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(STORAGE_KEY);
    setStats({
      currentValue: 0,
      totalOperations: 0,
      totalIncrements: 0,
      totalDecrements: 0,
      recentActivities: [],
      isLoading: false,
      error: null,
    });
  }, []);

  // Initial load
  useEffect(() => {
    fetchCounterValue();
    calculateStats();
  }, [fetchCounterValue, calculateStats]);

  // Auto-refresh counter value every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCounterValue();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [fetchCounterValue]);

  return {
    ...stats,
    refresh,
    saveActivity,
    clearStats,
  };
}

/**
 * Hook to track a transaction
 * Call this after a successful transaction to log it
 */
export function useTrackActivity() {
  const { saveActivity } = useStats();
  return saveActivity;
}
