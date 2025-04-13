import {
  ChevronRight,
  Plus,
  Check,
  Clock,
  Star,
  Calendar,
  Moon,
  Sun,
  User,
  MapPin,
  Play,
  // Heart,
  // Users,
  Video,
  // Bell,
} from "lucide-react";
import SearchBar from "../components/searchBar";
import ActionButton from "../components/ActionButton";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext/";

const Home = () => {
  const { userData, userLoggedIn } = useAuth();
  const firstName = userData.displayName?.split(" ")[0];

  return (
    <div className="bg-amber-50 min-h-screen font-sans">
      <div className="">
        <SearchBar />
        {/* Welcome Section for Mobile - Centered */}
        {userLoggedIn && (
          <div className="md:hidden text-center p-4">
            <h2 className="text-xl font-serif text-amber-900">
              Namaste, {firstName}!
            </h2>
            <p className="text-gray-600 text-sm">
              Wishing you spiritual blessings today
            </p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Column */}
        {userLoggedIn && (
          <div className="!hidden  md:!block  space-y-6">
            {/* Welcome Section */}
            <div>
              <h2 className=" text-xl font-serif text-amber-900">
                Namaste, {firstName}!
              </h2>
              <p className="text-gray-600 text-sm">
                Wishing you spiritual blessings today
              </p>
            </div>

            {/* My Temples */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <Link to="/my-temples">
                <h3 className="font-serif text-amber-900 mb-4">My Temples</h3>
              </Link>
              <ul className="space-y-4">
                {[
                  "ISKCON Temple",
                  "Meenakshi Temple",
                  "Kashi Vishwanath",
                  "Tirupati Balaji",
                ].map((temple, index) => (
                  <li key={index} className="flex items-center">
                    <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                    <span className="ml-3 text-gray-700">{temple}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                See all temples <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* My Bookings */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <Link to="/my-bookings">
                <h3 className="font-serif text-amber-900 mb-4 cursor-pointer hover:text-amber-700">
                  My Bookings
                </h3>
              </Link>

              <div className="space-y-3">
                <div className="bg-amber-50 rounded p-3 flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 text-sm font-medium">
                      Ganesh Abhishekam
                    </p>
                    <p className="text-gray-500 text-xs">
                      Tomorrow, 10:30 AM • ISKCON
                    </p>
                  </div>
                  <div className="bg-green-100 rounded-md p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                </div>

                <div className="bg-amber-50 rounded p-3 flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 text-sm font-medium">
                      VIP Darshan Pass
                    </p>
                    <p className="text-gray-500 text-xs">
                      March 18, 4:00 PM • Tirupati
                    </p>
                  </div>
                  <div className="bg-orange-100 rounded-md p-1">
                    <Clock className="h-4 w-4 text-orange-500" />
                  </div>
                </div>
              </div>

              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                View all bookings <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
        <div className="!hidden  md:!block  space-y-6">
          {/* Astrolgy */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <h3 className="font-serif text-amber-900 mb-4">
              <a href="/astrology">Astrology </a>
            </h3>

            <div className="space-y-4">
              <div className="bg-amber-50 rounded p-3 flex items-center">
                <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                  <Star className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-gray-700 text-sm font-medium">
                    Nakshatra Analysis
                  </p>
                  <p className="text-gray-500 text-xs">
                    Personalized birth star readings
                  </p>
                </div>
                <span className="text-orange-500 text-sm">
                  <a href="/astrology">Explore</a>
                </span>
              </div>

              <div className="bg-amber-50 rounded p-3 flex items-center">
                <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                  <Moon className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-gray-700 text-sm font-medium">
                    Muhurta Selection
                  </p>
                  <p className="text-gray-500 text-xs">
                    Auspicious timing for important events
                  </p>
                </div>
                <span className="text-orange-500 text-sm">
                  <a href="/astrology">Consult</a>
                </span>
              </div>

              <div className="bg-amber-50 rounded p-3 flex items-center">
                <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                  <Sun className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-gray-700 text-sm font-medium">
                    Detailed Horoscope
                  </p>
                  <p className="text-gray-500 text-xs">
                    Comprehensive life analysis with remedies
                  </p>
                </div>
                <span className="text-orange-500 text-sm">
                  <a href="/astrology">Book Now</a>{" "}
                </span>
              </div>

              <div className="bg-amber-50 rounded p-3 flex items-center">
                <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-gray-700 text-sm font-medium">
                    Physical Jathakam
                  </p>
                  <p className="text-gray-500 text-xs">
                    Handwritten birth chart on traditional paper
                  </p>
                </div>
                <span className="text-orange-500 text-sm">
                  <a href="/astrology">Order Now</a>
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-purple-100">
              <p className="text-sm text-gray-700 mb-2">
                Looking for astrology guidance?
              </p>
              <p className="text-xs text-gray-600">
                Post your queries and connect with expert astrologers for
                horoscope matching, kundali analysis, and personalized
                predictions.
              </p>
            </div>

            <a
              href="/astrology"
              className="text-orange-500 flex items-center mt-4 text-sm"
            >
              Discover all astrology services{" "}
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Divine Seva */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <h3 className="font-serif text-amber-900 mb-4">Divine Seva </h3>

            <div className="space-y-4">
              <div className="bg-amber-50 rounded p-3 flex items-center">
                <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                  <User className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-gray-700 text-sm font-medium">
                    Find Qualified Priests
                  </p>
                  <p className="text-gray-500 text-xs">
                    Connect with experienced poojaris for ceremonies
                  </p>
                </div>
                <span className="text-orange-500 text-sm">
                  <a href="/divine-seva">Browse</a>
                </span>
              </div>

              <div className="bg-amber-50 rounded p-3 flex items-center">
                <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-gray-700 text-sm font-medium">
                    Schedule Ceremonies
                  </p>
                  <p className="text-gray-500 text-xs">
                    Book priests for important rituals
                  </p>
                </div>
                <span className="text-orange-500 text-sm">
                  <a href="/divine-seva">Plan</a>
                </span>
              </div>

              <div className="bg-amber-50 rounded p-3 flex items-center">
                <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-gray-700 text-sm font-medium">
                    Home & Temple Services
                  </p>
                  <p className="text-gray-500 text-xs">
                    Ceremonies at your preferred location
                  </p>
                </div>
                <span className="text-orange-500 text-sm">
                  <a href="/divine-seva">Select</a>
                </span>
              </div>

              <div className="bg-amber-50 rounded p-3 flex items-center">
                <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-gray-700 text-sm font-medium">
                    Auspicious Timings
                  </p>
                  <p className="text-gray-500 text-xs">
                    Find muhurtas for your ceremonies
                  </p>
                </div>
                <span className="text-orange-500 text-sm">
                  <a href="/divine-seva">Check</a>
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
              <p className="text-sm text-gray-700 mb-2">
                Need a priest for your ceremony?
              </p>
              <p className="text-xs text-gray-600">
                Post your requirement and connect with qualified professionals
                for griha pravesh, satyanarayan puja, and more.
              </p>
            </div>

            <a
              href="/divine-seva"
              className="text-orange-500 flex items-center mt-4 text-sm"
            >
              Explore all DivineSeva services{" "}
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Community */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <Link to="/community">
              <h3 className="font-serif text-amber-900 mb-4">Community</h3>
            </Link>

            <div className="space-y-4">
              <div>
                <p className="text-gray-700 text-sm font-medium">
                  Vedic Philosophy Discussion
                </p>
                <p className="text-gray-500 text-xs">143 active members</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium">
                  Temple Photography Group
                </p>
                <p className="text-gray-500 text-xs">89 active members</p>
              </div>
            </div>
            <a
              href="/"
              className="text-orange-500 flex items-center mt-4 text-sm"
            >
              Explore communities <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Center Column (Feed) - Takes 2 columns in the 4-column grid */}
        <div className="md:col-span-2 mb-14">
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <h2 className="font-serif text-amber-900 text-lg mb-4">
              Temple Feed
            </h2>

            {/* Feed Filters */}
            <div className="flex overflow-x-auto pb-2 mb-6 text-sm">
              <button className="bg-orange-500 text-white px-4 py-1 rounded-full whitespace-nowrap mr-3">
                All
              </button>
              <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full whitespace-nowrap mr-3">
                Updates
              </button>
              <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full whitespace-nowrap mr-3">
                Events
              </button>
              <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full whitespace-nowrap mr-3">
                Festivals
              </button>
            </div>

            {/* Feed Posts */}
            <div className="space-y-6">
              {/* Post 1 */}
              <div className="bg-amber-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                  <span className="ml-3 font-medium text-gray-700">
                    ISKCON Temple
                  </span>
                  <span className="ml-3 text-xs text-gray-500">
                    2 hours ago
                  </span>
                </div>

                <p className="text-gray-700 mb-3">
                  Join us for the special Janmashtami celebrations! The event
                  will feature kirtan, abhishekam, and prasadam distribution for
                  all devotees.
                </p>

                <div className="bg-amber-200/30 rounded h-32 flex items-center justify-center mb-3">
                  <span className="text-amber-800 font-serif">Event Image</span>
                </div>

                <div className="flex text-sm">
                  <span className="text-gray-500 mr-4">78 likes</span>
                  <span className="text-gray-500 mr-4">12 comments</span>
                  <a href="/" className="text-orange-500">
                    Register Now
                  </a>
                </div>
              </div>

              {/* Post 2 */}
              <div className="bg-amber-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                  <span className="ml-3 font-medium text-gray-700">
                    Meenakshi Temple
                  </span>
                  <span className="ml-3 text-xs text-gray-500">Yesterday</span>
                </div>

                <p className="text-gray-700 mb-3">
                  The temple will remain open for extended hours during the
                  upcoming Navratri festival. Special archanas will be performed
                  daily at 10 AM and 6 PM.
                </p>

                <div className="flex text-sm">
                  <span className="text-gray-500 mr-4">45 likes</span>
                  <span className="text-gray-500 mr-4">8 comments</span>
                  <a href="/" className="text-orange-500">
                    Book Archana
                  </a>
                </div>
              </div>

              {/* Post 3 */}
              <div className="bg-amber-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                  <span className="ml-3 font-medium text-gray-700">
                    Kashi Vishwanath
                  </span>
                  <span className="ml-3 text-xs text-gray-500">2 days ago</span>
                </div>

                <p className="text-gray-700 mb-3">
                  Live streaming of the Maha Shivaratri rituals will be
                  available on our platform. Devotees can also register for the
                  online prasad delivery service.
                </p>

                <div className="bg-amber-200/30 rounded h-32 flex items-center justify-center mb-3">
                  <span className="text-amber-800 font-serif">
                    Ritual Image
                  </span>
                </div>

                <div className="flex text-sm">
                  <span className="text-gray-500 mr-4">125 likes</span>
                  <span className="text-gray-500 mr-4">34 comments</span>
                  <a href="/live-events" className="text-orange-500">
                    View Live Stream
                  </a>
                </div>
              </div>
              {/* Post 3 */}
              <div className="bg-amber-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                  <span className="ml-3 font-medium text-gray-700">
                    Kashi Vishwanath
                  </span>
                  <span className="ml-3 text-xs text-gray-500">2 days ago</span>
                </div>

                <p className="text-gray-700 mb-3">
                  Live streaming of the Maha Shivaratri rituals will be
                  available on our platform. Devotees can also register for the
                  online prasad delivery service.
                </p>

                <div className="bg-amber-200/30 rounded h-32 flex items-center justify-center mb-3">
                  <span className="text-amber-800 font-serif">
                    Ritual Image
                  </span>
                </div>

                <div className="flex text-sm">
                  <span className="text-gray-500 mr-4">125 likes</span>
                  <span className="text-gray-500 mr-4">34 comments</span>
                  <a href="/live-events" className="text-orange-500">
                    View Live Stream
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6  !hidden md:!block">
          {/* Upcoming Poojas */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <Link to="/upcoming-poojas">
              <h3 className="font-serif text-amber-900 mb-4">
                Upcoming Poojas
              </h3>
            </Link>
            <div className="space-y-3">
              <div className="bg-amber-50 rounded p-3 flex">
                <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500 font-medium">
                  13
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 text-sm font-medium">
                    Ganesh Chaturthi Pooja
                  </p>
                  <p className="text-gray-500 text-xs">Tomorrow, 9:00 AM</p>
                </div>
              </div>
              <div className="bg-amber-50 rounded p-3 flex">
                <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500 font-medium">
                  15
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 text-sm font-medium">
                    Lakshmi Pooja
                  </p>
                  <p className="text-gray-500 text-xs">March 15, 6:30 PM</p>
                </div>
              </div>
            </div>
            <a
              href="/upcoming-poojas"
              className="text-orange-500 flex items-center mt-4 text-sm"
            >
              View full calendar <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Discover Temples */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <Link to="/expLore-temples">
              <h3 className="font-serif text-amber-900 mb-4">
                Discover Temples
              </h3>
            </Link>

            <div className="space-y-3">
              {[
                {
                  name: "Somnath Temple",
                  location: "Gujarat",
                  followers: "5K+",
                },
                {
                  name: "Golden Temple",
                  location: "Punjab",
                  followers: "12K+",
                },
                {
                  name: "Badrinath Temple",
                  location: "Uttarakhand",
                  followers: "8K+",
                },
              ].map((temple, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50 rounded p-3 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="bg-amber-300/60 rounded-full w-8 h-8"></div>
                    <div className="ml-3">
                      <p className="text-gray-700 text-sm font-medium">
                        {temple.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {temple.location} • {temple.followers} followers
                      </p>
                    </div>
                  </div>
                  <button className="text-orange-500 font-medium">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <a
              href="/explore-temples"
              className="text-orange-500 flex items-center mt-4 text-sm"
            >
              Explore more temples <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Temple Store Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <Link to="/devotee-store">
              <h3 className="font-serif text-amber-900 mb-4">Temple Store</h3>
            </Link>

            <div className="space-y-3">
              {[
                {
                  name: "Pooja Thali",
                  category: "Essential Kit",
                  price: "₹499",
                },
                {
                  name: "Incense Sticks",
                  category: "Fragrance & Aroma",
                  price: "₹149",
                },
                {
                  name: "Brass Lamp",
                  category: "Temple Decor",
                  price: "₹799",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50 rounded p-3 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="bg-amber-300/60 rounded-full w-8 h-8"></div>
                    <div className="ml-3">
                      <p className="text-gray-700 text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {item.category} • {item.price}
                      </p>
                    </div>
                  </div>
                  <button className="text-orange-500 font-medium">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <a
              href="/devotee-store"
              className="text-orange-500 flex items-center mt-4 text-sm"
            >
              Explore more items <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          {/* Live Events */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-amber-900">
                  <a href="/live-events">Temple Live Events</a>
                </h3>
              </div>
              {/* <div>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center">
                  <Play className="h-3 w-3 mr-1" /> 3 Live Now
                </span>
              </div> */}
            </div>

            {/* Featured Live Event */}
            {/* <div className="relative mb-4">
              <div className="bg-gray-800 rounded-lg h-36 flex items-center justify-center">
                <Play className="h-12 w-12 text-white opacity-80" />
              </div>
              <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded flex items-center">
                <Play className="h-3 w-3 mr-1" /> Live
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
                1.2K watching
              </div>
            </div>

            <h4 className="font-medium text-gray-800 text-sm mb-2">
              Ganapati Homam & Special Abhishekam
            </h4>
            <p className="text-gray-700 text-xs mb-3">
              Join us for the auspicious Ganapati Homam performed by Sri
              Venkatachary, followed by a special abhishekam ceremony.
            </p> */}

            {/* Quick Stats */}
            {/* <div className="flex text-xs mb-4">
              <span className="text-gray-500 mr-3 flex items-center">
                <Heart className="h-3 w-3 mr-1" /> 124
              </span>
              <span className="text-gray-500 flex items-center">
                <Users className="h-3 w-3 mr-1" /> 1.2K watching
              </span>
              <a href="/live-events" className="text-orange-500 ml-auto">
                Join Now
              </a>
            </div> */}

            {/* Upcoming Events Row */}
            <div className="bg-amber-50 rounded-lg p-3 mb-4">
              {/* <h5 className="text-xs font-medium text-amber-900 mb-2">
                Coming Up Next
              </h5> */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-orange-100 rounded w-6 h-6 flex items-center justify-center text-orange-500">
                      <Video className="h-3 w-3" />
                    </div>
                    <div className="ml-2">
                      <p className="text-gray-700 text-xs font-medium">
                        Navadurga Bhajan Sandhya
                      </p>
                      {/* <p className="text-gray-500 text-xs">
                        Devi Bhajan Group • Live Now
                      </p> */}
                    </div>
                  </div>
                  <a href="/live-events" className="text-orange-500 text-xs">
                    <a href="/live-events">Watch</a>
                  </a>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-amber-200 rounded w-6 h-6 flex items-center justify-center text-amber-700">
                      <Clock className="h-3 w-3" />
                    </div>
                    <div className="ml-2">
                      <p className="text-gray-700 text-xs font-medium">
                        Vishnu Sahasranamam
                      </p>
                      {/* <p className="text-gray-500 text-xs">
                        Sri Vishnu Temple • Starts in 2h
                      </p> */}
                    </div>
                  </div>
                  <button className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                    <a href="/live-events">Remind</a>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Temples Quick View */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                {
                  name: "Gurvayoor",
                  location: "Thrissur",
                  status: "Live",
                },
                {
                  name: "Chakkulathukavu Sree Bhagavathi Temple",
                  location: "Alappuzha ",
                  status: "Live",
                },
                {
                  name: "Sree Vadakkumnathan Temple",
                  location: "Thrissur",
                  status: "5:30 PM",
                },
              ].map((temple, idx) => (
                <Link to="/live-events" key={idx}>
                  <div className="bg-amber-50 rounded p-2 text-center hover:bg-amber-100 transition">
                    <div className="bg-amber-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">
                      {temple.status === "Live" ? (
                        <Play className="h-3 w-3 text-red-600" />
                      ) : (
                        <Calendar className="h-3 w-3 text-amber-700" />
                      )}
                    </div>
                    <p className="text-xs font-medium text-gray-700 truncate">
                      {temple.name}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center justify-center">
                      <MapPin className="h-2 w-2 mr-1" /> {temple.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Get Notified Section */}
            {/* <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 mb-4">
              <p className="text-xs text-gray-700 mb-2">
                Never miss important temple events and ceremonies!
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email for notifications"
                  className="flex-grow px-2 py-1 text-xs border border-gray-300 rounded-l-md focus:outline-none"
                />
                <button className="bg-orange-500 text-white px-2 py-1 rounded-r-md flex items-center text-xs">
                  <Bell className="h-3 w-3 mr-1" /> Notify
                </button>
              </div>
            </div> */}

            <Link
              to="/live-events"
              className="text-orange-500 flex items-center text-sm"
            >
              Explore all live events <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Floating Action Button - Adjusted position for mobile */}
      <ActionButton />
    </div>
  );
};

export default Home;
