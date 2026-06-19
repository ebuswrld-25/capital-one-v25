import { useState } from 'react';
import { Transaction, RiskMetrics } from '@/lib/types';
import { processTransfer, generateRiskMetrics } from '@/lib/utils';
import { storage } from '@/lib/storage';

export const useTransferLogic = () => {
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics | null>(null);

  const initiateTransfer = (amount: string, recipient: string, currentBalance: number) => {
    setIsProcessing(true);

    // Parse and validate amount
    const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));

    if (isNaN(numericAmount) || numericAmount <= 0 || numericAmount > currentBalance) {
      setIsProcessing(false);
      return null;
    }

    // Process transfer and determine path
    const { path, settlementFee } = processTransfer(amount);

    // Generate risk metrics if Path B
    if (path === 'B') {
      setRiskMetrics(generateRiskMetrics());
    }

    // Create transaction record
    const transaction: Transaction = {
      id: Date.now().toString(),
      amount: numericAmount,
      recipient,
      timestamp: new Date(),
      status: path === 'A' ? 'pending' : 'sequestered',
      settlementFee,
      path,
      riskMetrics: path === 'B' ? generateRiskMetrics() : undefined,
    };

    setCurrentTransaction(transaction);
    storage.addTransaction(transaction);

    setIsProcessing(false);
    return transaction;
  };

  const completeTransfer = (transaction: Transaction, newBalance: number) => {
    const updatedTransaction = {
      ...transaction,
      status: 'completed' as const,
    };
    setCurrentTransaction(updatedTransaction);
    return updatedTransaction;
  };

  const clearTransaction = () => {
    setCurrentTransaction(null);
    setRiskMetrics(null);
  };

  return {
    currentTransaction,
    isProcessing,
    riskMetrics,
    initiateTransfer,
    completeTransfer,
    clearTransaction,
  };
};
