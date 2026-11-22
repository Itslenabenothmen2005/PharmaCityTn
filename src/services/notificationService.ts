/**
 * Service local pour les Notifications et Alertes (PharmaCityTN)
 * 100% frontend — synchronisation localStorage et diffusion d'événements.
 */
import { NotificationItem, NotificationType } from '../types/notification';
import { mockNotifications } from '../data/notifications';

const NOTIFICATIONS_KEY = 'pharmacity_user_notifications';

function loadNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Erreur lecture notifications', e);
  }
  return mockNotifications;
}

function saveNotifications(items: NotificationItem[]): void {
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(items));
    // Émission d'un événement pour synchronisation immédiate des composants actifs
    window.dispatchEvent(new CustomEvent('pharmacity:notifications-updated', { detail: items }));
  } catch (e) {
    console.error('Erreur sauvegarde notifications', e);
  }
}

export const notificationService = {
  /**
   * Lire toutes les notifications
   */
  getNotifications(): NotificationItem[] {
    return loadNotifications();
  },

  /**
   * Nombre de notifications non lues
   */
  getUnreadCount(): number {
    const list = loadNotifications();
    return list.filter((n) => !n.read).length;
  },

  /**
   * Marquer une notification comme lue
   */
  markAsRead(id: string): NotificationItem[] {
    const list = loadNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    saveNotifications(updated);
    return updated;
  },

  /**
   * Marquer toutes les notifications comme lues
   */
  markAllAsRead(): NotificationItem[] {
    const list = loadNotifications();
    const updated = list.map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
    return updated;
  },

  /**
   * Ajouter une nouvelle notification
   */
  addNotification(item: Omit<NotificationItem, 'id' | 'timestamp' | 'date' | 'read'>): NotificationItem {
    const list = loadNotifications();
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      timestamp: Date.now(),
      date: 'À l’instant',
      read: false,
    };
    const updated = [newNotif, ...list];
    saveNotifications(updated);
    return newNotif;
  },

  /**
   * Supprimer une notification
   */
  deleteNotification(id: string): NotificationItem[] {
    const list = loadNotifications();
    const updated = list.filter((n) => n.id !== id);
    saveNotifications(updated);
    return updated;
  },

  /**
   * Vider toutes les notifications
   */
  clearAll(): void {
    saveNotifications([]);
  },

  /**
   * 5. SIMULATION D'ALERTE : Déclenchée lorsqu'un médicament favori change de disponibilité
   */
  notifyFavoriteAvailabilityChange(
    medicineId: string,
    medicineName: string,
    oldStatus: string,
    newStatus: string,
    pharmacyName: string = 'Pharmacie Centrale Tunis'
  ): NotificationItem {
    let type: NotificationType = 'info';
    let title = 'Changement de disponibilité';
    let message = '';

    if (newStatus === 'available') {
      type = 'success';
      title = 'Médicament disponible !';
      message = `Bonne nouvelle : votre médicament favori « ${medicineName} » est de nouveau disponible (${pharmacyName}).`;
    } else if (newStatus === 'low') {
      type = 'warning';
      title = 'Alerte stock limité';
      message = `Attention : le stock de « ${medicineName} » devient critique à ${pharmacyName}. Pensez à vérifier avant tout déplacement.`;
    } else if (newStatus === 'unavailable') {
      type = 'error';
      title = 'Alerte rupture de stock';
      message = `Votre médicament favori « ${medicineName} » a été déclaré en rupture temporaire à ${pharmacyName}.`;
    } else {
      message = `Mise à jour de disponibilité pour « ${medicineName} » à ${pharmacyName}.`;
    }

    return this.addNotification({
      medicineId,
      medicineName,
      pharmacyName,
      title,
      message,
      type,
    });
  },

  /**
   * Réinitialiser aux alertes d'origine
   */
  resetToDefault(): void {
    saveNotifications(mockNotifications);
  },
};
