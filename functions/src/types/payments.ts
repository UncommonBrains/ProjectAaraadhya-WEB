// src/types/payments.ts

export interface PaymentUser {
  id: string;           // Firestore userId
  name: string;
  email: string;
  phone: string;
}

export interface CreateOrderInput {
  amount: number;       // in paise
  bookingId: string;    // your booking identifier
  user: PaymentUser;    // user details
  device?: string;      // optional device info
  notes?: Record<string, string>;
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
}

export interface PaymentOrder {
  orderId: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: "created" | "attempted" | "paid" | "failed";
  userId: string;
  userSnapshot: PaymentUser;
  razorpayResponse: any;
  events: { type: string; ts: string; [key: string]: any }[];
  createdAt: string;
  updatedAt: string;
}

// Alias for Firestore docs
export type FirestorePaymentOrder = PaymentOrder;
