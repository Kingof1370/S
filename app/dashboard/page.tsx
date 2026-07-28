// app/dashboard/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowUpRight, ArrowDownLeft, Shield, Award, LineChart } from 'lucide-react';

export default function UserDashboardOverview() {
  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-12 px-6 max-w-[1200px] mx-auto space-y-10">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-secondary/10 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-black text-textLight">Welcome back, Sarah Johnson!</h1>
            <p className="text-xs text-textMuted uppercase font-bold tracking-widest mt-1">
              Last login: January 20, 2026, 14:32 • 🇬🇧 London, UK
            </p>
          </div>

          <div className="flex space-x-3">
            <Link
              href="/dashboard/deposit"
              className="bg-accent hover:bg-accent/90 hover:shadow-glow text-primary font-bold text-sm px-5 py-3 rounded-button transition-all flex items-center space-x-1"
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Deposit</span>
            </Link>
            <Link
              href="/dashboard/withdraw"
              className="bg-primary border border-secondary/25 hover:bg-secondary/15 text-textLight font-bold text-sm px-5 py-3 rounded-button transition-all flex items-center space-x-1"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Withdraw</span>
            </Link>
          </div>
        </div>

        {/* 4 Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-primary/25 border border-secondary/10 p-6 rounded-card">
            <span className="text-xs text-textMuted font-bold uppercase tracking-wider block mb-1">Total Portfolio Balance</span>
            <p className="text-3xl font-mono font-black text-textLight">$12,847.50</p>
          </div>
          <div className="bg-primary/25 border border-secondary/10 p-6 rounded-card">
            <span className="text-xs text-textMuted font-bold uppercase tracking-wider block mb-1">Deposit Balance</span>
            <p className="text-3xl font-mono font-black text-accent">$8,200.00</p>
          </div>
          <div className="bg-primary/25 border border-secondary/10 p-6 rounded-card">
            <span className="text-xs text-textMuted font-bold uppercase tracking-wider block mb-1">Vested Bonus Balance</span>
            <p className="text-3xl font-mono font-black text-secondary">$4,647.50</p>
          </div>
          <div className="bg-primary/25 border border-secondary/10 p-6 rounded-card">
            <span className="text-xs text-textMuted font-bold uppercase tracking-wider block mb-1">Cumulative Net Profit</span>
            <p className="text-3xl font-mono font-black text-accent">$2,340.00</p>
          </div>
        </div>

        {/* Quick actions row links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/prop/dashboard"
            className="bg-bgDark border border-secondary/15 hover:border-accent/40 p-6 rounded-card flex items-center space-x-4 hover:scale-[1.02] transition-all shadow-card"
          >
            <div className="p-3 bg-accent/10 border border-accent/20 rounded-input">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-textLight">Prop Trading Challenge</h3>
              <p className="text-xs text-textMuted mt-0.5">Evaluate and trade up to $500,000 risk capital.</p>
            </div>
          </Link>

          <Link
            href="/dashboard/history"
            className="bg-bgDark border border-secondary/15 hover:border-accent/40 p-6 rounded-card flex items-center space-x-4 hover:scale-[1.02] transition-all shadow-card"
          >
            <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-input">
              <LineChart className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-bold text-textLight">Transaction Ledger</h3>
              <p className="text-xs text-textMuted mt-0.5">Filter deposits, bonus match transfers, and payouts.</p>
            </div>
          </Link>

          <div className="bg-bgDark border border-secondary/15 p-6 rounded-card flex items-center space-x-4 shadow-card">
            <div className="p-3 bg-accent/10 border border-accent/20 rounded-input">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-textLight">Security Verification</h3>
              <p className="text-xs text-textMuted mt-0.5">Google 2FA is currently active and fully operational.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
