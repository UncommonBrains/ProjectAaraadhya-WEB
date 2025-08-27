// src/services/payments.client.ts
import type { CreateOrderInput, CreateOrderResponse, PaymentUser } from "../types/payments";

/**
 * Calls your server/cloud function that creates a Razorpay order.
 * - input.amount must be in paise (number).
 * - server should return { orderId, amount, currency }.
 */
export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResponse> {
  // PLAN / TODO:
  // 1) POST to your server endpoint (e.g. /api/payments/createOrder) with JSON body = input
  // 2) server uses Razorpay server SDK + secret key to create an order and returns order.id, amount, currency
  // 3) return { orderId: order.id, amount: order.amount, currency: order.currency }
  throw new Error("createOrder(): not implemented. Implement server call in this function.");
}

/**
 * Opens Razorpay Checkout for the provided order.
 * onSuccess receives { razorpay_order_id, razorpay_payment_id, razorpay_signature } (exact keys depend on handler)
 * onFailure receives the error / failure payload from checkout.
 */
export async function openCheckout(args: {
  orderId: string;
  amount: number; // in paise (same unit as the order)
  user: PaymentUser;
  onSuccess: (payload: { order_id: string; payment_id: string; signature: string }) => void;
  onFailure: (error: any) => void;
}): Promise<void> {
  // PLAN / TODO:
  // 1) load checkout script (use loadScript('https://checkout.razorpay.com/v1/checkout.js'))
  // 2) construct options:
  //    {
  //      key: RAZORPAY_KEY_ID,
  //      order_id: args.orderId,
  //      amount: args.amount,
  //      name: CHECKOUT_BRAND.name,
  //      image: CHECKOUT_BRAND.image,
  //      prefill: { name: args.user.name, email: args.user.email, contact: args.user.phone },
  //      handler: (res) => args.onSuccess({ order_id: res.razorpay_order_id, payment_id: res.razorpay_payment_id, signature: res.razorpay_signature })
  //    }
  // 3) instantiate: const rzp = new window.Razorpay(options); rzp.on('payment.failed', args.onFailure);
  // 4) rzp.open();
  throw new Error("openCheckout(): not implemented. Follow plan comments inside this function.");
}
