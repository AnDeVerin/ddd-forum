import { Dispatch } from 'react';

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type UserSetterContextType = {
  setUser: Dispatch<React.SetStateAction<User | null>>;
};
