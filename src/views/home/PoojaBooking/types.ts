import { Member } from '../../../models/entities/Cart';

export interface Deity {
  id: number;
  name: string;
  image: string;
}

export interface CartForm {
  name: string;
  starSign: string;
  members: Member[];
  poojaDate: string;
}
