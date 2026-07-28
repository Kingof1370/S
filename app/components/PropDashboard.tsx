// app/components/PropDashboard.tsx

'use client';

import React, { useState } from 'react';
import { usePropChallenge } from '../hooks/usePropChallenge';
import { TrendingUp, ShieldAlert, Zap, AlertTriangle } from 'lucide-react';

export default function PropDashboard() {
  const initialChallenge = {
    tier: 'GOLD',
    accountSize: 50000,
    feePaid: 349,
    status: 'PHASE_1' as const,
    currentProfit: 3000,
    peakBalance: 53000,
    tradingDays: 3,
    consistencyScore: 92.5,
  };

  const {
    challenge,
    lastTradeResult,
    notification,
    simulateTrade,
    resetChallenge,
  } = usePropChallenge(initialChallenge);

  const [tradeAmount, setTradeAmount] = useState(1000);

  const currentBalance = challenge.accountSize + challenge.currentProfit;
  const targetProfit = challenge.accountSize * (challenge.status === 'PHASE_1' ? 0.10 : 0.05);
  const profitPercentage = Math.min(100, Math.max(0, (challenge.currentProfit / targetProfit) * 100));

  // Daily drawdown metrics
  const maxDrawdownLimit = challenge.accountSize * 0.08;
  const drawdownUsed = Math.max(0, challenge.peakBalance - currentBalance);
  const drawdownPercentage = Math.min(100, (drawdownUsed / maxDrawdownLimit) * 100);

  return (
    <div className="bg-primary/20 border border-secondary/10 rounded-card p-6 md:p-8 max-w-[1200px] mx-auto shadow-card">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-secondary/10 pb-6 mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-textLight flex items-center space-x-2">
            <span>Welcome back, Prop Trader!</span>
          </h2>
          <p className="text-xs text-textMuted uppercase font-bold tracking-widest mt-1">
            Current challenge status: <span className="text-accent">{challenge.status}</span>
          </p>
        </div>
        <button
          onClick={resetChallenge}
          className="bg-primary border border-secondary/20 hover:bg-secondary/15 text-textLight font-bold text-xs px-4 py-2.5 rounded-button transition-all"
        >
          Reset Challenge Simulation
        </button>
      </div>

      {/* Notification banner */}
      {notification && (
        <div className="bg-secondary/15 border-l-4 border-secondary p-4 rounded-input flex items-start space-x-3 mb-8">
          <AlertTriangle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <p className="text-sm font-semibold text-textLight">{notification}</p>
        </div>
      )}

      {/* Stats Cards (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-bgDark p-5 rounded-card border border-secondary/10">
          <span className="text-xs text-textMuted font-bold block mb-1 uppercase tracking-wider">Account Tier</span>
          <p className="text-2xl font-mono font-black text-textLight">{challenge.tier} PLAN</p>
        </div>
        <div className="bg-bgDark p-5 rounded-card border border-secondary/10">
          <span className="text-xs text-textMuted font-bold block mb-1 uppercase tracking-wider">Total Balance</span>
          <p className="text-2xl font-mono font-black text-accent">${currentBalance.toLocaleString()}</p>
        </div>
        <div className="bg-bgDark p-5 rounded-card border border-secondary/10">
          <span className="text-xs text-textMuted font-bold block mb-1 uppercase tracking-wider">Net Profit</span>
          <p className="text-2xl font-mono font-black text-secondary">${challenge.currentProfit.toLocaleString()}</p>
        </div>
        <div className="bg-bgDark p-5 rounded-card border border-secondary/10">
          <span className="text-xs text-textMuted font-bold block mb-1 uppercase tracking-wider">Days Traded</span>
          <p className="text-2xl font-mono font-black text-textLight">{challenge.tradingDays} / 5 Days</p>
        </div>
      </div>

      {/* Progress metrics and trade controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Progress Gauges */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-lg font-bold text-textLight mb-4">Challenge Covenant Limits</h3>

          {/* Profit target meter */}
          <div className="space-y-2 bg-bgDark/80 p-5 rounded-card border border-secondary/10">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-textMuted uppercase tracking-wider">Profit Target Progress</span>
              <span className="text-sm font-mono font-bold text-accent">
                ${challenge.currentProfit.toLocaleString()} / ${targetProfit.toLocaleString()} ({profitPercentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-primary/40 h-3 rounded-pill overflow-hidden">
              <div
                className="bg-gradient-primary h-full transition-all duration-500 rounded-pill"
                style={{ width: `${profitPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Daily Drawdown Gauge */}
          <div className="space-y-2 bg-bgDark/80 p-5 rounded-card border border-secondary/10">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-textMuted uppercase tracking-wider">Overall Max Drawdown Limit</span>
              <span className="text-sm font-mono font-bold text-danger">
                ${drawdownUsed.toLocaleString()} / ${maxDrawdownLimit.toLocaleString()} ({drawdownPercentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-primary/40 h-3 rounded-pill overflow-hidden">
              <div
                className="bg-danger h-full transition-all duration-500 rounded-pill"
                style={{ width: `${drawdownPercentage}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-textMuted">
              Warning: If balance falls below 8% limit, the evaluation challenge will fail immediately.
            </p>
          </div>
        </div>

        {/* Trade execution simulation panel */}
        <div className="lg:col-span-5 bg-bgDark/90 p-6 rounded-card border border-secondary/15">
          <div className="flex items-center space-x-2 border-b border-secondary/10 pb-4 mb-4">
            <Zap className="w-5 h-5 text-accent animate-pulse" />
            <h4 className="font-bold text-textLight">Interactive Trade Simulator</h4>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Trade Size (USD Equivalent)</label>
              <input
                type="number"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(Math.max(10, Number(e.target.value)))}
                className="w-full bg-primary border border-secondary/20 rounded-input p-3 font-mono font-semibold text-textLight focus:outline-none focus:border-accent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => simulateTrade('PROFIT', tradeAmount)}
                disabled={challenge.status === 'FAILED' || challenge.status === 'CLOSED'}
                className="w-full bg-accent hover:bg-accent/90 hover:shadow-glow text-primary font-black py-3 rounded-button transition-all disabled:opacity-40"
              >
                Long (Profit)
              </button>
              <button
                onClick={() => simulateTrade('LOSS', tradeAmount)}
                disabled={challenge.status === 'FAILED' || challenge.status === 'CLOSED'}
                className="w-full bg-danger hover:bg-danger/90 text-textLight font-black py-3 rounded-button transition-all disabled:opacity-40"
              >
                Short (Loss)
              </button>
            </div>

            {lastTradeResult && (
              <div className="bg-primary/20 p-3 rounded-input text-center text-xs font-semibold mt-4 border border-secondary/10">
                Last execution:{' '}
                <span className={lastTradeResult.type === 'PROFIT' ? 'text-accent' : 'text-danger'}>
                  {lastTradeResult.type === 'PROFIT' ? '+' : '-'}${lastTradeResult.amount.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
