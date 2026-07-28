// app/components/LiveTicker.tsx

'use client';

import React from 'react';
import { useLivePrices } from '../hooks/useLivePrices';

interface LiveTickerProps {
  onSelectPair?: (symbol: string) => void;
}

export default function LiveTicker({ onSelectPair }: LiveTickerProps) {
  const prices = useLivePrices();

  return (
    <div className="bg-primary/95 border-y border-secondary/20 py-3 overflow-hidden backdrop-blur-md relative z-10">
      <div className="max-w-[1440px] mx-auto flex items-center">
        {/* Infinite marquee wrapper */}
        <div className="w-full overflow-hidden flex whitespace-nowrap group">
          <div className="flex animate-marquee py-1">
            {prices.map((price, idx) => (
              <div
                key={`${price.symbol}-${idx}`}
                onClick={() => onSelectPair && onSelectPair(price.symbol)}
                className="inline-flex items-center space-x-3 mx-8 cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <span className="font-heading font-semibold text-textLight">{price.symbol}</span>
                <span className="font-mono text-sm text-textLight">${price.priceUSD.toLocaleString()}</span>
                <span
                  className={`font-mono text-xs px-1.5 py-0.5 rounded ${
                    price.change24h >= 0 ? 'text-accent bg-accent/10' : 'text-danger bg-danger/10'
                  }`}
                >
                  {price.change24h >= 0 ? '+' : ''}
                  {price.change24h}%
                </span>
              </div>
            ))}
          </div>
          {/* Duplicate for seamless infinite scrolling */}
          <div className="flex animate-marquee py-1" aria-hidden="true">
            {prices.map((price, idx) => (
              <div
                key={`${price.symbol}-dup-${idx}`}
                onClick={() => onSelectPair && onSelectPair(price.symbol)}
                className="inline-flex items-center space-x-3 mx-8 cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <span className="font-heading font-semibold text-textLight">{price.symbol}</span>
                <span className="font-mono text-sm text-textLight">${price.priceUSD.toLocaleString()}</span>
                <span
                  className={`font-mono text-xs px-1.5 py-0.5 rounded ${
                    price.change24h >= 0 ? 'text-accent bg-accent/10' : 'text-danger bg-danger/10'
                  }`}
                >
                  {price.change24h >= 0 ? '+' : ''}
                  {price.change24h}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
