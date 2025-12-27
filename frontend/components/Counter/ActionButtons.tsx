// ========================================
// Action Buttons - Counter Control Buttons
// ========================================

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import { IncrementByModal } from './IncrementByModal';
import { useWallet } from '@/context/WalletContext';
import { useContract } from '@/hooks/useContract';

type ModalMode = 'increment' | 'decrement' | null;

export function ActionButtons() {
  const { isConnected, isOwner } = useWallet();
  const { increment, decrement, incrementBy, decrementBy, resetCounter, isProcessing } = useContract();
  const [modalMode, setModalMode] = useState<ModalMode>(null);

  const handleIncrementBy = async (amount: number) => {
    await incrementBy(amount);
    setModalMode(null);
  };

  const handleDecrementBy = async (amount: number) => {
    await decrementBy(amount);
    setModalMode(null);
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        type: 'spring' as const,
      },
    }),
  };

  return (
    <>
      <Card variant="cyber">
        <div className="space-y-4">
          {/* Main Actions */}
          <div className="grid grid-cols-2 gap-4">
            {/* Increment +1 */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={increment}
                disabled={!isConnected || isProcessing}
                isLoading={isProcessing}
                className="w-full h-20 text-2xl"
              >
                <span className="text-3xl">⬆️</span>
                <span>+1</span>
              </Button>
            </motion.div>

            {/* Decrement -1 */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={decrement}
                disabled={!isConnected || isProcessing}
                isLoading={isProcessing}
                className="w-full h-20 text-2xl"
              >
                <span className="text-3xl">⬇️</span>
                <span>-1</span>
              </Button>
            </motion.div>
          </div>

          {/* Custom Amount Actions */}
          <div className="grid grid-cols-2 gap-4">
            {/* Increment +N */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <Button
                variant="outline"
                size="md"
                onClick={() => setModalMode('increment')}
                disabled={!isConnected || isProcessing}
                className="w-full"
              >
                <span className="text-xl">⬆️</span>
                <span>+N</span>
              </Button>
            </motion.div>

            {/* Decrement -N */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <Button
                variant="outline"
                size="md"
                onClick={() => setModalMode('decrement')}
                disabled={!isConnected || isProcessing}
                className="w-full"
              >
                <span className="text-xl">⬇️</span>
                <span>-N</span>
              </Button>
            </motion.div>
          </div>

          {/* Reset Button (Owner Only) */}
          {isOwner && (
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <Button
                variant="danger"
                size="md"
                onClick={resetCounter}
                disabled={!isConnected || isProcessing}
                isLoading={isProcessing}
                className="w-full"
              >
                <span className="text-xl">🔄</span>
                <span>Reset Counter (Owner Only)</span>
              </Button>
            </motion.div>
          )}

          {/* Connect Wallet Message */}
          {!isConnected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-4"
            >
              <p className="text-sm text-text-muted">
                Connect your wallet to interact with the counter
              </p>
            </motion.div>
          )}
        </div>
      </Card>

      {/* Increment/Decrement By Modal */}
      <IncrementByModal
        isOpen={modalMode !== null}
        onClose={() => setModalMode(null)}
        mode={modalMode || 'increment'}
        onConfirm={modalMode === 'increment' ? handleIncrementBy : handleDecrementBy}
      />
    </>
  );
}
