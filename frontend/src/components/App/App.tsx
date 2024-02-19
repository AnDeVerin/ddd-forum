import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components';
import { UserType, UserSetterContextType } from '@/utils/types/user';
import { UserContext } from '@/utils/context/user';

import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';

export const App = () => {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <UserContext.Provider value={user}>
      <div className={styles.app}>
        <Header />
        <main>
          <Outlet context={{ setUser } satisfies UserSetterContextType} />
        </main>
        <ToastContainer />
      </div>
    </UserContext.Provider>
  );
};
