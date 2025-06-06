import {
  Search,
  ChevronRight,
  Users,
  MessageCircle,
  Calendar,
  Star,
  Plus,
  Bookmark,
  TrendingUp,
  Bell,
} from 'lucide-react';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';
import { NavLink, useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-50 font-sans">
      {/* Original Component would render here */}

      <div className="min-h-screen bg-amber-50 font-sans">

        {/* Main Content */}
        <main className="container mx-auto grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Community Header */}
            <div>
              <h2 className="font-serif text-xl text-amber-900">Spiritual Community</h2>
              <p className="text-sm text-gray-600">Connect with devotees across India</p>
            </div>

            {/* My Groups */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">My Groups</h3>
              <ul className="space-y-4">
                {[
                  {
                    name: 'Vedic Philosophy Discussion',
                    members: '143 active members',
                  },
                  {
                    name: 'Temple Photography Group',
                    members: '89 active members',
                  },
                  {
                    name: 'Bhajan Lovers',
                    members: '215 active members',
                  },
                  {
                    name: 'Pilgrimage Planning',
                    members: '67 active members',
                  },
                ].map((group, index) => (
                  <li key={index} className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                      <Users className="h-4 w-4 text-amber-700" />
                    </div>
                    <div className="ml-3">
                      <span className="block text-sm text-gray-700">{group.name}</span>
                      <span className="text-xs text-gray-500">{group.members}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                See all my groups <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>

            {/* Community Events */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Community Events</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded bg-amber-50 p-3">
                  <div className="flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 font-medium text-orange-500">
                      23
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Bhagavad Gita Discussion</p>
                      <p className="text-xs text-gray-500">March 23, 5:30 PM • Online</p>
                    </div>
                  </div>
                  <div className="rounded-md bg-orange-100 p-1">
                    <Bookmark className="h-4 w-4 text-orange-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded bg-amber-50 p-3">
                  <div className="flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 font-medium text-orange-500">
                      28
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Devotional Music Workshop</p>
                      <p className="text-xs text-gray-500">March 28, 3:00 PM • ISKCON</p>
                    </div>
                  </div>
                  <div className="rounded-md bg-orange-100 p-1">
                    <Bookmark className="h-4 w-4 text-orange-500" />
                  </div>
                </div>
              </div>

              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                View all events <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>

            {/* Active Forums */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Active Forums</h3>
              <div className="space-y-4">
                <div>
                  <p className="flex items-center text-sm font-medium text-gray-700">
                    <TrendingUp className="mr-2 h-4 w-4 text-orange-500" />
                    Navratri Preparations
                  </p>
                  <p className="text-xs text-gray-500">45 new posts today</p>
                </div>
                <div>
                  <p className="flex items-center text-sm font-medium text-gray-700">
                    <TrendingUp className="mr-2 h-4 w-4 text-orange-500" />
                    Temple Cuisines
                  </p>
                  <p className="text-xs text-gray-500">22 new posts today</p>
                </div>
              </div>
              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                Browse all forums <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>
          </div>

          {/* Center Column (Community Feed) - Takes 2 columns in the 4-column grid */}
          <div className="md:col-span-2">
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h2 className="mb-4 font-serif text-lg text-amber-900">Community Feed</h2>

              {/* Search Bar */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search discussions, posts, and members..."
                  className="w-full rounded-full border border-amber-100 bg-amber-50 py-2 pr-4 pl-10 text-sm text-gray-700"
                />
                <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-500" />
              </div>

              {/* Feed Filters */}
              <div className="mb-6 flex space-x-3 overflow-x-auto text-sm">
                <button className="rounded-full bg-orange-500 px-4 py-1 text-white">
                  All Posts
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Discussions
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Questions
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Resources
                </button>
                <button className="rounded-full bg-amber-50 px-4 py-1 text-gray-600">
                  Announcements
                </button>
              </div>

              {/* Community Posts */}
              <div className="space-y-6">
                {/* Post 1 */}
                <div className="rounded-lg bg-amber-50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-amber-100"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">Anjali Sharma</span>
                      <span className="ml-2 text-xs text-gray-500">
                        Posted in Vedic Philosophy Discussion
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">1 hour ago</span>
                  </div>

                  <p className="mb-3 text-gray-700">
                    Has anyone read "The Bhagavad Gita As It Is" translation by Srila Prabhupada?
                    I'm looking for a study group to discuss the teachings in depth. I find the
                    concepts of karma yoga particularly interesting.
                  </p>

                  <div className="flex text-sm">
                    <span className="mr-4 flex items-center text-gray-500">
                      <Star className="mr-1 h-4 w-4" /> 24 likes
                    </span>
                    <span className="mr-4 flex items-center text-gray-500">
                      <MessageCircle className="mr-1 h-4 w-4" /> 8 comments
                    </span>
                    <NavLink to="/" className="text-orange-500">
                      Join Discussion
                    </NavLink>
                  </div>
                </div>

                {/* Post 2 */}
                <div className="rounded-lg bg-amber-50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-amber-100"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">Vikram Patel</span>
                      <span className="ml-2 text-xs text-gray-500">
                        Posted in Temple Photography Group
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">3 hours ago</span>
                  </div>

                  <p className="mb-3 text-gray-700">
                    Sharing some photos from my recent visit to Kanchipuram temples. The
                    architecture is absolutely magnificent! I especially loved the intricate
                    carvings on the gopuram.
                  </p>

                  <div className="mb-3 flex flex-row space-x-2 rounded bg-amber-200/30 p-2">
                    <div className="flex h-24 flex-1 items-center justify-center rounded bg-amber-300/30">
                      <span className="font-serif text-amber-800">Photo 1</span>
                    </div>
                    <div className="flex h-24 flex-1 items-center justify-center rounded bg-amber-300/30">
                      <span className="font-serif text-amber-800">Photo 2</span>
                    </div>
                    <div className="flex h-24 flex-1 items-center justify-center rounded bg-amber-300/30">
                      <span className="font-serif text-amber-800">Photo 3</span>
                    </div>
                  </div>

                  <div className="flex text-sm">
                    <span className="mr-4 flex items-center text-gray-500">
                      <Star className="mr-1 h-4 w-4" /> 56 likes
                    </span>
                    <span className="mr-4 flex items-center text-gray-500">
                      <MessageCircle className="mr-1 h-4 w-4" /> 17 comments
                    </span>
                    <NavLink to="/" className="text-orange-500">
                      See All Photos
                    </NavLink>
                  </div>
                </div>

                {/* Post 3 */}
                <div className="rounded-lg bg-amber-50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-amber-100"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">ISKCON Temple (Official)</span>
                      <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-600">
                        Verified
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">Yesterday</span>
                  </div>

                  <p className="mb-3 text-gray-700">
                    We're organizing a special community kirtan and prasadam distribution this
                    weekend. Everyone is welcome to join! Please RSVP so we can make arrangements
                    accordingly.
                  </p>

                  <div className="mb-3 flex h-32 items-center justify-center rounded bg-amber-200/30">
                    <span className="font-serif text-amber-800">Event Poster</span>
                  </div>

                  <div className="flex text-sm">
                    <span className="mr-4 flex items-center text-gray-500">
                      <Star className="mr-1 h-4 w-4" /> 132 likes
                    </span>
                    <span className="mr-4 flex items-center text-gray-500">
                      <MessageCircle className="mr-1 h-4 w-4" /> 43 comments
                    </span>
                    <NavLink to="/" className="text-orange-500">
                      RSVP Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Create Post */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Create Post</h3>
              <div className="mb-3 rounded-lg bg-amber-50 p-3">
                <textarea
                  placeholder="Share your thoughts with the community..."
                  className="h-20 w-full resize-none border-none bg-transparent text-sm text-gray-700 outline-none"
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button className="rounded bg-amber-100 p-1.5 text-amber-700">
                    <Calendar className="h-4 w-4" />
                  </button>
                  <button className="rounded bg-amber-100 p-1.5 text-amber-700">
                    <Users className="h-4 w-4" />
                  </button>
                </div>
                <button className="rounded-full bg-orange-500 px-4 py-1.5 text-sm text-white">
                  Post
                </button>
              </div>
            </div>

            {/* Popular Members */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Popular Members</h3>

              <div className="space-y-3">
                {[
                  {
                    name: 'Swami Krishnananda',
                    role: 'Spiritual Guide',
                    followers: '15K+',
                  },
                  {
                    name: 'Dr. Meera Iyer',
                    role: 'Sanskrit Scholar',
                    followers: '8K+',
                  },
                  {
                    name: 'Ravi Shankar',
                    role: 'Temple Historian',
                    followers: '5K+',
                  },
                ].map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded bg-amber-50 p-3"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-amber-300/60"></div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">{member.name}</p>
                        <p className="text-xs text-gray-500">
                          {member.role} • {member.followers} followers
                        </p>
                      </div>
                    </div>
                    <button className="font-medium text-orange-500">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <NavLink to="/" className="mt-4 flex items-center text-sm text-orange-500">
                See all members <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>

            {/* Suggested Groups */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-serif text-amber-900">Suggested Groups</h3>

              <div className="space-y-3">
                {[
                  {
                    name: 'Sanskrit Learning Circle',
                    members: '387 members',
                  },
                  {
                    name: 'Vegetarian Temple Recipes',
                    members: '1.2K members',
                  },
                  {
                    name: 'Meditation Practice',
                    members: '945 members',
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
                Discover more groups <ChevronRight className="h-4 w-4" />
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
            We're dedicated to building a vibrant community for devotees. The Aaraadhya Community
            page will be launching soon, bringing you closer to temple events, discussions, and
            spiritual connections. Stay tuned!
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

export default Community;
