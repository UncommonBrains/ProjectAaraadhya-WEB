declare module "razorpay" {
  interface RazorpayOptions {
    key_id: string;
    key_secret: string;
  }

  interface OrderOptions {
    amount: number;
    currency: string;
    receipt?: string;
    payment_capture?: boolean | number;
    notes?: Record<string, string>;
  }

  interface Order {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
    created_at: number;
  }

  class Razorpay {
    constructor(options: RazorpayOptions);
    orders: {
      create(params: OrderOptions): Promise<Order>;
      fetch(orderId: string): Promise<Order>;
    };
  }

  export = Razorpay;
}
