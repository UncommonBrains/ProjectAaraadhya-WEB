import React, { useState } from "react";
import {
  Star,
  Heart,
  Mail,
  Search,
  Home,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";

const DevoteeStore = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTemple, setSelectedTemple] = useState("all");
  const [cartCount, setCartCount] = useState(0);

  // Sample categories
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "poojas", name: "Poojas & Rituals" },
    { id: "prasadam", name: "Prasadam" },
    { id: "idols", name: "Deities & Idols" },
    { id: "pooja-items", name: "Pooja Items" },
    { id: "garlands", name: "Garlands & Flowers" },
    { id: "books", name: "Religious Books" },
    { id: "jewelry", name: "Devotional Jewelry" },
    { id: "home-decor", name: "Temple-inspired Decor" },
  ];

  // Sample temples
  const temples = [
    { id: "all", name: "All Temples" },
    { id: "tirupati", name: "Tirupati Balaji" },
    { id: "iskcon", name: "ISKCON Temple" },
    { id: "kashi", name: "Kashi Vishwanath" },
    { id: "meenakshi", name: "Meenakshi Temple" },
    { id: "golden", name: "Golden Temple" },
    { id: "somnath", name: "Somnath Temple" },
  ];

  // Sample products
  const products = [
    {
      id: 1,
      name: "Maha Abhishekam Package",
      temple: "Tirupati Balaji",
      category: "poojas",
      price: 1100,
      rating: 4.8,
      reviews: 128,
      image: "abhishekam",
      description:
        "Special abhishekam with panchamrut for your chosen deity with priest's blessings sent directly to you.",
      bestSeller: true,
    },
    {
      id: 2,
      name: "Laddu Prasadam Box",
      temple: "Tirupati Balaji",
      category: "prasadam",
      price: 300,
      rating: 4.9,
      reviews: 352,
      image: "laddu",
      description:
        "Sacred Laddu prasadam blessed at Tirupati temple, packaged and delivered to your doorstep.",
      bestSeller: true,
    },
    {
      id: 3,
      name: "Brass Ganesha Idol",
      temple: "All Temples",
      category: "idols",
      price: 1250,
      rating: 4.7,
      reviews: 89,
      image: "ganesha",
      description:
        "Handcrafted brass Ganesha idol, perfect for home worship or gifting.",
    },
    {
      id: 4,
      name: "Silver Plated Pooja Thali Set",
      temple: "All Temples",
      category: "pooja-items",
      price: 950,
      rating: 4.6,
      reviews: 76,
      image: "thali",
      description:
        "Complete pooja thali set with all necessary items for daily rituals.",
    },
    {
      id: 5,
      name: "Diwali Special Pooja",
      temple: "ISKCON Temple",
      category: "poojas",
      price: 2100,
      rating: 4.8,
      reviews: 63,
      image: "diwali",
      description:
        "Complete Lakshmi-Ganesh pooja with special diya and prasadam. Book in advance for the auspicious festival.",
      limited: true,
    },
    {
      id: 6,
      name: "5 Mukhi Rudraksha Mala",
      temple: "Kashi Vishwanath",
      category: "jewelry",
      price: 1500,
      rating: 4.9,
      reviews: 210,
      image: "rudraksha",
      description:
        "Authentic 5 Mukhi Rudraksha mala, blessed at Kashi Vishwanath temple.",
    },
    {
      id: 7,
      name: "Diwali Special Pooja",
      temple: "ISKCON Temple",
      category: "poojas",
      price: 2100,
      rating: 4.8,
      reviews: 63,
      image: "diwali",
      description:
        "Complete Lakshmi-Ganesh pooja with special diya and prasadam. Book in advance for the auspicious festival.",
      limited: true,
    },
    {
      id: 8,
      name: "5 Mukhi Rudraksha Mala",
      temple: "Kashi Vishwanath",
      category: "jewelry",
      price: 1500,
      rating: 4.9,
      reviews: 210,
      image: "rudraksha",
      description:
        "Authentic 5 Mukhi Rudraksha mala, blessed at Kashi Vishwanath temple.",
    },
    {
      id: 9,
      name: "Diwali Special Pooja",
      temple: "ISKCON Temple",
      category: "poojas",
      price: 2100,
      rating: 4.8,
      reviews: 63,
      image: "diwali",
      description:
        "Complete Lakshmi-Ganesh pooja with special diya and prasadam. Book in advance for the auspicious festival.",
      limited: true,
    },
    {
      id: 10,
      name: "5 Mukhi Rudraksha Mala",
      temple: "Kashi Vishwanath",
      category: "jewelry",
      price: 1500,
      rating: 4.9,
      reviews: 210,
      image: "rudraksha",
      description:
        "Authentic 5 Mukhi Rudraksha mala, blessed at Kashi Vishwanath temple.",
    },
    {
      id: 11,
      name: "Diwali Special Pooja",
      temple: "ISKCON Temple",
      category: "poojas",
      price: 2100,
      rating: 4.8,
      reviews: 63,
      image: "diwali",
      description:
        "Complete Lakshmi-Ganesh pooja with special diya and prasadam. Book in advance for the auspicious festival.",
      limited: true,
    },
    {
      id: 12,
      name: "5 Mukhi Rudraksha Mala",
      temple: "Kashi Vishwanath",
      category: "jewelry",
      price: 1500,
      rating: 4.9,
      reviews: 210,
      image: "rudraksha",
      description:
        "Authentic 5 Mukhi Rudraksha mala, blessed at Kashi Vishwanath temple.",
    },
    {
      id: 13,
      name: "Diwali Special Pooja",
      temple: "ISKCON Temple",
      category: "poojas",
      price: 2100,
      rating: 4.8,
      reviews: 63,
      image: "diwali",
      description:
        "Complete Lakshmi-Ganesh pooja with special diya and prasadam. Book in advance for the auspicious festival.",
      limited: true,
    },
    {
      id: 14,
      name: "5 Mukhi Rudraksha Mala",
      temple: "Kashi Vishwanath",
      category: "jewelry",
      price: 1500,
      rating: 4.9,
      reviews: 210,
      image: "rudraksha",
      description:
        "Authentic 5 Mukhi Rudraksha mala, blessed at Kashi Vishwanath temple.",
    },
    {
      id: 15,
      name: "Diwali Special Pooja",
      temple: "ISKCON Temple",
      category: "poojas",
      price: 2100,
      rating: 4.8,
      reviews: 63,
      image: "diwali",
      description:
        "Complete Lakshmi-Ganesh pooja with special diya and prasadam. Book in advance for the auspicious festival.",
      limited: true,
    },
    {
      id: 16,
      name: "5 Mukhi Rudraksha Mala",
      temple: "Kashi Vishwanath",
      category: "jewelry",
      price: 1500,
      rating: 4.9,
      reviews: 210,
      image: "rudraksha",
      description:
        "Authentic 5 Mukhi Rudraksha mala, blessed at Kashi Vishwanath temple.",
    },
  ];

  // Filter products based on selected category and temple
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeCategory === "all" || product.category === activeCategory;
    const templeMatch =
      selectedTemple === "all" ||
      product.temple === selectedTemple ||
      product.temple === "All Temples";
    return categoryMatch && templeMatch;
  });

  // Add to cart handler
  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
        <header className="bg-orange-600 text-white p-4 sticky top-0 z-50">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <a
                  href="/"
                  className="whitespace-nowrap  flex items-center pr-3 border-r-2 text-s font-semibold"
                >
                  <Home className="h-5 w-5 mr-1 ml-2  " strokeWidth={3} /> Go
                  back to Aaraadhya Home
                </a>

                <h1 className="font-bold text-xl">DevoteeStore</h1>
              </div>

              {/* <div className="flex-grow mx-4 relative">
              <input
                type="text"
                placeholder="Search for temple offerings, items, prasadam..."
                className="w-full rounded-md py-2 px-4 text-gray-800 text-sm"
              />
              <Search className="absolute right-3 top-2 h-5 w-5 text-gray-500" />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-start">
                <span className="text-xs">Welcome</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium">Account</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </div>
              </div>

              <div className="relative">
                <ShoppingCart className="h-7 w-7" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>
        <div className="flex-grow  relative  mb-3 bg-orange-600 text-white p-2">
          <input
            type="text"
            placeholder="Search for temple offerings, items, prasadam..."
            className="w-full rounded-md py-2 px-4 text-gray-800 text-sm"
          />
          <Search className="absolute right-6 top-4 h-5 w-5 text-gray-500" />
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-orange-700 text-white py-2 shadow-md  top-12 z-50">
        <div className="container mx-auto">
          <div className="flex items-center space-x-6 overflow-x-auto pb-1 text-sm ml-6">
            <a href="/" className="whitespace-nowrap font-medium">
              Best Sellers
            </a>
            <a href="/" className="whitespace-nowrap">
              Today's Deals
            </a>
            <a href="/" className="whitespace-nowrap">
              New Releases
            </a>
            <a href="/" className="whitespace-nowrap">
              Festival Specials
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto py-4 px-4">
        {/* Hero Banner */}
        <div className="bg-amber-100 rounded-lg p-6 mb-6 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <h2 className="text-2xl font-serif text-amber-900 mb-2">
              Support Temples. Receive Divine Blessings.
            </h2>
            <p className="text-amber-800 mb-4">
              Book poojas, order prasadam, and shop for authentic temple items.
              All offerings are performed by temple priests and delivered to
              your doorstep.
            </p>
            <button className="bg-orange-500 text-white rounded-md px-4 py-2 font-medium">
              Explore Temple Offerings
            </button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-amber-200 opacity-50"></div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 mb-6">
            {/* Featured Collections */}
            <div className="mb-6">
              <h3 className="font-serif text-amber-900 text-lg mb-4">
                Collections
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
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - Categories */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      className={`text-sm w-full text-left py-1.5 px-2 rounded-md ${
                        activeCategory === category.id
                          ? "bg-orange-100 text-orange-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Filter by Temple</h3>
              <ul className="space-y-2">
                {temples.map((temple) => (
                  <li key={temple.id}>
                    <button
                      className={`text-sm w-full text-left py-1.5 px-2 rounded-md ${
                        selectedTemple === temple.id
                          ? "bg-orange-100 text-orange-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedTemple(temple.id)}
                    >
                      {temple.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Price Range</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <button className="hover:text-orange-600">Under ₹500</button>
                </li>
                <li>
                  <button className="hover:text-orange-600">
                    ₹500 - ₹1,000
                  </button>
                </li>
                <li>
                  <button className="hover:text-orange-600">
                    ₹1,000 - ₹2,000
                  </button>
                </li>
                <li>
                  <button className="hover:text-orange-600">
                    ₹2,000 & Above
                  </button>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg shadow-sm p-4 border border-orange-100">
              <h3 className="font-bold text-amber-900 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-700 mb-3">
                Our devotee support team is available to assist you with any
                questions about temple offerings.
              </p>
              <button className="bg-orange-500 text-white rounded-md px-3 py-1.5 text-sm font-medium w-full">
                Contact Support
              </button>
            </div>
          </div>

          {/* Main Content - Products Grid */}
          <div className="flex-grow">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex justify-between items-center">
              <h2 className="font-bold text-gray-800">
                {filteredProducts.length} Results
                {activeCategory !== "all" &&
                  ` in ${
                    categories.find((c) => c.id === activeCategory)?.name
                  }`}
                {selectedTemple !== "all" &&
                  ` for ${temples.find((t) => t.id === selectedTemple)?.name}`}
              </h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                <select className="border rounded-md py-1 px-2 text-sm text-gray-700">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Avg. Customer Review</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <div className="bg-amber-100 h-48 flex items-center justify-center">
                      <span className="text-amber-800 font-serif text-lg">
                        {product.image}
                      </span>
                    </div>
                    <button className="absolute top-2 right-2 bg-white rounded-full p-1.5">
                      <Heart className="h-4 w-4 text-gray-500" />
                    </button>
                    {product.bestSeller && (
                      <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
                        Best Seller
                      </div>
                    )}
                    {product.limited && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Limited Time
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-orange-600 mb-1">
                      {product.temple}
                    </div>
                    <h3 className="font-medium text-gray-800 mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-700 ml-1">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-amber-900">
                        ₹{product.price}
                      </span>
                      <button
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-3 py-1.5 text-sm font-medium flex items-center"
                        onClick={handleAddToCart}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
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
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-amber-900 font-bold mb-2">
                  No offerings found
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Try adjusting your filters or selecting a different category
                  or temple.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSelectedTemple("all");
                  }}
                  className="bg-orange-500 text-white rounded-md px-4 py-2 text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-1">
                  <button className="px-3 py-1 rounded border text-sm">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded border text-sm bg-orange-500 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 rounded border text-sm">
                    2
                  </button>
                  <button className="px-3 py-1 rounded border text-sm">
                    3
                  </button>
                  <button className="px-3 py-1 rounded border text-sm">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recommended Based on Your Browsing
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {products.slice(0, 6).map((product) => (
              <div
                key={`rec-${product.id}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="bg-amber-100 h-24 flex items-center justify-center">
                  <span className="text-amber-800 font-serif text-xs">
                    {product.image}
                  </span>
                </div>
                <div className="p-2">
                  <h3 className="text-xs font-medium text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center my-1">
                    <Star className="h-2 w-2 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-gray-700 ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-amber-900">
                    ₹{product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="bg-amber-100 rounded-lg p-6 text-center mt-8">
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
                className="w-full rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none"
              />
              <Mail className="absolute left-3 top-2 h-4 w-4 text-gray-500" />
            </div>
            <button className="bg-orange-500 text-white rounded-lg px-4 py-2 text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 mt-8 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1"></div>{" "}
            {/* Empty for centering */}
            <div className="col-span-1 md:col-span-1">
              <h4 className="font-bold mb-4">Get to Know Us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/" className="hover:text-white">
                    About DevoteeStore
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    Temple Partnerships
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    Press Releases
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    Community Initiatives
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-1 md:col-span-1 text-right">
              <h4 className="font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/" className="hover:text-white">
                    Your Account
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    Track Your Order
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    Shipping & Delivery
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    Returns & Refunds
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-white">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-1 md:col-span-1"></div>{" "}
            {/* Empty for centering */}
          </div>
          <div className=" border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 DevoteeStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DevoteeStore;
