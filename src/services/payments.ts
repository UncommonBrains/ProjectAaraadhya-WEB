import type { CreateOrderInput, CreateOrderResponse, PaymentUser } from "../types/payments";


export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResponse> {
  const res = await fetch("/api/payments/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(await res.text() || "Failed to create Razorpay order");
  }

  const data = await res.json();
  return {
    orderId: data.orderId,
    amount: data.amount,
    currency: data.currency,
  };
}


export async function openCheckout(args: {
  orderId: string;
  amount: number;
  user: PaymentUser;
  onSuccess: (payload: { order_id: string; payment_id: string; signature: string }) => void;
  onFailure: (error: any) => void;
}): Promise<void> {
  const Razorpay = (window as any).Razorpay;
  if (!Razorpay) {
    throw new Error("Razorpay SDK not loaded. Did you add the <script> in index.html?");
  }

  const options: any = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // your public Razorpay key
    order_id: args.orderId,
    amount: args.amount,
    currency: "INR",
    name: "Your Brand / Temple",
    description: "Payment for booking",
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
  };

  const rzp = new Razorpay(options);
  rzp.on("payment.failed", args.onFailure);
  rzp.open();
}

