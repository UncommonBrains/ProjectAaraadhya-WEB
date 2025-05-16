import { useState, useRef } from 'react';
import {
  Copy,
  CreditCard,
  UploadCloud,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  ChevronLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { useTempleViewModel } from '../../../view-models/temple/useTempleViewModel';
import { generateUpiUrl, initiateUpiPayment } from '../../../utils/paymentHandler';
import UpiQrCode from '../../../components/common/UpiQrCode';
import { PaymentDetails, PaymentMethod } from './types';
import { useBookingViewModel } from '../../../view-models/booking/useBookingViewModel';
import { useAuth } from '../../../hooks/useAuth';
import { BookingStatus } from '../../../models/entities/Booking';
import { toast } from '../../../utils/toast';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { firebaseUser } = useAuth();
  const { bookPooja, loading } = useBookingViewModel();
  const { cart } = useCart();
  const { temple } = useTempleViewModel();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    paymentMethod: undefined,
    screenshot: null,
  });

  const [copied, setCopied] = useState<{ [key: string]: boolean }>({
    accountNumber: false,
    ifsc: false,
    upi: false,
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const hasBankDetails = true; // Set to true or false based on your needs
  const hasUpiDetails = true; // Set to true or false based on your needs

  // Handle navigating back (dummy implementation)
  const handleGoBack = () => {
    navigate(-1);
  };

  // Copy to clipboard functionality
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [field]: true });

    setTimeout(() => {
      setCopied({ ...copied, [field]: false });
    }, 2000);
  };

  const handleUpiPayment = () => {
    if (!temple?.advancedOptions?.bankDetails || !cart) {
      console.error('Missing required data: bank details or cart');
      return;
    }

    const { upiId, accountHolderName } = temple?.advancedOptions?.bankDetails;
    const { totalPrice } = cart;

    initiateUpiPayment(
      accountHolderName,
      upiId,
      totalPrice,
      `Payment for ${temple.basicDetails?.templeName}`,
    );
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentDetails({
        ...paymentDetails,
        screenshot: e.target.files[0],
      });
    }
  };

  // Submit payment confirmation
  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentDetails.paymentMethod || !paymentDetails.screenshot)
      return toast.error('Please select a payment method and upload a screenshot.');

    if (!firebaseUser?.uid || !temple?.id || !cart?.items || cart?.items.length < 1) return;

    try {
      await bookPooja({
        userId: firebaseUser.uid,
        templeId: temple.id,
        poojas: cart.items.map(({ poojaId, scheduleId,poojaDate, name, starSign, members }) => ({
          poojaId,
          scheduleId,
          poojaDate,
          name,
          starSign,
          members,
        })),
        price: cart.totalPrice,
        status: BookingStatus.PENDING,
        paymentDetails: {
          paymentMethod: paymentDetails.paymentMethod,
          screenshot: paymentDetails.screenshot,
        },
      });

      setIsSubmitted(true);
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  const renderQrCode = () => {
    if (!temple?.advancedOptions?.bankDetails || !cart) return null;

    const { upiId, accountHolderName } = temple?.advancedOptions?.bankDetails;
    const { totalPrice } = cart;

    const upiUrl = generateUpiUrl(
      accountHolderName,
      upiId,
      totalPrice,
      `Payment for ${temple.basicDetails?.templeName}`,
    );

    return (
      <div className="rounded-lg border border-amber-100 bg-white p-4">
        <UpiQrCode upiUrl={upiUrl} />
      </div>
    );
  };

  // UPI details display
  const renderUpiDetails = () => {
    if (!hasUpiDetails) return null;

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium text-amber-900">UPI Payment Details</h3>
        </div>

        <div className="space-y-3">
          {temple?.advancedOptions?.bankDetails?.accountHolderName && (
            <div>
              <p className="text-xs text-gray-500">UPI Name</p>
              <p className="text-sm font-medium text-gray-700">
                {temple?.advancedOptions?.bankDetails?.accountHolderName}
              </p>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">UPI ID</p>
              <button
                className="flex items-center text-xs text-amber-600"
                onClick={() =>
                  copyToClipboard(temple?.advancedOptions?.bankDetails?.upiId ?? '', 'upi')
                }
              >
                {copied.upi ? (
                  <>
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-3 w-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-sm font-medium text-gray-700">
              {temple?.advancedOptions?.bankDetails?.upiId}
            </p>
          </div>
        </div>
        <button
          className="my-4 flex w-full items-center justify-center rounded-lg bg-amber-500 px-4 py-3 font-medium text-white shadow-sm"
          onClick={handleUpiPayment}
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Pay via UPI App
        </button>
        <div className="my-4 flex w-full items-center">
          <div className="h-px flex-grow bg-amber-300 dark:bg-amber-700" />
          <span className="px-3 text-sm font-medium text-amber-500 dark:text-amber-400">OR</span>
          <div className="h-px flex-grow bg-amber-300 dark:bg-amber-700" />
        </div>
        {renderQrCode()}
      </div>
    );
  };

  // Bank account details display
  const renderBankDetails = () => {
    if (!hasBankDetails) return null;

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 ">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium text-amber-900">Bank Transfer Details</h3>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500">Account Holder Name</p>
            <p className="text-sm font-medium text-gray-700">
              {temple?.advancedOptions?.bankDetails?.accountHolderName}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Bank Name</p>
            <p className="text-sm font-medium text-gray-700">
              {temple?.advancedOptions?.bankDetails?.bankName}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Account Number</p>
              <button
                className="flex items-center text-xs text-amber-600"
                onClick={() =>
                  copyToClipboard(
                    temple?.advancedOptions?.bankDetails?.accountNumber ?? '',
                    'accountNumber',
                  )
                }
              >
                {copied.accountNumber ? (
                  <>
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-3 w-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-sm font-medium text-gray-700">
              {temple?.advancedOptions?.bankDetails?.accountNumber}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">IFSC Code</p>
              <button
                className="flex items-center text-xs text-amber-600"
                onClick={() =>
                  copyToClipboard(temple?.advancedOptions?.bankDetails?.ifscCode ?? '', 'ifsc')
                }
              >
                {copied.ifsc ? (
                  <>
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-3 w-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-sm font-medium text-gray-700">
              {temple?.advancedOptions?.bankDetails?.ifscCode}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Payment confirmation form
  const renderPaymentForm = () => {
    if (isSubmitted) {
      return (
        <div className="mt-4 rounded-lg bg-green-50 p-4 ">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h3 className="font-medium text-green-700">
              Your pooja has been successfully booked! (payment verification in progress)
            </h3>
          </div>
          <p className="mt-2 text-sm text-green-600">
            We're currently verifying your payment with the temple administrator. You'll receive an
            update on your booking status shortly.
          </p>
          <button
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-amber-600 px-4 py-3 font-medium text-white"
            onClick={() =>
              navigate('/my-bookings', {
                replace: true,
              })
            }
          >
            View Your Bookings
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmitPayment} className="mt-4">
        <div className="rounded-lg border border-amber-100 bg-white p-4">
          <h3 className="mb-3 font-medium text-amber-900">Payment Confirmation</h3>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              className="w-full rounded-lg border border-amber-200 p-2 focus:ring-2 focus:ring-amber-300 focus:outline-none"
              value={paymentDetails.paymentMethod}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  paymentMethod: e.target.value as PaymentMethod,
                })
              }
            >
              <option value="">Select Payment Method</option>
              <option key={PaymentMethod.UPI} value={PaymentMethod.UPI}>
                {PaymentMethod.UPI}
              </option>
              <option key={PaymentMethod.BANK_TRANSFER} value={PaymentMethod.BANK_TRANSFER}>
                {PaymentMethod.BANK_TRANSFER}
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Payment Screenshot (Optional)
            </label>
            <div
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-amber-200 p-6 hover:bg-amber-50"
              onClick={() => fileInputRef.current?.click()}
            >
              {paymentDetails.screenshot ? (
                <div className="text-center">
                  <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-500" />
                  <p className="text-sm font-medium text-green-600">
                    {paymentDetails.screenshot.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Click to change file</p>
                </div>
              ) : (
                <div className="text-center">
                  <UploadCloud className="mx-auto mb-2 h-8 w-8 text-amber-400" />
                  <p className="text-sm text-gray-600">Click to upload screenshot</p>
                  <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="rounded-md bg-amber-50 p-3">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <div className="ml-3">
                <p className="text-sm text-amber-700">
                  Please complete your payment before submitting this form. Once submitted, our team
                  will verify your payment.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-amber-600 px-4 py-3 font-medium text-white"
            disabled={loading}
          >
            {loading ? (
              <>Processing...</>
            ) : (
              <>
                Checkout
                <CheckCircle className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* Header with back button */}
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div onClick={handleGoBack} className="flex cursor-pointer items-center text-amber-900">
            <ChevronLeft className="mr-2 h-5 w-5" />
            <span>Back</span>
          </div>
          <h1 className="font-serif text-xl text-amber-900">Complete Payment</h1>
          <div className="w-16"></div> {/* Empty div for balanced centering */}
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto max-w-lg p-4">
        {/* Order Summary */}
        <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-2 font-serif text-lg text-amber-900">Order Summary</h2>
          <div className="flex justify-between border-b border-dashed border-amber-100 pb-2">
            <span className="text-gray-600">Total Amount</span>
            <span className="font-medium text-amber-900">₹{cart?.totalPrice}</span>
          </div>

          <div className="mt-2 text-sm text-gray-600">
            <p>Temple: {temple?.basicDetails?.templeName}</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-4 space-y-3">
          {renderUpiDetails()}
          {renderBankDetails()}
        </div>

        {/* Payment Confirmation Form */}
        {renderPaymentForm()}
      </div>
    </div>
  );
};

export default Checkout;
