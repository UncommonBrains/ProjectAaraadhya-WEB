export interface StatusBadgeProps {
  status: string;
  className?: string;
}

// Add a separate Booking interface that matches what's in BookingsCardProps
export interface Booking {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  id: string;
  paymentDetails: {
    paymentMethod?: string;
    screenshot: File | null;
  };
  poojas: [
    {
      name: string;
      starSign: string;
      members: [
        {
          name: string;
          starSign: string;
        },
      ];
      poojaDate: string;
      poojaDetails: {
        name: string;
        description: string;
        imageUrl: string;
        price: string;
        id: string;
        poojaType: string;
        purpose: string;
      };
      poojaId: string;
      scheduleId: string;
    },
  ];
  price: string;
  status: string;
  templeDetails: {
    // The same templeDetails structure as in BookingsCardProps
    advancedOptions?: {
      advancedOnlneBookingLimit?: string;
      bankDetails?: {
        accountHolderName?: string;
        accountNumber?: string;
        bankName?: string;
        ifscCode?: string;
      };
      emailNotificationForDevotees?: boolean;
      enableOnlineBooking?: boolean;
      smsNotificationForDevotees?: boolean;
    };
    basicDetails?: {
      amenities?: Array<any>;
      description?: string;
      eveningSchedule?: {
        endTime?: string;
        startTime?: string;
      };
      mainDeityName?: string;
      managingAuthority?: string;
      morningSchedule?: {
        endTime?: string;
        startTime?: string;
      };
      otherDeities?: Array<any>;
      profilePictureUrl?: string;
      rules?: string;
      templeHistory?: string;
      templeName?: string;
    };
    contactDetails?: {
      address?: string;
      chiefPriest?: {
        name?: string;
        phoneNumber?: string;
      };
      committeeMembers?: Array<{
        name?: string;
        phoneNumber?: string;
      }>;
      locationLink?: string;
      websiteLink?: string;
    };
    id?: string;
  };
  templeId: string;
  userId: string;
}

// Then update BookingsCardProps to use this interface
export interface BookingsCardProps {
  booking: Booking;
}
