import { Navigate, Outlet } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const PublicRoutes = () => {
  const { firebaseUser, loading } = useAuth();

  return loading ? (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  ) : firebaseUser ? (
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
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoutes;
