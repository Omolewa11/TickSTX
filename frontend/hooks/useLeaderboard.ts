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
