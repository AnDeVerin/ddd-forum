import { createContext } from 'react';
import { User } from '@/utils/types/user';

export const UserContext = createContext<User | null>(null);
