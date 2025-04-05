import React, { useState } from "react";
import { ChevronRight, Filter, Map, Clock, Check } from "lucide-react";
import SearchBar from "../components/searchBar";
import TempleGrid from "../components/myTemplesData";
import { Link } from "react-router-dom";
import ActionButton from "../components/ActionButton";

const MyTemples = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="bg-amber-50 min-h-screen font-sans">
      <SearchBar />

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
              href="/"
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
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap space-x-3 mb-6 text-sm">
            {[
              "All",
              "North Indian",
              "South Indian",
              "Vishnu",
              "Shiva",
              "Shakti",
              "Favorites",
            ].map((filter) => (
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
            ))}
          </div>

          <TempleGrid />

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

      {/* Floating Action Button - Adjusted position for mobile */}
      <ActionButton />
    </div>
  );
};

export default MyTemples;
