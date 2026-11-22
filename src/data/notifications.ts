/**
 * Données simulées des notifications et alertes (PharmaCityTN)
 * Conforme à l'interface TypeScript NotificationItem
 */
import { NotificationItem } from '../types/notification';

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    medicineId: 'med-1',
    medicineName: 'Doliprane 1000 mg',
    pharmacyName: 'Pharmacie El Manar',
    title: 'Disponibilité confirmée',
    message: 'Pharmacie El Manar (Tunis) déclare 24 boîtes en stock. Produit prêt pour délivrance.',
    date: 'Il y a 15 min',
    timestamp: Date.now() - 15 * 60 * 1000,
    type: 'success',
    read: false,
  },
  {
    id: 'notif-2',
    medicineId: 'med-2',
    medicineName: 'Augmentin Adulte 1g',
    pharmacyName: 'Pharmacie El Manar',
    title: 'Alerte stock faible',
    message: 'Seulement 3 boîtes déclarées à la Pharmacie El Manar. Vérifiez avant de vous déplacer.',
    date: 'Il y a 2 heures',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    type: 'warning',
    read: false,
  },
  {
    id: 'notif-3',
    medicineId: 'med-3',
    medicineName: 'Maxilase Sirop',
    pharmacyName: 'Secteur Grand Tunis',
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
    pharmacyName: 'Pharmacie de la République',
    title: 'Mise à jour officine',
    message: 'Pharmacie de la République (Sfax) a réapprovisionné son inventaire de garde (8 inhalateurs).',
    date: 'Il y a 2 jours',
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
    type: 'info',
    read: true,
  },
];
