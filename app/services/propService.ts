// app/services/propService.ts

import { PROP_PLANS } from '../lib/constants';

/**
 * Calculations and validators for Prop Trading challenges.
 */

export function getPropPlanByTier(tier: string) {
  return PROP_PLANS.find((plan) => plan.tier === tier.toUpperCase()) || PROP_PLANS[2]; // defaults to gold
}

export function validateChallengeProgress(
  currentProfit: number,
  peakBalance: number,
  accountSize: number,
  dailyLossLimit: number,
  maxDrawdown: number,
  status: string
): {
  isFailed: boolean;
  isPassed: boolean;
  reason?: string;
} {
  const currentBalance = accountSize + currentProfit;

  // Calculate daily loss limit violation (using peakBalance as reference)
  const currentDrawdownFromPeak = peakBalance - currentBalance;
  if (currentDrawdownFromPeak >= maxDrawdown) {
    return {
      isFailed: true,
      isPassed: false,
      reason: `Maximum overall drawdown limit of $${maxDrawdown} reached.`,
    };
  }

  // Calculate daily drawdown (standard daily threshold 4%)
  const dailyThreshold = accountSize * 0.04;
  if (currentProfit < -dailyThreshold) {
    return {
      isFailed: true,
      isPassed: false,
      reason: `Daily loss limit of 4% ($${dailyThreshold}) exceeded.`,
    };
  }

  // Check profit targets
  const targetPercent = status === 'PHASE_1' ? 0.10 : 0.05;
  const profitTargetAmount = accountSize * targetPercent;

  if (currentProfit >= profitTargetAmount) {
    return {
      isFailed: false,
      isPassed: true,
    };
  }

  return {
    isFailed: false,
    isPassed: false,
  };
}
