/**
 * Types TypeScript pour les Notifications et Alertes (PharmaCityTN)
 */

export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export interface NotificationItem {
  id: string;
  medicineId?: string;
  medicineName?: string;
  pharmacyName?: string;
  title: string;
  message: string;
  date: string;
  timestamp: number;
  type: NotificationType;
  read: boolean;
}
