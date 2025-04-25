import { NavLink, useNavigate } from 'react-router-dom';
import { MdTempleHindu } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';
import { FaPeopleGroup } from 'react-icons/fa6';
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
  X,
  Video,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Logo from '../../assets/images/logo.png';
import { useConfirmation } from '../../hooks/useConfirmation';
import { useSignoutViewModel } from '../../view-models/auth/useSignoutViewModel';
import { toast } from '../../utils/toast';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState<boolean>(false);
  const [showMobileMoreMenu, setShowMobileMoreMenu] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMoreMenuRef = useRef<HTMLDivElement>(null);
  const { handleSignout, error, success } = useSignoutViewModel();
  const confirm = useConfirmation();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      toast.success('Successfully logged out.');
      navigate('/auth');
    }

    if (error) toast.error(error.message);
  }, [success, error, toast, navigate]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setShowMoreDropdown(false);
      }
      if (mobileMoreMenuRef.current && !mobileMoreMenuRef.current.contains(event.target as Node)) {
        setShowMobileMoreMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent scrolling when mobile menu or mobile more menu is open
  useEffect(() => {
    if (showMobileMenu || showMobileMoreMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu, showMobileMoreMenu]);

  // Handle the profile button click
  const handleProfileClick = () => {
    // For desktop, show the dropdown
    if (window.innerWidth >= 768) {
      setShowDropdown(!showDropdown);
    }
    // For mobile, show the mobile more menu (same as "More" button)
    else {
      setShowMobileMoreMenu(!showMobileMoreMenu);
    }
  };

  const handleSignoutButtonClick = async () => {
    const confirmation = await confirm({
      title: 'Signout',
      message: 'Are you sure you want to signout ?',
    });

    if (confirmation) handleSignout();
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-amber-100 bg-amber-50/100 p-4 md:grid-cols-4">
        <div className="mx-auto max-w-[92rem]">
          <div className="flex items-center justify-between">
            {/* Mobile menu button - visible only on mobile */}
            <button
              className="mr-3 text-amber-900 md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo - centered on desktop, to the right of menu button on mobile */}
            <div className="flex items-center">
              <NavLink to="/">
                <img src={Logo} alt="Aaradhya Logo" className="w-44" />
              </NavLink>
            </div>

            {/* Navigation - hidden on mobile, visible on desktop */}
            <nav className="hidden space-x-6 text-sm md:flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'font-bold text-orange-600' : 'text-gray-600 hover:text-amber-900'
                }
              >
                Explore Temples
              </NavLink>

              <NavLink
                to="/upcoming-poojas"
                className={({ isActive }) =>
                  isActive ? 'font-bold text-orange-600' : 'text-gray-600 hover:text-amber-900'
                }
              >
                Upcoming Poojas
              </NavLink>
              <NavLink
                to="/feed"
                className={({ isActive }) =>
                  isActive ? 'font-bold text-orange-600' : 'text-gray-600 hover:text-amber-900'
                }
              >
                Feed
              </NavLink>

              {/* More dropdown for desktop */}
              <div className="relative" ref={moreDropdownRef}>
                <button
                  className="flex items-center text-gray-600 hover:text-amber-900 focus:outline-none"
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                >
                  More
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {/* More Dropdown */}
                {showMoreDropdown && (
                  <div className="absolute left-0 z-50 mt-2 w-40 rounded-md border border-amber-100 bg-white py-1 shadow-lg">
                    <NavLink
                      to="/devotee-store"
                      className={({ isActive }) =>
                        isActive
                          ? 'block px-4 py-2 font-bold text-orange-600'
                          : 'block px-4 py-2 text-gray-600 hover:bg-amber-50'
                      }
                      onClick={() => setShowMoreDropdown(false)}
                    >
                      Devotee Store
                    </NavLink>
                    <NavLink
                      to="/community"
                      className={({ isActive }) =>
                        isActive
                          ? 'block px-4 py-2 font-bold text-orange-600'
                          : 'block px-4 py-2 text-gray-600 hover:bg-amber-50'
                      }
                      onClick={() => setShowMoreDropdown(false)}
                    >
                      Community
                    </NavLink>
                    <NavLink
                      to="/astrology"
                      className={({ isActive }) =>
                        isActive
                          ? 'block px-4 py-2 font-bold text-orange-600'
                          : 'block px-4 py-2 text-gray-600 hover:bg-amber-50'
                      }
                      onClick={() => setShowMoreDropdown(false)}
                    >
                      Astrology
                    </NavLink>
                    <NavLink
                      to="/divine-seva"
                      className={({ isActive }) =>
                        isActive
                          ? 'block px-4 py-2 font-bold text-orange-600'
                          : 'block px-4 py-2 text-gray-600 hover:bg-amber-50'
                      }
                      onClick={() => setShowMoreDropdown(false)}
                    >
                      Divine Seva
                    </NavLink>
                    <NavLink
                      to="/live-events"
                      className={({ isActive }) =>
                        isActive
                          ? 'block px-4 py-2 font-bold text-orange-600'
                          : 'block px-4 py-2 text-gray-600 hover:bg-amber-50'
                      }
                      onClick={() => setShowMoreDropdown(false)}
                    >
                      Live Events
                    </NavLink>
                  </div>
                )}
              </div>
            </nav>

            {/* Profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Bell className="h-6 w-6 text-gray-500" />
                  <span className="absolute -top-1.5 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-400 text-xs text-white">
                    3
                  </span>
                </div>
                <div className="relative pl-5" ref={dropdownRef}>
                  <button
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 font-medium text-white focus:outline-none"
                    onClick={handleProfileClick}
                  >
                    R
                  </button>

                  {/* Profile Dropdown - ONLY shown on desktop */}
                  {showDropdown && window.innerWidth >= 768 && (
                    <div className="absolute right-0 z-50 mt-2 w-48 -translate-y-1 transform rounded-md border border-amber-100 bg-white py-1 shadow-lg">
                      <div className="border-b border-amber-100 px-4 py-3">
                        <p className="text-sm font-medium text-amber-900">Rahul Kumar</p>
                        <p className="truncate text-xs text-gray-500">rahul@example.com</p>
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
                            to="/my-temples"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                          >
                            <AiFillHeart className="mr-3 h-4 w-4 text-gray-500" />
                            My Temples
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
                        <li>
                          <NavLink
                            to="/temple-store"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                          >
                            <ShoppingBag className="mr-3 h-4 w-4 text-gray-500" />
                            Temple Store
                          </NavLink>
                        </li>
                      </ul>
                      <div className="border-t border-amber-100 py-1">
                        <button
                          onClick={handleSignoutButtonClick}
                          className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-amber-50"
                        >
                          <LogOut className="mr-3 h-4 w-4 text-red-500" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile side menu overlay */}
      {showMobileMenu && (
        <>
          {/* Overlay background */}
          <div
            className="bg-opacity-50 fixed inset-0 z-50 bg-black"
            onClick={() => setShowMobileMenu(false)}
          />

          {/* Side menu */}
          <div
            ref={mobileMenuRef}
            className="fixed top-0 left-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between border-b border-amber-100 p-4">
              <div className="flex items-center">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-orange-400">
                  <img src="/logo192.png" alt="Aaradhya Logo" className="h-full w-7 object-cover" />
                </div>
                <h1 className="ml-3 font-serif text-xl font-bold text-amber-900">Aaraadhya</h1>
              </div>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="text-gray-500 hover:text-amber-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col p-2">
              <NavLink
                to="/feed"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMenu(false)}
              >
                <Home className="mr-3 h-5 w-5" />
                Feed
              </NavLink>
              <NavLink
                to="/my-temples"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMenu(false)}
              >
                <AiFillHeart className="mr-3 h-5 w-5" />
                My Temples
              </NavLink>
              <NavLink
                to="/my-bookings"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMenu(false)}
              >
                <Calendar className="mr-3 h-5 w-5" />
                My Bookings
              </NavLink>
              <NavLink
                to="/upcoming-poojas"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMenu(false)}
              >
                <Calendar className="mr-3 h-5 w-5" />
                Upcoming Poojas
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMenu(false)}
              >
                <MdTempleHindu className="mr-3 h-5 w-5" />
                Explore Temples
              </NavLink>
              <NavLink
                to="/devotee-store"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMenu(false)}
              >
                <ShoppingBag className="mr-3 h-5 w-5" />
                Devotee Store
              </NavLink>
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMenu(false)}
              >
                <Share2 className="mr-3 h-5 w-5" />
                Community
              </NavLink>
              <NavLink
                to="/astrology"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMenu(false)}
              >
                <Star className="mr-3 h-5 w-5" />
                Astrology
              </NavLink>
              <NavLink
                to="/divine-seva"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMenu(false)}
              >
                <FaPeopleGroup className="mr-3 h-5 w-5" />
                Divine Seva
              </NavLink>
            </nav>
          </div>
        </>
      )}

      {/* Mobile More menu overlay - slide from right side */}
      {showMobileMoreMenu && (
        <>
          {/* Overlay background */}
          <div
            className="bg-opacity-50 fixed inset-0 z-50 bg-black"
            onClick={() => setShowMobileMoreMenu(false)}
          />

          {/* Side menu from right */}
          <div
            ref={mobileMoreMenuRef}
            className="fixed top-0 right-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between border-b border-amber-100 p-4">
              <div className="flex items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 font-medium text-white">
                  R
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-amber-900">Rahul Kumar</p>
                  <p className="truncate text-xs text-gray-500">rahul@example.com</p>
                </div>
              </div>
              <button
                onClick={() => setShowMobileMoreMenu(false)}
                className="text-gray-500 hover:text-amber-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex h-[calc(100%-70px)] flex-col overflow-y-auto p-2">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMoreMenu(false)}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </NavLink>
              <NavLink
                to="/my-bookings"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMoreMenu(false)}
              >
                <Calendar className="mr-3 h-5 w-5" />
                My Bookings
              </NavLink>
              <NavLink
                to="/my-temples"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMoreMenu(false)}
              >
                <AiFillHeart className="mr-3 h-5 w-5" />
                My Temples
              </NavLink>

              <NavLink
                to="/community"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMoreMenu(false)}
              >
                <Share2 className="mr-3 h-5 w-5" />
                Community
              </NavLink>
              <NavLink
                to="/astrology"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMoreMenu(false)}
              >
                <Star className="mr-3 h-5 w-5" />
                Astrology
              </NavLink>
              <NavLink
                to="/divine-seva"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMoreMenu(false)}
              >
                <FaPeopleGroup className="mr-3 h-5 w-5" />
                DivineSeva
              </NavLink>

              <NavLink
                to="/live-events"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMoreMenu(false)}
              >
                <Video className="mr-3 h-5 w-5" />
                Live Events
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? 'mt-2 flex items-center border-t border-amber-300 p-3 pt-2 font-bold text-orange-600'
                    : 'mt-2 flex items-center border-t border-amber-300 p-3 pt-2 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMoreMenu(false)}
              >
                <Info className="mr-3 h-5 w-5" />
                About
              </NavLink>
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 font-bold text-orange-600'
                    : 'flex items-center p-3 text-gray-600 hover:text-amber-900'
                }
                onClick={() => setShowMobileMoreMenu(false)}
              >
                <Phone className="mr-3 h-5 w-5" />
                Contact Us
              </NavLink>

              <div className="mt-2 border-t border-amber-300 pt-2">
                <button
                  className="flex items-center p-3 text-red-500"
                  onClick={() => {
                    setShowMobileMoreMenu(false);
                    handleSignoutButtonClick();
                  }}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Bottom navigation bar for mobile */}
      <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-amber-100 bg-white md:hidden">
        <div className="flex justify-between px-2 py-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'flex flex-1 flex-col items-center text-orange-600'
                : 'flex flex-1 flex-col items-center text-gray-500'
            }
          >
            <MdTempleHindu className="h-5 w-5" />
            <span className="mt-1 text-xs">Temples</span>
          </NavLink>

          <NavLink
            to="/upcoming-poojas"
            className={({ isActive }) =>
              isActive
                ? 'flex flex-1 flex-col items-center text-orange-600'
                : 'flex flex-1 flex-col items-center text-gray-500'
            }
          >
            <Calendar className="h-5 w-5" />
            <span className="mt-1 text-xs">Poojas </span>
          </NavLink>

          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive
                ? 'flex flex-1 flex-col items-center text-orange-600'
                : 'flex flex-1 flex-col items-center text-gray-500'
            }
          >
            <Home className="h-5 w-5" />
            <span className="mt-1 text-xs">Feed</span>
          </NavLink>

          <NavLink
            to="/devotee-store"
            className={({ isActive }) =>
              isActive
                ? 'flex flex-1 flex-col items-center text-orange-600'
                : 'flex flex-1 flex-col items-center text-gray-500'
            }
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="mt-1 text-xs">Devotee Store</span>
          </NavLink>

          <div className="relative flex-1">
            <button
              onClick={() => setShowMobileMoreMenu(!showMobileMoreMenu)}
              className={
                showMobileMoreMenu
                  ? 'flex w-full flex-col items-center text-orange-600'
                  : 'flex w-full flex-col items-center text-gray-500'
              }
            >
              <Menu className="h-5 w-5" />
              <span className="mt-1 text-xs">More</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
