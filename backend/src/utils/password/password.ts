import { randomBytes } from 'crypto';

export const generateRandomPassword = () => randomBytes(4).toString('hex');
