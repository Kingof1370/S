// app/components/FAQAccordion.tsx

'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_DATA } from '../lib/constants';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Structured schema for search engine crawlers
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQ_DATA.map((item) => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a,
      },
    })),
  };

  return (
    <section id="faq" className="py-20 bg-bgDark border-t border-secondary/10 px-6">
      {/* FAQ Schema in JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-pill text-secondary mx-auto">
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">HAVE QUESTIONS?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-textLight">
            Frequently Asked Questions
          </h2>
          <p className="text-textMuted font-semibold">
            All you need to know about deposits, our 1000% welcome bonus, prop evaluation rules, and funds security.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-primary/20 border border-secondary/10 rounded-card overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-primary/30 transition-colors focus:outline-none"
                >
                  <span className="font-heading font-bold text-textLight pr-4">
                    {item.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-accent shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-textMuted shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-6 pt-0 border-t border-secondary/5 text-sm text-textMuted leading-relaxed bg-bgDark/30">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
