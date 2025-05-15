import { Gallery } from '../models/entities/Gallery';
import { DatabaseService } from './firebase/database';

export const templeGalleryService = (templeId?: string): DatabaseService<Gallery> => {
  return new DatabaseService<Gallery>(`temples/${templeId}/gallery`);
};
