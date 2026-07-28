// app/prop/page.tsx

'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropPlans from '../components/PropPlans';
import PropRules from '../components/PropRules';
import { Target, TrendingUp, HelpCircle } from 'lucide-react';

export default function PropTradingPage() {
  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      {/* Prop Hero Section */}
      <section className="relative py-24 bg-gradient-dark text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto space-y-6 relative z-10">
          <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-pill">NEXUS CAP INTEL</span>
          <h1 className="text-4xl md:text-6xl font-black text-textLight max-w-4xl mx-auto leading-tight">
            Prop Trading – Trade with NexusPay Capital
          </h1>
          <p className="text-textMuted text-lg md:text-xl font-semibold max-w-2xl mx-auto leading-relaxed">
            Get funded with up to $500,000. Pass our straightforward 2-phase evaluation challenge and keep up to 90% of all profits.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm font-semibold text-textLight">
            <span className="bg-primary/45 px-4 py-2.5 rounded-pill border border-secondary/15 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span>1,200+ Funded Traders</span>
            </span>
            <span className="bg-primary/45 px-4 py-2.5 rounded-pill border border-secondary/15 flex items-center space-x-2">
              <Target className="w-4 h-4 text-accent" />
              <span>$18M+ Total Paid Out</span>
            </span>
            <span className="bg-primary/45 px-4 py-2.5 rounded-pill border border-secondary/15 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-accent" />
              <span>87% Pass Success Rate</span>
            </span>
          </div>
        </div>
      </section>

      {/* Prop Challenge Steps Description Process */}
      <section className="py-20 bg-bgDark relative px-6 border-t border-secondary/10 text-center">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-textLight mb-2">The Evaluation Pathway</h2>
            <p className="text-sm text-textMuted font-semibold">Our systematic evaluation pathway helps prepare and fund professional traders globally.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="bg-primary/20 p-6 rounded-card border border-secondary/10 flex flex-col items-center">
              <span className="text-3xl font-black text-secondary font-mono mb-4">01</span>
              <h4 className="font-bold text-textLight mb-2">Pay Fee</h4>
              <p className="text-xs text-textMuted">Select your desired challenge tier size and process a secure, one-time TRON transaction.</p>
            </div>
            <div className="bg-primary/20 p-6 rounded-card border border-secondary/10 flex flex-col items-center">
              <span className="text-3xl font-black text-secondary font-mono mb-4">02</span>
              <h4 className="font-bold text-textLight mb-2">Phase 1 Challenge</h4>
              <p className="text-xs text-textMuted">Trade carefully on the simulator, observe drawdown protocols, and achieve your 10% target.</p>
            </div>
            <div className="bg-primary/20 p-6 rounded-card border border-secondary/10 flex flex-col items-center">
              <span className="text-3xl font-black text-secondary font-mono mb-4">03</span>
              <h4 className="font-bold text-textLight mb-2">Phase 2 Challenge</h4>
              <p className="text-xs text-textMuted">Establish trading consistency. Complete our simpler second phase target of just 5% profit.</p>
            </div>
            <div className="bg-primary/20 p-6 rounded-card border border-secondary/10 flex flex-col items-center">
              <span className="text-3xl font-black text-accent font-mono mb-4">04</span>
              <h4 className="font-bold text-textLight mb-2">Get Funded</h4>
              <p className="text-xs text-textMuted">Secure login details for your live funded account. Withdraw up to 90% profit shares bi-weekly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans List and Side Comparison */}
      <PropPlans />

      {/* Rules Covenant Checklist */}
      <PropRules />

      <Footer />
    </main>
  );
}
