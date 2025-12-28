// ========================================
// Header Component - Top Navigation
// ========================================

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/UI/Button';
import { CopyButton } from '@/components/UI/CopyButton';
import { NetworkBadge } from '@/components/UI/NetworkBadge';
import { truncateAddress } from '@/utils/helpers';
import { motion } from 'framer-motion';

export function Header() {
  const { address, isConnected, isOwner, connect, disconnect, isConnecting } = useWallet();
  const pathname = usePathname();

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
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center animate-float">
                <span className="text-2xl font-bold text-white">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text font-heading">
                  TickSTX
                </h1>
                <p className="text-xs text-text-muted">Counter on Stacks</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === '/'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-text-muted hover:text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                Counter
              </Link>
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === '/dashboard'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-text-muted hover:text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                Dashboard
              </Link>
            </nav>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center gap-3">
            {/* Network Badge */}
            <div className="hidden md:block">
              <NetworkBadge network={process.env.NEXT_PUBLIC_NETWORK as 'mainnet' | 'testnet'} />
            </div>

            {/* Owner Badge */}
            {isConnected && isOwner && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-yellow-500/30 bg-yellow-500/10">
                <span className="text-sm text-yellow-400">👑 Owner</span>
              </div>
            )}

            {/* Wallet Button */}
            {isConnected && address ? (
              <div className="flex items-center gap-2">
                {/* Address Display with Copy Button */}
                <div className="hidden sm:flex items-center gap-2">
                  <div className="px-4 py-2 rounded-lg glass border border-cyan-500/30">
                    <p className="text-sm font-mono text-cyan-400">
                      {truncateAddress(address)}
                    </p>
                  </div>
                  <CopyButton text={address} label="" className="px-2" />
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
