import type { CreateOrderResponse } from "../types/payments";

/**
 * Opens Razorpay Checkout with the given order details.
 * @param order Response from your backend createOrder API (contains orderId, amount, currency)
 * @param onSuccess Callback when payment succeeds
 */
export function openRazorpayCheckout(
  order: CreateOrderResponse,
  onSuccess: (paymentId: string) => void
) {
  if (!window.Razorpay) {
    console.error("Razorpay SDK not loaded");
    return;
  }

  const options: RazorpayOptions = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Public test/live key from your .env
    amount: order.amount,                      // amount in paise
    currency: order.currency,
    order_id: order.orderId,
    name: "Aaraadhya",
    description: "Temple Booking Payment",
    handler: (response) => {
      onSuccess(response.razorpay_payment_id);
    },
    prefill: {
      name: "Devotee",
      email: "test@example.com",
      contact: "9999999999",
    },
    theme: {
      color: "#F59E0B", // amber
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
