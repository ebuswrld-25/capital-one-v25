import { useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { storage } from '@/lib/storage';
import { INITIAL_BALANCE } from '@/lib/constants';

export const useAuthPersistence = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const storedUser = storage.getUser();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const login = (loginId: string, password: string, name: string) => {
    const newUser: User = {
      loginId,
      password,
      name,
      balance: INITIAL_BALANCE,
    };
    storage.saveUser(newUser);
    setUser(newUser);
    return newUser;
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!user) return null;
    const updatedUser = { ...user, ...updates };
    storage.saveUser(updatedUser);
    setUser(updatedUser);
    return updatedUser;
  };

  const updateBalance = (newBalance: number) => {
    if (!user) return null;
    const updatedUser = { ...user, balance: newBalance };
    storage.saveUser(updatedUser);
    setUser(updatedUser);
    return updatedUser;
  };

  const logout = () => {
    storage.clearUser();
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    updateUserProfile,
    updateBalance,
    logout,
  };
};
