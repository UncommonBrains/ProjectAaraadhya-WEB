import React, { useState } from "react";
import {
  Bell,
  Search,
  ChevronRight,
  Calendar,
  Plus,
  Star,
  Filter,
  Map,
  Clock,
  Settings,
  Info,
  Heart,
} from "lucide-react";

import Header from "../components/header.js"; // Place this at the top


const MyTemples = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="bg-amber-50 min-h-screen font-sans">
      < Header />
      

      {/* Main Content */}
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <div className="flex items-center">
              <div className="bg-amber-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-medium">
                R
              </div>
              <div className="ml-3">
                <h3 className="font-serif text-amber-900">Rahul</h3>
                <p className="text-gray-600 text-xs">Active Devotee</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-amber-50 rounded p-2">
                <p className="text-amber-900 font-medium text-sm">12</p>
                <p className="text-gray-600">Temples</p>
              </div>
              <div className="bg-amber-50 rounded p-2">
                <p className="text-amber-900 font-medium text-sm">28</p>
                <p className="text-gray-600">Poojas</p>
              </div>
              <div className="bg-amber-50 rounded p-2">
                <p className="text-amber-900 font-medium text-sm">6</p>
                <p className="text-gray-600">Donations</p>
              </div>
            </div>
          </div>

          {/* Temple Categories */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <h3 className="font-serif text-amber-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              {[
                { name: "All Temples", count: 12 },
                { name: "Favorites", count: 4 },
                { name: "Recently Visited", count: 3 },
                { name: "North India", count: 5 },
                { name: "South India", count: 7 },
              ].map((category, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-between p-2 rounded ${
                    index === 0
                      ? "bg-amber-100 text-amber-900"
                      : "hover:bg-amber-50"
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="bg-white text-amber-700 text-xs rounded-full px-2 py-0.5">
                    {category.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <h3 className="font-serif text-amber-900 mb-4">
              Upcoming Temple Events
            </h3>
            <div className="space-y-3">
              <div className="bg-amber-50 rounded p-3 flex">
                <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500 font-medium">
                  13
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 text-sm font-medium">
                    Ganesh Chaturthi
                  </p>
                  <p className="text-gray-500 text-xs">ISKCON Temple</p>
                </div>
              </div>
              <div className="bg-amber-50 rounded p-3 flex">
                <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500 font-medium">
                  15
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 text-sm font-medium">
                    Navaratri Celebrations
                  </p>
                  <p className="text-gray-500 text-xs">Meenakshi Temple</p>
                </div>
              </div>
            </div>
            <a
              href="#"
              className="text-orange-500 flex items-center mt-4 text-sm"
            >
              View all events <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Center & Right Columns (Temple Content) - Takes 3 columns in the 4-column grid */}
        <div className="md:col-span-3 space-y-6">
          {/* Page Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-serif text-amber-900">My Temples</h2>
              <p className="text-gray-600 text-sm">
                Your spiritual journey across 12 temples
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-white border border-amber-200 p-2 rounded text-gray-600">
                <Filter className="h-4 w-4" />
              </button>
              <button className="bg-white border border-amber-200 p-2 rounded text-gray-600">
                <Map className="h-4 w-4" />
              </button>
              <button className="bg-orange-500 text-white px-4 py-1 rounded flex items-center space-x-1">
                <Plus className="h-4 w-4" />
                <span>Add Temple</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap space-x-3 mb-6 text-sm">
            {["All", "North Indian", "South Indian", "Vishnu", "Shiva", "Shakti", "Favorites"].map(
              (filter) => (
                <button
                  key={filter}
                  className={`${
                    activeFilter === filter
                      ? "bg-orange-500 text-white"
                      : "bg-amber-50 text-gray-600"
                  } px-4 py-1 rounded-full mb-2`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              )
            )}
          </div>

          {/* Temple Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* ISKCON Temple */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden">
              <div className="bg-amber-200/30 h-32 relative">
                <div className="absolute top-2 right-2">
                  <span className="bg-amber-100/80 rounded-full p-1">
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/70 to-transparent p-3">
                  <h3 className="text-white font-medium">ISKCON Temple</h3>
                  <p className="text-amber-50 text-xs">New Delhi, India</p>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Open: 5:00 AM - 9:00 PM</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-200 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">(124)</span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    Last visit: 2 days ago
                  </span>
                </div>
                <div className="flex justify-between">
                  <button className="text-amber-900 bg-amber-100 text-xs px-3 py-1 rounded">
                    Virtual Darshan
                  </button>
                  <button className="text-orange-500 bg-orange-100 text-xs px-3 py-1 rounded">
                    Book Pooja
                  </button>
                </div>
              </div>
            </div>

            {/* Meenakshi Temple */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden">
              <div className="bg-amber-200/30 h-32 relative">
                <div className="absolute top-2 right-2">
                  <span className="bg-amber-100/80 rounded-full p-1">
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/70 to-transparent p-3">
                  <h3 className="text-white font-medium">Meenakshi Temple</h3>
                  <p className="text-amber-50 text-xs">Madurai, Tamil Nadu</p>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Open: 5:00 AM - 10:00 PM</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">(203)</span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    Last visit: 1 week ago
                  </span>
                </div>
                <div className="flex justify-between">
                  <button className="text-amber-900 bg-amber-100 text-xs px-3 py-1 rounded">
                    Virtual Darshan
                  </button>
                  <button className="text-orange-500 bg-orange-100 text-xs px-3 py-1 rounded">
                    Book Pooja
                  </button>
                </div>
              </div>
            </div>

            {/* Kashi Vishwanath */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden">
              <div className="bg-amber-200/30 h-32 relative">
                <div className="absolute top-2 right-2">
                  <span className="bg-amber-100/80 rounded-full p-1">
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/70 to-transparent p-3">
                  <h3 className="text-white font-medium">Kashi Vishwanath</h3>
                  <p className="text-amber-50 text-xs">Varanasi, Uttar Pradesh</p>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Open: 3:00 AM - 11:00 PM</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-200 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">(156)</span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    Last visit: 3 days ago
                  </span>
                </div>
                <div className="flex justify-between">
                  <button className="text-amber-900 bg-amber-100 text-xs px-3 py-1 rounded">
                    Virtual Darshan
                  </button>
                  <button className="text-orange-500 bg-orange-100 text-xs px-3 py-1 rounded">
                    Book Pooja
                  </button>
                </div>
              </div>
            </div>

            {/* Tirupati Balaji */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden">
              <div className="bg-amber-200/30 h-32 relative">
                <div className="absolute top-2 right-2">
                  <span className="bg-amber-100/80 rounded-full p-1">
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/70 to-transparent p-3">
                  <h3 className="text-white font-medium">Tirupati Balaji</h3>
                  <p className="text-amber-50 text-xs">Tirupati, Andhra Pradesh</p>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Open: 3:00 AM - 10:00 PM</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">(297)</span>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                    Upcoming visit: Mar 18
                  </span>
                </div>
                <div className="flex justify-between">
                  <button className="text-amber-900 bg-amber-100 text-xs px-3 py-1 rounded">
                    Virtual Darshan
                  </button>
                  <button className="text-orange-500 bg-orange-100 text-xs px-3 py-1 rounded">
                    Book Pooja
                  </button>
                </div>
              </div>
            </div>

            {/* Somnath Temple */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden">
              <div className="bg-amber-200/30 h-32 relative">
                <div className="absolute top-2 right-2">
                  <span className="bg-amber-100/80 rounded-full p-1">
                    <Heart className="h-4 w-4 text-gray-400" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/70 to-transparent p-3">
                  <h3 className="text-white font-medium">Somnath Temple</h3>
                  <p className="text-amber-50 text-xs">Somnath, Gujarat</p>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Open: 6:00 AM - 9:00 PM</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-200 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">(98)</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    Last visit: 2 months ago
                  </span>
                </div>
                <div className="flex justify-between">
                  <button className="text-amber-900 bg-amber-100 text-xs px-3 py-1 rounded">
                    Virtual Darshan
                  </button>
                  <button className="text-orange-500 bg-orange-100 text-xs px-3 py-1 rounded">
                    Book Pooja
                  </button>
                </div>
              </div>
            </div>

            {/* Golden Temple */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden">
              <div className="bg-amber-200/30 h-32 relative">
                <div className="absolute top-2 right-2">
                  <span className="bg-amber-100/80 rounded-full p-1">
                    <Heart className="h-4 w-4 text-gray-400" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/70 to-transparent p-3">
                  <h3 className="text-white font-medium">Golden Temple</h3>
                  <p className="text-amber-50 text-xs">Amritsar, Punjab</p>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Open: 24 hours</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">(248)</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    Last visit: 1 month ago
                  </span>
                </div>
                <div className="flex justify-between">
                  <button className="text-amber-900 bg-amber-100 text-xs px-3 py-1 rounded">
                    Virtual Darshan
                  </button>
                  <button className="text-orange-500 bg-orange-100 text-xs px-3 py-1 rounded">
                    Book Pooja
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-900 font-medium">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-amber-50">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-amber-50">
                3
              </button>
              <span className="w-8 h-8 flex items-center justify-center">
                ...
              </span>
            </div>
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

export default MyTemples;