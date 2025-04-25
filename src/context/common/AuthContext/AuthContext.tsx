import React, { createContext, useContext, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { useAuth } from '../../../hooks/useAuth';
import { User } from '../../../models/entities/User';
import {
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
  signOut,
  resetPassword,
  verifyEmail,
} from '../../../services/firebase/auth';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: Error | null;
  loginWithEmail: (email: string, password: string) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  registerWithEmail: (
    email: string,
    password: string,
    displayName: string,
    phoneNumber: string,
  ) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (user: FirebaseUser) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, firebaseUser, loading, error } = useAuth();

  const value = {
    user,
    firebaseUser,
    loading,
    error,
    loginWithEmail,
    loginWithGoogle,
    registerWithEmail,
    signOut,
    resetPassword,
    verifyEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
