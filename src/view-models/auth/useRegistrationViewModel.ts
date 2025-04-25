import { useState } from 'react';
import { useAuthContext } from '../../context/common/AuthContext/AuthContext';

interface RegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  phoneNumber: string;
}

interface RegistrationState {
  loading: boolean;
  error: Error | null;
  success: boolean;
}

export const useRegistrationViewModel = () => {
  const { registerWithEmail } = useAuthContext();
  const [form, setForm] = useState<RegistrationForm>({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    phoneNumber: '',
  });
  const [state, setState] = useState<RegistrationState>({
    loading: false,
    error: null,
    success: false,
  });

  const updateForm = (field: keyof RegistrationForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): { valid: boolean; error?: Error } => {
    if (!form.email || !form.password || !form.confirmPassword) {
      return { valid: false, error: new Error('All fields are required') };
    }

    if (form.password !== form.confirmPassword) {
      return { valid: false, error: new Error('Passwords do not match') };
    }

    if (form.password.length < 6) {
      return { valid: false, error: new Error('Password must be at least 6 characters') };
    }

    return { valid: true };
  };

  const handleRegistration = async () => {
    const validation = validateForm();

    if (!validation.valid) {
      setState({
        loading: false,
        error: validation.error ?? null,
        success: false,
      });
      return;
    }

    try {
      setState({ loading: true, error: null, success: false });
      await registerWithEmail(form.email, form.password, form.displayName, form.phoneNumber);
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
    handleRegistration,
    ...state,
  };
};
