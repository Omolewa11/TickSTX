// ========================================
// useUserProfile Hook - Fetch Individual User Data
// ========================================

'use client';

import { useState, useEffect, useCallback } from 'react';

// Types
export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: Date;
}

export interface UserTransaction {
  txId: string;
  type: 'increment' | 'decrement' | 'increment-by' | 'decrement-by' | 'reset';
  amount: number;
  timestamp: Date;
  blockHeight: number;
}

export interface UserProfile {
  address: string;
  rank: number;
  totalOperations: number;
  increments: number;
  decrements: number;
  netContribution: number;
  firstSeen: Date | null;
  lastActive: Date | null;
  achievements: Achievement[];
  recentTransactions: UserTransaction[];
}

interface Transaction {
  tx_id: string;
  sender_address: string;
  tx_status: string;
  tx_type: string;
  contract_call?: {
    contract_id: string;
    function_name: string;
    function_args?: Array<{ hex: string; repr: string; name: string; type: string }>;
  };
  block_height?: number;
  block_time?: number;
  burn_block_time?: number;
  burn_block_time_iso?: string;
}

interface UserProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Get the Stacks API base URL based on network
 */
function getStacksApiUrl(): string {
  const network = process.env.NEXT_PUBLIC_NETWORK || 'mainnet';
  return network === 'mainnet'
    ? 'https://api.mainnet.hiro.so'
    : 'https://api.testnet.hiro.so';
}

/**
 * Get contract info from environment
 */
function getContractInfo() {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const contractName = process.env.NEXT_PUBLIC_CONTRACT_NAME;

  if (!contractAddress || !contractName) {
    throw new Error('Contract address or name not configured');
  }

  return {
    contractAddress,
    contractName,
    fullContractId: `${contractAddress}.${contractName}`,
  };
}

/**
 * Fetch all contract transactions
 */
