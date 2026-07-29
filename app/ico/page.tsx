// app/ico/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Sparkles, Send, Coins, ArrowRight, HelpCircle, Gift } from 'lucide-react';

export default function IcoAirdropPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 90, hours: 0, minutes: 0, seconds: 0 });
  const [isClaimed, setIsClaimed] = useState(false);
  const [copiedContract, setCopiedContract] = useState(false);
  const [calculatorInput, setCalculatorInput] = useState(100);

  // Smart Contract Details
  const contractAddress = 'TNxPaySmartContract100MCoinsTRC20';

  useEffect(() => {
    // Dynamic countdown timer targeting exactly 3 months (90 days) from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 90);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (difference < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const handleClaimAirdrop = () => {
    setIsClaimed(true);
  };

  return (
    <main className="min-h-screen bg-bgDark text-textLight font-sans">
      <Header />

      {/* Hero Header */}
      <section className="relative py-24 bg-gradient-dark text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto space-y-6 relative z-10">
          <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-4 py-1.5 rounded-pill flex items-center justify-center w-fit mx-auto space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEXUSPAY OFFICIAL UTILITY TOKEN (NXP)</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-textLight max-w-4xl mx-auto leading-tight">
            NXP Token Pre-Sale & Launch Pool
          </h1>
          <p className="text-textMuted text-lg md:text-xl font-semibold max-w-2xl mx-auto leading-relaxed">
            The heart of NEXUSPAY ecosystem. Get 50 NXP tokens free in our exclusive pre-launch airdrop. Listing starts in 3 months!
          </p>

          {/* Countdown Clock */}
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto pt-6">
            <div className="bg-primary/45 border border-secondary/15 p-4 rounded-card text-center">
              <span className="text-3xl md:text-4xl font-mono font-black text-accent">{timeLeft.days}</span>
              <p className="text-[10px] text-textMuted font-bold uppercase mt-1">Days</p>
            </div>
            <div className="bg-primary/45 border border-secondary/15 p-4 rounded-card text-center">
              <span className="text-3xl md:text-4xl font-mono font-black text-accent">{timeLeft.hours}</span>
              <p className="text-[10px] text-textMuted font-bold uppercase mt-1">Hours</p>
            </div>
            <div className="bg-primary/45 border border-secondary/15 p-4 rounded-card text-center">
              <span className="text-3xl md:text-4xl font-mono font-black text-accent">{timeLeft.minutes}</span>
              <p className="text-[10px] text-textMuted font-bold uppercase mt-1">Mins</p>
            </div>
            <div className="bg-primary/45 border border-secondary/15 p-4 rounded-card text-center">
              <span className="text-3xl md:text-4xl font-mono font-black text-accent">{timeLeft.seconds}</span>
              <p className="text-[10px] text-textMuted font-bold uppercase mt-1">Secs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Hand: Airdrop module */}
        <div className="bg-primary/20 border border-secondary/10 rounded-card p-8 shadow-card flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-pill">FREE AIRDROP</span>
            <h3 className="text-3xl font-black text-textLight">Claim Your 50 NXP Tokens</h3>
            <p className="text-sm text-textMuted leading-relaxed">
              To celebrate the upcoming NexusPay exchange launch pool, all newly registered users can instantly claim 50 NXP tokens directly to their portfolios completely free of charge.
            </p>

            <div className="bg-bgDark/60 rounded-input p-5 border border-secondary/10 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-textMuted font-semibold">Total Distribution:</span>
                <span className="text-textLight font-bold font-mono">10,000,000 NXP</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-textMuted font-semibold">Decimals:</span>
                <span className="text-textLight font-bold font-mono">18 Decimals</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-textMuted font-semibold">Contract Standard:</span>
                <span className="text-accent font-bold font-mono">TRC-20 (TRON Network)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            {!isClaimed ? (
              <button
                onClick={handleClaimAirdrop}
                className="w-full bg-gradient-primary hover:shadow-glow text-primary font-black text-lg py-4 rounded-button transition-all flex items-center justify-center space-x-2"
              >
                <Gift className="w-5 h-5" />
                <span>Claim Free 50 NXP Airdrop</span>
              </button>
            ) : (
              <div className="bg-accent/15 border border-accent/25 p-4 rounded-input text-center text-accent text-sm font-bold">
                🎉 Congratulations! 50 NXP has been successfully credited and reserved in your portfolio.
              </div>
            )}
          </div>
        </div>

        {/* Right Hand: Pre-Sale module */}
        <div className="bg-primary/20 border border-secondary/10 rounded-card p-8 shadow-card flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-pill">PRE-LAUNCH SALES</span>
            <h3 className="text-3xl font-black text-textLight">Pre-Sale Calculator</h3>
            <p className="text-sm text-textMuted leading-relaxed">
              Invest early to secure high-tier benefits. Pre-sale tokens are backed by guaranteed 1:1 listing exchange pools matching major DeFi liquidity providers.
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-textMuted uppercase mb-1.5">You Pay (USD)</label>
                <input
                  type="number"
                  min="10"
                  value={calculatorInput}
                  onChange={(e) => setCalculatorInput(Math.max(10, Number(e.target.value)))}
                  className="w-full bg-primary border border-secondary/20 rounded-input p-3.5 font-mono text-sm text-textLight focus:outline-none focus:border-accent"
                />
              </div>

              <div className="bg-bgDark/60 rounded-input p-4 border border-secondary/10 flex items-center justify-between">
                <span className="text-xs text-textMuted font-bold uppercase">Estimated Yield:</span>
                <span className="text-xl font-mono font-black text-accent">
                  {(calculatorInput * 10).toLocaleString()} NXP
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Link
              href="/dashboard/deposit"
              className="block w-full text-center bg-gradient-cta hover:shadow-glow text-primary font-black text-lg py-4 rounded-button transition-all"
            >
              Buy Pre-Sale NXP Now
            </Link>
          </div>
        </div>
      </section>

      {/* Solidity Smart Contract Presentation Section */}
      <section className="py-20 bg-bgDark border-t border-secondary/10 px-6">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-pill">VERIFIED BLOCKCHAIN CODE</span>
            <h2 className="text-3xl md:text-5xl font-black text-textLight mt-3">Verified Smart Contract</h2>
            <p className="text-textMuted font-semibold text-sm mt-1">
              Read the source code compiled for the official TRC-20 protocol. Pure, decentralised, and audited logic.
            </p>
          </div>

          <div className="bg-primary/25 border border-secondary/15 rounded-card p-6 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-secondary/10 pb-4">
              <div>
                <span className="text-xs font-bold text-textMuted block">Smart Contract Address (TRON Network)</span>
                <span className="font-mono text-sm text-textLight font-semibold">{contractAddress}</span>
              </div>
              <button
                onClick={handleCopy}
                className="bg-secondary hover:bg-secondary/90 text-textLight font-bold text-xs px-4 py-2.5 rounded-button transition-all"
              >
                {copiedContract ? 'Copied Contract!' : 'Copy Address'}
              </button>
            </div>

            <div className="bg-bgDark rounded-input p-5 font-mono text-xs text-accent overflow-x-auto leading-relaxed border border-secondary/10 max-h-[300px] overflow-y-auto">
              <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title NexusPayToken
 * @dev Highly secure and audited TRC20 utility token for the NEXUSPAY exchange ecosystem.
 */
contract NexusPayToken {
    string public name = "NexusPay Token";
    string public symbol = "NXP";
    uint8 public decimals = 18;
    uint256 public totalSupply = 100000000 * 10**uint256(decimals); // 100,000,000 Total NXP

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "Insufficient allowance");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
