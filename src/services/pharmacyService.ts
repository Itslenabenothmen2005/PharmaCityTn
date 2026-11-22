/**
 * Service local pour les Pharmacies et Officines (PharmaCityTN)
 * 100% frontend — utilise exclusivement localStorage et données locales.
 */
import { mockPharmacies } from '../data/pharmacies';
import { pharmacyProfile as defaultProfile } from '../data/pharmacyStock';
import { Pharmacy } from '../types/pharmacy';

const PHARMACIES_KEY = 'pharmacity_pharmacies_list';
const PHARMACY_PROFILE_KEY = 'pharmacity_pharmacy_profile';

export const pharmacyService = {
  /**
   * Lire toutes les pharmacies partenaires
   */
  getPharmacies(): Pharmacy[] {
    try {
      const raw = localStorage.getItem(PHARMACIES_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Erreur lecture pharmacies', e);
    }
    return mockPharmacies;
  },

  /**
   * Lire une pharmacie par identifiant
   */
  getPharmacyById(id: string): Pharmacy | undefined {
    const list = this.getPharmacies();
    return list.find((p) => p.id === id);
  },

  /**
   * Lire le profil de l'officine connectée
   */
  getPharmacyProfile(): any {
    try {
      const raw = localStorage.getItem(PHARMACY_PROFILE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Erreur lecture profil pharmacie', e);
    }
    return defaultProfile;
  },

  /**
   * Mettre à jour le profil de l'officine
   */
  updatePharmacyProfile(profileUpdates: any): any {
    const current = this.getPharmacyProfile();
    const updated = { ...current, ...profileUpdates };
    try {
      localStorage.setItem(PHARMACY_PROFILE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erreur sauvegarde profil pharmacie', e);
    }
    return updated;
  },
};
