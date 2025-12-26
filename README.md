# TickSTX Counter Contract

A simple yet comprehensive counter smart contract built on the Stacks blockchain using Clarity. This contract demonstrates fundamental Clarity concepts including mutable state management, access control, fee collection, and error handling.

## Overview

TickSTX is a counter contract that allows users to increment and decrement a global counter value. It showcases core Clarity programming concepts and best practices for smart contract development on Stacks.

## Features

- **Increment Counter**: Increase the counter by 1
- **Decrement Counter**: Decrease the counter by 1 (with underflow protection)
- **Read Counter**: View the current counter value
- **Reset Counter**: Owner-only function to reset the counter to zero
- **Fee Collection**: Small STX fee charged for increment/decrement operations
- **Access Control**: Only contract owner can reset the counter
- **Error Handling**: Comprehensive error codes for various failure scenarios

## Core Concepts Demonstrated

### 1. Public vs Read-Only Functions

**Public Functions** - Modify contract state and can send/receive tokens:
- `increment()` - Modifies counter and charges fee
- `decrement()` - Modifies counter and charges fee
- `reset()` - Resets counter (owner only)

**Read-Only Functions** - Query state without modifications:
- `get-counter()` - Returns current counter value
- `get-owner()` - Returns contract owner address

### 2. Mutable Contract State

Uses Clarity's `define-data-var` for mutable state:
```clarity
(define-data-var counter uint u0)
```

### 3. Error Handling

Implements comprehensive error codes:
- `u100` - Unauthorized (non-owner attempting reset)
- `u101` - Counter underflow (cannot decrement below zero)
- `u102` - Insufficient balance (cannot pay fee)
- `u103` - Transfer failed

## Contract Functions

### Public Functions

#### `increment()`
Increments the counter by 1 and charges a small STX fee.

**Parameters**: None

**Returns**: `(response uint uint)`

**Fee**: 0.000001 STX (1 microSTX)

**Example**:
```clarity
(contract-call? .TickStx- increment)
;; => (ok u1)
```

---

#### `decrement()`
Decrements the counter by 1 and charges a small STX fee.

**Parameters**: None

**Returns**: `(response uint uint)`

**Fee**: 0.000001 STX (1 microSTX)

**Error**: Returns `(err u101)` if counter is already at zero

**Example**:
```clarity
(contract-call? .TickStx- decrement)
;; => (ok u0)
```

---

#### `reset()`
Resets the counter to zero. Only callable by contract owner.

**Parameters**: None

**Returns**: `(response bool uint)`

**Access**: Owner only

**Error**: Returns `(err u100)` if caller is not owner

**Example**:
```clarity
(contract-call? .TickStx- reset)
;; => (ok true)
```

---

### Read-Only Functions

#### `get-counter()`
Returns the current counter value.

**Parameters**: None

**Returns**: `uint`

**Example**:
```clarity
(contract-call? .TickStx- get-counter)
;; => u5
```

---

#### `get-owner()`
Returns the contract owner's principal.

**Parameters**: None

**Returns**: `principal`

**Example**:
```clarity
(contract-call? .TickStx- get-owner)
;; => ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
```

---

## Installation & Setup

### Prerequisites

