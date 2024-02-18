import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import logo from '/vite.svg';
import styles from './Header.module.css';

export const Header = () => {
  // const user = { name: 'Andrei' };
  const user = null;

  return (
    <header className={styles.header}>
      <img src={logo} className={styles.logo} alt="Forum logo" />
      <div className={styles.titleWrapper}>
        <div className={styles.title}>Domain-Driven Designeers</div>
        <p className={styles.subtitle}>
          Where awesome domain driven designers are made
        </p>
        <Button type="link" style={{ padding: 0 }}>
          Submit
        </Button>
      </div>
      <div className={styles.rightContainer}>
        {user ? (
          <div className={styles.userBlock}>
            <div>
              <UserOutlined />
              &nbsp;{user.name}
            </div>
            <Button type="link">Logout</Button>
          </div>
        ) : (
          <Button type="primary" size="large" block>
            Join
          </Button>
        )}
      </div>
    </header>
  );
};
