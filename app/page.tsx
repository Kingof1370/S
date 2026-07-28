// app/page.tsx

'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LiveTicker from './components/LiveTicker';
import TrustSection from './components/TrustSection';
import HowItWorks from './components/HowItWorks';
import BonusCalculator from './components/BonusCalculator';
import FeaturesGrid from './components/FeaturesGrid';
import PropPreview from './components/PropPreview';
import Testimonials from './components/Testimonials';
import StatsCounter from './components/StatsCounter';
import FAQAccordion from './components/FAQAccordion';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function Home() {
  const [selectedPair, setSelectedPair] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-bgDark text-textLight font-sans">
      {/* Sticky Premium Header */}
      <Header />

      {/* Real-time Infinite Loop Marquee */}
      <LiveTicker onSelectPair={(symbol) => setSelectedPair(symbol)} />

      {/* Full Viewport Interactive Hero */}
      <Hero />

      {/* Core Security & FCA Trust Segment */}
      <TrustSection />

      {/* Interactive Sliders Bonus Segment */}
      <BonusCalculator />

      {/* Step-by-Step Flow */}
      <HowItWorks />

      {/* Prop Trading Capital Capitalization segment */}
      <PropPreview />

      {/* Real-time stats Counter */}
      <StatsCounter />

      {/* Grid of 6 Performance Features */}
      <FeaturesGrid />

      {/* Social proof testimonial Carousel */}
      <Testimonials />

      {/* Accordion FAQ with structural schema */}
      <FAQAccordion />

      {/* Final Conversion Action */}
      <FinalCTA />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
