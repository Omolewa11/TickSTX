# TickSTX Frontend Architecture Documentation

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Component Architecture](#component-architecture)
4. [Wallet Integration (WalletConnect)](#wallet-integration-walletconnect)
5. [Smart Contract Integration](#smart-contract-integration)
6. [Design System](#design-system)
7. [State Management](#state-management)
8. [Dependencies](#dependencies)
9. [Environment Setup](#environment-setup)
10. [Development Workflow](#development-workflow)

---

## Tech Stack

### Core Technologies
- **Framework**: Next.js 14 (App Router with TypeScript)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Animations**: Framer Motion
- **Blockchain**: Stacks.js ecosystem
  - `@stacks/connect` - Wallet connection
  - `@stacks/transactions` - Transaction building
  - `@stacks/network` - Network configuration
  - `@stacks/wallet-sdk` - Wallet integration
- **Wallet Connection**: WalletConnect v2
- **State Management**: React Context API + Custom Hooks
- **Notifications**: react-hot-toast

### Design Theme
- **Style**: Dark Cyber/Web3 aesthetic
- **Colors**: Dark backgrounds with neon accents (cyan, purple, pink)
- **Effects**: Glassmorphism, gradient borders, glow effects
- **Typography**: Modern, tech-focused fonts (Orbitron, Inter)

---

## Project Structure

```
frontend/
├── public/
│   ├── favicon.ico                      # App icon
│   ├── logo.svg                         # TickSTX logo
│   └── images/                          # Static images
│       ├── particles/                   # Background particle effects
│       └── icons/                       # Custom icons
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # Root layout with providers
│   │   ├── page.tsx                     # Main dashboard page
│   │   ├── globals.css                  # Global styles + Tailwind imports
│   │   └── fonts/                       # Custom font files
│   │       ├── Orbitron/
│   │       └── Inter/
│   │
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx               # Top navigation bar
│   │   │   ├── Footer.tsx               # Bottom footer with links
│   │   │   └── Background.tsx           # Animated background effects
│   │   │
│   │   ├── Counter/
│   │   │   ├── CounterDisplay.tsx       # Main counter visualization
│   │   │   ├── ActionButtons.tsx        # Increment/Decrement buttons
│   │   │   ├── IncrementByModal.tsx     # Custom amount input modal
│   │   │   └── CounterStats.tsx         # Statistics display
│   │   │
│   │   ├── Wallet/
│   │   │   ├── WalletConnect.tsx        # WalletConnect integration
│   │   │   └── WalletStatus.tsx         # Wallet info display
│   │   │
│   │   ├── UI/
│   │   │   ├── Button.tsx               # Reusable button component
│   │   │   ├── Card.tsx                 # Reusable card container
│   │   │   ├── Toast.tsx                # Notification component
│   │   │   ├── LoadingSpinner.tsx       # Loading indicator
│   │   │   └── Modal.tsx                # Modal wrapper
│   │   │
│   │   └── ContractInfo/
│   │       └── ContractDetails.tsx      # Contract information display
│   │
│   ├── lib/
│   │   ├── stacks.ts                    # Stacks network configuration
│   │   ├── contract.ts                  # Contract interaction functions
│   │   └── walletconnect.ts             # WalletConnect configuration
│   │
│   ├── hooks/
│   │   ├── useCounter.ts                # Counter state management
│   │   ├── useWallet.ts                 # Wallet connection hook
│   │   └── useContract.ts               # Contract interaction hook
│   │
│   ├── context/
│   │   ├── WalletContext.tsx            # Global wallet state
│   │   └── ContractContext.tsx          # Global contract state
│   │
│   ├── types/
│   │   └── index.ts                     # TypeScript type definitions
│   │
│   └── utils/
│       ├── helpers.ts                   # Utility functions
│       ├── constants.ts                 # App constants
│       └── formatters.ts                # Data formatting functions
│
├── tailwind.config.ts                   # Tailwind configuration
├── next.config.js                       # Next.js configuration
├── tsconfig.json                        # TypeScript configuration
├── package.json                         # Dependencies
├── .env.local                           # Environment variables
└── .env.example                         # Example environment file
```

---

## Component Architecture

### 1. Layout Components

#### `Header.tsx`
**Purpose**: Top navigation bar with branding and wallet connection

**Features**:
- TickSTX logo with neon glow effect
- Network indicator (Mainnet/Testnet badge)
- WalletConnect button (right-aligned)
- Responsive design (mobile hamburger menu)
- Sticky positioning

**Props**:
```typescript
interface HeaderProps {
  className?: string;
}
```

---

#### `Footer.tsx`
**Purpose**: Bottom footer with links and contract info

**Features**:
- Contract address display with copy-to-clipboard
- External links (GitHub, Docs, Stacks Explorer)
- "Built on Stacks" badge
- Social media links
- Responsive grid layout

**Props**:
```typescript
interface FooterProps {
  contractAddress: string;
}
```

---

#### `Background.tsx`
**Purpose**: Animated background effects for cyber aesthetic

**Features**:
- Gradient animation (slow rotation)
- Grid pattern overlay
- Optional floating particles/orbs
- Dark theme with subtle glow effects
- CSS-based animations (performance optimized)

**Props**:
```typescript
interface BackgroundProps {
  variant?: 'default' | 'minimal' | 'particles';
}
```

---

### 2. Counter Components

#### `CounterDisplay.tsx`
**Purpose**: Main counter visualization (hero component)

**Features**:
- Large animated number display
- Neon glow effect on digits
- Pulsing animation on value change
- Gradient border card container
- Loading skeleton state
- Framer Motion transitions
- Error state display

**Props**:
```typescript
interface CounterDisplayProps {
  value: number | null;
  isLoading: boolean;
  error?: string;
  onRefresh?: () => void;
}
```

**Animations**:
- Number change: Scale pulse + fade transition
- Success: Green flash border
- Error: Red shake animation

---

#### `ActionButtons.tsx`
**Purpose**: Main action controls for counter operations

**Features**:
- Grid layout (2x3 or 2x2 responsive)
- Four primary buttons:
  - **+1** (Increment)
  - **-1** (Decrement)
  - **+N** (Increment by custom - opens modal)
  - **-N** (Decrement by custom - opens modal)
- One conditional button:
  - **Reset** (Only visible if wallet is contract owner)
- Disabled state when wallet not connected
- Loading state during transaction
- Neon glow on hover
- Transaction fee preview

**Props**:
```typescript
interface ActionButtonsProps {
  isWalletConnected: boolean;
  isOwner: boolean;
  onIncrement: () => Promise<void>;
  onDecrement: () => Promise<void>;
  onIncrementBy: (amount: number) => Promise<void>;
  onDecrementBy: (amount: number) => Promise<void>;
  onReset: () => Promise<void>;
  isLoading: boolean;
}
```

---

#### `IncrementByModal.tsx`
**Purpose**: Modal for custom increment/decrement amounts

**Features**:
- Number input with validation
- Min value: 1
- Max value: 999999 (reasonable limit)
- Live fee calculation preview
- Confirm/Cancel buttons
- Keyboard support (Enter to confirm, Esc to close)
- Error display for invalid amounts
- Dark modal with neon border

**Props**:
```typescript
interface IncrementByModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  mode: 'increment' | 'decrement';
  currentCounter: number; // For decrement validation
}
```

---

#### `CounterStats.tsx`
**Purpose**: Display statistics and information

**Features**:
- Total operations in current session
- Your last action (increment/decrement)
- Current owner address
- Network status
- Collapsible/expandable section

**Props**:
```typescript
interface CounterStatsProps {
  operations: number;
  lastAction?: {
    type: 'increment' | 'decrement' | 'reset';
    amount: number;
    timestamp: Date;
  };
  owner: string;
}
```

---

### 3. Wallet Components

#### `WalletConnect.tsx`
**Purpose**: WalletConnect integration for Stacks wallets

**Features**:
- WalletConnect v2 protocol
- Support for multiple Stacks wallets:
  - Hiro Wallet
  - Xverse Wallet
  - Leather Wallet
- QR code display for mobile wallets
- Deep link support for browser extensions
- Connection state management
- Error handling for failed connections
- Network selection (Mainnet/Testnet)

**Props**:
```typescript
interface WalletConnectProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
}
```

**Implementation Details**:
```typescript
// Uses WalletConnect v2 with Stacks chain integration
// Project ID from WalletConnect Cloud
// Supports both mobile and desktop wallets
```

---

#### `WalletStatus.tsx`
**Purpose**: Display connected wallet information

**Features**:
- Truncated address display (ST1X...ABC format)
- STX balance display
- Network indicator badge
- Copy address button
- Disconnect button
- Dropdown menu style
- Click outside to close

**Props**:
```typescript
interface WalletStatusProps {
  address: string;
  balance: string;
  network: 'mainnet' | 'testnet';
  onDisconnect: () => void;
}
```

---

### 4. UI Components (Reusable)

#### `Button.tsx`
**Purpose**: Reusable button with consistent styling

**Variants**:
- `primary` - Main action (cyan neon)
- `secondary` - Secondary action (purple neon)
- `danger` - Destructive action (red neon)
- `ghost` - Minimal style
- `outline` - Border only

**Sizes**: `sm`, `md`, `lg`

**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
```

---

#### `Card.tsx`
**Purpose**: Container component with cyber styling

**Features**:
- Dark background with transparency
- Gradient border (customizable colors)
- Glassmorphism effect
- Hover animation (optional)
- Padding variants

**Props**:
```typescript
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  hoverable?: boolean;
  className?: string;
}
```

---

#### `Toast.tsx`
**Purpose**: Notification system using react-hot-toast

**Types**:
- Success (green neon)
- Error (red neon)
- Info (blue neon)
- Warning (yellow neon)

**Features**:
- Auto-dismiss (configurable duration)
- Slide-in animation
- Close button
- Icon support
- Transaction link (for blockchain operations)

**Usage**:
```typescript
import { toast } from 'react-hot-toast';

toast.success('Counter incremented!');
toast.error('Transaction failed');
```

---

#### `LoadingSpinner.tsx`
**Purpose**: Loading indicator

**Variants**:
- Circular spinner (default)
- Dots animation
- Pulse effect

**Props**:
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  color?: string;
}
```

---

#### `Modal.tsx`
**Purpose**: Reusable modal wrapper

**Features**:
- Dark backdrop with blur
- Centered content
- Close button
- ESC key support
- Click outside to close
- Framer Motion animations

**Props**:
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}
```

---

### 5. Contract Info Component

#### `ContractDetails.tsx`
**Purpose**: Display contract and network information

**Features**:
- Contract address with copy button
- Link to Stacks Explorer
- Owner address display
- Network indicator
- Contract name and version
- Collapsible section
- Cyber-styled info grid

**Props**:
```typescript
interface ContractDetailsProps {
  contractAddress: string;
  contractName: string;
  owner: string;
  network: 'mainnet' | 'testnet';
}
```

---

## Wallet Integration (WalletConnect)

### WalletConnect v2 Setup

#### Configuration File: `lib/walletconnect.ts`

```typescript
import { WalletConnectClient } from '@walletconnect/client';

export const walletConnectConfig = {
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  relayUrl: 'wss://relay.walletconnect.com',
  metadata: {
    name: 'TickSTX',
    description: 'Counter Smart Contract on Stacks',
    url: 'https://tickstx.app',
    icons: ['https://tickstx.app/logo.png'],
  },
  chains: ['stacks:mainnet', 'stacks:testnet'],
};
```

### Supported Wallets

1. **Hiro Wallet**
   - Browser extension
   - Mobile app
   - WalletConnect support

2. **Xverse Wallet**
   - Browser extension
   - Mobile app (iOS/Android)
   - Full WalletConnect integration

3. **Leather Wallet** (formerly Hiro Web Wallet)
   - Browser extension
   - Desktop app

### WalletConnect Flow

1. **User clicks "Connect Wallet"**
   - Modal opens with wallet options
   - Display QR code for mobile wallets
   - Show deep links for browser extensions

2. **User selects wallet**
   - WalletConnect establishes connection
   - Request account access
   - Retrieve Stacks address

3. **Connection established**
   - Store wallet address in context
   - Fetch STX balance
   - Check if user is contract owner
   - Update UI state

4. **Transaction signing**
   - Build transaction using `@stacks/transactions`
   - Send to wallet via WalletConnect
   - User approves in wallet
   - Monitor transaction status

### Security Considerations

- Never store private keys
- Validate all transaction parameters
- Use HTTPS only
- Verify contract addresses
- Implement session timeout
- Clear sensitive data on disconnect

---

## Smart Contract Integration

### Contract Configuration: `lib/stacks.ts`

```typescript
import { StacksMainnet, StacksTestnet } from '@stacks/network';

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK === 'mainnet'
  ? new StacksMainnet()
  : new StacksTestnet();

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const CONTRACT_NAME = 'TickStx-';

export const EXPLORER_URL = process.env.NEXT_PUBLIC_NETWORK === 'mainnet'
  ? 'https://explorer.stacks.co'
  : 'https://explorer.stacks.co/?chain=testnet';
```

### Contract Functions: `lib/contract.ts`

#### Read-Only Functions

```typescript
import { callReadOnlyFunction, cvToJSON } from '@stacks/transactions';

/**
 * Get current counter value
 */
export async function getCounter(): Promise<number> {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-counter',
    functionArgs: [],
    network: NETWORK,
    senderAddress: CONTRACT_ADDRESS,
  });

  return cvToJSON(result).value;
}

/**
 * Get contract owner
 */
export async function getOwner(): Promise<string> {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-owner',
    functionArgs: [],
    network: NETWORK,
    senderAddress: CONTRACT_ADDRESS,
  });

  return cvToJSON(result).value;
}
```

#### Write Functions (Transactions)

```typescript
import { openContractCall } from '@stacks/connect';
import { uintCV, PostConditionMode } from '@stacks/transactions';

/**
 * Increment counter by 1
 */
export async function incrementCounter(senderAddress: string) {
  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'increment',
    functionArgs: [],
    senderAddress,
    network: NETWORK,
    postConditionMode: PostConditionMode.Deny,
    onFinish: (data) => {
      console.log('Transaction ID:', data.txId);
      return data;
    },
    onCancel: () => {
      console.log('Transaction cancelled');
    },
  };

  await openContractCall(options);
}

/**
 * Increment counter by custom amount
 */
export async function incrementBy(amount: number, senderAddress: string) {
  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'increment-by',
    functionArgs: [uintCV(amount)],
    senderAddress,
    network: NETWORK,
    postConditionMode: PostConditionMode.Deny,
  };

  await openContractCall(options);
}

