// ========================================
// Toast Notification Component
// ========================================

'use client';

import { Toaster, toast as hotToast } from 'react-hot-toast';

/**
 * Toast container component - Add to root layout
 */
export function ToastContainer() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: 'rgba(26, 26, 46, 0.95)',
          color: '#ffffff',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
          padding: '16px',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: '#00ff88',
            secondary: '#1a1a2e',
          },
          style: {
            borderColor: 'rgba(0, 255, 136, 0.5)',
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
          },
        },
        error: {
          iconTheme: {
            primary: '#ff3366',
            secondary: '#1a1a2e',
          },
          style: {
            borderColor: 'rgba(255, 51, 102, 0.5)',
            boxShadow: '0 0 20px rgba(255, 51, 102, 0.3)',
          },
        },
        loading: {
          iconTheme: {
            primary: '#00f0ff',
            secondary: '#1a1a2e',
          },
          style: {
            borderColor: 'rgba(0, 240, 255, 0.5)',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
          },
        },
      }}
    />
  );
}

/**
 * Toast utility functions with cyber styling
 */
export const toast = {
  success: (message: string) => {
    hotToast.success(message);
  },

  error: (message: string) => {
    hotToast.error(message);
  },

  loading: (message: string) => {
    return hotToast.loading(message);
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return hotToast.promise(promise, messages);
  },

  custom: (message: string) => {
    hotToast(message, {
      icon: '⚡',
    });
  },

  dismiss: (toastId?: string) => {
    hotToast.dismiss(toastId);
  },
};
