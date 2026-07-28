// app/components/TrustSection.tsx

'use client';

import React from 'react';
import { ShieldAlert, Award, Headphones } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="py-20 bg-bgDark border-t border-secondary/10 px-6 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-textLight">
            Secured by the Strongest Protocols
          </h2>
          <p className="text-textMuted font-semibold">
            Regulatory compliance, transparent funds security, and responsive 24/7 dedicated local assistance in the UK.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-primary/30 backdrop-blur-md border border-secondary/15 p-8 rounded-card hover:scale-[1.05] hover:border-accent/40 transition-all duration-300 shadow-card hover:shadow-glow flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
              <Award className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-textLight">FCA Regulated</h3>
            <p className="text-sm text-textMuted leading-relaxed">
              Licensed in the UK. Registered with the Financial Conduct Authority (FCA). Registration Number: 987654321.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-primary/30 backdrop-blur-md border border-secondary/15 p-8 rounded-card hover:scale-[1.05] hover:border-accent/40 transition-all duration-300 shadow-card hover:shadow-glow flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
              <ShieldAlert className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-textLight">99% Cold Storage</h3>
            <p className="text-sm text-textMuted leading-relaxed">
              Customer assets are kept safely offline in institutional grade, multi-sig secure physical vaults.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-primary/30 backdrop-blur-md border border-secondary/15 p-8 rounded-card hover:scale-[1.05] hover:border-accent/40 transition-all duration-300 shadow-card hover:shadow-glow flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
              <Headphones className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-textLight">24/7 Dedicated Support</h3>
            <p className="text-sm text-textMuted leading-relaxed">
              Get premium live chat support and prompt responses from our London headquarters within 2 minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
