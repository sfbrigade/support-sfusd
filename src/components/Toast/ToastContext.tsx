import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import Toast from './Toast';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const hideToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const showToast = useCallback((message: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    setToastMessage(message);
    const newTimeoutId = setTimeout(() => {
      hideToast();
    }, 3000); // Hide the toast after 3 seconds
    setTimeoutId(newTimeoutId);
  }, [hideToast, timeoutId]);

  const value = { showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50">
          <Toast message={toastMessage} onClose={hideToast} />
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
