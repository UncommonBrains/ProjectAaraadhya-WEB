import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../config/firebase';

interface SigoutState {
  loading: boolean;
  error: Error | null;
  success: boolean;
}

export const useSignoutViewModel = () => {
  const [state, setState] = useState<SigoutState>({
    loading: false,
    error: null,
    success: false,
  });

  const handleSignout = async () => {
    try {
      setState({ ...state, loading: true, error: null });
      await signOut(auth);
      setState({ ...state, loading: false, success: true });
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
    handleSignout,
    ...state,
  };
};
