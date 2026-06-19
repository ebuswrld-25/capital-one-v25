import { User } from './types';

const USER_STORAGE_KEY = 'capital_one_user';
const TRANSACTION_HISTORY_KEY = 'capital_one_transactions';

export const storage = {
  // User Management
  saveUser: (user: User) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  clearUser: () => {
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  // Transaction History
  addTransaction: (transaction: any) => {
    const history = JSON.parse(localStorage.getItem(TRANSACTION_HISTORY_KEY) || '[]');
    history.push(transaction);
    localStorage.setItem(TRANSACTION_HISTORY_KEY, JSON.stringify(history));
  },

  getTransactionHistory: () => {
    return JSON.parse(localStorage.getItem(TRANSACTION_HISTORY_KEY) || '[]');
  },

  clearTransactionHistory: () => {
    localStorage.removeItem(TRANSACTION_HISTORY_KEY);
  },
};
