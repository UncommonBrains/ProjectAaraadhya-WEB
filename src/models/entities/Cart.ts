import { PoojaDetails } from './Pooja';

export interface Cart {
  items: CartItem[];
  totalPrice: string;
}

export interface CartItem {
  id?: string;
  poojaId: string;
  templeId: string;
  scheduleId: string;
  poojaPrice: string;
  price: string;
  name: string;
  starSign: string;
  members: Member[];
  poojaDate: string;
  poojaDetails?: PoojaDetails;
}

export interface Member {
  name: string;
  starSign: string;
}
