import { Dispatch } from 'react';

export interface UserType {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type UserSetterContextType = {
  setUser: Dispatch<React.SetStateAction<UserType | null>>;
};
