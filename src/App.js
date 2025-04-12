
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React from "react";
import Header from "./components/header"; 
import Footer from "./components/footer"; 
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/authContext"; // ✅ Add this line

import LoginRegister from "./pages/auth/LoginRegister";
import Logout from "./pages/auth/Logout";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import MyTemples from "./pages/MyTemples";
import ExploreTemples from "./pages/ExploreTemples";
import TempleDetails from "./pages/TempleDetails";
import PoojaBooking from "./pages/PoojaBooking";
import UpcomingPoojas from "./pages/UpcomingPoojas";
import TempleStore from "./pages/TempleStore";
import DevoteeStore from "./pages/DevoteeStore";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import MyBookings from "./pages/MyBookingsPage";
import Astrology from "./pages/Astrology";
import DivineSeva from "./pages/DivineSeva";
import LiveEvents from "./pages/LiveEvents";

function Layout() {
  const location = useLocation();
  const hideHeaderFooter = ["/devotee-store", "/forgot-password", "/reset-password"].includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<ExploreTemples />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/my-temples" element={<MyTemples />} />
        <Route path="/feed" element={<Home />} />
        <Route path="/temple-details" element={<TempleDetails />} />
        <Route path="/temple-details/pooja-booking" element={<PoojaBooking />} />
        <Route path="/upcoming-poojas" element={<UpcomingPoojas />} />
        <Route path="/temple-store" element={<TempleStore />} />
        <Route path="/devotee-store" element={<DevoteeStore />} />
        <Route path="/community" element={<Community />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/astrology" element={<Astrology />} /> 
        <Route path="/divine-seva" element={<DivineSeva />} /> 
        <Route path="/live-events" element={<LiveEvents />} /> 
      </Routes>
      {!hideHeaderFooter  &&  <Footer />}
    </>
  );
}


function App() {
  return (
    <AuthProvider> 
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;


