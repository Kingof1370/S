// app/hooks/useLivePrices.ts

import { useState, useEffect } from 'react';
import { getCachedPrices, fetchLivePrices, CryptoPrice } from '../services/priceService';

export function useLivePrices() {
  const [prices, setPrices] = useState<CryptoPrice[]>(getCachedPrices());

  useEffect(() => {
    // Initial fetch
    fetchLivePrices().then(setPrices).catch(() => {});

    // Poll live prices every 10 seconds to keep UI responsive and sync with global markets
    const interval = setInterval(async () => {
      try {
        const livePrices = await fetchLivePrices();
        setPrices(livePrices);
      } catch (e) {
        // Fallback or keep current state
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return prices;
}
