/**
 * Service local pour les Utilisateurs, Profil et Favoris (PharmaCityTN)
 * 100% frontend — persistance localStorage.
 */
import { UserProfile } from '../types/user';
import { defaultCitizenProfile } from '../data/users';

const PROFILE_KEY = 'pharmacity_user_profile';
const FAVORITES_KEY = 'pharmacity_user_favorites';
const RECENT_VIEWS_KEY = 'pharmacity_user_recent_views';

const DEFAULT_FAVORITES = ['med-1', 'med-4'];
const DEFAULT_RECENTS = ['med-1', 'med-2', 'med-6'];

export const userService = {
  /**
   * Lire le profil utilisateur actuel
   */
  getProfile(): UserProfile {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Erreur lecture profile', e);
    }
    return defaultCitizenProfile;
  },

  /**
   * Mettre à jour le profil
   */
  updateProfile(updates: Partial<UserProfile>): UserProfile {
    const current = this.getProfile();
    const updated = { ...current, ...updates };
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erreur sauvegarde profile', e);
    }
    return updated;
  },

  /**
   * Lire la liste des IDs des médicaments favoris
   */
  getFavorites(): string[] {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Erreur lecture favoris', e);
    }
    return DEFAULT_FAVORITES;
  },

  /**
   * Vérifier si un médicament est dans les favoris
   */
  isFavorite(medicineId: string): boolean {
    const favs = this.getFavorites();
    return favs.includes(medicineId);
  },

  /**
   * Ajouter un médicament aux favoris
   */
  addFavorite(medicineId: string): string[] {
    const favs = this.getFavorites();
    if (!favs.includes(medicineId)) {
      const updated = [medicineId, ...favs];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Erreur ajout favori', e);
      }
      return updated;
    }
    return favs;
  },

  /**
   * Supprimer un médicament des favoris
   */
  removeFavorite(medicineId: string): string[] {
    const favs = this.getFavorites();
    const updated = favs.filter((id) => id !== medicineId);
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erreur suppression favori', e);
    }
    return updated;
  },

  /**
   * Basculer (ajouter / supprimer) un favori
   */
  toggleFavorite(medicineId: string): { isFavorite: boolean; favorites: string[] } {
    if (this.isFavorite(medicineId)) {
      const updated = this.removeFavorite(medicineId);
      return { isFavorite: false, favorites: updated };
    } else {
      const updated = this.addFavorite(medicineId);
      return { isFavorite: true, favorites: updated };
    }
  },

  /**
   * Lire les médicaments récemment consultés
   */
  getRecentViews(): string[] {
    try {
      const raw = localStorage.getItem(RECENT_VIEWS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Erreur lecture récents', e);
    }
    return DEFAULT_RECENTS;
  },

  /**
   * Ajouter un médicament à l'historique de consultation
   */
  addRecentView(medicineId: string): string[] {
    const recents = this.getRecentViews();
    const filtered = recents.filter((id) => id !== medicineId);
    const updated = [medicineId, ...filtered].slice(0, 8);
    try {
      localStorage.setItem(RECENT_VIEWS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erreur ajout recent', e);
    }
    return updated;
  },
};
