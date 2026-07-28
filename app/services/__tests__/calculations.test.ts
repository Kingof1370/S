// app/services/__tests__/calculations.test.ts

import { calculateWelcomeBonus, validateBonusEligibility } from '../bonusService';
import { convertUSDToTRX, convertTRXToUSD } from '../priceService';
import { validateChallengeProgress } from '../propService';

describe('NEXUSPAY Calculation & Verification Covenants', () => {
  test('Bonus Calculator correctly applies 1000% welcome match', () => {
    const result = calculateWelcomeBonus(50);
    expect(result.deposit).toBe(50);
    expect(result.bonus).toBe(500);
    expect(result.total).toBe(550);
  });

  test('Bonus Eligibility allows first-time deposits over $10', () => {
    expect(validateBonusEligibility(true, 50)).toBe(true);
    expect(validateBonusEligibility(false, 50)).toBe(false);
    expect(validateBonusEligibility(true, 5)).toBe(false);
  });

  test('Exchange rate conversions translate between TRX and USD correctly', () => {
    const usd = 50;
    const rate = 0.20;
    const trx = convertUSDToTRX(usd, rate);
    expect(trx).toBe(250);

    const backToUSD = convertTRXToUSD(trx, rate);
    expect(backToUSD).toBe(50);
  });

  test('Prop Challenge detects daily loss threshold violation (> 4%)', () => {
    // gold account size 50,000, daily loss threshold is 4% which is $2000
    // If net profit drops to -$2100, they violate daily limit.
    const validation = validateChallengeProgress(
      -2100,
      50000,
      50000,
      2000,
      4000,
      'PHASE_1'
    );
    expect(validation.isFailed).toBe(true);
    expect(validation.reason).toContain('Daily loss limit');
  });

  test('Prop Challenge detects overall drawdown violation (> 8%)', () => {
    // Gold account size 50,000, max drawdown limit is 8% ($4000)
    // If peak balance was 53,000 and current balance is 48,000, drawdown from peak is $5000.
    const validation = validateChallengeProgress(
      -2000, // currentProfit is -$2000 (current balance is 48,000)
      53000, // peak balance
      50000, // account size
      2000,
      4000,
      'PHASE_1'
    );
    expect(validation.isFailed).toBe(true);
    expect(validation.reason).toContain('overall drawdown');
  });

  test('Prop Challenge detects passing milestones correctly', () => {
    // Gold account size 50,000, Phase 1 target is 10% ($5000)
    const validation = validateChallengeProgress(
      5200,
      55200,
      50000,
      2000,
      4000,
      'PHASE_1'
    );
    expect(validation.isPassed).toBe(true);
    expect(validation.isFailed).toBe(false);
  });
});
