import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../../config/firebase';

const functions = getFunctions(app, 'asia-south1');

// Define the expected request and response types for clarity

interface CreateOrderRequest {
  amount: number;
  bookingId: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  key: string;
}

interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface VerifyPaymentResponse {
  ok: boolean;
}

/**
 * Calls the Firebase Cloud Function to create a Razorpay order.
 * @param data - The data required to create the order.
 * @returns The response from the cloud function, containing order details.
 */
export const createRazorpayOrder = httpsCallable<
  CreateOrderRequest,
  CreateOrderResponse
>(functions, 'createRazorpayOrder');

/**
 * Calls the Firebase Cloud Function to verify a Razorpay payment.
 * @param data - The payment details from Razorpay.
 * @returns The response from the cloud function, indicating if verification was successful.
 */
export const verifyRazorpayPayment = httpsCallable<
  VerifyPaymentRequest,
  VerifyPaymentResponse
>(functions, 'verifyPayment');
