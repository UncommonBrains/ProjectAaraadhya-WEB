import { PoojaDetails } from '../models/entities/Pooja';
import { DatabaseService } from './firebase/database';

export const poojaService = new DatabaseService<PoojaDetails>('poojas');
