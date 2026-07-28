// app/hooks/useLivePrices.ts

import { useState, useEffect } from 'react';
import { getCachedPrices, CryptoPrice } from '../services/priceService';

export function useLivePrices() {
  const [prices, setPrices] = useState<CryptoPrice[]>(getCachedPrices());

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time price fluctuations
      setPrices((prev) =>
        prev.map((p) => {
          if (p.symbol === 'USDT/USD') return p; // USDT stays stable
          const fluctuationPercent = (Math.random() - 0.5) * 0.002; // max 0.1% fluctuation
          const newPrice = p.priceUSD * (1 + fluctuationPercent);
          const change24hPercent = p.change24h + (Math.random() - 0.5) * 0.05;
          return {
            ...p,
            priceUSD: parseFloat(newPrice.toFixed(p.priceUSD < 1 ? 4 : 2)),
            change24h: parseFloat(change24hPercent.toFixed(2)),
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return prices;
}
