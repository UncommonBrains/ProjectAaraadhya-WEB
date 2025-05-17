import { useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
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
import { bookingsMockData } from '../../../mock/data/bookings';
import { useBookingViewModel } from '../../../view-models/booking/useBookingViewModel';

import { BookingsCardProps, StatusBadgeProps } from './types';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';
import React from 'react';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [viewMode, setViewMode] = useState('grid');
  // Add state for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking] = useState<any>(null);

  // Filter options
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { bookings } = useBookingViewModel();
  console.log('Bookings:===', bookings);

  // Filter bookings based on active tab and search query
  const filteredBookings = bookingsMockData.filter((booking) => {
    const matchesTab = activeTab === 'all' || booking.status === activeTab;
    const matchesSearch =
      booking.templeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
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

      {/* Pagination */}
      <div className="mb-6 flex items-center justify-between text-sm">
        <span className="text-gray-500">Showing {filteredBookings.length} bookings</span>

        <div className="flex items-center space-x-2">
          <button className="rounded-md p-1 hover:bg-amber-100">
            <ChevronLeft className="h-5 w-5 text-amber-900" />
          </button>
          <span className="rounded-md bg-amber-100 px-3 py-1 text-amber-900">1</span>
          <button className="rounded-md p-1 hover:bg-amber-100">
            <ChevronRight className="h-5 w-5 text-amber-900" />
          </button>
        </div>
      </div>

      {/* Bookings display - Grid View */}
      {viewMode === 'grid' && (
        <div className="sm-grid-cols-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
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
      {viewMode === 'list' && (
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
                            {booking.templeName}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="mr-1 h-3 w-3" /> {booking.location}
                          </div>
                          <div className="mt-1 text-xs text-gray-400">ID: {booking.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.date}</div>
                      <div className="text-sm text-gray-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.service}</div>
                      <div className="text-sm font-medium text-amber-900">{booking.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-amber-600 hover:text-amber-800">View</button>
                        {booking.status === 'upcoming' && (
                          <button className="text-red-500 hover:text-red-700">Cancel</button>
                        )}
                        {booking.status === 'completed' && (
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
    case 'upcoming':
      return (
        <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs leading-5 font-semibold text-green-800">
          <Clock8 className="mr-1 h-3 w-3" /> Upcoming
        </span>
      );
    case 'completed':
      return (
        <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs leading-5 font-semibold text-blue-800">
          <CheckCircle className="mr-1 h-3 w-3" /> Completed
        </span>
      );
    case 'cancelled':
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
  // Add state for this specific card's modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm transition-shadow hover:shadow">
      {/* Status indicator */}
      {booking.status === 'upcoming' && (
        <div className="bg-green-50 p-2 flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm font-medium text-green-700">Upcoming</span>
        </div>
      )}
      {booking.status === 'completed' && (
        <div className="bg-blue-50 p-2 flex items-center">
          <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-sm font-medium text-blue-700">Completed</span>
        </div>
      )}
      {booking.status === 'cancelled' && (
        <div className="bg-red-50 p-2 flex items-center">
          <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
          <span className="text-sm font-medium text-red-700">Cancelled</span>
        </div>
      )}

      <div className="relative">
        <img src={booking.imageUrl} alt={booking.templeName} className="h-48 w-full object-cover" />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-amber-900">{booking.templeName}</h3>

        <div className="mt-1 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4" />
          {booking.location}
        </div>

        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-gray-500">Date</div>
              <div className="mt-1 flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-amber-700" />
                <span className="text-sm">{booking.date}</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Time</div>
              <div className="mt-1 flex items-center">
                <Clock className="mr-2 h-4 w-4 text-amber-700" />
                <span className="text-sm">{booking.time}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-gray-500">Members</div>
              <div className="mt-1 flex items-center">
                <User className="mr-2 h-4 w-4 text-amber-700" />
                <span className="text-sm">N/A (N/A)</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Services</div>
              <div className="mt-1 flex items-center">
                <span className="text-sm">{booking.service}</span>
              </div>
            </div>
          </div>
        </div>

        {booking.status === 'cancelled' && (
          <div className="mt-3 rounded bg-red-50 p-2 text-xs text-red-800">
            <span className="font-medium">Cancellation reason:</span> {booking.cancellationReason}
          </div>
        )}

        <div className="mt-4 bg-amber-50 p-3 rounded-md flex justify-between items-center">
          <span className="font-medium text-amber-900">Total Amount:</span>
          <span className="font-bold text-amber-900">{booking.amount}</span>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-gray-500">Booking ID: {booking.id}</span>
          <div className="flex space-x-3">
            <button 
              className="px-3 py-1 bg-amber-50 rounded-md text-sm font-medium text-amber-600 hover:bg-amber-100"
              onClick={() => setIsModalOpen(true)} // Open modal when clicked
            >
              View Details
            </button>

            {booking.status === 'upcoming' && (
              <button className="px-3 py-1 bg-red-50 rounded-md text-sm font-medium text-red-500 hover:bg-red-100">
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
const BookingDetailsModal = ({ isOpen, onClose, booking }: { isOpen: boolean; onClose: () => void; booking: any }) => {

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

  // Mock pooja services data (replace with actual data from booking object)
  // This structure shows multiple poojas with their participants
  const poojaServices = booking.poojaServices || [
    {
      poojaName: "Abhishekam",
      participants: [
        { name: "John Doe", starSign: "Aries" },
        { name: "Jane Doe", starSign: "Libra" }
      ]
    },
    {
      poojaName: "Archana",
      participants: [
        { name: "John Doe", starSign: "Aries" },
        { name: "Jane Doe", starSign: "Libra" },
        { name: "Jack Doe", starSign: "Gemini" }
      ]
    }
  ];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Booking Details</h2>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <img src={booking.imageUrl} alt={booking.templeName} className="h-16 w-16 rounded-md object-cover mr-4" />
              <div>
                <h3 className="text-xl font-bold text-amber-900">{booking.templeName}</h3>
                <div className="flex items-center text-gray-500">
                  <MapPin className="mr-1 h-4 w-4" /> {booking.location}
                </div>
              </div>
            </div>

            <StatusBadge status={booking.status} />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border-r pr-4">
              <h4 className="font-medium text-amber-900 mb-2">Booking Information</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-500">Booking ID:</span>
                  <span className="font-medium">{booking.id}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium">{booking.date}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-medium">{booking.time}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Main Service:</span>
                  <span className="font-medium">{booking.service}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-medium">{booking.amount}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-amber-900 mb-2">Contact Information</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-medium">John Doe</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium">john.doe@example.com</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium">+1 234 567 8901</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pooja Services Section */}
          <div className="mb-6">
            <h4 className="font-medium text-amber-900 mb-3">Pooja Services</h4>
            <div className="space-y-4">
              {poojaServices.map((pooja: { poojaName: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; participants: any[]; }, index: React.Key | null | undefined) => (
                <div key={index} className="bg-amber-50 rounded-md p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-800" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h5 className="text-lg font-semibold text-amber-900">Pooja: {pooja.poojaName}</h5>
                  </div>
                  
                  <div className="pl-3 border-l-2 border-amber-200">
                    <p className="text-sm font-medium text-amber-800 mb-2">Participants:</p>
                    {pooja.participants.map((participant, idx) => (
                      <div key={idx} className="flex items-center justify-between mb-2 bg-white rounded-md p-2 shadow-sm">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-amber-700 mr-2" />
                          <span>{participant.name}</span>
                        </div>
                        <span className="text-gray-500 text-sm">Star Sign: {participant.starSign}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {booking.status === 'cancelled' && (
            <div className="bg-red-50 p-3 rounded mb-6">
              <h4 className="font-medium text-red-800 mb-1">Cancellation Information</h4>
              <p className="text-sm text-red-700">{booking.cancellationReason || 'No reason provided'}</p>
              <p className="text-xs text-red-600 mt-1">Cancelled on: {new Date().toLocaleDateString()}</p>
            </div>
          )}

          <div className="border-t pt-4 flex justify-between">
            <div>
              <h4 className="font-medium text-amber-900 mb-2">Total Amount</h4>
              <p className="text-2xl font-bold text-amber-900">{booking.amount}</p>
            </div>

            <div className="flex space-x-2">
              {booking.status === 'upcoming' && (
                <button className="px-4 py-2 bg-red-50 rounded-md text-red-500 hover:bg-red-100">
                  Cancel Booking
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <FloatingActionButton/>
    </div>
  );
};

export default MyBookings;
