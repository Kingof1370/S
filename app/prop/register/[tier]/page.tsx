// app/prop/register/[tier]/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { getPropPlanByTier } from '../../../services/propService';
import { useTronDeposit } from '../../../hooks/useTronDeposit';
import { Check, Clipboard, CheckCircle, Smartphone } from 'lucide-react';

export default function PropRegisterPage() {
  const params = useParams();
  const router = useRouter();
  const tier = (params?.tier as string) || 'gold';
  const plan = getPropPlanByTier(tier);

  const [agreed, setAgreed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);

  // Address used for the mockup flow
  const targetAddress = 'TY67Wn8G7LhYj6g67SdaD78saH7Gdf9asD';

  const { status, confirmations, txHash, startSimulator } = useTronDeposit(() => {
    // On confirm
    setSuccess(true);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(targetAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    startSimulator(plan.fee);
  };

  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-20 px-6 max-w-[800px] mx-auto">
        <div className="bg-primary/20 border border-secondary/10 rounded-card p-8 shadow-card relative overflow-hidden">
          {/* Main Form container */}
          {!success ? (
            <form onSubmit={handleStartPayment} className="space-y-8">
              <div className="border-b border-secondary/10 pb-4">
                <h1 className="text-2xl md:text-3xl font-black text-textLight">
                  Start {plan.name} Challenge
                </h1>
                <p className="text-sm text-textMuted mt-1">
                  Complete registration to activate your account size of{' '}
                  <span className="text-accent font-bold">${plan.accountSize.toLocaleString()}</span>.
                </p>
              </div>

              {/* Step 1: Verification Checklist */}
              <div className="space-y-3">
                <h3 className="font-bold text-textLight text-sm uppercase tracking-wider">Evaluation Covenant Details</h3>
                <div className="grid grid-cols-2 gap-4 bg-bgDark/60 p-4 rounded-input border border-secondary/10 text-xs font-semibold">
                  <div>
                    <span className="text-textMuted block">Evaluation Fee</span>
                    <span className="text-sm font-mono text-secondary">${plan.fee} USD equivalent</span>
                  </div>
                  <div>
                    <span className="text-textMuted block">Target Profit Phase 1 / 2</span>
                    <span className="text-sm font-mono text-accent">10% / 5%</span>
                  </div>
                </div>
              </div>

              {/* Step 2: Payment flow status */}
              {status !== 'Waiting' ? (
                <div className="bg-bgDark p-6 rounded-card border border-secondary/15 text-center space-y-4">
                  <p className="text-sm font-bold text-textLight">
                    Status: <span className="text-accent">{status}</span>
                  </p>

                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="text-xs text-textMuted font-mono">Blockchain block confirmation status:</span>
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
                    <div className="text-xs text-textMuted border-t border-secondary/10 pt-4 mt-2">
                      <p className="font-semibold">TxID:</p>
                      <p className="font-mono bg-primary p-2 rounded mt-1 break-all select-all">{txHash}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* TRON payment details block */}
                  <div className="bg-bgDark/80 p-6 rounded-card border border-secondary/15 space-y-4">
                    <p className="text-xs font-bold text-textMuted uppercase tracking-wider">
                      DEPOSIT TRON TO GENERATED SYSTEM ADDRESS
                    </p>

                    <div className="flex flex-col sm:flex-row items-center sm:space-x-6 gap-4">
                      {/* Placeholder premium simulated QR representation */}
                      <div className="w-32 h-32 bg-white rounded-input p-2 flex items-center justify-center shrink-0">
                        {/* Elegant QR Simulation using lines */}
                        <div className="w-full h-full bg-slate-900 rounded flex flex-col items-center justify-center text-accent text-center p-1">
                          <Smartphone className="w-6 h-6 mb-1" />
                          <span className="text-[9px] font-mono font-bold leading-tight">SCAN FOR TRX WALLET</span>
                        </div>
                      </div>

                      <div className="space-y-2 flex-1 w-full">
                        <label className="text-xs text-textMuted font-bold">Unique TRON Address (Fee matching)</label>
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
                          ⚠️ Send exactly <span className="text-accent font-bold">${plan.fee} USD equivalent in TRX</span>. Evaluation challenge credentials will be updated in your pro trader dashboard instantly upon 19 block confirmations.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Agreement boxes */}
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3 text-xs text-textMuted font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 rounded text-accent bg-primary border-secondary/20 focus:ring-accent"
                      />
                      <span>I agree to the Terms & Conditions and refund covenants.</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!agreed}
                    className="w-full bg-gradient-primary hover:shadow-glow text-primary font-black text-lg py-4 rounded-button transition-all disabled:opacity-40"
                  >
                    Start Verification Payment
                  </button>
                </div>
              )}
            </form>
          ) : (
            /* Success confirmation panel */
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>

              <h2 className="text-3xl font-black text-textLight">🎉 Challenge Activated!</h2>
              <p className="text-textMuted font-semibold text-sm max-w-md mx-auto leading-relaxed">
                Your one-time fee verification payment has been completely confirmed. Your custom evaluation challenge on{' '}
                <span className="text-textLight font-bold">{plan.name}</span> has officially commenced!
              </p>

              <div className="pt-6">
                <Link
                  href="/prop/dashboard"
                  className="bg-gradient-cta text-primary font-black text-lg px-8 py-4 rounded-button hover:shadow-glow transition-all inline-block"
                >
                  Go to dashboard
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
