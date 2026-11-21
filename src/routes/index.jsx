import { createBrowserRouter, Navigate } from 'react-router-dom';

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
import UserProfilePage from '../pages/user/UserProfilePage';
import MedicineRequestPage from '../pages/user/MedicineRequestPage';
import RequestsTrackingPage from '../pages/user/RequestsTrackingPage';

// Pages pharmacie
import PharmacyDashboard from '../pages/pharmacy/PharmacyDashboard';
import MedicinesPage from '../pages/pharmacy/MedicinesPage';
import StockPage from '../pages/pharmacy/StockPage';
import PharmacyProfilePage from '../pages/pharmacy/PharmacyProfilePage';

const router = createBrowserRouter([
  // 1. Espace Public (Pages d'accueil, login, register, 404)
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // 2. Espace Citoyen / Utilisateur (Layout dédié avec son propre Header & Sidebar)
  {
    path: '/user',
    element: <UserLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <UserDashboard /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'request', element: <MedicineRequestPage /> },
      { path: 'requests', element: <RequestsTrackingPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'profile', element: <UserProfilePage /> },
    ],
  },

  // 3. Espace Pharmacie (Layout dédié avec son propre Header & Sidebar)
  {
    path: '/pharmacy',
    element: <PharmacyLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <PharmacyDashboard /> },
      { path: 'medicines', element: <MedicinesPage /> },
      { path: 'stock', element: <StockPage /> },
      { path: 'profile', element: <PharmacyProfilePage /> },
    ],
  },
]);

export default router;
