// app/components/LoadingSpinner.tsx

'use client';

import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-secondary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-textMuted font-mono text-xs uppercase tracking-wider animate-pulse">
        Securing nexus node connection...
      </p>
    </div>
  );
}
