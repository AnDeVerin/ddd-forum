import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Header } from '@/components';
import { UserContext } from '@/utils/context/user';
import { User, UserSetterContextType } from '@/utils/types/user';

import styles from './App.module.css';

const queryClient = new QueryClient();

export const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={user}>
        <div className={styles.app}>
          <Header />
          <main>
            <Outlet context={{ setUser } satisfies UserSetterContextType} />
          </main>
          <ToastContainer />
        </div>
      </UserContext.Provider>
    </QueryClientProvider>
  );
};
