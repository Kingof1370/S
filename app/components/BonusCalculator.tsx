// app/components/BonusCalculator.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Calculator, Flame, Award } from 'lucide-react';

export default function BonusCalculator() {
  const [deposit, setDeposit] = useState(50);
  const [timeLeft, setTimeLeft] = useState('02:34:12');

  // Daily countdown timer resetting at midnight UTC
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const utcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
      const diff = utcMidnight.getTime() - now.getTime();

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const fH = hours.toString().padStart(2, '0');
      const fM = minutes.toString().padStart(2, '0');
      const fS = seconds.toString().padStart(2, '0');

      setTimeLeft(`${fH}:${fM}:${fS}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const bonusAmount = deposit * 2; // 200% welcome bonus multiplier
  const totalAmount = deposit + bonusAmount;

  return (
    <section id="calculator" className="py-20 bg-primary/20 relative px-6 border-t border-secondary/10 overflow-hidden">
      {/* Background Animated Gradients */}
      <div className="absolute -left-40 top-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -right-40 top-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Context / Offer Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-pill text-accent">
            <Flame className="w-4 h-4 text-accent animate-bounce" />
            <span className="text-xs font-bold uppercase tracking-wider">LIMITED TIME OFFER</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-textLight leading-tight">
            🎁 Limited Time:<br />200% Welcome Bonus
          </h2>

          <p className="text-textMuted text-lg leading-relaxed max-w-lg">
            Deposit $50, get $100 FREE. First deposit only. Trade with maximum leverage and instant fee cashback. Leverage your capital up to 3x instantly.
          </p>

          {/* Countdown & Live Claim Counter */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-bgDark/80 p-4 rounded-card border border-secondary/10 flex flex-col justify-center">
              <span className="text-xs text-textMuted uppercase font-bold tracking-wider mb-1">PROMOTION ENDS IN</span>
              <span className="text-2xl font-mono font-bold text-warning">{timeLeft}</span>
            </div>
            <div className="bg-bgDark/80 p-4 rounded-card border border-secondary/10 flex flex-col justify-center">
              <span className="text-xs text-textMuted uppercase font-bold tracking-wider mb-1">CLAIMED TODAY</span>
              <span className="text-2xl font-mono font-bold text-accent">342 Users</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Slider Calculator */}
        <div className="lg:col-span-6 relative">
          <div className="absolute -inset-1 bg-gradient-cta rounded-card blur opacity-30"></div>
          <div className="relative bg-bgDark/90 border border-secondary/20 p-8 rounded-card shadow-card">
            <div className="flex items-center justify-between border-b border-secondary/10 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-secondary" />
                <h4 className="font-bold text-textLight">Interactive Bonus Estimator</h4>
              </div>
              <span className="text-xs font-bold text-accent font-mono bg-accent/10 px-2 py-0.5 rounded-pill">200% Match</span>
            </div>

            {/* Slider control */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-textMuted font-bold">Your Deposit (USD Equivalent)</span>
                  <span className="text-xl font-mono font-extrabold text-secondary">${deposit.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="5000"
                  step="10"
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-xs text-textMuted mt-1">
                  <span>$10</span>
                  <span>$2,500</span>
                  <span>$5,000 (Max)</span>
                </div>
              </div>

              {/* Calculations Display */}
              <div className="grid grid-cols-2 gap-4 border-t border-secondary/10 pt-6">
                <div>
                  <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Free Bonus Match</p>
                  <p className="text-2xl font-mono font-black text-accent">+${bonusAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Total Trading Capital</p>
                  <p className="text-2xl font-mono font-black text-textLight">${totalAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* 3D coin stack simulation representation */}
              <div className="bg-primary/20 p-4 rounded-input border border-secondary/10 flex items-center space-x-4">
                <div className="text-4xl">💰</div>
                <p className="text-xs text-textMuted leading-relaxed">
                  Your capital multiplier will increase by <span className="text-accent font-bold">200%</span> instantly on blockchain network confirmation!
                </p>
              </div>

              <Link
                href={`/auth/register?deposit=${deposit}`}
                className="block w-full text-center bg-gradient-cta hover:shadow-glow text-primary font-black text-lg py-4 rounded-button transition-all transform hover:-translate-y-0.5"
              >
                Claim Your Bonus Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
