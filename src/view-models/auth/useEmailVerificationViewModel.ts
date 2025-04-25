import { useState } from 'react';
import { useAuthContext } from '../../context/common/AuthContext/AuthContext';

interface EmailVerificationState {
  loading: boolean;
  coolDown: number;
  error: Error | null;
  success: boolean;
}

export const useEmailVerificationViewModel = () => {
  const { firebaseUser, verifyEmail } = useAuthContext();
  const [state, setState] = useState<EmailVerificationState>({
    loading: false,
    coolDown: 0,
    error: null,
    success: false,
  });

  const handleEmailVerification = async () => {
    try {
      setState({ ...state, loading: true, error: null });
      if (firebaseUser) await verifyEmail(firebaseUser);
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
    handleEmailVerification,
    ...state,
  };
};
