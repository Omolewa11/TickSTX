// ========================================
// useContract Hook - Contract Interactions
// ========================================

'use client';

import { useState, useCallback } from 'react';
import {
  incrementCounter,
  decrementCounter,
  incrementBy as incrementByAmount,
  decrementBy as decrementByAmount,
  resetCounter as resetCounterContract,
} from '@/lib/contract';
import { useWallet } from '@/context/WalletContext';
import { toast } from '@/components/UI/Toast';
import { saveActivity } from '@/lib/activityTracker';
import type { TransactionState } from '@/types';

/**
 * Hook for interacting with the counter contract
 */
export function useContract() {
  const { address, isConnected } = useWallet();
  const [transaction, setTransaction] = useState<TransactionState>({
    txId: null,
    status: 'idle',
    error: null,
  });

  /**
   * Execute a contract function with error handling
   */
  const executeTransaction = useCallback(
    async (
      fn: () => Promise<{ txid: string; transaction: string }>,
      successMessage: string
    ) => {
      if (!isConnected || !address) {
        toast.error('Please connect your wallet first');
        return null;
      }

      setTransaction({ txId: null, status: 'pending', error: null });
      const toastId = toast.loading('Processing transaction...');

      try {
        const result = await fn();

        setTransaction({
          txId: result.txid,
          status: 'success',
          error: null,
        });

        toast.dismiss(toastId);
        toast.success(successMessage);

        return result;
      } catch (error) {
        console.error('Transaction failed:', error);

        const errorMessage =
          error instanceof Error ? error.message : 'Transaction failed';

        setTransaction({
          txId: null,
          status: 'failed',
          error: errorMessage,
        });

        toast.dismiss(toastId);
        toast.error(errorMessage);

        return null;
      }
    },
    [isConnected, address]
  );

  /**
   * Increment counter by 1
   */
  const increment = useCallback(async () => {
    const result = await executeTransaction(
      () => incrementCounter(),
      'Counter incremented! ⬆️'
    );

    if (result) {
      saveActivity('increment', 1, result.txid);
    }

    return result;
  }, [executeTransaction]);

  /**
   * Decrement counter by 1
   */
  const decrement = useCallback(async () => {
    const result = await executeTransaction(
      () => decrementCounter(),
      'Counter decremented! ⬇️'
    );

    if (result) {
      saveActivity('decrement', 1, result.txid);
    }

    return result;
  }, [executeTransaction]);

  /**
   * Increment counter by custom amount
   */
  const incrementBy = useCallback(
    async (amount: number) => {
      return executeTransaction(
        () => incrementByAmount(amount),
        `Counter increased by ${amount}! ⬆️`
      );
    },
    [executeTransaction]
  );

  /**
   * Decrement counter by custom amount
   */
  const decrementBy = useCallback(
    async (amount: number) => {
      return executeTransaction(
        () => decrementByAmount(amount),
        `Counter decreased by ${amount}! ⬇️`
      );
    },
    [executeTransaction]
  );

  /**
   * Reset counter to zero (owner only)
   */
  const resetCounter = useCallback(async () => {
    return executeTransaction(
      () => resetCounterContract(),
      'Counter reset to 0! 🔄'
    );
  }, [executeTransaction]);

  return {
    increment,
    decrement,
    incrementBy,
    decrementBy,
    resetCounter,
    transaction,
    isProcessing: transaction.status === 'pending',
  };
}
