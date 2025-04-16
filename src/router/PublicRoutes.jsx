import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../contexts/auth/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

function PublicRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return user ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;
