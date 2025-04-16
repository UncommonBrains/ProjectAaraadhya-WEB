import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth/AuthContext";
import Header from "../components/header";
import Footer from "../components/footer";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  const location = useLocation();
  const hideHeaderFooter = ["/devotee-store"].includes(location.pathname);

  if (loading) return <div>Loading...</div>;

  return user ? user.emailVerified ? <>
    {!hideHeaderFooter && <Header />}
    <Outlet />
    {!hideHeaderFooter && <Footer />}
  </> : <Navigate to={`/verify-email`} /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
