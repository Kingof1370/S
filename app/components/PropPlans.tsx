// app/components/PropPlans.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { PROP_PLANS } from '../lib/constants';
import { Check, Star, Info, HelpCircle } from 'lucide-react';

export default function PropPlans() {
  return (
    <section className="py-20 bg-bgDark relative px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-pill">CHOOSE YOUR CHALLENGE</span>
          <h2 className="text-3xl md:text-5xl font-black text-textLight">
            Select Your Funding Tier
          </h2>
          <p className="text-textMuted font-semibold text-lg">
            Pay a low, one-time fully refundable evaluation fee. Achieve the target and start trading our risk capital.
          </p>
        </div>

        {/* 6 Plans Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {PROP_PLANS.map((plan) => (
            <div
              key={plan.tier}
              className={`bg-primary/25 border rounded-card p-8 relative flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 shadow-card ${
                plan.popular ? 'border-accent shadow-glow bg-primary/35' : 'border-secondary/15'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 right-6 bg-gradient-primary text-primary text-xs font-black px-4 py-1.5 rounded-pill uppercase tracking-wider flex items-center space-x-1">
                  <Star className="w-3 h-3 text-primary fill-primary" />
                  <span>BEST VALUE</span>
                </span>
              )}

              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-4xl">{plan.icon}</span>
                  <span className="text-xs font-mono font-black tracking-widest text-textMuted bg-primary/60 px-2.5 py-1 rounded-pill uppercase">
                    {plan.tier}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-textLight mb-2">{plan.name}</h3>
                <p className="text-3xl font-mono font-black text-secondary mb-1">
                  ${plan.accountSize.toLocaleString()}
                </p>
                <p className="text-xs text-textMuted font-semibold uppercase tracking-wider mb-6">
                  Evaluation size capital
                </p>

                <div className="bg-bgDark/60 rounded-input p-4 border border-secondary/10 space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-textMuted">One-time Evaluation Fee</span>
                    <span className="text-textLight font-mono">${plan.fee}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-textMuted">Max Leverage Limit</span>
                    <span className="text-textLight font-mono">{plan.leverage}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-textMuted">Drawdown limit (Overall)</span>
                    <span className="text-danger font-mono">{plan.maxDrawdown}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="text-xs text-accent font-bold uppercase tracking-wider">Plan Highlights:</li>
                  <li className="text-sm font-semibold text-textLight/90 flex items-center space-x-2">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Target: {plan.profitTarget}</span>
                  </li>
                  <li className="text-sm font-semibold text-textLight/90 flex items-center space-x-2">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Daily Max Loss: {plan.dailyLossLimit}</span>
                  </li>
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="text-sm text-textMuted flex items-center space-x-2">
                      <Check className="w-4 h-4 text-secondary shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/prop/register/${plan.tier.toLowerCase()}`}
                className={`block w-full text-center font-black py-4 rounded-button transition-all transform hover:-translate-y-0.5 ${
                  plan.popular
                    ? 'bg-gradient-cta text-primary hover:shadow-glow'
                    : 'bg-primary border border-secondary/20 text-textLight hover:bg-secondary/10'
                }`}
              >
                Start Challenge – ${plan.fee}
              </Link>
            </div>
          ))}
        </div>

        {/* Responsive Side-By-Side Comparison Table */}
        <div className="border-t border-secondary/15 pt-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="text-2xl font-black text-textLight mb-2">Compare Challenge Details</h3>
            <p className="text-sm text-textMuted font-semibold">Evaluate target distributions, daily drawing buffers, and profit share configurations.</p>
          </div>

          <div className="overflow-x-auto rounded-card border border-secondary/15 shadow-card bg-primary/10">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-primary/45 border-b border-secondary/15 text-textLight font-heading text-xs font-black uppercase tracking-wider">
                  <th className="p-6">Plan details</th>
                  <th className="p-6">Capital size</th>
                  <th className="p-6">One-time Fee</th>
                  <th className="p-6">Leverage</th>
                  <th className="p-6">Overall drawdown</th>
                  <th className="p-6">Daily Loss limit</th>
                  <th className="p-6">Profit split</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/10 text-sm font-semibold">
                {PROP_PLANS.map((plan) => (
                  <tr
                    key={plan.tier}
                    className={`hover:bg-primary/20 transition-colors ${
                      plan.popular ? 'bg-accent/5' : ''
                    }`}
                  >
                    <td className="p-6 flex items-center space-x-3">
                      <span className="text-2xl">{plan.icon}</span>
                      <div>
                        <p className="font-bold text-textLight">{plan.name}</p>
                        {plan.popular && <span className="text-[10px] bg-accent/20 text-accent font-bold px-1.5 py-0.5 rounded uppercase">Best Value</span>}
                      </div>
                    </td>
                    <td className="p-6 text-textLight font-mono">${plan.accountSize.toLocaleString()}</td>
                    <td className="p-6 text-secondary font-mono">${plan.fee}</td>
                    <td className="p-6 text-textMuted font-mono">{plan.leverage}</td>
                    <td className="p-6 text-danger font-mono">{plan.maxDrawdown}</td>
                    <td className="p-6 text-danger font-mono">{plan.dailyLossLimit}</td>
                    <td className="p-6 text-accent font-mono">
                      {plan.tier === 'ROYAL' ? '90%' : plan.tier === 'PLATINUM' || plan.tier === 'DIAMOND' ? '85%' : '80%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
