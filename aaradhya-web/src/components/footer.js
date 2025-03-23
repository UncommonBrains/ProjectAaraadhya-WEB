import { NavLink } from "react-router-dom";
import { MapPin, Mail, Phone, Facebook, Instagram, Youtube, Twitter, CreditCard, Download } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="max-w-[92rem] mx-auto px-4">
        {/* Main Navigation */}
        <div className="flex flex-wrap justify-center space-x-4 mb-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-orange-400 font-bold"
                : "text-white hover:text-orange-300"
            }
          >
            Home
          </NavLink>
          <span className="text-gray-500">|</span>
          <NavLink
            to="/explore-temples"
            className={({ isActive }) =>
              isActive
                ? "text-orange-400 font-bold"
                : "text-white hover:text-orange-300"
            }
          >
            Explore Temples
          </NavLink>
          <span className="text-gray-500">|</span>
          <NavLink
            to="/devotee-store"
            className={({ isActive }) =>
              isActive
                ? "text-orange-400 font-bold"
                : "text-white hover:text-orange-300"
            }
          >
            Devotee Store
          </NavLink>
          <span className="text-gray-500">|</span>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive
                ? "text-orange-400 font-bold"
                : "text-white hover:text-orange-300"
            }
          >
            Contact Us
          </NavLink>
        </div>
        
        <div className="border-t border-gray-800 my-4"></div>
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center space-x-6 mb-4 text-sm">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-orange-400" />
            <span>Location</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-orange-400" />
            <span>Email</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-orange-400" />
            <span>Phone</span>
          </div>
        </div>
        
        {/* Social & App Links */}
        <div className="flex flex-wrap justify-center mb-4">
          <div className="flex items-center mr-6">
            <span className="text-sm mr-2">Social Icons</span>
            <a href="/" className="text-pink-500 hover:text-pink-400 mx-1">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="/" className="text-pink-500 hover:text-pink-400 mx-1">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="/" className="text-pink-500 hover:text-pink-400 mx-1">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="/" className="text-pink-500 hover:text-pink-400 mx-1">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
          <div className="flex items-center mr-6">
            <CreditCard className="h-4 w-4 mr-2 text-orange-400" />
            <span className="text-sm">Payments</span>
          </div>
          <div className="flex items-center">
            <Download className="h-4 w-4 mr-2 text-orange-400" />
            <span className="text-sm">Download App</span>
          </div>
        </div>
        
        <div className="border-t border-gray-800 my-4"></div>
        
        {/* Copyright & Legal */}
        <div className="flex flex-wrap justify-center text-xs text-gray-400">
          <div className=" border-gray-700   text-center text-sm text-gray-400">
            <span>© 2025 Aaraadhya. All Rights Reserved.</span>
            <span className="mx-2 text-gray-600">|</span>
            <a href="/privacy" className="hover:text-orange-300">Privacy</a>
            <span className="mx-2 text-gray-600">|</span>
            <a href="/terms" className="hover:text-orange-300">Terms</a>
            <span className="mx-2 text-gray-600">|</span>
            <a href="/refunds" className="hover:text-orange-300">Refunds</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;