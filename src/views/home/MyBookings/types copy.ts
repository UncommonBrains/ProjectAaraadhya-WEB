export interface StatusBadgeProps {
  status: string;
  className?: string;
}

export interface BookingsCardProps {
  booking: {
    createdAt: {
      seconds: number;
      nanoseconds: number;
    }
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
  };
}
