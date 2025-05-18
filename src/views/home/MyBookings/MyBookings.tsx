import { useState, useMemo } from 'react';
import {
  Calendar,
  Filter,
  Search,
  Download,
  Clock,
  MapPin,
  User,
  CheckCircle,
  AlertCircle,
  Clock8,
  PieChart,
  List,
} from 'lucide-react';
import { useBookingViewModel } from '../../../view-models/booking/useBookingViewModel';

import { BookingsCardProps, StatusBadgeProps } from './types';
import React from 'react';
import { Booking } from './types'; // Ensure you're importing your Booking type

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking] = useState<any>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  // Filter options
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { bookings: fetchedBookings } = useBookingViewModel();
  console.log('Fetched Bookings:', fetchedBookings);

  const bookings = useMemo(() => {
    return fetchedBookings as Booking[];
  }, [fetchedBookings]);

  // Filter bookings based on active tab and search query
  const filteredBookings = bookings.filter((booking) => {
    const matchesTab = activeTab === 'all' || booking.status === activeTab;
    const matchesSearch =
      booking.templeDetails?.basicDetails?.templeName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.poojas?.some((pooja) =>
        pooja.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Get only the visible bookings
  const visibleBookings = useMemo(() => {
    return filteredBookings.slice(0, visibleCount);
  }, [filteredBookings, visibleCount]);

  // Function to load more bookings
  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

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
          onClick={() => {
            setActiveTab('all');
            setVisibleCount(3);
          }}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'all'
              ? 'border-b-2 border-orange-600 text-orange-600'
              : 'text-gray-600 hover:text-amber-900'
          }`}
        >
          All Bookings
        </button>
        <button
          onClick={() => {
            setActiveTab('PENDING');
            setVisibleCount(3);
          }}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'PENDING'
              ? 'border-b-2 border-orange-600 text-orange-600'
              : 'text-gray-600 hover:text-amber-900'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => {
            setActiveTab('CONFIRMED');
            setVisibleCount(3);
          }}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'CONFIRMED'
              ? 'border-b-2 border-orange-600 text-orange-600'
              : 'text-gray-600 hover:text-amber-900'
          }`}
        >
          Confirmed
        </button>

        <button
          onClick={() => {
            setActiveTab('COMPLETED');
            setVisibleCount(3);
          }}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'COMPLETED'
              ? 'border-b-2 border-orange-600 text-orange-600'
              : 'text-gray-600 hover:text-amber-900'
          }`}
        >
          Completed
        </button>
      </div>
      {/* Search and filter hidden for now*/}
      <div className="hidden">
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
      </div>

      {/* Pagination */}
      <div className="mb-6 flex items-center justify-between text-sm">
        <span className="text-gray-500">
          Showing {visibleBookings.length} of {filteredBookings.length} bookings
        </span>
      </div>

      {/* Bookings display - Grid View */}
      {viewMode === 'grid' && (
        <>
          <div className="sm-grid-cols-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleBookings.length > 0 ? (
              visibleBookings
                .filter((booking) => booking.id !== undefined)
                .map((booking) => <BookingCard key={booking.id!} booking={booking} />)
            ) : (
              <div className="col-span-full rounded-lg bg-amber-50 py-12 text-center">
                <AlertCircle className="mx-auto mb-4 h-12 w-12 text-amber-300" />
                <h3 className="mb-1 text-lg font-medium text-amber-900">No bookings found</h3>
                <p className="text-gray-500">Try adjusting your filters or search criteria</p>
              </div>
            )}
          </div>
          {/* View More Button */}
          {visibleBookings.length < filteredBookings.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleViewMore}
                className="rounded-md bg-amber-500 px-6 py-2 text-white transition-colors hover:bg-amber-600"
              >
                View More
              </button>
            </div>
          )}
        </>
      )}

      {/* Bookings display - List View */}
      {viewMode === 'list' && (
        <>
          <div className="overflow-hidden rounded-lg border border-amber-100">
            {visibleBookings.length > 0 ? (
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
                  {visibleBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-start">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-amber-900">
                              {booking.templeDetails?.basicDetails?.templeName}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="mr-1 h-3 w-3" />{' '}
                              {booking.templeDetails?.basicDetails?.templeName}
                            </div>
                            <div className="mt-1 text-xs text-gray-400">ID: {booking.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.templeDetails?.basicDetails?.templeName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.templeDetails?.basicDetails?.templeName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.templeDetails?.basicDetails?.templeName}
                        </div>
                        <div className="text-sm font-medium text-amber-900">
                          {booking.templeDetails?.basicDetails?.templeName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button className="text-amber-600 hover:text-amber-800">View</button>
                          {booking.status === 'PENDING' && (
                            <button className="text-red-500 hover:text-red-700">Cancel</button>
                          )}
                          {booking.status === 'COMPLETED' && (
                            <button className="text-gray-500 hover:text-gray-700">Receipt</button>
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

          {/* View More Button */}
          {visibleBookings.length < filteredBookings.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleViewMore}
                className="rounded-md bg-amber-500 px-6 py-2 text-white transition-colors hover:bg-amber-600"
              >
                View More
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal for Booking Details */}
      <BookingDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
};

// Status badge component
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'PENDING':
      return (
        <div className="flex items-center p-2">
          <span className="inline-flex items-center rounded-md bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
            <AlertCircle className="mr-1 h-3 w-3" /> Pending
          </span>
        </div>
      );
    case 'CONFIRMED':
      return (
        <div className="flex items-center p-2">
          <span className="inline-flex items-center rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            <AlertCircle className="mr-1 h-3 w-3" /> Confirmed
          </span>
        </div>
      );
    case 'COMPLETED':
      return (
        <div className="flex items-center p-2">
          <span className="inline-flex items-center rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            <AlertCircle className="mr-1 h-3 w-3" /> Completed
          </span>
        </div>
      );
    case 'CANELLED':
      return (
        <div className="flex items-center p-2">
          <span className="inline-flex items-center rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
            <AlertCircle className="mr-1 h-3 w-3" /> Cancelled
          </span>
        </div>
      );
    default:
      return null;
  }
};

// Booking card component
const BookingCard: React.FC<BookingsCardProps> = ({ booking }) => {
  // Add state for this specific card's modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const convertTimestampToDateAndTime = (timestamp: { seconds: number; nanoseconds: number }) => {
    if (!timestamp?.seconds) return { date: 'Invalid', time: 'Invalid' };

    const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1_000_000);
    const dateObj = new Date(milliseconds);

    const date = dateObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const time = dateObj.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return { date, time };
  };

  const { date, time } = convertTimestampToDateAndTime(booking.createdAt);

  

  return (
    <div className="overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm transition-shadow hover:shadow">
      <div className="relative">
        <img
          src={booking?.templeDetails?.basicDetails?.profilePictureUrl}
          alt={booking.templeDetails?.basicDetails?.profilePictureUrl}
          className="h-48 w-full object-cover"
        />
      </div>
      {/* Status indicator  */}

      {booking.status === 'COMPLETED' && (
        <div className="flex items-center p-2">
          <span className="inline-flex items-center rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            <CheckCircle className="mr-1 h-3 w-3" /> Completed
          </span>
        </div>
      )}
      {booking.status === 'CANCELLED' && (
        <div className="flex items-center p-2">
          <span className="inline-flex items-center rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
            <AlertCircle className="mr-1 h-3 w-3" /> Cancelled
          </span>
        </div>
      )}
      {booking.status === 'REFUNDED' && (
        <div className="flex items-center p-2">
          <span className="inline-flex items-center rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
            <AlertCircle className="mr-1 h-3 w-3" /> Refunded
          </span>
        </div>
      )}
      {booking.status === 'CONFIRMED' && (
        <div className="flex items-center p-2">
          <span className="inline-flex items-center rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            <Clock8 className="mr-1 h-3 w-3" /> Confirmed
          </span>
        </div>
      )}
      {booking.status === 'PENDING' && (
        <div className="flex items-center p-2">
          <span className="inline-flex items-center rounded-md bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
            <AlertCircle className="mr-1 h-3 w-3" /> Pending
          </span>
        </div>
      )}

      <div className="p-4 pt-0">
        <h3 className="text-xl font-bold text-amber-900">
          {booking.templeDetails.basicDetails?.templeName}
        </h3>

        <div className="mt-1 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4" />
          {booking.templeDetails.contactDetails?.address}
        </div>

        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-gray-500">Booking Date</div>
              <div className="mt-1 flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-amber-700" />

                <span className="text-sm">{date}</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Booking Time</div>
              <div className="mt-1 flex items-center">
                <Clock className="mr-2 h-4 w-4 text-amber-700" />
                <span className="text-sm">{time}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            

            <div>
              <div className="text-xs text-gray-500">Poojas</div>
              <div className="mt-1 flex items-center">
                <span className="text-sm">
                  {booking.poojas[0]?.poojaDetails?.name}
                  {booking.poojas.length > 1 &&
                    ` + ${booking.poojas.length - 1} more ${booking.poojas.length - 1 > 1 ? 's' : ''}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-md bg-amber-50 p-3">
          <span className="font-medium text-amber-900">Total Amount:</span>
          <span className="font-bold text-amber-900">₹ {booking.price}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">Booking ID: {booking.id}</span>
          <div className="flex space-x-3">
            <button
              className="rounded-md bg-amber-50 px-3 py-1 text-sm font-medium text-amber-600 hover:bg-amber-100"
              onClick={() => setIsModalOpen(true)}
            >
              View Details
            </button>

            {booking.status === 'upcoming' && (
              <button className="rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-500 hover:bg-red-100">
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Add modal for this card */}
        <BookingDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          booking={booking}
        />
      </div>
    </div>
  );
};

