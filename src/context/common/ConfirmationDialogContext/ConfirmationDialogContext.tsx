import React, { createContext, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ConfirmationDialogProps,
  ConfirmationOptions,
} from '../../../components/common/Dialog/types';
import { ConfirmationDialog } from '../../../components/common/Dialog/ConfirmationDialog';

export const ConfirmationDialogContext = createContext<{
  show: (options: Omit<ConfirmationOptions, 'isOpen'>) => Promise<boolean>;
} | null>(null);

export const ConfirmationDialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [options, setOptions] = useState<
    ConfirmationDialogProps & { resolve?: (v: boolean) => void }
  >({
    isOpen: false,
    title: '',
    message: '',
    onClose: () => {},
    onConfirm: () => {},
  });

  const show = (opts: Omit<ConfirmationOptions, 'isOpen'>): Promise<boolean> =>
    new Promise((resolve) => {
      setOptions({
        ...opts,
        isOpen: true,
        onClose: () => {
          setOptions((prev) => ({ ...prev, isOpen: false }));
          resolve(false);
        },
        onConfirm: () => {
          setOptions((prev) => ({ ...prev, isOpen: false }));
          resolve(true);
        },
      });
    });

  return (
    <ConfirmationDialogContext.Provider value={{ show }}>
      {children}
      {createPortal(<ConfirmationDialog {...options} />, document.body)}
    </ConfirmationDialogContext.Provider>
  );
};
