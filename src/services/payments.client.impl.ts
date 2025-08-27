// src/services/payments.client.impl.ts
import { RAZORPAY_KEY_ID, CHECKOUT_BRAND } from "../config/razorpay";
import type { CreateOrderInput, CreateOrderResponse, PaymentUser } from "../types/payments";
import { loadScript } from "./script-loader";

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

/** Example createOrder implementation */
export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResponse> {
  const res = await fetch("/api/payments/createOrder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error(`createOrder failed: ${res.statusText}`);
  }
  const data = await res.json();
  // expected server response: { orderId: string, amount: number, currency: string }
  return data as CreateOrderResponse;
}

/** Example openCheckout implementation */
export async function openCheckout(args: {
  orderId: string;
  amount: number;
  user: PaymentUser;
  onSuccess: (payload: { order_id: string; payment_id: string; signature: string }) => void;
  onFailure: (error: any) => void;
}) {
  await loadScript(RAZORPAY_SCRIPT);
  if (!window.Razorpay) throw new Error("Razorpay checkout script failed to load.");

  const options = {
    key: RAZORPAY_KEY_ID,
    order_id: args.orderId,
    amount: args.amount,
    currency: "INR",
    name: CHECKOUT_BRAND.name,
    image: CHECKOUT_BRAND.image,
    prefill: {
      name: args.user.name,
      email: args.user.email,
      contact: args.user.phone,
    },
    handler: (res: any) => {
      args.onSuccess({
        order_id: res.razorpay_order_id,
        payment_id: res.razorpay_payment_id,
        signature: res.razorpay_signature,
      });
    },
    // optional: modal & other fields
  };

  const rzp = new window.Razorpay(options as any);
  rzp.on("payment.failed", (err: any) => {
    args.onFailure(err);
  });
  rzp.open();
}
