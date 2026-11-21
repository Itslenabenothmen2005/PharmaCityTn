import { createBrowserRouter } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import UserLayout from '../layouts/UserLayout';
import PharmacyLayout from '../layouts/PharmacyLayout';

// Pages publiques
import HomePage from '../pages/public/HomePage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import NotFoundPage from '../pages/public/NotFoundPage';

// Pages utilisateur
import UserDashboard from '../pages/user/UserDashboard';
import SearchPage from '../pages/user/SearchPage';
import FavoritesPage from '../pages/user/FavoritesPage';
import NotificationsPage from '../pages/user/NotificationsPage';

// Pages pharmacie
import PharmacyDashboard from '../pages/pharmacy/PharmacyDashboard';
import MedicinesPage from '../pages/pharmacy/MedicinesPage';
import StockPage from '../pages/pharmacy/StockPage';
import PharmacyProfilePage from '../pages/pharmacy/PharmacyProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // Routes publiques
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },

      // Routes utilisateur
      {
        path: 'user',
        element: <UserLayout />,
        children: [
          { path: 'dashboard', element: <UserDashboard /> },
          { path: 'search', element: <SearchPage /> },
          { path: 'favorites', element: <FavoritesPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
        ],
      },

      // Routes pharmacie
      {
        path: 'pharmacy',
        element: <PharmacyLayout />,
        children: [
          { path: 'dashboard', element: <PharmacyDashboard /> },
          { path: 'medicines', element: <MedicinesPage /> },
          { path: 'stock', element: <StockPage /> },
          { path: 'profile', element: <PharmacyProfilePage /> },
        ],
      },

      // 404
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