/**
 * Decrement counter by 1
 */
export async function decrementCounter(senderAddress: string) {
  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'decrement',
    functionArgs: [],
    senderAddress,
    network: NETWORK,
    postConditionMode: PostConditionMode.Deny,
  };

  await openContractCall(options);
}

/**
 * Decrement counter by custom amount
 */
export async function decrementBy(amount: number, senderAddress: string) {
  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'decrement-by',
    functionArgs: [uintCV(amount)],
    senderAddress,
    network: NETWORK,
    postConditionMode: PostConditionMode.Deny,
  };

  await openContractCall(options);
}

/**
 * Reset counter (owner only)
 */
export async function resetCounter(senderAddress: string) {
  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'reset',
    functionArgs: [],
    senderAddress,
    network: NETWORK,
    postConditionMode: PostConditionMode.Deny,
  };

  await openContractCall(options);
}
```

### Transaction Status Monitoring

```typescript
import { StacksMainnet } from '@stacks/network';

export async function waitForTransaction(txId: string): Promise<boolean> {
  const network = new StacksMainnet();
  const url = `${network.coreApiUrl}/extended/v1/tx/${txId}`;

  for (let i = 0; i < 30; i++) {
    const response = await fetch(url);
    const data = await response.json();

    if (data.tx_status === 'success') {
      return true;
    } else if (data.tx_status === 'failed') {
      throw new Error('Transaction failed');
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  throw new Error('Transaction timeout');
}
```

---

## Design System

### Color Palette

```css
/* Dark Cyber/Web3 Theme */

/* Backgrounds */
--bg-primary: #0a0a0f;        /* Very dark blue-black */
--bg-secondary: #1a1a2e;      /* Dark blue */
--bg-card: rgba(26, 26, 46, 0.8); /* Card with transparency */

/* Neon Accents */
--neon-cyan: #00f0ff;         /* Primary neon */
--neon-purple: #a855f7;       /* Secondary neon */
--neon-pink: #ec4899;         /* Accent neon */
--neon-green: #00ff88;        /* Success */
--neon-red: #ff3366;          /* Error/Danger */
--neon-yellow: #ffd700;       /* Warning */

/* Text */
--text-primary: #ffffff;      /* Primary text */
--text-secondary: #a0a0b8;    /* Secondary text */
--text-muted: #6b6b7e;        /* Muted text */

/* Borders */
--border-default: rgba(160, 160, 184, 0.2);
--border-glow: rgba(0, 240, 255, 0.5);

/* Shadows */
--shadow-glow-cyan: 0 0 20px rgba(0, 240, 255, 0.5);
--shadow-glow-purple: 0 0 20px rgba(168, 85, 247, 0.5);
--shadow-glow-pink: 0 0 20px rgba(236, 72, 153, 0.5);
```

### Typography

```css
/* Font Families */
--font-heading: 'Orbitron', sans-serif;  /* Cyber tech font */
--font-body: 'Inter', sans-serif;        /* Clean readable font */
--font-mono: 'JetBrains Mono', monospace; /* Code/addresses */

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-counter: 6rem;  /* 96px - for main counter */
```

### Spacing Scale

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Component Styles

#### Button Styles
```css
.btn-primary {
  background: linear-gradient(135deg, #00f0ff, #a855f7);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.8);
  transform: translateY(-2px);
}

.btn-secondary {
  border: 2px solid #a855f7;
  background: transparent;
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
}
```

#### Card Styles
```css
.card-cyber {
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid transparent;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  background-clip: padding-box;
  position: relative;
}

.card-cyber::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 16px;
  padding: 2px;
  background: linear-gradient(135deg, #00f0ff, #a855f7, #ec4899);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

#### Glow Effects
```css
.glow-cyan {
  text-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff;
}

.glow-purple {
  text-shadow: 0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 30px #a855f7;
}

.counter-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    text-shadow: 0 0 20px #00f0ff, 0 0 40px #00f0ff;
  }
  50% {
    text-shadow: 0 0 30px #00f0ff, 0 0 60px #00f0ff, 0 0 80px #00f0ff;
  }
}
```

### Animations

```css
/* Fade in from bottom */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale pulse */
@keyframes scalePulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Rotate gradient */
@keyframes rotateGradient {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

/* Shimmer effect */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
```

---

## State Management

### Context Structure

#### WalletContext
```typescript
interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  balance: string;
  network: 'mainnet' | 'testnet';
  connect: () => Promise<void>;
  disconnect: () => void;
  isOwner: boolean;
}
```

#### ContractContext
```typescript
interface ContractContextType {
  counterValue: number | null;
  isLoading: boolean;
  error: string | null;
  refreshCounter: () => Promise<void>;
  increment: () => Promise<void>;
  decrement: () => Promise<void>;
  incrementBy: (amount: number) => Promise<void>;
  decrementBy: (amount: number) => Promise<void>;
  reset: () => Promise<void>;
}
```

### Custom Hooks

#### useCounter Hook
```typescript
export function useCounter() {
  const [value, setValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCounter = async () => {
    try {
      setIsLoading(true);
      const counter = await getCounter();
      setValue(counter);
      setError(null);
    } catch (err) {
      setError('Failed to fetch counter');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCounter();
    const interval = setInterval(fetchCounter, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  return { value, isLoading, error, refresh: fetchCounter };
}
```

#### useWallet Hook
```typescript
export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}
```

#### useContract Hook
```typescript
export function useContract() {
  const { address } = useWallet();
  const { refreshCounter } = useContext(ContractContext);

  const executeTransaction = async (
    fn: (address: string) => Promise<any>
  ) => {
    if (!address) {
      toast.error('Please connect wallet');
      return;
    }

    try {
      await fn(address);
      toast.success('Transaction submitted!');
      // Refresh counter after transaction
      setTimeout(() => refreshCounter(), 5000);
    } catch (err) {
      toast.error('Transaction failed');
      console.error(err);
    }
  };

  return {
    increment: () => executeTransaction(incrementCounter),
    decrement: () => executeTransaction(decrementCounter),
    incrementBy: (amount: number) =>
      executeTransaction((addr) => incrementBy(amount, addr)),
    decrementBy: (amount: number) =>
      executeTransaction((addr) => decrementBy(amount, addr)),
    reset: () => executeTransaction(resetCounter),
  };
}
```

---

## Dependencies

### Core Dependencies (package.json)
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",

    "@stacks/connect": "^7.8.0",
    "@stacks/transactions": "^6.15.0",
    "@stacks/network": "^6.15.0",
    "@stacks/wallet-sdk": "^6.0.0",
    "@stacks/blockchain-api-client": "^7.0.0",

    "@walletconnect/client": "^2.13.0",
    "@walletconnect/types": "^2.13.0",

    "framer-motion": "^11.0.0",
    "react-hot-toast": "^2.4.1",

    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",

    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

### Dependency Purposes

| Package | Purpose |
|---------|---------|
| `next` | React framework with SSR |
| `@stacks/connect` | Wallet connection SDK |
| `@stacks/transactions` | Transaction building |
| `@stacks/network` | Network configuration |
| `@walletconnect/client` | WalletConnect protocol |
| `framer-motion` | Animations library |
| `react-hot-toast` | Toast notifications |
| `tailwindcss` | Utility-first CSS |
| `clsx` | Conditional classNames |
| `tailwind-merge` | Merge Tailwind classes |

---

## Environment Setup

### Environment Variables (.env.local)

```bash
# Network Configuration
NEXT_PUBLIC_NETWORK=testnet  # or 'mainnet'

# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
NEXT_PUBLIC_CONTRACT_NAME=TickStx-

# WalletConnect Configuration
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# API Configuration (optional)
NEXT_PUBLIC_STACKS_API_URL=https://api.testnet.hiro.so

# Explorer URL
NEXT_PUBLIC_EXPLORER_URL=https://explorer.stacks.co/?chain=testnet

# App Configuration
NEXT_PUBLIC_APP_NAME=TickSTX
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Example Environment File (.env.example)
```bash
# Copy this file to .env.local and fill in your values

NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=
NEXT_PUBLIC_CONTRACT_NAME=TickStx-
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
NEXT_PUBLIC_STACKS_API_URL=https://api.testnet.hiro.so
NEXT_PUBLIC_EXPLORER_URL=https://explorer.stacks.co/?chain=testnet
NEXT_PUBLIC_APP_NAME=TickSTX
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Development Workflow

### Setup Steps

1. **Clone and Install**
```bash
cd frontend
npm install
```

2. **Environment Configuration**
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

3. **Get WalletConnect Project ID**
   - Visit https://cloud.walletconnect.com
   - Create new project
   - Copy Project ID to .env.local

4. **Start Development Server**
```bash
npm run dev
# Opens at http://localhost:3000
```

### Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check

# Format code
npm run format
```

### Build Process

1. **Development Build**
   - Hot module replacement
   - Source maps enabled
   - Detailed error messages

2. **Production Build**
   - Code minification
   - Tree shaking
   - Image optimization
   - Static page generation

### Testing Strategy

#### Component Testing
```bash
npm run test:components
```

#### Integration Testing
```bash
npm run test:integration
```

#### E2E Testing (Optional)
```bash
npm run test:e2e
```

### Code Quality

#### ESLint Configuration
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

#### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Deployment

#### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

#### Environment Variables on Vercel
Add all NEXT_PUBLIC_* variables in Vercel dashboard:
- Settings → Environment Variables
- Add production values
- Redeploy

#### Build Optimization
- Enable ISR (Incremental Static Regeneration)
- Optimize images with Next/Image
- Use dynamic imports for heavy components
- Enable Gzip compression

---

## Best Practices

### Performance
- Lazy load components with React.lazy()
- Use useCallback and useMemo for expensive operations
- Implement virtual scrolling for long lists
- Optimize images (WebP format, responsive sizes)
- Minimize bundle size (analyze with webpack-bundle-analyzer)

### Security
- Never expose private keys
- Validate all user inputs
- Sanitize data before display
- Use HTTPS in production
- Implement rate limiting
- Add CORS headers

### Accessibility
- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management in modals
- High contrast mode support
- Screen reader friendly

### Code Organization
- One component per file
- Group related components in folders
- Use TypeScript for type safety
- Write self-documenting code
- Add JSDoc comments for complex functions
- Keep functions small and focused

### Git Workflow
```bash
# Feature branch
git checkout -b feature/wallet-connection

# Commit with conventional commits
git commit -m "feat: add WalletConnect integration"

# Push and create PR
git push origin feature/wallet-connection
```

---

## Troubleshooting

### Common Issues

#### WalletConnect Not Connecting
- Check Project ID is correct
- Verify network configuration
- Clear browser cache
- Check wallet app is updated

#### Counter Not Updating
- Check network connection
- Verify contract address
- Check transaction status on explorer
- Increase polling interval

#### Styling Issues
- Clear .next folder: `rm -rf .next`
- Rebuild: `npm run build`
- Check Tailwind config
- Verify CSS import order

#### Transaction Failures
- Check STX balance
- Verify function arguments
- Check network (testnet vs mainnet)
- Review contract error codes

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Stacks.js Docs](https://docs.stacks.co/stacks-js)
- [WalletConnect Docs](https://docs.walletconnect.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion)

### Tools
- [Stacks Explorer](https://explorer.stacks.co)
- [Stacks API](https://docs.hiro.so/api)
- [WalletConnect Cloud](https://cloud.walletconnect.com)

### Community
- [Stacks Discord](https://discord.gg/stacks)
- [Stacks Forum](https://forum.stacks.org)
- [GitHub Discussions](https://github.com/stacks-network/stacks.js/discussions)

---

## Roadmap
https://docs.walletconnect.network/wallet-sdk/web/installation

### Phase 1 (Current)
- [x] Architecture documentation
- [ ] Project setup
- [ ] Core components
- [ ] WalletConnect integration
- [ ] Contract integration

### Phase 2 (Future)
- [ ] Advanced animations
- [ ] Transaction history
- [ ] Mobile app (React Native)
- [ ] Multiple language support
- [ ] Dark/Light theme toggle

### Phase 3 (Extended)
- [ ] Leaderboard feature
- [ ] User profiles
- [ ] Counter ownership transfer
- [ ] Premium features (NFT-gated)

---

**Last Updated**: 2025-12-26
**Version**: 1.0.0
**Maintainer**: TickSTX Team
