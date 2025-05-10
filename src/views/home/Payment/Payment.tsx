import { useState, useRef } from 'react';
import { Copy, CreditCard, UploadCloud, CheckCircle, ArrowRight, AlertCircle, ChevronLeft } from 'lucide-react';

interface PaymentMethod {
  type: 'bank' | 'upi';
  selected: boolean;
}

interface PaymentDetails {
  referenceId: string;
  screenshot: File | null;
}

// Dummy data for the temple payment details
const DUMMY_TEMPLE_DATA = {
  name: "Sri Mahaganapathy Temple",
  cartTotal: 1200,
  paymentDetails: {
    bankAccount: {
      accountName: "Sri Mahaganapathy Temple Trust",
      accountNumber: "1234567890123456",
      bankName: "State Bank of India",
      ifsc: "SBIN0001234"
    },
    upiId: "mahaganapathy@upi",
    upiName: "Temple Trust"
  }
};

const Payment: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Use dummy data instead of fetching from a view model
  const temple = DUMMY_TEMPLE_DATA;
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { type: 'bank', selected: true },
    { type: 'upi', selected: false }
  ]);
  
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    referenceId: '',
    screenshot: null,
  });
  
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({
    accountNumber: false,
    ifsc: false,
    upi: false,
  });
  
  const [paymentSubmitted, setPaymentSubmitted] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  const hasBankDetails = true; // Set to true or false based on your needs
  const hasUpiDetails = true; // Set to true or false based on your needs
  
  const selectedMethod = paymentMethods.find(method => method.selected)?.type || 'bank';
  
  // Handle navigating back (dummy implementation)
  const handleGoBack = () => {
    console.log("Navigate back");
    // In a real app, you'd use react-router's navigate(-1) here
  };
  
  // Handle method selection
  const handleMethodSelect = (type: 'bank' | 'upi') => {
    setPaymentMethods(prevMethods => 
      prevMethods.map(method => ({
        ...method,
        selected: method.type === type
      }))
    );
  };
  
  // Copy to clipboard functionality
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [field]: true });
    
    setTimeout(() => {
      setCopied({ ...copied, [field]: false });
    }, 2000);
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentDetails({
        ...paymentDetails,
        screenshot: e.target.files[0]
      });
    }
  };
  
  // Handle reference ID change
  const handleReferenceIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails({
      ...paymentDetails,
      referenceId: e.target.value
    });
  };
  
  // Submit payment confirmation
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsUploading(false);
      setPaymentSubmitted(true);
    }, 1500);
  };
  
  // Redirect to payment gateway if needed
  const handlePaymentRedirect = () => {
    // Would typically navigate to external payment gateway
    // For this example, we'll just simulate a completed payment after a delay
    console.log(`Redirecting to ${selectedMethod === 'bank' ? 'bank payment' : 'UPI app'}`);
  };
  
  // Bank account details display
  const renderBankDetails = () => {
    if (!hasBankDetails) return null;
    
    const { accountName, accountNumber, bankName, ifsc } = temple.paymentDetails.bankAccount;
    
    return (
      <div className={`rounded-lg border bg-white p-4 ${selectedMethod === 'bank' ? 'border-amber-300' : 'border-gray-200'}`}>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium text-amber-900">Bank Transfer Details</h3>
          {paymentMethods.length > 1 && (
            <div 
              className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-full ${
                selectedMethod === 'bank' ? 'bg-amber-500' : 'border border-gray-300'
              }`}
              onClick={() => handleMethodSelect('bank')}
            >
              {selectedMethod === 'bank' && <div className="h-2 w-2 rounded-full bg-white"></div>}
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500">Account Holder Name</p>
            <p className="text-sm font-medium text-gray-700">{accountName}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500">Bank Name</p>
            <p className="text-sm font-medium text-gray-700">{bankName}</p>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Account Number</p>
              <button 
                className="flex items-center text-xs text-amber-600"
                onClick={() => copyToClipboard(accountNumber, 'accountNumber')}
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
            <p className="text-sm font-medium text-gray-700">{accountNumber}</p>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">IFSC Code</p>
              <button 
                className="flex items-center text-xs text-amber-600"
                onClick={() => copyToClipboard(ifsc, 'ifsc')}
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
            <p className="text-sm font-medium text-gray-700">{ifsc}</p>
          </div>
        </div>
      </div>
    );
  };
  
  // UPI details display
  const renderUpiDetails = () => {
    if (!hasUpiDetails) return null;
    
    const { upiId, upiName } = temple.paymentDetails;
    
    return (
      <div className={`rounded-lg border bg-white p-4 ${selectedMethod === 'upi' ? 'border-amber-300' : 'border-gray-200'}`}>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium text-amber-900">UPI Payment Details</h3>
          {paymentMethods.length > 1 && (
            <div 
              className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-full ${
                selectedMethod === 'upi' ? 'bg-amber-500' : 'border border-gray-300'
              }`}
              onClick={() => handleMethodSelect('upi')}
            >
              {selectedMethod === 'upi' && <div className="h-2 w-2 rounded-full bg-white"></div>}
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {upiName && (
            <div>
              <p className="text-xs text-gray-500">UPI Name</p>
              <p className="text-sm font-medium text-gray-700">{upiName}</p>
            </div>
          )}
          
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">UPI ID</p>
              <button 
                className="flex items-center text-xs text-amber-600"
                onClick={() => copyToClipboard(upiId, 'upi')}
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
            <p className="text-sm font-medium text-gray-700">{upiId}</p>
          </div>
        </div>
      </div>
    );
  };
  
  // Payment confirmation form
  const renderPaymentForm = () => {
    if (paymentSubmitted) {
      return (
        <div className="mt-4 rounded-lg bg-green-50 p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h3 className="font-medium text-green-700">Payment Confirmed</h3>
          </div>
          <p className="mt-2 text-sm text-green-600">
            Your payment has been confirmed. Thank you for your booking!
          </p>
          <button
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-amber-600 px-4 py-3 font-medium text-white"
            onClick={() => console.log("Navigate to bookings")}
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
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Transaction/Reference ID
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-amber-200 p-3 focus:ring-2 focus:ring-amber-300 focus:outline-none"
              placeholder="Enter transaction ID"
              value={paymentDetails.referenceId}
              onChange={handleReferenceIdChange}
              required
            />
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
                  <p className="mt-1 text-xs text-gray-500">
                    Click to change file
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <UploadCloud className="mx-auto mb-2 h-8 w-8 text-amber-400" />
                  <p className="text-sm text-gray-600">Click to upload screenshot</p>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG up to 5MB
                  </p>
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
                  Please complete your payment before submitting this form. Once submitted, our team will verify your payment.
                </p>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-amber-600 px-4 py-3 font-medium text-white"
            disabled={isUploading || !paymentDetails.referenceId}
          >
            {isUploading ? (
              <>Processing...</>
            ) : (
              <>
                Confirm Payment
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
          <div
            onClick={handleGoBack}
            className="flex cursor-pointer items-center text-amber-900"
          >
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
            <span className="font-medium text-amber-900">₹{temple.cartTotal}</span>
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            <p>Temple: {temple.name}</p>
            <p>Booking ID: TMP{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-4 space-y-3">
          {renderBankDetails()}
          {renderUpiDetails()}
        </div>

        {/* Payment Button - Only show if not already submitted */}
        {!paymentSubmitted && (
          <button
            className="mb-4 flex w-full items-center justify-center rounded-lg bg-amber-500 px-4 py-3 font-medium text-white shadow-sm"
            onClick={handlePaymentRedirect}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            {selectedMethod === 'bank' ? 'Pay via Net Banking' : 'Pay via UPI App'}
          </button>
        )}

        {/* Payment Confirmation Form */}
        {renderPaymentForm()}
      </div>
    </div>
  );
};

export default Payment;