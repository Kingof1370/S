// app/services/bonusService.ts

/**
 * Calculations and validators for the 200% welcome bonus.
 */

export function calculateWelcomeBonus(depositAmount: number): {
  deposit: number;
  bonus: number;
  total: number;
} {
  const bonusMultiplier = 2; // 200% Match
  const bonus = depositAmount * bonusMultiplier;
  return {
    deposit: depositAmount,
    bonus,
    total: depositAmount + bonus,
  };
}

export function validateBonusEligibility(isFirstDeposit: boolean, amountUSD: number): boolean {
  return isFirstDeposit && amountUSD >= 10;
}
