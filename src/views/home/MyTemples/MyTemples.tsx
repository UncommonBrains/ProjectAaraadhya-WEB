import { useState } from 'react';
import { ChevronRight, Filter, Map, Clock, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchInputField from '../../../components/common/Input/SearchInputField';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';
import TempleGrid from './TempleGrid';

const MyTemples = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      <SearchInputField />

      {/* Main Content */}
      <main className="container mx-auto grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
        {/* Left Column */}
        <div className="space-y-6">
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

          {/* Temple Categories */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <h3 className="mb-4 font-serif text-amber-900">Categories</h3>
            <ul className="space-y-2">
              {[
                { name: 'All Temples', count: 12 },
                { name: 'Favorites', count: 4 },
                { name: 'Recently Visited', count: 3 },
                { name: 'North India', count: 5 },
                { name: 'South India', count: 7 },
              ].map((category, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-between rounded p-2 ${
                    index === 0 ? 'bg-amber-100 text-amber-900' : 'hover:bg-amber-50'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs text-amber-700">
                    {category.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* My Bookings */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <Link to="/my-bookings">
              <h3 className="mb-4 cursor-pointer font-serif text-amber-900 hover:text-amber-700">
                My Bookings
              </h3>
            </Link>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded bg-amber-50 p-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Ganesh Abhishekam</p>
                  <p className="text-xs text-gray-500">Tomorrow, 10:30 AM • ISKCON</p>
                </div>
                <div className="rounded-md bg-green-100 p-1">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded bg-amber-50 p-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">VIP Darshan Pass</p>
                  <p className="text-xs text-gray-500">March 18, 4:00 PM • Tirupati</p>
                </div>
                <div className="rounded-md bg-orange-100 p-1">
                  <Clock className="h-4 w-4 text-orange-500" />
                </div>
              </div>
            </div>

            <a href="/" className="mt-4 flex items-center text-sm text-orange-500">
              View all bookings <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Upcoming Events */}
          <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
            <h3 className="mb-4 font-serif text-amber-900">Upcoming Temple Events</h3>
            <div className="space-y-3">
              <div className="flex rounded bg-amber-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 font-medium text-orange-500">
                  13
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Ganesh Chaturthi</p>
                  <p className="text-xs text-gray-500">ISKCON Temple</p>
                </div>
              </div>
              <div className="flex rounded bg-amber-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 font-medium text-orange-500">
                  15
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Navaratri Celebrations</p>
                  <p className="text-xs text-gray-500">Meenakshi Temple</p>
                </div>
              </div>
            </div>
            <a href="/" className="mt-4 flex items-center text-sm text-orange-500">
              View all events <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Center & Right Columns (Temple Content) - Takes 3 columns in the 4-column grid */}
        <div className="space-y-6 md:col-span-3">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl text-amber-900">My Temples</h2>
              <p className="text-sm text-gray-600">Your spiritual journey across 12 temples</p>
            </div>
            <div className="flex space-x-3">
              <button className="rounded border border-amber-200 bg-white p-2 text-gray-600">
                <Filter className="h-4 w-4" />
              </button>
              <button className="rounded border border-amber-200 bg-white p-2 text-gray-600">
                <Map className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap space-x-3 text-sm">
            {['All', 'North Indian', 'South Indian', 'Vishnu', 'Shiva', 'Shakti', 'Favorites'].map(
              (filter) => (
                <button
                  key={filter}
                  className={`${
                    activeFilter === filter
                      ? 'bg-orange-500 text-white'
                      : 'bg-amber-50 text-gray-600'
                  } mb-2 rounded-full px-4 py-1`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ),
            )}
          </div>

          <TempleGrid />

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 font-medium text-amber-900">
                1
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-amber-50">
                2
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-amber-50">
                3
              </button>
              <span className="flex h-8 w-8 items-center justify-center">...</span>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button - Adjusted position for mobile */}
      <FloatingActionButton />
    </div>
  );
};

export default MyTemples;
