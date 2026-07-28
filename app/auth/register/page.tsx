// app/auth/register/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { validateEmail, validatePassword } from '../../lib/validation';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

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

    if (!agreed) {
      setError('You must agree to the Terms & Privacy Policy.');
      return;
    }

    setLoading(true);

    try {
      // Simulate direct instant verification confirmation
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (err) {
      setError('Failed to setup registration parameters.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-20 px-6 max-w-[550px] mx-auto">
        <div className="bg-primary/20 border border-secondary/10 rounded-card p-8 shadow-card">
          <div className="border-b border-secondary/10 pb-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-black text-textLight">Create Account</h1>
            <p className="text-sm text-textMuted mt-1">Get up to 200% welcome bonus credited instantly with instant direct security clearance.</p>
          </div>

          {error && (
            <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-input text-xs font-semibold text-textLight mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-primary border border-secondary/20 rounded-input p-3 text-sm text-textLight focus:outline-none focus:border-accent font-sans"
              />
            </div>

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
              <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary border border-secondary/20 rounded-input p-3 text-sm text-textLight focus:outline-none focus:border-accent font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-primary border border-secondary/20 rounded-input p-3 text-sm text-textLight focus:outline-none focus:border-accent font-sans"
              />
            </div>

            <label className="flex items-start space-x-2.5 text-xs text-textMuted font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded text-accent bg-primary border-secondary/20 focus:ring-accent"
              />
              <span>I agree to the Terms of Service & Privacy Covenants</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary hover:shadow-glow text-primary font-black text-base py-3.5 rounded-button transition-all disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account & Clear Security'}
            </button>
          </form>

          <p className="text-center text-xs text-textMuted mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-secondary font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
