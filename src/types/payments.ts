// src/types/payments.ts
// Purpose: shared frontend shapes for creating orders, typing responses and mapping to Firestore

// User who is paying
export type PaymentUser = {
  id: string;            // local user id (your DB)
  name: string;
  email: string;
  phone: string;         // international or local phone string (no arithmetic)
};

// Input the frontend sends to your server to create a Razorpay order.
// NOTE: amount is in paise (INR ₹ * 100)
export type CreateOrderInput = {
  amount: number;              // in paise (e.g. 49900 for ₹499.00)
  bookingId: string;           // your domain booking/reference id
  user: PaymentUser;
  device?: string;             // e.g. 'web', 'android'
  notes?: Record<string,string>;
};

// Server response after creating Razorpay order (minimal)
export type CreateOrderResponse = {
  orderId: string;    // Razorpay order_id (e.g. 'order_XXXXXXXX')
  amount: number;     // in paise (same as request)
  currency: string;   // e.g. 'INR'
};

// Typical payment lifecycle statuses you can store in your Firestore
export type PaymentStatus = 
  | 'created'    // order created in Razorpay but no payment yet
  | 'paid'       // payment successful
  | 'failed'     // payment failed
  | 'captured'   // payment captured (if manual capture flow)
  | 'refunded'   // refunded
  | 'cancelled';

// The Firestore document shape for a payment order
export type PaymentOrder = {
  id?: string;                   // Firestore doc id (optional when creating)
  orderId: string;               // Razorpay order id
  bookingId: string;
  user: PaymentUser;
  amount: number;                // in paise
  currency: string;              // 'INR'
  status: PaymentStatus;
  createdAt?: number | string;   // timestamp or ISO string; you may use firestore.Timestamp instead
  updatedAt?: number | string;
  paymentId?: string;            // razorpay_payment_id (populated once paid)
  notes?: Record<string,string>;
  device?: string;
  metadata?: Record<string, unknown>;
};
