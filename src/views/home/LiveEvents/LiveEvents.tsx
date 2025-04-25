import {
  Search,
  ChevronRight,
  Calendar,
  MessageCircle,
  Users,
  Bell,
  Heart,
  Play,
  DollarSign,
  Clock,
  Video,
  Gift,
  Share2,
  Award,
  MapPin,
} from 'lucide-react';
import SearchInputField from '../../../components/common/Input/SearchInputField';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';
import { NavLink, useNavigate } from 'react-router-dom';

const LiveEvents = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-50 font-sans">
      {/* Original Component would render here */}

      <div className="min-h-screen bg-gray-50 font-sans">
        <SearchInputField />

        {/* Main Content */}
        <main className="container mx-auto grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
          {/* Left Column */}
          <div className="space-y-6">
            {/* LiveEvents Header */}
            <div>
              <h2 className="font-serif text-xl text-amber-900">Temple Live Events</h2>
              <p className="text-sm text-gray-600">
                Connect with sacred ceremonies and cultural programs
              </p>
            </div>

            {/* Currently Watching */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Currently Watching</h3>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <Video className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-700">Ganapati Homam</span>
                    <span className="text-xs text-gray-500">Sri Ganesh Temple • Live Now</span>
                  </div>
                </div>
                <NavLink to="/" className="text-sm text-orange-500">
                  Resume
                </NavLink>
              </div>
              <div className="rounded-lg bg-amber-50 p-3">
                <p className="mb-2 text-sm text-gray-700">Viewing Status:</p>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-2/3 rounded-full bg-orange-500"></div>
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  42 minutes watched • 23 minutes remaining
                </p>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Upcoming Events</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded bg-amber-50 p-3">
                  <div className="flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Navarathri Celebration</p>
                      <p className="text-xs text-gray-500">April 4, 2025 • 6:00 PM</p>
                    </div>
                  </div>
                  <button className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white">
                    Remind
                  </button>
                </div>

                <div className="flex items-center justify-between rounded bg-amber-50 p-3">
                  <div className="flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 text-orange-500">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Saptahah Day 1</p>
                      <p className="text-xs text-gray-500">April 7, 2025 • 8:30 AM</p>
                    </div>
                  </div>
                  <button className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white">
                    Remind
                  </button>
                </div>
              </div>

              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                View all upcoming events <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>

            {/* My Subscriptions */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">My Subscriptions</h3>
              <div className="space-y-4">
                <div>
                  <p className="flex items-center text-sm font-medium text-gray-700">
                    <Award className="mr-2 h-4 w-4 text-orange-500" />
                    Sri Krishna Temple
                  </p>
                  <p className="text-xs text-gray-500">Premium Member • Auto-renewal on May 15</p>
                </div>
                <div>
                  <p className="flex items-center text-sm font-medium text-gray-700">
                    <Award className="mr-2 h-4 w-4 text-orange-500" />
                    Vishnu Temple Foundation
                  </p>
                  <p className="text-xs text-gray-500">Standard Member • 14 days remaining</p>
                </div>
              </div>
              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                Manage subscriptions <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>
          </div>

          {/* Center Column (LiveEvents Feed) - Takes 2 columns in the 4-column grid */}
          <div className="md:col-span-2">
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h2 className="mb-4 font-serif text-lg text-amber-900">Live Now</h2>

              {/* Search Bar */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search events, temples, ceremonies..."
                  className="w-full rounded-full border border-amber-100 bg-amber-50 py-2 pr-4 pl-10 text-sm text-gray-700"
                />
                <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-500" />
              </div>

              {/* Feed Filters */}
              <div className="mb-6 flex space-x-3 overflow-x-auto text-sm">
                <button className="rounded-full bg-orange-500 px-4 py-1 text-white">
                  All Events
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Pujas & Homams
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Saptaham
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Cultural Programs
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Festivals
                </button>
              </div>

              {/* Live Events Posts */}
              <div className="space-y-6">
                {/* Event 1 - Featured Live Stream */}
                <div className="rounded-lg bg-amber-50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-amber-100"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">Sri Ganesh Temple</span>
                      <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-600">
                        LIVE
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">Started 1 hour ago</span>
                  </div>

                  <div className="relative mb-3">
                    <div className="flex h-48 items-center justify-center rounded bg-gray-800">
                      <Play className="h-12 w-12 text-white opacity-80" />
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center rounded bg-red-600 px-2 py-0.5 text-xs text-white">
                      <Play className="mr-1 h-3 w-3" /> Live
                    </div>
                    <div className="absolute right-2 bottom-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                      1.2K watching
                    </div>
                  </div>

                  <h3 className="mb-2 font-medium text-gray-800">
                    Ganapati Homam & Special Abhishekam
                  </h3>

                  <p className="mb-3 text-sm text-gray-700">
                    Join us for the auspicious Ganapati Homam performed by Sri Venkatachary,
                    followed by a special abhishekam ceremony. The event invokes Lord Ganesha's
                    blessings for removing obstacles and bringing prosperity.
                  </p>

                  <div className="mb-3 rounded-lg border border-amber-100 bg-white p-3">
                    <h4 className="mb-2 text-sm font-medium text-amber-900">Support this event</h4>
                    <div className="mb-2 flex space-x-2">
                      <button className="flex items-center rounded-full bg-orange-500 px-3 py-1.5 text-xs text-white">
                        <Gift className="mr-1 h-3 w-3" /> Donate
                      </button>
                      <button className="flex items-center rounded-full bg-amber-100 px-3 py-1.5 text-xs text-amber-900">
                        <DollarSign className="mr-1 h-3 w-3" /> Book Pooja
                      </button>
                      <button className="flex items-center rounded-full bg-amber-100 px-3 py-1.5 text-xs text-amber-900">
                        <Share2 className="mr-1 h-3 w-3" /> Share
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Your contributions help support temple activities
                    </p>
                  </div>

                  <div className="flex text-sm">
                    <span className="mr-4 flex items-center text-gray-500">
                      <Heart className="mr-1 h-4 w-4" /> 124 likes
                    </span>
                    <span className="mr-4 flex items-center text-gray-500">
                      <MessageCircle className="mr-1 h-4 w-4" /> 42 comments
                    </span>
                    <NavLink to="/" className="text-orange-500">
                      Join Live Chat
                    </NavLink>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="rounded-lg bg-amber-50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-amber-100"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">Devi Bhajan Group</span>
                      <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-600">
                        LIVE
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">Started 30 mins ago</span>
                  </div>

                  <div className="relative mb-3">
                    <div className="flex h-48 items-center justify-center rounded bg-gray-800">
                      <Play className="h-12 w-12 text-white opacity-80" />
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center rounded bg-red-600 px-2 py-0.5 text-xs text-white">
                      <Play className="mr-1 h-3 w-3" /> Live
                    </div>
                    <div className="absolute right-2 bottom-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                      876 watching
                    </div>
                  </div>

                  <h3 className="mb-2 font-medium text-gray-800">Navadurga Bhajan Sandhya</h3>

                  <p className="mb-3 text-sm text-gray-700">
                    Experience the divine melodies of Navadurga Bhajans performed by the renowned
                    Devi Bhajan Group. Special devotional songs dedicated to the nine forms of
                    Goddess Durga to celebrate the upcoming Navarathri festival.
                  </p>

                  <div className="mb-3 rounded-lg border border-amber-100 bg-white p-3">
                    <h4 className="mb-2 text-sm font-medium text-amber-900">Support this event</h4>
                    <div className="mb-2 flex space-x-2">
                      <button className="flex items-center rounded-full bg-orange-500 px-3 py-1.5 text-xs text-white">
                        <Gift className="mr-1 h-3 w-3" /> Donate
                      </button>
                      <button className="flex items-center rounded-full bg-amber-100 px-3 py-1.5 text-xs text-amber-900">
                        <DollarSign className="mr-1 h-3 w-3" /> Book Special Song
                      </button>
                      <button className="flex items-center rounded-full bg-amber-100 px-3 py-1.5 text-xs text-amber-900">
                        <Share2 className="mr-1 h-3 w-3" /> Share
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Donations support the artists and temple
                    </p>
                  </div>

                  <div className="flex text-sm">
                    <span className="mr-4 flex items-center text-gray-500">
                      <Heart className="mr-1 h-4 w-4" /> 98 likes
                    </span>
                    <span className="mr-4 flex items-center text-gray-500">
                      <MessageCircle className="mr-1 h-4 w-4" /> 36 comments
                    </span>
                    <NavLink to="/" className="text-orange-500">
                      Join Live Chat
                    </NavLink>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="rounded-lg bg-amber-50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-amber-100"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">Sri Vishnu Temple</span>
                      <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        UPCOMING
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">Starts in 2 hours</span>
                  </div>

                  <div className="relative mb-3">
                    <div className="flex h-48 items-center justify-center rounded bg-amber-100">
                      <Clock className="h-12 w-12 text-amber-700 opacity-80" />
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center rounded bg-amber-900 px-2 py-0.5 text-xs text-white">
                      <Calendar className="mr-1 h-3 w-3" /> Apr 1, 6:00 PM
                    </div>
                    <div className="absolute right-2 bottom-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                      432 reminders
                    </div>
                  </div>

                  <h3 className="mb-2 font-medium text-gray-800">Vishnu Sahasranamam Chanting</h3>

                  <p className="mb-3 text-sm text-gray-700">
                    Join our priests for the sacred chanting of the Vishnu Sahasranamam (1000 names
                    of Lord Vishnu). This sacred ritual is performed every Tuesday and brings peace,
                    prosperity, and divine grace to all participants.
                  </p>

                  <div className="mb-3 rounded-lg border border-amber-100 bg-white p-3">
                    <h4 className="mb-2 text-sm font-medium text-amber-900">Pre-event offerings</h4>
                    <div className="mb-2 flex space-x-2">
                      <button className="flex items-center rounded-full bg-orange-500 px-3 py-1.5 text-xs text-white">
                        <Gift className="mr-1 h-3 w-3" /> Sponsor
                      </button>
                      <button className="flex items-center rounded-full bg-amber-100 px-3 py-1.5 text-xs text-amber-900">
                        <DollarSign className="mr-1 h-3 w-3" /> Archana
                      </button>
                      <button className="flex items-center rounded-full bg-amber-100 px-3 py-1.5 text-xs text-amber-900">
                        <Bell className="mr-1 h-3 w-3" /> Set Reminder
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Your name will be mentioned during the ceremony
                    </p>
                  </div>

                  <div className="flex text-sm">
                    <span className="mr-4 flex items-center text-gray-500">
                      <Heart className="mr-1 h-4 w-4" /> 58 likes
                    </span>
                    <span className="mr-4 flex items-center text-gray-500">
                      <MessageCircle className="mr-1 h-4 w-4" /> 12 comments
                    </span>
                    <NavLink to="/" className="text-orange-500">
                      Add to Calendar
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Featured Temples */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Featured Temples</h3>
              <div className="mb-3 rounded-lg bg-amber-50 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium text-gray-700">Discover Live Events:</span>
                  <select className="rounded-full border border-orange-200 bg-white px-3 py-1 text-sm text-orange-500">
                    <option>All Regions</option>
                    <option>North India</option>
                    <option>South India</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      name: 'Sri Venkateswara Temple',
                      location: 'Tirupati, India',
                      status: 'Live Now',
                    },
                    {
                      name: 'ISKCON Temple',
                      location: 'New Delhi, India',
                      status: '2 Live Events',
                    },
                    {
                      name: 'Meenakshi Temple',
                      location: 'Madurai, India',
                      status: 'Upcoming 5:30 PM',
                    },
                  ].map((temple, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200">
                          <Video className="h-4 w-4 text-amber-700" />
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium text-gray-700">{temple.name}</p>
                          <p className="flex items-center text-xs text-gray-500">
                            <MapPin className="mr-1 h-3 w-3" /> {temple.location}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          temple.status.includes('Live')
                            ? 'bg-red-100 text-red-600'
                            : 'bg-amber-100 text-amber-600'
                        }`}
                      >
                        {temple.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                View all featured temples <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>

            {/* Premium Services */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Premium Services</h3>

              <div className="space-y-3">
                {[
                  {
                    name: 'Private Puja Broadcast',
                    desc: 'For family members abroad',
                    price: '₹2,100',
                  },
                  {
                    name: 'Monthly Subscription',
                    desc: 'Access to all live events',
                    price: '₹1,100/month',
                  },
                  {
                    name: 'VIP Temple Tour',
                    desc: 'Virtual guided tour',
                    price: '₹1,500',
                  },
                ].map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded bg-amber-50 p-3"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{service.name}</p>
                      <p className="text-xs text-gray-500">
                        {service.desc} • {service.price}
                      </p>
                    </div>
                    <button className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white">
                      Book
                    </button>
                  </div>
                ))}
              </div>

              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                View all services <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>

            {/* Event Communities */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Event Communities</h3>

              <div className="space-y-3">
                {[
                  {
                    name: 'Global Saptaham Viewers',
                    members: '2.3K members',
                  },
                  {
                    name: 'Bhajan & Music Lovers',
                    members: '1.8K members',
                  },
                  {
                    name: 'Temple Live Stream Group',
                    members: '982 members',
                  },
                ].map((group, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded bg-amber-50 p-3"
                  >
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-300/60">
                        <Users className="h-4 w-4 text-amber-700" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">{group.name}</p>
                        <p className="text-xs text-gray-500">{group.members}</p>
                      </div>
                    </div>
                    <button className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white">
                      Join
                    </button>
                  </div>
                ))}
              </div>

              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                Discover more communities <ChevronRight className="h-4 w-4" />
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
            We're bringing sacred experiences closer to you! The Live Events page will soon allow
            devotees to watch poojas and temple events happening outside the Sreekovil in real-time.
            Stay tuned for divine moments, streamed straight to you!
          </p>

          <div className="mb-6 rounded-lg border border-orange-100 bg-orange-50 p-4">
            <h3 className="mb-2 font-medium text-amber-900">Get notified when we launch</h3>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow rounded-l-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
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

export default LiveEvents;
