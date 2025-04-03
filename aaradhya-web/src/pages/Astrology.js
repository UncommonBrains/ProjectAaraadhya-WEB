import React from "react";
import {
  Search,
  ChevronRight,
  Star,
  Moon,
  Sun,
  Calendar,
  MessageCircle,
  Users,
  Plus,
  Bell,
} from "lucide-react";
import SearchBar from "../components/searchBar";

const Astrology = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans relative">
      {/* Original Component would render here */}

      <div className="bg-amber-50 min-h-screen font-sans">
        <SearchBar />

        {/* Main Content */}
        <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Astrology Header */}
            <div>
              <h2 className="text-xl font-serif text-amber-900">
                Vedic Astrology
              </h2>
              <p className="text-gray-600 text-sm">
                Explore cosmic insights and nakshatra readings
              </p>
            </div>

            {/* My Nakshatra */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                My Nakshatra Profile
              </h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-amber-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="ml-3">
                    <span className="text-gray-700 block text-sm font-medium">
                      Rohini
                    </span>
                    <span className="text-gray-500 text-xs">
                      4th Nakshatra • Taurus
                    </span>
                  </div>
                </div>
                <a href="/" className="text-orange-500 text-sm">
                  View
                </a>
              </div>
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-gray-700 text-sm mb-2">Today's Guidance:</p>
                <p className="text-gray-600 text-sm">
                  Your ruling planet Venus brings prosperity and harmony today.
                  Focus on creative endeavors and strengthening relationships.
                </p>
              </div>
            </div>

            {/* Planetary Positions */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Current Planetary Positions
              </h3>

              <div className="space-y-3">
                <div className="bg-amber-50 rounded p-3 flex justify-between items-center">
                  <div className="flex">
                    <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                      <Sun className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700 text-sm font-medium">
                        Sun in Uttara Phalguni
                      </p>
                      <p className="text-gray-500 text-xs">
                        In Leo • Until March 30, 2025
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded p-3 flex justify-between items-center">
                  <div className="flex">
                    <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                      <Moon className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700 text-sm font-medium">
                        Moon in Ashwini
                      </p>
                      <p className="text-gray-500 text-xs">
                        Waxing Crescent • Auspicious for new beginnings
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                View full planetary transits{" "}
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Astrological Events */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Auspicious Dates
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                    Akshaya Tritiya
                  </p>
                  <p className="text-gray-500 text-xs">
                    April 10, 2025 • Highly auspicious
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                    Favorable Muhurat
                  </p>
                  <p className="text-gray-500 text-xs">
                    March 25, 2025 • 9:15 AM - 11:30 AM
                  </p>
                </div>
              </div>
              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                View full panchang <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Center Column (Astrology Feed) - Takes 2 columns in the 4-column grid */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h2 className="font-serif text-amber-900 text-lg mb-4">
                Astrology Insights
              </h2>

              {/* Search Bar */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search nakshatras, muhurat, and remedies..."
                  className="w-full bg-amber-50 border border-amber-100 rounded-full py-2 pl-10 pr-4 text-sm text-gray-700"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              </div>

              {/* Feed Filters */}
              <div className="flex space-x-3 mb-6 text-sm overflow-x-auto">
                <button className="bg-orange-500 text-white px-4 py-1 rounded-full">
                  All Content
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Nakshatra Insights
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Planetary Transits
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Remedies
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Festivals
                </button>
              </div>

              {/* Astrology Posts */}
              <div className="space-y-6">
                {/* Post 1 */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">
                        Pandit Sharma
                      </span>
                      <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                        Vedic Astrologer
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">
                      2 hours ago
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">
                    For those born in Magha Nakshatra, Jupiter's transit through
                    Punarvasu brings a period of spiritual growth and abundance.
                    This is an excellent time for education, travel, and
                    expanding your horizons. I recommend chanting the Vishnu
                    Sahasranama daily to enhance these positive energies.
                  </p>

                  <div className="flex text-sm">
                    <span className="text-gray-500 mr-4 flex items-center">
                      <Star className="h-4 w-4 mr-1" /> 42 likes
                    </span>
                    <span className="text-gray-500 mr-4 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" /> 15 comments
                    </span>
                    <a href="/" className="text-orange-500">
                      Join Discussion
                    </a>
                  </div>
                </div>

                {/* Post 2 */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">
                        Sri Vastu & Jyotish Center
                      </span>
                      <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">
                      Yesterday
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">
                    New article: "The 27 Nakshatras: Understanding Your Cosmic
                    Blueprint" - Learn how your birth nakshatra influences your
                    personality, career path, and spiritual journey. Includes
                    remedies and mantras for each nakshatra.
                  </p>

                  <div className="bg-amber-200/30 rounded h-32 flex items-center justify-center mb-3">
                    <span className="text-amber-800 font-serif">
                      Article Image
                    </span>
                  </div>

                  <div className="flex text-sm">
                    <span className="text-gray-500 mr-4 flex items-center">
                      <Star className="h-4 w-4 mr-1" /> 89 likes
                    </span>
                    <span className="text-gray-500 mr-4 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" /> 27 comments
                    </span>
                    <a href="/" className="text-orange-500">
                      Read Article
                    </a>
                  </div>
                </div>

                {/* Post 3 */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">
                        Lakshmi Devi
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        Posted in Vedic Astrology Beginners
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">
                      2 days ago
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">
                    I just had my nakshatra reading done and discovered I was
                    born in Chitra. The astrologer mentioned it's ruled by Mars
                    and associated with creativity and artistic abilities.
                    Anyone else here with Chitra nakshatra? Would love to
                    connect and learn more about our shared traits!
                  </p>

                  <div className="flex text-sm">
                    <span className="text-gray-500 mr-4 flex items-center">
                      <Star className="h-4 w-4 mr-1" /> 35 likes
                    </span>
                    <span className="text-gray-500 mr-4 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" /> 52 comments
                    </span>
                    <a href="/" className="text-orange-500">
                      Join Discussion
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Nakshatra Predictions */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Today's Nakshatra Prediction
              </h3>
              <div className="bg-amber-50 rounded-lg p-3 mb-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">
                    Select Your Nakshatra:
                  </span>
                  <select className="bg-white text-orange-500 rounded-full px-3 py-1 text-sm border border-orange-200">
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
                <p className="text-gray-700 text-sm">
                  Those born in Rohini nakshatra will experience prosperity
                  today. Your ruler Brahma brings creative inspiration and
                  abundance. An opportunity for financial growth may present
                  itself. Family matters will be harmonious. Chant "Om Rohinaye
                  Namaha" 27 times for enhanced blessings.
                </p>
                <div className="flex mt-3">
                  <div className="flex-1 text-center">
                    <span className="text-xs text-gray-500 block">
                      Prosperity
                    </span>
                    <div className="flex justify-center mt-1">
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-gray-300" />
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-gray-500 block">
                      Relationships
                    </span>
                    <div className="flex justify-center mt-1">
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-gray-500 block">Health</span>
                    <div className="flex justify-center mt-1">
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-orange-500" />
                      <Star className="h-3 w-3 text-gray-300" />
                      <Star className="h-3 w-3 text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                Read detailed prediction <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Astrology Services */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Jyotish Services
              </h3>

              <div className="space-y-3">
                {[
                  {
                    name: "Nakshatra Analysis",
                    desc: "Detailed birth star reading",
                    price: "₹1,100",
                  },
                  {
                    name: "Mangal Dosha Check",
                    desc: "Marriage compatibility analysis",
                    price: "₹1,500",
                  },
                  {
                    name: "Shanti Puja Recommendation",
                    desc: "Personalized remedies",
                    price: "₹2,100",
                  },
                ].map((service, idx) => (
                  <div
                    key={idx}
                    className="bg-amber-50 rounded p-3 flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm font-medium">
                        {service.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {service.desc} • {service.price}
                      </p>
                    </div>
                    <button className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Book
                    </button>
                  </div>
                ))}
              </div>

              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                View all services <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Astrology Groups */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Jyotish Communities
              </h3>

              <div className="space-y-3">
                {[
                  {
                    name: "Vedic Astrology Practitioners",
                    members: "1.5K members",
                  },
                  {
                    name: "Nakshatra Study Circle",
                    members: "872 members",
                  },
                  {
                    name: "Temple Astrologers Network",
                    members: "947 members",
                  },
                ].map((group, idx) => (
                  <div
                    key={idx}
                    className="bg-amber-50 rounded p-3 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="bg-amber-300/60 rounded-full w-8 h-8 flex items-center justify-center">
                        <Users className="h-4 w-4 text-amber-700" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700 text-sm font-medium">
                          {group.name}
                        </p>
                        <p className="text-gray-500 text-xs">{group.members}</p>
                      </div>
                    </div>
                    <button className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Join
                    </button>
                  </div>
                ))}
              </div>

              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                Discover more communities <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </main>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <button className="bg-orange-500 h-12 w-12 rounded-full flex items-center justify-center text-white shadow-lg">
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>
      {/* Overlay Layer */}
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 p-4 rounded-full">
              <Calendar className="h-12 w-12 text-orange-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Coming Soon!
          </h2>

          <p className="text-gray-600 mb-6">
            We're bringing divine guidance to you soon! The Astrology page will
            feature expert insights, personalized horoscopes, and Vedic
            astrology services to help you navigate life’s journey. Stay tuned
            for updates!
          </p>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mb-6">
            <h3 className="font-medium text-amber-900 mb-2">
              Get notified when we launch
            </h3>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md flex items-center">
                <Bell className="h-4 w-4 mr-2" /> Notify Me
              </button>
            </div>
          </div>

          <button
            className="text-orange-600 hover:text-orange-700 font-medium"
            onClick={() => (window.location.href = "/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Astrology;
