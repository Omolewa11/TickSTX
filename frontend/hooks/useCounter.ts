// ========================================
// useCounter Hook - Counter State Management
// ========================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getCounterValue } from '@/lib/contract';
import type { CounterState } from '@/types';
import { DEFAULTS } from '@/utils/constants';

/**
 * Hook for fetching and managing counter state
 */
export function useCounter() {
  const [counterState, setCounterState] = useState<CounterState>({
    value: null,
    isLoading: true,
    error: null,
  });

  /**
   * Fetch counter value from contract
   */
  const fetchCounter = useCallback(async () => {
    setCounterState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const value = await getCounterValue();

      setCounterState({
        value,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching counter:', error);

      setCounterState({
        value: null,
        isLoading: false,
        error: 'Failed to fetch counter value',
      });
    }
  }, []);

  /**
   * Refresh counter value
   */
  const refresh = useCallback(() => {
    fetchCounter();
  }, [fetchCounter]);

  /**
   * Fetch counter on mount and set up polling
   */
  useEffect(() => {
    // Initial fetch
    fetchCounter();

    // Poll for updates every 10 seconds
    const interval = setInterval(() => {
      fetchCounter();
    }, DEFAULTS.POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchCounter]);

  return {
    ...counterState,
    refresh,
  };
}
