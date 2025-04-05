import React, { useState } from "react";
import {
  ChevronLeft,
  Search,
  Plus,
  Minus,
  ArrowRight,
  ShoppingCart,
  X,
  User,
  List,
  GridIcon,
} from "lucide-react";

// Sample data - In a real app, this would come from API or parent component
const deities = [
  { id: 1, name: "Lord Ganesha", image: "/deity-images/vinayaka.jpg" },
  { id: 2, name: "Goddess Lakshmi", image: "/deity-images/lakshmi.jpg" },
  { id: 3, name: "Lord Shiva", image: "/deity-images/shiva.jpg" },
  { id: 4, name: "Lord Hanuman", image: "/deity-images/hanuman.jpg" },
  { id: 5, name: "Lord Krishna", image: "/deity-images/krishna.jpg" },
  { id: 6, name: "Goddess Durga", image: "/deity-images/durga.jpg" },
];

const poojaCategories = [
  { id: 1, name: "Homam", icon: "" },
  { id: 2, name: "Archanakal", icon: "" },
  { id: 3, name: "Nivedhyam", icon: "" },
  { id: 4, name: "Abhishekam", icon: "" },
  { id: 5, name: "Special Poojas", icon: "" },
  { id: 6, name: "Festival Poojas", icon: "" },
];

const allPoojas = [
  { id: 1, name: "Ganesh Abhishekam", price: 501, categoryId: 4, deityId: 1 },
  { id: 2, name: "Lakshmi Archana", price: 101, categoryId: 2, deityId: 2 },
  { id: 3, name: "Maha Rudra Homam", price: 1501, categoryId: 1, deityId: 3 },
  { id: 4, name: "Hanuman Chalisa", price: 251, categoryId: 2, deityId: 4 },
  { id: 5, name: "Sri Suktha Homam", price: 1101, categoryId: 1, deityId: 2 },
  {
    id: 6,
    name: "Panchamruta Abhishekam",
    price: 751,
    categoryId: 4,
    deityId: 3,
  },
  {
    id: 7,
    name: "Satyanarayana Pooja",
    price: 1001,
    categoryId: 5,
    deityId: 5,
  },
  { id: 8, name: "Durga Ashtottara", price: 251, categoryId: 2, deityId: 6 },
  { id: 9, name: "Ganesha Nivedhyam", price: 351, categoryId: 3, deityId: 1 },
  { id: 10, name: "Navgraha Shanti", price: 1201, categoryId: 5, deityId: 3 },
  {
    id: 11,
    name: "Vishnu Sahasranamam",
    price: 301,
    categoryId: 2,
    deityId: 5,
  },
  {
    id: 12,
    name: "Diwali Special Pooja",
    price: 1101,
    categoryId: 6,
    deityId: 2,
  },
];

const starSigns = [
  "Aswathi (അശ്വതി)",
  "Bharani (ഭരണി)",
  "Karthika (കാർത്തിക)",
  "Rohini (രോഹിണി)",
  "Makayiram (മകയിരം)",
  "Thiruvaathira (തിരുവാതിര)",
  "Punartham (പുണർതം)",
  "Pooyam (പൂയം)",
  "Ayilyam (ആയില്യം)",
  "Makam (മകം)",
  "Pooram (പൂരം)",
  "Uthram (ഉത്രം)",
  "Atham (അത്തം)",
  "Chithira (ചിത്തിര)",
  "Chothi (ചോതി)",
  "Vishakam (വിശാഖം)",
  "Anizham (അനിഴം)",
  "Thrikketta (തൃക്കേട്ട)",
  "Moolam (മൂലം)",
  "Puradam (പൂരാടം)",
  "Uthradam (ഉത്രാടം)",
  "Thiruvonam (തിരുവോണം)",
  "Avittom (അവിട്ടം)",
  "Chathayam (ചതയം)",
  "Pururuttathi (പുരുരുട്ടാതി)",
  "Uthruttathi (ഉത്രട്ടാതി)",
  "Revathi (രേവതി)",
  "Shubha Nakshathram (ശുഭ നക്ഷത്രം)",
];

