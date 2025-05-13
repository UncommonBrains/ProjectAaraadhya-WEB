import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRoutes from './routes/AuthRoutes';
import PublicRoutes from './routes/PublicRoutes';
import AuthPage from '../views/auth/AuthPage/AuthPage';
import ForgotPassword from '../views/auth/ForgotPassword/ForgotPassword';
import ExploreTemples from '../views/home/ExploreTemples/ExploreTemples';
import UpcomingPoojas from '../views/home/UpcomingPoojas/UpcomingPoojas';
import Feed from '../views/home/Feed/Feed';
import DivineSeva from '../views/home/DivineSeva/DivineSeva';
import DevoteeStore from '../views/home/DevoteeStore/DevoteeStore';
import Astrology from '../views/home/Astrology/Astrology';
import PrivateRoutes from './routes/PrivateRoutes';
import Community from '../views/home/Community/Community';
import LiveEvents from '../views/home/LiveEvents/LiveEvents';
import Settings from '../views/home/Settings/Settings';
import MyTemples from '../views/home/MyTemples/MyTemples';
import MyBookings from '../views/home/MyBookings/MyBookings';
import TempleDetails from '../views/home/TempleDetails/TempleDetails';
import PoojaBooking from '../views/home/PoojaBooking/PoojaBooking';
import TempleStore from '../views/home/TempleStore/TempleStore';
import ResetPassword from '../views/auth/ResetPassword/ResetPassword';
import VerifyEmail from '../views/auth/VerifyEmail/VerifyEmail';
import NotFound from '../views/others/NotFound/NotFound';
import Checkout from '../views/home/Checkout/Checkout';
import CartPage from '../views/home/CartPage/CartPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<ExploreTemples />} />
          <Route path="/temple-details/:id" element={<TempleDetails />} />
          <Route path="/upcoming-poojas" element={<UpcomingPoojas />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/divine-seva" element={<DivineSeva />} />
          <Route path="/astrology" element={<Astrology />} />
        </Route>
        {/* Auth Routes */}
        <Route element={<AuthRoutes />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/community" element={<Community />} />
          <Route path="/live-events" element={<LiveEvents />} />
          <Route path="/temple-details/pooja-booking/:id" element={<PoojaBooking />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/my-temples" element={<MyTemples />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/temple-store" element={<TempleStore />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        {/* Other Routes */}
        <Route path="/devotee-store" element={<DevoteeStore />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
