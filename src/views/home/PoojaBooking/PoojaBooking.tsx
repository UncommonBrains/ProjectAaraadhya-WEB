import { useState } from 'react';
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
} from 'lucide-react';
import { Deity, PoojaCategory, Pooja, AdditionalMember, FormData, CartItem } from './types';
import VinayakaImage from '../../../assets/images/vinayaka.jpg';
import LakshmiImage from '../../../assets/images/lakshmi.jpg';
import ShivaImage from '../../../assets/images/shiva.jpg';
import HanumanImage from '../../../assets/images/hanuman.jpg';
import KrishnaImage from '../../../assets/images/krishna.jpg';
import DurgaImage from '../../../assets/images/durga.jpg';
import { NavLink } from 'react-router-dom';

// Sample data - In a real app, this would come from API or parent component
const deities: Deity[] = [
  { id: 1, name: 'Lord Ganesha', image: VinayakaImage },
  { id: 2, name: 'Goddess Lakshmi', image: LakshmiImage },
  { id: 3, name: 'Lord Shiva', image: ShivaImage },
  { id: 4, name: 'Lord Hanuman', image: HanumanImage },
  { id: 5, name: 'Lord Krishna', image: KrishnaImage },
  { id: 6, name: 'Goddess Durga', image: DurgaImage },
];

const poojaCategories: PoojaCategory[] = [
  { id: 1, name: 'Homam', icon: '' },
  { id: 2, name: 'Archanakal', icon: '' },
  { id: 3, name: 'Nivedhyam', icon: '' },
  { id: 4, name: 'Abhishekam', icon: '' },
  { id: 5, name: 'Special Poojas', icon: '' },
  { id: 6, name: 'Festival Poojas', icon: '' },
];

const allPoojas: Pooja[] = [
  { id: 1, name: 'Ganesh Abhishekam', price: 501, categoryId: 4, deityId: 1 },
  { id: 2, name: 'Lakshmi Archana', price: 101, categoryId: 2, deityId: 2 },
  { id: 3, name: 'Maha Rudra Homam', price: 1501, categoryId: 1, deityId: 3 },
  { id: 4, name: 'Hanuman Chalisa', price: 251, categoryId: 2, deityId: 4 },
  { id: 5, name: 'Sri Suktha Homam', price: 1101, categoryId: 1, deityId: 2 },
  {
    id: 6,
    name: 'Panchamruta Abhishekam',
    price: 751,
    categoryId: 4,
    deityId: 3,
  },
  {
    id: 7,
    name: 'Satyanarayana Pooja',
    price: 1001,
    categoryId: 5,
    deityId: 5,
  },
  { id: 8, name: 'Durga Ashtottara', price: 251, categoryId: 2, deityId: 6 },
  { id: 9, name: 'Ganesha Nivedhyam', price: 351, categoryId: 3, deityId: 1 },
  { id: 10, name: 'Navgraha Shanti', price: 1201, categoryId: 5, deityId: 3 },
  {
    id: 11,
    name: 'Vishnu Sahasranamam',
    price: 301,
    categoryId: 2,
    deityId: 5,
  },
  {
    id: 12,
    name: 'Diwali Special Pooja',
    price: 1101,
    categoryId: 6,
    deityId: 2,
  },
];

const starSigns: string[] = [
  'Aswathi (അശ്വതി)',
  'Bharani (ഭരണി)',
  'Karthika (കാർത്തിക)',
  'Rohini (രോഹിണി)',
  'Makayiram (മകയിരം)',
  'Thiruvaathira (തിരുവാതിര)',
  'Punartham (പുണർതം)',
  'Pooyam (പൂയം)',
  'Ayilyam (ആയില്യം)',
  'Makam (മകം)',
  'Pooram (പൂരം)',
  'Uthram (ഉത്രം)',
  'Atham (അത്തം)',
  'Chithira (ചിത്തിര)',
  'Chothi (ചോതി)',
  'Vishakam (വിശാഖം)',
  'Anizham (അനിഴം)',
  'Thrikketta (തൃക്കേട്ട)',
  'Moolam (മൂലം)',
  'Puradam (പൂരാടം)',
  'Uthradam (ഉത്രാടം)',
  'Thiruvonam (തിരുവോണം)',
  'Avittom (അവിട്ടം)',
  'Chathayam (ചതയം)',
  'Pururuttathi (പുരുരുട്ടാതി)',
  'Uthruttathi (ഉത്രട്ടാതി)',
  'Revathi (രേവതി)',
  'Shubha Nakshathram (ശുഭ നക്ഷത്രം)',
];

