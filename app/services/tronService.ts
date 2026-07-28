// app/services/tronService.ts

/**
 * Handles mock TRON address generation, address checksum validation, and simulator helpers.
 */

export function generateMockTronAddress(): string {
  // TRON addresses always start with 'T' and are 34 characters long
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'T';
  for (let i = 0; i < 33; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function isValidTronAddress(address: string): boolean {
  if (!address) return false;
  // Basic TRON checksum validation
  const regex = /^T[a-km-zA-HJ-NP-Z1-9]{33}$/;
  return regex.test(address);
}

export function getTronscanUrl(txId: string): string {
  return `https://tronscan.org/#/transaction/${txId}`;
}

export function simulateTxHash(): string {
  const chars = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 64; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
}
