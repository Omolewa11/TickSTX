// ========================================
// Utility Helper Functions
// ========================================

import { CONTRACT_ERROR_MESSAGES } from './constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncate Stacks address for display
 * @param address - Full Stacks address
 * @param prefixLength - Number of characters to show at start (default: 4)
 * @param suffixLength - Number of characters to show at end (default: 4)
 * @returns Truncated address (e.g., "SP1X...ABC")
 */
export function truncateAddress(
  address: string,
  prefixLength: number = 4,
  suffixLength: number = 4
): string {
  if (!address) return '';
  if (address.length <= prefixLength + suffixLength) return address;

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);

  return `${prefix}...${suffix}`;
}

/**
 * Format number with commas for thousands
 * @param num - Number to format
 * @returns Formatted string (e.g., "1,234,567")
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Format STX amount (microSTX to STX)
 * @param microStx - Amount in microSTX
 * @returns Formatted STX amount (e.g., "1.5 STX")
 */
export function formatStx(microStx: number): string {
  const stx = microStx / 1_000_000;
  return `${stx.toFixed(6)} STX`;
}

/**
 * Convert STX to microSTX
 * @param stx - Amount in STX
 * @returns Amount in microSTX
 */
export function stxToMicroStx(stx: number): number {
  return Math.floor(stx * 1_000_000);
}

/**
 * Format relative time (e.g., "2 minutes ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
}

/**
 * Format date and time
 * @param date - Date to format
 * @returns Formatted date string (e.g., "Jan 15, 2024 at 3:30 PM")
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

/**
 * Get error message from contract error code
 * @param errorCode - Contract error code
 * @returns Human-readable error message
 */
export function getContractErrorMessage(errorCode: number): string {
  return CONTRACT_ERROR_MESSAGES[errorCode] || `Unknown error (code: ${errorCode})`;
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Debounce function calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Sleep/delay function
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if address is valid Stacks address
 * @param address - Address to validate
 * @returns True if valid Stacks address
 */
export function isValidStacksAddress(address: string): boolean {
  // Stacks addresses start with SP (mainnet) or ST (testnet)
  // and are 40-42 characters long
  const regex = /^(SP|ST)[0-9A-Z]{38,40}$/;
  return regex.test(address);
}

/**
 * Get network from address prefix
 * @param address - Stacks address
 * @returns Network type ('mainnet' or 'testnet')
 */
export function getNetworkFromAddress(address: string): 'mainnet' | 'testnet' {
  return address.startsWith('SP') ? 'mainnet' : 'testnet';
}

/**
 * Format counter value with animation
 * @param value - Counter value
 * @returns Formatted counter string
 */
export function formatCounterValue(value: number): string {
  return formatNumber(value);
}

/**
 * Generate random ID
 * @returns Random ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Check if running in browser
 * @returns True if in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get base URL
 * @returns Base URL for the app
 */
export function getBaseUrl(): string {
  if (!isBrowser()) return 'http://localhost:3000';
  return window.location.origin;
}

/**
 * Parse error message from various error types
 * @param error - Error object or message
 * @returns Parsed error message
 */
export function parseErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String(error.message);
  }
  return 'An unknown error occurred';
}
