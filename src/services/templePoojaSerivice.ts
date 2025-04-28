import { Pooja } from '../models/entities/Pooja';
import { DatabaseService } from './firebase/database';

export const templePoojaService = new DatabaseService<Pooja>('temple-poojas');