// Modal component for booking details
const BookingDetailsModal = ({
  isOpen,
  onClose,
  booking,
}: {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
}) => {
  React.useEffect(() => {
    // When modal opens, prevent scrolling on the body
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    // When modal closes, allow scrolling again
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]); // Only re-run when isOpen changes

  if (!isOpen || !booking) return null;

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Convert timestamp to readable date and time
  const convertTimestampToDateAndTime = (timestamp: { seconds: number; nanoseconds: number }) => {
    if (!timestamp?.seconds) return { date: 'Not available', time: 'Not available' };

    const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1_000_000);
    const dateObj = new Date(milliseconds);

    const date = dateObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const time = dateObj.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return { date, time };
  };

  const { date,  } = convertTimestampToDateAndTime(booking.createdAt);

  // Get pooja services with participants from booking data
  const poojaServices = booking.poojas?.map((pooja: any) => {
    const participent1 = { name: pooja.name, starSign: pooja.starSign };
    const otherParticipants =
      pooja.members?.map((member: any) => ({
        name: member.name,
        starSign: member.starSign,
      })) || [];

    return {
      name: pooja.poojaDetails?.name || pooja.name,
      poojaDate: pooja.poojaDate, // Include the poojaDate from the pooja object
      participants: [participent1, ...otherParticipants],
    };
  }) || [];

  // Format date helper function
  const formatPoojaDate = (dateString: string) => {
    if (!dateString) return 'Date not specified';

    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date format';
      }
      
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return dateString; // Return original string if parsing fails
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={handleBackdropClick}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6">
          <h2 className="mb-4 text-2xl font-bold text-amber-900">Booking Details</h2>

          <div className="mb-6">
            <div className="mb-4 flex items-center">
              <img
                src={booking.templeDetails?.basicDetails?.profilePictureUrl}
                alt={booking.templeDetails?.basicDetails?.templeName || 'Temple'}
                className="mr-4 h-16 w-16 rounded-md object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-amber-900">
                  {booking.templeDetails?.basicDetails?.templeName}
                </h3>
                <div className="flex items-center text-gray-500">
                  <MapPin className="mr-1 h-4 w-4" />
                  {booking.templeDetails?.contactDetails?.address ||
                    booking.templeDetails?.basicDetails?.location ||
                    'Location not available'}
                </div>
              </div>
            </div>

            <StatusBadge status={booking.status} />
          </div>

          <div className="mb-6 grid gap-4">
            <h4 className="mb-2 font-medium text-amber-900">Booking Information</h4>
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 w-20 flex-shrink-0">Booking ID :</span>
                    <span className="font-medium text-amber-900 overflow-hidden text-ellipsis ">{booking.id}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 w-20 flex-shrink-0">Amount :</span>
                    <span className="font-medium text-amber-900 ">₹ {booking.price || 'N/A'}</span>
                  </div>
                </div>
                <div className="space-y-3">
                <div className="flex items-center">
                    <span className="text-sm text-gray-500  flex-shrink-0">Booking Date : </span>
                    <span className="font-medium text-amber-900 "> {date}</span>
                  </div>

                </div>
              </div>
              
              {/* Payment method if available - updated with the same spacing */}
              {booking.paymentDetails?.paymentMethod && (
                <div className="mt-3 pt-3 border-t border-amber-200">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 w-20 flex-shrink-0">Payment:</span>
                    <span className="font-medium text-amber-900 ml-2">{booking.paymentDetails.paymentMethod}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pooja Services Section */}
          <div className="mb-6">
            <h4 className="mb-3 font-medium text-amber-900">Pooja Services</h4>
            <div className="space-y-4">
              {poojaServices.length > 0 ? (
                poojaServices.map((pooja: any, index: number) => (
                  <div key={index} className="rounded-md bg-amber-50 p-4">
                    <div className="mb-3 flex flex-col">
                      <div className="flex items-center">
                        <div className="mr-3 rounded-full bg-amber-100 p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-amber-800"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h5 className="text-lg font-semibold text-amber-900">
                          {pooja.name || "Unnamed Pooja"}  - 
                        </h5>
                        <div className=" flex items-center text-lg text-amber-700 font-semibold ml-2">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span className="">
                          {formatPoojaDate(pooja.poojaDate)}
                        </span>
                      </div>
                      </div>
                      
                     
                    </div>

                    {/* Participant List */}
                    {pooja.participants && pooja.participants.length > 0 ? (
                      <div className="border-l-2 border-amber-200 pl-3">
                        <p className="mb-2 text-sm font-medium text-amber-800">Participants:</p>
                        <div className="space-y-2">
                          {pooja.participants.map((participant: any, idx: number) => (
                            <div key={idx} className="rounded-md bg-white p-3 shadow-sm">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <User className="mr-2 h-4 w-4 text-amber-700" />
                                  <span className="font-medium">
                                    {participant.name || 'Unnamed'}
                                  </span>
                                </div>
                                <span className="rounded-full bg-amber-50 px-2 py-1 text-xs text-amber-800">
                                  {participant.starSign || 'No star sign'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 text-center text-sm text-gray-500">
                        <p>No participants for this pooja</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="rounded-md bg-amber-50 p-4 text-center">
                  <p className="text-amber-800">No pooja services details available</p>
                </div>
              )}
            </div>
          </div>
          
          {booking.status === 'CANCELLED' && (
            <div className="mb-6 rounded bg-red-50 p-3">
              <h4 className="mb-1 font-medium text-red-800">Cancellation Information</h4>
              <p className="text-sm text-red-700">
                {booking.cancellationReason || 'No reason provided'}
              </p>
              <p className="mt-1 text-xs text-red-600">
                Cancelled on:{' '}
                {booking.cancelledAt
                  ? new Date(booking.cancelledAt.seconds * 1000).toLocaleDateString()
                  : 'Date not available'}
              </p>
            </div>
          )}

          <div className="flex justify-between border-t pt-4">
            <div>
              <h4 className="mb-2 font-medium text-amber-900">Total Amount</h4>
              <p className="text-2xl font-bold text-amber-900">₹ {booking.price || 'N/A'}</p>
            </div>

            <div className="flex space-x-2">
              {(booking.status === 'CONFIRMED' || booking.status === 'COMPLETED')  && (
                <button className="rounded-md bg-orange-50 px-4 py-2 text-orange-500 hover:bg-orange-100">
                  Download Reciept
                </button>
              )}
              <button
                onClick={onClose}
                className="rounded-md bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
