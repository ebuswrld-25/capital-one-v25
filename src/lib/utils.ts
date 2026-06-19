import { THRESHOLD_STANDARD, SETTLEMENT_FEES } from './constants';

/**
 * Process transfer amount and determine routing path
 * Path A: ≤$10,000
 * Path B: >$10,000
 */
export const processTransfer = (amount: string): {
  path: 'A' | 'B';
  settlementFee: number;
} => {
  const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));

  if (numericAmount <= THRESHOLD_STANDARD) {
    return {
      path: 'A',
      settlementFee: SETTLEMENT_FEES.PATH_A,
    };
  } else {
    // Generate dynamic fee between min and max for Path B
    const dynamicFee =
      SETTLEMENT_FEES.PATH_B_MIN +
      Math.random() * (SETTLEMENT_FEES.PATH_B_MAX - SETTLEMENT_FEES.PATH_B_MIN);

    return {
      path: 'B',
      settlementFee: Math.round(dynamicFee * 100) / 100,
    };
  }
};

/**
 * Generate risk metrics for audit display
 */
export const generateRiskMetrics = () => {
  return {
    velocity: Math.floor(Math.random() * 100),
    nodeMismatch: Math.random() > 0.7,
    amlFilterFlag: Math.random() > 0.85,
  };
};

/**
 * Format currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date and time
 */
export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date);
};

/**
 * Validate login credentials
 */
export const validateCredentials = (id: string, password: string): boolean => {
  return id.trim().length > 0 && password.length > 0;
};
