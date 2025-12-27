// ========================================
// Footer Component - Bottom Footer
// ========================================

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { truncateAddress, copyToClipboard } from '@/utils/helpers';
import { toast } from '@/components/UI/Toast';
import { EXTERNAL_LINKS } from '@/utils/constants';

export function Footer() {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
  const contractName = process.env.NEXT_PUBLIC_CONTRACT_NAME || '';
  const explorerUrl = process.env.NEXT_PUBLIC_EXPLORER_URL || '';
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    const fullContract = `${contractAddress}.${contractName}`;
    const success = await copyToClipboard(fullContract);

    if (success) {
      setCopied(true);
      toast.success('Contract address copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
      className="mt-auto border-t border-border-default backdrop-blur-md bg-bg-primary bg-opacity-80"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contract Info */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">
              Contract
            </h3>
            <button
              onClick={handleCopyAddress}
              className="group flex items-center gap-2 px-3 py-2 rounded-lg glass border border-neon-cyan border-opacity-20 hover:border-opacity-50 transition-all"
            >
              <span className="text-xs font-mono text-text-secondary group-hover:text-neon-cyan transition-colors">
                {truncateAddress(contractAddress, 6, 6)}
              </span>
              <svg
                className="w-4 h-4 text-text-muted group-hover:text-neon-cyan transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {copied ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                )}
              </svg>
            </button>
            <a
              href={`${explorerUrl}/txid/${contractAddress}.${contractName}?chain=${process.env.NEXT_PUBLIC_NETWORK}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-xs text-neon-cyan hover:text-neon-purple transition-colors"
            >
              View on Explorer
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={EXTERNAL_LINKS.DOCS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-neon-cyan transition-colors"
                >
                  Stacks Docs
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.STACKS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-neon-cyan transition-colors"
                >
                  Stacks.co
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.DISCORD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-neon-cyan transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Built With */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">
              Built With
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                  <span className="text-xs">S</span>
                </div>
                <span className="text-sm text-text-secondary">Stacks Blockchain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
                  <span className="text-xs">W</span>
                </div>
                <span className="text-sm text-text-secondary">WalletConnect</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-neon-pink to-neon-cyan flex items-center justify-center">
                  <span className="text-xs">N</span>
                </div>
                <span className="text-sm text-text-secondary">Next.js</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border-default text-center">
          <p className="text-sm text-text-muted">
            © 2025 TickSTX. Built with ⚡ on Stacks
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
