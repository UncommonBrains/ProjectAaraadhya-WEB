import React, { useState } from "react";
import {
  ShoppingBag,
  Gift,
  ChevronRight,
  Plus,
  Star,
  Filter,
  Heart,
  Mail,
  Search,
} from "lucide-react";
import SearchBar from "../components/searchBar"; 


const TempleStore = () => {
  const [activeTab, setActiveTab] = useState("templeOfferings");

  return (
    <div className="bg-amber-50 min-h-screen font-sans">
                  <SearchBar/>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-serif text-amber-900">Temple Store</h1>
          <p className="text-gray-600 text-sm">
            Support temples and bring divine blessings home
          </p>
        </div>

        {/* Store Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 mb-6">
          <div className="flex border-b border-amber-100 mb-4">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "templeOfferings"
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("templeOfferings")}
            >
              <div className="flex items-center">
                <Gift className="h-4 w-4 mr-2" />
                Temple Offerings
              </div>
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "souvenirs"
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("souvenirs")}
            >
              <div className="flex items-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Souvenirs & Items
              </div>
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex justify-between mb-6">
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search offerings or items..."
                className="w-full bg-amber-50 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-500" />
            </div>
            <button className="bg-amber-100 text-amber-900 rounded-lg px-4 py-2 text-sm flex items-center">
              <Filter className="h-4 w-4 mr-1" /> Filter
            </button>
          </div>

          {/* Temple Offerings Section */}
          {activeTab === "templeOfferings" && (
            <div>
              <div className="mb-6">
                <h3 className="font-serif text-amber-900 text-lg mb-4">
                  Featured Temple Offerings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Featured Package 1 */}
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-amber-900">
                        Maha Abhishekam
                      </h4>
                      <span className="text-amber-800 font-medium">₹1,100</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      Special abhishekam with panchamrut for your chosen deity
                      with priest's blessings sent directly to you.
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-amber-200 rounded-full w-6 h-6"></div>
                        <span className="ml-2 text-xs text-gray-600">
                          Available at 12+ temples
                        </span>
                      </div>
                      <button className="bg-orange-500 text-white rounded-lg px-4 py-1 text-sm">
                        Book Now
                      </button>
                    </div>
                  </div>

                  {/* Featured Package 2 */}
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-amber-900">
                        Diwali Special Pooja
                      </h4>
                      <span className="text-amber-800 font-medium">₹2,100</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      Complete Lakshmi-Ganesh pooja with special diya and
                      prasadam. Book in advance for the auspicious festival.
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-amber-200 rounded-full w-6 h-6"></div>
                        <span className="ml-2 text-xs text-gray-600">
                          Limited availability
                        </span>
                      </div>
                      <button className="bg-orange-500 text-white rounded-lg px-4 py-1 text-sm">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offerings by Temple */}
              <div>
                <h3 className="font-serif text-amber-900 text-lg mb-4">
                  Offerings by Temple
                </h3>
                <div className="space-y-4">
                  {/* Temple 1 */}
                  <div className="bg-white rounded-lg border border-amber-100 overflow-hidden">
                    <div className="p-4 flex items-center">
                      <div className="bg-amber-200 rounded-full w-10 h-10"></div>
                      <div className="ml-3">
                        <h4 className="font-medium text-amber-900">
                          Tirupati Balaji
                        </h4>
                        <div className="flex items-center text-xs text-gray-600">
                          <span>Andhra Pradesh</span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1">4.9</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <div className="grid grid-cols-2 gap-3">
                        {/* Offering 1 */}
                        <div className="bg-amber-50 rounded p-3">
                          <h5 className="font-medium text-sm text-amber-900 mb-1">
                            Archana
                          </h5>
                          <p className="text-gray-600 text-xs mb-2">
                            Personal prayer with sacred chanting
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-amber-800 font-medium text-sm">
                              ₹500
                            </span>
                            <button className="text-orange-500 text-xs font-medium">
                              Add
                            </button>
                          </div>
                        </div>

                        {/* Offering 2 */}
                        <div className="bg-amber-50 rounded p-3">
                          <h5 className="font-medium text-sm text-amber-900 mb-1">
                            Laddu Prasadam
                          </h5>
                          <p className="text-gray-600 text-xs mb-2">
                            Sacred offering sent to your home
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-amber-800 font-medium text-sm">
                              ₹300
                            </span>
                            <button className="text-orange-500 text-xs font-medium">
                              Add
                            </button>
                          </div>
                        </div>
                      </div>

                      <button className="text-orange-500 flex items-center mt-3 text-xs font-medium">
                        View all offerings <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Temple 2 */}
                  <div className="bg-white rounded-lg border border-amber-100 overflow-hidden">
                    <div className="p-4 flex items-center">
                      <div className="bg-amber-200 rounded-full w-10 h-10"></div>
                      <div className="ml-3">
                        <h4 className="font-medium text-amber-900">
                          ISKCON Temple
                        </h4>
                        <div className="flex items-center text-xs text-gray-600">
                          <span>Multiple Locations</span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1">4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <div className="grid grid-cols-2 gap-3">
                        {/* Offering 1 */}
                        <div className="bg-amber-50 rounded p-3">
                          <h5 className="font-medium text-sm text-amber-900 mb-1">
                            Maha Pooja
                          </h5>
                          <p className="text-gray-600 text-xs mb-2">
                            Complete ritual with holy items
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-amber-800 font-medium text-sm">
                              ₹1,100
                            </span>
                            <button className="text-orange-500 text-xs font-medium">
                              Add
                            </button>
                          </div>
                        </div>

                        {/* Offering 2 */}
                        <div className="bg-amber-50 rounded p-3">
                          <h5 className="font-medium text-sm text-amber-900 mb-1">
                            Bhagavad Gita Set
                          </h5>
                          <p className="text-gray-600 text-xs mb-2">
                            Sacred text with prasadam
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-amber-800 font-medium text-sm">
                              ₹850
                            </span>
                            <button className="text-orange-500 text-xs font-medium">
                              Add
                            </button>
                          </div>
                        </div>
                      </div>

                      <button className="text-orange-500 flex items-center mt-3 text-xs font-medium">
                        View all offerings <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <button className="text-orange-500 flex items-center justify-center w-full mt-4 text-sm font-medium">
                  View all temples <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Souvenirs & Items Section */}
          {activeTab === "souvenirs" && (
            <div>
              {/* Featured Collections */}
              <div className="mb-6">
                <h3 className="font-serif text-amber-900 text-lg mb-4">
                  Featured Collections
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Collection 1 */}
                  <div className="bg-amber-100/50 rounded-lg p-3 text-center">
                    <div className="bg-amber-200 h-24 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-amber-800 font-serif">Idols</span>
                    </div>
                    <h4 className="text-sm font-medium text-amber-900">
                      Sacred Idols
                    </h4>
                  </div>

                  {/* Collection 2 */}
                  <div className="bg-amber-100/50 rounded-lg p-3 text-center">
                    <div className="bg-amber-200 h-24 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-amber-800 font-serif">Books</span>
                    </div>
                    <h4 className="text-sm font-medium text-amber-900">
                      Religious Texts
                    </h4>
                  </div>

                  {/* Collection 3 */}
                  <div className="bg-amber-100/50 rounded-lg p-3 text-center">
                    <div className="bg-amber-200 h-24 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-amber-800 font-serif">Pooja</span>
                    </div>
                    <h4 className="text-sm font-medium text-amber-900">
                      Pooja Items
                    </h4>
                  </div>

                  {/* Collection 4 */}
                  <div className="bg-amber-100/50 rounded-lg p-3 text-center">
                    <div className="bg-amber-200 h-24 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-amber-800 font-serif">Jewelry</span>
                    </div>
                    <h4 className="text-sm font-medium text-amber-900">
                      Devotional Jewelry
                    </h4>
                  </div>
                </div>
              </div>

              {/* Popular Items */}
              <div>
                <h3 className="font-serif text-amber-900 text-lg mb-4">
                  Popular Items
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Item 1 */}
                  <div className="bg-white rounded-lg border border-amber-100 overflow-hidden">
                    <div className="relative">
                      <div className="bg-amber-200 h-40 flex items-center justify-center">
                        <span className="text-amber-800 font-serif">
                          Ganesha Idol
                        </span>
                      </div>
                      <button className="absolute top-2 right-2 bg-white rounded-full p-1.5">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm text-amber-900 mb-1">
                        Brass Ganesha Idol
                      </h4>
                      <div className="flex items-center mb-2">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-600 ml-1">4.8</span>
                        <span className="text-xs text-gray-500 ml-2">
                          (120 reviews)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-800 font-medium">
                          ₹1,250
                        </span>
                        <button className="bg-orange-500 text-white rounded-lg px-3 py-1 text-xs">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-white rounded-lg border border-amber-100 overflow-hidden">
                    <div className="relative">
                      <div className="bg-amber-200 h-40 flex items-center justify-center">
                        <span className="text-amber-800 font-serif">
                          Pooja Thali
                        </span>
                      </div>
                      <button className="absolute top-2 right-2 bg-white rounded-full p-1.5">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm text-amber-900 mb-1">
                        Silver Plated Pooja Thali Set
                      </h4>
                      <div className="flex items-center mb-2">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-600 ml-1">4.7</span>
                        <span className="text-xs text-gray-500 ml-2">
                          (85 reviews)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-800 font-medium">₹950</span>
                        <button className="bg-orange-500 text-white rounded-lg px-3 py-1 text-xs">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="bg-white rounded-lg border border-amber-100 overflow-hidden">
                    <div className="relative">
                      <div className="bg-amber-200 h-40 flex items-center justify-center">
                        <span className="text-amber-800 font-serif">
                          Rudraksha
                        </span>
                      </div>
                      <button className="absolute top-2 right-2 bg-white rounded-full p-1.5">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm text-amber-900 mb-1">
                        5 Mukhi Rudraksha Mala
                      </h4>
                      <div className="flex items-center mb-2">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-600 ml-1">4.9</span>
                        <span className="text-xs text-gray-500 ml-2">
                          (210 reviews)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-800 font-medium">
                          ₹1,500
                        </span>
                        <button className="bg-orange-500 text-white rounded-lg px-3 py-1 text-xs">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="bg-white rounded-lg border border-amber-100 overflow-hidden">
                    <div className="relative">
                      <div className="bg-amber-200 h-40 flex items-center justify-center">
                        <span className="text-amber-800 font-serif">Book</span>
                      </div>
                      <button className="absolute top-2 right-2 bg-white rounded-full p-1.5">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm text-amber-900 mb-1">
                        Bhagavad Gita Hardcover
                      </h4>
                      <div className="flex items-center mb-2">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-600 ml-1">4.9</span>
                        <span className="text-xs text-gray-500 ml-2">
                          (350 reviews)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-800 font-medium">₹450</span>
                        <button className="bg-orange-500 text-white rounded-lg px-3 py-1 text-xs">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="bg-white rounded-lg border border-amber-100 overflow-hidden">
                    <div className="relative">
                      <div className="bg-amber-200 h-40 flex items-center justify-center">
                        <span className="text-amber-800 font-serif">Diya</span>
                      </div>
                      <button className="absolute top-2 right-2 bg-white rounded-full p-1.5">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm text-amber-900 mb-1">
                        Brass Diya Set (Set of 5)
                      </h4>
                      <div className="flex items-center mb-2">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-600 ml-1">4.6</span>
                        <span className="text-xs text-gray-500 ml-2">
                          (78 reviews)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-800 font-medium">₹850</span>
                        <button className="bg-orange-500 text-white rounded-lg px-3 py-1 text-xs">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item 6 */}
                  <div className="bg-white rounded-lg border border-amber-100 overflow-hidden">
                    <div className="relative">
                      <div className="bg-amber-200 h-40 flex items-center justify-center">
                        <span className="text-amber-800 font-serif">
                          Incense
                        </span>
                      </div>
                      <button className="absolute top-2 right-2 bg-white rounded-full p-1.5">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm text-amber-900 mb-1">
                        Premium Sandalwood Incense Sticks
                      </h4>
                      <div className="flex items-center mb-2">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-600 ml-1">4.8</span>
                        <span className="text-xs text-gray-500 ml-2">
                          (120 reviews)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-800 font-medium">₹350</span>
                        <button className="bg-orange-500 text-white rounded-lg px-3 py-1 text-xs">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="text-orange-500 flex items-center justify-center w-full mt-4 text-sm font-medium">
                  View all items <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recently Viewed Section */}
        <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 mb-6">
          <h3 className="font-serif text-amber-900 mb-4">Recently Viewed</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Recent Item 1 */}
            <div className="bg-amber-50 rounded p-3 flex">
              <div className="bg-amber-200 rounded w-12 h-12 flex items-center justify-center">
                <span className="text-amber-800 font-serif text-xs">Idol</span>
              </div>
              <div className="ml-3">
                <p className="text-gray-700 text-sm font-medium">
                  Krishna Idol
                </p>
                <p className="text-amber-800 text-xs font-medium">₹850</p>
              </div>
            </div>

            {/* Recent Item 2 */}
            <div className="bg-amber-50 rounded p-3 flex">
              <div className="bg-amber-200 rounded w-12 h-12 flex items-center justify-center">
                <span className="text-amber-800 font-serif text-xs">Pooja</span>
              </div>
              <div className="ml-3">
                <p className="text-gray-700 text-sm font-medium">
                  Navratri Special
                </p>
                <p className="text-amber-800 text-xs font-medium">₹1,100</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="bg-amber-100/70 rounded-lg p-6 text-center mb-6">
          <h3 className="font-serif text-amber-900 text-lg mb-2">
            Stay Updated with Temple Offerings
          </h3>
          <p className="text-gray-700 text-sm mb-4">
            Subscribe to receive notifications about special poojas and limited
            items.
          </p>
          <div className="flex max-w-md mx-auto">
            <div className="relative flex-grow mr-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none"
              />
              <Mail className="absolute left-3 top-2 h-4 w-4 text-gray-500" />
            </div>
            <button className="bg-orange-500 text-white rounded-lg px-4 py-2 text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-orange-500 h-12 w-12 rounded-full flex items-center justify-center text-white shadow-lg">
          <ShoppingBag className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default TempleStore;