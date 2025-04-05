import React from "react";
import {
  Search,
  ChevronRight,
  Calendar,
  MessageCircle,
  Users,
  Bell,
  Heart,
  Play,
  DollarSign,
  Clock,
  Video,
  Gift,
  Share2,
  Award,
  MapPin,
} from "lucide-react";
import SearchBar from "../components/searchBar";
import ActionButton from "../components/ActionButton";

const LiveEvents = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans relative">
      {/* Original Component would render here */}

      <div className="bg-gray-50 min-h-screen font-sans">
        <SearchBar />

        {/* Main Content */}
        <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* LiveEvents Header */}
            <div>
              <h2 className="text-xl font-serif text-amber-900">
                Temple Live Events
              </h2>
              <p className="text-gray-600 text-sm">
                Connect with sacred ceremonies and cultural programs
              </p>
            </div>

            {/* Currently Watching */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Currently Watching
              </h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-amber-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <Video className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="ml-3">
                    <span className="text-gray-700 block text-sm font-medium">
                      Ganapati Homam
                    </span>
                    <span className="text-gray-500 text-xs">
                      Sri Ganesh Temple • Live Now
                    </span>
                  </div>
                </div>
                <a href="/" className="text-orange-500 text-sm">
                  Resume
                </a>
              </div>
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-gray-700 text-sm mb-2">Viewing Status:</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full w-2/3"></div>
                </div>
                <p className="text-gray-600 text-xs mt-2">
                  42 minutes watched • 23 minutes remaining
                </p>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Upcoming Events
              </h3>

              <div className="space-y-3">
                <div className="bg-amber-50 rounded p-3 flex justify-between items-center">
                  <div className="flex">
                    <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700 text-sm font-medium">
                        Navarathri Celebration
                      </p>
                      <p className="text-gray-500 text-xs">
                        April 4, 2025 • 6:00 PM
                      </p>
                    </div>
                  </div>
                  <button className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                    Remind
                  </button>
                </div>

                <div className="bg-amber-50 rounded p-3 flex justify-between items-center">
                  <div className="flex">
                    <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700 text-sm font-medium">
                        Saptahah Day 1
                      </p>
                      <p className="text-gray-500 text-xs">
                        April 7, 2025 • 8:30 AM
                      </p>
                    </div>
                  </div>
                  <button className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                    Remind
                  </button>
                </div>
              </div>

              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                View all upcoming events <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* My Subscriptions */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                My Subscriptions
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 text-sm font-medium flex items-center">
                    <Award className="h-4 w-4 text-orange-500 mr-2" />
                    Sri Krishna Temple
                  </p>
                  <p className="text-gray-500 text-xs">
                    Premium Member • Auto-renewal on May 15
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-medium flex items-center">
                    <Award className="h-4 w-4 text-orange-500 mr-2" />
                    Vishnu Temple Foundation
                  </p>
                  <p className="text-gray-500 text-xs">
                    Standard Member • 14 days remaining
                  </p>
                </div>
              </div>
              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                Manage subscriptions <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Center Column (LiveEvents Feed) - Takes 2 columns in the 4-column grid */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h2 className="font-serif text-amber-900 text-lg mb-4">
                Live Now
              </h2>

              {/* Search Bar */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search events, temples, ceremonies..."
                  className="w-full bg-amber-50 border border-amber-100 rounded-full py-2 pl-10 pr-4 text-sm text-gray-700"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              </div>

              {/* Feed Filters */}
              <div className="flex space-x-3 mb-6 text-sm overflow-x-auto">
                <button className="bg-orange-500 text-white px-4 py-1 rounded-full">
                  All Events
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Pujas & Homams
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Saptaham
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Cultural Programs
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Festivals
                </button>
              </div>

              {/* Live Events Posts */}
              <div className="space-y-6">
                {/* Event 1 - Featured Live Stream */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">
                        Sri Ganesh Temple
                      </span>
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        LIVE
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">
                      Started 1 hour ago
                    </span>
                  </div>

                  <div className="relative mb-3">
                    <div className="bg-gray-800 rounded h-48 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-80" />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded flex items-center">
                      <Play className="h-3 w-3 mr-1" /> Live
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
                      1.2K watching
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-800 mb-2">
                    Ganapati Homam & Special Abhishekam
                  </h3>

                  <p className="text-gray-700 text-sm mb-3">
                    Join us for the auspicious Ganapati Homam performed by Sri
                    Venkatachary, followed by a special abhishekam ceremony. The
                    event invokes Lord Ganesha's blessings for removing
                    obstacles and bringing prosperity.
                  </p>

                  <div className="bg-white rounded-lg p-3 mb-3 border border-amber-100">
                    <h4 className="text-amber-900 font-medium text-sm mb-2">
                      Support this event
                    </h4>
                    <div className="flex space-x-2 mb-2">
                      <button className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center">
                        <Gift className="h-3 w-3 mr-1" /> Donate
                      </button>
                      <button className="bg-amber-100 text-amber-900 text-xs px-3 py-1.5 rounded-full flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" /> Book Pooja
                      </button>
                      <button className="bg-amber-100 text-amber-900 text-xs px-3 py-1.5 rounded-full flex items-center">
                        <Share2 className="h-3 w-3 mr-1" /> Share
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Your contributions help support temple activities
                    </p>
                  </div>

                  <div className="flex text-sm">
                    <span className="text-gray-500 mr-4 flex items-center">
                      <Heart className="h-4 w-4 mr-1" /> 124 likes
                    </span>
                    <span className="text-gray-500 mr-4 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" /> 42 comments
                    </span>
                    <a href="/" className="text-orange-500">
                      Join Live Chat
                    </a>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">
                        Devi Bhajan Group
                      </span>
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        LIVE
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">
                      Started 30 mins ago
                    </span>
                  </div>

                  <div className="relative mb-3">
                    <div className="bg-gray-800 rounded h-48 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-80" />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded flex items-center">
                      <Play className="h-3 w-3 mr-1" /> Live
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
                      876 watching
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-800 mb-2">
                    Navadurga Bhajan Sandhya
                  </h3>

                  <p className="text-gray-700 text-sm mb-3">
                    Experience the divine melodies of Navadurga Bhajans
                    performed by the renowned Devi Bhajan Group. Special
                    devotional songs dedicated to the nine forms of Goddess
                    Durga to celebrate the upcoming Navarathri festival.
                  </p>

                  <div className="bg-white rounded-lg p-3 mb-3 border border-amber-100">
                    <h4 className="text-amber-900 font-medium text-sm mb-2">
                      Support this event
                    </h4>
                    <div className="flex space-x-2 mb-2">
                      <button className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center">
                        <Gift className="h-3 w-3 mr-1" /> Donate
                      </button>
                      <button className="bg-amber-100 text-amber-900 text-xs px-3 py-1.5 rounded-full flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" /> Book Special
                        Song
                      </button>
                      <button className="bg-amber-100 text-amber-900 text-xs px-3 py-1.5 rounded-full flex items-center">
                        <Share2 className="h-3 w-3 mr-1" /> Share
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Donations support the artists and temple
                    </p>
                  </div>

                  <div className="flex text-sm">
                    <span className="text-gray-500 mr-4 flex items-center">
                      <Heart className="h-4 w-4 mr-1" /> 98 likes
                    </span>
                    <span className="text-gray-500 mr-4 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" /> 36 comments
                    </span>
                    <a href="/" className="text-orange-500">
                      Join Live Chat
                    </a>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">
                        Sri Vishnu Temple
                      </span>
                      <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        UPCOMING
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">
                      Starts in 2 hours
                    </span>
                  </div>

                  <div className="relative mb-3">
                    <div className="bg-amber-100 rounded h-48 flex items-center justify-center">
                      <Clock className="h-12 w-12 text-amber-700 opacity-80" />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-amber-900 text-white text-xs px-2 py-0.5 rounded flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> Apr 1, 6:00 PM
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
                      432 reminders
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-800 mb-2">
                    Vishnu Sahasranamam Chanting
                  </h3>

                  <p className="text-gray-700 text-sm mb-3">
                    Join our priests for the sacred chanting of the Vishnu
                    Sahasranamam (1000 names of Lord Vishnu). This sacred ritual
                    is performed every Tuesday and brings peace, prosperity, and
                    divine grace to all participants.
                  </p>

                  <div className="bg-white rounded-lg p-3 mb-3 border border-amber-100">
                    <h4 className="text-amber-900 font-medium text-sm mb-2">
                      Pre-event offerings
                    </h4>
                    <div className="flex space-x-2 mb-2">
                      <button className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center">
                        <Gift className="h-3 w-3 mr-1" /> Sponsor
                      </button>
                      <button className="bg-amber-100 text-amber-900 text-xs px-3 py-1.5 rounded-full flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" /> Archana
                      </button>
                      <button className="bg-amber-100 text-amber-900 text-xs px-3 py-1.5 rounded-full flex items-center">
                        <Bell className="h-3 w-3 mr-1" /> Set Reminder
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Your name will be mentioned during the ceremony
                    </p>
                  </div>

                  <div className="flex text-sm">
                    <span className="text-gray-500 mr-4 flex items-center">
                      <Heart className="h-4 w-4 mr-1" /> 58 likes
                    </span>
                    <span className="text-gray-500 mr-4 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" /> 12 comments
                    </span>
                    <a href="/" className="text-orange-500">
                      Add to Calendar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Featured Temples */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Featured Temples
              </h3>
              <div className="bg-amber-50 rounded-lg p-3 mb-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">
                    Discover Live Events:
                  </span>
                  <select className="bg-white text-orange-500 rounded-full px-3 py-1 text-sm border border-orange-200">
                    <option>All Regions</option>
                    <option>North India</option>
                    <option>South India</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      name: "Sri Venkateswara Temple",
                      location: "Tirupati, India",
                      status: "Live Now",
                    },
                    {
                      name: "ISKCON Temple",
                      location: "New Delhi, India",
                      status: "2 Live Events",
                    },
                    {
                      name: "Meenakshi Temple",
                      location: "Madurai, India",
                      status: "Upcoming 5:30 PM",
                    },
                  ].map((temple, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <div className="bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center">
                          <Video className="h-4 w-4 text-amber-700" />
                        </div>
                        <div className="ml-2">
                          <p className="text-gray-700 text-sm font-medium">
                            {temple.name}
                          </p>
                          <p className="text-gray-500 text-xs flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />{" "}
                            {temple.location}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          temple.status.includes("Live")
                            ? "bg-red-100 text-red-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {temple.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                View all featured temples <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Premium Services */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Premium Services
              </h3>

              <div className="space-y-3">
                {[
                  {
                    name: "Private Puja Broadcast",
                    desc: "For family members abroad",
                    price: "₹2,100",
                  },
                  {
                    name: "Monthly Subscription",
                    desc: "Access to all live events",
                    price: "₹1,100/month",
                  },
                  {
                    name: "VIP Temple Tour",
                    desc: "Virtual guided tour",
                    price: "₹1,500",
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

            {/* Event Communities */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Event Communities
              </h3>

              <div className="space-y-3">
                {[
                  {
                    name: "Global Saptaham Viewers",
                    members: "2.3K members",
                  },
                  {
                    name: "Bhajan & Music Lovers",
                    members: "1.8K members",
                  },
                  {
                    name: "Temple Live Stream Group",
                    members: "982 members",
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

        {/* Floating Action Button - Adjusted position for mobile */}
        <ActionButton />
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
            We're bringing sacred experiences closer to you! The Live Events
            page will soon allow devotees to watch poojas and temple events
            happening outside the Sreekovil in real-time. Stay tuned for divine
            moments, streamed straight to you!
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

export default LiveEvents;