async function fetchContractTransactions(limit = 200): Promise<Transaction[]> {
  const { fullContractId } = getContractInfo();
  const apiUrl = getStacksApiUrl();

  try {
    const url = `${apiUrl}/extended/v1/address/${fullContractId.split('.')[0]}/transactions?limit=${limit}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching contract transactions:', error);
    throw error;
  }
}

/**
 * Calculate user statistics from transactions
 */
function calculateUserStats(
  userAddress: string,
  allTransactions: Transaction[]
): {
  operations: number;
  increments: number;
  decrements: number;
  netContribution: number;
  userTransactions: UserTransaction[];
  firstSeen: Date | null;
  lastActive: Date | null;
} {
  const { fullContractId } = getContractInfo();

  // Filter for user's successful contract calls
  const userTxs = allTransactions.filter(
    (tx) =>
      tx.tx_status === 'success' &&
      tx.tx_type === 'contract_call' &&
      tx.contract_call?.contract_id === fullContractId &&
      tx.sender_address.toLowerCase() === userAddress.toLowerCase()
  );

  let operations = 0;
  let increments = 0;
  let decrements = 0;
  let netContribution = 0;
  const userTransactions: UserTransaction[] = [];

  // Process each transaction
  for (const tx of userTxs) {
    const functionName = tx.contract_call?.function_name;
    if (!functionName) continue;

    operations += 1;

    let amount = 1;
    const args = tx.contract_call?.function_args;
    if (args && args.length > 0 && (functionName === 'increment-by' || functionName === 'decrement-by')) {
      amount = parseInt(args[0].repr.replace('u', '')) || 1;
    }

    const timestamp = tx.burn_block_time
      ? new Date(tx.burn_block_time * 1000)
      : new Date();

    // Update stats based on function
    switch (functionName) {
      case 'increment':
        increments += 1;
        netContribution += 1;
        userTransactions.push({
          txId: tx.tx_id,
          type: 'increment',
          amount: 1,
          timestamp,
          blockHeight: tx.block_height || 0,
        });
        break;

      case 'decrement':
        decrements += 1;
        netContribution -= 1;
        userTransactions.push({
          txId: tx.tx_id,
          type: 'decrement',
          amount: 1,
          timestamp,
          blockHeight: tx.block_height || 0,
        });
        break;

      case 'increment-by':
        increments += amount;
        netContribution += amount;
        userTransactions.push({
          txId: tx.tx_id,
          type: 'increment-by',
          amount,
          timestamp,
          blockHeight: tx.block_height || 0,
        });
        break;

      case 'decrement-by':
        decrements += amount;
        netContribution -= amount;
        userTransactions.push({
          txId: tx.tx_id,
          type: 'decrement-by',
          amount,
          timestamp,
          blockHeight: tx.block_height || 0,
        });
        break;

      case 'reset':
        userTransactions.push({
          txId: tx.tx_id,
          type: 'reset',
          amount: 0,
          timestamp,
          blockHeight: tx.block_height || 0,
        });
        break;
    }
  }

  // Sort transactions by timestamp (newest first)
  userTransactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // Get first and last activity dates
  const timestamps = userTransactions.map((tx) => tx.timestamp);
  const firstSeen = timestamps.length > 0 ? new Date(Math.min(...timestamps.map(d => d.getTime()))) : null;
  const lastActive = timestamps.length > 0 ? new Date(Math.max(...timestamps.map(d => d.getTime()))) : null;

  return {
    operations,
    increments,
    decrements,
    netContribution,
    userTransactions,
    firstSeen,
    lastActive,
  };
}

/**
 * Calculate user rank based on all users
 */
function calculateUserRank(
  userAddress: string,
  allTransactions: Transaction[]
): number {
  const { fullContractId } = getContractInfo();

  // Calculate stats for all users
  const userStatsMap = new Map<string, { netContribution: number; operations: number }>();

  const relevantTxs = allTransactions.filter(
    (tx) =>
      tx.tx_status === 'success' &&
      tx.tx_type === 'contract_call' &&
      tx.contract_call?.contract_id === fullContractId
  );

  for (const tx of relevantTxs) {
    const address = tx.sender_address;
    const functionName = tx.contract_call?.function_name;
    if (!functionName) continue;

    let stats = userStatsMap.get(address);
    if (!stats) {
      stats = { netContribution: 0, operations: 0 };
      userStatsMap.set(address, stats);
    }

    stats.operations += 1;

    let amount = 1;
    const args = tx.contract_call?.function_args;
    if (args && args.length > 0 && (functionName === 'increment-by' || functionName === 'decrement-by')) {
      amount = parseInt(args[0].repr.replace('u', '')) || 1;
    }

    switch (functionName) {
      case 'increment':
      case 'increment-by':
        stats.netContribution += amount;
        break;
      case 'decrement':
      case 'decrement-by':
        stats.netContribution -= amount;
        break;
    }
  }

  // Sort users by net contribution (descending), then by operations
  const sortedUsers = Array.from(userStatsMap.entries()).sort((a, b) => {
    if (b[1].netContribution !== a[1].netContribution) {
      return b[1].netContribution - a[1].netContribution;
    }
    return b[1].operations - a[1].operations;
  });

  // Find user's rank
  const rank = sortedUsers.findIndex(
    ([address]) => address.toLowerCase() === userAddress.toLowerCase()
  );

  return rank !== -1 ? rank + 1 : 0;
}

/**
 * Calculate achievements based on user stats
 */
function calculateAchievements(stats: {
  operations: number;
  increments: number;
  decrements: number;
  netContribution: number;
  firstSeen: Date | null;
  lastActive: Date | null;
}): Achievement[] {
  const achievements: Achievement[] = [];

  // First transaction
  if (stats.operations >= 1) {
    achievements.push({
      id: 'first-tx',
      name: 'First Steps',
      icon: '🎯',
      description: 'Made your first transaction',
      unlockedAt: stats.firstSeen || undefined,
    });
  }

  // Milestones
  if (stats.operations >= 10) {
    achievements.push({
      id: '10-ops',
      name: 'Getting Started',
      icon: '⭐',
      description: 'Completed 10 operations',
    });
  }

  if (stats.operations >= 50) {
    achievements.push({
      id: '50-ops',
      name: 'Active User',
      icon: '🌟',
      description: 'Completed 50 operations',
    });
  }

  if (stats.operations >= 100) {
    achievements.push({
      id: '100-ops',
      name: 'Power User',
      icon: '💫',
      description: 'Completed 100 operations',
    });
  }

  // Incrementer
  if (stats.increments > stats.decrements && stats.increments >= 5) {
    achievements.push({
      id: 'incrementer',
      name: 'Incrementer',
      icon: '⬆️',
      description: 'More increments than decrements',
    });
  }

  // Decrementer
  if (stats.decrements > stats.increments && stats.decrements >= 5) {
    achievements.push({
      id: 'decrementer',
      name: 'Decrementer',
      icon: '⬇️',
      description: 'More decrements than increments',
    });
  }

  // Balanced
  if (stats.operations >= 20 && Math.abs(stats.netContribution) <= 5) {
    achievements.push({
      id: 'balanced',
      name: 'Balanced',
      icon: '⚖️',
      description: 'Keeping things balanced',
    });
  }

  // High Impact
  if (Math.abs(stats.netContribution) >= 50) {
    achievements.push({
      id: 'high-impact',
      name: 'High Impact',
      icon: '💥',
      description: 'Made a significant contribution',
    });
  }

  return achievements;
}

/**
 * Custom hook for user profile data
 */
export function useUserProfile(address: string) {
  const [state, setState] = useState<UserProfileState>({
    profile: null,
    isLoading: true,
    error: null,
  });

  const fetchUserProfile = useCallback(async () => {
    if (!address) {
      setState({
        profile: null,
        isLoading: false,
        error: 'No address provided',
      });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Fetch all contract transactions
      const allTransactions = await fetchContractTransactions();

      // Calculate user stats
      const stats = calculateUserStats(address, allTransactions);

      // Calculate user rank
      const rank = calculateUserRank(address, allTransactions);

      // Calculate achievements
      const achievements = calculateAchievements(stats);

      // Build profile
      const profile: UserProfile = {
        address,
        rank,
        totalOperations: stats.operations,
        increments: stats.increments,
        decrements: stats.decrements,
        netContribution: stats.netContribution,
        firstSeen: stats.firstSeen,
        lastActive: stats.lastActive,
        achievements,
        recentTransactions: stats.userTransactions.slice(0, 10), // Last 10 transactions
      };

      setState({
        profile,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setState({
        profile: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch user profile',
      });
    }
  }, [address]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const refresh = useCallback(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return {
    profile: state.profile,
    isLoading: state.isLoading,
    error: state.error,
    refresh,
  };
}
