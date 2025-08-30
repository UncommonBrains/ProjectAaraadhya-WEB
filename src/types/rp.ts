export {};

declare global {
  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id: string;
    prefill?: {
      name: string;
      email: string;
      contact: string;
    };
    theme?: {
      color: string;
    };
    handler: (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => void;
    modal?: {
      ondismiss?: () => void;
    };
  }

  interface RazorpayInstance {
    open(): void;
  }

  // 👇 This makes Razorpay available globally (from the script tag in index.html)
  const Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
}
