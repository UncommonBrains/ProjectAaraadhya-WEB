import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import SearchInputField from '../../../components/common/Input/SearchInputField';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';
import { recommendedPoojas } from '../../../mock/data/poojas';
import { usePoojasViewModel } from '../../../view-models/pooja/usePoojasViewModel';

const UpcomingPoojas = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSortBy, setActiveSortBy] = useState('Date');
  const [showMyPoojas, setShowMyPoojas] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { poojas } = usePoojasViewModel();

  useEffect(() => {
    console.log('Pooja ViewModel Data:', poojas);
  }, [poojas]);

  // Filter poojas based on active filter
  const filteredMyPoojas =
    activeFilter === 'All' ? poojas : poojas.filter((pooja) => pooja.deityName === activeFilter);

  const filteredRecommendedPoojas =
    activeFilter === 'All'
      ? recommendedPoojas
      : recommendedPoojas.filter((pooja) => pooja.deity === activeFilter);

  // Get sorted poojas based on active sort
  const getSortedMyPoojas = () => {
    switch (activeSortBy) {
      
      case 'Price':
        return [...filteredMyPoojas].sort(
          (a, b) =>
            parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')),
        );
      default:
        return filteredMyPoojas;
    }
  };

  const getSortedRecommendedPoojas = () => {
    switch (activeSortBy) {
      case 'Date':
        return [...filteredRecommendedPoojas].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
      case 'Popular':
        return [...filteredRecommendedPoojas].sort((a, b) =>
          b.isPopular === a.isPopular ? 0 : b.isPopular ? 1 : -1,
        );
      case 'Price':
        return [...filteredRecommendedPoojas].sort(
          (a, b) =>
            parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')),
        );
      case 'Distance':
        return [...filteredRecommendedPoojas].sort(
          (a, b) => parseInt(a.distance ?? '0') - parseInt(b.distance ?? '0'),
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
    <div className="min-h-screen bg-amber-50 font-sans ">
      <SearchInputField />

      {/* Main Content */}
      <main className="relative container mx-auto grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
        {/* Left Column - Desktop Filter Sidebar */}
        <div className="hidden space-y-6 md:!block">
          {/* Profile Section */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-600 font-medium text-white">
                R
              </div>
              <div className="ml-3">
                <h3 className="font-serif text-amber-900">Rahul</h3>
                <p className="text-xs text-gray-600">Active Devotee</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded bg-amber-50 p-2">
                <p className="text-sm font-medium text-amber-900">12</p>
                <p className="text-gray-600">Temples</p>
              </div>
              <div className="rounded bg-amber-50 p-2">
                <p className="text-sm font-medium text-amber-900">28</p>
                <p className="text-gray-600">Poojas</p>
              </div>
              <div className="rounded bg-amber-50 p-2">
                <p className="text-sm font-medium text-amber-900">6</p>
                <p className="text-gray-600">Donations</p>
              </div>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-amber-900">Calendar</h3>
              <CalendarDays className="h-5 w-5 text-amber-800" />
            </div>
            <div className="rounded-lg bg-amber-50 p-3">
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-600">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i}
                    className={`flex aspect-square w-full items-center justify-center rounded-full text-xs ${i + 1 === 21 ? 'bg-orange-500 text-white' : ''} ${
                      i + 1 === 23 || i + 1 === 25 || i + 1 === 28
                        ? 'bg-amber-200 text-amber-900'
                        : 'text-gray-600'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center text-xs">
                  <div className="mr-2 h-3 w-3 rounded-full bg-orange-500"></div>
                  <span className="text-gray-700">Today</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="mr-2 h-3 w-3 rounded-full bg-amber-200"></div>
                  <span className="text-gray-700">Booked Poojas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-amber-900">Filter Poojas</h3>
              <ListFilter className="h-5 w-5 text-amber-800" />
            </div>

            {/* Deity Filter */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700">Deity</h4>
              <div className="space-y-1">
                {['Vishnu', 'Shiva', 'Shakti', 'Ganesh', 'Murugan'].map((deity) => (
                  <div key={deity} className="flex items-center">
                    <input type="checkbox" id={deity} className="h-4 w-4 accent-orange-500" />
                    <label htmlFor={deity} className="ml-2 text-sm text-gray-600">
                      {deity}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-medium text-gray-700">Price Range</h4>
              <input type="range" min="100" max="2000" className="w-full accent-orange-500" />
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>₹100</span>
                <span>₹1000</span>
                <span>₹2000+</span>
              </div>
            </div>

            {/* Date Range */}
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-medium text-gray-700">Date Range</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">From</label>
                  <input
                    type="date"
                    className="w-full rounded border border-amber-100 p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">To</label>
                  <input
                    type="date"
                    className="w-full rounded border border-amber-100 p-2 text-xs"
                  />
                </div>
              </div>
            </div>

            <button className="mt-4 w-full rounded-lg bg-orange-500 py-2 text-sm font-medium text-white">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Mobile Filter Sidebar - conditionally rendered */}
        {showMobileFilter && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex bg-black md:hidden">
            <div className="animate-slide-in h-full w-4/5 overflow-y-auto bg-amber-50">
              <div className="p-4">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-serif text-lg text-amber-900">Filters</h2>
                  <button onClick={toggleMobileFilter} className="rounded-full bg-amber-100 p-1">
                    <X className="h-5 w-5 text-amber-800" />
                  </button>
                </div>
                {/* Filter Section */}
                <div className="mb-4 rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-serif text-amber-900">Filter Poojas</h3>
                    <ListFilter className="h-5 w-5 text-amber-800" />
                  </div>

                  {/* Deity Filter */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Deity</h4>
                    <div className="space-y-1">
                      {['Vishnu', 'Shiva', 'Shakti', 'Ganesh', 'Murugan'].map((deity) => (
                        <div key={deity} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`mobile-${deity}`}
                            className="h-4 w-4 accent-orange-500"
                          />
                          <label htmlFor={`mobile-${deity}`} className="ml-2 text-sm text-gray-600">
                            {deity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deity Filter */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Purpose</h4>
                    <div className="space-y-1">
                      {['Marriage', 'Fertility', 'Education', 'Wealth', 'Health', 'Ancestral'].map(
                        (deity) => (
                          <div key={deity} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`mobile-${deity}`}
                              className="h-4 w-4 accent-orange-500"
                            />
                            <label
                              htmlFor={`mobile-${deity}`}
                              className="ml-2 text-sm text-gray-600"
                            >
                              {deity}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-medium text-gray-700">Price Range</h4>
                    <input type="range" min="100" max="2000" className="w-full accent-orange-500" />
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>₹100</span>
                      <span>₹1000</span>
                      <span>₹2000+</span>
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-medium text-gray-700">Date Range</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500">From</label>
                        <input
                          type="date"
                          className="w-full rounded border border-amber-100 p-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">To</label>
                        <input
                          type="date"
                          className="w-full rounded border border-amber-100 p-2 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      className="flex-1 rounded-lg bg-gray-200 py-2 text-sm font-medium text-gray-700"
                      onClick={toggleMobileFilter}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex-1 rounded-lg bg-orange-500 py-2 text-sm font-medium text-white"
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
        <div className="space-y-6 md:col-span-3">
          {/* Filters */}
          <div className="no-scrollbar flex space-x-3 overflow-x-auto pb-2">
            {['All', 'Vishnu', 'Shiva', 'Krishna', 'Devi', 'Ganapathy', 'Durga'].map((filter) => (
              <button
                key={filter}
                className={`${
                  activeFilter === filter ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'
                } rounded-full px-6 py-3 text-sm font-medium whitespace-nowrap shadow-sm`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          {/* Sort Options */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing{' '}
              <span className="font-medium">
                {filteredMyPoojas.length + filteredRecommendedPoojas.length}
              </span>{' '}
              poojas
            </p>

            <div className="flex space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <div className="relative">
                  <select
                    className="appearance-none rounded-lg border border-amber-200 bg-white p-2 pr-8 text-sm text-gray-700"
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
                className="rounded border border-amber-200 bg-white p-2 text-gray-600 md:hidden"
                onClick={toggleMobileFilter}
              >
                <Filter className="h-4 w-4" />
              </button>

              <button className="rounded border border-amber-200 bg-white p-2 text-gray-600">
                <Calendar className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* My Booked Poojas Section with Toggle Button */}
          <div className="mb-8 overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm">
            {/* Toggle Header */}
            <div
              className="flex cursor-pointer items-center justify-between bg-amber-50/50 p-4"
              onClick={toggleMyPoojas}
            >
              <h3 className="flex items-center font-serif text-lg text-amber-900">
                My Booked Poojas
                <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                  {filteredMyPoojas.length}
                </span>
              </h3>
              <button className="rounded-full p-1 text-amber-900 transition-colors duration-200 hover:bg-amber-100">
                {showMyPoojas ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Collapsible Content */}
            {showMyPoojas && (
              <div className="xm:grid-cols-1 grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-2">
                {getSortedMyPoojas().map((pooja) => (
                  <div
                    key={pooja.id}
                    className="overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm"
                  >
                    <div className="border-l-4 border-orange-500 p-4">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-amber-900">{pooja.poojaDetails.name}</h4>
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                          Booked
                        </span>
                      </div>

                      <div className="mt-2">
                        <p className="mb-1 text-sm text-gray-600">{pooja.templeDetails?.basicDetails?.templeName}</p>
                        <p className="text-xs text-gray-500">{pooja.location}</p>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="rounded bg-amber-50 p-2">
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm text-amber-900">{pooja.date}</p>
                        </div>
                        <div className="rounded bg-amber-50 p-2">
                          <p className="text-xs text-gray-500">Time</p>
                          <p className="text-sm text-amber-900">{pooja.time}</p>
                        </div>
                        <div className="rounded bg-amber-50 p-2">
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="text-sm text-amber-900">{pooja.price}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                          {pooja.deity}
                        </span>
                        <div className="flex space-x-2">
                          <button className="rounded bg-gray-100 px-3 py-1 text-xs text-gray-600">
                            Modify
                          </button>
                          <button className="rounded bg-orange-100 px-3 py-1 text-xs text-orange-500">
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
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-amber-900">Upcoming Poojas</h3>

              <a href="/" className="flex items-center text-sm text-orange-500">
                View All <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mb-6 text-sm text-gray-600">
              Your spiritual schedule and recommended ceremonies
            </p>
            <div className="xm:grid-cols-1 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {getSortedRecommendedPoojas().map((pooja) => (
                <div
                  key={pooja.id}
                  className="overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm"
                >
                  <div className="relative h-24 bg-amber-200/30">
                    {pooja.isPopular && (
                      <div className="absolute top-2 left-2">
                        <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
                          Popular
                        </span>
                      </div>
                    )}
                    <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-amber-900/70 to-transparent p-3">
                      <h4 className="font-medium text-white">{pooja.name}</h4>
                      <p className="text-xs text-amber-50">{pooja.temple}</p>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-600">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{pooja.time}</span>
                      </div>
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                        {pooja.deity}
                      </span>
                    </div>

                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-600">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>{pooja.date}</span>
                      </div>
                      <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                        {pooja.distance}
                      </span>
                    </div>

                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        <span className="font-medium">{pooja.slots}</span> slots available
                      </span>
                      <span className="text-sm font-medium text-amber-900">{pooja.price}</span>
                    </div>

                    <div className="flex justify-between">
                      <button className="flex items-center rounded bg-gray-100 px-3 py-1 text-xs text-gray-600">
                        <Info className="mr-1 h-3 w-3" />
                        Details
                      </button>
                      <button className="rounded bg-orange-500 px-3 py-1 text-xs text-white">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Special Upcoming Festival Poojas */}
          <div className="mt-8 rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-lg text-amber-900">Special Festival Poojas</h3>
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs text-white">
                Limited Bookings
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              <div className="rounded-lg bg-white/80 p-4 backdrop-blur-sm">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-amber-900">Holika Dahan Special Pooja</h4>
                    <p className="text-sm text-gray-600">Mathura Krishna Temple</p>
                    <div className="mt-2 flex items-center text-xs text-gray-600">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>Mar 24, 2025 • 6:00 PM</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                      <div className="font-medium text-orange-500">
                        <span className="text-xl">₹</span>
                        <span className="text-lg">1,116</span>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Only 5 slots left</p>
                  </div>
                </div>
                <button className="mt-3 w-full rounded bg-orange-500 py-2 text-sm text-white">
                  Book Now
                </button>
              </div>

              <div className="rounded-lg bg-white/80 p-4 backdrop-blur-sm">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-amber-900">Vishu Special Pooja</h4>
                    <p className="text-sm text-gray-600">Guruvayoor</p>
                    <div className="mt-2 flex items-center text-xs text-gray-600">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>Mar 29, 2025 • 7:30 PM</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                      <div className="font-medium text-orange-500">
                        <span className="text-xl">₹</span>
                        <span className="text-lg">501</span>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">12 slots available</p>
                  </div>
                </div>
                <button className="mt-3 w-full rounded bg-orange-500 py-2 text-sm text-white">
                  Book Now
                </button>
              </div>
            </div>
          </div>{' '}
        </div>
      </main>

      {/* Floating Action Button - Adjusted position for mobile */}
      <FloatingActionButton />
    </div>
  );
};

export default UpcomingPoojas;
