
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React from "react";
import Header from "./components/header"; 
import Footer from "./components/footer"; 
import Home from "./pages/Home";
import MyTemples from "./pages/MyTemples";
import ExploreTemples from "./pages/ExploreTemples";
import TempleDetails from "./pages/TempleDetails";
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
  const hideHeaderFooter = location.pathname === "/devotee-store";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-temples" element={<MyTemples />} />
        <Route path="/explore-temples" element={<ExploreTemples />} />
        <Route path="/temple-details" element={<TempleDetails />} />
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
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;


