// ========================================
// Reusable Card Component
// ========================================

import React from 'react';
import { cn } from '@/utils/helpers';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'cyber';
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Container card component with cyber styling
 */
export function Card({
  children,
  variant = 'cyber',
  hoverable = false,
  className,
  onClick,
}: CardProps) {
  const baseStyles = 'rounded-2xl transition-all duration-300';

  const variantStyles = {
    default: 'bg-bg-card backdrop-blur-lg p-6',
    bordered: 'bg-bg-card backdrop-blur-lg border border-border-default p-6',
    elevated: 'bg-bg-card backdrop-blur-lg shadow-2xl p-6',
    cyber: 'card-cyber', // Uses custom CSS class from globals.css
  };

  const hoverStyles = hoverable
    ? 'cursor-pointer hover:scale-105 hover:shadow-glow-cyan'
    : '';

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        hoverStyles,
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
