// app/services/priceService.ts

/**
 * Handles mock or live prices, percentage changes, and cached crypto symbols.
 */

export interface CryptoPrice {
  symbol: string;
  priceUSD: number;
  change24h: number;
  volume24h: number;
}

const DEFAULT_PRICES: CryptoPrice[] = [
  { symbol: 'BTC/USD', priceUSD: 98450.25, change24h: 3.45, volume24h: 35000000 },
  { symbol: 'ETH/USD', priceUSD: 3420.80, change24h: -1.20, volume24h: 18000000 },
  { symbol: 'TRX/USD', priceUSD: 0.1874, change24h: 5.82, volume24h: 4200000 },
  { symbol: 'USDT/USD', priceUSD: 1.0002, change24h: 0.01, volume24h: 45000000 },
  { symbol: 'XRP/USD', priceUSD: 2.14, change24h: 12.45, volume24h: 12000000 },
  { symbol: 'ADA/USD', priceUSD: 0.82, change24h: -2.31, volume24h: 2100000 },
  { symbol: 'DOT/USD', priceUSD: 5.45, change24h: 1.15, volume24h: 890000 },
  { symbol: 'LINK/USD', priceUSD: 18.25, change24h: 4.88, volume24h: 1500000 },
  { symbol: 'SOL/USD', priceUSD: 215.60, change24h: 8.92, volume24h: 9800000 },
  { symbol: 'MATIC/USD', priceUSD: 0.62, change24h: -0.45, volume24h: 670000 },
];

export function getCachedPrices(): CryptoPrice[] {
  return DEFAULT_PRICES;
}

export function convertUSDToTRX(usdAmount: number, trxPrice: number = 0.1874): number {
  return parseFloat((usdAmount / trxPrice).toFixed(4));
}

export function convertTRXToUSD(trxAmount: number, trxPrice: number = 0.1874): number {
  return parseFloat((trxAmount * trxPrice).toFixed(2));
}
