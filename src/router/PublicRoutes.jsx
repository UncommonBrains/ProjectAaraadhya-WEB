import React from 'react';
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth/AuthContext";
import Header from "../components/header";
import Footer from "../components/footer";
import LoadingSpinner from "../components/LoadingSpinner";

function PublicRoutes() {
  const { user, loading } = useAuth();

  const location = useLocation();
  const hideHeaderFooter = ["/devotee-store"].includes(location.pathname);

  if (loading) return <LoadingSpinner />;

  return user ? user.emailVerified ?
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet />
      {!hideHeaderFooter && <Footer />}
    </> : <Navigate to={`/verify-email`} /> :
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet />
      {!hideHeaderFooter && <Footer />}
    </>;
}

export default PublicRoutes;
