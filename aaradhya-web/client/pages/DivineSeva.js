import React from "react";
import {
  Search,
  ChevronRight,
  Calendar,
  MessageCircle,
  Users,
  Plus,
  Bell,
  MapPin,
  Clock,
  Star,
  Filter,
  Briefcase,
  Home,
  Building,
  User,
} from "lucide-react";
import SearchBar from "../components/searchBar";
import ActionButton from "../components/ActionButton";


const DivineSeva = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans relative">
      {/* Original Component would render here */}

      <div className="bg-gray-50 min-h-screen font-sans">
        <SearchBar />

        {/* Main Content */}
        <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* DivineSeva Header */}
            <div>
              <h2 className="text-xl font-serif text-amber-900">DivineSeva</h2>
              <p className="text-gray-600 text-sm">
                Connect with priests for rituals and ceremonies
              </p>
            </div>

            {/* My Profile */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">My Profile</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-amber-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <User className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="ml-3">
                    <span className="text-gray-700 block text-sm font-medium">
                      Raj Sharma
                    </span>
                    <span className="text-gray-500 text-xs">
                      Devotee • Mumbai
                    </span>
                  </div>
                </div>
                <a href="/" className="text-orange-500 text-sm">
                  Edit
                </a>
              </div>
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-gray-700 text-sm mb-2">Recent Activity:</p>
                <p className="text-gray-600 text-sm">
                  Posted 2 ritual requests this month. Last ceremony: Griha
                  Pravesh on March 15, 2025
                </p>
              </div>
            </div>

            {/* Upcoming Ceremonies */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                My Upcoming Ceremonies
              </h3>

              <div className="space-y-3">
                <div className="bg-amber-50 rounded p-3 flex justify-between items-center">
                  <div className="flex">
                    <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700 text-sm font-medium">
                        Satyanarayan Puja
                      </p>
                      <p className="text-gray-500 text-xs">
                        April 5, 2025 • 10:00 AM
                      </p>
                    </div>
                  </div>
                  <a href="/" className="text-orange-500 text-xs">
                    Details
                  </a>
                </div>

                <div className="bg-amber-50 rounded p-3 flex justify-between items-center">
                  <div className="flex">
                    <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700 text-sm font-medium">
                        Vastu Shanti
                      </p>
                      <p className="text-gray-500 text-xs">
                        April 15, 2025 • Pending confirmation
                      </p>
                    </div>
                  </div>
                  <a href="/" className="text-orange-500 text-xs">
                    Details
                  </a>
                </div>
              </div>

              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                View all ceremonies <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Auspicious Dates */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Auspicious Dates
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                    Ram Navami
                  </p>
                  <p className="text-gray-500 text-xs">
                    April 17, 2025 • Ideal for temple ceremonies
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                    Akshaya Tritiya
                  </p>
                  <p className="text-gray-500 text-xs">
                    May 10, 2025 • Auspicious for new beginnings
                  </p>
                </div>
              </div>
              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                View full calendar <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Center Column (Job Postings Feed) - Takes 2 columns in the 4-column grid */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h2 className="font-serif text-amber-900 text-lg mb-4">
                Priest & Poojari Opportunities
              </h2>

              {/* Search Bar */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search for rituals, temples, or locations..."
                  className="w-full bg-amber-50 border border-amber-100 rounded-full py-2 pl-10 pr-4 text-sm text-gray-700"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              </div>

              {/* Feed Filters */}
              <div className="flex space-x-3 mb-6 text-sm overflow-x-auto">
                <button className="bg-orange-500 text-white px-4 py-1 rounded-full">
                  All Postings
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Temple Events
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Home Ceremonies
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Corporate Pujas
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Festival Services
                </button>
              </div>

              {/* Job Postings */}
              <div className="space-y-6">
                {/* Post 1 - Temple */}
                <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-orange-500">
                  <div className="flex items-center mb-3">
                    <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center">
                      <Building className="h-4 w-4 text-orange-700" />
                    </div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">
                        Shri Siddhivinayak Temple
                      </span>
                      <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">
                      Posted 2 hours ago
                    </span>
                  </div>

                  <h3 className="text-amber-900 font-medium mb-2">
                    Experienced Poojari Required for Ganesh Chaturthi
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> Apr 20-22, 2025
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> Mumbai, Maharashtra
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> Full-day (8 hours)
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center">
                      <Briefcase className="h-3 w-3 mr-1" /> ₹5,000 per day
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">
                    We are seeking an experienced poojari well-versed in all
                    Ganesh Chaturthi rituals for our main temple celebration.
                    Must have 5+ years of experience with Ganesh puja and
                    knowledge of Vedic mantras. Accommodation will be provided.
                  </p>

                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex text-sm">
                      <span className="text-gray-500 mr-4 flex items-center">
                        <Users className="h-4 w-4 mr-1" /> 3 positions
                      </span>
                      <span className="text-gray-500 mr-4 flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" /> 8 applicants
                      </span>
                    </div>
                    <a
                      href="/"
                      className="text-white bg-orange-500 px-4 py-1 rounded-full text-sm"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>

                {/* Post 2 - Home Ceremony */}
                <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 rounded-full w-8 h-8 flex items-center justify-center">
                      <Home className="h-4 w-4 text-amber-700" />
                    </div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">
                        Sharma Family
                      </span>
                      <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                        5★ Rating
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">
                      Yesterday
                    </span>
                  </div>

                  <h3 className="text-amber-900 font-medium mb-2">
                    Priest for Griha Pravesh Ceremony
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> Apr 15, 2025
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> Pune, Maharashtra
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> 4 hours (7AM-11AM)
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center">
                      <Briefcase className="h-3 w-3 mr-1" /> ₹4,500 + dakshina
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">
                    We are moving into our new home and require an experienced
                    priest for Griha Pravesh ceremony. Should be familiar with
                    all rituals including Vastu Shanti. Priest should bring all
                    pooja samagri. Transportation will be arranged from Pune
                    city center.
                  </p>

                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex text-sm">
                      <span className="text-gray-500 mr-4 flex items-center">
                        <Users className="h-4 w-4 mr-1" /> 1 position
                      </span>
                      <span className="text-gray-500 mr-4 flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" /> 5 applicants
                      </span>
                    </div>
                    <a
                      href="/"
                      className="text-white bg-orange-500 px-4 py-1 rounded-full text-sm"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>

                {/* Post 3 - Corporate Ceremony */}
                <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                      <Building className="h-4 w-4 text-blue-700" />
                    </div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">
                        TechSolutions India Ltd.
                      </span>
                      <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                        Corporate
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">
                      3 days ago
                    </span>
                  </div>

                  <h3 className="text-amber-900 font-medium mb-2">
                    Sanskrit-Speaking Priest for Office Inauguration
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> Apr 10, 2025
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> Bangalore, Karnataka
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> 2 hours (9AM-11AM)
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center">
                      <Briefcase className="h-3 w-3 mr-1" /> ₹7,500
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">
                    We're inaugurating our new tech campus and require a priest
                    fluent in Sanskrit for a traditional office blessing
                    ceremony. The ceremony will include Ganesha puja and
                    Lakshmi-Narayana invocation. English explanation of rituals
                    for international executives would be appreciated.
                  </p>

                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex text-sm">
                      <span className="text-gray-500 mr-4 flex items-center">
                        <Users className="h-4 w-4 mr-1" /> 1 position
                      </span>
                      <span className="text-gray-500 mr-4 flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" /> 12 applicants
                      </span>
                    </div>
                    <a
                      href="/"
                      className="text-white bg-orange-500 px-4 py-1 rounded-full text-sm"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="text-orange-500 border border-orange-300 rounded-full px-6 py-2 hover:bg-orange-50">
                  Load More Opportunities
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Post a Requirement */}
            <div className="bg-orange-50 rounded-lg shadow-sm border border-orange-200 p-4">
              <h3 className="font-serif text-amber-900 mb-3">
                Post a Requirement
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Looking for a priest or poojari for your ceremony? Post your
                requirement and connect with qualified professionals.
              </p>
              <button className="w-full bg-orange-500 text-white py-2 rounded-lg flex items-center justify-center">
                <Plus className="h-4 w-4 mr-2" />
                Create New Posting
              </button>
            </div>

            {/* Priest/Poojari Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Refine Search
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm font-medium block mb-2">
                    Ceremony Type
                  </label>
                  <select className="w-full bg-amber-50 border border-amber-100 rounded-md p-2 text-sm">
                    <option>All Ceremonies</option>
                    <option>Griha Pravesh</option>
                    <option>Satyanarayan Puja</option>
                    <option>Ganesh Puja</option>
                    <option>Wedding Ceremony</option>
                    <option>Navagraha Shanti</option>
                    <option>Vastu Shanti</option>
                    <option>Baby Naming</option>
                    <option>Funeral Services</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-700 text-sm font-medium block mb-2">
                    Location
                  </label>
                  <select className="w-full bg-amber-50 border border-amber-100 rounded-md p-2 text-sm">
                    <option>All India</option>
                    <option>Mumbai</option>
                    <option>Delhi NCR</option>
                    <option>Bangalore</option>
                    <option>Chennai</option>
                    <option>Pune</option>
                    <option>Hyderabad</option>
                    <option>Kolkata</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-700 text-sm font-medium block mb-2">
                    Date Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      className="w-full bg-amber-50 border border-amber-100 rounded-md p-2 text-sm"
                    />
                    <input
                      type="date"
                      className="w-full bg-amber-50 border border-amber-100 rounded-md p-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 text-sm font-medium block mb-2">
                    Duration
                  </label>
                  <select className="w-full bg-amber-50 border border-amber-100 rounded-md p-2 text-sm">
                    <option>Any Duration</option>
                    <option>1-2 Hours</option>
                    <option>Half Day</option>
                    <option>Full Day</option>
                    <option>Multiple Days</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-700 text-sm font-medium block mb-2">
                    Minimum Experience
                  </label>
                  <select className="w-full bg-amber-50 border border-amber-100 rounded-md p-2 text-sm">
                    <option>Any Experience</option>
                    <option>1+ Years</option>
                    <option>3+ Years</option>
                    <option>5+ Years</option>
                    <option>10+ Years</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-orange-500 text-white py-2 rounded-lg mt-4">
                Apply Filters
              </button>
            </div>

            {/* Top Rated Priests */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Top Rated Priests
              </h3>

              <div className="space-y-3">
                {[
                  {
                    name: "Pandit Ramesh Sharma",
                    specialty: "Vedic Ceremonies • 12 yrs exp",
                    rating: "4.9",
                  },
                  {
                    name: "Acharya Suresh Joshi",
                    specialty: "Vastu & Graha Shanti • 15 yrs exp",
                    rating: "4.8",
                  },
                  {
                    name: "Guruji Krishnan",
                    specialty: "Tamil Rituals • 20 yrs exp",
                    rating: "4.9",
                  },
                ].map((priest, idx) => (
                  <div
                    key={idx}
                    className="bg-amber-50 rounded p-3 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center">
                        <User className="h-4 w-4 text-amber-700" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700 text-sm font-medium">
                          {priest.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {priest.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="bg-amber-100 px-2 py-1 rounded-full flex items-center">
                      <Star className="h-3 w-3 text-orange-500 mr-1" />
                      <span className="text-xs font-medium">
                        {priest.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                View all priests <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </main>

        {/* Floating Action Button - Adjusted position for mobile */}
      <ActionButton/>
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
            We're working to connect temples and devotees with experienced
            poojaris! The Divine Seva page will soon offer a seamless way to
            hire priests for rituals and ceremonies. Stay tuned for this sacred
            service!
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

export default DivineSeva;
