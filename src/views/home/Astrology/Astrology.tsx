import {
  Search,
  ChevronRight,
  Star,
  Moon,
  Sun,
  Calendar,
  MessageCircle,
  Users,
  Bell,
} from 'lucide-react';
import SearchInputField from '../../../components/common/Input/SearchInputField';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';
import { NavLink, useNavigate } from 'react-router-dom';

const Astrology = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-50 font-sans">
      {/* Original Component would render here */}

      <div className="min-h-screen bg-amber-50 font-sans">
        <SearchInputField />

        {/* Main Content */}
        <main className="container mx-auto grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Astrology Header */}
            <div>
              <h2 className="font-serif text-xl text-amber-900">Vedic Astrology</h2>
              <p className="text-sm text-gray-600">
                Explore cosmic insights and nakshatra readings
              </p>
            </div>

            {/* My Nakshatra */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">My Nakshatra Profile</h3>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <Star className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-700">Rohini</span>
                    <span className="text-xs text-gray-500">4th Nakshatra • Taurus</span>
                  </div>
                </div>
                <NavLink to="/" className="text-sm text-orange-500">
                  View
                </NavLink>
              </div>
              <div className="rounded-lg bg-amber-50 p-3">
                <p className="mb-2 text-sm text-gray-700">Today's Guidance:</p>
                <p className="text-sm text-gray-600">
                  Your ruling planet Venus brings prosperity and harmony today. Focus on creative
                  endeavors and strengthening relationships.
                </p>
              </div>
            </div>

            {/* Planetary Positions */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Current Planetary Positions</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded bg-amber-50 p-3">
                  <div className="flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                      <Sun className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Sun in Uttara Phalguni</p>
                      <p className="text-xs text-gray-500">In Leo • Until March 30, 2025</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded bg-amber-50 p-3">
                  <div className="flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                      <Moon className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Moon in Ashwini</p>
                      <p className="text-xs text-gray-500">
                        Waxing Crescent • Auspicious for new beginnings
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                View full planetary transits <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>

            {/* Astrological Events */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Auspicious Dates</h3>
              <div className="space-y-4">
                <div>
                  <p className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                    Akshaya Tritiya
                  </p>
                  <p className="text-xs text-gray-500">April 10, 2025 • Highly auspicious</p>
                </div>
                <div>
                  <p className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                    Favorable Muhurat
                  </p>
                  <p className="text-xs text-gray-500">March 25, 2025 • 9:15 AM - 11:30 AM</p>
                </div>
              </div>
              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                View full panchang <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>
          </div>

          {/* Center Column (Astrology Feed) - Takes 2 columns in the 4-column grid */}
          <div className="md:col-span-2">
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h2 className="mb-4 font-serif text-lg text-amber-900">Astrology Insights</h2>

              {/* Search Bar */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search nakshatras, muhurat, and remedies..."
                  className="w-full rounded-full border border-amber-100 bg-amber-50 py-2 pr-4 pl-10 text-sm text-gray-700"
                />
                <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-500" />
              </div>

              {/* Feed Filters */}
              <div className="mb-6 flex space-x-3 overflow-x-auto text-sm">
                <button className="rounded-full bg-orange-500 px-4 py-1 text-white">
                  All Content
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Nakshatra Insights
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Planetary Transits
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Remedies
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Festivals
                </button>
              </div>

              {/* Astrology Posts */}
              <div className="space-y-6">
                {/* Post 1 */}
                <div className="rounded-lg bg-amber-50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-amber-100"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">Pandit Sharma</span>
                      <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-600">
                        Vedic Astrologer
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">2 hours ago</span>
                  </div>

                  <p className="mb-3 text-gray-700">
                    For those born in Magha Nakshatra, Jupiter's transit through Punarvasu brings a
                    period of spiritual growth and abundance. This is an excellent time for
                    education, travel, and expanding your horizons. I recommend chanting the Vishnu
                    Sahasranama daily to enhance these positive energies.
                  </p>

                  <div className="flex text-sm">
                    <span className="mr-4 flex items-center text-gray-500">
                      <Star className="mr-1 h-4 w-4" /> 42 likes
                    </span>
                    <span className="mr-4 flex items-center text-gray-500">
                      <MessageCircle className="mr-1 h-4 w-4" /> 15 comments
                    </span>
                    <NavLink to="/" className="text-orange-500">
                      Join Discussion
                    </NavLink>
                  </div>
                </div>

                {/* Post 2 */}
                <div className="rounded-lg bg-amber-50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-amber-100"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">Sri Vastu & Jyotish Center</span>
                      <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-600">
                        Verified
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">Yesterday</span>
                  </div>

                  <p className="mb-3 text-gray-700">
                    New article: "The 27 Nakshatras: Understanding Your Cosmic Blueprint" - Learn
                    how your birth nakshatra influences your personality, career path, and spiritual
                    journey. Includes remedies and mantras for each nakshatra.
                  </p>

                  <div className="mb-3 flex h-32 items-center justify-center rounded bg-amber-200/30">
                    <span className="font-serif text-amber-800">Article Image</span>
                  </div>

                  <div className="flex text-sm">
                    <span className="mr-4 flex items-center text-gray-500">
                      <Star className="mr-1 h-4 w-4" /> 89 likes
                    </span>
                    <span className="mr-4 flex items-center text-gray-500">
                      <MessageCircle className="mr-1 h-4 w-4" /> 27 comments
                    </span>
                    <NavLink to="/" className="text-orange-500">
                      Read Article
                    </NavLink>
                  </div>
                </div>

                {/* Post 3 */}
                <div className="rounded-lg bg-amber-50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-amber-100"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">Lakshmi Devi</span>
                      <span className="ml-2 text-xs text-gray-500">
                        Posted in Vedic Astrology Beginners
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">2 days ago</span>
                  </div>

                  <p className="mb-3 text-gray-700">
                    I just had my nakshatra reading done and discovered I was born in Chitra. The
                    astrologer mentioned it's ruled by Mars and associated with creativity and
                    artistic abilities. Anyone else here with Chitra nakshatra? Would love to
                    connect and learn more about our shared traits!
                  </p>

                  <div className="flex text-sm">
                    <span className="mr-4 flex items-center text-gray-500">
                      <Star className="mr-1 h-4 w-4" /> 35 likes
                    </span>
                    <span className="mr-4 flex items-center text-gray-500">
                      <MessageCircle className="mr-1 h-4 w-4" /> 52 comments
                    </span>
                    <NavLink to="/" className="text-orange-500">
                      Join Discussion
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Nakshatra Predictions */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Today's Nakshatra Prediction</h3>
              <div className="mb-3 rounded-lg bg-amber-50 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium text-gray-700">Select Your Nakshatra:</span>
                  <select className="rounded-full border border-orange-200 bg-white px-3 py-1 text-sm text-orange-500">
                    <option>Ashwini</option>
                    <option>Bharani</option>
                    <option>Krittika</option>
                    <option selected>Rohini</option>
                    <option>Mrigashira</option>
                    <option>Ardra</option>
                    <option>Punarvasu</option>
                    <option>Pushya</option>
                    <option>Ashlesha</option>
                    <option>Magha</option>
                    <option>Purva Phalguni</option>
                    <option>Uttara Phalguni</option>
                    {/* Additional nakshatras would be listed here */}
                  </select>
                </div>
                <p className="text-sm text-gray-700">
                  Those born in Rohini nakshatra will experience prosperity today. Your ruler Brahma
                  brings creative inspiration and abundance. An opportunity for financial growth may
                  present itself. Family matters will be harmonious. Chant "Om Rohinaye Namaha" 27
                  times for enhanced blessings.
                </p>
                <div className="mt-3 flex">
                  <div className="flex-1 text-center">
                    <span className="block text-xs text-gray-500">Prosperity</span>
                    <div className="mt-1 flex justify-center">
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-gray-300" />
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="block text-xs text-gray-500">Relationships</span>
                    <div className="mt-1 flex justify-center">
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="block text-xs text-gray-500">Health</span>
                    <div className="mt-1 flex justify-center">
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-gray-300" />
                      <Star className="h-3 w-3 text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                Read detailed prediction <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>

            {/* Astrology Services */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Jyotish Services</h3>

              <div className="space-y-3">
                {[
                  {
                    name: 'Nakshatra Analysis',
                    desc: 'Detailed birth star reading',
                    price: '₹1,100',
                  },
                  {
                    name: 'Mangal Dosha Check',
                    desc: 'Marriage compatibility analysis',
                    price: '₹1,500',
                  },
                  {
                    name: 'Shanti Puja Recommendation',
                    desc: 'Personalized remedies',
                    price: '₹2,100',
                  },
                ].map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded bg-amber-50 p-3"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{service.name}</p>
                      <p className="text-xs text-gray-500">
                        {service.desc} • {service.price}
                      </p>
                    </div>
                    <button className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white">
                      Book
                    </button>
                  </div>
                ))}
              </div>

              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                View all services <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>

            {/* Astrology Groups */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Jyotish Communities</h3>

              <div className="space-y-3">
                {[
                  {
                    name: 'Vedic Astrology Practitioners',
                    members: '1.5K members',
                  },
                  {
                    name: 'Nakshatra Study Circle',
                    members: '872 members',
                  },
                  {
                    name: 'Temple Astrologers Network',
                    members: '947 members',
                  },
                ].map((group, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded bg-amber-50 p-3"
                  >
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-300/60">
                        <Users className="h-4 w-4 text-amber-700" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">{group.name}</p>
                        <p className="text-xs text-gray-500">{group.members}</p>
                      </div>
                    </div>
                    <button className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white">
                      Join
                    </button>
                  </div>
                ))}
              </div>

              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                Discover more communities <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>
          </div>
        </main>

        {/* Floating Action Button - Adjusted position for mobile */}
        <FloatingActionButton />
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
            We're bringing divine guidance to you soon! The Astrology page will feature expert
            insights, personalized horoscopes, and Vedic astrology services to help you navigate
            life’s journey. Stay tuned for updates!
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
    </div>
  );
};

export default Astrology;
