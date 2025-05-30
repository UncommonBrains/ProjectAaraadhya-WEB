import React from 'react';
import { X, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Pooja, ScheduleMode } from '../../models/entities/Pooja';
import { CartForm } from '../../views/home/PoojaBooking/types';
import { Member } from '../../models/entities/Cart';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import moment from 'moment';

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

interface BookingFormModalProps {
  selectedPooja: Pooja | null;
  formData: CartForm;
  dates: Date[];
  availableDates: Date[];
  additionalMemberRate: number;
  onClose: () => void;
  onFormDataChange: (formData: CartForm) => void;
  onFormSubmit: (e: React.FormEvent) => void;
  onAddMember: () => void;
  onRemoveMember: (index: number) => void;
  onMemberChange: (index: number, field: keyof Member, value: string) => void;
  calculateTotalPrice: (basePrice: number, additionalMembers: Member[]) => number;
}

const BookingFormModal: React.FC<BookingFormModalProps> = ({
  selectedPooja,
  formData,
  dates,
  availableDates,
  additionalMemberRate,
  onClose,
  onFormDataChange,
  onFormSubmit,
  onAddMember,
  onRemoveMember,
  onMemberChange,
  calculateTotalPrice,
}) => {
  if (!selectedPooja) return null;

  // Calculate dynamic price based on current number of additional members
  const currentPrice = calculateTotalPrice(parseFloat(selectedPooja.price), formData.members);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white">
        <div className="sticky top-0 rounded-t-lg bg-amber-100 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-amber-900">Book Pooja</h3>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200 text-amber-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4 rounded-lg bg-amber-50 p-3">
            <p className="font-medium text-amber-900">{selectedPooja.poojaDetails.name}</p>
            <div className="mt-1 flex justify-between">
              <p className="text-sm text-gray-600">Base Price: ₹{selectedPooja.price}</p>
              {formData.members.length > 0 && (
                <p className="font-medium text-amber-900">Total: ₹{currentPrice}</p>
              )}
            </div>
          </div>

          <form onSubmit={onFormSubmit}>
            {/* Main Devotee */}
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                className="w-full rounded-lg border border-amber-200 p-3 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
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
                onChange={(e) => onFormDataChange({ ...formData, starSign: e.target.value })}
              >
                <option value="">Select your star sign</option>
                {starSigns.map((sign) => (
                  <option key={sign} value={sign}>
                    {sign}
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
                  onClick={onAddMember}
                  className="flex items-center justify-center rounded-full bg-amber-100 p-1 text-amber-900"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {formData.members.length > 0 && (
                <p className="mb-2 text-xs text-amber-700">
                  Each additional member costs {additionalMemberRate * 100}% of the base price
                </p>
              )}

              {formData.members.map((member, index) => (
                <div key={index} className="mb-3 rounded-lg bg-amber-50 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-amber-900">
                      Member {index + 1} (₹
                      {(parseFloat(selectedPooja.price) * additionalMemberRate).toFixed(0)})
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveMember(index)}
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
                      onChange={(e) => onMemberChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <select
                      className="w-full rounded-lg border border-amber-200 p-2 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                      value={member.starSign}
                      onChange={(e) => onMemberChange(index, 'starSign', e.target.value)}
                      required
                    >
                      <option value="">Select star sign</option>
                      {starSigns.map((sign) => (
                        <option key={sign} value={sign}>
                          {sign}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Date and Calendar */}
            {selectedPooja.scheduleMode === ScheduleMode.repeat ? (
              <CustomDatePicker
                onSelected={(date) => {
                  if (date) {
                    onFormDataChange({
                      ...formData,
                      poojaDate: date.toISOString(),
                    });
                  }
                }}
                dates={dates}
                availableDates={availableDates}
              />
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pooja Date & Time
                </label>
                <h3>
                  {moment(selectedPooja.poojaDateAndTime).format('MMMM Do YYYY [-] h:mm A')}
                </h3>
                <br />
              </div>
            )}

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

export default BookingFormModal;