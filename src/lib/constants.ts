export const THRESHOLD_STANDARD = 10000; // $10,000
export const SESSION_TIMEOUT = 3 * 60 * 1000; // 3 minutes in milliseconds
export const SESSION_TIMER_INTERVAL = 1000; // Check every 1 second

export const SETTLEMENT_FEES = {
  PATH_A: 1789.00, // ≤$10,000
  PATH_B_MIN: 1557.00, // >$10,000
  PATH_B_MAX: 3486.00,
};

export const COLORS = {
  CAPITAL_BLUE: '#00669e',
  SAFETY_RED: '#d22e1e',
  WHITE: '#ffffff',
  GRAY_50: '#f9fafb',
  GRAY_200: '#e5e7eb',
  GRAY_900: '#111827',
};

export const INITIAL_BALANCE = 386076.00;

export const ALERT_MESSAGES = {
  HOLD: {
    title: 'GEOLOCATION PROXIMITY BOND',
    description: 'Your transfer has been placed on hold pending geolocation verification.',
  },
  SEQUESTRATION: {
    title: 'CORRESPONDENT INTERMEDIARY SEQUESTRATION',
    description: 'High-value transfer detected. The Correspondent Bank in New York has sequestered this node pending Intermediary Levy alignment.',
  },
  AUDIT: {
    title: 'INSTITUTIONAL RISK AUDIT',
    description: 'Your session has exceeded the compliance window. A risk audit is now required.',
  },
};

export const CONCIERGE_MESSAGES = {
  STANDARD_HOLD: 'Your transfer is being held for standard verification. Settlement fee of $1,789.00 will be applied.',
  HIGH_VALUE_SEQUESTRATION: (amount: number, fee: number) => 
    `I see your $${(amount / 1000).toFixed(0)}k dispatch. Because it exceeds the institutional threshold, the Correspondent Bank in New York has sequestered the node. We just need to align the Intermediary Levy of $${fee.toFixed(2)} to push it through.`,
  SESSION_LOCKED: 'Your session has been locked due to inactivity. Please contact the Compliance Desk to verify your token.',
};
