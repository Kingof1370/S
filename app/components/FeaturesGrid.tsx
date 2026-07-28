// app/components/FeaturesGrid.tsx

'use client';

import React from 'react';
import { Zap, DollarSign, Clock, Smartphone, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: 'Instant Deposits',
      desc: 'TRON deposits are credited automatically in 60 seconds or less with 19 blockchain confirmation checks.',
    },
    {
      icon: <DollarSign className="w-8 h-8 text-secondary" />,
      title: 'Zero Trading Fees',
      desc: 'Pay zero fees on your first 30 trades. No hidden commission charges or markups afterwards.',
    },
    {
      icon: <Clock className="w-8 h-8 text-accent" />,
      title: '24/7 Withdrawals',
      desc: 'Withdraw your standard earnings instantly with zero manual delay and a guaranteed 5-30 minute completion rate.',
    },
    {
      icon: <Smartphone className="w-8 h-8 text-secondary" />,
      title: 'Mobile App',
      desc: 'Native iOS and Android crypto trading application launching Q3 2026. Keep trading on the move.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
      title: 'Advanced Security',
      desc: 'Equipped with Google 2FA Authenticator support, AES-256 session token encryption, and audit logs.',
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-secondary" />,
      title: 'Dedicated Support',
      desc: 'Access professional UK-based support available 24/7 via live web chat, ticket channels, and email.',
    },
  ];

  return (
    <section className="py-20 bg-bgDark relative px-6 border-t border-secondary/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-textLight">
            High-Performance Infrastructure
          </h2>
          <p className="text-textMuted font-semibold">
            We provide institutional grade latency, robust liquidity buffers, and advanced trade matching algorithms to guarantee smooth transactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <div
              key={index}
              className="bg-primary/20 hover:bg-primary/30 border border-secondary/10 hover:border-accent/30 rounded-card p-8 shadow-card hover:shadow-hover transition-all duration-300 flex flex-col space-y-4 hover:-translate-y-1 transform"
            >
              <div className="p-3 bg-bgDark/80 rounded-input w-fit border border-secondary/15">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-textLight">{feat.title}</h3>
              <p className="text-sm text-textMuted leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
