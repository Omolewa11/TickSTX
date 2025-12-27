// ========================================
// App-Wide Constants
// ========================================

import type { ErrorMessages } from '@/types';

/**
 * Contract error code to message mapping
 */
export const CONTRACT_ERROR_MESSAGES: ErrorMessages = {
  100: 'Unauthorized: Only the contract owner can perform this action',
  101: 'Counter underflow: Cannot decrement below zero',
  102: 'Insufficient balance: Not enough STX to complete transaction',
  103: 'Transfer failed: STX transfer unsuccessful',
  104: 'Invalid amount: Amount must be greater than zero',
};

/**
 * Default values
 */
export const DEFAULTS = {
  COUNTER_VALUE: 0,
  TOAST_DURATION: 5000, // 5 seconds
  POLL_INTERVAL: 10000, // 10 seconds for counter refresh
  TRANSACTION_TIMEOUT: 300000, // 5 minutes
} as const;

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  COUNTER_PULSE: 400,
} as const;

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

/**
 * Z-index layers
 */
export const Z_INDEX = {
  BACKGROUND: -1,
  NORMAL: 0,
  DROPDOWN: 10,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  TOAST: 100,
} as const;

/**
 * Stacks blockchain explorer URLs
 */
export const EXPLORER_URLS = {
  MAINNET: 'https://explorer.stacks.co',
  TESTNET: 'https://explorer.stacks.co/?chain=testnet',
} as const;

/**
 * Stacks API URLs
 */
export const API_URLS = {
  MAINNET: 'https://api.mainnet.hiro.so',
  TESTNET: 'https://api.testnet.hiro.so',
} as const;

/**
 * WalletConnect metadata
 */
export const WALLET_CONNECT_METADATA = {
  NAME: 'TickSTX',
  DESCRIPTION: 'Counter Smart Contract on Stacks',
  URL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  ICONS: ['https://walletconnect.com/walletconnect-logo.png'],
} as const;

/**
 * Supported wallet providers
 */
export const SUPPORTED_WALLETS = [
  {
    id: 'hiro' as const,
    name: 'Hiro Wallet',
    description: 'Connect with Hiro Wallet',
    icon: '🔷',
  },
  {
    id: 'xverse' as const,
    name: 'Xverse Wallet',
    description: 'Connect with Xverse',
    icon: '⭐',
  },
  {
    id: 'leather' as const,
    name: 'Leather Wallet',
    description: 'Connect with Leather',
    icon: '🔶',
  },
] as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  WALLET_SESSION: 'tickstx_wallet_session',
  THEME_PREFERENCE: 'tickstx_theme',
  COUNTER_HISTORY: 'tickstx_counter_history',
} as const;

/**
 * Route paths
 */
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/',
} as const;

/**
 * External links
 */
export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com/yourusername/TickSTX',
  DOCS: 'https://docs.stacks.co',
  STACKS: 'https://www.stacks.co',
  DISCORD: 'https://discord.gg/stacks',
} as const;
