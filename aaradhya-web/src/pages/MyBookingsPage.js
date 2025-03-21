import React, { useState } from "react";
import { 
  Calendar, ChevronLeft, ChevronRight, Filter, Search, Download, 
  Clock, MapPin, User, CreditCard, CheckCircle, AlertCircle, Clock8,
  PieChart, List
} from "lucide-react";

const MyBookingsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [viewMode, setViewMode] = useState("grid");
  
  // Filter options
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample booking data
  const bookings = [
    {
      id: "BK1234",
      templeName: "Sri Venkateswara Temple",
      location: "Tirupati, Andhra Pradesh",
      date: "March 25, 2025",
      time: "09:30 AM",
      service: "Abhishekam",
      amount: "₹ 1,100",
      status: "upcoming",
      imageUrl: "/api/placeholder/400/250",
      isPriority: true
    },
    {
      id: "BK1235",
      templeName: "Meenakshi Amman Temple",
      location: "Madurai, Tamil Nadu",
      date: "April 2, 2025",
      time: "11:00 AM",
      service: "Archana",
      amount: "₹ 500",
      status: "upcoming",
      imageUrl: "/api/placeholder/400/250"
    },
    {
      id: "BK1233",
      templeName: "Padmanabhaswamy Temple",
      location: "Thiruvananthapuram, Kerala",
      date: "March 15, 2025",
      time: "08:00 AM",
      service: "Darshan",
      amount: "₹ 300",
      status: "completed",
      imageUrl: "/api/placeholder/400/250"
    },
    {
      id: "BK1232",
      templeName: "Jagannath Temple",
      location: "Puri, Odisha",
      date: "March 10, 2025",
      time: "10:30 AM",
      service: "Special Darshan",
      amount: "₹ 700",
      status: "completed",
      imageUrl: "/api/placeholder/400/250"
    },
    {
      id: "BK1231",
      templeName: "Kashi Vishwanath Temple",
      location: "Varanasi, Uttar Pradesh",
      date: "February 28, 2025",
      time: "06:00 AM",
      service: "Rudrabhishek",
      amount: "₹ 1,500",
      status: "cancelled",
      cancellationReason: "Temple closure due to special event",
      imageUrl: "/api/placeholder/400/250"
    },
  ];
  
  // Filter bookings based on active tab and search query
  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === "all" || booking.status === activeTab;
    const matchesSearch = booking.templeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h1 className="text-2xl font-serif text-amber-900 font-bold">My Bookings</h1>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md ${viewMode === "grid" ? "bg-amber-100 text-amber-900" : "bg-amber-50 text-gray-600"}`}
          >
            <PieChart className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md ${viewMode === "list" ? "bg-amber-100 text-amber-900" : "bg-amber-50 text-gray-600"}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-amber-100 mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "upcoming"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-600 hover:text-amber-900"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "completed"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-600 hover:text-amber-900"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab("cancelled")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "cancelled"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-600 hover:text-amber-900"
          }`}
        >
          Cancelled
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "all"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-600 hover:text-amber-900"
          }`}
        >
          All Bookings
        </button>
      </div>
      
      {/* Search and filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search bookings by temple, service, or booking ID"
            className="bg-amber-50 border border-amber-100 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-amber-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-md transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          
          <button className="flex items-center px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-md transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Filters panel (expandable) */}
      {showFilters && (
        <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-100">
          <h3 className="font-medium text-amber-900 mb-3">Filter Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Service Type</label>
              <select className="bg-white border border-amber-100 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-amber-200">
                <option value="">All Services</option>
                <option value="darshan">Darshan</option>
                <option value="archana">Archana</option>
                <option value="abhishekam">Abhishekam</option>
                <option value="homam">Homam</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Booking Date Range</label>
              <div className="flex space-x-2">
                <input 
                  type="date" 
                  className="bg-white border border-amber-100 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
                <span className="text-gray-500 self-center">to</span>
                <input 
                  type="date" 
                  className="bg-white border border-amber-100 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Price Range</label>
              <div className="flex space-x-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="bg-white border border-amber-100 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
                <span className="text-gray-500 self-center">to</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="bg-white border border-amber-100 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 space-x-2">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
              Reset
            </button>
            <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Pagination */}
      <div className="flex justify-between items-center mb-6 text-sm">
        <span className="text-gray-500">Showing {filteredBookings.length} bookings</span>
        
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded-md hover:bg-amber-100">
            <ChevronLeft className="w-5 h-5 text-amber-900" />
          </button>
          <span className="px-3 py-1 bg-amber-100 rounded-md text-amber-900">1</span>
          <button className="p-1 rounded-md hover:bg-amber-100">
            <ChevronRight className="w-5 h-5 text-amber-900" />
          </button>
        </div>
      </div>
      
      {/* Bookings display - Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-amber-50 rounded-lg">
              <AlertCircle className="mx-auto w-12 h-12 text-amber-300 mb-4" />
              <h3 className="text-lg font-medium text-amber-900 mb-1">No bookings found</h3>
              <p className="text-gray-500">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      )}
      
      {/* Bookings display - List View */}
      {viewMode === "list" && (
        <div className="overflow-hidden rounded-lg border border-amber-100">
          {filteredBookings.length > 0 ? (
            <table className="min-w-full divide-y divide-amber-100">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Booking Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Service & Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-amber-100">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-amber-900">
                            {booking.templeName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" /> {booking.location}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            ID: {booking.id}
                          </div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="text-amber-600 hover:text-amber-800">
                          View
                        </button>
                        {booking.status === "upcoming" && (
                          <button className="text-red-500 hover:text-red-700">
                            Cancel
                          </button>
                        )}
                        {booking.status === "completed" && (
                          <button className="text-gray-500 hover:text-gray-700">
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
            <div className="text-center py-12 bg-amber-50">
              <AlertCircle className="mx-auto w-12 h-12 text-amber-300 mb-4" />
              <h3 className="text-lg font-medium text-amber-900 mb-1">No bookings found</h3>
              <p className="text-gray-500">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Status badge component
const StatusBadge = ({ status }) => {
  switch (status) {
    case "upcoming":
      return (
        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          <Clock8 className="w-3 h-3 mr-1" /> Upcoming
        </span>
      );
    case "completed":
      return (
        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          <CheckCircle className="w-3 h-3 mr-1" /> Completed
        </span>
      );
    case "cancelled":
      return (
        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
          <AlertCircle className="w-3 h-3 mr-1" /> Cancelled
        </span>
      );
    default:
      return null;
  }
};

// Booking card component
const BookingCard = ({ booking }) => {
  return (
    <div className="bg-white rounded-lg border border-amber-100 overflow-hidden shadow-sm hover:shadow transition-shadow">
      <div className="relative">
        <img 
          src={booking.imageUrl} 
          alt={booking.templeName} 
          className="w-full h-48 object-cover"
        />
        {booking.isPriority && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
            Priority Booking
          </div>
        )}
        <StatusBadge status={booking.status} className="absolute top-3 right-3" />
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg text-amber-900">{booking.templeName}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          {booking.location}
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Date</div>
            <div className="flex items-center mt-1">
              <Calendar className="w-4 h-4 mr-1 text-amber-700" />
              <span className="text-sm">{booking.date}</span>
            </div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Time</div>
            <div className="flex items-center mt-1">
              <Clock className="w-4 h-4 mr-1 text-amber-700" />
              <span className="text-sm">{booking.time}</span>
            </div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Service</div>
            <div className="flex items-center mt-1">
              <User className="w-4 h-4 mr-1 text-amber-700" />
              <span className="text-sm">{booking.service}</span>
            </div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Amount</div>
            <div className="flex items-center mt-1">
              <CreditCard className="w-4 h-4 mr-1 text-amber-700" />
              <span className="text-sm font-medium">{booking.amount}</span>
            </div>
          </div>
        </div>
        
        {booking.status === "cancelled" && (
          <div className="mt-3 p-2 bg-red-50 text-red-800 rounded text-xs">
            <span className="font-medium">Cancellation reason:</span> {booking.cancellationReason}
          </div>
        )}
        
        <div className="mt-4 pt-3 border-t border-amber-100 flex justify-between">
          <span className="text-xs text-gray-500">Booking ID: {booking.id}</span>
          <div className="flex space-x-3">
            <button className="text-sm font-medium text-amber-600 hover:text-amber-800">
              Details
            </button>
            
            {booking.status === "upcoming" && (
              <button className="text-sm font-medium text-red-500 hover:text-red-700">
                Cancel
              </button>
            )}
            
            {booking.status === "completed" && (
              <button className="text-sm font-medium text-gray-500 hover:text-gray-700">
                Receipt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;