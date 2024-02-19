import { ErrorMessages } from '@/utils/constants/errors';
import { UserType } from '@/utils/types/user';

export interface UserRegistrationData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}
export interface UserRegistrationResponse {
  success: boolean;
  data: UserType | undefined;
  error: ErrorMessages | undefined;
}
