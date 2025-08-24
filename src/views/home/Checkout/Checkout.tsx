import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/common/CartContext/CartContext';
import { getTempleById } from '../../../services/templeService';
import {
  CreditCard,
  CheckCircle,
  ArrowRight,
  Loader2,
  Smartphone,
  Building2,
  Wallet,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../hooks/useToast';
import { createRazorpayOrder, verifyRazorpayPayment } from '../../../services/razorpay/razorpay';
import { loadRazorpayScript, openRazorpayCheckout } from '../../../utils/paymentHandler';

// Payment Gateway Types
enum PaymentGateway {
  RAZORPAY = 'razorpay',
  CASHFREE = 'cashfree',
}

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'upi' | 'wallet' | 'netbanking' | 'cod' | 'payment_gateway';
  description: string;
  icon: string;
  balance?: string;
  gateway: PaymentGateway;
  lastUsed?: string;
  disabled?: boolean;
}

interface PaymentProcessingState {
  isLoading: boolean;
  selectedMethod: string;
  error?: string;
  showConfirmation: boolean;
}

const Checkout: React.FC = () => {
  const [paymentState, setPaymentState] = useState<PaymentProcessingState>({
    isLoading: false,
    selectedMethod: 'razorpay_gateway',
    showConfirmation: false,
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const cartContext = useContext(CartContext);
  const cart = cartContext?.cart;

  // State for temple details
  const [templeName, setTempleName] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemple = async () => {
      const templeId = cart?.items?.[0]?.templeId;
      if (templeId) {
        try {
          const temple = await getTempleById(templeId);
          console.log('Fetched temple:', temple); // <-- Add this line
          setTempleName(temple?.basicDetails?.templeName ?? null);
        } catch (e) {
          setTempleName(null);
          console.error('Error fetching temple:', e); // <-- And this
        } 
      } else {
        setTempleName("");
      }
    };
    fetchTemple();
  }, [cart?.items]);



  // Payment Methods Configuration (Only Razorpay & Cashfree)
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'razorpay_gateway',
      name: 'Razorpay',
      type: 'payment_gateway',
      description: 'Pay securely via Razorpay',
      icon: 'mastercard',
      gateway: PaymentGateway.RAZORPAY,
      disabled: false,
    },
    {
      id: 'cashfree_gateway',
      name: 'Cashfree',
      type: 'payment_gateway',
      description: 'Pay securely via Cashfree',
      icon: 'cards',
      gateway: PaymentGateway.CASHFREE,
      disabled: true,
    },
  ];

  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === paymentState.selectedMethod,
  );

  const handleGoBack = () => {
    setPaymentState((prev) => ({ ...prev, showConfirmation: false }));
  };

  const handleUsePaymentMethod = () => {
    setPaymentState((prev) => ({ ...prev, showConfirmation: true }));
  };

  const handleProceedWithPayment = async () => {
    setPaymentState((prev) => ({ ...prev, isLoading: true, error: undefined }));

    if (!user || !cart) {
      toast.error('You must be logged in and have items in your cart to proceed.');
      setPaymentState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error('Failed to load payment gateway. Please try again.');
      setPaymentState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      const bookingId = `${user.uid}-${Date.now()}`;
      const orderPayload = {
        amount: cart.totalPrice,
        bookingId: bookingId,
        user: {
          id: user.uid,
          name: user.displayName || 'Anonymous User',
          email: user.email || 'no-email@example.com',
          phone: '9999999999', // Razorpay requires a phone number
        },
      };

      const result = await createRazorpayOrder(orderPayload);
      const order = result.data;

      openRazorpayCheckout({
        order,
        user: orderPayload.user,
        onSuccess: async (paymentResult) => {
          try {
            const verificationResult = await verifyRazorpayPayment({
              razorpay_order_id: paymentResult.razorpay_order_id,
              razorpay_payment_id: paymentResult.razorpay_payment_id,
              razorpay_signature: paymentResult.razorpay_signature,
            });

            if (verificationResult.data.ok) {
              navigate('/success'); // Redirect to success page
            } else {
              navigate('/fail'); // Redirect to failure page
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed. Please contact support.');
            navigate('/fail');
          }
        },
        onFailure: () => {
          toast.info('Payment was cancelled.');
          navigate('/fail'); // Redirect to failure page
        },
      });
    } catch (error) {
      console.error('Failed to create Razorpay order:', error);
      toast.error('Could not initiate payment. Please try again.');
    } finally {
      // The loading state will be managed by navigation or modal closure
      setPaymentState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const getMethodIcon = (iconType: string) => {
    const iconProps = 'h-6 w-6';
    switch (iconType) {
      case 'mastercard':
        return <div className="rounded bg-red-500 p-1 text-xs font-bold text-white">MC</div>;
      case 'visa':
        return <div className="rounded bg-blue-600 p-1 text-xs font-bold text-white">VISA</div>;
      case 'bajaj':
        return <div className="rounded bg-blue-700 p-1 text-xs font-bold text-white">B</div>;
      case 'upi':
        return <Smartphone className={iconProps} />;
      case 'amazon':
        return <div className="rounded bg-orange-500 p-1 text-xs font-bold text-white">A</div>;
      case 'gift':
        return <div className="rounded bg-green-500 p-1 text-xs font-bold text-white">G</div>;
      case 'hdfc':
        return <div className="rounded bg-blue-800 p-1 text-xs font-bold text-white">H</div>;
      case 'cards':
        return <CreditCard className={iconProps} />;
      case 'bank':
        return <Building2 className={iconProps} />;
      case 'emi':
        return <div className="rounded bg-purple-600 p-1 text-xs font-bold text-white">EMI</div>;
      case 'cash':
        return <Wallet className={iconProps} />;
      default:
        return <CreditCard className={iconProps} />;
    }
  };

  const renderPaymentMethods = () => {
    return (
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <h3 className="font-medium text-gray-900">Payment method</h3>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="p-4">
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center rounded border p-3 transition-colors ${
                    method.disabled
                      ? 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-60'
                      : paymentState.selectedMethod === method.id
                        ? 'cursor-pointer border-orange-500 bg-orange-50'
                        : 'cursor-pointer border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() =>
                    !method.disabled &&
                    setPaymentState((prev) => ({ ...prev, selectedMethod: method.id }))
                  }
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value={method.id}
                    checked={paymentState.selectedMethod === method.id && !method.disabled}
                    disabled={method.disabled}
                    onChange={() => {}}
                    className="mr-3 text-orange-500"
                  />
                  <div className="mr-3">{getMethodIcon(method.icon)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{method.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Use this payment method button */}
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <button
            onClick={handleUsePaymentMethod}
            disabled={!paymentState.selectedMethod}
            className={`w-full rounded px-4 py-2 text-sm font-medium transition-colors ${
              !paymentState.selectedMethod
                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
            }`}
          >
            Use this payment method
          </button>
        </div>
      </div>
    );
  };

  const renderPaymentConfirmation = () => {
    return (
      <div className="rounded-lg border border-gray-200 bg-white">
        {/* Header with back button */}
        <div className="border-b border-gray-200 p-4">
          <button
            onClick={handleGoBack}
            className="mb-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to payment methods
          </button>
          <h3 className="font-medium text-gray-900">
            Proceed with payment using {selectedPaymentMethod?.name}
          </h3>
        </div>

        {/* Selected Payment Method Display */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center rounded border border-orange-500 bg-orange-50 p-3">
            <div className="mr-3">{getMethodIcon(selectedPaymentMethod?.icon || 'cards')}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{selectedPaymentMethod?.name}</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-sm text-gray-600">{selectedPaymentMethod?.description}</div>
            </div>
          </div>
        </div>

        {/* Order Summary in Payment Confirmation */}
        <div className="border-b border-gray-200 p-4">
          <h4 className="mb-3 font-medium text-gray-900">Order Summary</h4>
          <div className="space-y-2">
            {cart?.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div>
                  <div className="font-medium text-gray-900">
                    {item.name || item.poojaDetails?.name}
                  </div>
                  <div className="text-gray-600">Date: {item.poojaDate}</div>
                </div>
                <div className="font-medium text-gray-900">₹{item.price}</div>
              </div>
            ))}
          </div>

          <hr className="my-3" />

          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>
                ₹{cart?.items.reduce((sum, item) => sum + parseFloat(item.price), 0) || '0.00'}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Transaction Charges:</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 font-medium text-gray-900">
              <span>Total Amount:</span>
              <span>₹{cart?.totalPrice || '0.00'}</span>
            </div>
          </div>
        </div>

        {/* Proceed with Payment button */}
        <div className="bg-gray-50 p-4">
          <button
            onClick={handleProceedWithPayment}
            disabled={paymentState.isLoading}
            className={`w-full rounded px-4 py-3 text-sm font-medium transition-colors ${
              paymentState.isLoading
                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {paymentState.isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Payment...
              </div>
            ) : (
              `Proceed with Payment using ${selectedPaymentMethod?.name}`
            )}
          </button>

          <div className="mt-2 text-center text-xs text-gray-500">
            You will be redirected to {selectedPaymentMethod?.name} to complete your payment
          </div>
        </div>
      </div>
    );
  };

  const renderSuccessState = () => {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
        <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-500" />
        <h3 className="mb-2 text-lg font-medium text-green-700">Payment Successful!</h3>
        <p className="mb-4 text-sm text-gray-600">
          Your pooja has been booked successfully via {selectedPaymentMethod?.name}. You'll receive
          a confirmation shortly.
        </p>
        <button
          className="inline-flex items-center justify-center rounded bg-orange-500 px-6 py-2 font-medium text-white hover:bg-orange-600"
          onClick={() => console.log('Navigate to bookings')}
        >
          View Your Bookings
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <header className="bg-gray-900 p-4 text-white">
          <div className="container mx-auto flex max-w-6xl items-center justify-between">
            <div className="text-xl font-bold text-white">templepooja</div>
            <div className="text-sm">Payment Complete</div>
            <div className="w-16"></div>
          </div>
        </header>
        <div className="container mx-auto max-w-2xl p-4 py-8">{renderSuccessState()}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-gray-900 p-4 text-white">
        <div className="container mx-auto flex max-w-6xl items-center justify-between">
          <div className="text-xl font-bold text-white">
            {paymentState.showConfirmation ? 'Confirm Payment' : 'Secure checkout'}
          </div>
          <div className="w-16"></div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl p-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Payment Methods or Confirmation */}
          <div className="lg:col-span-2">
            {/* Delivery Address */}
            <div className="mb-4 rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-900">
                      {cart?.items?.[0]?.templeId
                      ? `Booking for poojas at ${templeName}`
                      : 'Booking for poojas'}
                  </h3>
                </div>
              </div>
            </div>

            {/* Payment Methods or Confirmation */}
            {paymentState.showConfirmation ? renderPaymentConfirmation() : renderPaymentMethods()}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-lg border border-gray-200 bg-white p-4">
              {!paymentState.showConfirmation && (
                <>
                  <button
                    onClick={handleUsePaymentMethod}
                    disabled={!paymentState.selectedMethod}
                    className={`mb-4 w-full rounded px-4 py-3 text-sm font-medium transition-colors ${
                      !paymentState.selectedMethod
                        ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                        : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                    }`}
                  >
                    Use this payment method
                  </button>

                  <div className="mb-4 text-sm text-gray-600">
                    Choose a payment method to continue checking out. You'll still have a chance to
                    review and edit your order before it's final.
                  </div>

                  <hr className="my-4" />
                </>
              )}

              <h4 className="mb-3 font-medium text-gray-900">
                Order Total: <span className="float-right">₹{cart?.totalPrice || '0.00'}</span>
              </h4>

              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>
                    ₹{cart?.items.reduce((sum, item) => sum + parseFloat(item.price), 0) || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction Charges:</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 font-medium text-gray-900">
                  <span>Order Total:</span>
                  <span>₹{cart?.totalPrice || '0.00'}</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="text-xs text-gray-500">
                <p className="mb-2">How are delivery costs calculated?</p>
                <p>
                  By placing your order, you agree to Temple Pooja's privacy notice and conditions
                  of use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
