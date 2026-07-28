// app/lib/constants.ts

export const PROP_PLANS = [
  {
    tier: 'BRONZE',
    name: 'Bronze Plan',
    icon: '🥉',
    accountSize: 10000,
    fee: 99,
    leverage: '1:5',
    profitTarget: '10% (Phase 1) • 5% (Phase 2)',
    dailyLossLimit: '4%',
    maxDrawdown: '8%',
    features: ['✓ Unlimited Time', '✓ 24/7 Support', '✓ 80% Profit Split', '✓ Free Education'],
  },
  {
    tier: 'SILVER',
    name: 'Silver Plan',
    icon: '🥈',
    accountSize: 25000,
    fee: 199,
    leverage: '1:5',
    profitTarget: '10% (Phase 1) • 5% (Phase 2)',
    dailyLossLimit: '4%',
    maxDrawdown: '8%',
    features: ['✓ Unlimited Time', '✓ 24/7 Support', '✓ 80% Profit Split', '✓ Free Education'],
  },
  {
    tier: 'GOLD',
    name: 'Gold Plan',
    icon: '🥇',
    accountSize: 50000,
    fee: 349,
    leverage: '1:5',
    profitTarget: '10% (Phase 1) • 5% (Phase 2)',
    dailyLossLimit: '4%',
    maxDrawdown: '8%',
    popular: true,
    features: ['✓ Unlimited Time', '✓ 24/7 Support', '✓ 80% Profit Split', '✓ Free Education'],
  },
  {
    tier: 'PLATINUM',
    name: 'Platinum Plan',
    icon: '💎',
    accountSize: 100000,
    fee: 599,
    leverage: '1:5',
    profitTarget: '10% (Phase 1) • 5% (Phase 2)',
    dailyLossLimit: '4%',
    maxDrawdown: '8%',
    features: ['✓ Unlimited Time', '✓ 24/7 Support', '✓ 85% Profit Split', '✓ Premium Discord'],
  },
  {
    tier: 'DIAMOND',
    name: 'Diamond Plan',
    icon: '💠',
    accountSize: 200000,
    fee: 999,
    leverage: '1:5',
    profitTarget: '10% (Phase 1) • 5% (Phase 2)',
    dailyLossLimit: '4%',
    maxDrawdown: '8%',
    features: ['✓ Unlimited Time', '✓ 24/7 Support', '✓ 85% Profit Split', '✓ 1-on-1 Mentorship'],
  },
  {
    tier: 'ROYAL',
    name: 'Royal Plan',
    icon: '👑',
    accountSize: 500000,
    fee: 1999,
    leverage: 'Up to 1:2',
    profitTarget: '10% (Phase 1) • 5% (Phase 2)',
    dailyLossLimit: '4%',
    maxDrawdown: '8%',
    features: ['✓ Unlimited Time', '✓ Dedicated Manager', '✓ 90% Profit Split', '✓ Bi-weekly Payouts'],
  },
];

export const TESTIMONIALS_DATA = [
  {
    rating: 5.0,
    name: 'Sarah Johnson',
    location: 'London',
    quote: 'Fastest exchange I\'ve ever used. The 1000% bonus was incredible! Withdrawal took 3 minutes.',
  },
  {
    rating: 4.9,
    name: 'Michael Chen',
    location: 'Manchester',
    quote: 'Security is top-notch. The prop trading challenge was fair and transparent.',
  },
  {
    rating: 5.0,
    name: 'Emma Wilson',
    location: 'Birmingham',
    quote: 'The bonus calculator helped me understand exactly what I was getting. No hidden fees.',
  },
  {
    rating: 4.8,
    name: 'James O\'Brien',
    location: 'Dublin',
    quote: 'Finally a UK-based exchange I can trust. Customer service is excellent.',
  },
  {
    rating: 5.0,
    name: 'Priya Sharma',
    location: 'Leeds',
    quote: 'The 1000% bonus doubled my portfolio. Highly recommended!',
  },
  {
    rating: 4.9,
    name: 'David Smith',
    location: 'Edinburgh',
    quote: 'Trading with NexusPay is smooth and reliable.',
  },
];

export const FAQ_DATA = [
  {
    q: 'How do I claim the 1000% bonus?',
    a: 'Simply register an account, make your first deposit of at least $10 (equivalent TRX), and the 1000% match bonus will be instantly credited to your bonus balance.',
  },
  {
    q: 'Is NexusPay regulated in the UK?',
    a: 'Yes, NexusPay is registered with the FCA (Financial Conduct Authority) under Registration No. 987654321 with headquarters in London.',
  },
  {
    q: 'What are the withdrawal limits?',
    a: 'Withdrawals are quick and secure. Limits are set at $5,000 per day and $25,000 per month from your deposited and earned balances.',
  },
  {
    q: 'How long do withdrawals take?',
    a: 'TRON and other major cryptocurrency withdrawals are fully automated and generally take between 5 to 30 minutes to be processed.',
  },
  {
    q: 'Is my money safe?',
    a: 'Absolutely. We hold 99% of customer funds offline in multi-signature cold storage vaults and support advanced 2FA/security protocols.',
  },
  {
    q: 'Can I trade from outside the UK?',
    a: 'Yes, NexusPay accepts international traders from the UK, Europe, US, Asia, and other select global locations.',
  },
  {
    q: 'What is the minimum deposit?',
    a: 'The minimum deposit amount is just $10 (equivalent in TRON / TRX) with 0% deposit fees.',
  },
  {
    q: 'Does NexusPay charge fees?',
    a: 'We offer 0% deposit fees and zero trading fees on your first 30 trades. Standard withdrawals carry a minimal 1 TRX network fee.',
  },
];
