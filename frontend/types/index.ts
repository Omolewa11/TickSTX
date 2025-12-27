// ========================================
// Type Definitions for TickSTX Frontend
// ========================================

import type { SessionTypes } from '@walletconnect/types';

/**
 * Network type for Stacks blockchain
 */
export type NetworkType = 'mainnet' | 'testnet' | 'devnet';

/**
 * Wallet connection state
 */
export interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: string;
  network: NetworkType;
  isOwner: boolean;
}

/**
 * Counter state from smart contract
 */
export interface CounterState {
  value: number | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Transaction status
 */
export type TransactionStatus =
  | 'idle'
  | 'pending'
  | 'broadcasting'
  | 'success'
  | 'failed'
  | 'cancelled';

/**
 * Transaction state
 */
export interface TransactionState {
  txId: string | null;
  status: TransactionStatus;
  error: string | null;
}

/**
 * Contract function names
 */
export type ContractFunction =
  | 'increment'
  | 'decrement'
  | 'increment-by'
  | 'decrement-by'
  | 'reset'
  | 'get-counter'
  | 'get-owner';

/**
 * Contract call result
 */
export interface ContractCallResult {
  success: boolean;
  txId?: string;
  error?: string;
  value?: number;
}

/**
 * Counter operation type
 */
export type CounterOperation = 'increment' | 'decrement' | 'increment-by' | 'decrement-by' | 'reset';

/**
 * Counter action with metadata
 */
export interface CounterAction {
  type: CounterOperation;
  amount: number;
  timestamp: Date;
  txId?: string;
}

/**
 * Button variant types
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost'
  | 'outline';

/**
 * Button size types
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Modal size types
 */
export type ModalSize = 'sm' | 'md' | 'lg';

/**
 * Toast notification types
 */
export type ToastType = 'success' | 'error' | 'info' | 'warning';

/**
 * Wallet provider types
 */
export type WalletProvider = 'hiro' | 'xverse' | 'leather';

/**
 * WalletConnect session data
 */
export interface WalletConnectSession extends SessionTypes.Struct {
  address?: string;
  publicKey?: string;
}

/**
 * Contract error codes (from smart contract)
 */
export enum ContractError {
  UNAUTHORIZED = 100,
  UNDERFLOW = 101,
  INSUFFICIENT_BALANCE = 102,
  TRANSFER_FAILED = 103,
  INVALID_AMOUNT = 104,
}

/**
 * Error messages mapping
 */
export interface ErrorMessages {
  [key: number]: string;
}

/**
 * App configuration
 */
export interface AppConfig {
  network: NetworkType;
  contractAddress: string;
  contractName: string;
  walletConnectProjectId: string;
  stacksApiUrl: string;
  explorerUrl: string;
  appName: string;
  appUrl: string;
}

/**
 * Counter statistics
 */
export interface CounterStats {
  totalOperations: number;
  lastAction?: CounterAction;
  owner: string;
}

/**
 * Component base props
 */
export interface BaseComponentProps {
  className?: string;
}

/**
 * Loading state
 */
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}
