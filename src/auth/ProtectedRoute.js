import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, redirectIfAuth = false }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated && redirectIfAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
