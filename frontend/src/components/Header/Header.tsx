import { useContext } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';

import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UserContext } from '@/utils/context/user';

import logo from '/vite.svg';
import styles from './Header.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const match = useMatch('/register');
  const user = useContext(UserContext);

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} className={styles.logo} alt="Forum logo" />
      </Link>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>Domain-Driven Designeers</div>
        <p className={styles.subtitle}>
          Where awesome domain driven designers are made
        </p>
        <Button type="link" style={{ padding: 0 }}>
          Submit
        </Button>
      </div>
      {!match && (
        <div className={styles.rightContainer}>
          {user ? (
            <div className={styles.userBlock}>
              <div>
                <UserOutlined />
                &nbsp;{user?.username}
              </div>
              <Button type="link">Logout</Button>
            </div>
          ) : (
            <Button
              type="primary"
              size="large"
              block
              onClick={() => navigate('/register', { replace: true })}
            >
              Join
            </Button>
          )}
        </div>
      )}
    </header>
  );
};
