import { Temple } from './Temple';
export interface Pooja {
  id: string;
  poojaId: string;
  templeId: string;
  poojaDetails: PoojaDetails;
  deityName: string;
  price: string;
  isActive: boolean;
  poojaDateAndTime?: string;
  poojaDays: Array<boolean>;
  poojaDates?: Array<string>;
  poojaTime: string;
  scheduleMode: ScheduleMode;
  templeDetails?: Temple;
  poojaPricing?:string;
  variablePriceRange?: VariablePrice;
}

export interface VariablePrice {
  maximumPrice?: string;
  startingPrice?: string;
}

export interface PoojaDetails {
  id: string;
  name: string;
  description: string;
  poojaType: PoojaType;
  purpose: string;
  imageUrl: string;
}

export enum ScheduleMode {
  weekly = 'weekly',
  monthly = 'monthly',
  once = 'once',
}

enum PoojaType {
  pooja = 'pooja',
  specialPooja = 'specialPooja',
}
