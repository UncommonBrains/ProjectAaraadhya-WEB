import { useState } from 'react';
import { resetPassword } from '../../services/firebase/auth';

interface ResetPasswordState {
  loading: boolean;
  error: Error | null;
  success: boolean;
  coolDown: number;
}

export const useResetPasswordViewModel = () => {
  const [state, setState] = useState<ResetPasswordState>({
    loading: false,
    error: null,
    success: false,
    coolDown: 0,
  });

  const handleResetPassword = async (email: string) => {
    try {
      setState({ ...state, loading: true, error: null, success: false });
      await resetPassword(email);
      setState({ ...state, loading: false, success: true, coolDown: 60 });

      // Start countdown timer
      const timer = setInterval(() => {
        setState((prev) => {
          if (prev.coolDown <= 1) {
            clearInterval(timer);
            return { ...prev, coolDown: 0 };
          }
          return { ...prev, coolDown: prev.coolDown - 1 };
        });
      }, 1000);
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error instanceof Error ? error : new Error(String(error)),
        success: false,
      });
    }
  };

  return {
    handleResetPassword,
    ...state,
  };
};
