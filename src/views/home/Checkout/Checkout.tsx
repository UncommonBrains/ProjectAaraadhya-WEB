import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/common/CartContext/CartContext';
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
// import { useToast } from '../../../hooks/useToast';
import { v4 as uuidv4 } from 'uuid';
import { useBookingViewModel } from '../../../view-models/booking/useBookingViewModel';
import { useTempleViewModel } from '../../../view-models/temple/useTempleViewModel';
import { BookingStatus } from '../../../models/entities/Booking';
import { toast } from '../../../utils/toast';
import { getDateFromISOString } from '../../../utils/dateFormatters';
import { PaymentMethod } from './types';

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
  const [templeName, setTempleName] = useState<string | null>(null);

  const navigate = useNavigate();

  const { user } = useAuth();
  const cartContext = useContext(CartContext);
  const cart = cartContext?.cart;
  const { temple } = useTempleViewModel();



  // const { showToast } = useToast();

  const { bookPooja, loading: bookingLoading } = useBookingViewModel();

  // Set temple name from useTempleViewModel
  useEffect(() => {
    if (temple?.basicDetails?.templeName) {
      setTempleName(temple.basicDetails.templeName);
    }
  }, [temple]);

  // Payment Methods Configuration
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

  const handlePayment = async () => {
    console.log('User UID:', user?.uid);

    if (!user?.uid) {
      toast.error('Please login to continue');
      return;
    }

    if (!cart?.items || cart.items.length < 1) {
      toast.error('Cart is empty. Please add items to proceed.');
      return;
    }

    setPaymentState((prev) => ({ ...prev, isLoading: true }));

    try {
      console.log('Making request to create order...');

      const response = await fetch('https://createrazorpayorder-t5n6l44z2q-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: user.uid }),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        console.error('Server error response:', responseText);
        throw new Error(`Server error: ${response.status} - ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response JSON:', parseError);
        throw new Error('Invalid response format from server');
      }

      console.log('Parsed order data:', data);

      if (!data.order || !data.order.id || !data.order.amount) {
        const errorMsg = data.error || 'Unknown error occurred';
        console.error('No order in response:', errorMsg);
        toast.error('Error creating order: ' + errorMsg);
        return;
      }

      console.log('Order created successfully, initializing Razorpay...');

      const options = {
        key: 'rzp_test_R79F1bWUTRYNZh',
        amount: data.order.amount,
        currency: 'INR',
        name: 'Aaraadhya',
        description: 'Demo Payment',
        image: null,
        order_id: data.order.id,
        prefill: {
          name: user.displayName || 'Test User',
          email: user.email || 'test@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          console.log('Payment successful:', response);

          try {
            // Verify payment with backend
            const verifyResponse = await fetch(
              'https://us-central1-project-aaraadhya-v1.cloudfunctions.net/verifyRazorpayPayment',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  uid: user.uid,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              },
            );

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.success) {
              console.error('Payment verification failed:', verifyData.error);
              toast.error('Payment verification failed: ' + (verifyData.error || 'Unknown error'));
              setPaymentState((prev) => ({ ...prev, isLoading: false }));
              return;
            }

            // Call bookPooja after successful verification
            const templeId = temple?.id || cart.items[0]?.templeId;
            if (!templeId) {
              console.error('Temple ID is missing');
              toast.error('Temple ID is missing. Please try again.');
              setPaymentState((prev) => ({ ...prev, isLoading: false }));
              return;
            }

            await bookPooja({
              userId: user.uid,
              templeId: templeId,
              poojas: cart.items.map(
                ({ poojaId, scheduleId, poojaDate, name, starSign, members }) => ({
                  id: uuidv4(),
                  poojaId,
                  scheduleId,
                  poojaDate,
                  name,
                  starSign,
                  members,
                  isCompleted: false,
                }),
              ),
              price: cart.totalPrice,
              status: BookingStatus.CONFIRMED,
              paymentDetails: {
                paymentMethod: PaymentMethod.RAZORPAY,
                // razorpay_payment_id: response.razorpay_payment_id,
                // razorpay_order_id: response.razorpay_order_id,
                // razorpay_signature: response.razorpay_signature,
              },
              poojaDates: cart.items.map(({ poojaDate }) => getDateFromISOString(poojaDate)),
            });

            setIsSubmitted(true);
            toast.success('Payment and booking successful!');
            // setCart(null);
            
          } catch (err) {
            console.error('Error during payment verification or booking:', err);
            toast.error('Error processing payment or booking: ' + (err.message || 'Unknown error'));
            setPaymentState((prev) => ({ ...prev, isLoading: false }));
          }
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal closed');
            setPaymentState((prev) => ({ ...prev, isLoading: false }));
            toast.info('Payment modal closed. Please complete the payment to proceed.');
          },
        },
      };

      if (!(window as any).Razorpay) {
        throw new Error('Razorpay SDK not loaded. Please refresh the page.');
      }

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error details:', err);
      setPaymentState((prev) => ({ ...prev, isLoading: false }));

      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        toast.error(
          'Network error: Unable to connect to payment server. Please check your internet connection and try again.',
        );
      } else if (err.message.includes('Server error: 500')) {
        toast.error('Payment service temporarily unavailable. Please try again in a few minutes.');
      } else {
        toast.error('Failed to initiate payment: ' + err.message);
      }
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
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <button
            onClick={handleUsePaymentMethod}
            disabled={!paymentState.selectedMethod || paymentState.isLoading || bookingLoading}
            className={`w-full rounded px-4 py-2 text-sm font-medium transition-colors ${
              !paymentState.selectedMethod || paymentState.isLoading || bookingLoading
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
    if (isSubmitted) {
      return (
        <div className="mt-4 rounded-lg bg-green-50 p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h3 className="font-medium text-green-700">Your pooja has been successfully booked!</h3>
          </div>
          <p className="mt-2 text-sm text-green-600">
            Your payment has been processed, and your booking is confirmed. You'll receive a
            confirmation soon.
          </p>
          <button
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-yellow-400 px-4 py-3 font-medium text-gray-900 hover:bg-yellow-500"
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
      <div className="rounded-lg border border-gray-200 bg-white">
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
        <div className="bg-gray-50 p-4">
          <button
            onClick={handlePayment}
            disabled={paymentState.isLoading || bookingLoading}
            className={`w-full rounded px-4 py-3 text-sm font-medium transition-colors ${
              paymentState.isLoading || bookingLoading
                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {paymentState.isLoading || bookingLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-gray-900 p-4 text-white">
        <div className="container mx-auto flex max-w-6xl items-center justify-between">
          <div className="text-xl font-bold text-white">
            {isSubmitted
              ? 'Booking Confirmed'
              : paymentState.showConfirmation
                ? 'Confirm Payment'
                : 'Secure checkout'}
          </div>
          <div className="w-16"></div>
        </div>
      </header>

      {isSubmitted ? (
        <div className="container mx-auto max-w-6xl p-4 py-6">
          <div className="rounded-lg bg-green-50 p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="font-medium text-green-700">
                Your pooja has been successfully booked!
              </h3>
            </div>
            <p className="mt-2 text-sm text-green-600">
              Your payment has been processed, and your booking is confirmed. You'll receive a
              confirmation soon.
            </p>
            <button
              className="mt-4 flex w-full items-center justify-center rounded-lg bg-yellow-400 px-4 py-3 font-medium text-gray-900 hover:bg-yellow-500"
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
        </div>
      ) : (
        <div className="container mx-auto max-w-6xl p-4 py-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-4 rounded-lg border border-gray-200 bg-white">
                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">
                      {templeName ? `Booking for poojas at ${templeName}` : 'Booking for poojas'}
                    </h3>
                  </div>
                </div>
              </div>
              {paymentState.showConfirmation ? renderPaymentConfirmation() : renderPaymentMethods()}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-4 rounded-lg border border-gray-200 bg-white p-4">
                {!paymentState.showConfirmation && (
                  <>
                    <button
                      onClick={handleUsePaymentMethod}
                      disabled={
                        !paymentState.selectedMethod || paymentState.isLoading || bookingLoading
                      }
                      className={`mb-4 w-full rounded px-4 py-3 text-sm font-medium transition-colors ${
                        !paymentState.selectedMethod || paymentState.isLoading || bookingLoading
                          ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                          : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                      }`}
                    >
                      Use this payment method
                    </button>
                    <div className="mb-4 text-sm text-gray-600">
                      Choose a payment method to continue checking out. You'll still have a chance
                      to review and edit your order before it's final.
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
                      ₹
                      {cart?.items.reduce((sum, item) => sum + parseFloat(item.price), 0) || '0.00'}
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
      )}
    </div>
  );
};

export default Checkout;
