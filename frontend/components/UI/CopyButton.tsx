// ========================================
// CopyButton Component - Copy to Clipboard
// ========================================

'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/utils/helpers';
import { toast } from './Toast';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label = 'Copy', className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);

    if (success) {
      setCopied(true);
      toast.success('Copied to clipboard!');

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } else {
      toast.error('Failed to copy');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5
        rounded-lg border border-cyan-500/30
        bg-cyan-500/10 hover:bg-cyan-500/20
        text-cyan-400 hover:text-cyan-300
        transition-all duration-200
        text-sm font-medium
        ${className}
      `}
      title={label}
    >
      {copied ? (
        <>
          <CheckIcon className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <CopyIcon className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
