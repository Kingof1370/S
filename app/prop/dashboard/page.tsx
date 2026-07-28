// app/prop/dashboard/page.tsx

'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PropDashboard from '../../components/PropDashboard';

export default function PropTradingDashboardPage() {
  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-secondary/15 border border-secondary/25 px-3 py-1 rounded-pill text-secondary text-xs font-bold uppercase tracking-wider mb-4">
            PRO TRADER TERMINAL
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-textLight">
            Evaluation Dashboard
          </h1>
          <p className="text-textMuted font-semibold mt-1">
            Analyze metrics, view active limits, and simulate trade scenarios in real-time.
          </p>
        </div>

        <PropDashboard />
      </section>

      <Footer />
    </main>
  );
}
