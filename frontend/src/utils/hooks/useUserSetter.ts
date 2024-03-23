import { useOutletContext } from 'react-router-dom';

import { UserSetterContextType } from '../types/user';

export function useUserSetter() {
  return useOutletContext<UserSetterContextType>();
}
