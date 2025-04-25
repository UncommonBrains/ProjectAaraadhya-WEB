import { ReactNode } from 'react';
import { ToastType } from '../../../components/common/Toast/types';

// Define toast context interface
export interface ToastContextProps {
  showToast: (message: string, type: ToastType, duration?: number) => void;
  hideToast: (id: string) => void;
}

export interface ToastProviderProps {
  children: ReactNode;
}
