import {
  Search,
  ChevronRight,
  Calendar,
  MessageCircle,
  Users,
  Plus,
  Bell,
  MapPin,
  Clock,
  Star,
  Filter,
  Briefcase,
  Home,
  Building,
  User,
} from 'lucide-react';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';
import { NavLink, useNavigate } from 'react-router-dom';

const DivineSeva = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-50 font-sans">
      {/* Original Component would render here */}

      <div className="min-h-screen bg-gray-50 font-sans">

        {/* Main Content */}
        <main className="container mx-auto grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
          {/* Left Column */}
          <div className="space-y-6">
            {/* DivineSeva Header */}
            <div>
              <h2 className="font-serif text-xl text-amber-900">DivineSeva</h2>
              <p className="text-sm text-gray-600">
                Connect with priests for rituals and ceremonies
              </p>
            </div>

            {/* My Profile */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">My Profile</h3>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <User className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-700">Raj Sharma</span>
                    <span className="text-xs text-gray-500">Devotee • Mumbai</span>
                  </div>
                </div>
                <NavLink to="/" className="text-sm text-orange-500">
                  Edit
                </NavLink>
              </div>
              <div className="rounded-lg bg-amber-50 p-3">
                <p className="mb-2 text-sm text-gray-700">Recent Activity:</p>
                <p className="text-sm text-gray-600">
                  Posted 2 ritual requests this month. Last ceremony: Griha Pravesh on March 15,
                  2025
                </p>
              </div>
            </div>

            {/* Upcoming Ceremonies */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">My Upcoming Ceremonies</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded bg-amber-50 p-3">
                  <div className="flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Satyanarayan Puja</p>
                      <p className="text-xs text-gray-500">April 5, 2025 • 10:00 AM</p>
                    </div>
                  </div>
                  <NavLink to="/" className="text-xs text-orange-500">
                    Details
                  </NavLink>
                </div>

                <div className="flex items-center justify-between rounded bg-amber-50 p-3">
                  <div className="flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Vastu Shanti</p>
                      <p className="text-xs text-gray-500">April 15, 2025 • Pending confirmation</p>
                    </div>
                  </div>
                  <NavLink to="/" className="text-xs text-orange-500">
                    Details
                  </NavLink>
                </div>
              </div>

              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                View all ceremonies <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>

            {/* Auspicious Dates */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Auspicious Dates</h3>
              <div className="space-y-4">
                <div>
                  <p className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                    Ram Navami
                  </p>
                  <p className="text-xs text-gray-500">
                    April 17, 2025 • Ideal for temple ceremonies
                  </p>
                </div>
                <div>
                  <p className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                    Akshaya Tritiya
                  </p>
                  <p className="text-xs text-gray-500">
                    May 10, 2025 • Auspicious for new beginnings
                  </p>
                </div>
              </div>
              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                View full calendar <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>
          </div>

          {/* Center Column (Job Postings Feed) - Takes 2 columns in the 4-column grid */}
          <div className="md:col-span-2">
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h2 className="mb-4 font-serif text-lg text-amber-900">
                Priest & Poojari Opportunities
              </h2>

              {/* Search Bar */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search for rituals, temples, or locations..."
                  className="w-full rounded-full border border-amber-100 bg-amber-50 py-2 pr-4 pl-10 text-sm text-gray-700"
                />
                <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-500" />
              </div>

              {/* Feed Filters */}
              <div className="mb-6 flex space-x-3 overflow-x-auto text-sm">
                <button className="rounded-full bg-orange-500 px-4 py-1 text-white">
                  All Postings
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Temple Events
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Home Ceremonies
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Corporate Pujas
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Festival Services
                </button>
              </div>

              {/* Job Postings */}
              <div className="space-y-6">
                {/* Post 1 - Temple */}
                <div className="rounded-lg border-l-4 border-orange-500 bg-amber-50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                      <Building className="h-4 w-4 text-orange-700" />
                    </div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">Shri Siddhivinayak Temple</span>
                      <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-600">
                        Verified
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">Posted 2 hours ago</span>
                  </div>

                  <h3 className="mb-2 font-medium text-amber-900">
                    Experienced Poojari Required for Ganesh Chaturthi
                  </h3>

                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                      <Calendar className="mr-1 h-3 w-3" /> Apr 20-22, 2025
                    </span>
                    <span className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                      <MapPin className="mr-1 h-3 w-3" /> Mumbai, Maharashtra
                    </span>
                    <span className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                      <Clock className="mr-1 h-3 w-3" /> Full-day (8 hours)
                    </span>
                    <span className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                      <Briefcase className="mr-1 h-3 w-3" /> ₹5,000 per day
                    </span>
                  </div>

                  <p className="mb-3 text-gray-700">
                    We are seeking an experienced poojari well-versed in all Ganesh Chaturthi
                    rituals for our main temple celebration. Must have 5+ years of experience with
                    Ganesh puja and knowledge of Vedic mantras. Accommodation will be provided.
                  </p>

                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex text-sm">
                      <span className="mr-4 flex items-center text-gray-500">
                        <Users className="mr-1 h-4 w-4" /> 3 positions
                      </span>
                      <span className="mr-4 flex items-center text-gray-500">
                        <MessageCircle className="mr-1 h-4 w-4" /> 8 applicants
                      </span>
                    </div>
                    <NavLink
                      to="/"
                      className="rounded-full bg-orange-500 px-4 py-1 text-sm text-white"
                    >
                      Apply Now
                    </NavLink>
                  </div>
                </div>

                {/* Post 2 - Home Ceremony */}
                <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                      <Home className="h-4 w-4 text-amber-700" />
                    </div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">Sharma Family</span>
                      <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
                        5★ Rating
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">Yesterday</span>
                  </div>

                  <h3 className="mb-2 font-medium text-amber-900">
                    Priest for Griha Pravesh Ceremony
                  </h3>

                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                      <Calendar className="mr-1 h-3 w-3" /> Apr 15, 2025
                    </span>
                    <span className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                      <MapPin className="mr-1 h-3 w-3" /> Pune, Maharashtra
                    </span>
                    <span className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                      <Clock className="mr-1 h-3 w-3" /> 4 hours (7AM-11AM)
                    </span>
                    <span className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                      <Briefcase className="mr-1 h-3 w-3" /> ₹4,500 + dakshina
                    </span>
                  </div>

                  <p className="mb-3 text-gray-700">
                    We are moving into our new home and require an experienced priest for Griha
                    Pravesh ceremony. Should be familiar with all rituals including Vastu Shanti.
                    Priest should bring all pooja samagri. Transportation will be arranged from Pune
                    city center.
                  </p>

                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex text-sm">
                      <span className="mr-4 flex items-center text-gray-500">
                        <Users className="mr-1 h-4 w-4" /> 1 position
                      </span>
                      <span className="mr-4 flex items-center text-gray-500">
                        <MessageCircle className="mr-1 h-4 w-4" /> 5 applicants
                      </span>
                    </div>
                    <NavLink
                      to="/"
                      className="rounded-full bg-orange-500 px-4 py-1 text-sm text-white"
                    >
                      Apply Now
                    </NavLink>
                  </div>
                </div>

                {/* Post 3 - Corporate Ceremony */}
                <div className="rounded-lg border-l-4 border-blue-500 bg-amber-50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <Building className="h-4 w-4 text-blue-700" />
                    </div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">TechSolutions India Ltd.</span>
                      <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-600">
                        Corporate
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">3 days ago</span>
                  </div>

                  <h3 className="mb-2 font-medium text-amber-900">
                    Sanskrit-Speaking Priest for Office Inauguration
                  </h3>

                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                      <Calendar className="mr-1 h-3 w-3" /> Apr 10, 2025
                    </span>
                    <span className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                      <MapPin className="mr-1 h-3 w-3" /> Bangalore, Karnataka
                    </span>
                    <span className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                      <Clock className="mr-1 h-3 w-3" /> 2 hours (9AM-11AM)
                    </span>
                    <span className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                      <Briefcase className="mr-1 h-3 w-3" /> ₹7,500
                    </span>
                  </div>

                  <p className="mb-3 text-gray-700">
                    We're inaugurating our new tech campus and require a priest fluent in Sanskrit
                    for a traditional office blessing ceremony. The ceremony will include Ganesha
                    puja and Lakshmi-Narayana invocation. English explanation of rituals for
                    international executives would be appreciated.
                  </p>

                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex text-sm">
                      <span className="mr-4 flex items-center text-gray-500">
                        <Users className="mr-1 h-4 w-4" /> 1 position
                      </span>
                      <span className="mr-4 flex items-center text-gray-500">
                        <MessageCircle className="mr-1 h-4 w-4" /> 12 applicants
                      </span>
                    </div>
                    <NavLink
                      to="/"
                      className="rounded-full bg-orange-500 px-4 py-1 text-sm text-white"
                    >
                      Apply Now
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="rounded-full border border-orange-300 px-6 py-2 text-orange-500 hover:bg-orange-50">
                  Load More Opportunities
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Post a Requirement */}
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 shadow-sm">
              <h3 className="mb-3 font-serif text-amber-900">Post a Requirement</h3>
              <p className="mb-4 text-sm text-gray-600">
                Looking for a priest or poojari for your ceremony? Post your requirement and connect
                with qualified professionals.
              </p>
              <button className="flex w-full items-center justify-center rounded-lg bg-orange-500 py-2 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create New Posting
              </button>
            </div>

            {/* Priest/Poojari Filters */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 flex items-center font-serif text-amber-900">
                <Filter className="mr-2 h-4 w-4" />
                Refine Search
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Ceremony Type
                  </label>
                  <select className="w-full rounded-md border border-amber-100 bg-amber-50 p-2 text-sm">
                    <option>All Ceremonies</option>
                    <option>Griha Pravesh</option>
                    <option>Satyanarayan Puja</option>
                    <option>Ganesh Puja</option>
                    <option>Wedding Ceremony</option>
                    <option>Navagraha Shanti</option>
                    <option>Vastu Shanti</option>
                    <option>Baby Naming</option>
                    <option>Funeral Services</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Location</label>
                  <select className="w-full rounded-md border border-amber-100 bg-amber-50 p-2 text-sm">
                    <option>All India</option>
                    <option>Mumbai</option>
                    <option>Delhi NCR</option>
                    <option>Bangalore</option>
                    <option>Chennai</option>
                    <option>Pune</option>
                    <option>Hyderabad</option>
                    <option>Kolkata</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Date Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      className="w-full rounded-md border border-amber-100 bg-amber-50 p-2 text-sm"
                    />
                    <input
                      type="date"
                      className="w-full rounded-md border border-amber-100 bg-amber-50 p-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Duration</label>
                  <select className="w-full rounded-md border border-amber-100 bg-amber-50 p-2 text-sm">
                    <option>Any Duration</option>
                    <option>1-2 Hours</option>
                    <option>Half Day</option>
                    <option>Full Day</option>
                    <option>Multiple Days</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Minimum Experience
                  </label>
                  <select className="w-full rounded-md border border-amber-100 bg-amber-50 p-2 text-sm">
                    <option>Any Experience</option>
                    <option>1+ Years</option>
                    <option>3+ Years</option>
                    <option>5+ Years</option>
                    <option>10+ Years</option>
                  </select>
                </div>
              </div>

              <button className="mt-4 w-full rounded-lg bg-orange-500 py-2 text-white">
                Apply Filters
              </button>
            </div>

            {/* Top Rated Priests */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Top Rated Priests</h3>

              <div className="space-y-3">
                {[
                  {
                    name: 'Pandit Ramesh Sharma',
                    specialty: 'Vedic Ceremonies • 12 yrs exp',
                    rating: '4.9',
                  },
                  {
                    name: 'Acharya Suresh Joshi',
                    specialty: 'Vastu & Graha Shanti • 15 yrs exp',
                    rating: '4.8',
                  },
                  {
                    name: 'Guruji Krishnan',
                    specialty: 'Tamil Rituals • 20 yrs exp',
                    rating: '4.9',
                  },
                ].map((priest, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded bg-amber-50 p-3"
                  >
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200">
                        <User className="h-4 w-4 text-amber-700" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">{priest.name}</p>
                        <p className="text-xs text-gray-500">{priest.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center rounded-full bg-amber-100 px-2 py-1">
                      <Star className="mr-1 h-3 w-3 text-orange-500" />
                      <span className="text-xs font-medium">{priest.rating}</span>
                    </div>
                  </div>
                ))}
              </div>

              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                View all priests <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>
          </div>
        </main>

        {/* Floating Action Button - Adjusted position for mobile */}
        <FloatingActionButton />
      </div>

      {/* Overlay Layer */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-orange-100 p-4">
              <Calendar className="h-12 w-12 text-orange-600" />
            </div>
          </div>

          <h2 className="mb-3 text-2xl font-bold text-gray-800">Coming Soon!</h2>

          <p className="mb-6 text-gray-600">
            We're working to connect temples and devotees with experienced poojaris! The Divine Seva
            page will soon offer a seamless way to hire priests for rituals and ceremonies. Stay
            tuned for this sacred service!
          </p>

          <div className="mb-6 rounded-lg border border-orange-100 bg-orange-50 p-4">
            <h3 className="mb-2 font-medium text-amber-900">Get notified when we launch</h3>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow rounded-l-md border border-gray-300 bg-white px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <button className="flex items-center rounded-r-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
                <Bell className="mr-2 h-4 w-4" /> Notify Me
              </button>
            </div>
          </div>

          <button
            className="font-medium text-orange-600 hover:text-orange-700"
            onClick={() => navigate('/')}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default DivineSeva;
