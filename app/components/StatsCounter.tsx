// app/components/StatsCounter.tsx

'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function StatsCounter() {
  const [users, setUsers] = useState(11000);
  const [deposits, setDeposits] = useState(3.8);
  const [transactions, setTransactions] = useState(32000);
  const [satisfaction, setSatisfaction] = useState(95.0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Trigger animations
          const duration = 2000; // 2 seconds
          const steps = 50;
          const stepTime = duration / steps;

          let currentStep = 0;
          const interval = setInterval(() => {
            currentStep++;
            setUsers(Math.min(12847, Math.floor((12847 / steps) * currentStep)));
            setDeposits(parseFloat(Math.min(4.2, (4.2 / steps) * currentStep).toFixed(1)));
            setTransactions(Math.min(34219, Math.floor((34219 / steps) * currentStep)));
            setSatisfaction(parseFloat(Math.min(98.7, (98.7 / steps) * currentStep).toFixed(1)));

            if (currentStep >= steps) {
              clearInterval(interval);
            }
          }, stepTime);

          observer.disconnect(); // Animate only once
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-bgDark border-t border-secondary/10 px-6">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-primary/20 p-8 rounded-card border border-secondary/10 text-center shadow-card hover:border-accent/30 transition-all">
          <p className="text-4xl md:text-5xl font-mono font-black text-textLight mb-2">
            {users.toLocaleString()}+
          </p>
          <span className="text-xs font-bold text-textMuted uppercase tracking-wider">Active Global Traders</span>
        </div>

        <div className="bg-primary/20 p-8 rounded-card border border-secondary/10 text-center shadow-card hover:border-accent/30 transition-all">
          <p className="text-4xl md:text-5xl font-mono font-black text-accent mb-2">
            ${deposits}M+
          </p>
          <span className="text-xs font-bold text-textMuted uppercase tracking-wider">Total Deposits Verified</span>
        </div>

        <div className="bg-primary/20 p-8 rounded-card border border-secondary/10 text-center shadow-card hover:border-accent/30 transition-all">
          <p className="text-4xl md:text-5xl font-mono font-black text-textLight mb-2">
            {transactions.toLocaleString()}+
          </p>
          <span className="text-xs font-bold text-textMuted uppercase tracking-wider">Successful Transactions</span>
        </div>

        <div className="bg-primary/20 p-8 rounded-card border border-secondary/10 text-center shadow-card hover:border-accent/30 transition-all">
          <p className="text-4xl md:text-5xl font-mono font-black text-accent mb-2">
            {satisfaction}%
          </p>
          <span className="text-xs font-bold text-textMuted uppercase tracking-wider">Satisfaction Rating</span>
        </div>
      </div>
    </section>
  );
}
