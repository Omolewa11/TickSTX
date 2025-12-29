// ========================================
// useLeaderboard Hook - Fetch Blockchain Transaction Data
// ========================================

'use client';

import { useState, useEffect, useCallback } from 'react';

// Types
export interface LeaderboardEntry {
  address: string;
  operations: number;
  increments: number;
  decrements: number;
  netContribution: number;
  rank: number;
}

export type LeaderboardCategory = 'all' | 'incrementers' | 'decrementers' | 'active';

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
  block_time?: number;
  block_time_iso?: string;
}

interface LeaderboardState {
  entries: LeaderboardEntry[];
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
 * Fetch transactions for the contract
 */
async function fetchContractTransactions(limit = 200): Promise<Transaction[]> {
  const { fullContractId } = getContractInfo();
  const apiUrl = getStacksApiUrl();

  try {
    // Fetch transactions for the contract
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
 * Parse transactions and calculate user statistics
 */
function calculateUserStats(transactions: Transaction[]): Map<string, LeaderboardEntry> {
  const { fullContractId } = getContractInfo();
  const userStats = new Map<string, LeaderboardEntry>();

  // Filter for successful contract calls to our contract
  const relevantTxs = transactions.filter(
    (tx) =>
      tx.tx_status === 'success' &&
      tx.tx_type === 'contract_call' &&
      tx.contract_call?.contract_id === fullContractId
  );

  // Process each transaction
  for (const tx of relevantTxs) {
    const address = tx.sender_address;
    const functionName = tx.contract_call?.function_name;

    if (!functionName) continue;

    // Get or create user entry
    let userEntry = userStats.get(address);
    if (!userEntry) {
      userEntry = {
        address,
        operations: 0,
        increments: 0,
        decrements: 0,
        netContribution: 0,
        rank: 0,
      };
      userStats.set(address, userEntry);
    }

    // Update stats based on function called
    userEntry.operations += 1;

    switch (functionName) {
      case 'increment':
        userEntry.increments += 1;
        userEntry.netContribution += 1;
        break;

      case 'decrement':
        userEntry.decrements += 1;
        userEntry.netContribution -= 1;
        break;

      case 'increment-by': {
        // Try to parse the amount from function args
        const args = tx.contract_call?.function_args;
        const amount = args && args.length > 0 ? parseInt(args[0].repr.replace('u', '')) : 1;
        userEntry.increments += amount;
        userEntry.netContribution += amount;
        break;
      }

      case 'decrement-by': {
        // Try to parse the amount from function args
        const args = tx.contract_call?.function_args;
        const amount = args && args.length > 0 ? parseInt(args[0].repr.replace('u', '')) : 1;
        userEntry.decrements += amount;
        userEntry.netContribution -= amount;
        break;
      }

      case 'reset':
        // Reset doesn't contribute to increment/decrement counts
        // But it does count as an operation
        break;
    }
  }

  return userStats;
}
