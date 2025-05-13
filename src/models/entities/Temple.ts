export interface Temple {
  id?: string;
  basicDetails?: BasicDetails;
  contactDetails?: ContactDetails;
  advancedOptions?: AdvancedOptions;
}

export interface BasicDetails {
  profilePictureUrl?: string;
  templeName?: string;
  mainDeityName?: string;
  otherDeities?: Array<string>;
  managingAuthority?: ManagingAuthority;
  morningSchedule?: TimeRange;
  eveningSchedule?: TimeRange;
  amenities?: Array<string>;
  templeHistory: string;
  description?: string;
  rules?: string;
}

interface ContactDetails {
  chiefPriest: ContactInfo;
  committeeMembers: Array<ContactInfo>;
  address: string;
  locationLink: string;
  websiteLink: string;
}

interface AdvancedOptions {
  advancedOnlneBookingLimit: string;
  bankDetails?: BankDetails;
  enableOnlineBooking: boolean;
}

interface BankDetails {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
}

interface TimeRange {
  startTime: string;
  endTime: string;
}

interface ContactInfo {
  name: string;
  phoneNumber: string;
}

enum ManagingAuthority {
  devaswomBoard = 'Devaswom Board',
  privateTrust = 'Private Trust',
  familyTrust = 'Family Trust',
  others = 'Others',
}

export const getManagingAuthorityLabel = (key?: string) => {
  return (ManagingAuthority as any)[key ?? ''] || 'Unknown';
};
