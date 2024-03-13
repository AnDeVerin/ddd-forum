import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header } from '@/components';
import { User, UserSetterContextType } from '@/utils/types/user';
import { UserContext } from '@/utils/context/user';

import 'react-toastify/dist/ReactToastify.css';
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
