// ========================================
// Type Definitions - TickSTX
// ========================================

export type Network = 'mainnet' | 'testnet';

export interface WalletInfo {
  address: string;
  publicKey: string;
  network: Network;
}

export interface ContractCallOptions {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: any[];
  network: Network;
}

export interface TransactionStatus {
  txId: string;
  status: 'pending' | 'success' | 'failed';
  message?: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type CardVariant = 'default' | 'cyber' | 'glass';

export type LoadingVariant = 'spinner' | 'dots' | 'pulse';

export type ToastType = 'success' | 'error' | 'info' | 'loading';
