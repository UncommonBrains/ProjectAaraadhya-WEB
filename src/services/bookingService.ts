import { Booking } from '../models/entities/Booking';
import { DatabaseService } from './firebase/database';

export const bookingService = new DatabaseService<Booking>('bookings');
