import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import LoginRegister from "../pages/auth/LoginRegister";
import Logout from "../pages/auth/Logout";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import MyTemples from "../pages/MyTemples";
import ExploreTemples from "../pages/ExploreTemples";
import TempleDetails from "../pages/TempleDetails";
import PoojaBooking from "../pages/PoojaBooking";
import UpcomingPoojas from "../pages/UpcomingPoojas";
import TempleStore from "../pages/TempleStore";
import DevoteeStore from "../pages/DevoteeStore";
import Community from "../pages/Community";
import Settings from "../pages/Settings";
import MyBookings from "../pages/MyBookingsPage";
import Astrology from "../pages/Astrology";
import DivineSeva from "../pages/DivineSeva";
import LiveEvents from "../pages/LiveEvents";
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/auth" element={<LoginRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route element={<PrivateRoutes />} >
        <Route path="/" element={<ExploreTemples />} />
        <Route path="/logout" element={<Logout />} />
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
      </Route>
    </Routes>
  );
}

export default AppRouter
