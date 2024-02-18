import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/components';
import { ErrorPage, MainPage, RegistrationPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: 'register/', element: <RegistrationPage /> },
    ],
  },
]);
