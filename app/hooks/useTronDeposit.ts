// app/hooks/useTronDeposit.ts

import { useState, useEffect } from 'react';
import { simulateTxHash } from '../services/tronService';

export type DepositStatus = 'Waiting' | 'Detected' | 'Confirming' | 'Confirmed';

export function useTronDeposit(onConfirm?: (amountUSD: number) => void) {
  const [status, setStatus] = useState<DepositStatus>('Waiting');
  const [confirmations, setConfirmations] = useState(0);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);

  const startSimulator = (usdAmount: number) => {
    setStatus('Waiting');
    setConfirmations(0);
    setTxHash(null);
    setDepositAmount(usdAmount);

    // Step 1: Detect transaction after 3 seconds
    setTimeout(() => {
      setStatus('Detected');
      setTxHash(simulateTxHash());

      // Step 2: Start confirming
      setTimeout(() => {
        setStatus('Confirming');
        let currentConf = 0;
        const interval = setInterval(() => {
          currentConf += 1;
          setConfirmations(currentConf);
          if (currentConf >= 19) {
            clearInterval(interval);
            setStatus('Confirmed');
            if (onConfirm) {
              onConfirm(usdAmount);
            }
          }
        }, 200); // 19 confirmations in ~4 seconds
      }, 1500);
    }, 2000);
  };

  return {
    status,
    confirmations,
    txHash,
    depositAmount,
    startSimulator,
  };
}
