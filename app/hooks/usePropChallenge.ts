// app/hooks/usePropChallenge.ts

import { useState } from 'react';
import { validateChallengeProgress } from '../services/propService';

export interface PropChallengeState {
  tier: string;
  accountSize: number;
  feePaid: number;
  status: 'PHASE_1' | 'PHASE_2' | 'FUNDED' | 'FAILED' | 'CLOSED';
  currentProfit: number;
  peakBalance: number;
  tradingDays: number;
  consistencyScore: number;
}

export function usePropChallenge(initialChallenge: PropChallengeState) {
  const [challenge, setChallenge] = useState<PropChallengeState>(initialChallenge);
  const [lastTradeResult, setLastTradeResult] = useState<{ type: 'PROFIT' | 'LOSS'; amount: number } | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const simulateTrade = (tradeType: 'PROFIT' | 'LOSS', usdAmount: number) => {
    if (challenge.status === 'FAILED' || challenge.status === 'CLOSED') {
      setNotification('Challenge has already ended.');
      return;
    }

    const multiplier = tradeType === 'PROFIT' ? 1 : -1;
    const amount = usdAmount * multiplier;

    setChallenge((prev) => {
      const nextProfit = prev.currentProfit + amount;
      const nextBalance = prev.accountSize + nextProfit;
      const nextPeak = Math.max(prev.peakBalance, nextBalance);
      const nextDays = prev.tradingDays + 1;

      // Validate progress limits
      const validation = validateChallengeProgress(
        nextProfit,
        nextPeak,
        prev.accountSize,
        prev.accountSize * 0.04, // daily loss limit
        prev.accountSize * 0.08, // max drawdown
        prev.status
      );

      let nextStatus = prev.status;
      if (validation.isFailed) {
        nextStatus = 'FAILED';
        setNotification(`Violation detected: ${validation.reason}`);
      } else if (validation.isPassed) {
        if (prev.status === 'PHASE_1') {
          nextStatus = 'PHASE_2';
          setNotification('Congratulations! You passed Phase 1. Welcome to Phase 2!');
        } else if (prev.status === 'PHASE_2') {
          nextStatus = 'FUNDED';
          setNotification('Incredible work! You passed evaluation. You are now a Funded Trader!');
        }
      }

      setLastTradeResult({ type: tradeType, amount: usdAmount });

      return {
        ...prev,
        currentProfit: nextProfit,
        peakBalance: nextPeak,
        tradingDays: nextDays,
        status: nextStatus,
      };
    });
  };

  const resetChallenge = () => {
    setChallenge(initialChallenge);
    setLastTradeResult(null);
    setNotification(null);
  };

  return {
    challenge,
    lastTradeResult,
    notification,
    simulateTrade,
    resetChallenge,
  };
}
