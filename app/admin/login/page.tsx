// app/admin/login/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactor, setTwoFactor] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (email !== 'admin@nexuspay.io') {
      setError('Invalid Administrator email address.');
      return;
    }

    if (password !== 'AdminPassword123!') {
      setError('Incorrect master security credentials.');
      return;
    }

    if (twoFactor.length !== 6 || !/^\d+$/.test(twoFactor)) {
      setError('Invalid Google Authenticator security OTP.');
      return;
    }

    router.push('/admin');
  };

  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-20 px-6 max-w-[500px] mx-auto">
        <div className="bg-primary/25 border border-danger/30 rounded-card p-8 shadow-card relative overflow-hidden">
          {/* Subtle warning glow */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-danger"></div>

          <div className="border-b border-secondary/10 pb-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-black text-textLight">Admin Portal</h1>
            <p className="text-sm text-textMuted mt-1">Authorized NexusPay personnel only.</p>
          </div>

          {error && (
            <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-input text-xs font-semibold text-textLight mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-primary border border-secondary/20 rounded-input p-3 text-sm text-textLight focus:outline-none focus:border-danger font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Master Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary border border-secondary/20 rounded-input p-3 text-sm text-textLight focus:outline-none focus:border-danger font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Security 2FA Code</label>
              <input
                type="text"
                maxLength={6}
                required
                placeholder="000000"
                value={twoFactor}
                onChange={(e) => setTwoFactor(e.target.value)}
                className="w-full bg-primary border border-secondary/20 rounded-input p-3 tracking-widest font-mono text-center text-sm text-textLight focus:outline-none focus:border-danger"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-danger hover:shadow-hover hover:shadow-danger/20 text-textLight font-black text-base py-3.5 rounded-button transition-all"
            >
              Authorize Login
            </button>
          </form>

          <p className="text-center text-xs text-textMuted mt-6">
            Return to standard{' '}
            <Link href="/" className="text-secondary font-bold hover:underline">
              Home Page
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
