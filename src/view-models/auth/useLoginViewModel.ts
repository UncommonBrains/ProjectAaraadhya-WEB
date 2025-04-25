import { useState } from 'react';
import { useAuthContext } from '../../context/common/AuthContext/AuthContext';

interface LoginForm {
  email: string;
  password: string;
}

interface LoginState {
  loading: boolean;
  error: Error | null;
  success: boolean;
}

export const useLoginViewModel = () => {
  const { loginWithEmail, loginWithGoogle } = useAuthContext();
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [state, setState] = useState<LoginState>({
    loading: false,
    error: null,
    success: false,
  });

  const updateForm = (field: keyof LoginForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmailLogin = async () => {
    try {
      setState({ loading: true, error: null, success: false });
      await loginWithEmail(form.email, form.password);
      setState({ loading: false, error: null, success: true });
    } catch (error) {
      setState({
        loading: false,
        error: error instanceof Error ? error : new Error(String(error)),
        success: false,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setState({ loading: true, error: null, success: false });
      await loginWithGoogle();
      setState({ loading: false, error: null, success: true });
    } catch (error) {
      setState({
        loading: false,
        error: error instanceof Error ? error : new Error(String(error)),
        success: false,
      });
    }
  };

  return {
    form,
    updateForm,
    handleEmailLogin,
    handleGoogleLogin,
    ...state,
  };
};
