// ========================================
// Header Component - Top Navigation
// ========================================

'use client';

import React from 'react';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/UI/Button';
import { truncateAddress } from '@/utils/helpers';
import { motion } from 'framer-motion';

export function Header() {
  const { address, isConnected, isOwner, connect, disconnect, isConnecting } = useWallet();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="sticky top-0 z-50 backdrop-blur-md bg-bg-primary bg-opacity-80 border-b border-border-default"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center animate-float">
              <span className="text-2xl font-bold text-white">⚡</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text font-heading">
                TickSTX
              </h1>
              <p className="text-xs text-text-muted">Counter on Stacks</p>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            {/* Network Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-neon-cyan border-opacity-30">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-sm text-text-secondary capitalize">
                {process.env.NEXT_PUBLIC_NETWORK}
              </span>
            </div>

            {/* Owner Badge */}
            {isConnected && isOwner && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-neon-yellow border-opacity-30">
                <span className="text-sm text-neon-yellow">👑 Owner</span>
              </div>
            )}

            {/* Wallet Button */}
            {isConnected && address ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:block px-4 py-2 rounded-lg glass border border-neon-cyan border-opacity-30">
                  <p className="text-sm font-mono text-neon-cyan">
                    {truncateAddress(address)}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={disconnect}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={connect}
                isLoading={isConnecting}
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
