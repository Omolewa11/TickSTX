// ========================================
// NetworkBadge Component - Network Indicator
// ========================================

'use client';

import React from 'react';
import type { NetworkType } from '@/utils/types';

interface NetworkBadgeProps {
  network: NetworkType;
  className?: string;
}

export function NetworkBadge({ network, className = '' }: NetworkBadgeProps) {
  const isMainnet = network === 'mainnet';

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-1.5
        rounded-lg border
        text-sm font-medium
        ${
          isMainnet
            ? 'border-green-500/30 bg-green-500/10 text-green-400'
            : 'border-orange-500/30 bg-orange-500/10 text-orange-400'
        }
        ${className}
      `}
    >
      {/* Pulsing Dot Indicator */}
      <span className="relative flex h-2 w-2">
        <span
          className={`
            animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
            ${isMainnet ? 'bg-green-400' : 'bg-orange-400'}
          `}
        />
        <span
          className={`
            relative inline-flex rounded-full h-2 w-2
            ${isMainnet ? 'bg-green-500' : 'bg-orange-500'}
          `}
        />
      </span>

      {/* Network Name */}
      <span className="capitalize">{network}</span>
    </div>
  );
}

// Alternative: Compact version without label
export function NetworkDot({ network, className = '' }: NetworkBadgeProps) {
  const isMainnet = network === 'mainnet';

  return (
    <span
      className={`relative flex h-2 w-2 ${className}`}
      title={`Connected to ${network}`}
    >
      <span
        className={`
          animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
          ${isMainnet ? 'bg-green-400' : 'bg-orange-400'}
        `}
      />
      <span
        className={`
          relative inline-flex rounded-full h-2 w-2
          ${isMainnet ? 'bg-green-500' : 'bg-orange-500'}
        `}
      />
    </span>
  );
}
