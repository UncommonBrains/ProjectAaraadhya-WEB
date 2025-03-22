import { NavLink } from "react-router-dom";
import { Bell, Search, Settings, LogOut, Phone, Info, Calendar, Star, Share2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-amber-50/100 border-b border-amber-100 p-4 flex items-center  justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <a href="/">
          <div className="bg-orange-400 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
            <img
              src="/logo192.png"
              alt="Aaradhya Logo"
              className="w-7 h-full object-cover "
            />
          </div>
        </a>
        <a href="/">
          <h1 className="ml-3 text-xl font-serif text-amber-900 font-bold">
            Aaraadhya
          </h1>
        </a>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-6 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-orange-600 font-bold"
              : "text-gray-600 hover:text-amber-900"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/my-temples"
          className={({ isActive }) =>
            isActive
              ? "text-orange-600 font-bold"
              : "text-gray-600 hover:text-amber-900"
          }
        >
          My Temples
        </NavLink>

        <NavLink
          to="/upcoming-poojas"
          className={({ isActive }) =>
            isActive
              ? "text-orange-600 font-bold"
              : "text-gray-600 hover:text-amber-900"
          }
        >
          Upcoming Poojas
        </NavLink>

        <NavLink
          to="/explore-temples"
          className={({ isActive }) =>
            isActive
              ? "text-orange-600 font-bold"
              : "text-gray-600 hover:text-amber-900"
          }
        >
          Explore Temples
        </NavLink>

        
        <NavLink
          to="/devotee-store"
          className={({ isActive }) =>
            isActive
              ? "text-orange-600 font-bold"
              : "text-gray-600 hover:text-amber-900"
          }
        >
          Devotee Store
        </NavLink>

        <NavLink
          to="/community"
          className={({ isActive }) =>
            isActive
              ? "text-orange-600 font-bold"
              : "text-gray-600 hover:text-amber-900"
          }
        >
          Community
        </NavLink>
        <NavLink
          to="/astrology"
          className={({ isActive }) =>
            isActive
              ? "text-orange-600 font-bold"
              : "text-gray-600 hover:text-amber-900"
          }
        >
          Astrology
        </NavLink>
        <NavLink
          to="/divine-seva"
          className={({ isActive }) =>
            isActive
              ? "text-orange-600 font-bold"
              : "text-gray-600 hover:text-amber-900"
          }
        >
          DivineSeva 
        </NavLink>
      </nav>

      {/* Search and Profile */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 bg-orange-400 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
              3
            </span>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button 
              className="bg-amber-600 rounded-full w-9 h-9 flex items-center justify-center text-white font-medium focus:outline-none"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              R
            </button>
            
            {/* Profile Dropdown - Added higher z-index and positioned it higher */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-amber-100 transform -translate-y-1">
                <div className="px-4 py-3 border-b border-amber-100">
                  <p className="text-sm font-medium text-amber-900">Rahul Kumar</p>
                  <p className="text-xs text-gray-500 truncate">rahul@example.com</p>
                </div>
                
                <ul className="py-1">
                  <li>
                    <NavLink to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      <Settings className="mr-3 h-4 w-4 text-gray-500" />
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-bookings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      <Calendar className="mr-3 h-4 w-4 text-gray-500" />
                      My Bookings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact-us" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      <Phone className="mr-3 h-4 w-4 text-gray-500" />
                      Contact Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      <Info className="mr-3 h-4 w-4 text-gray-500" />
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/refer-temple" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      <Share2 className="mr-3 h-4 w-4 text-gray-500" />
                      Refer a Temple
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/feedback" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      <Star className="mr-3 h-4 w-4 text-gray-500" />
                      Feedback
                    </NavLink>
                  </li>
                </ul>
                
                <div className="py-1 border-t border-amber-100">
                  <NavLink to="/logout" className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-amber-50">
                    <LogOut className="mr-3 h-4 w-4 text-red-500" />
                    Logout
                  </NavLink>
                </div>
                <div className="py-1 border-t border-amber-100">
                  <NavLink to="/temple-store" className="flex items-center px-4 py-2 text-sm  text-gray-700 hover:bg-amber-50">
                    <LogOut className="mr-3 h-4 w-4  text-gray-500" />
                    Temple Store
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;