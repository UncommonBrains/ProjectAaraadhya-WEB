import { CartItem } from '../models/entities/Cart';
import { DatabaseService } from './firebase/database';

export const cartService = (uid?: string): DatabaseService<CartItem> => {
  return new DatabaseService<CartItem>(`cart/${uid}/items`);
};