const PoojaBooking: React.FC = () => {
  const [mainTab, setMainTab] = useState<'deity' | 'category' | 'all'>('deity');
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentForm, setCurrentForm] = useState<Pooja | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    starSign: '',
    additionalMembers: [],
    date: '',
    time: '',
  });

  // Set the additional member price (percentage of base price)
  const additionalMemberRate = 1; // 100% of base price for each additional member

  // Handle adding a pooja to cart
  const handleAddToCart = (pooja: Pooja): void => {
    setCurrentForm({ ...pooja });
  };

  // Calculate the total price based on number of additional members
  const calculateTotalPrice = (
    basePrice: number,
    additionalMembers: AdditionalMember[],
  ): number => {
    const additionalPrice = additionalMembers.length * (basePrice * additionalMemberRate);
    return basePrice + additionalPrice;
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!currentForm) return;

    // Calculate the total price with additional members
    const totalPrice = calculateTotalPrice(currentForm.price, formData.additionalMembers);

    const newCartItem: CartItem = {
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
      name: '',
      starSign: '',
      additionalMembers: [],
      date: '',
      time: '',
    });
  };

  // Handle adding additional member
  const handleAddMember = (): void => {
    setFormData({
      ...formData,
      additionalMembers: [...formData.additionalMembers, { name: '', starSign: '' }],
    });
  };

  // Handle removing additional member
  const handleRemoveMember = (index: number): void => {
    const updatedMembers = [...formData.additionalMembers];
    updatedMembers.splice(index, 1);
    setFormData({
      ...formData,
      additionalMembers: updatedMembers,
    });
  };

  // Handle updating member info
  const handleMemberChange = (
    index: number,
    field: keyof AdditionalMember,
    value: string,
  ): void => {
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
  const handleRemoveFromCart = (itemId: number): void => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Get poojas by category
  const getPoojasByCategory = (categoryId: number): Pooja[] => {
    return allPoojas.filter((pooja) => pooja.categoryId === categoryId);
  };

  // Get poojas by deity
  const getPoojasByDeity = (deityId: number): Pooja[] => {
    return allPoojas.filter((pooja) => pooja.deityId === deityId);
  };

  // Render booking form modal
  const renderBookingForm = (): React.ReactNode => {
    if (!currentForm) return null;

    // Calculate dynamic price based on current number of additional members
    const currentPrice = calculateTotalPrice(currentForm.price, formData.additionalMembers);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white">
          <div className="sticky top-0 rounded-t-lg bg-amber-100 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg text-amber-900">Book Pooja</h3>
              <button
                onClick={() => setCurrentForm(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200 text-amber-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-4 rounded-lg bg-amber-50 p-3">
              <p className="font-medium text-amber-900">{currentForm.name}</p>
              <div className="mt-1 flex justify-between">
                <p className="text-sm text-gray-600">Base Price: ₹{currentForm.price}</p>
                {formData.additionalMembers.length > 0 && (
                  <p className="font-medium text-amber-900">Total: ₹{currentPrice}</p>
                )}
              </div>
            </div>

            <form onSubmit={handleFormSubmit}>
              {/* Main Devotee */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-amber-200 p-3 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                  placeholder="Enter your full name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Star Sign (Nakshatra)
                </label>
                <select
                  className="w-full rounded-lg border border-amber-200 p-3 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                  required
                  value={formData.starSign}
                  onChange={(e) => setFormData({ ...formData, starSign: e.target.value })}
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
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Additional Family Members
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="flex items-center justify-center rounded-full bg-amber-100 p-1 text-amber-900"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {formData.additionalMembers.length > 0 && (
                  <p className="mb-2 text-xs text-amber-700">
                    Each additional member costs {additionalMemberRate * 100}% of the base price
                  </p>
                )}

                {formData.additionalMembers.map((member, index) => (
                  <div key={index} className="mb-3 rounded-lg bg-amber-50 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-amber-900">
                        Member {index + 1} (₹
                        {(currentForm.price * additionalMemberRate).toFixed(0)})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(index)}
                        className="flex items-center justify-center rounded-full bg-amber-100 p-1 text-amber-900"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mb-2">
                      <input
                        type="text"
                        className="w-full rounded-lg border border-amber-200 p-2 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                        placeholder="Full name"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <select
                        className="w-full rounded-lg border border-amber-200 p-2 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                        value={member.starSign}
                        onChange={(e) => handleMemberChange(index, 'starSign', e.target.value)}
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
              <div className="mb-6 grid grid-cols-[2fr_2fr] gap-3">
                {/* Date Input (75%) */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full rounded-lg border border-amber-200 p-3 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                {/* Calendar Link (25%) - Label Removed */}
                <div className="flex items-end">
                  <NavLink
                    to="/"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default navigation
                      alert('Calendar link clicked!');
                    }}
                    className="block w-full rounded-lg bg-amber-500 p-3 text-center text-white hover:bg-amber-600 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                  >
                    View Calendar
                  </NavLink>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-amber-600 px-4 py-3 font-medium text-white"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart - ₹{currentPrice}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Render cart sidebar
  const renderCart = (): React.ReactNode => {
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

    return (
      <div className="mt-4 mb-16 border-t border-amber-200 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-lg text-amber-900">Your Cart</h3>
          <span className="rounded-full bg-amber-100 px-2 py-1 text-sm text-amber-900">
            {cartItems.length} items
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="p-4 text-center">
            <ShoppingCart className="mx-auto mb-2 h-12 w-12 text-amber-300" />
            <p className="text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="mb-4 max-h-60 space-y-3 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-amber-50 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-amber-900">{item.name}</p>
                    <p className="text-xs text-gray-600">
                      For: {item.bookingDetails.name}
                      {item.bookingDetails.additionalMembers.length > 0 &&
                        ` +${item.bookingDetails.additionalMembers.length}`}
                    </p>
                    {item.additionalMembersCount > 0 && (
                      <p className="text-xs text-amber-700">
                        Base: ₹{item.basePrice} + {item.additionalMembersCount} members
                      </p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 font-medium text-amber-900">₹{item.price}</span>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="rounded-full bg-amber-100 p-1 text-amber-900"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4 border-t border-amber-200 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Total Amount</span>
                <span className="text-lg font-medium text-amber-900">₹{totalAmount}</span>
              </div>
            </div>

            <button className="flex w-full items-center justify-center rounded-lg bg-amber-600 px-4 py-3 font-medium text-white">
              Proceed to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* Header with back button */}
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <NavLink to="/temple-details" className="flex items-center text-amber-900">
            <ChevronLeft className="mr-2 h-5 w-5" />
            <span>Back to Temple</span>
          </NavLink>
        </div>
      </header>

      {/* Main content wrapper with max-width for larger screens */}
      <div className="mx-auto max-w-4xl">
        {/* Sub-navigation tabs */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto">
            <div className="flex overflow-x-auto">
              <button
                className={`flex-1 px-4 py-4 text-center text-sm font-medium whitespace-nowrap ${
                  mainTab === 'deity'
                    ? 'border-b-2 border-orange-500 text-orange-500'
                    : 'text-gray-600'
                }`}
                onClick={() => setMainTab('deity')}
              >
                <User className="mx-auto mb-1 h-4 w-4" />
                By Deity
              </button>
              <button
                className={`flex-1 px-4 py-4 text-center text-sm font-medium whitespace-nowrap ${
                  mainTab === 'category'
                    ? 'border-b-2 border-orange-500 text-orange-500'
                    : 'text-gray-600'
                }`}
                onClick={() => setMainTab('category')}
              >
                <GridIcon className="mx-auto mb-1 h-4 w-4" />
                Group of Poojas
              </button>
              <button
                className={`flex-1 px-4 py-4 text-center text-sm font-medium whitespace-nowrap ${
                  mainTab === 'all'
                    ? 'border-b-2 border-orange-500 text-orange-500'
                    : 'text-gray-600'
                }`}
                onClick={() => setMainTab('all')}
              >
                <List className="mx-auto mb-1 h-4 w-4" />
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
              className="w-full rounded-lg border border-amber-200 bg-white pt-3 pr-3 pb-3 pl-10 focus:ring-2 focus:ring-amber-300 focus:outline-none"
              placeholder={mainTab === 'deity' ? 'Search for deities...' : 'Search for poojas...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
          </div>
        </div>

        {/* Content based on selected tab */}
        <div className="container mx-auto p-4">
          {/* Deity Tab */}
          {mainTab === 'deity' && (
            <div>
              {!selectedDeity ? (
                // Deity selection grid
                <div>
                  <h3 className="mb-3 font-serif text-lg text-amber-900">Select a Deity</h3>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {deities
                      .filter((deity) =>
                        deity.name.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .map((deity) => (
                        <div
                          key={deity.id}
                          className="cursor-pointer overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm"
                          onClick={() => setSelectedDeity(deity)}
                        >
                          <div
                            className="h-40 bg-cover bg-top"
                            style={{
                              backgroundImage: `url(${deity.image})`,
                            }}
                          ></div>
                          <div className="p-3 text-center">
                            <h4 className="font-medium text-amber-900">{deity.name}</h4>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                // Selected deity's poojas
                <div>
                  <div className="mb-4 flex items-center">
                    <button
                      className="mr-3 rounded-full bg-amber-100 p-2 text-amber-900"
                      onClick={() => setSelectedDeity(null)}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h3 className="font-serif text-lg text-amber-900">
                      {selectedDeity.name} - Available Poojas
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {getPoojasByDeity(selectedDeity.id)
                      .filter((pooja) =>
                        pooja.name.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .map((pooja) => (
                        <div
                          key={pooja.id}
                          className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-amber-900">{pooja.name}</h4>
                              <p className="mt-1 text-sm text-gray-600">₹{pooja.price}</p>
                            </div>
                            <button
                              className="flex items-center rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white"
                              onClick={() => handleAddToCart(pooja)}
                            >
                              <Plus className="mr-1 h-4 w-4" />
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
          {mainTab === 'category' && (
            <div className="space-y-6">
              {poojaCategories
                .filter((category) =>
                  category.name.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((category) => {
                  const categoryPoojas = getPoojasByCategory(category.id);
                  if (categoryPoojas.length === 0) return null;

                  return (
                    <div key={category.id}>
                      <div className="mb-3 flex items-center">
                        <span className="mr-2 text-xl">{category.icon}</span>
                        <h3 className="font-serif text-lg text-amber-900">{category.name}</h3>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:!grid-cols-2">
                        {categoryPoojas.map((pooja) => (
                          <div
                            key={pooja.id}
                            className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-amber-900">{pooja.name}</h4>
                                <p className="mt-1 text-sm text-gray-600">
                                  {deities.find((d) => d.id === pooja.deityId)?.name}
                                </p>
                                <p className="mt-1 text-sm font-medium text-amber-900">
                                  ₹{pooja.price}
                                </p>
                              </div>
                              <button
                                className="flex items-center rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white"
                                onClick={() => handleAddToCart(pooja)}
                              >
                                <Plus className="mr-1 h-4 w-4" />
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
          {mainTab === 'all' && (
            <div>
              <h3 className="mb-3 font-serif text-lg text-amber-900">All Available Poojas</h3>
              <div className="grid grid-cols-1 gap-4 md:!grid-cols-2">
                {allPoojas
                  .filter((pooja) => pooja.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((pooja) => (
                    <div
                      key={pooja.id}
                      className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-amber-900">{pooja.name}</h4>
                          <div className="mt-1 flex items-center">
                            <span className="mr-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                              {poojaCategories.find((c) => c.id === pooja.categoryId)?.name}
                            </span>
                            <span className="text-sm text-gray-600">
                              {deities.find((d) => d.id === pooja.deityId)?.name}
                            </span>
                          </div>
                          <p className="mt-1 text-sm font-medium text-amber-900">₹{pooja.price}</p>
                        </div>
                        <button
                          className="flex items-center rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white"
                          onClick={() => handleAddToCart(pooja)}
                        >
                          <Plus className="mr-1 h-4 w-4" />
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
