// app/dashboard/withdraw/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { isValidTronAddress } from '../../services/tronService';
import { ArrowUpRight, CheckCircle, Info, ShieldCheck, RefreshCw } from 'lucide-react';
import {
  getLiveBalance,
  setLiveBalance,
  getVestedBonus,
  addLedgerEntry
} from '../../lib/stateManager';
import Link from 'next/link';

export default function UserWithdrawPage() {
  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState('');
  const [amountUSD, setAmountUSD] = useState(10);
  const [twoFactor, setTwoFactor] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [availableBalance, setAvailableBalance] = useState(8200.00);
  const [vestedBonus, setVestedBonus] = useState(4647.50);

  // Load and synchronize values on mount
  useEffect(() => {
    setMounted(true);
    setAvailableBalance(getLiveBalance());
    setVestedBonus(getVestedBonus());
  }, []);

  const trxRate = 0.1874;
  const trxEquivalent = parseFloat((amountUSD / trxRate).toFixed(4));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidTronAddress(address)) {
      setError('Please enter a valid TRON (TRX) address (starting with T, 34 characters).');
      return;
    }

    if (amountUSD < 10) {
      setError('Minimum withdrawal limit is $10 USD equivalent.');
      return;
    }

    if (amountUSD > availableBalance) {
      setError(`Insufficient funds. Your withdrawable deposit balance is $${availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}.`);
      return;
    }

    if (amountUSD > 5000) {
      setError('Maximum daily withdrawal limit is $5,000 USD.');
      return;
    }

    if (twoFactor.length !== 6 || !/^\d+$/.test(twoFactor)) {
      setError('Please enter a valid 6-digit Google Authenticator 2FA code.');
      return;
    }

    // Process withdrawal and persist
    setSubmitting(true);
    setTimeout(() => {
      const nextBalance = availableBalance - amountUSD;
      setAvailableBalance(nextBalance);
      setLiveBalance(nextBalance);

      // Record withdrawal transaction in ledger
      addLedgerEntry({
        type: 'WITHDRAWAL',
        amountUSD: amountUSD,
        amountTRX: trxEquivalent,
        status: 'Completed'
      });

      setSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-bgDark text-textLight">
        <Header />
        <div className="flex items-center justify-center h-96">
          <RefreshCw className="w-8 h-8 text-secondary animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-20 px-6 max-w-[800px] mx-auto">
        <div className="bg-primary/20 border border-secondary/10 rounded-card p-8 shadow-card">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-secondary/10 pb-4">
                <h1 className="text-2xl md:text-3xl font-black text-textLight">Secure TRON Withdrawal</h1>
                <p className="text-sm text-textMuted mt-1">
                  Withdraw your earnings instantly. Note: Bonus balances have vesting constraints and cannot be directly withdrawn.
                </p>
              </div>

              {error && (
                <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-input text-xs font-semibold text-textLight">
                  {error}
                </div>
              )}

              {/* Balances summary */}
              <div className="grid grid-cols-2 gap-4 bg-bgDark/60 p-4 rounded-card border border-secondary/10 text-xs font-semibold">
                <div>
                  <span className="text-textMuted block uppercase">Withdrawable Balance</span>
                  <span className="text-base text-accent font-mono font-black">${availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div>
                  <span className="text-textMuted block uppercase">Vested Bonus Balance</span>
                  <span className="text-base text-secondary font-mono font-black">${vestedBonus.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Destination TRON Wallet Address</label>
                  <input
                    type="text"
                    required
                    placeholder="T..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-primary border border-secondary/20 rounded-input p-3 font-mono text-sm text-textLight focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Amount (USD)</label>
                    <input
                      type="number"
                      required
                      min={10}
                      value={amountUSD}
                      onChange={(e) => setAmountUSD(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-primary border border-secondary/20 rounded-input p-3 font-mono text-sm text-textLight focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Estimated TRX Value</label>
                    <div className="w-full bg-primary/40 border border-secondary/10 rounded-input p-3 font-mono text-sm text-textMuted flex items-center justify-between">
                      <span>{trxEquivalent.toLocaleString()} TRX</span>
                      <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-1.5 py-0.5 rounded">Fee: 1 TRX</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Google 2FA Code</label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="000000"
                      value={twoFactor}
                      onChange={(e) => setTwoFactor(e.target.value)}
                      className="w-full bg-primary border border-secondary/20 rounded-input p-3 pl-10 font-mono tracking-widest text-sm text-textLight focus:outline-none focus:border-accent"
                    />
                    <ShieldCheck className="absolute left-3.5 top-3.5 w-5 h-5 text-textMuted" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-primary hover:shadow-glow text-primary font-black text-lg py-4 rounded-button transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{submitting ? 'Verifying transaction node...' : 'Confirm Withdrawal'}</span>
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>

              <h2 className="text-3xl font-black text-textLight">🎉 Withdrawal Pending!</h2>
              <p className="text-textMuted font-semibold text-sm max-w-md mx-auto leading-relaxed">
                Your withdrawal request of <span className="text-textLight font-bold">${amountUSD.toLocaleString()} ({trxEquivalent} TRX)</span> has been submitted. Funds will arrive at address <span className="text-textLight font-mono break-all">{address}</span> in 5-30 minutes.
              </p>

              <div className="pt-6">
                <Link
                  href="/dashboard"
                  className="bg-gradient-primary text-primary font-black text-lg px-8 py-4 rounded-button hover:shadow-glow transition-all inline-block"
                >
                  Return to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
