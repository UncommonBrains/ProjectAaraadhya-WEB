import React from "react";
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
  Bell
} from "lucide-react";
import SearchBar from "../components/searchBar";

const Community = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans relative">
      {/* Original Component would render here */}

      <div className="bg-amber-50 min-h-screen font-sans">
        <SearchBar />

        {/* Main Content */}
        <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Community Header */}
            <div>
              <h2 className="text-xl font-serif text-amber-900">
                Spiritual Community
              </h2>
              <p className="text-gray-600 text-sm">
                Connect with devotees across India
              </p>
            </div>

            {/* My Groups */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">My Groups</h3>
              <ul className="space-y-4">
                {[
                  {
                    name: "Vedic Philosophy Discussion",
                    members: "143 active members",
                  },
                  {
                    name: "Temple Photography Group",
                    members: "89 active members",
                  },
                  {
                    name: "Bhajan Lovers",
                    members: "215 active members",
                  },
                  {
                    name: "Pilgrimage Planning",
                    members: "67 active members",
                  },
                ].map((group, index) => (
                  <li key={index} className="flex items-center">
                    <div className="bg-amber-100 rounded-full w-8 h-8 flex items-center justify-center">
                      <Users className="h-4 w-4 text-amber-700" />
                    </div>
                    <div className="ml-3">
                      <span className="text-gray-700 block text-sm">
                        {group.name}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {group.members}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                See all my groups <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Community Events */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Community Events
              </h3>

              <div className="space-y-3">
                <div className="bg-amber-50 rounded p-3 flex justify-between items-center">
                  <div className="flex">
                    <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500 font-medium">
                      23
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700 text-sm font-medium">
                        Bhagavad Gita Discussion
                      </p>
                      <p className="text-gray-500 text-xs">
                        March 23, 5:30 PM • Online
                      </p>
                    </div>
                  </div>
                  <div className="bg-orange-100 rounded-md p-1">
                    <Bookmark className="h-4 w-4 text-orange-500" />
                  </div>
                </div>

                <div className="bg-amber-50 rounded p-3 flex justify-between items-center">
                  <div className="flex">
                    <div className="bg-orange-100 rounded w-8 h-8 flex items-center justify-center text-orange-500 font-medium">
                      28
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700 text-sm font-medium">
                        Devotional Music Workshop
                      </p>
                      <p className="text-gray-500 text-xs">
                        March 28, 3:00 PM • ISKCON
                      </p>
                    </div>
                  </div>
                  <div className="bg-orange-100 rounded-md p-1">
                    <Bookmark className="h-4 w-4 text-orange-500" />
                  </div>
                </div>
              </div>

              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                View all events <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Active Forums */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">Active Forums</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 text-orange-500 mr-2" />
                    Navratri Preparations
                  </p>
                  <p className="text-gray-500 text-xs">45 new posts today</p>
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 text-orange-500 mr-2" />
                    Temple Cuisines
                  </p>
                  <p className="text-gray-500 text-xs">22 new posts today</p>
                </div>
              </div>
              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                Browse all forums <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Center Column (Community Feed) - Takes 2 columns in the 4-column grid */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h2 className="font-serif text-amber-900 text-lg mb-4">
                Community Feed
              </h2>

              {/* Search Bar */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search discussions, posts, and members..."
                  className="w-full bg-amber-50 border border-amber-100 rounded-full py-2 pl-10 pr-4 text-sm text-gray-700"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              </div>

              {/* Feed Filters */}
              <div className="flex space-x-3 mb-6 text-sm overflow-x-auto">
                <button className="bg-orange-500 text-white px-4 py-1 rounded-full">
                  All Posts
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Discussions
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Questions
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Resources
                </button>
                <button className="bg-amber-50 text-gray-600 px-4 py-1 rounded-full">
                  Announcements
                </button>
              </div>

              {/* Community Posts */}
              <div className="space-y-6">
                {/* Post 1 */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">
                        Anjali Sharma
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        Posted in Vedic Philosophy Discussion
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">
                      1 hour ago
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">
                    Has anyone read "The Bhagavad Gita As It Is" translation by
                    Srila Prabhupada? I'm looking for a study group to discuss
                    the teachings in depth. I find the concepts of karma yoga
                    particularly interesting.
                  </p>

                  <div className="flex text-sm">
                    <span className="text-gray-500 mr-4 flex items-center">
                      <Star className="h-4 w-4 mr-1" /> 24 likes
                    </span>
                    <span className="text-gray-500 mr-4 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" /> 8 comments
                    </span>
                    <a href="/" className="text-orange-500">
                      Join Discussion
                    </a>
                  </div>
                </div>

                {/* Post 2 */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">
                        Vikram Patel
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        Posted in Temple Photography Group
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">
                      3 hours ago
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">
                    Sharing some photos from my recent visit to Kanchipuram
                    temples. The architecture is absolutely magnificent! I
                    especially loved the intricate carvings on the gopuram.
                  </p>

                  <div className="bg-amber-200/30 rounded flex flex-row space-x-2 mb-3 p-2">
                    <div className="h-24 flex-1 rounded bg-amber-300/30 flex items-center justify-center">
                      <span className="text-amber-800 font-serif">Photo 1</span>
                    </div>
                    <div className="h-24 flex-1 rounded bg-amber-300/30 flex items-center justify-center">
                      <span className="text-amber-800 font-serif">Photo 2</span>
                    </div>
                    <div className="h-24 flex-1 rounded bg-amber-300/30 flex items-center justify-center">
                      <span className="text-amber-800 font-serif">Photo 3</span>
                    </div>
                  </div>

                  <div className="flex text-sm">
                    <span className="text-gray-500 mr-4 flex items-center">
                      <Star className="h-4 w-4 mr-1" /> 56 likes
                    </span>
                    <span className="text-gray-500 mr-4 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" /> 17 comments
                    </span>
                    <a href="/" className="text-orange-500">
                      See All Photos
                    </a>
                  </div>
                </div>

                {/* Post 3 */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 rounded-full w-8 h-8"></div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-700">
                        ISKCON Temple (Official)
                      </span>
                      <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">
                      Yesterday
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">
                    We're organizing a special community kirtan and prasadam
                    distribution this weekend. Everyone is welcome to join!
                    Please RSVP so we can make arrangements accordingly.
                  </p>

                  <div className="bg-amber-200/30 rounded h-32 flex items-center justify-center mb-3">
                    <span className="text-amber-800 font-serif">
                      Event Poster
                    </span>
                  </div>

                  <div className="flex text-sm">
                    <span className="text-gray-500 mr-4 flex items-center">
                      <Star className="h-4 w-4 mr-1" /> 132 likes
                    </span>
                    <span className="text-gray-500 mr-4 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" /> 43 comments
                    </span>
                    <a href="/" className="text-orange-500">
                      RSVP Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">Create Post</h3>
              <div className="bg-amber-50 rounded-lg p-3 mb-3">
                <textarea
                  placeholder="Share your thoughts with the community..."
                  className="w-full bg-transparent border-none text-gray-700 text-sm resize-none outline-none h-20"
                ></textarea>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="bg-amber-100 p-1.5 rounded text-amber-700">
                    <Calendar className="h-4 w-4" />
                  </button>
                  <button className="bg-amber-100 p-1.5 rounded text-amber-700">
                    <Users className="h-4 w-4" />
                  </button>
                </div>
                <button className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm">
                  Post
                </button>
              </div>
            </div>

            {/* Popular Members */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Popular Members
              </h3>

              <div className="space-y-3">
                {[
                  {
                    name: "Swami Krishnananda",
                    role: "Spiritual Guide",
                    followers: "15K+",
                  },
                  {
                    name: "Dr. Meera Iyer",
                    role: "Sanskrit Scholar",
                    followers: "8K+",
                  },
                  {
                    name: "Ravi Shankar",
                    role: "Temple Historian",
                    followers: "5K+",
                  },
                ].map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-amber-50 rounded p-3 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="bg-amber-300/60 rounded-full w-8 h-8"></div>
                      <div className="ml-3">
                        <p className="text-gray-700 text-sm font-medium">
                          {member.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {member.role} • {member.followers} followers
                        </p>
                      </div>
                    </div>
                    <button className="text-orange-500 font-medium">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                See all members <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Suggested Groups */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4">
              <h3 className="font-serif text-amber-900 mb-4">
                Suggested Groups
              </h3>

              <div className="space-y-3">
                {[
                  {
                    name: "Sanskrit Learning Circle",
                    members: "387 members",
                  },
                  {
                    name: "Vegetarian Temple Recipes",
                    members: "1.2K members",
                  },
                  {
                    name: "Meditation Practice",
                    members: "945 members",
                  },
                ].map((group, idx) => (
                  <div
                    key={idx}
                    className="bg-amber-50 rounded p-3 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="bg-amber-300/60 rounded-full w-8 h-8 flex items-center justify-center">
                        <Users className="h-4 w-4 text-amber-700" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700 text-sm font-medium">
                          {group.name}
                        </p>
                        <p className="text-gray-500 text-xs">{group.members}</p>
                      </div>
                    </div>
                    <button className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Join
                    </button>
                  </div>
                ))}
              </div>

              <a
                href="/"
                className="text-orange-500 flex items-center mt-4 text-sm"
              >
                Discover more groups <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </main>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <button className="bg-orange-500 h-12 w-12 rounded-full flex items-center justify-center text-white shadow-lg">
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>
      {/* Overlay Layer */}
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 p-4 rounded-full">
              <Calendar className="h-12 w-12 text-orange-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Coming Soon!
          </h2>

          <p className="text-gray-600 mb-6">
          We're dedicated to building a vibrant community for devotees. The Aaraadhya Community page will be launching soon, bringing you closer to temple events, discussions, and spiritual connections. Stay tuned!
          </p>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mb-6">
            <h3 className="font-medium text-amber-900 mb-2">
              Get notified when we launch
            </h3>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md flex items-center">
                <Bell className="h-4 w-4 mr-2" /> Notify Me
              </button>
            </div>
          </div>

          <button
            className="text-orange-600 hover:text-orange-700 font-medium"
            onClick={() => (window.location.href = "/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
