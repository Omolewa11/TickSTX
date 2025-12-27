// ========================================
// Wallet Context - Global Wallet State
// ========================================

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  connectWallet as wcConnect,
  disconnectWallet as wcDisconnect,
  getAddresses,
  setSession,
  getSession,
} from '@/lib/walletconnect';
import { getContractOwner, isOwner } from '@/lib/contract';
import type { WalletState, NetworkType } from '@/types';
import { toast } from '@/components/UI/Toast';

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    balance: '0',
    network: (process.env.NEXT_PUBLIC_NETWORK as NetworkType) || 'mainnet',
    isOwner: false,
  });

  const [isConnecting, setIsConnecting] = useState(false);

  /**
   * Check if connected wallet is contract owner
   */
  const checkOwnership = useCallback(async (address: string) => {
    try {
      const ownerStatus = await isOwner(address);
      setWalletState((prev) => ({ ...prev, isOwner: ownerStatus }));
    } catch (error) {
      console.error('Error checking ownership:', error);
    }
  }, []);

  /**
   * Connect wallet using WalletConnect
   */
  const connect = useCallback(async () => {
    setIsConnecting(true);
    const toastId = toast.loading('Connecting wallet...');

    try {
      // Initialize WalletConnect connection
      const { uri, approval } = await wcConnect();

      // Show QR code or deep link
      if (uri) {
        console.log('WalletConnect URI:', uri);
        // In a real app, display QR code modal here
        toast.custom('Scan QR code with your wallet');
      }

      // Wait for user approval
      const session = await approval();

      // Store session
      setSession(session);

      // Get wallet addresses
      const addresses = await getAddresses();

      if (addresses.length === 0) {
        throw new Error('No addresses found');
      }

      const userAddress = addresses[0];

      // Update wallet state
      setWalletState({
        address: userAddress,
        isConnected: true,
        balance: '0', // TODO: Fetch actual balance
        network: (process.env.NEXT_PUBLIC_NETWORK as NetworkType) || 'mainnet',
        isOwner: false,
      });

      // Check ownership
      await checkOwnership(userAddress);

      toast.dismiss(toastId);
      toast.success('Wallet connected!');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.dismiss(toastId);
      toast.error('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, [checkOwnership]);

  /**
   * Disconnect wallet
   */
  const disconnect = useCallback(async () => {
    try {
      await wcDisconnect();

      setWalletState({
        address: null,
        isConnected: false,
        balance: '0',
        network: (process.env.NEXT_PUBLIC_NETWORK as NetworkType) || 'mainnet',
        isOwner: false,
      });

      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      toast.error('Failed to disconnect wallet');
    }
  }, []);

  /**
   * Restore session on mount
   */
  useEffect(() => {
    const session = getSession();

    if (session) {
      // Restore wallet state from stored session
      getAddresses()
        .then((addresses) => {
          if (addresses.length > 0) {
            const userAddress = addresses[0];
            setWalletState((prev) => ({
              ...prev,
              address: userAddress,
              isConnected: true,
            }));
            checkOwnership(userAddress);
          }
        })
        .catch((error) => {
          console.error('Failed to restore session:', error);
        });
    }
  }, [checkOwnership]);

  const value: WalletContextType = {
    ...walletState,
    connect,
    disconnect,
    isConnecting,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

/**
 * Hook to use wallet context
 */
export function useWallet() {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }

  return context;
}
