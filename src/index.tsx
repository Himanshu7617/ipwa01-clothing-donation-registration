import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorView from './ErrorView/ErrorView';
import './LocalizationService';
import HomeView from './HomeView/HomeView';
import DonationView from './DonationView/DonationView';
import LegalNotice from './LegalNotice/LegalNotice';
import License from './License/License';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: 'donate/:subview',
        element: <DonationView />,
      },
      {
        path: 'legal',
        element: <LegalNotice />,
      },
      {
        path: 'license',
        element: <License />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
