// app/components/Footer.tsx

'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary/95 border-t border-secondary/15 pt-16 pb-8 px-6 text-textMuted text-sm backdrop-blur-xl relative z-10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
        {/* Column 1 */}
        <div className="lg:col-span-2 space-y-6">
          <Link href="/" className="flex items-center space-x-2 group">
            <svg
              className="w-8 h-8 text-secondary group-hover:rotate-12 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="font-heading font-black text-2xl tracking-wider text-textLight bg-gradient-primary bg-clip-text text-transparent">
              NEXUSPAY
            </span>
          </Link>
          <p className="text-textMuted font-medium max-w-sm leading-relaxed">
            Bridge to Digital Wealth. Build highly lucrative, capital-multiplied portfolios backed by UK FCA regulation and institutional matching engines.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <span className="cursor-pointer hover:text-secondary font-bold font-heading text-xs tracking-wider">TWITTER(X)</span>
            <span className="cursor-pointer hover:text-secondary font-bold font-heading text-xs tracking-wider">LINKEDIN</span>
            <span className="cursor-pointer hover:text-secondary font-bold font-heading text-xs tracking-wider">DISCORD</span>
            <span className="cursor-pointer hover:text-secondary font-bold font-heading text-xs tracking-wider">YOUTUBE</span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <h4 className="font-bold text-textLight uppercase tracking-wider text-xs">Product</h4>
          <ul className="space-y-2">
            <li><Link href="/#calculator" className="hover:text-secondary transition-colors">200% Welcome Bonus</Link></li>
            <li><Link href="/prop" className="hover:text-secondary transition-colors">Prop Trading Challenge</Link></li>
            <li><Link href="/#calculator" className="hover:text-secondary transition-colors">Pricing & Rates</Link></li>
            <li><span className="opacity-50">Mobile App (Q3 2026)</span></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="space-y-4">
          <h4 className="font-bold text-textLight uppercase tracking-wider text-xs">Support</h4>
          <ul className="space-y-2">
            <li><Link href="/#faq" className="hover:text-secondary transition-colors">Help Center & FAQs</Link></li>
            <li><span className="cursor-pointer hover:text-secondary">London Live Support</span></li>
            <li><span className="cursor-pointer hover:text-secondary">API Reference Status</span></li>
            <li><span className="cursor-pointer hover:text-secondary">Feedback Portal</span></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="space-y-4">
          <h4 className="font-bold text-textLight uppercase tracking-wider text-xs">Legal</h4>
          <ul className="space-y-2 text-xs">
            <li><span className="cursor-pointer hover:text-secondary">Privacy Policy</span></li>
            <li><span className="cursor-pointer hover:text-secondary">Terms & Conditions</span></li>
            <li><span className="cursor-pointer hover:text-secondary">FCA Compliance Info</span></li>
            <li><span className="cursor-pointer hover:text-secondary font-bold text-warning">Crypto Risk Warning</span></li>
            <li><span className="cursor-pointer hover:text-secondary">AML & KYC Policy</span></li>
          </ul>
        </div>
      </div>

      <hr className="border-secondary/15 my-8" />

      {/* Bottom info */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between text-xs gap-6">
        <div className="space-y-2">
          <p>© 2026 NexusPay. All rights reserved. FCA Registered in the UK.</p>
          <p className="max-w-xl leading-relaxed text-[11px] opacity-65">
            Risk Warning: Cryptocurrency trading carries significant risk and may result in the loss of your capital. NexusPay holds FCA registered credentials in the UK under registry numbers displayed. Physical office: 71-75 Shelton Street, Covent Garden, London WC2H 9JQ.
          </p>
        </div>

        {/* Payment logos representation */}
        <div className="flex items-center space-x-4 opacity-50 grayscale hover:grayscale-0 transition-all font-mono font-black text-sm">
          <span>VISA</span>
          <span>MASTERCARD</span>
          <span className="text-accent">TRON (TRX)</span>
          <span>BTC</span>
          <span>ETH</span>
        </div>
      </div>
    </footer>
  );
}
