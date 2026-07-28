// app/auth/forgot-password/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { validateEmail } from '../../lib/validation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-20 px-6 max-w-[500px] mx-auto">
        <div className="bg-primary/20 border border-secondary/10 rounded-card p-8 shadow-card">
          <div className="border-b border-secondary/10 pb-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-black text-textLight">Reset Password</h1>
            <p className="text-sm text-textMuted mt-1">We will send a recovery token link to your mail.</p>
          </div>

          {error && (
            <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-input text-xs font-semibold text-textLight mb-6">
              {error}
            </div>
          )}

          {!submitted ? (
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

              <button
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-glow text-primary font-black text-base py-3.5 rounded-button transition-all"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <p className="text-sm text-textMuted leading-relaxed">
                If an account matches <span className="text-textLight font-bold">{email}</span>, a secure password recovery instruction email will be delivered to your inbox shortly.
              </p>
              <Link
                href="/auth/login"
                className="inline-block text-secondary font-bold text-sm hover:underline"
              >
                Return to Login
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
