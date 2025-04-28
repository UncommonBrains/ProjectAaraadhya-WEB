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
  poojaTime: string;
  scheduleMode: ScheduleMode;
}

export interface PoojaDetails {
  id: string;
  name: string;
  description: string;
  poojaType: PoojaType;
  purpose: string;
  imageUrl: string;
}

enum ScheduleMode {
  repeat,
  once,
}

enum PoojaType {
  pooja,
  specialPooja,
}
