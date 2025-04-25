export interface StatusBadgeProps {
  status: string;
  className?: string;
}

export interface BookingsCardProps {
  booking: {
    id: string;
    templeName: string;
    location: string;
    date: string;
    time: string;
    service: string;
    amount: string;
    status: string;
    imageUrl: string;
    isPriority?: boolean;
    cancellationReason?: string;
  };
}
