// app/admin/page.tsx

'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Users, ShieldCheck, Zap, Award, Edit3, Settings, Database, ServerCrash } from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'challenges' | 'settings' | 'logs'>('users');

  // Static mock arrays representing state updates
  const [users, setUsers] = useState([
    { id: '1', email: 'trader1@nexuspay.io', name: 'Sarah Johnson', balance: 8200.0, kyc: 'VERIFIED' },
    { id: '2', email: 'trader2@nexuspay.io', name: 'Michael Chen', balance: 1500.0, kyc: 'VERIFIED' },
  ]);

  const [challenges, setChallenges] = useState([
    { id: 'c1', user: 'Michael Chen', tier: 'GOLD', size: 50000, profit: 3000, status: 'PHASE_1' },
  ]);

  const [settings, setSettings] = useState({
    bonusPercent: 1000,
    minDeposit: 10,
    maxWithdrawal: 5000,
  });

  const [logs, setLogs] = useState([
    { time: '2026-07-28 11:59', admin: 'admin@nexuspay.io', action: 'DATABASE_BACKUP', details: 'Backup snapshot saved.' },
    { time: '2026-07-28 11:24', admin: 'admin@nexuspay.io', action: 'KYC_APPROVE', details: 'KYC approved for Sarah Johnson.' },
  ]);

  const [editingUser, setEditingUser] = useState<typeof users[0] | null>(null);

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setEditingUser(null);
  };

  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-12 px-6 max-w-[1440px] mx-auto space-y-10">
        <div className="border-b border-secondary/10 pb-6">
          <h1 className="text-3xl font-black text-textLight flex items-center space-x-2">
            <span className="bg-danger text-textLight text-xs px-2.5 py-1 rounded font-mono font-bold">STAFF</span>
            <span>Master Management Dashboard</span>
          </h1>
          <p className="text-sm text-textMuted mt-1">Configure parameters, review balances, approve KYC, and view transaction logs.</p>
        </div>

        {/* 6 Stats columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-primary/20 border border-secondary/10 p-4 rounded-card text-center">
            <span className="text-[10px] font-bold text-textMuted block uppercase">Total Users</span>
            <span className="text-xl font-mono font-bold text-textLight">12,847</span>
          </div>
          <div className="bg-primary/20 border border-secondary/10 p-4 rounded-card text-center">
            <span className="text-[10px] font-bold text-textMuted block uppercase">Total Deposits</span>
            <span className="text-xl font-mono font-bold text-accent">$4.2M</span>
          </div>
          <div className="bg-primary/20 border border-secondary/10 p-4 rounded-card text-center">
            <span className="text-[10px] font-bold text-textMuted block uppercase">Total Withdrawals</span>
            <span className="text-xl font-mono font-bold text-danger">$1.8M</span>
          </div>
          <div className="bg-primary/20 border border-secondary/10 p-4 rounded-card text-center">
            <span className="text-[10px] font-bold text-textMuted block uppercase">Pending Withdrawals</span>
            <span className="text-xl font-mono font-bold text-warning">47</span>
          </div>
          <div className="bg-primary/20 border border-secondary/10 p-4 rounded-card text-center">
            <span className="text-[10px] font-bold text-textMuted block uppercase">Active Challenges</span>
            <span className="text-xl font-mono font-bold text-secondary">1,234</span>
          </div>
          <div className="bg-primary/20 border border-secondary/10 p-4 rounded-card text-center">
            <span className="text-[10px] font-bold text-textMuted block uppercase">Funded Traders</span>
            <span className="text-xl font-mono font-bold text-accent">342</span>
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="flex border-b border-secondary/15">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-heading font-bold text-sm border-b-2 transition-all ${
              activeTab === 'users' ? 'border-danger text-danger' : 'border-transparent text-textMuted hover:text-textLight'
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-6 py-3 font-heading font-bold text-sm border-b-2 transition-all ${
              activeTab === 'challenges' ? 'border-danger text-danger' : 'border-transparent text-textMuted hover:text-textLight'
            }`}
          >
            Prop Challenges
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 font-heading font-bold text-sm border-b-2 transition-all ${
              activeTab === 'settings' ? 'border-danger text-danger' : 'border-transparent text-textMuted hover:text-textLight'
            }`}
          >
            System Settings
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-6 py-3 font-heading font-bold text-sm border-b-2 transition-all ${
              activeTab === 'logs' ? 'border-danger text-danger' : 'border-transparent text-textMuted hover:text-textLight'
            }`}
          >
            Security Audit Logs
          </button>
        </div>

        {/* Tab contents */}
        <div className="bg-primary/10 border border-secondary/10 rounded-card p-6 min-h-[300px]">
          {activeTab === 'users' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-textLight">Active Accounts</h3>
              <div className="overflow-x-auto rounded-card border border-secondary/10 bg-primary/20">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-primary/40 text-[10px] font-black uppercase text-textLight tracking-wider border-b border-secondary/10">
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Deposit Balance</th>
                      <th className="p-4">KYC Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-secondary/5 font-semibold">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-primary/20">
                        <td className="p-4">{u.name}</td>
                        <td className="p-4 font-mono">{u.email}</td>
                        <td className="p-4 font-mono">${u.balance.toLocaleString()}</td>
                        <td className="p-4">
                          <span className="bg-accent/15 text-accent px-2 py-0.5 rounded font-bold">{u.kyc}</span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => setEditingUser(u)}
                            className="text-secondary hover:underline flex items-center space-x-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Modify</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-textLight">Evaluations Summary</h3>
              <div className="overflow-x-auto rounded-card border border-secondary/10 bg-primary/20">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-primary/40 text-[10px] font-black uppercase text-textLight tracking-wider border-b border-secondary/10">
                      <th className="p-4">Trader</th>
                      <th className="p-4">Tier Size</th>
                      <th className="p-4">Target size</th>
                      <th className="p-4">Current Profit</th>
                      <th className="p-4">Progress Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-secondary/5 font-semibold">
                    {challenges.map((c) => (
                      <tr key={c.id} className="hover:bg-primary/20">
                        <td className="p-4">{c.user}</td>
                        <td className="p-4 font-mono">{c.tier}</td>
                        <td className="p-4 font-mono">${c.size.toLocaleString()}</td>
                        <td className="p-4 font-mono text-accent">+${c.profit.toLocaleString()}</td>
                        <td className="p-4">
                          <span className="bg-secondary/15 text-secondary px-2 py-0.5 rounded font-bold">{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-xl space-y-6">
              <h3 className="font-bold text-lg text-textLight">Configure Platform Covenants</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-textMuted uppercase mb-1">Standard Welcome Match (%)</label>
                  <input
                    type="number"
                    value={settings.bonusPercent}
                    onChange={(e) => setSettings({ ...settings, bonusPercent: Number(e.target.value) })}
                    className="w-full bg-primary border border-secondary/20 rounded-input p-2.5 text-xs text-textLight focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-textMuted uppercase mb-1">Minimum Deposit USD</label>
                  <input
                    type="number"
                    value={settings.minDeposit}
                    onChange={(e) => setSettings({ ...settings, minDeposit: Number(e.target.value) })}
                    className="w-full bg-primary border border-secondary/20 rounded-input p-2.5 text-xs text-textLight focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-textMuted uppercase mb-1">Maximum Daily Withdrawal limit</label>
                  <input
                    type="number"
                    value={settings.maxWithdrawal}
                    onChange={(e) => setSettings({ ...settings, maxWithdrawal: Number(e.target.value) })}
                    className="w-full bg-primary border border-secondary/20 rounded-input p-2.5 text-xs text-textLight focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => alert('Platform configurations updated successfully.')}
                  className="bg-danger hover:shadow-hover hover:shadow-danger/20 text-textLight font-bold text-xs px-5 py-3 rounded-button transition-all"
                >
                  Save Configuration settings
                </button>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-textLight flex items-center justify-between">
                <span>Security Audit Ledger</span>
                <button
                  onClick={() => alert('Diagnostic backups completed.')}
                  className="text-xs bg-secondary hover:bg-secondary/95 text-textLight font-bold px-3 py-1.5 rounded-input flex items-center space-x-1"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Download Dump SQL</span>
                </button>
              </h3>
              <div className="space-y-3 font-mono text-xs">
                {logs.map((log, idx) => (
                  <div key={idx} className="bg-bgDark p-3 rounded border border-secondary/10 flex justify-between items-center">
                    <div>
                      <span className="text-textMuted">[{log.time}]</span>{' '}
                      <span className="text-danger font-bold">{log.action}</span> -{' '}
                      <span className="text-textLight font-semibold">{log.details}</span>
                    </div>
                    <span className="text-textMuted">{log.admin}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Edit Modal */}
        {editingUser && (
          <div className="fixed inset-0 z-50 bg-bgDark/80 backdrop-blur-md flex items-center justify-center p-6">
            <div className="bg-primary/95 border border-secondary/10 rounded-card p-8 max-w-[500px] w-full shadow-hover relative">
              <div className="border-b border-secondary/10 pb-4 mb-6">
                <h3 className="text-xl font-bold text-textLight">Modify User Balance</h3>
                <p className="text-xs text-textMuted mt-1">Admin control override panel.</p>
              </div>

              <form onSubmit={handleSaveUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-textMuted uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full bg-primary border border-secondary/20 rounded-input p-2.5 text-xs text-textLight focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-textMuted uppercase mb-1">Deposit Balance (USD)</label>
                  <input
                    type="number"
                    value={editingUser.balance}
                    onChange={(e) => setEditingUser({ ...editingUser, balance: Number(e.target.value) })}
                    className="w-full bg-primary border border-secondary/20 rounded-input p-2.5 text-xs text-textLight focus:outline-none"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="bg-danger text-textLight font-bold text-xs px-5 py-3 rounded-button hover:bg-danger/90 transition-all flex-1"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="bg-primary border border-secondary/20 text-textLight font-bold text-xs px-5 py-3 rounded-button hover:bg-secondary/10 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
