// src/types/global.d.ts
// Purpose: ambient declarations so TS recognizes window.Razorpay and the options we pass.

declare global {
  // Minimal set of options you will pass to Razorpay checkout.
  interface RazorpayOptions {
    key: string;                    // public key id
    amount?: number;                // optional; in paise
    currency?: string;
    name?: string;
    description?: string;
    order_id?: string;              // razorpay order id
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    notes?: Record<string, string>;
    // handler called on successful payment
    handler?: (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature?: string;
    }) => void;
    // optional modal callbacks
    modal?: {
      ondismiss?: () => void;
    };
    theme?: {
      color?: string;
    };
  }

  // Minimal instance we need
  interface RazorpayInstance {
    open(): void;
  }

  // Extend Window with a constructor-like Razorpay property
  interface Window {
    Razorpay?: {
      new (options: RazorpayOptions): RazorpayInstance;
    };
  }
}

// Make this file a module to avoid global-scope errors in some configs
export {};
