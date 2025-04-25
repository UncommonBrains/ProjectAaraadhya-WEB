import { useState } from 'react';
import { Star, Heart, Mail, Search, Home, ShoppingCart, Calendar, Bell } from 'lucide-react';
import { products } from '../../../mock/data/products';
import { NavLink, useNavigate } from 'react-router-dom';

const DevoteeStore = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTemple, setSelectedTemple] = useState('all');
  const [cartCount, setCartCount] = useState(0);

  // Sample categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'poojas', name: 'Poojas & Rituals' },
    { id: 'prasadam', name: 'Prasadam' },
    { id: 'idols', name: 'Deities & Idols' },
    { id: 'pooja-items', name: 'Pooja Items' },
    { id: 'garlands', name: 'Garlands & Flowers' },
    { id: 'books', name: 'Religious Books' },
    { id: 'jewelry', name: 'Devotional Jewelry' },
    { id: 'home-decor', name: 'Temple-inspired Decor' },
  ];

  // Sample temples
  const temples = [
    { id: 'all', name: 'All Temples' },
    { id: 'tirupati', name: 'Tirupati Balaji' },
    { id: 'iskcon', name: 'ISKCON Temple' },
    { id: 'kashi', name: 'Kashi Vishwanath' },
    { id: 'meenakshi', name: 'Meenakshi Temple' },
    { id: 'golden', name: 'Golden Temple' },
    { id: 'somnath', name: 'Somnath Temple' },
  ];

  // Filter products based on selected category and temple
  const filteredProducts = products.filter((product) => {
    const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
    const templeMatch =
      selectedTemple === 'all' ||
      product.temple === selectedTemple ||
      product.temple === 'All Temples';
    return categoryMatch && templeMatch;
  });

  // Add to cart handler
  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 font-sans">
      {/* Original Component would render here */}

      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-orange-600 p-4 text-white">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <NavLink
                  to="/"
                  className="text-s flex items-center border-r-2 pr-3 font-semibold whitespace-nowrap"
                >
                  <Home className="mr-1 ml-2 h-5 w-5" strokeWidth={3} /> Aaraadhya Home
                </NavLink>

                <h1 className="text-xl font-bold">DevoteeStore</h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative pr-4 pl-3">
                  <ShoppingCart className="h-7 w-7" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-orange-800">
                      {cartCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="relative mb-3 flex-grow bg-orange-600 p-2 text-white">
          <input
            type="text"
            placeholder="Search for temple offerings, items, prasadam..."
            className="w-full rounded-md px-4 py-2 text-sm text-gray-800"
          />
          <Search className="absolute top-4 right-6 h-5 w-5 text-gray-500" />
        </div>

        {/* Navigation */}
        <nav className="top-12 z-50 bg-orange-700 py-2 text-white shadow-md">
          <div className="container mx-auto">
            <div className="ml-6 flex items-center space-x-6 overflow-x-auto pb-1 text-sm">
              <NavLink to="/" className="font-medium whitespace-nowrap">
                Best Sellers
              </NavLink>
              <NavLink to="/" className="whitespace-nowrap">
                Today's Deals
              </NavLink>
              <NavLink to="/" className="whitespace-nowrap">
                New Releases
              </NavLink>
              <NavLink to="/" className="whitespace-nowrap">
                Festival Specials
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-4">
          {/* Hero Banner */}
          <div className="relative mb-6 overflow-hidden rounded-lg bg-amber-100 p-6">
            <div className="relative z-10 max-w-2xl">
              <h2 className="mb-2 font-serif text-2xl text-amber-900">
                Support Temples. Receive Divine Blessings.
              </h2>
              <p className="mb-4 text-amber-800">
                Book poojas, order prasadam, and shop for authentic temple items. All offerings are
                performed by temple priests and delivered to your doorstep.
              </p>
              <button className="rounded-md bg-orange-500 px-4 py-2 font-medium text-white">
                Explore Temple Offerings
              </button>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/3 bg-amber-200 opacity-50"></div>
          </div>

          <div>
            <div className="mb-6 rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              {/* Featured Collections */}
              <div className="mb-6">
                <h3 className="mb-4 font-serif text-lg text-amber-900">Collections</h3>
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
            </div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row">
            {/* Sidebar - Categories */}
            <div className="w-full flex-shrink-0 md:w-64">
              <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-bold text-gray-800">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        className={`w-full rounded-md px-2 py-1.5 text-left text-sm ${
                          activeCategory === category.id
                            ? 'bg-orange-100 font-medium text-orange-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-bold text-gray-800">Filter by Temple</h3>
                <ul className="space-y-2">
                  {temples.map((temple) => (
                    <li key={temple.id}>
                      <button
                        className={`w-full rounded-md px-2 py-1.5 text-left text-sm ${
                          selectedTemple === temple.id
                            ? 'bg-orange-100 font-medium text-orange-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedTemple(temple.id)}
                      >
                        {temple.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-bold text-gray-800">Price Range</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <button className="hover:text-orange-600">Under ₹500</button>
                  </li>
                  <li>
                    <button className="hover:text-orange-600">₹500 - ₹1,000</button>
                  </li>
                  <li>
                    <button className="hover:text-orange-600">₹1,000 - ₹2,000</button>
                  </li>
                  <li>
                    <button className="hover:text-orange-600">₹2,000 & Above</button>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-orange-100 bg-orange-50 p-4 shadow-sm">
                <h3 className="mb-3 font-bold text-amber-900">Need Help?</h3>
                <p className="mb-3 text-sm text-gray-700">
                  Our devotee support team is available to assist you with any questions about
                  temple offerings.
                </p>
                <button className="w-full rounded-md bg-orange-500 px-3 py-1.5 text-sm font-medium text-white">
                  Contact Support
                </button>
              </div>
            </div>

            {/* Main Content - Products Grid */}
            <div className="flex-grow">
              {/* Results Header */}
              <div className="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                <h2 className="font-bold text-gray-800">
                  {filteredProducts.length} Results
                  {activeCategory !== 'all' &&
                    ` in ${categories.find((c) => c.id === activeCategory)?.name}`}
                  {selectedTemple !== 'all' &&
                    ` for ${temples.find((t) => t.id === selectedTemple)?.name}`}
                </h2>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-600">Sort by:</span>
                  <select className="rounded-md border px-2 py-1 text-sm text-gray-700">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Avg. Customer Review</option>
                    <option>Newest Arrivals</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative">
                      <div className="flex h-48 items-center justify-center bg-amber-100">
                        <span className="font-serif text-lg text-amber-800">{product.image}</span>
                      </div>
                      <button className="absolute top-2 right-2 rounded-full bg-white p-1.5">
                        <Heart className="h-4 w-4 text-gray-500" />
                      </button>
                      {product.bestSeller && (
                        <div className="absolute top-2 left-2 rounded bg-yellow-400 px-2 py-1 text-xs font-bold text-yellow-800">
                          Best Seller
                        </div>
                      )}
                      {product.limited && (
                        <div className="absolute top-2 left-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                          Limited Time
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="mb-1 text-xs text-orange-600">{product.temple}</div>
                      <h3 className="mb-1 font-medium text-gray-800">{product.name}</h3>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span className="ml-1 text-xs text-gray-700">{product.rating}</span>
                        </div>
                        <span className="ml-2 text-xs text-gray-500">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                      <p className="mb-3 line-clamp-2 text-xs text-gray-600">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-amber-900">₹{product.price}</span>
                        <button
                          className="flex items-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-600"
                          onClick={handleAddToCart}
                        >
                          <ShoppingCart className="mr-1 h-4 w-4" /> Add to Cart
                        </button>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Free delivery for orders above ₹500
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredProducts.length === 0 && (
                <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                  <div className="mb-2 font-bold text-amber-900">No offerings found</div>
                  <p className="mb-4 text-sm text-gray-600">
                    Try adjusting your filters or selecting a different category or temple.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSelectedTemple('all');
                    }}
                    className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredProducts.length > 0 && (
                <div className="mt-6 flex justify-center">
                  <div className="flex space-x-1">
                    <button className="rounded border px-3 py-1 text-sm">Previous</button>
                    <button className="rounded border bg-orange-500 px-3 py-1 text-sm text-white">
                      1
                    </button>
                    <button className="rounded border px-3 py-1 text-sm">2</button>
                    <button className="rounded border px-3 py-1 text-sm">3</button>
                    <button className="rounded border px-3 py-1 text-sm">Next</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Recommended Based on Your Browsing
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
              {products.slice(0, 6).map((product) => (
                <div
                  key={`rec-${product.id}`}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                >
                  <div className="flex h-24 items-center justify-center bg-amber-100">
                    <span className="font-serif text-xs text-amber-800">{product.image}</span>
                  </div>
                  <div className="p-2">
                    <h3 className="line-clamp-2 text-xs font-medium text-gray-800">
                      {product.name}
                    </h3>
                    <div className="my-1 flex items-center">
                      <Star className="h-2 w-2 fill-yellow-500 text-yellow-500" />
                      <span className="ml-1 text-xs text-gray-700">{product.rating}</span>
                    </div>
                    <div className="text-sm font-bold text-amber-900">₹{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="mt-8 rounded-lg bg-amber-100 p-6 text-center">
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
                  className="w-full rounded-lg py-2 pr-4 pl-10 text-sm focus:outline-none"
                />
                <Mail className="absolute top-2 left-3 h-4 w-4 text-gray-500" />
              </div>
              <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm text-white">
                Subscribe
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-8 bg-gray-800 py-8 text-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="col-span-1 md:col-span-1"></div> {/* Empty for centering */}
              <div className="col-span-1 md:col-span-1">
                <h4 className="mb-4 font-bold">Get to Know Us</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <NavLink to="/" className="hover:text-white">
                      About DevoteeStore
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="hover:text-white">
                      Temple Partnerships
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="hover:text-white">
                      Careers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="hover:text-white">
                      Press Releases
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="hover:text-white">
                      Community Initiatives
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-span-1 text-right md:col-span-1">
                <h4 className="mb-4 font-bold">Customer Service</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <NavLink to="/" className="hover:text-white">
                      Your Account
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="hover:text-white">
                      Track Your Order
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="hover:text-white">
                      Shipping & Delivery
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="hover:text-white">
                      Returns & Refunds
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="hover:text-white">
                      Help Center
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-span-1 md:col-span-1"></div> {/* Empty for centering */}
            </div>
            <div className="mt-8 border-gray-700 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2025 DevoteeStore. All rights reserved.</p>
            </div>
          </div>
        </footer>
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
            We're working hard to bring this feature to you. The DevoteeStore will be available in
            the near future with all temple offerings and prasadam.
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

export default DevoteeStore;
