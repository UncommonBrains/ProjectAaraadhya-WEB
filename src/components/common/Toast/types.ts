// Define toast types
export type ToastType = 'success' | 'error' | 'info';

// Define toast data structure
export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface SingleToastProps {
  toast: ToastData;
  onClose: () => void;
}
