export interface Temple {
  id?: string;
  basicDetails?: BasicDetails;
  contactDetails?: ContactDetails;
}

interface BasicDetails {
  profilePictureUrl?: string;
  templeName?: string;
  mainDeityName?: string;
  otherDeities?: Array<string>;
  managingAuthority?: ManagingAuthority;
  morningSchedule?: TimeRange;
  eveningSchedule?: TimeRange;
  amenities?: Array<string>;
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
