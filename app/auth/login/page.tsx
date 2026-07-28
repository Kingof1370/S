// app/auth/login/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { validateEmail } from '../../lib/validation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // Authenticate user successfully (mock JWT setup)
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-20 px-6 max-w-[500px] mx-auto">
        <div className="bg-primary/20 border border-secondary/10 rounded-card p-8 shadow-card">
          <div className="border-b border-secondary/10 pb-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-black text-textLight">Sign In</h1>
            <p className="text-sm text-textMuted mt-1">Access your global trading portfolio.</p>
          </div>

          {error && (
            <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-input text-xs font-semibold text-textLight mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-primary border border-secondary/20 rounded-input p-3 text-sm text-textLight focus:outline-none focus:border-accent font-sans"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-textMuted uppercase">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-secondary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary border border-secondary/20 rounded-input p-3 text-sm text-textLight focus:outline-none focus:border-accent font-sans"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-xs text-textMuted font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-accent bg-primary border-secondary/20 focus:ring-accent"
                />
                <span>Remember Me (30 Days)</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-primary hover:shadow-glow text-primary font-black text-base py-3.5 rounded-button transition-all"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-xs text-textMuted mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-secondary font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
