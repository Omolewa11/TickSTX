// ========================================
// Main Dashboard Page - TickSTX
// ========================================

'use client';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { CounterDisplay } from '@/components/Counter/CounterDisplay';
import { ActionButtons } from '@/components/Counter/ActionButtons';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center space-y-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Decentralized Counter
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              A simple counter smart contract deployed on the Stacks blockchain.
              Connect your wallet and interact with the counter!
            </p>
          </motion.div>

          {/* Counter Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CounterDisplay />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ActionButtons />
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Feature 1 */}
            <div className="glass rounded-xl p-6 border border-neon-cyan border-opacity-20">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Secure & Decentralized
              </h3>
              <p className="text-sm text-text-secondary">
                Smart contract deployed on Stacks blockchain for maximum security and transparency
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass rounded-xl p-6 border border-neon-purple border-opacity-20">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                WalletConnect
              </h3>
              <p className="text-sm text-text-secondary">
                Connect with Hiro, Xverse, or Leather wallet using WalletConnect protocol
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass rounded-xl p-6 border border-neon-pink border-opacity-20">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Interactive UI
              </h3>
              <p className="text-sm text-text-secondary">
                Beautiful animations and real-time updates with smooth user experience
              </p>
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="glass rounded-xl p-8 border border-border-default"
          >
            <h3 className="text-2xl font-bold text-text-primary mb-6 gradient-text">
              How It Works
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neon-cyan bg-opacity-20 flex items-center justify-center text-neon-cyan font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">
                    Connect Your Wallet
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Click "Connect Wallet" and approve the connection with your Stacks wallet
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neon-purple bg-opacity-20 flex items-center justify-center text-neon-purple font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">
                    Interact with Counter
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Use the buttons to increment, decrement, or reset the counter (owner only)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neon-pink bg-opacity-20 flex items-center justify-center text-neon-pink font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">
                    Confirm Transaction
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Approve the transaction in your wallet and wait for confirmation
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neon-green bg-opacity-20 flex items-center justify-center text-neon-green font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">
                    See Updates
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Counter updates automatically with smooth animations
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
