// ========================================
// Wallet Context - Global Wallet State (@stacks/connect)
// ========================================

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { isOwner } from '@/lib/contract';
import type { WalletState, NetworkType } from '@/utils/types';
import { toast } from '@/components/UI/Toast';

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  userSession: UserSession | null;
}

const WalletContext = createContext<WalletContextType | null>(null);

// App configuration for Stacks Connect
const appConfig = new AppConfig(['store_write', 'publish_data']);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [userSession] = useState(() => new UserSession({ appConfig }));

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
   * Update wallet state from user data
   */
  const updateWalletFromSession = useCallback(async () => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      const address = userData.profile.stxAddress.mainnet;

      setWalletState({
        address,
        isConnected: true,
        balance: '0',
        network: (process.env.NEXT_PUBLIC_NETWORK as NetworkType) || 'mainnet',
        isOwner: false,
      });

      await checkOwnership(address);
    }
  }, [userSession, checkOwnership]);

  /**
   * Connect wallet using @stacks/connect
   */
  const connect = useCallback(async () => {
    setIsConnecting(true);

    try {
      showConnect({
        appDetails: {
          name: 'TickSTX',
          icon: typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '/logo.png',
        },
        redirectTo: '/',
        onFinish: async () => {
          await updateWalletFromSession();
          toast.success('Wallet connected!');
          setIsConnecting(false);
        },
        onCancel: () => {
          toast.info('Connection cancelled');
          setIsConnecting(false);
        },
        userSession,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet');
      setIsConnecting(false);
    }
  }, [userSession, updateWalletFromSession]);

  /**
   * Disconnect wallet
   */
  const disconnect = useCallback(async () => {
    try {
      userSession.signUserOut();

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
  }, [userSession]);

  /**
   * Restore session on mount
   */
  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      updateWalletFromSession();
    }
  }, [userSession, updateWalletFromSession]);

  const value: WalletContextType = {
    ...walletState,
    connect,
    disconnect,
    isConnecting,
    userSession,
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
