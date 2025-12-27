// ========================================
// Increment By Modal - Custom Amount Input
// ========================================

'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/UI/Modal';
import { Button } from '@/components/UI/Button';

interface IncrementByModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'increment' | 'decrement';
  onConfirm: (amount: number) => Promise<void>;
}

export function IncrementByModal({
  isOpen,
  onClose,
  mode,
  onConfirm,
}: IncrementByModalProps) {
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setAmount('');
      setError('');
      setIsProcessing(false);
    }
  }, [isOpen]);

  const validateAmount = (value: string): boolean => {
    const num = parseInt(value, 10);

    if (!value || isNaN(num)) {
      setError('Please enter a valid number');
      return false;
    }

    if (num <= 0) {
      setError('Amount must be greater than 0');
      return false;
    }

    if (num > 999999) {
      setError('Amount too large (max: 999,999)');
      return false;
    }

    setError('');
    return true;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    setAmount(value);
    if (value) {
      validateAmount(value);
    } else {
      setError('');
    }
  };

  const handleConfirm = async () => {
    if (!validateAmount(amount)) {
      return;
    }

    const num = parseInt(amount, 10);
    setIsProcessing(true);

    try {
      await onConfirm(num);
      onClose();
    } catch (error) {
      console.error('Error in modal confirm:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && amount && !error) {
      handleConfirm();
    }
  };

  const icon = mode === 'increment' ? '⬆️' : '⬇️';
  const title = mode === 'increment' ? 'Increment By' : 'Decrement By';
  const action = mode === 'increment' ? 'Increase' : 'Decrease';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <div className="space-y-6">
        {/* Icon & Description */}
        <div className="text-center">
          <div className="text-6xl mb-4">{icon}</div>
          <p className="text-text-secondary">
            Enter the amount to {action.toLowerCase()} the counter by
          </p>
        </div>

        {/* Input Field */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-text-secondary mb-2">
            Amount
          </label>
          <input
            id="amount"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={amount}
            onChange={handleAmountChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter amount (e.g., 10)"
            className={`
              w-full px-4 py-3 rounded-lg
              bg-bg-secondary border-2
              ${error ? 'border-neon-red' : 'border-neon-cyan border-opacity-30'}
              text-text-primary text-center text-2xl font-bold
              focus:outline-none focus:border-neon-cyan focus:border-opacity-70
              transition-all
              placeholder:text-text-muted placeholder:text-base placeholder:font-normal
            `}
            autoFocus
          />
          {error && (
            <p className="mt-2 text-sm text-neon-red">{error}</p>
          )}
        </div>

        {/* Preview */}
        {amount && !error && (
          <div className="p-4 rounded-lg glass border border-neon-cyan border-opacity-30">
            <p className="text-sm text-text-secondary text-center">
              Counter will {action.toLowerCase()} by
              <span className="block text-3xl font-bold text-neon-cyan mt-2">
                {parseInt(amount, 10).toLocaleString()}
              </span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleConfirm}
            disabled={!amount || !!error || isProcessing}
            isLoading={isProcessing}
            className="flex-1"
          >
            {action}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
