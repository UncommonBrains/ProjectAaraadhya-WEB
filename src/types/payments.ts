// src/types/payments.ts

/**
 * Represents the user details required for a payment prefill.
 */
export type PaymentUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

/**
 * Defines the input structure for creating a new payment order on your backend.
 * @property amount - The order amount in the smallest currency unit (e.g., paise for INR).
 */
export type CreateOrderInput = {
  amount: number; // Amount in paise
  bookingId: string;
  user: PaymentUser;
  device?: string;
  notes?: Record<string, string>;
};

/**
 * Represents the successful response from your backend after creating a payment order.
 */
export type CreateOrderResponse = {
  orderId: string;
  amount: number; // Amount in paise
  currency: string;
};

/**
 * A union type representing the possible states of a payment order.
 */
export type PaymentStatus = 'created' | 'attempted' | 'paid' | 'failed';

/**
 * Represents the structure of a payment order object, mirroring the Firestore schema.
 * This object tracks the entire lifecycle of a payment.
 */
export type PaymentOrder = {
  id: string; // Document ID in Firestore
  orderId: string; // The ID from the payment gateway (e.g., Razorpay)
  userId: string;
  bookingId: string;
  amount: number; // Amount in paise
  currency: string;
  status: PaymentStatus;
  notes?: Record<string, string>;
  createdAt: Date; // Or your preferred timestamp type (e.g., Firestore's Timestamp)
  updatedAt: Date; // Or your preferred timestamp type
  paymentId?: string; // Gateway's payment ID, added on success
  signature?: string; // Gateway's signature, added on success
};