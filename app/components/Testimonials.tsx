// app/components/Testimonials.tsx

'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../lib/constants';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-primary/10 relative px-6 border-t border-secondary/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Text */}
        <div className="lg:col-span-4 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-pill text-secondary">
            <span className="text-xs font-bold uppercase tracking-wider">USER SUCCESS STORIES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-textLight leading-tight">
            Loved by Traders Everywhere
          </h2>
          <p className="text-textMuted font-semibold leading-relaxed">
            See how our premium execution, generous 200% welcome matches, and reliable customer service build long-term trust with our community.
          </p>

          <div className="flex items-center space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full border border-secondary/20 hover:bg-secondary/10 text-textLight transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full border border-secondary/20 hover:bg-secondary/10 text-textLight transition-all"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Carousel Card Column */}
        <div className="lg:col-span-8 relative">
          <div className="absolute -inset-1 bg-gradient-primary rounded-card blur-md opacity-20"></div>
          <div className="relative bg-bgDark border border-secondary/15 p-8 md:p-12 rounded-card shadow-card">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx} className="text-accent text-xl font-bold">
                    ★
                  </span>
                ))}
                <span className="text-xs font-mono font-semibold text-textMuted ml-2">
                  ({TESTIMONIALS_DATA[currentIndex].rating.toFixed(1)})
                </span>
              </div>
              <Quote className="w-10 h-10 text-secondary/35" />
            </div>

            <p className="text-lg md:text-xl font-heading font-medium text-textLight leading-relaxed mb-8 italic">
              &ldquo;{TESTIMONIALS_DATA[currentIndex].quote}&rdquo;
            </p>

            <div className="flex items-center space-x-4 border-t border-secondary/10 pt-6">
              <div className="w-12 h-12 rounded-full bg-secondary/20 font-bold text-secondary flex items-center justify-center">
                {TESTIMONIALS_DATA[currentIndex].name[0]}
              </div>
              <div>
                <h4 className="font-heading font-bold text-textLight">{TESTIMONIALS_DATA[currentIndex].name}</h4>
                <p className="text-xs text-textMuted font-semibold uppercase tracking-wider">
                  Verified Trader • {TESTIMONIALS_DATA[currentIndex].location}, UK
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
