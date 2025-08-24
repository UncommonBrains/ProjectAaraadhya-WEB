import { CreateOrderResponse } from '../services/razorpay/razorpay';

const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

// This is a global variable from the Razorpay script
declare const window: any;

/**
 * Dynamically loads the Razorpay checkout script.
 * @returns A promise that resolves when the script is loaded.
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if the script is already loaded
    if (document.querySelector(`script[src="${RAZORPAY_SCRIPT}"]`)) {
      return resolve(true);
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

interface PaymentHandlerArgs {
  order: CreateOrderResponse;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  onSuccess: (data: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  onFailure: () => void;
}

/**
 * Opens the Razorpay checkout modal.
 * @param args - The arguments for the payment handler.
 */
export const openRazorpayCheckout = (args: PaymentHandlerArgs) => {
  const { order, user, onSuccess, onFailure } = args;

  const options: RazorpayOptions = {
    key: order.key,
    amount: order.amount,
    currency: order.currency,
    name: 'Temple Pooja',
    description: 'Test Transaction',
    order_id: order.orderId,
    handler: onSuccess,
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phone,
    },
    notes: {
      address: 'Temple Pooja Corporate Office',
    },
    theme: {
      color: '#F37254',
    },
    modal: {
      ondismiss: onFailure,
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
