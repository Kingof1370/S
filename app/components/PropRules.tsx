// app/components/PropRules.tsx

'use client';

import React from 'react';
import { Award, Zap, ShieldAlert, CheckCircle } from 'lucide-react';

export default function PropRules() {
  const rules = [
    {
      title: 'Profit Targets',
      desc: 'Phase 1: Achieve a 10% profit target. Phase 2: Achieve a 5% profit target. No time constraints are imposed on either phase.',
    },
    {
      title: 'Daily Loss Limit',
      desc: 'Your equity/balance must not drop by more than 4% from the prior day midnight UTC balance.',
    },
    {
      title: 'Maximum Drawdown',
      desc: 'The total account balance must never fall below 8% of the initial account size balance.',
    },
    {
      title: 'Consistency Rule',
      desc: 'To prevent reckless trading, profit from a single trading day must not exceed 25% of the total profit target requirement.',
    },
    {
      title: 'Scaling Plan',
      desc: 'Pass 3 payouts with profitable records and receive a 20% scale up boost to your total risk capital size (up to $1,000,000 max).',
    },
    {
      title: 'Payout Frequency',
      desc: 'Profit withdrawals are requested and processed every 14 days directly to your TRON wallet, upgradable to weekly payouts.',
    },
  ];

  return (
    <section className="py-20 bg-primary/15 relative px-6 border-t border-secondary/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-pill">EVALUATION COVENANT</span>
          <h2 className="text-3xl md:text-5xl font-black text-textLight">
            Prop Challenge Covenant Rules
          </h2>
          <p className="text-textMuted font-semibold text-lg">
            Read and follow our straightforward, industry-standard risk management covenant guidelines to pass successfully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="bg-bgDark/80 p-8 rounded-card border border-secondary/10 hover:border-secondary/30 shadow-card hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                <h3 className="text-lg font-black text-textLight">{rule.title}</h3>
              </div>
              <p className="text-sm text-textMuted leading-relaxed">{rule.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
