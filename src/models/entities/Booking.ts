import { PaymentDetails } from '../../views/home/Checkout/types'; 
import { Member } from './Cart';
import { Pooja } from './Pooja';
import { Temple } from './Temple';

export interface Booking {
  id?: string;
  userId: string;
  templeId: string;
  poojas: Array<BookedPoojaDetails>;
  price: string;
  paymentDetails: PaymentDetails; 
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
