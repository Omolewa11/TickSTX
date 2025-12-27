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
