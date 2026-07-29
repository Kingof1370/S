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
  AlertCircle
} from 'lucide-react';

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export default function TradingTerminalPage() {
  const [selectedAsset, setSelectedAsset] = useState('TRX/USDT');
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [executionType, setExecutionType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [orderAmount, setOrderAmount] = useState('');
  const [orderPrice, setOrderPrice] = useState('0.1425');
  const [leverage, setLeverage] = useState(10);
  const [recentTrades, setRecentTrades] = useState<Array<{ id: number; time: string; type: 'BUY' | 'SELL'; price: number; amount: number }>>([]);
  const [orderBook, setOrderBook] = useState<{ asks: OrderBookEntry[]; bids: OrderBookEntry[] }>({ asks: [], bids: [] });
  const [orderSuccessMessage, setOrderSuccessMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

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

      // Sort asks descending for order book view (top are more expensive)
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
    if (!orderAmount || Number(orderAmount) <= 0) return;

    setOrderSuccessMessage(
      `🎉 Successful! Simulated ${executionType} ${orderType} order for ${orderAmount} ${
        selectedAsset.split('/')[0]
      } has been submitted with ${leverage}x leverage.`
    );

    setOrderAmount('');
    setTimeout(() => {
      setOrderSuccessMessage(null);
    }, 5000);
  };

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
        {/* Left Hand: Live Chart Terminal (7 Columns) */}
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
              <span className="text-xl font-mono font-black text-textLight">$12,847.50</span>
            </div>
            <div className="bg-bgDark/45 p-4 rounded-input border border-secondary/5">
              <span className="text-xs text-textMuted font-bold uppercase tracking-wider block mb-1">Total Position Value</span>
              <span className="text-xl font-mono font-black text-accent">$0.00</span>
            </div>
            <div className="bg-bgDark/45 p-4 rounded-input border border-secondary/5">
              <span className="text-xs text-textMuted font-bold uppercase tracking-wider block mb-1">Leverage Buffer Mode</span>
              <span className="text-xl font-mono font-black text-secondary">Cross Margin</span>
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
