import { useEffect, useState } from 'react';
import { ChevronLeft, Search, Plus, User, List, Sun } from 'lucide-react';
import { CartForm } from './types';
import { useNavigate } from 'react-router-dom';
import { useTemplePoojasViewModel } from '../../../view-models/temple/useTemplePoojasViewModel';
import { Pooja, ScheduleMode } from '../../../models/entities/Pooja';
import { useTempleViewModel } from '../../../view-models/temple/useTempleViewModel';
import CartBox from '../CartPage/CartBox';
import { CartItem, Member } from '../../../models/entities/Cart';
import { useCart } from '../../../hooks/useCart';
import { toast } from '../../../utils/toast';
import BookingFormModal from '../../../components/common/BookingFormModal';

const PoojaBooking: React.FC = () => {
  const navigate = useNavigate();
  const { poojas } = useTemplePoojasViewModel();
  const { temple } = useTempleViewModel();
  const { cart, addToCart } = useCart();
  
  const [deities, setDeities] = useState<Array<string>>([]);
  const [mainTab, setMainTab] = useState<'deity' | 'all'>('deity');
  const [selectedDeity, setSelectedDeity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedPooja, setSelectedPooja] = useState<Pooja | null>(null);
  const [dates, setDates] = useState<Date[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [formData, setFormData] = useState<CartForm>({
    name: '',
    starSign: '',
    members: [],
    poojaDate: '',
    customAmount: '',
  });

  useEffect(() => {
    const deities: Array<string> = [];

    poojas.map((pooja) => {
      !deities.includes(pooja.deityName) && deities.push(pooja.deityName);
    });

    setDeities(deities);
  }, [poojas]);

  // Set the additional member price (percentage of base price)
  const additionalMemberRate = 1; // 100% of base price for each additional member

  // Handle adding a pooja to cart
  const handleAddToCart = (pooja: Pooja): void => {
    if (cart?.items && cart.items.length > 0 && cart.items[0].templeId != pooja.templeId) {
      return toast.error('Please clear the cart before adding a pooja from a different temple.');
    }

    if (pooja?.scheduleMode == ScheduleMode.repeat) {
      const today = new Date();
      const daysAfter = parseInt(temple?.advancedOptions?.advancedOnlneBookingLimit ?? '10') - 1;
      const dates: Date[] = [];

      for (let i = 0; i <= daysAfter; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push(d);
      }

      setDates(dates);
      setAvailableDates(dates.filter((date) => pooja?.poojaDays[date.getDay()]));
    }

    setFormData({
      ...formData,
      poojaDate:
        pooja.scheduleMode === ScheduleMode.once
          ? (pooja.poojaDateAndTime ?? new Date().toISOString())
          : (dates.find((date) => pooja?.poojaDays[date.getDay()])?.toISOString() ??
            new Date().toISOString()),
    });
    setSelectedPooja(pooja);
  };

  // Calculate the total price based on number of additional members
  const calculateTotalPrice = (basePrice: number, additionalMembers: Member[]): number => {
    const additionalPrice = additionalMembers.length * (basePrice * additionalMemberRate);
    return basePrice + additionalPrice;
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!selectedPooja) return;

    if (selectedPooja.poojaPricing === 'variable') {
      const customAmountValue = formData.customAmount;
      const minPrice = selectedPooja.variablePriceRange?.startingPrice;
      const maxPrice = selectedPooja.variablePriceRange?.maximumPrice;
      const numericMinPrice = minPrice ? parseFloat(minPrice) : undefined;
      const numericMaxPrice = maxPrice ? parseFloat(maxPrice) : undefined;
      const numericValue = parseFloat(customAmountValue);

      if (customAmountValue === '' || isNaN(numericValue)) {
        toast.error('Please enter a valid offering amount.');
        return;
      }

      if (numericMinPrice !== undefined && numericValue < numericMinPrice) {
        toast.error(`Amount must be at least ₹${numericMinPrice}.`);
        return;
      }

      if (numericMaxPrice !== undefined && numericValue > numericMaxPrice) {
        toast.error(`Amount cannot exceed ₹${numericMaxPrice}.`);
        return;
      }
    }

    const basePrice =
      selectedPooja.poojaPricing === 'fixed'
        ? parseFloat(selectedPooja.price)
        : parseFloat(formData.customAmount);

    // Calculate the total price with additional members
    const totalPrice = calculateTotalPrice(basePrice, formData.members);

    const newCartItem: CartItem = {
      poojaId: selectedPooja.poojaId,
      templeId: selectedPooja.templeId,
      scheduleId: selectedPooja.id,
      poojaPrice: selectedPooja.price,
      price: totalPrice.toString(),
      ...formData,
    };

    setCartItems([...cartItems, newCartItem]);

    addToCart(newCartItem);

    setSelectedPooja(null);
    setFormData({
      name: '',
      starSign: '',
      members: [],
      poojaDate: '',
      customAmount: '',
    });
  };

  // Handle adding additional member
  const handleAddMember = (): void => {
    setFormData({
      ...formData,
      members: [...formData.members, { name: '', starSign: '' }],
    });
  };

  // Handle removing additional member
  const handleRemoveMember = (index: number): void => {
    const updatedMembers = [...formData.members];
    updatedMembers.splice(index, 1);
    setFormData({
      ...formData,
      members: updatedMembers,
    });
  };

  // Handle updating member info
  const handleMemberChange = (index: number, field: keyof Member, value: string): void => {
    const updatedMembers = [...formData.members];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      members: updatedMembers,
    });
  };

  // Get poojas by deity
  const getPoojasByDeity = (deityName: string): Pooja[] => {
    return poojas.filter((pooja) => pooja.deityName === deityName);
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* Header with back button */}
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center text-amber-900"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            <span>Back to Temple</span>
          </div>
        </div>
      </header>

      {/* Main content wrapper with max-width for larger screens */}
      <div className="mx-auto max-w-4xl">
        {/* Sub-navigation tabs */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto">
            <div className="flex overflow-x-auto">
              <button
                className={`flex-1 cursor-pointer px-4 py-4 text-center text-sm font-medium whitespace-nowrap ${
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
                className={`flex-1 cursor-pointer px-4 py-4 text-center text-sm font-medium whitespace-nowrap ${
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
        <div className="container mx-auto p-4 pt-0">
          {/* Deity Tab */}
          {mainTab === 'deity' && (
            <div>
              {!selectedDeity ? (
                // Deity selection grid
                <div>
                  <h3 className="mb-3 font-serif text-lg text-amber-900">Select a Deity</h3>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {deities
                      .filter((deity) => deity.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((deity, index) => (
                        <div
                          key={index}
                          className="cursor-pointer overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm"
                          onClick={() => setSelectedDeity(deity)}
                        >
                          <div key={index} className="bg-amber flex items-center rounded p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-orange-500">
                              <Sun className="h-5 w-5" />
                            </div>
                            <h4 className="text-md ms-3 font-medium text-amber-900">{deity}</h4>
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
                      {selectedDeity} - Available Poojas
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:!grid-cols-2">
                    {getPoojasByDeity(selectedDeity)
                      .filter((pooja) =>
                        pooja.poojaDetails.name.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .map((pooja) => (
                        <div
                          key={pooja.id}
                          className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-amber-900">
                                {pooja.poojaDetails.name}
                              </h4>
                              <p className="mt-1 text-sm font-medium text-amber-900">
                                {pooja.poojaPricing === 'fixed' ? (
                                  <>₹{pooja.price}</>
                                ) : (
                                  <>
                                    ₹{pooja.variablePriceRange?.startingPrice} – ₹
                                    {pooja.variablePriceRange?.maximumPrice}
                                  </>
                                )}
                              </p>
                            </div>
                            <button
                              className="flex cursor-pointer items-center rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white"
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

          {/* All Poojas Tab */}
          {mainTab === 'all' && (
            <div>
              <h3 className="mb-3 font-serif text-lg text-amber-900">All Available Poojas</h3>
              <div className="grid grid-cols-1 gap-4 md:!grid-cols-2">
                {poojas
                  .filter((pooja) =>
                    pooja.poojaDetails.name.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .map((pooja) => (
                    <div
                      key={pooja.id}
                      className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-amber-900">{pooja.poojaDetails.name}</h4>
                          <div className="mt-1 flex items-center">
                            <span className="text-sm text-gray-600">
                              {deities.find((d) => d === pooja.deityName)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm font-medium text-amber-900">
                            {pooja.poojaPricing === 'fixed' ? (
                              <>₹{pooja.price}</>
                            ) : (
                              <>
                                ₹{pooja.variablePriceRange?.startingPrice} – ₹
                                {pooja.variablePriceRange?.maximumPrice}
                              </>
                            )}
                          </p>{' '}
                        </div>
                        <button
                          className="flex cursor-pointer items-center rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white"
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
          <main className="flex flex-1 py-4">
            <CartBox />
          </main>
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingFormModal
        selectedPooja={selectedPooja}
        formData={formData}
        dates={dates}
        availableDates={availableDates}
        additionalMemberRate={additionalMemberRate}
        onClose={() => setSelectedPooja(null)}
        onFormDataChange={setFormData}
        onFormSubmit={handleFormSubmit}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
        onMemberChange={handleMemberChange}
        calculateTotalPrice={calculateTotalPrice}
      />
    </div>
  );
};

export default PoojaBooking;
