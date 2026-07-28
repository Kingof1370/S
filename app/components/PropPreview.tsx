// app/components/PropPreview.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, ShieldCheck, TrendingUp, Cpu } from 'lucide-react';
import { PROP_PLANS } from '../lib/constants';

export default function PropPreview() {
  // Show popular ones (Bronze, Gold, Diamond)
  const previewPlans = [PROP_PLANS[0], PROP_PLANS[2], PROP_PLANS[4]];

  return (
    <section className="py-20 bg-bgDark border-t border-secondary/10 px-6 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-radial-gradient from-secondary/5 to-transparent pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-pill text-secondary">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">NEXUS CAP PRO TRADER</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-textLight">
              💎 Prop Trading – Trade with Our Capital
            </h2>
            <p className="text-textMuted font-semibold text-lg">
              Pass our simple 2-phase evaluation to access up to $500,000 in trading capital and retain up to 90% of all profits.
            </p>
          </div>
          <Link
            href="/prop"
            className="inline-flex items-center space-x-2 bg-secondary hover:bg-secondary/90 hover:shadow-glow text-textLight font-bold px-6 py-3 rounded-button transition-all transform hover:-translate-y-0.5"
          >
            <span>View All 6 Plans</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-primary/20 border border-secondary/10 p-5 rounded-card text-center">
            <span className="text-xs font-bold text-textMuted uppercase block mb-1">Available Tiers</span>
            <span className="text-2xl font-mono font-black text-accent">6 Plans</span>
          </div>
          <div className="bg-primary/20 border border-secondary/10 p-5 rounded-card text-center">
            <span className="text-xs font-bold text-textMuted uppercase block mb-1">Challenge Fee</span>
            <span className="text-2xl font-mono font-black text-secondary">From $99</span>
          </div>
          <div className="bg-primary/20 border border-secondary/10 p-5 rounded-card text-center">
            <span className="text-xs font-bold text-textMuted uppercase block mb-1">Funding Capital</span>
            <span className="text-2xl font-mono font-black text-accent">Up to $500k</span>
          </div>
          <div className="bg-primary/20 border border-secondary/10 p-5 rounded-card text-center">
            <span className="text-xs font-bold text-textMuted uppercase block mb-1">Profit Distribution</span>
            <span className="text-2xl font-mono font-black text-secondary">80-90% Split</span>
          </div>
        </div>

        {/* 3 Featured Plans Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewPlans.map((plan) => (
            <div
              key={plan.tier}
              className={`bg-primary/20 border relative rounded-card p-8 flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 shadow-card ${
                plan.popular ? 'border-accent/50 shadow-glow bg-primary/30' : 'border-secondary/15'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 right-6 bg-accent text-primary text-xs font-black px-3 py-1 rounded-pill uppercase tracking-widest border border-primary/20">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-3xl">{plan.icon}</span>
                  <span className="text-xs font-black tracking-widest text-textMuted uppercase">
                    {plan.tier} PLAN
                  </span>
                </div>

                <h3 className="text-2xl font-black text-textLight mb-2">{plan.name}</h3>
                <p className="text-3xl font-mono font-bold text-secondary mb-6">
                  ${plan.accountSize.toLocaleString()}{' '}
                  <span className="text-xs text-textMuted font-sans">Account Size</span>
                </p>

                <hr className="border-secondary/10 my-4" />

                <ul className="space-y-3 mb-8">
                  <li className="text-sm font-semibold text-textMuted flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span>Target: {plan.profitTarget}</span>
                  </li>
                  <li className="text-sm font-semibold text-textMuted flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>Max Loss: {plan.maxDrawdown} ({plan.dailyLossLimit} Daily)</span>
                  </li>
                  {plan.features.slice(0, 2).map((feat, idx) => (
                    <li key={idx} className="text-sm text-textLight/90 flex items-center space-x-2">
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/prop/register/${plan.tier.toLowerCase()}`}
                className={`block w-full text-center font-bold py-3 rounded-button transition-all ${
                  plan.popular
                    ? 'bg-gradient-primary text-primary hover:shadow-glow'
                    : 'bg-primary border border-secondary/30 text-textLight hover:bg-secondary/10'
                }`}
              >
                Start Challenge – ${plan.fee}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
