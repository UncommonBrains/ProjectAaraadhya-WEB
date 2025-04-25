import { createContext, useCallback, useState } from 'react';
import { ToastContextProps, ToastProviderProps } from './types';
import { ToastData, ToastType } from '../../../components/common/Toast/types';
import Toast from '../../../components/common/Toast/Toast';

export const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 5000) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    [],
  );

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => hideToast(toast.id)} />
      ))}
    </ToastContext.Provider>
  );
};
