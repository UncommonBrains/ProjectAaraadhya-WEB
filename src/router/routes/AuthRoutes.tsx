import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AuthRoutes = () => {
  const { firebaseUser, loading } = useAuth();

  return loading ? (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  ) : firebaseUser ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default AuthRoutes;
