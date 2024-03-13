import { ErrorMessages } from '@/utils/constants/errors';
import { User } from '@/utils/types/user';

export interface UserRegistrationData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}
export interface UserRegistrationResponse {
  success: boolean;
  data: User | undefined;
  error: ErrorMessages | undefined;
}
