import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import Header from "./components/header"; 
import Home from "./pages/Home";
import MyTemples from "./pages/MyTemples";
import ExploreTemples from "./pages/ExploreTemples";
import UpcomingPoojas from "./pages/UpcomingPoojas";
import TempleStore from "./pages/TempleStore";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import MyBookings from "./pages/MyBookingsPage";

function App() {
  return (
    <Router>
      <Header /> {/* Include the header for navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-temples" element={<MyTemples />} />
        <Route path="/explore-temples" element={<ExploreTemples />} />
        <Route path="/upcoming-poojas" element={<UpcomingPoojas />} />
        <Route path="/temple-store" element={<TempleStore />} />
        <Route path="/community" element={<Community />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
