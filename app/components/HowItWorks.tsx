// app/components/HowItWorks.tsx

'use client';

import React from 'react';
import { UserPlus, ArrowRight, Wallet, Gift } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="py-20 bg-bgDark relative px-6 border-t border-secondary/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-textLight">
            Start Trading in 3 Simple Steps
          </h2>
          <p className="text-textMuted font-semibold">
            Supercharge your cryptocurrency journey. Set up your account, fund with TRON, and claim your massive welcome bonus instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Animated linking dotted line (desktop only) */}
          <div className="hidden md:block absolute top-[28%] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-secondary/20 z-0"></div>

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center space-y-4 relative z-10 bg-primary/20 p-8 rounded-card border border-secondary/10 hover:border-secondary/35 transition-all">
            <div className="w-16 h-16 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center font-bold text-textLight text-xl relative">
              <UserPlus className="w-6 h-6 text-secondary" />
              <span className="absolute -top-1 -right-1 bg-accent text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">1</span>
            </div>
            <h3 className="text-lg font-bold text-textLight">Create Account</h3>
            <p className="text-sm text-textMuted max-w-xs">
              2-minute fast setup. Fill out your details, verify your email, and prepare to trade with premium security features.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center space-y-4 relative z-10 bg-primary/20 p-8 rounded-card border border-secondary/10 hover:border-secondary/35 transition-all">
            <div className="w-16 h-16 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center font-bold text-textLight text-xl relative">
              <Wallet className="w-6 h-6 text-secondary" />
              <span className="absolute -top-1 -right-1 bg-accent text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">2</span>
            </div>
            <h3 className="text-lg font-bold text-textLight">Deposit TRON</h3>
            <p className="text-sm text-textMuted max-w-xs">
              Generate your unique TRON deposit address. Transfer TRX with zero deposit fees in less than 60 seconds.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center space-y-4 relative z-10 bg-primary/20 p-8 rounded-card border border-secondary/10 hover:border-secondary/35 transition-all">
            <div className="w-16 h-16 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center font-bold text-textLight text-xl relative">
              <Gift className="w-6 h-6 text-secondary" />
              <span className="absolute -top-1 -right-1 bg-accent text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">3</span>
            </div>
            <h3 className="text-lg font-bold text-textLight">Get 1000% Bonus</h3>
            <p className="text-sm text-textMuted max-w-xs">
              Your 1000% match bonus is automatically credited to your balance instantly upon your first successful deposit!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
