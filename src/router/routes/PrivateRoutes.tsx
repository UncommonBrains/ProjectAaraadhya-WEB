import { Navigate, Outlet } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const PrivateRoutes = () => {
  const { firebaseUser, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return firebaseUser ? (
    firebaseUser.emailVerified ? (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ) : (
      <Navigate to={`/verify-email`} />
    )
  ) : (
    <Navigate to="/auth" />
  );
};

export default PrivateRoutes;
