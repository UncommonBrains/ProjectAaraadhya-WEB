import React, { useState, useRef, useEffect } from "react";
import {
  Star,
  Filter,
  Map,
  Clock,
  MapPin,
  ArrowUpDown,
  Camera,
  X,
  Heart,
} from "lucide-react";

import temples from "../datas/temples"; // Adjust path if needed
import SearchBar from "../components/searchBar";
import ActionButton from "../components/ActionButton";
import { useAuth } from "../contexts/authContext/";




const ExploreTemples = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSortBy, setActiveSortBy] = useState("Popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      // If the sidebar is open and the click is outside the sidebar element
      if (
        mobileFiltersOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setMobileFiltersOpen(false);
      }
    }

    // Add event listener when the sidebar is open
    if (mobileFiltersOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileFiltersOpen]);

  // Filter temples based on active filter
  const filteredTemples =
    activeFilter === "All"
      ? temples
      : temples.filter(
          (temple) =>
            temple.region === activeFilter ||
            temple.category === activeFilter ||
            (activeFilter === "Favorites" && temple.favorite)
        );

  // Get sorted temples based on active sort
  const getSortedTemples = () => {
    switch (activeSortBy) {
      case "Popular":
        return [...filteredTemples].sort((a, b) => b.rating - a.rating);
      case "Distance":
        return [...filteredTemples].sort(
          (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
        );
      case "Rating":
        return [...filteredTemples].sort((a, b) => b.rating - a.rating);
      default:
        return filteredTemples;
    }
  };

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  // Render stars based on rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-3 w-3 text-amber-500 fill-current" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="h-3 w-3 text-amber-300 fill-current" />
        );
      } else {
        stars.push(
          <Star key={i} className="h-3 w-3 text-amber-200 fill-current" />
        );
      }
    }

    return stars;
  };

  const { userData } = useAuth();
  const firstName = userData.displayName?.split(" ")[0];



  return (
    <div className="bg-amber-50 min-h-screen font-sans">
      <SearchBar />

      {/* Main Content */}
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {/* Left Column - Filters - Hidden on mobile by default */}

        <div
          className={`${
            mobileFiltersOpen
              ? "fixed inset-0 bg-amber-900/70 z-40 md:static md:bg-transparent md:z-auto"
              : "hidden md:!block"
          }`}
          onClick={(e) => {
            // Close sidebar if clicking on the overlay (not the sidebar itself)
            if (e.target === e.currentTarget) {
              setMobileFiltersOpen(false);
            }
          }}
        >
          <div
            ref={sidebarRef}
            className={`${
              mobileFiltersOpen
                ? "absolute right-0 top-0 h-full w-4/5 max-w-sm overflow-y-auto bg-amber-50 p-4 shadow-xl transition-all transform"
                : "space-y-6"
            }`}
          >
            {mobileFiltersOpen && (
              <div className="flex justify-between items-center mb-4 sticky top-0 bg-amber-50 p-2 border-b border-amber-200">
                <h3 className="font-serif text-amber-900">Filters</h3>
                <button
                  onClick={toggleMobileFilters}
                  className="text-amber-900 p-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Welcome Section */}
            <div className="hidden md:!block">
              <h2 className="  text-xl font-serif text-amber-900">
                Namaste, {firstName}!
              </h2>
              <p className="text-gray-600 text-sm">
                Wishing you spiritual blessings today
              </p>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-amber-900">Filters</h3>
                <button className="text-xs text-orange-500">Reset All</button>
              </div>

              {/* Region Filter */}
              <div className="mb-4">
                <h4 className="text-gray-700 font-medium text-sm mb-2">
                  Region
                </h4>
                <div className="space-y-1">
                  {[
                    "North Indian",
                    "South Indian",
                    "East Indian",
                    "West Indian",
                  ].map((region) => (
                    <div key={region} className="flex items-center">
                      <input
                        type="checkbox"
                        id={region}
                        className="w-4 h-4 accent-orange-500"
                      />
                      <label
                        htmlFor={region}
                        className="ml-2 text-sm text-gray-600"
                      >
                        {region}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deity Filter */}
              <div className="mb-4">
                <h4 className="text-gray-700 font-medium text-sm mb-2">
                  Deity
                </h4>
                <div className="space-y-1">
                  {["Vishnu", "Shiva", "Shakti", "Ganesh", "Hanuman"].map(
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

              {/* Amenities Filter */}
              <div className="mb-4">
                <h4 className="text-gray-700 font-medium text-sm mb-2">
                  Amenities
                </h4>
                <div className="space-y-1">
                  {["Parking", "Food", "Accommodation", "Guides"].map(
                    (amenity) => (
                      <div key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          id={amenity}
                          className="w-4 h-4 accent-orange-500"
                        />
                        <label
                          htmlFor={amenity}
                          className="ml-2 text-sm text-gray-600"
                        >
                          {amenity}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Distance Slider */}
              <div>
                <h4 className="text-gray-700 font-medium text-sm mb-2">
                  Distance
                </h4>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0 km</span>
                  <span>500 km</span>
                  <span>1000+ km</span>
                </div>
              </div>

              {mobileFiltersOpen && (
                <button
                  onClick={toggleMobileFilters}
                  className="w-full mt-4 bg-orange-500 text-white rounded-lg py-2 text-sm font-medium"
                >
                  Apply Filters
                </button>
              )}
            </div>

            {/* Featured Temples */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 hidden md:!block">
              <h3 className="font-serif text-amber-900 mb-3">
                Featured Temples
              </h3>
              <div className="space-y-3">
                {temples
                  .filter((temple) => temple.featured)
                  .slice(0, 3)
                  .map((temple) => (
                    <div
                      key={temple.id}
                      className="flex items-center p-2 bg-amber-50 rounded"
                    >
                      <div className="bg-amber-200/50 w-10 h-10 rounded flex items-center justify-center text-orange-500">
                        <Star className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-amber-900">
                          {temple.name}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {temple.location}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* Map Preview */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 mb-6 hidden md:!block">
              <h3 className="font-serif text-amber-900 mb-3">
                Temple Locations
              </h3>
              <div className="bg-amber-100 h-48 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-200/30"></div>
                <MapPin className="h-8 w-8 text-orange-500" />
              </div>
              <button className="w-full mt-3 bg-amber-100 text-amber-900 rounded px-4 py-2 text-sm font-medium flex items-center justify-center">
                <Map className="h-4 w-4 mr-2" />
                View Larger Map
              </button>
            </div>
          </div>
        </div>

        {/* Center & Right Columns (Temple Content) */}
        <div className="md:col-span-3 space-y-3">
          {/* Page Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-serif text-amber-900">
                Explore Temples
              </h2>
              <p className="text-gray-600 text-sm">
                Discover sacred places across India
              </p>
            </div>
            <div className="flex space-x-3">
              {/* Filter button - Visible only on small screens */}
              <button
                className="bg-white border border-amber-200 p-2 rounded text-gray-600 md:hidden"
                onClick={toggleMobileFilters}
              >
                <Filter className="h-4 w-4" />
              </button>
              <button className="bg-white border border-amber-200 p-2 rounded text-gray-600">
                <Map className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Category Filters - Touch scroll with no visible scrollbar */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex space-x-3 mb-2 text-sm whitespace-nowrap touch-pan-x">
              {["All", "Favorites", "Vishnu", "Shiva", "Shakti"].map(
                (filter) => (
                  <button
                    key={filter}
                    className={`${
                      activeFilter === filter
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-600 hover:bg-amber-100"
                    } px-4 py-2 rounded-full flex-shrink-0 transition-colors`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Sort Options and Results Count */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">{filteredTemples.length}</span>{" "}
              temples
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <div className="relative">
                <select
                  className="bg-white border border-amber-200 text-gray-700 text-sm rounded-lg p-2 pr-8 appearance-none"
                  value={activeSortBy}
                  onChange={(e) => setActiveSortBy(e.target.value)}
                >
                  <option value="Popular">Popular</option>
                  <option value="Distance">Distance</option>
                  <option value="Rating">Rating</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Temple Cards - Grid Layout */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getSortedTemples().map((temple) => (
              <div
                key={temple.id}
                className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden"
              >
                  <div
                    className="h-40 relative bg-cover bg-center"
                    style={{ backgroundImage: "url('/temple-images/2.jpg')" }}
                  >
                    {temple.specialEvent && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                          Special Event
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      {!temple.favorite ? (
                        <button className=" text-white px-4 py-1 rounded flex items-center space-x-1">
                          <Heart className=" text-red-500 h-4 w-4 fill-current" />
                        </button>
                      ) : (
                        <button className="text-gray-400 text-white px-4 py-1 rounded flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-950/100 to-transparent p-3">
                      <h3 className="text-white font-medium">{temple.name}</h3>
                      <p className="text-amber-50 text-xs">{temple.location}</p>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="flex justify-between items-center ">
                      <div className="flex items-center text-xs text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Morning: {temple.morhours}</span>
                      </div>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        {temple.category}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Evening: {temple.evehours}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        {renderRating(temple.rating)}
                        <span className="text-xs text-gray-600 ml-1">
                          ({temple.reviews})
                        </span>
                      </div>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                        {temple.distance}
                      </span>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {temple.amenities &&
                        temple.amenities.slice(0, 3).map((amenity, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                          >
                            {amenity}
                          </span>
                        ))}
                      {temple.amenities && temple.amenities.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          +{temple.amenities.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <a
                        href={`/temple/${temple.id}`}
                        className="text-amber-900 bg-amber-100 text-xs px-3 py-1 rounded flex items-center"
                      >
                        <Camera className="h-3 w-3 mr-1" />
                        Virtual Tour
                      </a>
                      <a
                        href={`/temple/${temple.id}`}
                        className="text-orange-500 bg-orange-100 text-xs px-3 py-1 rounded"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-6">
            <button className="bg-white border border-amber-200 text-amber-900 px-6 py-2 rounded-lg text-sm font-medium hover:bg-amber-50">
              Load More Temples
            </button>
          </div>
        </div>
      </main>

      {/* Floating Action Button - Adjusted position for mobile */}
      <ActionButton />
    </div>
  );
};

export default ExploreTemples;
