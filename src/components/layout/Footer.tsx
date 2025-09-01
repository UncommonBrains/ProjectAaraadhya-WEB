import { NavLink } from 'react-router-dom';
import {  Mail, Phone, CreditCard, ExternalLink } from 'lucide-react';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp
} from 'react-icons/fa6';

import {companyInfo} from '../contacts'


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

        <div className="my-4 border-t border-gray-600"></div>

        {/* Contact Info */}
        <div className="mb-4 flex flex-wrap justify-center space-x-6 text-sm">
          {/* <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-orange-400" />
            <span>
              Krishnamana Illam, Cheravally,
              <br /> Kayamkulam PO, Alappzuzha,
              <br /> Kerala - 690502, India
            </span>
          </div> */}
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4 text-orange-400" />
            <a href="mailto:info@aaraadhya.com" className="hover:text-orange-300">
              {companyInfo.emails.general}
            </a>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 h-4 w-4 text-orange-400" />
            <a href={`tel:${companyInfo.numbers.primary}`} className="hover:text-orange-300">
              {companyInfo.numbers.primary}
            </a>
          </div>
        </div>

        {/* Social & App Links */}
        <div className="mb-4 flex flex-wrap justify-center">
          <div className="mr-6 flex items-center">
            <span className="mr-2 text-sm">Follow Us</span>
            <a
              href={companyInfo.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1 text-blue-500 transition-colors hover:text-blue-400"
              aria-label="Facebook"
            >
              <FaFacebook className="h-4 w-4" />
            </a>
            <a
              href={companyInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1 text-pink-500 transition-colors hover:text-pink-400"
              aria-label="Instagram"
            >
              <FaInstagram className="h-4 w-4" />
            </a>
            <a
              href={companyInfo.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1 text-red-500 transition-colors hover:text-red-400"
              aria-label="YouTube"
            >
              <FaYoutube className="h-4 w-4" />
            </a>
            <a
              href={companyInfo.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1 text-green-500 transition-colors hover:text-red-400"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="h-4 w-4" />
            </a>
            {/* <a 
              href="{companyInfo.socials.twitter}" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mx-1 text-blue-400 hover:text-blue-300 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter className="h-4 w-4" />
            </a> */}
          </div>

          <div className="mr-6 flex items-center">
            <CreditCard className="mr-2 h-4 w-4 text-orange-400" />
            <span className="mr-2 text-sm">Secure Payments</span>
            <div className="flex items-center space-x-1">
              <span className="rounded bg-white px-2 py-0.5 text-xs text-gray-800">Visa</span>
              <span className="rounded bg-white px-2 py-0.5 text-xs text-gray-800">UPI</span>
              <span className="rounded bg-white px-2 py-0.5 text-xs text-gray-800">Razorpay</span>
            </div>
          </div>

          {/* <div className="flex items-center">
              <Download className="mr-2 h-4 w-4 text-orange-400" />
              <span className="text-sm mr-2">Download App</span>
              <div className="flex space-x-2">
                <a 
                  href="https://apps.apple.com/app/aaraadhya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center bg-black text-white px-2 py-1 rounded text-xs hover:bg-gray-900 transition-colors"
                  aria-label="Download on App Store"
                >
                  <FaApple className="h-3 w-3 mr-1" />
                  iOS
                </a>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.aaraadhya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                  aria-label="Download on Google Play"
                >
                  <FaGooglePlay className="h-3 w-3 mr-1" />
                  Android
                </a>
              </div>
            </div> */}
        </div>

        {/* Divider */}

        <div className="my-4 border-t border-gray-600"></div>

        {/* Newsletter Signup */}
        <div className="mb-4 text-center">
          <h4 className="mb-2 font-medium text-orange-400">Stay Connected</h4>
          <p className="mb-3 text-sm text-gray-400">
            Get updates on festivals, temple events, and spiritual content
          </p>
          <div className="mx-auto flex max-w-md justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-l-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-orange-500 focus:outline-none"
            />
            <button className="rounded-r-lg bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600">
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="my-4 border-t border-gray-600"></div>

        {/* Copyright & Legal */}
        <div className="flex flex-wrap justify-center text-xs text-gray-400">
          <div className="text-center">
            <span>© 2025 Aaraadhya. All Rights Reserved.</span>
            <span className="mx-2 text-gray-600">|</span>
            <NavLink to="/privacy" className="transition-colors hover:text-orange-300">
              Privacy Policy
            </NavLink>
            <span className="mx-2 text-gray-600">|</span>
            <NavLink to="/terms" className="transition-colors hover:text-orange-300">
              Terms of Service
            </NavLink>
            <span className="mx-2 text-gray-600">|</span>
            <NavLink to="/refunds" className="transition-colors hover:text-orange-300">
              Refund Policy
            </NavLink>
            <span className="mx-2 text-gray-600">|</span>
            <NavLink to="/shipping" className="transition-colors hover:text-orange-300">
              Shipping & Delivery
            </NavLink>
            
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center">
            <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 h-2 w-2 rounded-full bg-blue-500"></span>
            <span>Data Protected</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 h-2 w-2 rounded-full bg-orange-500"></span>
            <span>Trusted by 10k+ Devotees</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
