import { useState, useEffect, useCallback } from 'react';

export function useOnline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const setOnline = useCallback(() => setIsOnline(true), []);
  const setOffline = useCallback(() => setIsOnline(false), []);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, [setOnline, setOffline]);

  return isOnline;
}
