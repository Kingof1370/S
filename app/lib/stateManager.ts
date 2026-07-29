// app/lib/stateManager.ts

export interface LedgerEntry {
  date: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'BONUS' | 'TRADE';
  amountUSD: number;
  amountTRX: number;
  status: 'Completed' | 'Pending' | 'Failed';
  txId: string;
}

export interface PortfolioAssets {
  TRX: number;
  BTC: number;
  ETH: number;
}

const DEFAULT_LEDGER: LedgerEntry[] = [
  {
    date: '2026-01-20 11:24',
    type: 'DEPOSIT',
    amountUSD: 50.0,
    amountTRX: 266.8,
    status: 'Completed',
    txId: '98fa7812bc8971f287116719a897262ffb0123cb2fa3972a91298cde726b2aa8',
  },
  {
    date: '2026-01-20 11:25',
    type: 'BONUS',
    amountUSD: 100.0,
    amountTRX: 533.6,
    status: 'Completed',
    txId: 'e8fa7812bc8971f287116719a897262ffb0123cb2fa3972a91298cde726b2ee9',
  },
  {
    date: '2026-01-18 14:12',
    type: 'WITHDRAWAL',
    amountUSD: 150.0,
    amountTRX: 800.4,
    status: 'Completed',
    txId: '42fa7812bc8971f287116719a897262ffb0123cb2fa3972a91298cde726b29f0',
  },
  {
    date: '2026-01-15 09:30',
    type: 'TRADE',
    amountUSD: 2340.0,
    amountTRX: 12486.6,
    status: 'Completed',
    txId: 'c2fa7812bc8971f287116719a897262ffb0123cb2fa3972a91298cde726b25aa',
  },
];

export function getIsDemo(): boolean {
  if (typeof window === 'undefined') return true;
  const val = localStorage.getItem('nexuspay_is_demo');
  return val !== null ? JSON.parse(val) : true;
}

export function setIsDemo(val: boolean) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('nexuspay_is_demo', JSON.stringify(val));
}

export function getLiveBalance(): number {
  if (typeof window === 'undefined') return 8200.00;
  const val = localStorage.getItem('nexuspay_live_balance');
  return val !== null ? parseFloat(val) : 8200.00;
}

export function setLiveBalance(val: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('nexuspay_live_balance', val.toFixed(2));
}

export function getDemoBalance(): number {
  if (typeof window === 'undefined') return 10000.00;
  const val = localStorage.getItem('nexuspay_demo_balance');
  return val !== null ? parseFloat(val) : 10000.00;
}

export function setDemoBalance(val: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('nexuspay_demo_balance', val.toFixed(2));
}

export function getVestedBonus(): number {
  if (typeof window === 'undefined') return 4647.50;
  const val = localStorage.getItem('nexuspay_vested_bonus');
  return val !== null ? parseFloat(val) : 4647.50;
}

export function setVestedBonus(val: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('nexuspay_vested_bonus', val.toFixed(2));
}

export function getCumulativeProfit(): number {
  if (typeof window === 'undefined') return 2340.00;
  const val = localStorage.getItem('nexuspay_cumulative_profit');
  return val !== null ? parseFloat(val) : 2340.00;
}

export function setCumulativeProfit(val: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('nexuspay_cumulative_profit', val.toFixed(2));
}

export function getPortfolioAssets(): PortfolioAssets {
  if (typeof window === 'undefined') return { TRX: 1000, BTC: 0.05, ETH: 0.5 };
  const val = localStorage.getItem('nexuspay_portfolio_assets');
  return val !== null ? JSON.parse(val) : { TRX: 1000, BTC: 0.05, ETH: 0.5 };
}

export function setPortfolioAssets(assets: PortfolioAssets) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('nexuspay_portfolio_assets', JSON.stringify(assets));
}

export function getLedger(): LedgerEntry[] {
  if (typeof window === 'undefined') return DEFAULT_LEDGER;
  const val = localStorage.getItem('nexuspay_ledger');
  return val !== null ? JSON.parse(val) : DEFAULT_LEDGER;
}

export function setLedger(entries: LedgerEntry[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('nexuspay_ledger', JSON.stringify(entries));
}

export function addLedgerEntry(entry: Omit<LedgerEntry, 'date' | 'txId'>) {
  const current = getLedger();
  const dateStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
  const randomTxId = Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');

  const fullEntry: LedgerEntry = {
    ...entry,
    date: dateStr,
    txId: randomTxId,
  };

  setLedger([fullEntry, ...current]);
}
