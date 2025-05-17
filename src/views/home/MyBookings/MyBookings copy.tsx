import { useState} from 'react';
import {
  Calendar,
  Filter,
  Search,
  Download,
  Clock,
  MapPin,
  User,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock8,
  PieChart,
  List,
} from 'lucide-react';
import { BookingsCardProps, StatusBadgeProps } from './types';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';
import { useBookingViewModel } from '../../../view-models/booking/useBookingViewModel';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [viewMode, setViewMode] = useState('grid');

  // Filter options
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Use the booking view model to get booking data
  const {
    bookings,
    loading: isLoading,
    error,
    loadMoreBookings,
    loadBookings,
    hasMore
  } = useBookingViewModel();

  // Filter bookings based on active tab and search query
  const filteredBookings = bookings.filter((booking) => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'upcoming' && booking.status === "PENDING" || "CONFIRMED") ||
      (activeTab === 'completed' && booking.status === 'COMPLETED') ||
      (activeTab === 'cancelled' && booking.status === 'CANCELLED');
      
    const matchesSearch =
      booking.templeDetails?.basicDetails?.templeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.poojas?.some(pooja => 
        pooja.pooja?.poojaDetails?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
    return matchesTab && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
        <h1 className="font-serif text-2xl font-bold text-amber-900">My Bookings</h1>

        <div className="mt-4 flex items-center space-x-2 sm:mt-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded-md p-2 ${
              viewMode === 'grid' ? 'bg-amber-100 text-amber-900' : 'bg-amber-50 text-gray-600'
            }`}
          >
            <PieChart className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`rounded-md p-2 ${
              viewMode === 'list' ? 'bg-amber-100 text-amber-900' : 'bg-amber-50 text-gray-600'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex border-b border-amber-100">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'upcoming'
              ? 'border-b-2 border-orange-600 text-orange-600'
              : 'text-gray-600 hover:text-amber-900'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'completed'
              ? 'border-b-2 border-orange-600 text-orange-600'
              : 'text-gray-600 hover:text-amber-900'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'cancelled'
              ? 'border-b-2 border-orange-600 text-orange-600'
              : 'text-gray-600 hover:text-amber-900'
          }`}
        >
          Cancelled
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'all'
              ? 'border-b-2 border-orange-600 text-orange-600'
              : 'text-gray-600 hover:text-amber-900'
          }`}
        >
          All Bookings
        </button>
      </div>

      {/* Search and filter */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row">
        <div className="relative max-w-md flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search bookings by temple, service, or booking ID"
            className="w-full rounded-md border border-amber-100 bg-amber-50 py-2 pr-4 pl-10 focus:ring-2 focus:ring-amber-200 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center rounded-md bg-amber-50 px-4 py-2 text-amber-900 transition-colors hover:bg-amber-100"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </button>

          <button className="flex items-center rounded-md bg-amber-50 px-4 py-2 text-amber-900 transition-colors hover:bg-amber-100">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Filters panel (expandable) */}
      {showFilters && (
        <div className="mb-6 rounded-lg border border-amber-100 bg-amber-50 p-4">
          <h3 className="mb-3 font-medium text-amber-900">Filter Options</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm text-gray-600">Service Type</label>
              <select className="w-full rounded-md border border-amber-100 bg-white px-3 py-2 focus:ring-2 focus:ring-amber-200 focus:outline-none">
                <option value="">All Services</option>
                <option value="darshan">Darshan</option>
                <option value="archana">Archana</option>
                <option value="abhishekam">Abhishekam</option>
                <option value="homam">Homam</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-600">Booking Date Range</label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="flex-1 rounded-md border border-amber-100 bg-white px-3 py-2 focus:ring-2 focus:ring-amber-200 focus:outline-none"
                />
                <span className="self-center text-gray-500">to</span>
                <input
                  type="date"
                  className="flex-1 rounded-md border border-amber-100 bg-white px-3 py-2 focus:ring-2 focus:ring-amber-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-600">Price Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="flex-1 rounded-md border border-amber-100 bg-white px-3 py-2 focus:ring-2 focus:ring-amber-200 focus:outline-none"
                />
                <span className="self-center text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="flex-1 rounded-md border border-amber-100 bg-white px-3 py-2 focus:ring-2 focus:ring-amber-200 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Reset</button>
            <button className="rounded-md bg-amber-500 px-4 py-2 text-white transition-colors hover:bg-amber-600">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full border-4 border-amber-200 border-t-amber-800 h-12 w-12"></div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-center text-red-800">
          <AlertCircle className="mx-auto mb-2 h-6 w-6 text-red-500" />
          <p>{error}</p>
          <button 
            onClick={() => loadBookings()}
            className="mt-2 rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-800 hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      )}

      {/* Pagination with Load More */}
      {!isLoading && !error && filteredBookings.length > 0 && (
        <div className="mb-6 flex items-center justify-between text-sm">
          <span className="text-gray-500">Showing {filteredBookings.length} bookings</span>

          {hasMore && (
            <button 
              onClick={() => loadMoreBookings()}
              className="flex items-center rounded-md bg-amber-50 px-4 py-2 text-amber-900 transition-colors hover:bg-amber-100"
              disabled={!hasMore}
            >
              Load More
            </button>
          )}
        </div>
      )}

      {/* Bookings display - Grid View */}
      {!isLoading && !error && viewMode === 'grid' && (
        <div className="sm-grid-cols-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={{
                  id: booking.id || '',
                  templeName: booking.templeDetails?.basicDetails?.templeName || 'Unknown Temple',
                  location: booking.templeDetails?.contactDetails?.address || 'Unknown Location',
                  date: booking.poojas?.[0]?.poojaDate
                    ? new Date(booking.poojas[0].poojaDate).toLocaleDateString()
                    : 'N/A',
                  time: 'N/A',
                  service: booking.poojas?.[0]?.pooja?.poojaDetails?.name || 'Multiple Services',
                  amount: `${booking.price}`,
                  status: booking.status,
                  imageUrl: booking.templeDetails?.basicDetails?.profilePictureUrl || '/api/placeholder/400/320',
                  
                }}
              />
            ))
          ) : (
            <div className="col-span-full rounded-lg bg-amber-50 py-12 text-center">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-amber-300" />
              <h3 className="mb-1 text-lg font-medium text-amber-900">No bookings found</h3>
              <p className="text-gray-500">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      )}

      {/* Bookings display - List View */}
      {!isLoading && !error && viewMode === 'list' && (
        <div className="overflow-hidden rounded-lg border border-amber-100">
          {filteredBookings.length > 0 ? (
            <table className="min-w-full divide-y divide-amber-100">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-amber-900 uppercase">
                    Booking Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-amber-900 uppercase">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-amber-900 uppercase">
                    Service & Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-amber-900 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-amber-900 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100 bg-white">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-amber-900">
                            {booking.templeDetails?.basicDetails?.templeName}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="mr-1 h-3 w-3" /> {booking.templeDetails?.contactDetails?.address}
                          </div>
                          <div className="mt-1 text-xs text-gray-400">ID: {booking.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.poojas && booking.poojas.length > 0 && booking.poojas[0].poojaDate 
                          ? new Date(booking.poojas[0].poojaDate).toLocaleDateString() 
                          : 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.poojas && booking.poojas.length > 0 
                          ? booking.poojas[0].scheduleId || 'Any Time'
                          : 'Any Time'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.poojas?.length > 0 ? booking.poojas[0].pooja?.poojaDetails?.name : 'Multiple Services'}
                      </div>
                      <div className="text-sm font-medium text-amber-900">
                        ${booking.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button 
                          className="text-amber-600 hover:text-amber-800"
                        >
                          View
                        </button>
                        {booking.status === 'PENDING' && (
                          <button 
                            className="text-red-500 hover:text-red-700"
                          >
                            Cancel
                          </button>
                        )}
                        {booking.status === 'COMPLETED' && (
                          <button 
                            className="text-gray-500 hover:text-gray-700"
                          >
                            Receipt
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="bg-amber-50 py-12 text-center">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-amber-300" />
              <h3 className="mb-1 text-lg font-medium text-amber-900">No bookings found</h3>
              <p className="text-gray-500">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Status badge component
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'pending':
    case 'PENDING':
      return (
        <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs leading-5 font-semibold text-green-800">
          <Clock8 className="mr-1 h-3 w-3" /> Upcoming
        </span>
      );
    case 'completed':
    case 'COMPLETED':
      return (
        <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs leading-5 font-semibold text-blue-800">
          <CheckCircle className="mr-1 h-3 w-3" /> Completed
        </span>
      );
    case 'cancelled':
    case 'CANCELLED':
      return (
        <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs leading-5 font-semibold text-red-800">
          <AlertCircle className="mr-1 h-3 w-3" /> Cancelled
        </span>
      );
    default:
      return null;
  }
};

// Booking card component
const BookingCard: React.FC<BookingsCardProps> = ({ booking }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm transition-shadow hover:shadow">
      <div className="relative">
        <img 
          src={booking.imageUrl || "/api/placeholder/400/320"} 
          alt={booking.templeName} 
          className="h-48 w-full object-cover" 
        />
        <StatusBadge status={booking.status} className="absolute top-3 right-3" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-amber-900">{booking.templeName}</h3>

        <div className="mt-1 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4" />
          {booking.location}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Date</div>
            <div className="mt-1 flex items-center">
              <Calendar className="mr-1 h-4 w-4 text-amber-700" />
              <span className="text-sm">
                {booking.date  
                  ? new Date(booking.date).toLocaleDateString() 
                  : 'N/A'}
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Time</div>
            <div className="mt-1 flex items-center">
              <Clock className="mr-1 h-4 w-4 text-amber-700" />
              <span className="text-sm">
                {booking.service 
                  ? booking.time || 'Any Time'
                  : 'Any Time'}
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Service</div>
            <div className="mt-1 flex items-center">
              <User className="mr-1 h-4 w-4 text-amber-700" />
              <span className="text-sm">
                {booking.service?.length > 0 
                  ? booking.service
                  : 'Multiple Services'}
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Amount</div>
            <div className="mt-1 flex items-center">
              <CreditCard className="mr-1 h-4 w-4 text-amber-700" />
              <span className="text-sm font-medium">₹ {booking.amount}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between border-t border-amber-100 pt-3">
          <span className="text-xs text-gray-500">Booking ID: {booking.id}</span>
          <div className="flex space-x-3">
            <button 
              className="text-sm font-medium text-amber-600 hover:text-amber-800"
            >
              Details
            </button>

            {booking.status === 'pending' && (
              <button 
                className="text-sm font-medium text-red-500 hover:text-red-700"
              >
                Cancel
              </button>
            )}

            {booking.status === 'completed' && (
              <button 
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Receipt
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default MyBookings;