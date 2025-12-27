// ========================================
// Reusable Button Component
// ========================================

import React from 'react';
import { cn } from '@/utils/helpers';
import type { ButtonVariant, ButtonSize } from '@/types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable Button component with variants and loading states
 */
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'btn font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'btn-primary text-white',
    secondary: 'btn-secondary',
    danger: 'btn-danger text-white',
    ghost: 'bg-transparent hover:bg-bg-secondary text-text-primary border border-transparent hover:border-neon-cyan',
    outline: 'bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:bg-opacity-10',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="spinner w-4 h-4" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
