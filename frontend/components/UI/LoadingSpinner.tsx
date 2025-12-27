// ========================================
// Loading Spinner Component
// ========================================

import React from 'react';
import { cn } from '@/utils/helpers';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  color?: string;
  className?: string;
}

/**
 * Loading indicator component with multiple variants
 */
export function LoadingSpinner({
  size = 'md',
  variant = 'spinner',
  color = 'neon-cyan',
  className,
}: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  if (variant === 'spinner') {
    return (
      <div
        className={cn(
          'spinner',
          sizeStyles[size],
          `border-${color}`,
          className
        )}
        role="status"
        aria-label="Loading"
      />
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex gap-1', className)} role="status" aria-label="Loading">
        <div className={cn('w-2 h-2 rounded-full bg-neon-cyan animate-bounce', `bg-${color}`)} style={{ animationDelay: '0ms' }} />
        <div className={cn('w-2 h-2 rounded-full bg-neon-cyan animate-bounce', `bg-${color}`)} style={{ animationDelay: '150ms' }} />
        <div className={cn('w-2 h-2 rounded-full bg-neon-cyan animate-bounce', `bg-${color}`)} style={{ animationDelay: '300ms' }} />
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div
        className={cn(
          'rounded-full bg-neon-cyan animate-pulse',
          sizeStyles[size],
          `bg-${color}`,
          className
        )}
        role="status"
        aria-label="Loading"
      />
    );
  }

  return null;
}
