import { useState, useEffect } from 'react';
import { SESSION_TIMEOUT, SESSION_TIMER_INTERVAL } from '@/lib/constants';

export const useSessionTimer = (onSessionExpire: () => void) => {
  const [timeRemaining, setTimeRemaining] = useState(SESSION_TIMEOUT);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - SESSION_TIMER_INTERVAL;

        if (newTime <= 0) {
          setIsActive(false);
          onSessionExpire();
          return 0;
        }

        return newTime;
      });
    }, SESSION_TIMER_INTERVAL);

    return () => clearInterval(interval);
  }, [isActive, onSessionExpire]);

  const resetTimer = () => {
    setTimeRemaining(SESSION_TIMEOUT);
    setIsActive(true);
  };

  const minutesRemaining = Math.floor(timeRemaining / 60000);
  const secondsRemaining = Math.floor((timeRemaining % 60000) / 1000);

  return {
    timeRemaining,
    minutesRemaining,
    secondsRemaining,
    isActive,
    resetTimer,
  };
};
