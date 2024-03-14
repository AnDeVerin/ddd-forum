import { useRouteError } from 'react-router-dom';

import { Header } from '@/components';

import styles from './ErrorPage.module.css';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.errorPage}>
      <header>
        <Header />
      </header>

      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {error instanceof Error && (
        <p>
          <i>{error.message}</i>
        </p>
      )}
      <p>
        Please try refreshing the page, or{' '}
        <a href="/">return to the home page</a>.
      </p>
    </div>
  );
};
