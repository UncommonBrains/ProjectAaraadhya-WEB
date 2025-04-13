import React, { useState } from "react";
import {
  ChevronRight,
  Calendar,
  Filter,
  Clock,
  Info,
  ArrowUpDown,
  CalendarDays,
  ListFilter,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";

import SearchBar from "../components/searchBar";
import ActionButton from "../components/ActionButton";
import { useAuth } from "../contexts/authContext/";


const UpcomingPoojas = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSortBy, setActiveSortBy] = useState("Date");
  const [showMyPoojas, setShowMyPoojas] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { userData } = useAuth();
  const firstName = userData.displayName?.split(" ")[0];
  const firstLetter = userData.displayName?.charAt(0).toUpperCase();


  // Sample data for my temple poojas
  const myPoojas = [
    {
      id: 1,
      name: "Ganesh Chaturthi Special Pooja",
      temple: "ISKCON Temple",
      location: "New Delhi, India",
      date: "Mar 23, 2025",
      time: "9:00 AM - 11:00 AM",
      price: "₹501",
      slots: 15,
      isBooked: true,
      deity: "Ganesh",
      description:
        "Special pooja commemorating Lord Ganesh, remover of obstacles.",
      isPopular: true,
    },
    {
      id: 2,
      name: "Maha Abhishekam",
      temple: "Meenakshi Temple",
      location: "Madurai, Tamil Nadu",
      date: "Mar 25, 2025",
      time: "5:30 AM - 7:00 AM",
      price: "₹1,001",
      slots: 8,
      isBooked: true,
      deity: "Shakti",
      description:
        "Divine bathing ceremony for Goddess Meenakshi with sacred substances.",
      isPopular: true,
    },
    {
      id: 3,
      name: "Rudra Abhishek",
      temple: "Kashi Vishwanath",
      location: "Varanasi, Uttar Pradesh",
      date: "Mar 28, 2025",
      time: "4:00 AM - 6:00 AM",
      price: "₹1,100",
      slots: 10,
      isBooked: true,
      deity: "Shiva",
      description:
        "Sacred ritual honoring Lord Shiva with various holy offerings.",
      isPopular: false,
    },
    {
      id: 4,
      name: "Satyanarayana Pooja",
      temple: "Tirupati Balaji",
      location: "Tirupati, Andhra Pradesh",
      date: "Apr 2, 2025",
      time: "10:00 AM - 12:00 PM",
      price: "₹251",
      slots: 20,
      isBooked: true,
      deity: "Vishnu",
      description:
        "Auspicious ceremony to seek blessings for prosperity and well-being.",
      isPopular: false,
    },
    {
      id: 10,
      name: "Satyanarayana Pooja",
      temple: "Tirupati Balaji",
      location: "Tirupati, Andhra Pradesh",
      date: "Apr 2, 2025",
      time: "10:00 AM - 12:00 PM",
      price: "₹251",
      slots: 20,
      isBooked: true,
      deity: "Krishna",
      description:
        "Auspicious ceremony to seek blessings for prosperity and well-being.",
      isPopular: false,
    },
  ];

  // Sample data for recommended temple poojas
  const recommendedPoojas = [
    {
      id: 5,
      name: "Ram Navami Celebrations",
      temple: "Ayodhya Ram Mandir",
      location: "Ayodhya, Uttar Pradesh",
      date: "Mar 30, 2025",
      time: "6:00 AM - 10:00 PM",
      price: "₹1,116",
      slots: 50,
      isBooked: false,
      deity: "Vishnu",
      description:
        "Grand celebration of Lord Ram's birth with special archana and cultural events.",
      isPopular: true,
      distance: "450 km",
    },
    {
      id: 6,
      name: "Navarathri Special Archana",
      temple: "Chamundeshwari Temple",
      location: "Mysore, Karnataka",
      date: "Mar 31, 2025",
      time: "8:00 AM - 10:00 AM",
      price: "₹301",
      slots: 25,
      isBooked: false,
      deity: "Shakti",
      description:
        "Special offering to Goddess Chamundeshwari with flowers and devotional songs.",
      isPopular: true,
      distance: "280 km",
    },
    {
      id: 7,
      name: "Karthikeya Abhishekam",
      temple: "Palani Murugan Temple",
      location: "Palani, Tamil Nadu",
      date: "Apr 1, 2025",
      time: "6:30 AM - 8:00 AM",
      price: "₹501",
      slots: 15,
      isBooked: false,
      deity: "Murugan",
      description:
        "Sacred bathing ceremony for Lord Murugan with special mantras.",
      isPopular: false,
      distance: "320 km",
    },
    {
      id: 8,
      name: "Arati Ceremony",
      temple: "Jagannath Temple",
      location: "Puri, Odisha",
      date: "Apr 5, 2025",
      time: "7:00 PM - 8:00 PM",
      price: "₹201",
      slots: 30,
      isBooked: false,
      deity: "Vishnu",
      description: "Evening ritual with lamps and offerings to Lord Jagannath.",
      isPopular: false,
      distance: "580 km",
    },
    {
      id: 9,
      name: "Pradosham Special Pooja",
      temple: "Chidambaram Nataraja Temple",
      location: "Chidambaram, Tamil Nadu",
      date: "Apr 3, 2025",
      time: "5:00 PM - 6:30 PM",
      price: "₹401",
      slots: 20,
      isBooked: false,
      deity: "Shiva",
      description: "Auspicious evening ritual performed on the 13th lunar day.",
      isPopular: true,
      distance: "230 km",
    },
    {
      id: 11,
      name: "Satyanarayana Pooja",
      temple: "Tirupati Balaji",
      location: "Tirupati, Andhra Pradesh",
      date: "Apr 2, 2025",
      time: "10:00 AM - 12:00 PM",
      price: "₹251",
      slots: 20,
      isBooked: true,
      deity: "Ganapath",
      description:
        "Auspicious ceremony to seek blessings for prosperity and well-being.",
      isPopular: false,
    },
  ];

  // Filter poojas based on active filter
  const filteredMyPoojas =
    activeFilter === "All"
      ? myPoojas
      : myPoojas.filter((pooja) => pooja.deity === activeFilter);

  const filteredRecommendedPoojas =
    activeFilter === "All"
      ? recommendedPoojas
      : recommendedPoojas.filter((pooja) => pooja.deity === activeFilter);

  // Get sorted poojas based on active sort
  const getSortedMyPoojas = () => {
    switch (activeSortBy) {
      case "Date":
        return [...filteredMyPoojas].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      case "Popular":
        return [...filteredMyPoojas].sort((a, b) => b.isPopular - a.isPopular);
      case "Price":
        return [...filteredMyPoojas].sort(
          (a, b) =>
            parseInt(a.price.replace(/[^\d]/g, "")) -
            parseInt(b.price.replace(/[^\d]/g, ""))
        );
      default:
        return filteredMyPoojas;
    }
  };

  const getSortedRecommendedPoojas = () => {
    switch (activeSortBy) {
      case "Date":
        return [...filteredRecommendedPoojas].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      case "Popular":
        return [...filteredRecommendedPoojas].sort(
          (a, b) => b.isPopular - a.isPopular
        );
      case "Price":
        return [...filteredRecommendedPoojas].sort(
          (a, b) =>
            parseInt(a.price.replace(/[^\d]/g, "")) -
            parseInt(b.price.replace(/[^\d]/g, ""))
        );
      case "Distance":
        return [...filteredRecommendedPoojas].sort(
          (a, b) => parseInt(a.distance) - parseInt(b.distance)
        );
      default:
        return filteredRecommendedPoojas;
    }
  };

  // Toggle the visibility of My Booked Poojas section
  const toggleMyPoojas = () => {
    setShowMyPoojas(!showMyPoojas);
  };

  // Toggle mobile filter sidebar
  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };

  return (
    <div className="bg-amber-50 min-h-screen font-sans">
      <SearchBar />

      {/* Main Content */}
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {/* Left Column - Desktop Filter Sidebar */}
        <div className="space-y-6 hidden md:!block">
          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <div className="flex items-center">
              <div className="bg-amber-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-medium">
              {firstLetter}
              </div>
              <div className="ml-3">
                <h3 className="font-serif text-amber-900">{firstName}</h3>
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

          {/* Calendar Widget */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-amber-900">Calendar</h3>
              <CalendarDays className="h-5 w-5 text-amber-800" />
            </div>
            <div className="bg-amber-50 rounded-lg p-3">
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-600">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>
              <div className="grid grid-cols-7 gap-1 mt-2">
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-full aspect-square flex items-center justify-center text-xs rounded-full 
                    ${i + 1 === 21 ? "bg-orange-500 text-white" : ""} 
                    ${
                      i + 1 === 23 || i + 1 === 25 || i + 1 === 28
                        ? "bg-amber-200 text-amber-900"
                        : "text-gray-600"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  <span className="text-gray-700">Today</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 rounded-full bg-amber-200 mr-2"></div>
                  <span className="text-gray-700">Booked Poojas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-amber-900">Filter Poojas</h3>
              <ListFilter className="h-5 w-5 text-amber-800" />
            </div>

            {/* Deity Filter */}
            <div className="mb-4">
              <h4 className="text-gray-700 font-medium text-sm ">Deity</h4>
              <div className="space-y-1">
                {["Vishnu", "Shiva", "Shakti", "Ganesh", "Murugan"].map(
                  (deity) => (
                    <div key={deity} className="flex items-center">
                      <input
                        type="checkbox"
                        id={deity}
                        className="w-4 h-4 accent-orange-500"
                      />
                      <label
                        htmlFor={deity}
                        className="ml-2 text-sm text-gray-600"
                      >
                        {deity}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <h4 className="text-gray-700 font-medium text-sm mb-2">
                Price Range
              </h4>
              <input
                type="range"
                min="100"
                max="2000"
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹100</span>
                <span>₹1000</span>
                <span>₹2000+</span>
              </div>
            </div>

            {/* Date Range */}
            <div className="mb-4">
              <h4 className="text-gray-700 font-medium text-sm mb-2">
                Date Range
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">From</label>
                  <input
                    type="date"
                    className="w-full text-xs p-2 border border-amber-100 rounded"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">To</label>
                  <input
                    type="date"
                    className="w-full text-xs p-2 border border-amber-100 rounded"
                  />
                </div>
              </div>
            </div>

            <button className="w-full mt-4 bg-orange-500 text-white rounded-lg py-2 text-sm font-medium">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Mobile Filter Sidebar - conditionally rendered */}
        {showMobileFilter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden flex">
            <div className="bg-amber-50 w-4/5 h-full overflow-y-auto animate-slide-in">
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-lg text-amber-900">Filters</h2>
                  <button
                    onClick={toggleMobileFilter}
                    className="p-1 rounded-full bg-amber-100"
                  >
                    <X className="h-5 w-5 text-amber-800" />
                  </button>
                </div>
                {/* Filter Section */}
                <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-amber-900">Filter Poojas</h3>
                    <ListFilter className="h-5 w-5 text-amber-800" />
                  </div>

                  {/* Deity Filter */}
                  <div className="mb-4">
                    <h4 className="text-gray-700 font-medium text-sm ">
                      Deity
                    </h4>
                    <div className="space-y-1">
                      {["Vishnu", "Shiva", "Shakti", "Ganesh", "Murugan"].map(
                        (deity) => (
                          <div key={deity} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`mobile-${deity}`}
                              className="w-4 h-4 accent-orange-500"
                            />
                            <label
                              htmlFor={`mobile-${deity}`}
                              className="ml-2 text-sm text-gray-600"
                            >
                              {deity}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Deity Filter */}
                  <div className="mb-4">
                    <h4 className="text-gray-700 font-medium text-sm ">
                      Purpose
                    </h4>
                    <div className="space-y-1">
                      {[
                        "Marriage",
                        "Fertility",
                        "Education",
                        "Wealth",
                        "Health",
                        "Ancestral",
                      ].map((deity) => (
                        <div key={deity} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`mobile-${deity}`}
                            className="w-4 h-4 accent-orange-500"
                          />
                          <label
                            htmlFor={`mobile-${deity}`}
                            className="ml-2 text-sm text-gray-600"
                          >
                            {deity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-4">
                    <h4 className="text-gray-700 font-medium text-sm mb-2">
                      Price Range
                    </h4>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      className="w-full accent-orange-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹100</span>
                      <span>₹1000</span>
                      <span>₹2000+</span>
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="mb-4">
                    <h4 className="text-gray-700 font-medium text-sm mb-2">
                      Date Range
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500">From</label>
                        <input
                          type="date"
                          className="w-full text-xs p-2 border border-amber-100 rounded"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">To</label>
                        <input
                          type="date"
                          className="w-full text-xs p-2 border border-amber-100 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 text-sm font-medium"
                      onClick={toggleMobileFilter}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex-1 bg-orange-500 text-white rounded-lg py-2 text-sm font-medium"
                      onClick={toggleMobileFilter}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Close sidebar when clicking on the overlay */}
            <div className="flex-1" onClick={toggleMobileFilter}></div>
          </div>
        )}

        {/* Center & Right Columns (Pooja Content) */}
        <div className="md:col-span-3 space-y-6">
          {/* Filters */}
          <div className="flex overflow-x-auto pb-2 space-x-3  no-scrollbar">
            {["All", "Vishnu", "Shiva", "Krishna", "Devi", "Ganapathy"].map(
              (filter) => (
                <button
                  key={filter}
                  className={`${
                    activeFilter === filter
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-700"
                  } px-6 py-3 rounded-full whitespace-nowrap font-medium text-sm shadow-sm`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              )
            )}
          </div>
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {filteredMyPoojas.length + filteredRecommendedPoojas.length}
              </span>{" "}
              poojas
            </p>

            <div className="flex space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <div className="relative">
                  <select
                    className="bg-white border border-amber-200 text-gray-700 text-sm rounded-lg p-2 pr-8 appearance-none"
                    value={activeSortBy}
                    onChange={(e) => setActiveSortBy(e.target.value)}
                  >
                    <option value="Date">Date</option>
                    <option value="Popular">Popular</option>
                    <option value="Price">Price</option>
                    <option value="Distance">Distance</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <button
                className="bg-white border border-amber-200 p-2 rounded text-gray-600 md:hidden"
                onClick={toggleMobileFilter}
              >
                <Filter className="h-4 w-4" />
              </button>

              <button className="bg-white border border-amber-200 p-2 rounded text-gray-600">
                <Calendar className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* My Booked Poojas Section with Toggle Button */}
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden">
            {/* Toggle Header */}
            <div
              className="flex justify-between items-center p-4 cursor-pointer bg-amber-50/50"
              onClick={toggleMyPoojas}
            >
              <h3 className="text-lg font-serif text-amber-900 flex items-center">
                My Booked Poojas
                <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  {filteredMyPoojas.length}
                </span>
              </h3>
              <button className="text-amber-900 hover:bg-amber-100 p-1 rounded-full transition-colors duration-200">
                {showMyPoojas ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Collapsible Content */}
            {showMyPoojas && (
              <div className="p-4 grid xm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {getSortedMyPoojas().map((pooja) => (
                  <div
                    key={pooja.id}
                    className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden"
                  >
                    <div className="p-4 border-l-4 border-orange-500">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-amber-900">
                          {pooja.name}
                        </h4>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                          Booked
                        </span>
                      </div>

                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-1">
                          {pooja.temple}
                        </p>
                        <p className="text-xs text-gray-500">
                          {pooja.location}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div className="bg-amber-50 rounded p-2">
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm text-amber-900">{pooja.date}</p>
                        </div>
                        <div className="bg-amber-50 rounded p-2">
                          <p className="text-xs text-gray-500">Time</p>
                          <p className="text-sm text-amber-900">{pooja.time}</p>
                        </div>
                        <div className="bg-amber-50 rounded p-2">
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="text-sm text-amber-900">
                            {pooja.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          {pooja.deity}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-gray-600 bg-gray-100 text-xs px-3 py-1 rounded">
                            Modify
                          </button>
                          <button className="text-orange-500 bg-orange-100 text-xs px-3 py-1 rounded">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Upcoming Poojas Section */}
          <div>
            <div className="flex justify-between items-center ">
              <h3 className="text-xl font-serif text-amber-900">
                Upcoming Poojas
              </h3>

              <a href="/" className="text-orange-500 text-sm flex items-center">
                View All <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Your spiritual schedule and recommended ceremonies
            </p>
            <div className="grid xm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {getSortedRecommendedPoojas().map((pooja) => (
                <div
                  key={pooja.id}
                  className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden"
                >
                  <div className="bg-amber-200/30 h-24 relative">
                    {pooja.isPopular && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/70 to-transparent p-3">
                      <h4 className="text-white font-medium">{pooja.name}</h4>
                      <p className="text-amber-50 text-xs">{pooja.temple}</p>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{pooja.time}</span>
                      </div>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        {pooja.deity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{pooja.date}</span>
                      </div>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                        {pooja.distance}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-600">
                        <span className="font-medium">{pooja.slots}</span> slots
                        available
                      </span>
                      <span className="text-sm font-medium text-amber-900">
                        {pooja.price}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <button className="text-gray-600 bg-gray-100 text-xs px-3 py-1 rounded flex items-center">
                        <Info className="h-3 w-3 mr-1" />
                        Details
                      </button>
                      <button className="text-white bg-orange-500 text-xs px-3 py-1 rounded">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Special Upcoming Festival Poojas */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-4 mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-serif text-amber-900">
                Special Festival Poojas
              </h3>
              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                Limited Bookings
              </span>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-amber-900">
                      Holika Dahan Special Pooja
                    </h4>
                    <p className="text-sm text-gray-600">
                      Mathura Krishna Temple
                    </p>
                    <div className="mt-2 flex items-center text-xs text-gray-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Mar 24, 2025 • 6:00 PM</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <div className="text-orange-500 font-medium">
                        <span className="text-xl">₹</span>
                        <span className="text-lg">1,116</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Only 5 slots left
                    </p>
                  </div>
                </div>
                <button className="w-full mt-3 bg-orange-500 text-white rounded py-2 text-sm">
                  Book Now
                </button>
              </div>

              <div className="bg-white/80 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-amber-900">
                      Vishu Special Pooja
                    </h4>
                    <p className="text-sm text-gray-600">Guruvayoor</p>
                    <div className="mt-2 flex items-center text-xs text-gray-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Mar 29, 2025 • 7:30 PM</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <div className="text-orange-500 font-medium">
                        <span className="text-xl">₹</span>
                        <span className="text-lg">501</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      12 slots available
                    </p>
                  </div>
                </div>
                <button className="w-full mt-3 bg-orange-500 text-white rounded py-2 text-sm">
                  Book Now
                </button>
              </div>
            </div>
          </div>{" "}
        </div>
      </main>

      {/* Floating Action Button - Adjusted position for mobile */}
      <ActionButton />
    </div>
  );
};

export default UpcomingPoojas;
