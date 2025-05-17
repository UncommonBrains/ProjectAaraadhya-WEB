import TempleImage from '../../assets/images/temple-3.jpg';

// Sample booking data
export const bookingsMockData = [
  {
    id: 'BK1234',
    templeName: 'Sri Venkateswara Temple',
    location: 'Tirupati, Andhra Pradesh',
    date: 'March 25, 2025',
    time: '09:30 AM',
    service: 'Abhishekam',
    amount: '₹ 1,100',
    status: 'upcoming',
    imageUrl: TempleImage,
    updatedAt: '2023-10-01T10:00:00Z',

    isPriority: true,
  },
  {
    id: 'BK1235',
    templeName: 'Meenakshi Amman Temple',
    location: 'Madurai, Tamil Nadu',
    date: 'April 2, 2025',
    time: '11:00 AM',
    service: 'Archana',
    amount: '₹ 500',
    status: 'upcoming',
    updatedAt: '2023-10-01T10:00:00Z',

    imageUrl: TempleImage,
  },
  {
    id: 'BK1233',
    templeName: 'Padmanabhaswamy Temple',
    location: 'Thiruvananthapuram, Kerala',
    date: 'March 15, 2025',
    time: '08:00 AM',
    service: 'Darshan',
    amount: '₹ 300',
    status: 'completed',
    updatedAt: '2023-10-01T10:00:00Z',

    imageUrl: TempleImage,
  },
  {
    id: 'BK1232',
    templeName: 'Jagannath Temple',
    location: 'Puri, Odisha',
    date: 'March 10, 2025',
    time: '10:30 AM',
    service: 'Special Darshan',
    amount: '₹ 700',
    status: 'completed',
    updatedAt: '2023-10-01T10:00:00Z',

    imageUrl: TempleImage,
  },
  {
    id: 'BK1231',
    templeName: 'Kashi Vishwanath Temple',
    location: 'Varanasi, Uttar Pradesh',
    date: 'February 28, 2025',
    time: '06:00 AM',
    service: 'Rudrabhishek',
    amount: '₹ 1,500',
    updatedAt: '2023-10-01T10:00:00Z',

    status: 'cancelled',
    cancellationReason: 'Temple closure due to special event',
    imageUrl: TempleImage,
  },
];
