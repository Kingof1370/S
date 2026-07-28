// app/components/Header.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, HelpCircle, Shield, FileText } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary/80 backdrop-blur-xl border-b border-secondary/10 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
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

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/" className="text-sm font-semibold text-textLight/80 hover:text-secondary transition-colors relative group py-2">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/prop" className="text-sm font-semibold text-textLight/80 hover:text-secondary transition-colors relative group py-2">
            Prop Trading
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/#calculator" className="text-sm font-semibold text-textLight/80 hover:text-secondary transition-colors relative group py-2">
            1000% Bonus
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/#faq" className="text-sm font-semibold text-textLight/80 hover:text-secondary transition-colors relative group py-2">
            FAQs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/auth/login" className="text-sm font-bold text-textLight hover:text-secondary transition-colors px-4 py-2">
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="bg-gradient-primary hover:shadow-glow text-primary font-bold text-sm px-6 py-3 rounded-button transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Sign Up - Get 1000% Bonus
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-textLight/80 hover:text-textLight focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-primary z-40 px-6 py-8 flex flex-col space-y-6 border-t border-secondary/10 slide-in">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-lg font-bold text-textLight/90 hover:text-secondary"
          >
            Home
          </Link>
          <Link
            href="/prop"
            onClick={() => setIsOpen(false)}
            className="text-lg font-bold text-textLight/90 hover:text-secondary"
          >
            Prop Trading
          </Link>
          <Link
            href="/#calculator"
            onClick={() => setIsOpen(false)}
            className="text-lg font-bold text-textLight/90 hover:text-secondary"
          >
            1000% Bonus
          </Link>
          <Link
            href="/#faq"
            onClick={() => setIsOpen(false)}
            className="text-lg font-bold text-textLight/90 hover:text-secondary"
          >
            FAQs
          </Link>

          <hr className="border-secondary/10" />

          <Link
            href="/auth/login"
            onClick={() => setIsOpen(false)}
            className="text-center font-bold text-textLight hover:text-secondary py-3"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            onClick={() => setIsOpen(false)}
            className="bg-gradient-primary text-primary font-bold text-center py-4 rounded-button hover:shadow-glow transition-all"
          >
            Sign Up - Get 1000% Bonus
          </Link>
        </div>
      )}
    </header>
  );
}
