import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AuthRoutes = () => {
  const { firebaseUser, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return firebaseUser ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoutes;
