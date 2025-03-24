import { NavLink, Link } from "react-router-dom";
import {
  Bell,
  Settings,
  LogOut,
  Phone,
  Info,
  Calendar,
  Star,
  Share2,
  Menu,
  ChevronDown,
  Home,
  ShoppingBag,
  MapPlus, 
  
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const moreDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target)
      ) {
        setShowMoreDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-amber-50/100 border-b border-amber-100 p-4 md:grid-cols-4 sticky top-0 z-50">
        <div className="max-w-[92rem] mx-auto">
          <div className="flex items-center justify-between">
            {/* Mobile menu button - visible only on mobile */}
            <button
              className="md:hidden mr-3 text-amber-900"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo - centered on desktop, to the right of menu button on mobile */}
            <div className="flex items-center">
              <a href="/">
                <div className="bg-orange-400 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
                  <img
                    src="/logo192.png"
                    alt="Aaradhya Logo"
                    className="w-7 h-full object-cover"
                  />
                </div>
              </a>
              <a href="/">
                <h1 className="ml-3 text-xl font-serif text-amber-900 font-bold">
                  Aaraadhya
                </h1>
              </a>
            </div>

            {/* Navigation - hidden on mobile, visible on desktop */}
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

              {/* More dropdown for desktop */}
              <div
                className="relative"
                ref={moreDropdownRef}
                onMouseEnter={() => setShowMoreDropdown(true)}
                onMouseLeave={() => setShowMoreDropdown(false)}
              >
                <button
                  className="flex items-center text-gray-600 hover:text-amber-900 focus:outline-none"
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                >
                  More
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {/* More Dropdown */}
                {showMoreDropdown && (
                  <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 border border-amber-100">
                    <NavLink
                      to="/community"
                      className={({ isActive }) =>
                        isActive
                          ? "block px-4 py-2 text-orange-600 font-bold"
                          : "block px-4 py-2 text-gray-600 hover:bg-amber-50"
                      }
                    >
                      Community
                    </NavLink>
                    <NavLink
                      to="/astrology"
                      className={({ isActive }) =>
                        isActive
                          ? "block px-4 py-2 text-orange-600 font-bold"
                          : "block px-4 py-2 text-gray-600 hover:bg-amber-50"
                      }
                    >
                      Astrology
                    </NavLink>
                    <NavLink
                      to="/divine-seva"
                      className={({ isActive }) =>
                        isActive
                          ? "block px-4 py-2 text-orange-600 font-bold"
                          : "block px-4 py-2 text-gray-600 hover:bg-amber-50"
                      }
                    >
                      DivineSeva
                    </NavLink>
                  </div>
                )}
              </div>
            </nav>

            {/* Profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative ">
                  <Bell className="h-6 w-6 text-gray-500" />
                  <span className="absolute -top-1.5 -right-1 bg-orange-400 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                    3
                  </span>
                </div>
                <div className="relative pl-5" ref={dropdownRef}>
                  <button
                    className="bg-amber-600 rounded-full w-9 h-9 flex items-center justify-center text-white font-medium focus:outline-none"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    R
                  </button>

                  {/* Profile Dropdown */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-amber-100 transform -translate-y-1">
                      <div className="px-4 py-3 border-b border-amber-100">
                        <p className="text-sm font-medium text-amber-900">
                          Rahul Kumar
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          rahul@example.com
                        </p>
                      </div>

                      <ul className="py-1">
                        <li>
                          <NavLink
                            to="/settings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                          >
                            <Settings className="mr-3 h-4 w-4 text-gray-500" />
                            Settings
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/my-bookings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                          >
                            <Calendar className="mr-3 h-4 w-4 text-gray-500" />
                            My Bookings
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/contact-us"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                          >
                            <Phone className="mr-3 h-4 w-4 text-gray-500" />
                            Contact Us
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/about"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                          >
                            <Info className="mr-3 h-4 w-4 text-gray-500" />
                            About
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/refer-temple"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                          >
                            <Share2 className="mr-3 h-4 w-4 text-gray-500" />
                            Refer a Temple
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/feedback"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                          >
                            <Star className="mr-3 h-4 w-4 text-gray-500" />
                            Feedback
                          </NavLink>
                        </li>
                      </ul>

                      <div className="py-1 border-t border-amber-100">
                        <NavLink
                          to="/logout"
                          className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-amber-50"
                        >
                          <LogOut className="mr-3 h-4 w-4 text-red-500" />
                          Logout
                        </NavLink>
                      </div>
                      <div className="py-1 border-t border-amber-100">
                        <NavLink
                          to="/temple-store"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                        >
                          <LogOut className="mr-3 h-4 w-4 text-gray-500" />
                          Temple Store
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu - only visible when toggled on mobile */}
          {showMobileMenu && (
            <div
              className="md:hidden mt-4 bg-white rounded-md shadow-md border border-amber-100 p-2 z-40"
              ref={mobileMenuRef}
            >
              <nav className="flex flex-col space-y-2">
                <NavLink
                  to="/my-temples"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 font-bold p-2"
                      : "text-gray-600 hover:text-amber-900 p-2"
                  }
                  onClick={() => setShowMobileMenu(false)}
                >
                  My Temples
                </NavLink>
                <NavLink
                  to="/my-bookings"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 font-bold p-2"
                      : "text-gray-600 hover:text-amber-900 p-2"
                  }
                  onClick={() => setShowMobileMenu(false)}
                >
                  My Bookings
                </NavLink>
                <NavLink
                  to="/upcoming-poojas"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 font-bold p-2"
                      : "text-gray-600 hover:text-amber-900 p-2"
                  }
                  onClick={() => setShowMobileMenu(false)}
                >
                  Upcoming Poojas
                </NavLink>
                <NavLink
                  to="/explore-temples"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 font-bold p-2"
                      : "text-gray-600 hover:text-amber-900 p-2"
                  }
                  onClick={() => setShowMobileMenu(false)}
                >
                  Explore Temples
                </NavLink>
                <NavLink
                  to="/community"
                  className={({ isActive }) =>
                    isActive
                      ? "block text-orange-600 font-bold p-2"
                      : "block text-gray-600 hover:text-amber-900 p-2"
                  }
                  onClick={() => setShowMobileMenu(false)}
                >
                  Community
                </NavLink>
                <NavLink
                  to="/astrology"
                  className={({ isActive }) =>
                    isActive
                      ? "block text-orange-600 font-bold p-2"
                      : "block text-gray-600 hover:text-amber-900 p-2"
                  }
                  onClick={() => setShowMobileMenu(false)}
                >
                  Astrology
                </NavLink>
                <NavLink
                  to="/divine-seva"
                  className={({ isActive }) =>
                    isActive
                      ? "block text-orange-600 font-bold p-2"
                      : "block text-gray-600 hover:text-amber-900 p-2"
                  }
                  onClick={() => setShowMobileMenu(false)}
                >
                  DivineSeva
                </NavLink>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Bottom navigation bar for mobile */}
      <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-amber-100 z-50">
        <div className="flex justify-between px-2 py-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-orange-600 flex-1"
                : "flex flex-col items-center text-gray-500 flex-1"
            }
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          
          <NavLink
            to="/explore-temples"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-orange-600 flex-1"
                : "flex flex-col items-center text-gray-500 flex-1"
            }
          >
            <MapPlus className="h-5 w-5" />
            <span className="text-xs mt-1">Temples</span>
          </NavLink>
          
          <NavLink
            to="/upcoming-poojas"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-orange-600 flex-1"
                : "flex flex-col items-center text-gray-500 flex-1"
            }
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">Upcoming </span>
            <span className="text-xs ">Poojas</span>
          </NavLink>
          
          <NavLink
            to="/devotee-store"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-orange-600 flex-1"
                : "flex flex-col items-center text-gray-500 flex-1"
            }
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs mt-1">Devotee Store</span>
          </NavLink>
          
          <NavLink
            to="/more"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-orange-600 flex-1"
                : "flex flex-col items-center text-gray-500 flex-1"
            }
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs mt-1">More</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;