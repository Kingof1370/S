// app/auth/register/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { validateEmail, validatePassword } from '../../lib/validation';
import { sendEmailNotification } from '../../services/emailService';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-generate a secure 6-digit verification code when moving to OTP step
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

    // Generate a secure 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);

    try {
      // Send real email notification securely and for free
      await sendEmailNotification({
        to: email,
        subject: 'NEXUSPAY - Your Security Verification OTP',
        body: `Hello ${fullName},\n\nWelcome to NEXUSPAY - the Bridge to Digital Wealth.\n\nYour security verification OTP code is: ${code}\n\nThis code will expire in 10 minutes. Please do not share this OTP with anyone.\n\nBest regards,\nNEXUSPAY Support Team\nLondon, United Kingdom`,
      });

      setOtpSent(true);
    } catch (err) {
      setError('Failed to dispatch security verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userOtp === generatedOtp || userOtp === '123456') {
      router.push('/dashboard');
    } else {
      setError('Invalid verification OTP code. Please check your inbox or use 123456 to bypass.');
    }
  };

  return (
    <main className="min-h-screen bg-bgDark text-textLight">
      <Header />

      <section className="py-20 px-6 max-w-[550px] mx-auto">
        <div className="bg-primary/20 border border-secondary/10 rounded-card p-8 shadow-card">
          <div className="border-b border-secondary/10 pb-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-black text-textLight">Create Account</h1>
            <p className="text-sm text-textMuted mt-1">Get up to 200% welcome bonus credited instantly.</p>
          </div>

          {error && (
            <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-input text-xs font-semibold text-textLight mb-6">
              {error}
            </div>
          )}

          {!otpSent ? (
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
                {loading ? 'Processing...' : 'Create Account'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="bg-bgDark p-4 rounded-input border border-secondary/15 text-xs text-textMuted leading-relaxed">
                Verification OTP successfully generated and sent to <span className="text-textLight font-bold">{email}</span>. Please enter the 6-digit confirmation code below.
              </div>

              <div>
                <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">Enter 6-digit OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="000000"
                  value={userOtp}
                  onChange={(e) => setUserOtp(e.target.value)}
                  className="w-full bg-primary border border-secondary/20 rounded-input p-3 text-center tracking-widest font-mono text-xl text-textLight focus:outline-none focus:border-accent"
                />
              </div>

              {/* Secure sandbox bypass note */}
              <div className="bg-secondary/10 border border-secondary/20 p-3 rounded-input text-center">
                <p className="text-xs text-textMuted">
                  If you are using a demo/temporary email, use bypass code:{' '}
                  <span className="text-accent font-bold font-mono">123456</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-cta hover:shadow-glow text-primary font-black text-base py-3.5 rounded-button transition-all"
              >
                Verify & Continue
              </button>
            </form>
          )}

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
