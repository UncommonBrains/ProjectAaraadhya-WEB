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
  paymentDetails: {
    paymentMethod: PaymentMethod;
    screenshot?: File;
    screenshotUrl?: string;
  };
  status: BookingStatus;
  templeDetails?: Temple;
}

interface BookedPoojaDetails extends Member {
  poojaId: string;
  scheduleId: string;
  members?: Member[];
  pooja?: Pooja;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  REFUNDED = 'REFUNDED',
}
