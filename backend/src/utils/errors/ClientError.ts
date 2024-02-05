import { ErrorCodes } from './constants';

export class ClientError extends Error {
  constructor(message: string, public statusCode: ErrorCodes) {
    super(message);
    this.name = 'ClientError';
    this.statusCode = statusCode;
  }
}
