import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';
import { useI18n } from './I18nContext';

interface ConnectionContextType {
  isOnline: boolean;
  pendingSync: number;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      
      // Simulate sync
      const pending = parseInt(localStorage.getItem('htl_pending_sync') || '0', 10);
      if (pending > 0) {
        setTimeout(() => {
          toast.success(`${t('connection.online')} — ${pending} ${t('connection.synced')}`);
          localStorage.setItem('htl_pending_sync', '0');
          setPendingSync(0);
        }, 1000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [t]);

  useEffect(() => {
    const pending = parseInt(localStorage.getItem('htl_pending_sync') || '0', 10);
    setPendingSync(pending);
  }, []);

  return (
    <ConnectionContext.Provider value={{ isOnline, pendingSync }}>
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('useConnection must be used within ConnectionProvider');
  }
  return context;
}
