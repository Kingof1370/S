// app/auth/reset-password/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { validatePassword } from '../../lib/validation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 12 characters, include at least 1 uppercase letter, 1 number, and 1 special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSuccess(true);
  };

  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-20 px-6 max-w-[500px] mx-auto">
        <div className="bg-primary/20 border border-secondary/10 rounded-card p-8 shadow-card">
          <div className="border-b border-secondary/10 pb-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-black text-textLight">Choose New Password</h1>
            <p className="text-sm text-textMuted mt-1">Please configure your new secure account password.</p>
          </div>

          {error && (
            <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-input text-xs font-semibold text-textLight mb-6">
              {error}
            </div>
          )}

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">New Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-primary border border-secondary/20 rounded-input p-3 text-sm text-textLight focus:outline-none focus:border-accent font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-primary border border-secondary/20 rounded-input p-3 text-sm text-textLight focus:outline-none focus:border-accent font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-glow text-primary font-black text-base py-3.5 rounded-button transition-all"
              >
                Save New Password
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <p className="text-sm text-textMuted leading-relaxed">
                🎉 Your account password has been successfully reset! Please navigate back to sign in.
              </p>
              <Link
                href="/auth/login"
                className="inline-block bg-gradient-cta text-primary font-black px-6 py-3 rounded-button hover:shadow-glow transition-all"
              >
                Go to Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
