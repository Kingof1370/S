import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SQLite database...');

  // 1. Delete existing records
  await prisma.priceCache.deleteMany({});
  await prisma.systemSetting.deleteMany({});
  await prisma.adminLog.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.propPayout.deleteMany({});
  await prisma.propTransaction.deleteMany({});
  await prisma.propChallenge.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.loginAttempt.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Generate hashed passwords
  const adminPasswordHash = await bcrypt.hash('AdminPassword123!', 12);
  const userPasswordHash = await bcrypt.hash('UserPassword123!', 12);

  // 3. Create Admin User
  const admin = await prisma.user.create({
    data: {
      email: 'admin@nexuspay.io',
      firstName: 'Nexus',
      lastName: 'Admin',
      password: adminPasswordHash,
      tronAddress: 'TY67Wn8G7LhYj6g67SdaD78saH7Gdf9asD',
      role: 'ADMIN',
      isVerified: true,
      kycStatus: 'VERIFIED',
      referralCode: 'NP-ADMIN-2026',
    },
  });
  console.log('Admin user seeded:', admin.email);

  // 4. Create Mock Standard Users
  const user1 = await prisma.user.create({
    data: {
      email: 'trader1@nexuspay.io',
      firstName: 'Sarah',
      lastName: 'Johnson',
      password: userPasswordHash,
      tronAddress: 'TL87pX9Z7LhYj6g67SdaD78saH7Gdf2sdC',
      depositBalance: 8200.0,
      bonusBalance: 4647.5,
      totalDeposited: 12847.5,
      totalWithdrawn: 1500.0,
      totalProfit: 2340.0,
      isVerified: true,
      role: 'USER',
      kycStatus: 'VERIFIED',
      referralCode: 'NP-SARAH-55',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'trader2@nexuspay.io',
      firstName: 'Michael',
      lastName: 'Chen',
      password: userPasswordHash,
      tronAddress: 'TX77vB3D7LhYj6g67SdaD78saH7Gdf3sdS',
      depositBalance: 1500.0,
      bonusBalance: 15000.0,
      totalDeposited: 1500.0,
      totalWithdrawn: 0,
      totalProfit: 450.0,
      isVerified: true,
      role: 'USER',
      kycStatus: 'VERIFIED',
      referralCode: 'NP-MIKE-88',
    },
  });

  console.log('Mock standard users seeded.');

  // 5. Create System Settings
  const settings = await prisma.systemSetting.create({
    data: {
      bonusMultiplier: 10,
      minDepositForBonus: 10,
      maxBonus: 50000,
      minWithdrawal: 10,
      maxWithdrawalDaily: 5000,
      maxWithdrawalMonthly: 25000,
      networkFeeTRX: 1,
      defaultProfitSplit: 80,
      payoutFrequencyDays: 14,
      scalingEnabled: true,
      scalingPercentage: 20,
      scalingMaxCapital: 1000000,
      maxLoginAttempts: 5,
      sessionTimeoutMinutes: 60,
      twoFactorRequired: true,
      maintenanceMode: false,
    },
  });
  console.log('System settings seeded.');

  // 6. Seed Price Caches
  const prices = [
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

  for (const price of prices) {
    await prisma.priceCache.create({ data: price });
  }
  console.log('Live prices cache seeded.');

  // 7. Seed transactions for user1
  await prisma.transaction.create({
    data: {
      userId: user1.id,
      type: 'DEPOSIT',
      amountUSD: 50.0,
      amountTRX: 266.8,
      status: 'CONFIRMED',
      confirmations: 19,
      isFirstDeposit: true,
      bonusApplied: true,
      description: 'Initial deposit via TRON',
      tronAddress: user1.tronAddress,
    },
  });

  await prisma.transaction.create({
    data: {
      userId: user1.id,
      type: 'BONUS',
      amountUSD: 500.0,
      status: 'CONFIRMED',
      confirmations: 19,
      bonusApplied: true,
      description: '200% Welcome Bonus Credit',
    },
  });

  // 8. Seed Prop Challenges
  const propChallenge = await prisma.propChallenge.create({
    data: {
      userId: user2.id,
      tier: 'GOLD',
      accountSize: 50000,
      feePaid: 349,
      status: 'PHASE_1',
      profitTarget: 5000,
      dailyLossLimit: 2000,
      maxDrawdown: 4000,
      minTradingDays: 5,
      currentProfit: 3000,
      peakBalance: 53000,
      tradingDays: 3,
      consistencyScore: 92.5,
      isConsistent: true,
    },
  });

  // Add mock prop transactions
  await prisma.propTransaction.create({
    data: {
      challengeId: propChallenge.id,
      type: 'PROFIT',
      amount: 1200,
      status: 'CONFIRMED',
      description: 'Long BTC/USD trade setup',
    },
  });

  await prisma.propTransaction.create({
    data: {
      challengeId: propChallenge.id,
      type: 'PROFIT',
      amount: 1800,
      status: 'CONFIRMED',
      description: 'Long ETH/USD trade setup',
    },
  });

  console.log('Prop challenge mock data seeded.');
  console.log('SQLite database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
