import { createContext } from 'react';
import { UserType } from '../types/user';

export const UserContext = createContext<UserType | null>(null);
