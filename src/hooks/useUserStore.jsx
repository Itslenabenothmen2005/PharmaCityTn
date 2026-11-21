import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockMedicines } from '../data/medicines';

const UserStoreContext = createContext(null);

const DEFAULT_PROFILE = {
  name: 'Ahmed Ben Salem',
  email: 'ahmed.bensalem@gmail.tn',
  phone: '+216 98 450 123',
  city: 'Tunis',
  governorate: 'Grand Tunis',
  address: '14 Rue Habib Thameur, El Manar II',
  birthDate: '1988-06-14',
  preferredPharmacy: 'Pharmacie El Manar',
  notifyEmail: true,
  notifySms: true,
};

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    medicineId: 'med-1',
    medicineName: 'Doliprane 1000 mg',
    title: 'Disponibilité confirmée',
    message: 'Pharmacie El Manar (Tunis) déclare 18 boîtes en stock.',
    date: 'Il y a 15 min',
    timestamp: Date.now() - 15 * 60 * 1000,
    type: 'success',
    read: false,
  },
  {
    id: 'notif-2',
    medicineId: 'med-2',
    medicineName: 'Augmentin Adulte 1g',
    title: 'Alerte stock faible',
    message: 'Seulement 2 boîtes déclarées à la Pharmacie El Manar. Vérifiez avant de vous déplacer.',
    date: 'Il y a 2 heures',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    type: 'warning',
    read: false,
  },
  {
    id: 'notif-3',
    medicineId: 'med-3',
    medicineName: 'Maxilase Sirop',
    title: 'Rupture signalée',
    message: 'Rupture de stock temporaire signalée dans le secteur Grand Tunis.',
    date: 'Hier à 18h20',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    type: 'error',
    read: true,
  },
  {
    id: 'notif-4',
    medicineId: 'med-6',
    medicineName: 'Ventoline 100µg',
    title: 'Mise à jour officine',
    message: 'Pharmacie Cap Bon (Nabeul) a actualisé son inventaire de garde.',
    date: 'Il y a 2 jours',
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
    type: 'info',
    read: true,
  },
];

export function UserStoreProvider({ children }) {
  // Favoris
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const saved = localStorage.getItem('pharmacity_user_favorites');
      return saved ? JSON.parse(saved) : ['med-1', 'med-4'];
    } catch {
      return ['med-1', 'med-4'];
    }
  });

  // Médicaments récemment consultés
  const [recentViewIds, setRecentViewIds] = useState(() => {
    try {
      const saved = localStorage.getItem('pharmacity_user_recent_views');
      return saved ? JSON.parse(saved) : ['med-1', 'med-2', 'med-6'];
    } catch {
      return ['med-1', 'med-2', 'med-6'];
    }
  });

  // Profil
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('pharmacity_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('pharmacity_user_notifications');
      return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  });

  // Sauvegardes synchronisées
  useEffect(() => {
    try {
      localStorage.setItem('pharmacity_user_favorites', JSON.stringify(favoriteIds));
    } catch {}
  }, [favoriteIds]);

  useEffect(() => {
    try {
      localStorage.setItem('pharmacity_user_recent_views', JSON.stringify(recentViewIds));
    } catch {}
  }, [recentViewIds]);

  useEffect(() => {
    try {
      localStorage.setItem('pharmacity_user_profile', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('pharmacity_user_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  // Actions Favoris
  const isFavorite = (id) => favoriteIds.includes(id);

  const toggleFavorite = (medicineOrId) => {
    const id = typeof medicineOrId === 'string' ? medicineOrId : medicineOrId.id;
    setFavoriteIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  // Actions Récents
  const addRecentView = (medicineOrId) => {
    const id = typeof medicineOrId === 'string' ? medicineOrId : medicineOrId.id;
    setRecentViewIds((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [id, ...filtered].slice(0, 8); // Max 8 récents
    });
  };

  // Actions Profil
  const updateProfile = (data) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  // Actions Notifications
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Objets complets résolus
  const favoriteMedicines = mockMedicines.filter((m) => favoriteIds.includes(m.id));
  const recentMedicines = recentViewIds
    .map((id) => mockMedicines.find((m) => m.id === id))
    .filter(Boolean);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <UserStoreContext.Provider
      value={{
        profile,
        updateProfile,
        favoriteIds,
        favoriteMedicines,
        isFavorite,
        toggleFavorite,
        recentMedicines,
        addRecentView,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </UserStoreContext.Provider>
  );
}

export function useUserStore() {
  const context = useContext(UserStoreContext);
  if (!context) {
    throw new Error('useUserStore must be used within a UserStoreProvider');
  }
  return context;
}
