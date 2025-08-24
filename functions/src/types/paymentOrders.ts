export interface PaymentOrder {
  amount: number; // rupees
  amountPaise: string; // paise (string)
  bookingId: string;
  createdAt: Date | string;
  updatedAt: Date | string;

  currency: string; // INR
  status: 'created' | 'pending' | 'completed' | 'failed' | 'cancelled';
  refundStatus?: string | null;

  orderId: string; // your internal booking/order ref if you use it
  razorpayOrderId: string; // Razorpay order_id
  razorpayPaymentId?: string | null;
  razorpaySignature?: string | null;

  paymentMethod?: string | null;
  failureReason?: string | null;

  userId: string;
  userSnapshot: { name: string; email: string; phone: string };

  meta?: { device?: string; ip?: string; [k: string]: any };
}
