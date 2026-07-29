// app/hooks/usePropChallenge.ts

import { useState, useEffect } from 'react';
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

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexuspay_prop_challenge');
      if (saved) {
        try {
          setChallenge(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const saveChallenge = (nextState: PropChallengeState) => {
    setChallenge(nextState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexuspay_prop_challenge', JSON.stringify(nextState));
    }
  };

  const simulateTrade = (tradeType: 'PROFIT' | 'LOSS', usdAmount: number) => {
    if (challenge.status === 'FAILED' || challenge.status === 'CLOSED') {
      setNotification('Challenge has already ended.');
      return;
    }

    const multiplier = tradeType === 'PROFIT' ? 1 : -1;
    const amount = usdAmount * multiplier;

    const nextProfit = challenge.currentProfit + amount;
    const nextBalance = challenge.accountSize + nextProfit;
    const nextPeak = Math.max(challenge.peakBalance, nextBalance);
    const nextDays = challenge.tradingDays + 1;

    // Validate progress limits
    const validation = validateChallengeProgress(
      nextProfit,
      nextPeak,
      challenge.accountSize,
      challenge.accountSize * 0.04, // daily loss limit
      challenge.accountSize * 0.08, // max drawdown
      challenge.status
    );

    let nextStatus = challenge.status;
    if (validation.isFailed) {
      nextStatus = 'FAILED';
      setNotification(`Violation detected: ${validation.reason}`);
    } else if (validation.isPassed) {
      if (challenge.status === 'PHASE_1') {
        nextStatus = 'PHASE_2';
        setNotification('Congratulations! You passed Phase 1. Welcome to Phase 2!');
      } else if (challenge.status === 'PHASE_2') {
        nextStatus = 'FUNDED';
        setNotification('Incredible work! You passed evaluation. You are now a Funded Trader!');
      }
    }

    setLastTradeResult({ type: tradeType, amount: usdAmount });

    saveChallenge({
      ...challenge,
      currentProfit: nextProfit,
      peakBalance: nextPeak,
      tradingDays: nextDays,
      status: nextStatus,
    });
  };

  const resetChallenge = () => {
    saveChallenge(initialChallenge);
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
