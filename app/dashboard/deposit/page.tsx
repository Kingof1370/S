// app/dashboard/deposit/page.tsx

'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useTronDeposit } from '../../hooks/useTronDeposit';
import { Clipboard, Smartphone, CheckCircle, Info } from 'lucide-react';

export default function UserDepositPage() {
  const [depositAmount, setDepositAmount] = useState(50);
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);

  const targetAddress = 'TL87pX9Z7LhYj6g67SdaD78saH7Gdf2sdC';

  const { status, confirmations, txHash, startSimulator } = useTronDeposit(() => {
    setSuccess(true);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(targetAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startSimulator(depositAmount);
  };

  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-20 px-6 max-w-[800px] mx-auto">
        <div className="bg-primary/20 border border-secondary/10 rounded-card p-8 shadow-card">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border-b border-secondary/10 pb-4">
                <h1 className="text-2xl md:text-3xl font-black text-textLight">Secure TRON Deposit</h1>
                <p className="text-sm text-textMuted mt-1">
                  Fund your account instantly with zero deposit fees. Applies <span className="text-accent font-bold">1000% welcome match bonus</span> on first deposit.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Deposit Amount (USD Equivalent)</label>
                <input
                  type="number"
                  min="10"
                  max="50000"
                  required
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Math.max(10, Number(e.target.value)))}
                  className="w-full bg-primary border border-secondary/20 rounded-input p-3 font-mono text-sm text-textLight focus:outline-none focus:border-accent"
                />
                <p className="text-[10px] text-textMuted mt-1">Minimum deposit is $10. Max daily limit is $50,000.</p>
              </div>

              {status !== 'Waiting' ? (
                <div className="bg-bgDark p-6 rounded-card border border-secondary/15 text-center space-y-4">
                  <p className="text-sm font-bold text-textLight">
                    Deposit Status: <span className="text-accent">{status}</span>
                  </p>

                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="text-xs text-textMuted font-mono">Blockchain validations:</span>
                    <p className="text-2xl font-mono font-black text-textLight">
                      {confirmations} / 19
                    </p>
                    <div className="w-48 bg-primary/40 h-2 rounded-pill overflow-hidden">
                      <div
                        className="bg-accent h-full transition-all duration-300"
                        style={{ width: `${(confirmations / 19) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {txHash && (
                    <div className="text-xs text-textMuted border-t border-secondary/10 pt-4 mt-2 text-left">
                      <p className="font-semibold">Transaction ID:</p>
                      <p className="font-mono bg-primary p-2 rounded mt-1 break-all select-all">{txHash}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* TRON Transfer Block */}
                  <div className="bg-bgDark/80 p-6 rounded-card border border-secondary/15 space-y-4">
                    <p className="text-xs font-bold text-textMuted uppercase tracking-wider">
                      Generated TRON Deposit Address
                    </p>

                    <div className="flex flex-col sm:flex-row items-center sm:space-x-6 gap-4">
                      {/* Premium simulated QR Code representation */}
                      <div className="w-32 h-32 bg-white rounded-input p-2 flex items-center justify-center shrink-0">
                        <div className="w-full h-full bg-slate-900 rounded flex flex-col items-center justify-center text-accent text-center p-1">
                          <Smartphone className="w-6 h-6 mb-1" />
                          <span className="text-[9px] font-mono font-bold leading-tight">SCAN TO TRANSFER</span>
                        </div>
                      </div>

                      <div className="space-y-2 flex-1 w-full">
                        <label className="text-xs text-textMuted font-bold">Copy Your Unique Address</label>
                        <div className="flex">
                          <input
                            type="text"
                            readOnly
                            value={targetAddress}
                            className="w-full bg-primary border border-secondary/20 rounded-l-input p-3 font-mono text-xs text-textLight focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleCopy}
                            className="bg-secondary hover:bg-secondary/95 text-textLight font-bold px-4 rounded-r-input text-xs"
                          >
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <p className="text-[10px] text-textMuted leading-relaxed">
                          ⚠️ Warning: Send ONLY TRX to this address. Any other token might be permanently lost.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-primary hover:shadow-glow text-primary font-black text-lg py-4 rounded-button transition-all"
                  >
                    Initiate Deposit Verification
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>

              <h2 className="text-3xl font-black text-textLight">🎉 Deposit Successful!</h2>
              <p className="text-textMuted font-semibold text-sm max-w-md mx-auto leading-relaxed">
                Your deposit transaction has been successfully confirmed on-chain. Your account balance and 1000% match bonus credit have been fully updated!
              </p>

              <div className="pt-6">
                <Link
                  href="/dashboard"
                  className="bg-gradient-cta text-primary font-black text-lg px-8 py-4 rounded-button hover:shadow-glow transition-all inline-block"
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
