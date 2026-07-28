import React from 'react';
import './globals.css';

export const metadata = {
  title: 'NEXUSPAY - Bridge to Digital Wealth',
  description: 'Trade cryptocurrency with 200% welcome match bonus and prop trading capital up to $500,000 on UK regulated FCA ecosystem.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>NEXUSPAY - Bridge to Digital Wealth</title>
        <meta name="description" content="Trade cryptocurrency with 200% welcome match bonus and prop trading capital up to $500,000 on UK regulated FCA ecosystem." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@700;800;900&family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