- [Clarinet](https://github.com/hirosystems/clarinet) - Clarity development environment
- Node.js (v16 or higher)
- A Stacks wallet (for testnet/mainnet deployment)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/TickSTX.git
cd TickSTX
```

2. Install Clarinet (if not already installed):
```bash
# macOS
brew install clarinet

# Other platforms - see https://github.com/hirosystems/clarinet
```

3. Check the project:
```bash
clarinet check
```

4. Run tests:
```bash
clarinet test
```

5. Open Clarinet console:
```bash
clarinet console
```

## Usage Examples

### In Clarinet Console

```clarity
;; Get initial counter value
(contract-call? .TickStx- get-counter)
;; => u0

;; Increment the counter
(contract-call? .TickStx- increment)
;; => (ok u1)

;; Increment again
(contract-call? .TickStx- increment)
;; => (ok u2)

;; Read the counter
(contract-call? .TickStx- get-counter)
;; => u2

;; Decrement the counter
(contract-call? .TickStx- decrement)
;; => (ok u1)

;; Try to decrement below zero (will fail)
(contract-call? .TickStx- decrement)
(contract-call? .TickStx- decrement)
;; => (err u101)

;; Reset as owner
(contract-call? .TickStx- reset)
;; => (ok true)

;; Try to reset as non-owner (will fail)
(as-contract (contract-call? .TickStx- reset))
;; => (err u100)
```

## Testing

The project includes comprehensive unit tests covering:

- Counter increment functionality
- Counter decrement functionality with underflow protection
- Read-only function access
- Owner-only reset functionality
- Fee collection and validation
- Error handling for all edge cases

Run tests with:
```bash
clarinet test
```

## Deployment

### Testnet Deployment

1. Configure your testnet wallet in `settings/Testnet.toml`

2. Deploy to testnet:
```bash
clarinet deployments generate --testnet
clarinet deployments apply --testnet
```

### Mainnet Deployment

1. Configure your mainnet wallet in `settings/Mainnet.toml`

2. Deploy to mainnet:
```bash
clarinet deployments generate --mainnet
clarinet deployments apply --mainnet
```

## Contract Architecture

```
TickSTX Contract
├── Constants
│   ├── CONTRACT_OWNER (principal)
│   ├── OPERATION_FEE (uint - 1 microSTX)
│   └── Error codes (u100-u103)
├── Data Variables
│   └── counter (uint)
├── Public Functions
│   ├── increment()
│   ├── decrement()
│   └── reset()
└── Read-Only Functions
    ├── get-counter()
    └── get-owner()
```

## Fee Structure

| Operation | Fee (STX) | Fee (microSTX) |
|-----------|-----------|----------------|
| Increment | 0.000001  | 1              |
| Decrement | 0.000001  | 1              |
| Reset     | Free      | 0              |
| Read      | Free      | 0              |

Fees are transferred to the contract owner's address.

## Error Codes

| Code | Name | Description |
|------|------|-------------|
| u100 | ERR_UNAUTHORIZED | Caller is not authorized (non-owner trying to reset) |
| u101 | ERR_UNDERFLOW | Cannot decrement counter below zero |
| u102 | ERR_INSUFFICIENT_BALANCE | User doesn't have enough STX to pay fee |
| u103 | ERR_TRANSFER_FAILED | STX transfer failed |

## Security Considerations

1. **Underflow Protection**: Counter cannot go below zero
2. **Access Control**: Only owner can reset the counter
3. **Fee Validation**: Ensures user has sufficient balance before operations
4. **Immutable Owner**: Contract owner is set at deployment and cannot be changed
5. **No Overflow Risk**: Clarity's `uint` type prevents overflow (max value: u340282366920938463463374607431768211455)

## Project Structure

```
TickSTX/
├── contracts/
│   └── TickStx-.clar          # Main counter contract
├── tests/
│   └── TickStx-_test.ts       # Contract tests
├── settings/
│   ├── Devnet.toml            # Local development config
│   ├── Testnet.toml           # Testnet deployment config
│   └── Mainnet.toml           # Mainnet deployment config
├── Clarinet.toml              # Clarinet project config
└── README.md                  # This file
```

## Learning Resources

### Clarity Language
- [Clarity Documentation](https://docs.stacks.co/clarity)
- [Clarity Book](https://book.clarity-lang.org/)
- [Clarity Examples](https://github.com/clarity-lang/examples)

### Stacks Blockchain
- [Stacks Documentation](https://docs.stacks.co/)
- [Stacks Explorer](https://explorer.stacks.co/)

### Development Tools
- [Clarinet Documentation](https://docs.hiro.so/clarinet)
- [Stacks.js](https://github.com/hirosystems/stacks.js)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Clarinet](https://github.com/hirosystems/clarinet)
- Powered by [Stacks Blockchain](https://www.stacks.co/)
- Clarity language by [Hiro Systems](https://www.hiro.so/)

## Support

For questions and support:
- Open an issue on GitHub
- Join the [Stacks Discord](https://discord.gg/stacks)
- Visit [Stacks Forum](https://forum.stacks.org/)

---

**Note**: This is a learning/demonstration contract. For production use, consider additional security audits and testing.
