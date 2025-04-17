import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/auth/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

function AuthRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return user ? <Navigate to="/" /> : <Outlet />;
}

export default AuthRoutes;
