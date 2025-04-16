import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const toastIcons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <AlertCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const toastStyles = {
  success: 'border-l-4 border-green-500 bg-green-50',
  error: 'border-l-4 border-red-500 bg-red-50',
  info: 'border-l-4 border-blue-500 bg-blue-50',
};

const Toast = ({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 5000
}) => {
  useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed z-50 p-4
      md:bottom-4 md:right-4
      bottom-0 left-0 md:left-auto
      md:w-auto w-full
      animate-fade-in">
      <div className={`
        flex items-center justify-between
        p-4 rounded-lg shadow-lg
        ${toastStyles[type]}
        md:min-w-[320px] max-w-[480px]
      `}>
        <div className="flex items-center gap-3">
          {toastIcons[type]}
          <p className="text-gray-700">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
