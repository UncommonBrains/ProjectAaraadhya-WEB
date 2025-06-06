import {
  ChevronRight,
  Plus,
  Clock,
  Star,
  Calendar,
  Moon,
  Sun,
  User,
  MapPin,
  Play,
 Bell,
  Video,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';

const Feed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      <div className="">
        {/* Welcome Section for Mobile - Centered */}
        <div className="p-4 text-center md:hidden">
          <h2 className="font-serif text-xl text-amber-900">Namaste, Rahul!</h2>
          <p className="text-sm text-gray-600">Wishing you spiritual blessings today</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
        {/* Left Column */}

        <div className="!hidden space-y-6 md:!block">
          {/* Welcome Section */}
          <div>
            <h2 className="font-serif text-xl text-amber-900">Namaste, Rahul!</h2>
            <p className="text-sm text-gray-600">Wishing you spiritual blessings today</p>
          </div>

          {/* Astrolgy */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <h3 className="mb-4 font-serif text-amber-900">
              <Link to="/astrology">Astrology </Link>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center rounded bg-amber-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                  <Star className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">Nakshatra Analysis</p>
                  <p className="text-xs text-gray-500">Personalized birth star readings</p>
                </div>
                <span className="text-sm text-orange-500">
                  <a href="/astrology">Explore</a>
                </span>
              </div>

              <div className="flex items-center rounded bg-amber-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                  <Moon className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">Muhurta Selection</p>
                  <p className="text-xs text-gray-500">Auspicious timing for important events</p>
                </div>
                <span className="text-sm text-orange-500">
                  <a href="/astrology">Consult</a>
                </span>
              </div>

              <div className="flex items-center rounded bg-amber-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                  <Sun className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">Detailed Horoscope</p>
                  <p className="text-xs text-gray-500">Comprehensive life analysis with remedies</p>
                </div>
                <span className="text-sm text-orange-500">
                  <a href="/astrology">Book Now</a>{' '}
                </span>
              </div>

              <div className="flex items-center rounded bg-amber-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">Physical Jathakam</p>
                  <p className="text-xs text-gray-500">
                    Handwritten birth chart on traditional paper
                  </p>
                </div>
                <span className="text-sm text-orange-500">
                  <a href="/astrology">Order Now</a>
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-purple-100 bg-orange-50 p-3">
              <p className="mb-2 text-sm text-gray-700">Looking for astrology guidance?</p>
              <p className="text-xs text-gray-600">
                Post your queries and connect with expert astrologers for horoscope matching,
                kundali analysis, and personalized predictions.
              </p>
            </div>

            <a href="/astrology" className="mt-4 flex items-center text-sm text-orange-500">
              Discover all astrology services <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Divine Seva */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <h3 className="mb-4 font-serif text-amber-900">Divine Seva </h3>

            <div className="space-y-4">
              <div className="flex items-center rounded bg-amber-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                  <User className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">Find Qualified Priests</p>
                  <p className="text-xs text-gray-500">
                    Connect with experienced poojaris for ceremonies
                  </p>
                </div>
                <span className="text-sm text-orange-500">
                  <a href="/divine-seva">Browse</a>
                </span>
              </div>

              <div className="flex items-center rounded bg-amber-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">Schedule Ceremonies</p>
                  <p className="text-xs text-gray-500">Book priests for important rituals</p>
                </div>
                <span className="text-sm text-orange-500">
                  <a href="/divine-seva">Plan</a>
                </span>
              </div>

              <div className="flex items-center rounded bg-amber-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">Home & Temple Services</p>
                  <p className="text-xs text-gray-500">Ceremonies at your preferred location</p>
                </div>
                <span className="text-sm text-orange-500">
                  <a href="/divine-seva">Select</a>
                </span>
              </div>

              <div className="flex items-center rounded bg-amber-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">Auspicious Timings</p>
                  <p className="text-xs text-gray-500">Find muhurtas for your ceremonies</p>
                </div>
                <span className="text-sm text-orange-500">
                  <a href="/divine-seva">Check</a>
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-orange-100 bg-orange-50 p-3">
              <p className="mb-2 text-sm text-gray-700">Need a priest for your ceremony?</p>
              <p className="text-xs text-gray-600">
                Post your requirement and connect with qualified professionals for griha pravesh,
                satyanarayan puja, and more.
              </p>
            </div>

            <a href="/divine-seva" className="mt-4 flex items-center text-sm text-orange-500">
              Explore all DivineSeva services <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Community */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <Link to="/community">
              <h3 className="mb-4 font-serif text-amber-900">Community</h3>
            </Link>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Vedic Philosophy Discussion</p>
                <p className="text-xs text-gray-500">143 active members</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Temple Photography Group</p>
                <p className="text-xs text-gray-500">89 active members</p>
              </div>
            </div>
            <a href="/" className="mt-4 flex items-center text-sm text-orange-500">
              Explore communities <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Center Column (Feed) - Takes 2 columns in the 4-column grid */}
        <div className="mb-14 md:col-span-2">
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <h2 className="mb-4 font-serif text-lg text-amber-900">Temple Feed</h2>

            {/* Feed Filters */}
            <div className="mb-6 flex overflow-x-auto pb-2 text-sm">
              <button className="mr-3 rounded-full bg-orange-500 px-4 py-1 whitespace-nowrap text-white">
                All
              </button>
              <button className="mr-3 rounded-full bg-amber-50 px-4 py-1 whitespace-nowrap text-gray-600">
                Updates
              </button>
              <button className="mr-3 rounded-full bg-amber-50 px-4 py-1 whitespace-nowrap text-gray-600">
                Events
              </button>
              <button className="mr-3 rounded-full bg-amber-50 px-4 py-1 whitespace-nowrap text-gray-600">
                Festivals
              </button>
            </div>

            {/* Feed Posts */}
            <div className="space-y-6">
              {/* Post 1 */}
              <div className="rounded-lg bg-amber-50 p-4">
                <div className="mb-3 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-100"></div>
                  <span className="ml-3 font-medium text-gray-700">ISKCON Temple</span>
                  <span className="ml-3 text-xs text-gray-500">2 hours ago</span>
                </div>

                <p className="mb-3 text-gray-700">
                  Join us for the special Janmashtami celebrations! The event will feature kirtan,
                  abhishekam, and prasadam distribution for all devotees.
                </p>

                <div className="mb-3 flex h-32 items-center justify-center rounded bg-amber-200/30">
                  <span className="font-serif text-amber-800">Event Image</span>
                </div>

                <div className="flex text-sm">
                  <span className="mr-4 text-gray-500">78 likes</span>
                  <span className="mr-4 text-gray-500">12 comments</span>
                  <a href="/" className="text-orange-500">
                    Register Now
                  </a>
                </div>
              </div>

              {/* Post 2 */}
              <div className="rounded-lg bg-amber-50 p-4">
                <div className="mb-3 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-100"></div>
                  <span className="ml-3 font-medium text-gray-700">Meenakshi Temple</span>
                  <span className="ml-3 text-xs text-gray-500">Yesterday</span>
                </div>

                <p className="mb-3 text-gray-700">
                  The temple will remain open for extended hours during the upcoming Navratri
                  festival. Special archanas will be performed daily at 10 AM and 6 PM.
                </p>

                <div className="flex text-sm">
                  <span className="mr-4 text-gray-500">45 likes</span>
                  <span className="mr-4 text-gray-500">8 comments</span>
                  <a href="/" className="text-orange-500">
                    Book Archana
                  </a>
                </div>
              </div>

              {/* Post 3 */}
              <div className="rounded-lg bg-amber-50 p-4">
                <div className="mb-3 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-100"></div>
                  <span className="ml-3 font-medium text-gray-700">Kashi Vishwanath</span>
                  <span className="ml-3 text-xs text-gray-500">2 days ago</span>
                </div>

                <p className="mb-3 text-gray-700">
                  Live streaming of the Maha Shivaratri rituals will be available on our platform.
                  Devotees can also register for the online prasad delivery service.
                </p>

                <div className="mb-3 flex h-32 items-center justify-center rounded bg-amber-200/30">
                  <span className="font-serif text-amber-800">Ritual Image</span>
                </div>

                <div className="flex text-sm">
                  <span className="mr-4 text-gray-500">125 likes</span>
                  <span className="mr-4 text-gray-500">34 comments</span>
                  <a href="/live-events" className="text-orange-500">
                    View Live Stream
                  </a>
                </div>
              </div>
              {/* Post 3 */}
              <div className="rounded-lg bg-amber-50 p-4">
                <div className="mb-3 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-100"></div>
                  <span className="ml-3 font-medium text-gray-700">Kashi Vishwanath</span>
                  <span className="ml-3 text-xs text-gray-500">2 days ago</span>
                </div>

                <p className="mb-3 text-gray-700">
                  Live streaming of the Maha Shivaratri rituals will be available on our platform.
                  Devotees can also register for the online prasad delivery service.
                </p>

                <div className="mb-3 flex h-32 items-center justify-center rounded bg-amber-200/30">
                  <span className="font-serif text-amber-800">Ritual Image</span>
                </div>

                <div className="flex text-sm">
                  <span className="mr-4 text-gray-500">125 likes</span>
                  <span className="mr-4 text-gray-500">34 comments</span>
                  <a href="/live-events" className="text-orange-500">
                    View Live Stream
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="!hidden space-y-6 md:!block">
          {/* Upcoming Poojas */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <Link to="/upcoming-poojas">
              <h3 className="mb-4 font-serif text-amber-900">Upcoming Poojas</h3>
            </Link>
            <div className="space-y-3">
              <div className="flex rounded bg-amber-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 font-medium text-orange-500">
                  13
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Ganesh Chaturthi Pooja</p>
                  <p className="text-xs text-gray-500">Tomorrow, 9:00 AM</p>
                </div>
              </div>
              <div className="flex rounded bg-amber-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 font-medium text-orange-500">
                  15
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Lakshmi Pooja</p>
                  <p className="text-xs text-gray-500">March 15, 6:30 PM</p>
                </div>
              </div>
            </div>
            <a href="/upcoming-poojas" className="mt-4 flex items-center text-sm text-orange-500">
              View full calendar <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Discover Temples */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <Link to="/expLore-temples">
              <h3 className="mb-4 font-serif text-amber-900">Discover Temples</h3>
            </Link>

            <div className="space-y-3">
              {[
                {
                  name: 'Somnath Temple',
                  location: 'Gujarat',
                  followers: '5K+',
                },
                {
                  name: 'Golden Temple',
                  location: 'Punjab',
                  followers: '12K+',
                },
                {
                  name: 'Badrinath Temple',
                  location: 'Uttarakhand',
                  followers: '8K+',
                },
              ].map((temple, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded bg-amber-50 p-3"
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-amber-300/60"></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">{temple.name}</p>
                      <p className="text-xs text-gray-500">
                        {temple.location} • {temple.followers} followers
                      </p>
                    </div>
                  </div>
                  <button className="font-medium text-orange-500">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <a href="/explore-temples" className="mt-4 flex items-center text-sm text-orange-500">
              Explore more temples <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Temple Store Preview */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <Link to="/devotee-store">
              <h3 className="mb-4 font-serif text-amber-900">Temple Store</h3>
            </Link>

            <div className="space-y-3">
              {[
                {
                  name: 'Pooja Thali',
                  category: 'Essential Kit',
                  price: '₹499',
                },
                {
                  name: 'Incense Sticks',
                  category: 'Fragrance & Aroma',
                  price: '₹149',
                },
                {
                  name: 'Brass Lamp',
                  category: 'Temple Decor',
                  price: '₹799',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded bg-amber-50 p-3"
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-amber-300/60"></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.category} • {item.price}
                      </p>
                    </div>
                  </div>
                  <button className="font-medium text-orange-500">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <a href="/devotee-store" className="mt-4 flex items-center text-sm text-orange-500">
              Explore more items <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          {/* Live Events */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
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
            <div className="mb-4 rounded-lg bg-amber-50 p-3">
              {/* <h5 className="text-xs font-medium text-amber-900 mb-2">
                Coming Up Next
              </h5> */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-orange-100 text-orange-500">
                      <Video className="h-3 w-3" />
                    </div>
                    <div className="ml-2">
                      <p className="text-xs font-medium text-gray-700">Navadurga Bhajan Sandhya</p>
                      {/* <p className="text-gray-500 text-xs">
                        Devi Bhajan Group • Live Now
                      </p> */}
                    </div>
                  </div>
                  <a href="/live-events" className="text-xs text-orange-500">
                    <a href="/live-events">Watch</a>
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-200 text-amber-700">
                      <Clock className="h-3 w-3" />
                    </div>
                    <div className="ml-2">
                      <p className="text-xs font-medium text-gray-700">Vishnu Sahasranamam</p>
                      {/* <p className="text-gray-500 text-xs">
                        Sri Vishnu Temple • Starts in 2h
                      </p> */}
                    </div>
                  </div>
                  <button className="rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
                    <a href="/live-events">Remind</a>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Temples Quick View */}
            <div className="mb-4 grid grid-cols-3 gap-2">
              {[
                {
                  name: 'Gurvayoor',
                  location: 'Thrissur',
                  status: 'Live',
                },
                {
                  name: 'Chakkulathukavu Sree Bhagavathi Temple',
                  location: 'Alappuzha ',
                  status: 'Live',
                },
                {
                  name: 'Sree Vadakkumnathan Temple',
                  location: 'Thrissur',
                  status: '5:30 PM',
                },
              ].map((temple, idx) => (
                <Link to="/live-events" key={idx}>
                  <div className="rounded bg-amber-50 p-2 text-center transition hover:bg-amber-100">
                    <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                      {temple.status === 'Live' ? (
                        <Play className="h-3 w-3 text-red-600" />
                      ) : (
                        <Calendar className="h-3 w-3 text-amber-700" />
                      )}
                    </div>
                    <p className="truncate text-xs font-medium text-gray-700">{temple.name}</p>
                    <p className="flex items-center justify-center text-xs text-gray-500">
                      <MapPin className="mr-1 h-2 w-2" /> {temple.location}
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

            <Link to="/live-events" className="flex items-center text-sm text-orange-500">
              Explore all live events <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
        </div>
        {/* Overlay Layer */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-orange-100 p-4">
              <Calendar className="h-12 w-12 text-orange-600" />
            </div>
          </div>

          <h2 className="mb-3 text-2xl font-bold text-gray-800">Coming Soon!</h2>

          <p className="mb-6 text-gray-600">
          Get ready for a smarter way to stay connected. Soon, you’ll start seeing real-time updates from your favourite temples — from poojas and events to announcements and special moments. All in one place, right in your feed.
          </p>

          <div className="mb-6 rounded-lg border border-orange-100 bg-orange-50 p-4">
            <h3 className="mb-2 font-medium text-amber-900">Get notified when we launch</h3>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow rounded-l-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <button className="flex items-center rounded-r-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
                <Bell className="mr-2 h-4 w-4" /> Notify Me
              </button>
            </div>
          </div>

          <button
            className="font-medium text-orange-600 hover:text-orange-700"
            onClick={() => navigate('/')}
          >
            Return to Home
          </button>
        </div>
      </div>
      </main>

      {/* Floating Action Button - Adjusted position for mobile */}
      <FloatingActionButton />

      
    </div>
  );
};

export default Feed;
