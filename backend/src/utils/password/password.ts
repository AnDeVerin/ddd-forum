import crypto from 'crypto';

export const generateRandomPassword = () =>
  crypto.randomBytes(4).toString('hex');
