// app/dashboard/history/page.tsx

'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Search, Calendar, FileDown } from 'lucide-react';

interface MockTx {
  date: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'BONUS' | 'TRADE';
  amountUSD: number;
  amountTRX: number;
  status: 'Completed' | 'Pending' | 'Failed';
  txId: string;
}

const INITIAL_TXS: MockTx[] = [
  {
    date: '2026-07-28 11:24',
    type: 'DEPOSIT',
    amountUSD: 50.0,
    amountTRX: 266.8,
    status: 'Completed',
    txId: '98fa7812bc8971f287116719a897262ffb0123cb2fa3972a91298cde726b2aa8',
  },
  {
    date: '2026-07-28 11:25',
    type: 'BONUS',
    amountUSD: 500.0,
    amountTRX: 2668.0,
    status: 'Completed',
    txId: 'e8fa7812bc8971f287116719a897262ffb0123cb2fa3972a91298cde726b2ee9',
  },
  {
    date: '2026-07-20 14:12',
    type: 'WITHDRAWAL',
    amountUSD: 150.0,
    amountTRX: 800.4,
    status: 'Completed',
    txId: '42fa7812bc8971f287116719a897262ffb0123cb2fa3972a91298cde726b29f0',
  },
  {
    date: '2026-07-15 09:30',
    type: 'TRADE',
    amountUSD: 2340.0,
    amountTRX: 12486.6,
    status: 'Completed',
    txId: 'c2fa7812bc8971f287116719a897262ffb0123cb2fa3972a91298cde726b25aa',
  },
];

export default function TransactionHistoryPage() {
  const [txs, setTxs] = useState<MockTx[]>(INITIAL_TXS);
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTxs = txs.filter((tx) => {
    const matchesType = filterType === 'ALL' || tx.type === filterType;
    const matchesSearch =
      tx.txId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amountUSD.toString().includes(searchTerm);
    return matchesType && matchesSearch;
  });

  const exportCSV = () => {
    const headers = 'Date,Type,Amount (USD),Amount (TRX),Status,TXID\n';
    const rows = filteredTxs
      .map((tx) => `${tx.date},${tx.type},${tx.amountUSD},${tx.amountTRX},${tx.status},${tx.txId}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `nexuspay-ledger-${new Date().toISOString().slice(0, 10)}.csv`);
    a.click();
  };

  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-16 px-6 max-w-[1200px] mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-textLight">Transaction Ledger</h1>
          <p className="text-sm text-textMuted mt-1">Review complete records of your deposits, bonuses, and withdrawals.</p>
        </div>

        {/* Filters and search controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-primary/25 border border-secondary/10 p-5 rounded-card">
          <div className="flex flex-wrap items-center gap-3">
            {['ALL', 'DEPOSIT', 'BONUS', 'WITHDRAWAL', 'TRADE'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-pill text-xs font-bold transition-all border ${
                  filterType === type
                    ? 'bg-secondary border-secondary text-textLight'
                    : 'bg-primary border-secondary/15 text-textMuted hover:border-secondary/40'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search by TxID or amount..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-primary border border-secondary/20 rounded-input p-2.5 pl-9 text-xs text-textLight focus:outline-none focus:border-accent"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-textMuted" />
            </div>

            <button
              onClick={exportCSV}
              className="bg-primary border border-secondary/25 hover:bg-secondary/15 text-textLight font-bold text-xs p-2.5 rounded-input flex items-center space-x-2 transition-all shrink-0"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">Export Ledger</span>
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto rounded-card border border-secondary/15 shadow-card bg-primary/10">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-primary/45 border-b border-secondary/15 text-textLight font-heading text-xs font-black uppercase tracking-wider">
                <th className="p-5">Timestamp</th>
                <th className="p-5">Type</th>
                <th className="p-5">Amount (USD)</th>
                <th className="p-5">TRX Equivalent</th>
                <th className="p-5">Status</th>
                <th className="p-5">On-chain transaction ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/10 text-sm font-semibold text-textLight/90">
              {filteredTxs.length > 0 ? (
                filteredTxs.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-primary/20 transition-colors">
                    <td className="p-5 font-mono text-xs">{tx.date}</td>
                    <td className="p-5">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                          tx.type === 'DEPOSIT'
                            ? 'bg-accent/15 text-accent'
                            : tx.type === 'BONUS'
                            ? 'bg-secondary/15 text-secondary'
                            : tx.type === 'WITHDRAWAL'
                            ? 'bg-danger/15 text-danger'
                            : 'bg-textMuted/15 text-textMuted'
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-5 font-mono">
                      {tx.type === 'WITHDRAWAL' ? '-' : '+'}${tx.amountUSD.toLocaleString()}
                    </td>
                    <td className="p-5 font-mono">{tx.amountTRX.toLocaleString()} TRX</td>
                    <td className="p-5">
                      <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-pill">
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-5 font-mono text-xs text-textMuted max-w-[200px] truncate select-all">
                      {tx.txId}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-textMuted text-xs font-mono">
                    No transaction history matches your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </main>
  );
}
