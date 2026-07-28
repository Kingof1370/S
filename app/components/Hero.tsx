// app/components/Hero.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Shield, Zap, Globe, Sparkles } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Elegant Interactive 3D/WebGL Particle Effect on Hero Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        radius: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid lines
      ctx.strokeStyle = 'rgba(0, 102, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particles & links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 170, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00D4AA';
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 102, 255, ${(1 - dist / 120) * 0.15})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-between overflow-hidden bg-bgDark pt-10 pb-20 px-6">
      {/* Background elegant canvas */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          {/* Top Badge */}
          <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 px-4 py-2 rounded-pill w-fit text-secondary hover:bg-secondary/20 transition-all cursor-pointer">
            <span className="text-sm font-bold">🇬🇧 UK&apos;s Most Trusted Exchange 2026</span>
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-textLight leading-[1.15]">
              Trade Crypto with{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent hover:brightness-110 transition-all">
                200% Welcome Bonus
              </span>
            </h1>
            <p className="text-lg md:text-xl font-semibold text-textMuted max-w-xl">
              Deposit $50 in TRON, get $500 FREE. FCA registered. Instant withdrawals. Start building your digital legacy today.
            </p>
          </div>

          {/* Value Props Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3 bg-primary/20 p-4 rounded-card border border-secondary/10 hover:border-accent/40 transition-all">
              <Zap className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-textLight text-sm">0% Deposit Fees</h4>
                <p className="text-xs text-textMuted">No hidden charges</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-primary/20 p-4 rounded-card border border-secondary/10 hover:border-accent/40 transition-all">
              <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-textLight text-sm">Bank-Grade Security</h4>
                <p className="text-xs text-textMuted">99% offline cold storage</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-primary/20 p-4 rounded-card border border-secondary/10 hover:border-accent/40 transition-all">
              <Globe className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-textLight text-sm">Global Access</h4>
                <p className="text-xs text-textMuted">Trade 24/7 anywhere</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/auth/register"
              className="w-full sm:w-auto bg-gradient-cta text-primary font-black text-lg px-8 py-4 rounded-button text-center hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300 animate-pulse"
            >
              Get Started – Free
            </Link>
            <Link
              href="/prop"
              className="w-full sm:w-auto border border-secondary/50 text-textLight hover:bg-secondary/10 font-bold text-lg px-8 py-4 rounded-button text-center transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Explore Prop Trading</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trust bar */}
          <div className="border-t border-secondary/10 pt-6">
            <p className="text-xs text-textMuted font-semibold uppercase tracking-wider mb-3">
              Trusted by 12,000+ traders worldwide
            </p>
            <div className="flex items-center space-x-6 opacity-60 grayscale hover:grayscale-0 transition-all">
              <span className="font-heading font-extrabold text-base tracking-wider text-textLight">BLOOMBERG</span>
              <span className="font-heading font-extrabold text-base tracking-wider text-textLight">FORBES</span>
              <span className="font-heading font-extrabold text-base tracking-wider text-textLight">REUTERS</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Dashboard Widget Column */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-1 bg-gradient-primary rounded-card blur-lg opacity-35 animate-pulse"></div>
          <div className="relative bg-primary/40 backdrop-blur-xl border border-secondary/20 p-6 rounded-card shadow-card hover:shadow-hover transition-all duration-300">
            {/* Widget header */}
            <div className="flex items-center justify-between border-b border-secondary/10 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-accent animate-ping"></span>
                <span className="font-heading font-bold text-sm text-textLight">TRX/USD Real-time Engine</span>
              </div>
              <span className="text-xs text-accent font-bold font-mono">LIVE FEED</span>
            </div>

            {/* Dashboard metrics */}
            <div className="space-y-6">
              {/* Balance Card */}
              <div className="bg-bgDark/80 p-5 rounded-input border border-secondary/10">
                <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Interactive Balance</p>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-3xl font-mono font-bold text-textLight">$12,847.50</h3>
                  <span className="text-xs text-accent font-mono bg-accent/10 px-2 py-0.5 rounded-pill">+23.5%</span>
                </div>
              </div>

              {/* Bonus meter */}
              <div className="bg-bgDark/80 p-5 rounded-input border border-secondary/10">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-textMuted font-bold uppercase tracking-wider">🎁 200% Bonus Claimed Today</p>
                  <span className="text-xs text-accent font-mono font-semibold">342 Users</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-primary/50 h-3 rounded-pill overflow-hidden">
                  <div className="bg-gradient-primary h-full w-[84%] rounded-pill transition-all duration-1000"></div>
                </div>
              </div>

              {/* Recent activity list */}
              <div className="space-y-3">
                <p className="text-xs text-textMuted font-bold uppercase tracking-wider">Recent Transactions</p>
                <div className="space-y-2 max-h-[140px] overflow-y-auto">
                  <div className="flex items-center justify-between text-xs py-1 border-b border-secondary/5">
                    <span className="text-textLight font-semibold">User Sarah J. deposited TRON</span>
                    <span className="text-accent font-mono font-bold">+$500.00 FREE Bonus</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-secondary/5">
                    <span className="text-textLight font-semibold">User Michael C. passed Phase 1</span>
                    <span className="text-secondary font-mono font-bold">$50,000 Challenge</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="text-textLight font-semibold">User Emma W. claimed TRX Reward</span>
                    <span className="text-accent font-mono font-bold">+$120.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
