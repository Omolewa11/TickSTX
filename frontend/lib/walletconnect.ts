// ========================================
// WalletConnect Integration for Stacks
// ========================================

import { SignClient } from '@walletconnect/sign-client';
import type { SignClientTypes, SessionTypes } from '@walletconnect/types';

/**
 * WalletConnect configuration for Stacks
 */
export const walletConnectConfig = {
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  metadata: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'TickSTX',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Counter Smart Contract on Stacks',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    icons: ['https://walletconnect.com/walletconnect-logo.png'],
  },
  // Stacks chains
  chains: ['stacks:1'], // mainnet
  optionalChains: ['stacks:2147483648'], // testnet
};

/**
 * WalletConnect client instance
 */
let signClient: SignClient | null = null;

/**
 * Current session
 */
let currentSession: SessionTypes.Struct | null = null;

/**
 * Initialize WalletConnect client
 */
export async function initWalletConnect(): Promise<SignClient> {
  if (signClient) return signClient;

  signClient = await SignClient.init({
    projectId: walletConnectConfig.projectId,
    metadata: walletConnectConfig.metadata,
  });

  return signClient;
}

/**
 * Connect wallet using WalletConnect
 */
export async function connectWallet(): Promise<{
  uri?: string;
  approval: () => Promise<SessionTypes.Struct>;
}> {
  const client = await initWalletConnect();

  const { uri, approval } = await client.connect({
    requiredNamespaces: {
      stacks: {
        methods: [
          'stx_getAddresses',
          'stx_callContract',
          'stx_signTransaction',
        ],
        chains: [
          `stacks:${process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? '1' : '2147483648'}`,
        ],
        events: ['accountsChanged', 'chainChanged'],
      },
    },
  });

  return { uri, approval };
}

/**
 * Get connected wallet addresses
 * Implements: stx_getAddresses
 */
export async function getAddresses(): Promise<string[]> {
  if (!signClient || !currentSession) {
    throw new Error('WalletConnect not connected');
  }

  const result = await signClient.request<{
    addresses: Array<{ symbol: string; address: string }>;
  }>({
    topic: currentSession.topic,
    chainId: `stacks:${process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? '1' : '2147483648'}`,
    request: {
      method: 'stx_getAddresses',
      params: {},
    },
  });

  // Filter for STX addresses
  return result.addresses
    .filter((addr) => addr.symbol === 'STX')
    .map((addr) => addr.address);
}

/**
 * Call a Stacks smart contract
 * Implements: stx_callContract
 */
export async function callContract(params: {
  contract: string;
  functionName: string;
  functionArgs: string[];
}): Promise<{ txid: string; transaction: string }> {
  if (!signClient || !currentSession) {
    throw new Error('WalletConnect not connected');
  }

  const result = await signClient.request<{ txid: string; transaction: string }>({
    topic: currentSession.topic,
    chainId: `stacks:${process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? '1' : '2147483648'}`,
    request: {
      method: 'stx_callContract',
      params,
    },
  });

  return result;
}

/**
 * Sign a Stacks transaction
 * Implements: stx_signTransaction
 */
export async function signTransaction(params: {
  transaction: string;
  broadcast?: boolean;
  network?: 'mainnet' | 'testnet' | 'devnet';
}): Promise<{
  signature: string;
  transaction: string;
  txid?: string;
}> {
  if (!signClient || !currentSession) {
    throw new Error('WalletConnect not connected');
  }

  const result = await signClient.request<{
    signature: string;
    transaction: string;
    txid?: string;
  }>({
    topic: currentSession.topic,
    chainId: `stacks:${process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? '1' : '2147483648'}`,
    request: {
      method: 'stx_signTransaction',
      params: {
        ...params,
        network: params.network || process.env.NEXT_PUBLIC_NETWORK || 'testnet',
      },
    },
  });

  return result;
}

/**
 * Transfer STX tokens
 * Implements: stx_transferStx
 */
export async function transferStx(params: {
  sender: string;
  recipient: string;
  amount: string;
  memo?: string;
  network?: 'mainnet' | 'testnet' | 'devnet';
}): Promise<{ txid: string; transaction: string }> {
  if (!signClient || !currentSession) {
    throw new Error('WalletConnect not connected');
  }

  const result = await signClient.request<{ txid: string; transaction: string }>({
    topic: currentSession.topic,
    chainId: `stacks:${process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? '1' : '2147483648'}`,
    request: {
      method: 'stx_transferStx',
      params: {
        ...params,
        network: params.network || process.env.NEXT_PUBLIC_NETWORK || 'testnet',
      },
    },
  });

  return result;
}

/**
 * Sign a message
 * Implements: stx_signMessage
 */
export async function signMessage(params: {
  address: string;
  message: string;
  messageType?: 'utf8' | 'structured';
  network?: 'mainnet' | 'testnet' | 'devnet';
  domain?: string;
}): Promise<{ signature: string }> {
  if (!signClient || !currentSession) {
    throw new Error('WalletConnect not connected');
  }

  const result = await signClient.request<{ signature: string }>({
    topic: currentSession.topic,
    chainId: `stacks:${process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? '1' : '2147483648'}`,
    request: {
      method: 'stx_signMessage',
      params: {
        ...params,
        messageType: params.messageType || 'utf8',
        network: params.network || process.env.NEXT_PUBLIC_NETWORK || 'testnet',
      },
    },
  });

  return result;
}

/**
 * Disconnect wallet
 */
export async function disconnectWallet(): Promise<void> {
  if (!signClient || !currentSession) return;

  await signClient.disconnect({
    topic: currentSession.topic,
    reason: {
      code: 6000,
      message: 'User disconnected',
    },
  });

  currentSession = null;
}

/**
 * Set current session
 */
export function setSession(session: SessionTypes.Struct): void {
  currentSession = session;
}

/**
 * Get current session
 */
export function getSession(): SessionTypes.Struct | null {
  return currentSession;
}

/**
 * Get sign client
 */
export function getSignClient(): SignClient | null {
  return signClient;
}
