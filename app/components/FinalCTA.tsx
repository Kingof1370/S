// app/components/FinalCTA.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-dark relative px-6 border-t border-secondary/10 overflow-hidden text-center">
      {/* Background glowing particles simulation */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <div className="max-w-[1440px] mx-auto relative z-10 space-y-8">
        <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-pill text-accent mx-auto">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">EXCLUSIVE OPPORTUNITY</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-textLight max-w-3xl mx-auto leading-tight">
          Ready to Start Trading?
        </h2>

        <p className="text-textMuted text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
          Join 12,000+ traders and claim your 1000% welcome bonus today. Get matched with up to $50,000 in free bonus capital instantly!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/auth/register"
            className="w-full sm:w-auto bg-textLight hover:bg-textLight/90 text-primary font-black text-lg px-8 py-4 rounded-button hover:shadow-hover transition-all duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-5 h-5 text-primary" />
          </Link>
        </div>

        <p className="text-xs text-textMuted font-semibold">
          No credit card • 2-minute signup • 100% secure • FCA regulated
        </p>
      </div>
    </section>
  );
}
