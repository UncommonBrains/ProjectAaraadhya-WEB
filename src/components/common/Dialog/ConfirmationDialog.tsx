import React, { useEffect } from 'react';
import { ConfirmationDialogProps } from './types';

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onClose,
  onConfirm,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="mx-4 w-full max-w-md rounded-lg border border-amber-100 bg-white p-6 shadow-xl">
        <h3 className="mb-2 font-serif text-xl text-amber-900">{title}</h3>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
