export interface User {
  loginId: string;
  password: string;
  name: string;
  balance: number;
}

export interface Transaction {
  id: string;
  amount: number;
  recipient: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'sequestered';
  settlementFee: number;
  path: 'A' | 'B';
  riskMetrics?: RiskMetrics;
}

export interface RiskMetrics {
  velocity: number;
  nodeMismatch: boolean;
  amlFilterFlag: boolean;
}

export interface AlertConfig {
  type: 'hold' | 'sequestration' | 'audit';
  title: string;
  description: string;
  borderColor: string;
  isDismissible: boolean;
  actions: AlertAction[];
}

export interface AlertAction {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

export interface SessionState {
  isAuthenticated: boolean;
  user: User | null;
  timeRemaining: number;
  isLocked: boolean;
}
