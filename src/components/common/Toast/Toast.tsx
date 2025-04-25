import React, { useEffect } from 'react';
import { SingleToastProps } from './types';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import { toast } from '../../../utils/toast';

// Toast icons mapping
const toastIcons = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

// Toast styles mapping
const toastStyles = {
  success: 'border-l-4 border-green-500 bg-green-50',
  error: 'border-l-4 border-red-500 bg-red-50',
  info: 'border-l-4 border-blue-500 bg-blue-50',
};

const Toast: React.FC<SingleToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        onClose();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, onClose]);

  return (
    <div className="animate-fade-in fixed bottom-0 left-0 z-50 w-full p-4 md:right-4 md:bottom-4 md:left-auto md:w-auto">
      <div
        className={`flex items-center justify-between rounded-lg p-4 shadow-lg ${toastStyles[toast.type]} max-w-[480px] md:min-w-[320px]`}
      >
        <div className="flex items-center gap-3">
          {toastIcons[toast.type]}
          <p className="text-gray-700">{toast.message}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export const ToastInitializer: React.FC = () => {
  const toastContext = useToast();

  useEffect(() => {
    toast.setContext(toastContext);
    return () => {
      // This would reset the context if the provider unmounts, though this is unlikely
      toast.setContext(null as any);
    };
  }, [toastContext]);

  return null;
};

export default Toast;
