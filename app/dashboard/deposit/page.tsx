// app/dashboard/deposit/page.tsx

'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLivePrices } from '../../hooks/useLivePrices';
import { createCryptomusInvoice } from '../../services/cryptomusService';
import { CheckCircle, Coins, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function UserDepositPage() {
  const [depositAmount, setDepositAmount] = useState(50);
  const [selectedCoin, setSelectedCoin] = useState('TRX/USD');
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all 50 live cryptocurrencies dynamically to allow depositing with ANY of them!
  const livePrices = useLivePrices();

  // Find current exchange rate of selected coin relative to USD
  const currentCoinPrice = livePrices.find((p) => p.symbol === selectedCoin)?.priceUSD || 1;
  const currentTicker = selectedCoin.split('/')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const generatedInvoice = await createCryptomusInvoice({
        amount: depositAmount.toString(),
        currency: currentTicker,
        order_id: `NP-ORDER-${Date.now()}`,
      });
      setInvoice(generatedInvoice);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-20 px-6 max-w-[800px] mx-auto">
        <div className="bg-primary/20 border border-secondary/10 rounded-card p-8 shadow-card">
          {!invoice ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border-b border-secondary/10 pb-4">
                <h1 className="text-2xl md:text-3xl font-black text-textLight">Live Global Crypto Deposit</h1>
                <p className="text-sm text-textMuted mt-1">
                  Fund your account instantly using **ANY** of the top 50 global cryptocurrencies with zero deposit fees. Applies <span className="text-accent font-bold">200% welcome match bonus</span> on first deposit.
                </p>
              </div>

              {/* Coin Selection dropdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Select Deposit Asset</label>
                  <select
                    value={selectedCoin}
                    onChange={(e) => setSelectedCoin(e.target.value)}
                    className="w-full bg-primary border border-secondary/20 rounded-input p-3 font-mono text-sm text-textLight focus:outline-none focus:border-accent"
                  >
                    {livePrices.map((coin) => (
                      <option key={coin.symbol} value={coin.symbol}>
                        {coin.symbol.split('/')[0]} (Live Price: ${coin.priceUSD.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Deposit Amount (USD)</label>
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
              </div>

              {/* Dynamic conversion calculator */}
              <div className="bg-primary/35 border border-secondary/10 p-4 rounded-input flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Coins className="w-5 h-5 text-accent" />
                  <span className="text-xs font-bold text-textLight">Live Exchange Calculation:</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-black text-accent">
                    {(depositAmount / currentCoinPrice).toLocaleString(undefined, { maximumFractionDigits: 6 })}{' '}
                    {currentTicker}
                  </span>
                  <span className="text-xs text-textMuted block">≈ ${depositAmount.toLocaleString()} USD</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-primary hover:shadow-glow text-primary font-black text-lg py-4 rounded-button transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Generate Secure Invoice'}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>

              <h2 className="text-3xl font-black text-textLight">🎉 Invoice Successfully Generated!</h2>
              <p className="text-textMuted font-semibold text-sm max-w-md mx-auto leading-relaxed">
                Your live crypto deposit invoice has been prepared successfully. You can pay using your personal wallet by clicking the button below.
              </p>

              <div className="bg-bgDark/80 p-6 rounded-card border border-secondary/15 max-w-md mx-auto text-left space-y-4">
                <div className="flex justify-between items-center text-xs text-textMuted">
                  <span>Invoice Token</span>
                  <span className="text-textLight font-bold">{currentTicker}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-textMuted">
                  <span>Deposit Value</span>
                  <span className="text-accent font-bold">${depositAmount} USD</span>
                </div>
                {invoice.address && (
                  <div className="space-y-1">
                    <span className="text-xs text-textMuted block">Direct Wallet Address:</span>
                    <input
                      type="text"
                      readOnly
                      value={invoice.address}
                      className="w-full bg-primary border border-secondary/20 rounded-input p-2.5 font-mono text-xs text-textLight text-center focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={invoice.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-primary text-primary font-black text-lg px-8 py-4 rounded-button hover:shadow-glow transition-all flex items-center space-x-2"
                >
                  <span>Pay with Cryptomus</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button
                  type="button"
                  onClick={() => setInvoice(null)}
                  className="bg-primary border border-secondary/25 hover:bg-secondary/15 text-textLight font-bold text-lg px-8 py-4 rounded-button transition-all"
                >
                  Create New Invoice
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
