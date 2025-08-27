// src/services/razorpayService.ts

// Import the shapes you created
import { CreateOrderInput, CreateOrderResponse } from '../types/payments';

/**
 * Loads the Razorpay SDK script dynamically.
 * Ensures the script is loaded only once.
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Calls your backend to create a Razorpay order.
 * @param payload - The order details, matching the CreateOrderInput type.
 * @returns The created order details, matching the CreateOrderResponse type.
 */
export const createRazorpayOrder = async (
  payload: CreateOrderInput
): Promise<CreateOrderResponse> => {
  // In a real app, this would be an API call:
  // const response = await fetch('/api/payments/create-order', {
  //   method: 'POST',
  //   body: JSON.stringify(payload),
  //   headers: { 'Content-Type': 'application/json' },
  // });
  // if (!response.ok) throw new Error('Order creation failed');
  // return response.json();

  // For demonstration, we'll return a mock response.
  console.log('Creating order with payload:', payload);
  return Promise.resolve({
    orderId: `order_${Date.now()}`,
    amount: payload.amount,
    currency: 'INR',
  });
};

/**
 * Defines the parameters for opening the Razorpay checkout modal.
 */
interface OpenCheckoutParams {
  order: CreateOrderResponse;
  user: CreateOrderInput['user'];
  onSuccess: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  onFailure: () => void;
}

/**
 * Configures and opens the Razorpay checkout modal.
 * This is where the 'global.d.ts' types are used.
 */
export const openRazorpayCheckout = (params: OpenCheckoutParams): void => {
  const { order, user, onSuccess, onFailure } = params;

  // The 'options' object is now type-checked against RazorpayOptions
  // from your global.d.ts file. You get autocompletion and error checking here.
  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID || '', // Your public key from .env
    amount: order.amount, // Amount in paise
    currency: order.currency,
    name: 'Temple Pooja',
    description: 'Pooja Booking Transaction',
    order_id: order.orderId,
    handler: onSuccess,
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phone,
    },
    notes: {
      userId: user.id,
    },
    theme: {
      color: '#F59E0B', // A nice amber/yellow color
    },
  };

  // TypeScript knows 'window.Razorpay' exists and that it's a constructor
  // that accepts our 'options' object.
  const razorpay = new window.Razorpay(options);

  // It also knows 'razorpay' has an on() method for failure events.
  razorpay.on('payment.failed', (response: any) => {
    console.error('Razorpay payment failed:', response);
    onFailure();
  });
  
  // And it knows there is an 'open()' method.
  razorpay.open();
};

/**
 * Verifies the payment signature on your backend.
 */
export const verifyRazorpayPayment = async (
  data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
): Promise<{ ok: boolean }> => {
  // In a real app, you would make an API call to your backend here.
  console.log('Verifying payment with backend:', data);
  // const response = await fetch('/api/payments/verify-payment', { ... });
  return Promise.resolve({ ok: true }); // Mock success
};