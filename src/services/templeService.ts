import { Temple } from '../models/entities/Temple';
import { DatabaseService } from './firebase/database';

export const templeService = new DatabaseService<Temple>('temples');

export const getTempleById = async (templeId: string): Promise<Temple | null> => {
  return await templeService.getById(templeId);
};