import { NavLink } from 'react-router-dom';
import { MapPin, Mail, Phone, CreditCard, Download } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="!hidden bg-gray-800 py-6 text-gray-200 md:!block">
      <div className="mx-auto max-w-[92rem] px-4">
        {/* Main Navigation */}
        <div className="mb-4 flex flex-wrap justify-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'font-bold text-orange-400' : 'text-white hover:text-orange-300'
            }
          >
            Home
          </NavLink>
          <span className="text-gray-500">|</span>
          <NavLink
            to="/explore-temples"
            className={({ isActive }) =>
              isActive ? 'font-bold text-orange-400' : 'text-white hover:text-orange-300'
            }
          >
            Explore Temples
          </NavLink>
          <span className="text-gray-500">|</span>
          <NavLink
            to="/devotee-store"
            className={({ isActive }) =>
              isActive ? 'font-bold text-orange-400' : 'text-white hover:text-orange-300'
            }
          >
            Devotee Store
          </NavLink>
          <span className="text-gray-500">|</span>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive ? 'font-bold text-orange-400' : 'text-white hover:text-orange-300'
            }
          >
            Contact Us
          </NavLink>
        </div>

        <div className="my-4 border-t border-gray-800"></div>

        {/* Contact Info */}
        <div className="mb-4 flex flex-wrap justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-orange-400" />
            <span>Location</span>
          </div>
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4 text-orange-400" />
            <span>Email</span>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 h-4 w-4 text-orange-400" />
            <span>Phone</span>
          </div>
        </div>

        {/* Social & App Links */}
        <div className="mb-4 flex flex-wrap justify-center">
          <div className="mr-6 flex items-center">
            <span className="mr-2 text-sm">Socials</span>
            <a href="/" className="mx-1 text-pink-500 hover:text-pink-400">
              <FaFacebook className="h-4 w-4" />
            </a>
            <a href="/" className="mx-1 text-pink-500 hover:text-pink-400">
              <FaInstagram className="h-4 w-4" />
            </a>
            <a href="/" className="mx-1 text-pink-500 hover:text-pink-400">
              <FaYoutube className="h-4 w-4" />
            </a>
            <a href="/" className="mx-1 text-pink-500 hover:text-pink-400">
              <FaTwitter className="h-4 w-4" />
            </a>
          </div>
          <div className="mr-6 flex items-center">
            <CreditCard className="mr-2 h-4 w-4 text-orange-400" />
            <span className="text-sm">Payments</span>
          </div>
          <div className="flex items-center">
            <Download className="mr-2 h-4 w-4 text-orange-400" />
            <span className="text-sm">Download App</span>
          </div>
        </div>

        <div className="my-4 border-t border-gray-800"></div>

        {/* Copyright & Legal */}
        <div className="flex flex-wrap justify-center text-xs text-gray-400">
          <div className="border-gray-700 text-center text-sm text-gray-400">
            <span>© 2025 Aaraadhya. All Rights Reserved.</span>
            <span className="mx-2 text-gray-600">|</span>
            <NavLink to="/privacy" className="hover:text-orange-300">
              Privacy
            </NavLink>
            <span className="mx-2 text-gray-600">|</span>
            <NavLink to="/terms" className="hover:text-orange-300">
              Terms
            </NavLink>
            <span className="mx-2 text-gray-600">|</span>
            <NavLink to="/refunds" className="hover:text-orange-300">
              Refunds
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
