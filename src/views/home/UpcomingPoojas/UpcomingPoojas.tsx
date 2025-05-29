import { useState, useEffect } from 'react';
import {
  ChevronRight,
  Calendar,
  Filter,
  Clock,
  Info,
  ArrowUpDown,
  ListFilter,
  X,
} from 'lucide-react';
import SearchInputField from '../../../components/common/Input/SearchInputField';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';
import { usePoojasViewModel } from '../../../view-models/pooja/usePoojasViewModel';
import { useSpecialPoojasViewModel } from '../../../view-models/pooja/useSpecialPoojasViewModel';

const UpcomingPoojas = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSortBy, setActiveSortBy] = useState('Price');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { poojas } = usePoojasViewModel();
  const { specialPoojas } = useSpecialPoojasViewModel();

  useEffect(() => {
    console.log('Pooja ViewModel Data:', poojas);
  }, [poojas]);
  useEffect(() => {
    console.log('specialPoojas ViewModel Data:', specialPoojas);
  }, [specialPoojas]);

  // Filter Normal poojas based on active filter
  const filteredNormalPoojas =
    activeFilter === 'All' ? poojas : poojas.filter((pooja) => pooja.deityName === activeFilter);

  // Get sorted normal poojas based on active sort
  const getSortedNormalPoojas = () => {
    switch (activeSortBy) {
      case 'Price':
        return [...filteredNormalPoojas].sort(
          (a, b) =>
            parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')),
        );
      default:
        return filteredNormalPoojas;
    }
  };
  // Filter Normal poojas based on active filter
  const filteredSpecialPoojas =
    activeFilter === 'All'
      ? specialPoojas
      : specialPoojas.filter((pooja) => pooja.deityName === activeFilter);

  // Get sorted normal poojas based on active sort
  const getSortedSpecialPoojas = () => {
    switch (activeSortBy) {
      case 'Price':
        return [...filteredSpecialPoojas].sort(
          (a, b) =>
            parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')),
        );
      default:
        return filteredSpecialPoojas;
    }
  };

  // Toggle mobile filter sidebar
  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      <SearchInputField />

      {/* Main Content */}
      <main className="relative container mx-auto grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
        {/* Left Column - Desktop Filter Sidebar */}
        <div className="hidden space-y-6 md:!block">
          {/* Filter Section */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-amber-900">Filter Poojas</h3>
              <ListFilter className="h-5 w-5 text-amber-800" />
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
                {filteredNormalPoojas.length > 0 && filteredSpecialPoojas.length > 0 ? filteredNormalPoojas.length + filteredSpecialPoojas.length : 'No'}{' '}
                {activeFilter === 'All' ? '' : activeFilter.toLowerCase()}{' '}
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
                    <option value="Popular">Popular</option>
                    <option value="Price">Price</option>
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

              {/* <button className="rounded border border-amber-200 bg-white p-2 text-gray-600">
                <Calendar className="h-4 w-4" />
              </button> */}
            </div>
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
            <div className="xm:grid-cols-1 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {getSortedNormalPoojas().length === 0 && (
                <div className="col-span-3 text-center text-gray-500">
                  No upcoming poojas available
                </div>
              )}
              {getSortedNormalPoojas().map((pooja) => (
                <div key={pooja.id} className="rounded-lg bg-white/80 p-4 backdrop-blur-sm">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-bold text-amber-900">{pooja.poojaDetails.name}</h4>
                      <p className="text-sm text-gray-600">
                        {pooja.templeDetails?.basicDetails?.templeName}
                      </p>

                      {/* Time & Deity */}
                      <div className="my-2 flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{pooja.poojaTime}</span>
                        </div>
                      </div>

                      {/* Pooja Days */}
                      <div className="mb-4 flex items-center text-xs text-gray-600">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>
                          {pooja.poojaDays
                            ?.map((isActive, index) =>
                              isActive
                                ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]
                                : null,
                            )
                            .filter(Boolean)
                            .join(', ') || 'No scheduled days'}
                        </span>
                      </div>
                    </div>

                    {/* Price & Status */}
                    <div className="text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                        <div className="font-medium text-orange-500">
                          <span className="text-xl">₹</span>
                          <span className="text-lg">{pooja.price}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                          {pooja.deityName}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Description and Details */}
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                    <span className="truncate pr-2">
                      {pooja.poojaDetails.description || 'No description available'}
                    </span>
                    <button className="flex flex-shrink-0 items-center rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      <Info className="mr-1 h-3 w-3" />
                      Details
                    </button>
                  </div>

                  {/* Book Now Button */}
                  <button className="mt-3 w-full rounded bg-orange-500 py-2 text-sm text-white">
                    Book Now
                  </button>
                </div>
              ))}
              {/* View More Button */}
              {getSortedNormalPoojas().length > 10 && (
                <div className="col-span-3 flex justify-center">
                  <button className="rounded bg-amber-500 px-6 py-2 text-white transition hover:bg-amber-600">
                    View More
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Special Upcoming Festival Poojas */}
          {getSortedSpecialPoojas().length > 0 && (
            <div className="mt-8 rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif text-lg text-amber-900">Special Festival Poojas</h3>
                <span className="rounded-full bg-orange-500 px-3 py-1 text-xs text-white">
                  Limited Bookings
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                {getSortedSpecialPoojas().length === 0 && (
                  <div className="col-span-3 text-center text-gray-500">
                    No upcoming special poojas available
                  </div>
                )}
                {getSortedSpecialPoojas().map((pooja) => (
                  <div key={pooja.id} className="rounded-lg bg-white/80 p-4 backdrop-blur-sm">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-amber-900">{pooja.poojaDetails.name}</h4>
                        <p className="text-sm text-gray-600">
                          {pooja.templeDetails?.basicDetails?.templeName}
                        </p>
                        <div className="mt-2 flex items-center text-xs text-gray-600">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>
                            {pooja.poojaDateAndTime
                              ? new Date(pooja.poojaDateAndTime).toLocaleString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : 'Date Not Available'}
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                          <div className="font-medium text-orange-500">
                            <span className="text-xl">₹</span>
                            <span className="text-lg">{pooja.price}</span>
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {pooja.isActive ? 'Slots Available' : 'Booking Closed'}
                        </p>
                      </div>
                    </div>
                    <button className="mt-3 w-full rounded bg-orange-500 py-2 text-sm text-white">
                      Book Now
                    </button>
                  </div>
                ))}
                {getSortedSpecialPoojas().length > 10 && (
                  <div className="col-span-3 flex justify-center">
                    <button className="rounded bg-amber-500 px-6 py-2 text-white transition hover:bg-amber-600">
                      View More
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button - Adjusted position for mobile */}
      <FloatingActionButton />
    </div>
  );
};

export default UpcomingPoojas;
