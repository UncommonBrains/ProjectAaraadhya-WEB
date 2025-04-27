import { Temple } from '../models/entities/Temple';
import { DatabaseService } from './firebase/database';

export const templeService = new DatabaseService<Temple>('temples');
