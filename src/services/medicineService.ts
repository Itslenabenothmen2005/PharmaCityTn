/**
 * Service local pour les Médicaments (PharmaCityTN)
 * 100% frontend — utilise exclusivement localStorage et données locales.
 */
import { mockMedicines } from '../data/medicines';
import { Medicine, AvailabilityStatus } from '../types/medicine';
import { notificationService } from './notificationService';
import { userService } from './userService';

const STORAGE_KEY = 'pharmacity_medicines_v2';

function loadMedicines(): Medicine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Erreur lecture medicines', e);
  }
  return mockMedicines;
}

function saveMedicines(list: Medicine[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Erreur sauvegarde medicines', e);
  }
}

function computeStatus(quantity: number, threshold: number = 5): AvailabilityStatus {
  if (quantity <= 0) return 'unavailable';
  if (quantity <= threshold) return 'low';
  return 'available';
}

export const medicineService = {
  /**
   * Lire tous les médicaments
   */
  getMedicines(): Medicine[] {
    return loadMedicines();
  },

  /**
   * Lire un médicament par son identifiant
   */
  getMedicineById(id: string): Medicine | undefined {
    const list = loadMedicines();
    return list.find((m) => m.id === id);
  },

  /**
   * Recherche et filtrage
   */
  searchMedicines(query: string = '', filters: { status?: string; form?: string; rx?: string; city?: string } = {}): Medicine[] {
    const list = loadMedicines();
    return list.filter((med) => {
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchName = med.name.toLowerCase().includes(q);
        const matchDci = med.dci.toLowerCase().includes(q);
        const matchCat = med.category?.toLowerCase().includes(q);
        const matchForm = med.form.toLowerCase().includes(q);
        if (!matchName && !matchDci && !matchCat && !matchForm) return false;
      }

      if (filters.status && filters.status !== 'all' && med.overallAvailability !== filters.status) {
        return false;
      }

      if (filters.form && filters.form !== 'all' && !med.form.toLowerCase().includes(filters.form.toLowerCase())) {
        return false;
      }

      if (filters.rx === 'yes' && !med.prescriptionRequired) return false;
      if (filters.rx === 'no' && med.prescriptionRequired) return false;

      return true;
    });
  },

  /**
   * Ajouter un médicament
   */
  addMedicine(data: Omit<Medicine, 'id'>): Medicine {
    const list = loadMedicines();
    const qty = data.quantity ?? 10;
    const threshold = data.lowStockThreshold ?? 5;
    const status = computeStatus(qty, threshold);

    const newMed: Medicine = {
      ...data,
      id: `med-${Date.now()}`,
      quantity: qty,
      lowStockThreshold: threshold,
      overallAvailability: status,
      pharmaciesCount: data.pharmaciesCount ?? 1,
      pharmaciesList: data.pharmaciesList ?? [],
      lastUpdate: new Date().toLocaleString('fr-TN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [newMed, ...list];
    saveMedicines(updated);
    return newMed;
  },

  /**
   * Modifier un médicament
   */
  updateMedicine(id: string, updates: Partial<Medicine>): Medicine | null {
    const list = loadMedicines();
    const index = list.findIndex((m) => m.id === id);
    if (index === -1) return null;

    const oldMed = list[index];
    const qty = updates.quantity ?? oldMed.quantity ?? 10;
    const threshold = updates.lowStockThreshold ?? oldMed.lowStockThreshold ?? 5;
    const newStatus = updates.overallAvailability ?? computeStatus(qty, threshold);

    const updatedMed: Medicine = {
      ...oldMed,
      ...updates,
      quantity: qty,
      lowStockThreshold: threshold,
      overallAvailability: newStatus,
      lastUpdate: new Date().toLocaleString('fr-TN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };

    // ALERTE FAVORIS : Si le statut de disponibilité a changé et que le médicament est en favori
    if (oldMed.overallAvailability !== newStatus && userService.isFavorite(id)) {
      notificationService.notifyFavoriteAvailabilityChange(
        id,
        updatedMed.name,
        oldMed.overallAvailability,
        newStatus,
        'Pharmacie Centrale Tunis'
      );
    }

    list[index] = updatedMed;
    saveMedicines(list);
    return updatedMed;
  },

  /**
   * Modifier les quantités en stock
   */
  updateQuantity(id: string, newQty: number, pharmacyName: string = 'Pharmacie Centrale Tunis'): Medicine | null {
    const list = loadMedicines();
    const target = list.find((m) => m.id === id);
    if (!target) return null;

    const qty = Math.max(0, parseInt(String(newQty), 10) || 0);
    const threshold = target.lowStockThreshold ?? 5;
    const oldStatus = target.overallAvailability;
    const newStatus = computeStatus(qty, threshold);

    const updated = this.updateMedicine(id, {
      quantity: qty,
      overallAvailability: newStatus,
    });

    // Déclenchement automatique d'alerte si favori
    if (updated && oldStatus !== newStatus && userService.isFavorite(id)) {
      notificationService.notifyFavoriteAvailabilityChange(
        id,
        target.name,
        oldStatus,
        newStatus,
        pharmacyName
      );
    }

    return updated;
  },

  /**
   * Supprimer un médicament
   */
  deleteMedicine(id: string): boolean {
    const list = loadMedicines();
    const filtered = list.filter((m) => m.id !== id);
    if (filtered.length !== list.length) {
      saveMedicines(filtered);
      return true;
    }
    return false;
  },

  /**
   * Réinitialiser aux données initiales
   */
  resetToDefault(): void {
    saveMedicines(mockMedicines);
  },
};
