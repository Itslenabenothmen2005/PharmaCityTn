/**
 * Service local pour l'Historique des Mouvements de Stock (PharmaCityTN)
 * 100% frontend — utilise exclusivement localStorage et données locales.
 */
import { mockStockHistory } from '../data/stockHistory';
import { StockMovement, MovementType } from '../types/stockHistory';

const HISTORY_KEY = 'pharmacytn_history_v2';

function loadHistory(): StockMovement[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Erreur lecture stock history', e);
  }
  return mockStockHistory;
}

function saveHistory(list: StockMovement[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Erreur sauvegarde stock history', e);
  }
}

export const stockHistoryService = {
  /**
   * Lire tout l'historique chronologique
   */
  getHistory(): StockMovement[] {
    return loadHistory();
  },

  /**
   * Filtrer par type de mouvement
   */
  filterByType(type: MovementType | 'all'): StockMovement[] {
    const list = loadHistory();
    if (type === 'all') return list;
    return list.filter((item) => item.type === type);
  },

  /**
   * Enregistrer un nouveau mouvement de stock
   */
  logMovement(entry: Omit<StockMovement, 'id' | 'timestamp' | 'date'>): StockMovement {
    const list = loadHistory();
    const nowStr = new Date().toLocaleString('fr-TN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newMovement: StockMovement = {
      ...entry,
      id: `MOV-${Date.now()}`,
      timestamp: Date.now(),
      date: nowStr,
    };

    const updated = [newMovement, ...list];
    saveHistory(updated);
    return newMovement;
  },

  /**
   * Réinitialiser l'historique
   */
  resetHistory(): void {
    saveHistory(mockStockHistory);
  },
};
