import { useState } from 'react';
import { ShoppingBag, Gift, ChevronRight, Star, Filter, Heart, Mail, Search } from 'lucide-react';

const TempleStore = () => {
  const [activeTab, setActiveTab] = useState('templeOfferings');

  return (
    <div className="min-h-screen bg-amber-50 font-sans">

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-serif text-2xl text-amber-900">Temple Store</h1>
          <p className="text-sm text-gray-600">Support temples and bring divine blessings home</p>
        </div>

        {/* Store Tabs */}
        <div className="mb-6 rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex border-b border-amber-100">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'templeOfferings'
                  ? 'border-b-2 border-orange-500 text-orange-500'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('templeOfferings')}
            >
              <div className="flex items-center">
                <Gift className="mr-2 h-4 w-4" />
                Temple Offerings
              </div>
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'souvenirs'
                  ? 'border-b-2 border-orange-500 text-orange-500'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('souvenirs')}
            >
              <div className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Souvenirs & Items
              </div>
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6 flex justify-between">
            <div className="relative mr-4 flex-grow">
              <input
                type="text"
                placeholder="Search offerings or items..."
                className="w-full rounded-lg bg-amber-50 py-2 pr-4 pl-10 text-sm focus:outline-none"
              />
              <Search className="absolute top-2 left-3 h-4 w-4 text-gray-500" />
            </div>
            <button className="flex items-center rounded-lg bg-amber-100 px-4 py-2 text-sm text-amber-900">
              <Filter className="mr-1 h-4 w-4" /> Filter
            </button>
          </div>

          {/* Temple Offerings Section */}
          {activeTab === 'templeOfferings' && (
            <div>
              <div className="mb-6">
                <h3 className="mb-4 font-serif text-lg text-amber-900">
                  Featured Temple Offerings
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Featured Package 1 */}
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <div className="mb-2 flex justify-between">
                      <h4 className="font-medium text-amber-900">Maha Abhishekam</h4>
                      <span className="font-medium text-amber-800">₹1,100</span>
                    </div>
                    <p className="mb-3 text-sm text-gray-600">
                      Special abhishekam with panchamrut for your chosen deity with priest's
                      blessings sent directly to you.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-amber-200"></div>
                        <span className="ml-2 text-xs text-gray-600">Available at 12+ temples</span>
                      </div>
                      <button className="rounded-lg bg-orange-500 px-4 py-1 text-sm text-white">
                        Book Now
                      </button>
                    </div>
                  </div>

                  {/* Featured Package 2 */}
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <div className="mb-2 flex justify-between">
                      <h4 className="font-medium text-amber-900">Diwali Special Pooja</h4>
                      <span className="font-medium text-amber-800">₹2,100</span>
                    </div>
                    <p className="mb-3 text-sm text-gray-600">
                      Complete Lakshmi-Ganesh pooja with special diya and prasadam. Book in advance
                      for the auspicious festival.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-amber-200"></div>
                        <span className="ml-2 text-xs text-gray-600">Limited availability</span>
                      </div>
                      <button className="rounded-lg bg-orange-500 px-4 py-1 text-sm text-white">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offerings by Temple */}
              <div>
                <h3 className="mb-4 font-serif text-lg text-amber-900">Offerings by Temple</h3>
                <div className="space-y-4">
                  {/* Temple 1 */}
                  <div className="overflow-hidden rounded-lg border border-amber-100 bg-white">
                    <div className="flex items-center p-4">
                      <div className="h-10 w-10 rounded-full bg-amber-200"></div>
                      <div className="ml-3">
                        <h4 className="font-medium text-amber-900">Tirupati Balaji</h4>
                        <div className="flex items-center text-xs text-gray-600">
                          <span>Andhra Pradesh</span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            <span className="ml-1">4.9</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <div className="grid grid-cols-2 gap-3">
                        {/* Offering 1 */}
                        <div className="rounded bg-amber-50 p-3">
                          <h5 className="mb-1 text-sm font-medium text-amber-900">Archana</h5>
                          <p className="mb-2 text-xs text-gray-600">
                            Personal prayer with sacred chanting
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-amber-800">₹500</span>
                            <button className="text-xs font-medium text-orange-500">Add</button>
                          </div>
                        </div>

                        {/* Offering 2 */}
                        <div className="rounded bg-amber-50 p-3">
                          <h5 className="mb-1 text-sm font-medium text-amber-900">
                            Laddu Prasadam
                          </h5>
                          <p className="mb-2 text-xs text-gray-600">
                            Sacred offering sent to your home
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-amber-800">₹300</span>
                            <button className="text-xs font-medium text-orange-500">Add</button>
                          </div>
                        </div>
                      </div>

                      <button className="mt-3 flex items-center text-xs font-medium text-orange-500">
                        View all offerings <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Temple 2 */}
                  <div className="overflow-hidden rounded-lg border border-amber-100 bg-white">
                    <div className="flex items-center p-4">
                      <div className="h-10 w-10 rounded-full bg-amber-200"></div>
                      <div className="ml-3">
                        <h4 className="font-medium text-amber-900">ISKCON Temple</h4>
                        <div className="flex items-center text-xs text-gray-600">
                          <span>Multiple Locations</span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            <span className="ml-1">4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <div className="grid grid-cols-2 gap-3">
                        {/* Offering 1 */}
                        <div className="rounded bg-amber-50 p-3">
                          <h5 className="mb-1 text-sm font-medium text-amber-900">Maha Pooja</h5>
                          <p className="mb-2 text-xs text-gray-600">
                            Complete ritual with holy items
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-amber-800">₹1,100</span>
                            <button className="text-xs font-medium text-orange-500">Add</button>
                          </div>
                        </div>

                        {/* Offering 2 */}
                        <div className="rounded bg-amber-50 p-3">
                          <h5 className="mb-1 text-sm font-medium text-amber-900">
                            Bhagavad Gita Set
                          </h5>
                          <p className="mb-2 text-xs text-gray-600">Sacred text with prasadam</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-amber-800">₹850</span>
                            <button className="text-xs font-medium text-orange-500">Add</button>
                          </div>
                        </div>
                      </div>

                      <button className="mt-3 flex items-center text-xs font-medium text-orange-500">
                        View all offerings <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <button className="mt-4 flex w-full items-center justify-center text-sm font-medium text-orange-500">
                  View all temples <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Souvenirs & Items Section */}
          {activeTab === 'souvenirs' && (
            <div>
              {/* Featured Collections */}
              <div className="mb-6">
                <h3 className="mb-4 font-serif text-lg text-amber-900">Featured Collections</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {/* Collection 1 */}
                  <div className="rounded-lg bg-amber-100/50 p-3 text-center">
                    <div className="mb-2 flex h-24 items-center justify-center rounded-lg bg-amber-200">
                      <span className="font-serif text-amber-800">Idols</span>
                    </div>
                    <h4 className="text-sm font-medium text-amber-900">Sacred Idols</h4>
                  </div>

                  {/* Collection 2 */}
                  <div className="rounded-lg bg-amber-100/50 p-3 text-center">
                    <div className="mb-2 flex h-24 items-center justify-center rounded-lg bg-amber-200">
                      <span className="font-serif text-amber-800">Books</span>
                    </div>
                    <h4 className="text-sm font-medium text-amber-900">Religious Texts</h4>
                  </div>

                  {/* Collection 3 */}
                  <div className="rounded-lg bg-amber-100/50 p-3 text-center">
                    <div className="mb-2 flex h-24 items-center justify-center rounded-lg bg-amber-200">
                      <span className="font-serif text-amber-800">Pooja</span>
                    </div>
                    <h4 className="text-sm font-medium text-amber-900">Pooja Items</h4>
                  </div>

                  {/* Collection 4 */}
                  <div className="rounded-lg bg-amber-100/50 p-3 text-center">
                    <div className="mb-2 flex h-24 items-center justify-center rounded-lg bg-amber-200">
                      <span className="font-serif text-amber-800">Jewelry</span>
                    </div>
                    <h4 className="text-sm font-medium text-amber-900">Devotional Jewelry</h4>
                  </div>
                </div>
              </div>

              {/* Popular Items */}
              <div>
                <h3 className="mb-4 font-serif text-lg text-amber-900">Popular Items</h3>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {/* Item 1 */}
                  <div className="overflow-hidden rounded-lg border border-amber-100 bg-white">
                    <div className="relative">
                      <div className="flex h-40 items-center justify-center bg-amber-200">
                        <span className="font-serif text-amber-800">Ganesha Idol</span>
                      </div>
                      <button className="absolute top-2 right-2 rounded-full bg-white p-1.5">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="mb-1 text-sm font-medium text-amber-900">
                        Brass Ganesha Idol
                      </h4>
                      <div className="mb-2 flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="ml-1 text-xs text-gray-600">4.8</span>
                        <span className="ml-2 text-xs text-gray-500">(120 reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-amber-800">₹1,250</span>
                        <button className="rounded-lg bg-orange-500 px-3 py-1 text-xs text-white">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="overflow-hidden rounded-lg border border-amber-100 bg-white">
                    <div className="relative">
                      <div className="flex h-40 items-center justify-center bg-amber-200">
                        <span className="font-serif text-amber-800">Pooja Thali</span>
                      </div>
                      <button className="absolute top-2 right-2 rounded-full bg-white p-1.5">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="mb-1 text-sm font-medium text-amber-900">
                        Silver Plated Pooja Thali Set
                      </h4>
                      <div className="mb-2 flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="ml-1 text-xs text-gray-600">4.7</span>
                        <span className="ml-2 text-xs text-gray-500">(85 reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-amber-800">₹950</span>
                        <button className="rounded-lg bg-orange-500 px-3 py-1 text-xs text-white">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="overflow-hidden rounded-lg border border-amber-100 bg-white">
                    <div className="relative">
                      <div className="flex h-40 items-center justify-center bg-amber-200">
                        <span className="font-serif text-amber-800">Rudraksha</span>
                      </div>
                      <button className="absolute top-2 right-2 rounded-full bg-white p-1.5">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="mb-1 text-sm font-medium text-amber-900">
                        5 Mukhi Rudraksha Mala
                      </h4>
                      <div className="mb-2 flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="ml-1 text-xs text-gray-600">4.9</span>
                        <span className="ml-2 text-xs text-gray-500">(210 reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-amber-800">₹1,500</span>
                        <button className="rounded-lg bg-orange-500 px-3 py-1 text-xs text-white">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="overflow-hidden rounded-lg border border-amber-100 bg-white">
                    <div className="relative">
                      <div className="flex h-40 items-center justify-center bg-amber-200">
                        <span className="font-serif text-amber-800">Book</span>
                      </div>
                      <button className="absolute top-2 right-2 rounded-full bg-white p-1.5">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="mb-1 text-sm font-medium text-amber-900">
                        Bhagavad Gita Hardcover
                      </h4>
                      <div className="mb-2 flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="ml-1 text-xs text-gray-600">4.9</span>
                        <span className="ml-2 text-xs text-gray-500">(350 reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-amber-800">₹450</span>
                        <button className="rounded-lg bg-orange-500 px-3 py-1 text-xs text-white">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="overflow-hidden rounded-lg border border-amber-100 bg-white">
                    <div className="relative">
                      <div className="flex h-40 items-center justify-center bg-amber-200">
                        <span className="font-serif text-amber-800">Diya</span>
                      </div>
                      <button className="absolute top-2 right-2 rounded-full bg-white p-1.5">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="mb-1 text-sm font-medium text-amber-900">
                        Brass Diya Set (Set of 5)
                      </h4>
                      <div className="mb-2 flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="ml-1 text-xs text-gray-600">4.6</span>
                        <span className="ml-2 text-xs text-gray-500">(78 reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-amber-800">₹850</span>
                        <button className="rounded-lg bg-orange-500 px-3 py-1 text-xs text-white">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item 6 */}
                  <div className="overflow-hidden rounded-lg border border-amber-100 bg-white">
                    <div className="relative">
                      <div className="flex h-40 items-center justify-center bg-amber-200">
                        <span className="font-serif text-amber-800">Incense</span>
                      </div>
                      <button className="absolute top-2 right-2 rounded-full bg-white p-1.5">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="mb-1 text-sm font-medium text-amber-900">
                        Premium Sandalwood Incense Sticks
                      </h4>
                      <div className="mb-2 flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="ml-1 text-xs text-gray-600">4.8</span>
                        <span className="ml-2 text-xs text-gray-500">(120 reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-amber-800">₹350</span>
                        <button className="rounded-lg bg-orange-500 px-3 py-1 text-xs text-white">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="mt-4 flex w-full items-center justify-center text-sm font-medium text-orange-500">
                  View all items <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recently Viewed Section */}
        <div className="mb-6 rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
          <h3 className="mb-4 font-serif text-amber-900">Recently Viewed</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* Recent Item 1 */}
            <div className="flex rounded bg-amber-50 p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-amber-200">
                <span className="font-serif text-xs text-amber-800">Idol</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Krishna Idol</p>
                <p className="text-xs font-medium text-amber-800">₹850</p>
              </div>
            </div>

            {/* Recent Item 2 */}
            <div className="flex rounded bg-amber-50 p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-amber-200">
                <span className="font-serif text-xs text-amber-800">Pooja</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Navratri Special</p>
                <p className="text-xs font-medium text-amber-800">₹1,100</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="mb-6 rounded-lg bg-amber-100/70 p-6 text-center">
          <h3 className="mb-2 font-serif text-lg text-amber-900">
            Stay Updated with Temple Offerings
          </h3>
          <p className="mb-4 text-sm text-gray-700">
            Subscribe to receive notifications about special poojas and limited items.
          </p>
          <div className="mx-auto flex max-w-md">
            <div className="relative mr-2 flex-grow">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg bg-white py-2 pr-4 pl-10 text-sm focus:outline-none"
              />
              <Mail className="absolute top-2 left-3 h-4 w-4 text-gray-500" />
            </div>
            <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm text-white">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      {/* Floating Cart Button */}
      <div className="fixed right-6 bottom-6">
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg">
          <ShoppingBag className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default TempleStore;
