// ========================================
// Smart Contract Interaction Functions (@stacks/connect)
// ========================================

import { openContractCall } from '@stacks/connect';
import {
  fetchCallReadOnlyFunction,
  cvToJSON,
  uintCV,
  PostConditionMode,
} from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';

/**
 * Get Stacks network instance
 */
function getNetwork() {
  return process.env.NEXT_PUBLIC_NETWORK === 'mainnet'
    ? STACKS_MAINNET
    : STACKS_TESTNET;
}

/**
 * Get contract address and name from environment
 */
function getContractInfo() {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const contractName = process.env.NEXT_PUBLIC_CONTRACT_NAME;

  if (!contractAddress || !contractName) {
    throw new Error('Contract address or name not configured in environment variables');
  }

  return {
    contractAddress,
    contractName,
    fullContractId: `${contractAddress}.${contractName}`,
  };
}

// ========================================
// Read-Only Functions
// ========================================

/**
 * Get current counter value
 * Calls: get-counter (read-only)
 */
export async function getCounterValue(): Promise<number> {
  const { contractAddress, contractName } = getContractInfo();
  const network = getNetwork();

  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-counter',
      functionArgs: [],
      network,
      senderAddress: contractAddress,
    });

    const jsonResult = cvToJSON(result);
    return Number(jsonResult.value);
  } catch (error) {
    console.error('Error fetching counter value:', error);
    throw new Error('Failed to fetch counter value');
  }
}

/**
 * Get contract owner address
 * Calls: get-owner (read-only)
 */
export async function getContractOwner(): Promise<string> {
  const { contractAddress, contractName } = getContractInfo();
  const network = getNetwork();

  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-owner',
      functionArgs: [],
      network,
      senderAddress: contractAddress,
    });

    const jsonResult = cvToJSON(result);
    return jsonResult.value as string;
  } catch (error) {
    console.error('Error fetching contract owner:', error);
    throw new Error('Failed to fetch contract owner');
  }
}

// ========================================
// Write Functions (Require Wallet Connection)
// ========================================

/**
 * Increment counter by 1
 * Calls: increment (public function)
 */
export async function incrementCounter(): Promise<{ txid: string; transaction: string }> {
  const { contractAddress, contractName } = getContractInfo();
  const network = getNetwork();

  return new Promise((resolve, reject) => {
    openContractCall({
      network,
      contractAddress,
      contractName,
      functionName: 'increment',
      functionArgs: [],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log('Transaction submitted:', data.txId);
        resolve({ txid: data.txId, transaction: data.txId });
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled'));
      },
    });
  });
}

/**
 * Decrement counter by 1
 * Calls: decrement (public function)
 * @throws Error if counter is already at zero (ERR_UNDERFLOW)
 */
export async function decrementCounter(): Promise<{ txid: string; transaction: string }> {
  const { contractAddress, contractName } = getContractInfo();
  const network = getNetwork();

  return new Promise((resolve, reject) => {
    openContractCall({
      network,
      contractAddress,
      contractName,
      functionName: 'decrement',
      functionArgs: [],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log('Transaction submitted:', data.txId);
        resolve({ txid: data.txId, transaction: data.txId });
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled'));
      },
    });
  });
}

/**
 * Increment counter by custom amount
 * Calls: increment-by (public function)
 * @param amount - Amount to increment (must be > 0)
 * @throws Error if amount is 0 (ERR_INVALID_AMOUNT)
 */
export async function incrementBy(amount: number): Promise<{ txid: string; transaction: string }> {
  const { contractAddress, contractName } = getContractInfo();
  const network = getNetwork();

  if (amount <= 0) {
    throw new Error('Amount must be greater than 0');
  }

  return new Promise((resolve, reject) => {
    openContractCall({
      network,
      contractAddress,
      contractName,
      functionName: 'increment-by',
      functionArgs: [uintCV(amount)],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log('Transaction submitted:', data.txId);
        resolve({ txid: data.txId, transaction: data.txId });
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled'));
      },
    });
  });
}

/**
 * Decrement counter by custom amount
 * Calls: decrement-by (public function)
 * @param amount - Amount to decrement (must be > 0)
 * @throws Error if amount is 0 (ERR_INVALID_AMOUNT)
 * @throws Error if counter < amount (ERR_UNDERFLOW)
 */
export async function decrementBy(amount: number): Promise<{ txid: string; transaction: string }> {
  const { contractAddress, contractName } = getContractInfo();
  const network = getNetwork();

  if (amount <= 0) {
    throw new Error('Amount must be greater than 0');
  }

  return new Promise((resolve, reject) => {
    openContractCall({
      network,
      contractAddress,
      contractName,
      functionName: 'decrement-by',
      functionArgs: [uintCV(amount)],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log('Transaction submitted:', data.txId);
        resolve({ txid: data.txId, transaction: data.txId });
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled'));
      },
    });
  });
}

/**
 * Reset counter to zero (owner only)
 * Calls: reset (public function)
 * @throws Error if caller is not contract owner (ERR_UNAUTHORIZED)
 */
export async function resetCounter(): Promise<{ txid: string; transaction: string }> {
  const { contractAddress, contractName } = getContractInfo();
  const network = getNetwork();

  return new Promise((resolve, reject) => {
    openContractCall({
      network,
      contractAddress,
      contractName,
      functionName: 'reset',
      functionArgs: [],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log('Transaction submitted:', data.txId);
        resolve({ txid: data.txId, transaction: data.txId });
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled'));
      },
    });
  });
}

// ========================================
// Helper Functions
// ========================================

/**
 * Check if an address is the contract owner
 */
export async function isOwner(address: string): Promise<boolean> {
  try {
    const owner = await getContractOwner();
    return owner.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error('Error checking owner status:', error);
    return false;
  }
}

/**
 * Get contract explorer URL
 */
export function getContractExplorerUrl(): string {
  const { fullContractId } = getContractInfo();
  const baseUrl = process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://explorer.stacks.co';
  return `${baseUrl}/txid/${fullContractId}?chain=${process.env.NEXT_PUBLIC_NETWORK || 'mainnet'}`;
}

/**
 * Get transaction explorer URL
 */
export function getTransactionExplorerUrl(txid: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://explorer.stacks.co';
  return `${baseUrl}/txid/${txid}?chain=${process.env.NEXT_PUBLIC_NETWORK || 'mainnet'}`;
}
