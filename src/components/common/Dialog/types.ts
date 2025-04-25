export interface ConfirmationOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export interface ConfirmationDialogProps extends ConfirmationOptions {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
