import React, { createContext, useCallback, useContext, useState } from 'react';
import Toast from '../../components/Toast';

export const ToastContext = createContext({
  showToast: (message, type, duration) => { },
});

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: '',
    type: 'info',
    isVisible: false,
    duration: 3000,
  });

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setToast({ message, type, isVisible: true, duration });
  }, []);

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
        duration={toast.duration}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
