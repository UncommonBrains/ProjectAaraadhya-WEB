export interface Deity {
  id: number;
  name: string;
  image: string;
}

export interface PoojaCategory {
  id: number;
  name: string;
  icon: string;
}

export interface Pooja {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  deityId: number;
}

export interface AdditionalMember {
  name: string;
  starSign: string;
}

export interface FormData {
  name: string;
  starSign: string;
  additionalMembers: AdditionalMember[];
  date: string;
  time: string;
}

export interface CartItem extends Pooja {
  basePrice: number;
  bookingDetails: FormData;
  additionalMembersCount: number;
}
