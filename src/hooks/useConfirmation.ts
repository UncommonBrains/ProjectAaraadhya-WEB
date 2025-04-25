import { useContext } from 'react';
import { ConfirmationDialogContext } from '../context/common/ConfirmationDialogContext/ConfirmationDialogContext';

export const useConfirmation = () => {
  const ctx = useContext(ConfirmationDialogContext);
  if (!ctx) throw new Error('useConfirmation must be used within ConfirmationDialogProvider');
  return ctx.show;
};
