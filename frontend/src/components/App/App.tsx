import { Outlet } from 'react-router-dom';
import { Header } from '@/components';

import styles from './App.module.css';

export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
