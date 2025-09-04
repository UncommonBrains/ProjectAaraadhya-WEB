import { PaymentMethod } from '../../views/home/Checkout/types';
import { Member } from './Cart';
import { Pooja } from './Pooja';
import { Temple } from './Temple';

export interface Booking {
  id?: string;
  userId: string;
  templeId: string;
  poojas: Array<BookedPoojaDetails>;
  price: string;
  paymentDetails: PaymentDetails; // <-- updated
  status: BookingStatus;
  poojaDates: string[];
  templeDetails?: Temple;
}

interface BookedPoojaDetails extends Member {
  id: string;
  poojaId: string;
  scheduleId: string;
  poojaDate: string;
  members?: Member[];
  isCompleted: boolean;
  pooja?: Pooja;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  REFUNDED = 'refunded',
}

export type PaymentDetails =
  | {
      paymentMethod: PaymentMethod.RAZORPAY;
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      screenshot?: File;
      screenshotUrl?: string;
    }
  | {
      paymentMethod: Exclude<PaymentMethod, PaymentMethod.RAZORPAY>;
      screenshot?: File;
      screenshotUrl?: string;
    };
