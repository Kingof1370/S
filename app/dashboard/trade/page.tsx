// app/dashboard/trade/page.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  TrendingUp,
  TrendingDown,
  LineChart,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import {
  getIsDemo,
  getLiveBalance,
  setLiveBalance,
  getDemoBalance,
  setDemoBalance,
  getPortfolioAssets,
  setPortfolioAssets,
  addLedgerEntry,
} from '../../lib/stateManager';

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export default function TradingTerminalPage() {
  const [mounted, setMounted] = useState(false);
  const [isDemo, setIsDemo] = useState(true);
  const [balance, setBalance] = useState(10000);
  const [portfolio, setPortfolio] = useState({ TRX: 1000, BTC: 0.05, ETH: 0.5 });

  const [selectedAsset, setSelectedAsset] = useState('TRX/USDT');
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [executionType, setExecutionType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [orderAmount, setOrderAmount] = useState('');
  const [orderPrice, setOrderPrice] = useState('0.1425');
  const [leverage, setLeverage] = useState(10);
  const [recentTrades, setRecentTrades] = useState<Array<{ id: number; time: string; type: 'BUY' | 'SELL'; price: number; amount: number }>>([]);
  const [orderBook, setOrderBook] = useState<{ asks: OrderBookEntry[]; bids: OrderBookEntry[] }>({ asks: [], bids: [] });
  const [orderSuccessMessage, setOrderSuccessMessage] = useState<string | null>(null);
  const [orderErrorMessage, setOrderErrorMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Load and synchronize state on mount
  useEffect(() => {
    setMounted(true);
    const demo = getIsDemo();
    setIsDemo(demo);
    setBalance(demo ? getDemoBalance() : getLiveBalance());
    setPortfolio(getPortfolioAssets());
  }, []);

  // Initialize and load TradingView Widget
  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      containerRef.current.innerHTML = '';

      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: selectedAsset === 'TRX/USDT' ? 'BINANCE:TRXUSDT' : selectedAsset === 'BTC/USDT' ? 'BINANCE:BTCUSDT' : 'BINANCE:ETHUSDT',
        interval: '5',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: false,
        calendar: false,
        studies: ['RSI@tv-basicstudies'],
        support_host: 'https://www.tradingview.com'
      });
      containerRef.current.appendChild(script);
    }
  }, [selectedAsset]);

  // Simulate Order Book changes dynamically
  useEffect(() => {
    const generateOrderBook = () => {
      const basePrice = selectedAsset === 'TRX/USDT' ? 0.1425 : selectedAsset === 'BTC/USDT' ? 62450 : 3420;
      const step = selectedAsset === 'TRX/USDT' ? 0.0001 : selectedAsset === 'BTC/USDT' ? 1.5 : 0.25;

      const asks: OrderBookEntry[] = [];
      const bids: OrderBookEntry[] = [];

      for (let i = 1; i <= 6; i++) {
        const askPrice = basePrice + i * step;
        const askAmt = Math.random() * (selectedAsset === 'TRX/USDT' ? 50000 : 0.8) + 0.05;
        asks.push({
          price: Number(askPrice.toFixed(selectedAsset === 'TRX/USDT' ? 4 : 2)),
          amount: Number(askAmt.toFixed(selectedAsset === 'TRX/USDT' ? 0 : 4)),
          total: Number((askPrice * askAmt).toFixed(2))
        });

        const bidPrice = basePrice - i * step;
        const bidAmt = Math.random() * (selectedAsset === 'TRX/USDT' ? 50000 : 0.8) + 0.05;
        bids.push({
          price: Number(bidPrice.toFixed(selectedAsset === 'TRX/USDT' ? 4 : 2)),
          amount: Number(bidAmt.toFixed(selectedAsset === 'TRX/USDT' ? 0 : 4)),
          total: Number((bidPrice * bidAmt).toFixed(2))
        });
      }

      setOrderBook({ asks: asks.reverse(), bids });
    };

    generateOrderBook();
    const interval = setInterval(generateOrderBook, 3000);
    return () => clearInterval(interval);
  }, [selectedAsset]);

  // Simulate Recent Trades ticker
  useEffect(() => {
    const getInitialTrades = () => {
      const basePrice = selectedAsset === 'TRX/USDT' ? 0.1425 : selectedAsset === 'BTC/USDT' ? 62450 : 3420;
      const step = selectedAsset === 'TRX/USDT' ? 0.0002 : selectedAsset === 'BTC/USDT' ? 3.0 : 0.5;
      const list = [];
      for (let i = 0; i < 8; i++) {
        const type = Math.random() > 0.5 ? 'BUY' : 'SELL';
        const price = basePrice + (Math.random() - 0.5) * step;
        const amount = Math.random() * (selectedAsset === 'TRX/USDT' ? 12000 : 0.5) + 0.01;
        const now = new Date();
        list.push({
          id: i,
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          type: type as 'BUY' | 'SELL',
          price: Number(price.toFixed(selectedAsset === 'TRX/USDT' ? 4 : 2)),
          amount: Number(amount.toFixed(selectedAsset === 'TRX/USDT' ? 0 : 4))
        });
      }
      setRecentTrades(list);
    };

    getInitialTrades();
  }, [selectedAsset]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderErrorMessage(null);
    setOrderSuccessMessage(null);

    const assetToken = selectedAsset.split('/')[0] as 'TRX' | 'BTC' | 'ETH';
    const amountNum = parseFloat(orderAmount);
    const priceNum = parseFloat(orderPrice);

    if (isNaN(amountNum) || amountNum <= 0) {
      setOrderErrorMessage('❌ Please enter a valid order amount greater than 0.');
      return;
    }
    if (executionType === 'LIMIT' && (isNaN(priceNum) || priceNum <= 0)) {
      setOrderErrorMessage('❌ Please enter a valid limit price greater than 0.');
      return;
    }

    const currentPrice = executionType === 'MARKET'
      ? (selectedAsset === 'TRX/USDT' ? 0.1425 : selectedAsset === 'BTC/USDT' ? 62450 : 3420)
      : priceNum;

    // Total USD cost of this margin position
    const totalCostUSD = (amountNum * currentPrice) / leverage;

    if (orderType === 'BUY') {
      if (totalCostUSD > balance) {
        setOrderErrorMessage(`❌ Insufficient funds. Required margin: $${totalCostUSD.toFixed(2)} USD, available balance: $${balance.toFixed(2)} USD.`);
        return;
      }

      // Deduct margin
      const nextBalance = balance - totalCostUSD;
      setBalance(nextBalance);
      if (isDemo) {
        setDemoBalance(nextBalance);
      } else {
        setLiveBalance(nextBalance);
      }

      // Add to portfolio holdings
      const nextPortfolio = {
        ...portfolio,
        [assetToken]: portfolio[assetToken] + amountNum
      };
      setPortfolio(nextPortfolio);
      setPortfolioAssets(nextPortfolio);

      // Record in persistent history ledger
      addLedgerEntry({
        type: 'TRADE',
        amountUSD: totalCostUSD,
        amountTRX: selectedAsset === 'TRX/USDT' ? amountNum : (totalCostUSD / 0.1425),
        status: 'Completed'
      });

      setOrderSuccessMessage(
        `🎉 Order Successful! Executed BUY order for ${amountNum.toLocaleString()} ${assetToken} at $${currentPrice.toLocaleString()} with ${leverage}x leverage. Used margin: $${totalCostUSD.toFixed(2)} USD.`
      );
    } else {
      // SELL order
      const assetHolding = portfolio[assetToken];
      if (amountNum > assetHolding) {
        setOrderErrorMessage(`❌ Insufficient portfolio holdings. You only possess ${assetHolding.toLocaleString()} ${assetToken} to sell.`);
        return;
      }

      // Add gained USD to balance
      const gainedUSD = (amountNum * currentPrice) / leverage;
      const nextBalance = balance + gainedUSD;
      setBalance(nextBalance);
      if (isDemo) {
        setDemoBalance(nextBalance);
      } else {
        setLiveBalance(nextBalance);
      }

      // Subtract holdings
      const nextPortfolio = {
        ...portfolio,
        [assetToken]: portfolio[assetToken] - amountNum
      };
      setPortfolio(nextPortfolio);
      setPortfolioAssets(nextPortfolio);

      // Record in persistent history ledger
      addLedgerEntry({
        type: 'TRADE',
        amountUSD: gainedUSD,
        amountTRX: selectedAsset === 'TRX/USDT' ? amountNum : (gainedUSD / 0.1425),
        status: 'Completed'
      });

      setOrderSuccessMessage(
        `🎉 Order Successful! Executed SELL order for ${amountNum.toLocaleString()} ${assetToken} at $${currentPrice.toLocaleString()} with ${leverage}x leverage. Released margin: $${gainedUSD.toFixed(2)} USD.`
      );
    }

    setOrderAmount('');
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

  // Calculate total portfolio asset value in USD
  const trxVal = portfolio.TRX * 0.1425;
  const btcVal = portfolio.BTC * 62450;
  const ethVal = portfolio.ETH * 3420;
  const totalHoldingsValue = trxVal + btcVal + ethVal;

  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      {/* Ticker Selector Bar */}
      <section className="bg-primary/45 border-b border-secondary/10 px-6 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-black text-textLight tracking-wide">Live Trading Desk</h1>

            <div className="flex items-center space-x-2 bg-primary border border-secondary/15 px-3 py-1.5 rounded-input">
              <span className="text-xs text-textMuted font-bold">Select Pair:</span>
              <select
                value={selectedAsset}
                onChange={(e) => {
                  setSelectedAsset(e.target.value);
                  setOrderPrice(e.target.value === 'TRX/USDT' ? '0.1425' : e.target.value === 'BTC/USDT' ? '62450' : '3420');
                }}
                className="bg-transparent font-mono text-xs text-accent font-bold focus:outline-none cursor-pointer"
              >
                <option value="TRX/USDT">TRX/USDT (TRON Core)</option>
                <option value="BTC/USDT">BTC/USDT (Bitcoin)</option>
                <option value="ETH/USDT">ETH/USDT (Ethereum)</option>
              </select>
            </div>

            <span className={`px-2.5 py-1 text-[10px] font-black rounded-pill uppercase tracking-wider ${isDemo ? 'bg-accent/15 text-accent' : 'bg-secondary/15 text-secondary'}`}>
              {isDemo ? 'DEMO / SANDBOX MODE' : 'LIVE ACCOUNT'}
            </span>
          </div>

          <div className="flex items-center space-x-6 font-mono text-xs">
            <div>
              <span className="text-textMuted font-semibold">Live Price:</span>
              <span className="text-accent font-bold ml-1.5">
                {selectedAsset === 'TRX/USDT' ? '0.1425 USD' : selectedAsset === 'BTC/USDT' ? '62,450.00 USD' : '3,420.00 USD'}
              </span>
            </div>
            <div>
              <span className="text-textMuted font-semibold">24h Change:</span>
              <span className="text-accent font-bold ml-1.5">+2.45%</span>
            </div>
            <div>
              <span className="text-textMuted font-semibold">24h Volume:</span>
              <span className="text-textLight font-semibold ml-1.5">
                {selectedAsset === 'TRX/USDT' ? '41,200,000 TRX' : selectedAsset === 'BTC/USDT' ? '12,450 BTC' : '48,000 ETH'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Dashboard Grid */}
      <section className="py-8 px-6 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Hand: Live Chart Terminal (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-primary/25 border border-secondary/10 rounded-card p-4 h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-pill flex items-center space-x-1.5">
                <LineChart className="w-3.5 h-3.5" />
                <span>Interconnected Live Feed</span>
              </span>
              <span className="text-xs text-textMuted font-mono">Timeframe: 5M</span>
            </div>
            <div className="flex-1 w-full rounded-input overflow-hidden border border-secondary/15 bg-bgDark">
              <div ref={containerRef} className="tradingview-widget-container w-full h-full" style={{ height: '100%' }}></div>
            </div>
          </div>

          {/* User Portfolio state */}
          <div className="bg-primary/20 border border-secondary/10 rounded-card p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-bgDark/45 p-4 rounded-input border border-secondary/5">
              <span className="text-xs text-textMuted font-bold uppercase tracking-wider block mb-1">Available Margin</span>
              <span className="text-xl font-mono font-black text-textLight">${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="bg-bgDark/45 p-4 rounded-input border border-secondary/5">
              <span className="text-xs text-textMuted font-bold uppercase tracking-wider block mb-1">Total Holdings Value</span>
              <span className="text-xl font-mono font-black text-accent">${totalHoldingsValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="bg-bgDark/45 p-4 rounded-input border border-secondary/5">
              <span className="text-xs text-textMuted font-bold uppercase tracking-wider block mb-1">Leverage Buffer Mode</span>
              <span className="text-xl font-mono font-black text-secondary">Cross Margin</span>
            </div>
          </div>

          {/* Wallet holdings breakdown */}
          <div className="bg-primary/20 border border-secondary/10 rounded-card p-6">
            <h3 className="font-bold text-textLight text-sm uppercase tracking-wider border-b border-secondary/10 pb-3 mb-4 flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-accent" />
              <span>Wallet Holdings Portfolio</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-bgDark/60 p-4 rounded-input border border-secondary/5">
                <div className="flex justify-between text-xs text-textMuted font-bold mb-1">
                  <span>TRX Balance</span>
                  <span className="text-textLight">{portfolio.TRX.toLocaleString()} TRX</span>
                </div>
                <div className="text-right text-xs font-mono font-bold text-accent">${trxVal.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</div>
              </div>
              <div className="bg-bgDark/60 p-4 rounded-input border border-secondary/5">
                <div className="flex justify-between text-xs text-textMuted font-bold mb-1">
                  <span>BTC Balance</span>
                  <span className="text-textLight">{portfolio.BTC.toFixed(4)} BTC</span>
                </div>
                <div className="text-right text-xs font-mono font-bold text-accent">${btcVal.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</div>
              </div>
              <div className="bg-bgDark/60 p-4 rounded-input border border-secondary/5">
                <div className="flex justify-between text-xs text-textMuted font-bold mb-1">
                  <span>ETH Balance</span>
                  <span className="text-textLight">{portfolio.ETH.toFixed(2)} ETH</span>
                </div>
                <div className="text-right text-xs font-mono font-bold text-accent">${ethVal.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hand side: Order forms & Order books (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Order Placement Form */}
          <div className="bg-primary/25 border border-secondary/10 rounded-card p-6 space-y-6">
            <div className="flex rounded-input border border-secondary/15 overflow-hidden">
              <button
                type="button"
                onClick={() => setOrderType('BUY')}
                className={`flex-1 py-3 text-sm font-black transition-all ${
                  orderType === 'BUY' ? 'bg-accent text-primary' : 'bg-primary/40 text-textMuted'
                }`}
              >
                BUY / LONG
              </button>
              <button
                type="button"
                onClick={() => setOrderType('SELL')}
                className={`flex-1 py-3 text-sm font-black transition-all ${
                  orderType === 'SELL' ? 'bg-danger text-textLight' : 'bg-primary/40 text-textMuted'
                }`}
              >
                SELL / SHORT
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setExecutionType('MARKET')}
                  className={`flex-1 py-1.5 rounded-pill text-xs font-bold border transition-all ${
                    executionType === 'MARKET' ? 'bg-secondary/15 border-secondary text-secondary' : 'border-secondary/10 text-textMuted'
                  }`}
                >
                  Market Order
                </button>
                <button
                  type="button"
                  onClick={() => setExecutionType('LIMIT')}
                  className={`flex-1 py-1.5 rounded-pill text-xs font-bold border transition-all ${
                    executionType === 'LIMIT' ? 'bg-secondary/15 border-secondary text-secondary' : 'border-secondary/10 text-textMuted'
                  }`}
                >
                  Limit Order
                </button>
              </div>

              {executionType === 'LIMIT' && (
                <div>
                  <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Limit Price (USD)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={orderPrice}
                    onChange={(e) => setOrderPrice(e.target.value)}
                    className="w-full bg-primary border border-secondary/20 rounded-input p-3 font-mono text-xs text-textLight focus:outline-none focus:border-accent"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">
                  Amount ({selectedAsset.split('/')[0]})
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.0001"
                  value={orderAmount}
                  onChange={(e) => setOrderAmount(e.target.value)}
                  className="w-full bg-primary border border-secondary/20 rounded-input p-3 font-mono text-xs text-textLight focus:outline-none focus:border-accent"
                  required
                />
              </div>

              {/* Leverage Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase text-textMuted">
                  <span>Leverage multiplier</span>
                  <span className="text-accent">{leverage}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  className="w-full accent-accent bg-primary"
                />
                <div className="flex justify-between text-[10px] font-mono text-textMuted">
                  <span>1x</span>
                  <span>10x</span>
                  <span>25x</span>
                  <span>50x</span>
                </div>
              </div>

              {orderSuccessMessage && (
                <div className="bg-accent/15 border border-accent/30 p-3 rounded-input text-xs font-semibold text-accent flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{orderSuccessMessage}</span>
                </div>
              )}

              {orderErrorMessage && (
                <div className="bg-danger/15 border border-danger/30 p-3 rounded-input text-xs font-semibold text-danger flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{orderErrorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className={`w-full font-black text-sm py-4 rounded-button transition-all shadow-glow ${
                  orderType === 'BUY' ? 'bg-accent hover:bg-accent/90 text-primary' : 'bg-danger hover:bg-danger/90 text-textLight'
                }`}
              >
                Submit {orderType} Order
              </button>
            </form>
          </div>

          {/* Simulated Order Book */}
          <div className="bg-primary/25 border border-secondary/10 rounded-card p-6 space-y-4">
            <h3 className="font-bold text-textLight text-sm uppercase tracking-wider border-b border-secondary/10 pb-2">
              Order Book
            </h3>

            <div className="space-y-2">
              {/* Asks (Sells) */}
              <div className="space-y-1">
                {orderBook.asks && orderBook.asks.slice(0, 3).map((ask, idx) => (
                  <div key={`ask-${idx}`} className="grid grid-cols-3 text-xs font-mono">
                    <span className="text-danger">{ask.price}</span>
                    <span className="text-right text-textMuted">{ask.amount}</span>
                    <span className="text-right text-textMuted">${ask.total}</span>
                  </div>
                ))}
              </div>

              {/* Spread Row */}
              <div className="bg-bgDark/60 py-1.5 px-3 rounded text-center text-xs font-mono font-bold text-accent">
                Spread: {selectedAsset === 'TRX/USDT' ? '0.0001 USDT' : selectedAsset === 'BTC/USDT' ? '1.50 USDT' : '0.25 USDT'}
              </div>

              {/* Bids (Buys) */}
              <div className="space-y-1">
                {orderBook.bids && orderBook.bids.slice(0, 3).map((bid, idx) => (
                  <div key={`bid-${idx}`} className="grid grid-cols-3 text-xs font-mono">
                    <span className="text-accent">{bid.price}</span>
                    <span className="text-right text-textMuted">{bid.amount}</span>
                    <span className="text-right text-textMuted">${bid.total}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