const PoojaBooking = () => {
  const [mainTab, setMainTab] = useState("deity");
  const [selectedDeity, setSelectedDeity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [currentForm, setCurrentForm] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    starSign: "",
    additionalMembers: [],
    date: "",
    time: "",
  });

  // Set the additional member price (percentage of base price)
  const additionalMemberRate = 1; // 100% of base price for each additional member

  // Handle adding a pooja to cart
  const handleAddToCart = (pooja) => {
    setCurrentForm({ ...pooja });
  };

  // Calculate the total price based on number of additional members
  const calculateTotalPrice = (basePrice, additionalMembers) => {
    const additionalPrice =
      additionalMembers.length * (basePrice * additionalMemberRate);
    return basePrice + additionalPrice;
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Calculate the total price with additional members
    const totalPrice = calculateTotalPrice(
      currentForm.price,
      formData.additionalMembers
    );

    const newCartItem = {
      ...currentForm,
      price: totalPrice, // Update the price
      basePrice: currentForm.price, // Keep the original price for reference
      bookingDetails: { ...formData },
      additionalMembersCount: formData.additionalMembers.length,
      id: Date.now(), // Generate unique ID for cart item
    };

    setCartItems([...cartItems, newCartItem]);
    setCurrentForm(null);
    setFormData({
      name: "",
      starSign: "",
      additionalMembers: [],
      date: "",
      time: "",
    });
  };

  // Handle adding additional member
  const handleAddMember = () => {
    setFormData({
      ...formData,
      additionalMembers: [
        ...formData.additionalMembers,
        { name: "", starSign: "" },
      ],
    });
  };

  // Handle removing additional member
  const handleRemoveMember = (index) => {
    const updatedMembers = [...formData.additionalMembers];
    updatedMembers.splice(index, 1);
    setFormData({
      ...formData,
      additionalMembers: updatedMembers,
    });
  };

  // Handle updating member info
  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.additionalMembers];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      additionalMembers: updatedMembers,
    });
  };

  // Handle removing an item from cart
  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Filter poojas based on selected deity or search query
  // const filteredPoojas = allPoojas.filter((pooja) => {
  //   const matchesDeity = selectedDeity ? pooja.deityId === selectedDeity.id : true;
  //   const matchesSearch = pooja.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   return matchesDeity && matchesSearch;
  // });

  // Get poojas by category
  const getPoojasByCategory = (categoryId) => {
    return allPoojas.filter((pooja) => pooja.categoryId === categoryId);
  };

  // Get poojas by deity
  const getPoojasByDeity = (deityId) => {
    return allPoojas.filter((pooja) => pooja.deityId === deityId);
  };

  // Render booking form modal
  const renderBookingForm = () => {
    if (!currentForm) return null;

    // Calculate dynamic price based on current number of additional members
    const currentPrice = calculateTotalPrice(
      currentForm.price,
      formData.additionalMembers
    );

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-amber-100 p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg text-amber-900">Book Pooja</h3>
              <button
                onClick={() => setCurrentForm(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-200 text-amber-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-4 p-3 bg-amber-50 rounded-lg">
              <p className="text-amber-900 font-medium">{currentForm.name}</p>
              <div className="flex justify-between mt-1">
                <p className="text-gray-600 text-sm">
                  Base Price: ₹{currentForm.price}
                </p>
                {formData.additionalMembers.length > 0 && (
                  <p className="text-amber-900 font-medium">
                    Total: ₹{currentPrice}
                  </p>
                )}
              </div>
            </div>

            <form onSubmit={handleFormSubmit}>
              {/* Main Devotee */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                  placeholder="Enter your full name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Star Sign (Nakshatra)
                </label>
                <select
                  className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                  required
                  value={formData.starSign}
                  onChange={(e) =>
                    setFormData({ ...formData, starSign: e.target.value })
                  }
                >
                  <option value="">Select your star sign</option>
                  {starSigns.map((star) => (
                    <option key={star} value={star}>
                      {star}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional Members */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Additional Family Members
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="flex items-center justify-center p-1 bg-amber-100 rounded-full text-amber-900"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {formData.additionalMembers.length > 0 && (
                  <p className="text-xs text-amber-700 mb-2">
                    Each additional member costs {additionalMemberRate * 100}%
                    of the base price
                  </p>
                )}

                {formData.additionalMembers.map((member, index) => (
                  <div key={index} className="mb-3 p-3 bg-amber-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-amber-900">
                        Member {index + 1} (₹
                        {(currentForm.price * additionalMemberRate).toFixed(0)})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(index)}
                        className="flex items-center justify-center p-1 bg-amber-100 rounded-full text-amber-900"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mb-2">
                      <input
                        type="text"
                        className="w-full p-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                        placeholder="Full name"
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, "name", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div>
                      <select
                        className="w-full p-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                        value={member.starSign}
                        onChange={(e) =>
                          handleMemberChange(index, "starSign", e.target.value)
                        }
                        required
                      >
                        <option value="">Select star sign</option>
                        {starSigns.map((star) => (
                          <option key={star} value={star}>
                            {star}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              {/* Date and Calendar */}
              <div className="grid grid-cols-[2fr_2fr] gap-3 mb-6">
                {/* Date Input (75%) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                      required
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Calendar Link (25%) - Label Removed */}
                <div className="flex items-end">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default navigation
                      alert("Calendar link clicked!");
                    }}
                    className="w-full p-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300 text-center block"
                  >
                    View Calendar
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 text-white rounded-lg px-4 py-3 font-medium flex items-center justify-center"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart - ₹{currentPrice}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Render cart sidebar
  const renderCart = () => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price,
      0
    );

    return (
      <div className="bg-white border-t border-amber-200 mt-4 mb-16 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-serif text-lg text-amber-900">Your Cart</h3>
          <span className="bg-amber-100 text-amber-900 px-2 py-1 rounded-full text-sm">
            {cartItems.length} items
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center p-4">
            <ShoppingCart className="h-12 w-12 mx-auto text-amber-300 mb-2" />
            <p className="text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-amber-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-amber-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      For: {item.bookingDetails.name}
                      {item.bookingDetails.additionalMembers.length > 0 &&
                        ` +${item.bookingDetails.additionalMembers.length}`}
                    </p>
                    {item.additionalMembersCount > 0 && (
                      <p className="text-xs text-amber-700">
                        Base: ₹{item.basePrice} + {item.additionalMembersCount}{" "}
                        members
                      </p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-amber-900 font-medium mr-2">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="p-1 bg-amber-100 rounded-full text-amber-900"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-amber-200 pt-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Amount</span>
                <span className="text-lg font-medium text-amber-900">
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            <button className="w-full bg-amber-600 text-white rounded-lg px-4 py-3 font-medium flex items-center justify-center">
              Proceed to Payment
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="bg-amber-50 min-h-screen font-sans">
      {/* Header with back button */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <a
            href="/temple-details"
            className="flex items-center text-amber-900"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span>Back to Temple</span>
          </a>
        </div>
      </header>

      {/* Main content wrapper with max-width for larger screens */}
      <div className="max-w-4xl mx-auto">
        {/* Sub-navigation tabs */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto">
            <div className="flex overflow-x-auto">
              <button
                className={`flex-1 py-4 px-4 text-center text-sm font-medium whitespace-nowrap ${
                  mainTab === "deity"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600"
                }`}
                onClick={() => setMainTab("deity")}
              >
                <User className="h-4 w-4 mx-auto mb-1" />
                By Deity
              </button>
              <button
                className={`flex-1 py-4 px-4 text-center text-sm font-medium whitespace-nowrap ${
                  mainTab === "category"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600"
                }`}
                onClick={() => setMainTab("category")}
              >
                <GridIcon className="h-4 w-4 mx-auto mb-1" />
                Group of Poojas
              </button>
              <button
                className={`flex-1 py-4 px-4 text-center text-sm font-medium whitespace-nowrap ${
                  mainTab === "all"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600"
                }`}
                onClick={() => setMainTab("all")}
              >
                <List className="h-4 w-4 mx-auto mb-1" />
                All Poojas
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="container mx-auto p-4">
          <div className="relative">
            <input
              type="text"
              className="w-full pl-10 pb-3 pt-3 pr-3 bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder={
                mainTab === "deity"
                  ? "Search for deities..."
                  : "Search for poojas..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-4 h-5 w-5 text-amber-500" />
          </div>
        </div>

        {/* Content based on selected tab */}
        <div className="container mx-auto p-4">
          {/* Deity Tab */}
          {mainTab === "deity" && (
            <div>
              {!selectedDeity ? (
                // Deity selection grid
                <div>
                  <h3 className="font-serif text-lg text-amber-900 mb-3">
                    Select a Deity
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {deities
                      .filter((deity) =>
                        deity.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((deity) => (
                        <div
                          key={deity.id}
                          className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden cursor-pointer"
                          onClick={() => setSelectedDeity(deity)}
                        >
                          <div
                            className="h-40 bg-cover bg-top"
                            style={{
                              backgroundImage: `url(${deity.image})`,
                            }}
                          ></div>
                          <div className="p-3 text-center">
                            <h4 className="font-medium text-amber-900">
                              {deity.name}
                            </h4>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                // Selected deity's poojas
                <div>
                  <div className="flex items-center mb-4">
                    <button
                      className="mr-3 bg-amber-100 p-2 rounded-full text-amber-900"
                      onClick={() => setSelectedDeity(null)}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h3 className="font-serif text-lg text-amber-900">
                      {selectedDeity.name} - Available Poojas
                    </h3>
                  </div>

                  <div className="gap-3 grid grid-cols-2 md:grid-cols-3">
                    {getPoojasByDeity(selectedDeity.id)
                      .filter((pooja) =>
                        pooja.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((pooja) => (
                        <div
                          key={pooja.id}
                          className="bg-white rounded-lg shadow-sm border border-amber-100 p-4"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-amber-900">
                                {pooja.name}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                ₹{pooja.price}
                              </p>
                            </div>
                            <button
                              className="bg-amber-600 text-white rounded-lg px-3 py-2 text-sm font-medium flex items-center"
                              onClick={() => handleAddToCart(pooja)}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Book
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Category Tab */}
          {mainTab === "category" && (
            <div className="space-y-6">
              {poojaCategories
                .filter((category) =>
                  category.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((category) => {
                  const categoryPoojas = getPoojasByCategory(category.id);
                  if (categoryPoojas.length === 0) return null;

                  return (
                    <div key={category.id}>
                      <div className="  flex items-center mb-3">
                        <span className="text-xl mr-2">{category.icon}</span>
                        <h3 className="font-serif text-lg text-amber-900">
                          {category.name}
                        </h3>
                      </div>
                      <div className=" grid grid-cols-1 md:!grid-cols-2 gap-4">
                        {categoryPoojas.map((pooja) => (
                          <div
                            key={pooja.id}
                            className="bg-white rounded-lg shadow-sm border border-amber-100 p-4"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium text-amber-900">
                                  {pooja.name}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {
                                    deities.find((d) => d.id === pooja.deityId)
                                      ?.name
                                  }
                                </p>
                                <p className="text-sm text-amber-900 font-medium mt-1">
                                  ₹{pooja.price}
                                </p>
                              </div>
                              <button
                                className="bg-amber-600 text-white rounded-lg px-3 py-2 text-sm font-medium flex items-center"
                                onClick={() => handleAddToCart(pooja)}
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Book
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* All Poojas Tab */}
          {mainTab === "all" && (
            <div>
              <h3 className="font-serif text-lg text-amber-900 mb-3">
                All Available Poojas
              </h3>
              <div className="grid grid-cols-1 md:!grid-cols-2 gap-4">
                {allPoojas
                  .filter((pooja) =>
                    pooja.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((pooja) => (
                    <div
                      key={pooja.id}
                      className="bg-white rounded-lg shadow-sm border border-amber-100 p-4"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-amber-900">
                            {pooja.name}
                          </h4>
                          <div className="flex items-center mt-1">
                            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full mr-2">
                              {
                                poojaCategories.find(
                                  (c) => c.id === pooja.categoryId
                                )?.name
                              }
                            </span>
                            <span className="text-sm text-gray-600">
                              {
                                deities.find((d) => d.id === pooja.deityId)
                                  ?.name
                              }
                            </span>
                          </div>
                          <p className="text-sm text-amber-900 font-medium mt-1">
                            ₹{pooja.price}
                          </p>
                        </div>
                        <button
                          className="bg-amber-600 text-white rounded-lg px-3 py-2 text-sm font-medium flex items-center"
                          onClick={() => handleAddToCart(pooja)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Book
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Cart Section */}
          {renderCart()}
        </div>
      </div>

      {/* Booking Form Modal */}
      {renderBookingForm()}
    </div>
  );
};

export default PoojaBooking;
