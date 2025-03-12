import React from "react";
import { Bell, Search, ChevronRight, Calendar, Plus, Play, Check, Clock  } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-amber-50 min-h-screen font-sans">
    {/* Header */}
    <header className="bg-amber-50/80 border-b border-amber-100 p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <div className="bg-orange-400 rounded-full w-8 h-8"></div>
        <h1 className="ml-3 text-xl font-serif text-amber-900 font-bold">Aaradhya</h1>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-6 text-sm">
        <a href="#" className="text-amber-900 font-medium">Home</a>
        <a href="#" className="text-gray-600 hover:text-amber-900">My Temples</a>
        <a href="#" className="text-gray-600 hover:text-amber-900">Upcoming Poojas</a>
        <a href="#" className="text-gray-600 hover:text-amber-900">Donations</a>
        <a href="#" className="text-gray-600 hover:text-amber-900">Community</a>
      </nav>

      {/* Search and Profile */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search temples, poojas..."
            className="pl-8 pr-4 py-1 rounded-full border border-amber-200 bg-white text-sm w-48 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
          <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 bg-orange-400 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">3</span>
          </div>
          <div className="bg-amber-600 rounded-full w-9 h-9 flex items-center justify-center text-white font-medium">R</div>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-xl font-serif text-amber-900">Namaste, Rahul!</h2>
          <p className="text-gray-600 text-sm">Wishing you spiritual blessings today</p>
        </div>

        {/* My Temples */}
        <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
          <h3 className="font-serif text-amber-900 mb-4">My Temples</h3>
          <ul className="space-y-4">
            {["ISKCON Temple", "Meenakshi Temple", "Kashi Vishwanath", "Tirupati Balaji"].map((temple, index) => (
              <li key={index} className="flex items-center">
                <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                <span className="ml-3 text-gray-700">{temple}</span>
              </li>
            ))}
          </ul>
          <a href="#" className="text-orange-500 flex items-center mt-4 text-sm">
            See all temples <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        {/* Upcoming Poojas */}
        <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
          <h3 className="font-serif text-amber-900 mb-4">Upcoming Poojas</h3>
          <div className="space-y-3">
            <div className="bg-amber-50 rounded p-3 flex">
              <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500 font-medium">13</div>
              <div className="ml-3">
                <p className="text-gray-700 text-sm font-medium">Ganesh Chaturthi Pooja</p>
                <p className="text-gray-500 text-xs">Tomorrow, 9:00 AM</p>
              </div>
            </div>
            <div className="bg-amber-50 rounded p-3 flex">
              <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500 font-medium">15</div>
              <div className="ml-3">
                <p className="text-gray-700 text-sm font-medium">Lakshmi Pooja</p>
                <p className="text-gray-500 text-xs">March 15, 6:30 PM</p>
              </div>
            </div>
          </div>
          <a href="#" className="text-orange-500 flex items-center mt-4 text-sm">
            View full calendar <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        {/* Community */}
        <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
          <h3 className="font-serif text-amber-900 mb-4">Community</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-700 text-sm font-medium">Vedic Philosophy Discussion</p>
              <p className="text-gray-500 text-xs">143 active members</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium">Temple Photography Group</p>
              <p className="text-gray-500 text-xs">89 active members</p>
            </div>
          </div>
          <a href="#" className="text-orange-500 flex items-center mt-4 text-sm">
            Explore communities <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Center Column (Feed) - Takes 2 columns in the 4-column grid */}
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
          <h2 className="font-serif text-amber-900 text-lg mb-4">Temple Feed</h2>
          
          {/* Feed Filters */}
          <div className="flex space-x-3 mb-6 text-sm">
            <button className="bg-orange-500 text-white px-4 py-1 rounded-full">All</button>
            <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">Updates</button>
            <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">Events</button>
            <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">Festivals</button>
          </div>
          
          {/* Feed Posts */}
          <div className="space-y-6">
            {/* Post 1 */}
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                <span className="ml-3 font-medium text-gray-700">ISKCON Temple</span>
                <span className="ml-3 text-xs text-gray-500">2 hours ago</span>
              </div>
              
              <p className="text-gray-700 mb-3">
                Join us for the special Janmashtami celebrations! The event will feature kirtan, abhishekam, and prasadam distribution for all devotees.
              </p>
              
              <div className="bg-amber-200/30 rounded h-32 flex items-center justify-center mb-3">
                <span className="text-amber-800 font-serif">Event Image</span>
              </div>
              
              <div className="flex text-sm">
                <span className="text-gray-500 mr-4">78 likes</span>
                <span className="text-gray-500 mr-4">12 comments</span>
                <a href="#" className="text-orange-500">Register Now</a>
              </div>
            </div>
            
            {/* Post 2 */}
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                <span className="ml-3 font-medium text-gray-700">Meenakshi Temple</span>
                <span className="ml-3 text-xs text-gray-500">Yesterday</span>
              </div>
              
              <p className="text-gray-700 mb-3">
                The temple will remain open for extended hours during the upcoming Navratri festival. Special archanas will be performed daily at 10 AM and 6 PM.
              </p>
              
              <div className="flex text-sm">
                <span className="text-gray-500 mr-4">45 likes</span>
                <span className="text-gray-500 mr-4">8 comments</span>
                <a href="#" className="text-orange-500">Book Archana</a>
              </div>
            </div>
            
            {/* Post 3 */}
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                <span className="ml-3 font-medium text-gray-700">Kashi Vishwanath</span>
                <span className="ml-3 text-xs text-gray-500">2 days ago</span>
              </div>
              
              <p className="text-gray-700 mb-3">
                Live streaming of the Maha Shivaratri rituals will be available on our platform. Devotees can also register for the online prasad delivery service.
              </p>
              
              <div className="bg-amber-200/30 rounded h-32 flex items-center justify-center mb-3">
                <span className="text-amber-800 font-serif">Ritual Image</span>
              </div>
              
              <div className="flex text-sm">
                <span className="text-gray-500 mr-4">125 likes</span>
                <span className="text-gray-500 mr-4">34 comments</span>
                <a href="#" className="text-orange-500">View Live Stream</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Column */}
      <div className="space-y-6">
        {/* Live Darshan */}
        <div className="bg-amber-50 rounded-lg shadow-sm border border-amber-100 p-4">
          <h3 className="font-serif text-amber-900 mb-4">Live Darshans</h3>
          
          <div className="bg-amber-200/30 rounded-lg h-32 relative mb-4">
            <div className="absolute top-2 left-2 flex items-center">
              <div className="bg-orange-500 rounded-full w-3 h-3"></div>
              <span className="ml-2 text-xs font-medium text-gray-700">Tirupati Balaji</span>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="h-6 w-6 text-amber-800" />
            </div>
          </div>
          
          <ul className="space-y-2 text-sm">
            <li className="text-gray-700">• Vaishno Devi (Starting in 20 min)</li>
            <li className="text-gray-700">• Siddhivinayak (Starting at 6 PM)</li>
          </ul>
        </div>
        
        {/* My Bookings */}
        <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
          <h3 className="font-serif text-amber-900 mb-4">My Bookings</h3>
          
          <div className="space-y-3">
            <div className="bg-amber-50 rounded p-3 flex justify-between items-center">
              <div>
                <p className="text-gray-700 text-sm font-medium">Ganesh Abhishekam</p>
                <p className="text-gray-500 text-xs">Tomorrow, 10:30 AM • ISKCON</p>
              </div>
              <div className="bg-green-100 rounded-md p-1">
                <Check className="h-4 w-4 text-green-600" />
              </div>
            </div>
            
            <div className="bg-amber-50 rounded p-3 flex justify-between items-center">
              <div>
                <p className="text-gray-700 text-sm font-medium">VIP Darshan Pass</p>
                <p className="text-gray-500 text-xs">March 18, 4:00 PM • Tirupati</p>
              </div>
              <div className="bg-orange-100 rounded-md p-1">
                <Clock className="h-4 w-4 text-orange-500" />
              </div>
            </div>
          </div>
          
          <a href="#" className="text-orange-500 flex items-center mt-4 text-sm">
            View all bookings <ChevronRight className="h-4 w-4" />
          </a>
        </div>
        
        {/* Discover Temples */}
        <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
          <h3 className="font-serif text-amber-900 mb-4">Discover Temples</h3>
          
          <div className="space-y-3">
            {[
              { name: "Somnath Temple", location: "Gujarat", followers: "5K+" },
              { name: "Golden Temple", location: "Punjab", followers: "12K+" },
              { name: "Badrinath Temple", location: "Uttarakhand", followers: "8K+" }
            ].map((temple, idx) => (
              <div key={idx} className="bg-amber-50 rounded p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-amber-300/60 rounded-full w-8 h-8"></div>
                  <div className="ml-3">
                    <p className="text-gray-700 text-sm font-medium">{temple.name}</p>
                    <p className="text-gray-500 text-xs">{temple.location} • {temple.followers} followers</p>
                  </div>
                </div>
                <button className="text-orange-500 font-medium">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          
          <a href="#" className="text-orange-500 flex items-center mt-4 text-sm">
            Explore more temples <ChevronRight className="h-4 w-4" />
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
  );
};

export default Home;
