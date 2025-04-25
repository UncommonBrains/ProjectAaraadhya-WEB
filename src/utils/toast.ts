import { ToastType } from '../components/common/Toast/types';
import { useToast } from '../hooks/useToast';

export const createToast = () => {
  // This will be initialized when ToastProvider is mounted
  let contextValue: ReturnType<typeof useToast> | null = null;

  // Function to set the context value
  const setContext = (context: ReturnType<typeof useToast>) => {
    contextValue = context;
  };

  // Toast service methods
  return {
    setContext,
    show: (message: string, type: ToastType = 'info', duration?: number) => {
      if (contextValue) {
        contextValue.showToast(message, type, duration);
      } else {
        console.warn('Toast service not initialized. Make sure ToastProvider is mounted.');
      }
    },
    success: (message: string, duration?: number) => {
      if (contextValue) {
        contextValue.showToast(message, 'success', duration);
      } else {
        console.warn('Toast service not initialized. Make sure ToastProvider is mounted.');
      }
    },
    error: (message: string, duration?: number) => {
      if (contextValue) {
        contextValue.showToast(message, 'error', duration);
      } else {
        console.warn('Toast service not initialized. Make sure ToastProvider is mounted.');
      }
    },
    info: (message: string, duration?: number) => {
      if (contextValue) {
        contextValue.showToast(message, 'info', duration);
      } else {
        console.warn('Toast service not initialized. Make sure ToastProvider is mounted.');
      }
    },
  };
};

// Create and export a singleton instance
export const toast = createToast();
