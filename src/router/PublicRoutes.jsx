import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../contexts/auth/AuthContext';

function PublicRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;
