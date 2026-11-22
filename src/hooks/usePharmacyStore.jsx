import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockStockMedicines, mockStockHistory } from '../data/pharmacyStock';

const STOCK_STORAGE_KEY = 'pharmacytn_stock_v2';
const HISTORY_STORAGE_KEY = 'pharmacytn_history_v2';

/**
 * Règle stricte des statuts automatiques demandée par la consigne :
 * - Quantité égale à zéro : Indisponible
 * - Quantité positive mais inférieure ou égale au seuil : Stock limité
 * - Quantité supérieure au seuil : Disponible
 * Le seuil est configurable dans les données locales (lowStockThreshold).
 */
export function computeAutoStatus(quantity, threshold) {
  const q = Number(quantity);
  const t = Number(threshold) || 5;

  if (q <= 0) return 'unavailable';
  if (q <= t) return 'low';
  return 'available';
}

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(`Erreur lecture ${key}`, e);
  }
  return fallback;
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Erreur sauvegarde ${key}`, e);
  }
}

const PharmacyContext = createContext(null);

export function PharmacyProvider({ children }) {
  const [stock, setStock] = useState(() => {
    const initial = loadFromStorage(STOCK_STORAGE_KEY, mockStockMedicines);
    // Assurer que chaque médicament a son statut calculé selon la règle
    return initial.map((med) => ({
      ...med,
      status: computeAutoStatus(med.quantity, med.lowStockThreshold),
    }));
  });

  const [history, setHistory] = useState(() =>
    loadFromStorage(HISTORY_STORAGE_KEY, mockStockHistory)
  );

  // Sauvegarde persistante
  useEffect(() => {
    saveToStorage(STOCK_STORAGE_KEY, stock);
  }, [stock]);

  useEffect(() => {
    saveToStorage(HISTORY_STORAGE_KEY, history);
  }, [history]);

  /**
   * 1. Modification du stock avec traçabilité et historique
   */
  const updateQuantity = useCallback(
    (id, newQty, options = {}) => {
      const targetMed = stock.find((m) => m.id === id);
      if (!targetMed) return null;

      const oldQuantity = Number(targetMed.quantity);
      const parsedQty = Math.max(0, parseInt(newQty, 10) || 0);
      const delta = parsedQty - oldQuantity;
      const threshold = Number(targetMed.lowStockThreshold) || 5;
      const newStatus = computeAutoStatus(parsedQty, threshold);
      const oldStatus = computeAutoStatus(oldQuantity, threshold);
      const nowStr = new Date().toLocaleString('fr-TN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      // Détermination du type de mouvement automatique si non fourni
      let movementType = options.reasonType;
      if (!movementType) {
        if (parsedQty === 0 && oldQuantity > 0) {
          movementType = 'rupture';
        } else if (delta > 0) {
          movementType = 'reception';
        } else if (delta < 0) {
          movementType = 'delivery';
        } else {
          movementType = 'adjustment';
        }
      }

      // Description de l'action réalisée
      const actionText =
        options.actionText ||
        (delta > 0
          ? `Réception de stock (+${delta} boîtes)`
          : delta < 0
          ? parsedQty === 0
            ? `Rupture de stock déclarée (${oldQuantity} ➜ 0)`
            : `Délivrance / Vente (${delta} boîtes)`
          : `Ajustement d'inventaire (${oldQuantity} ➜ ${parsedQty})`);

      // 1. Mise à jour du stock
      setStock((prev) =>
        prev.map((med) => {
          if (med.id !== id) return med;
          return {
            ...med,
            quantity: parsedQty,
            status: newStatus,
            lastUpdate: nowStr,
          };
        })
      );

      // 2. Création de l'entrée d'historique requise
      const newHistoryItem = {
        id: `MOV-${Date.now()}`,
        medicineId: targetMed.id,
        medicineName: targetMed.name,
        dosage: targetMed.dosage,
        form: targetMed.form,
        reference: targetMed.reference,
        oldQuantity,
        newQuantity: parsedQty,
        delta,
        type: movementType, // reception | delivery | adjustment | rupture | loss
        action: actionText,
        note: options.note || '',
        date: nowStr,
        timestamp: Date.now(),
        user: options.user || 'Dr. Nadia Mansour',
        statusBefore: oldStatus,
        statusAfter: newStatus,
      };

      setHistory((prev) => [newHistoryItem, ...prev]);

      return {
        medicine: targetMed,
        oldQuantity,
        newQuantity: parsedQty,
        delta,
        statusBefore: oldStatus,
        statusAfter: newStatus,
        historyItem: newHistoryItem,
      };
    },
    [stock]
  );

  /**
   * Ajustement rapide (+1, -1, +10, etc.)
   */
  const quickAdjust = useCallback(
    (id, delta, options = {}) => {
      const targetMed = stock.find((m) => m.id === id);
      if (!targetMed) return null;
      const newQty = Math.max(0, targetMed.quantity + delta);
      return updateQuantity(id, newQty, options);
    },
    [stock, updateQuantity]
  );

  /**
   * 2. Configuration du seuil d'alerte (configurable dans les données locales)
   */
  const updateThreshold = useCallback(
    (id, newThreshold, user = 'Dr. Nadia Mansour') => {
      const targetMed = stock.find((m) => m.id === id);
      if (!targetMed) return;

      const parsedThreshold = Math.max(1, parseInt(newThreshold, 10) || 5);
      const newStatus = computeAutoStatus(targetMed.quantity, parsedThreshold);
      const nowStr = new Date().toLocaleString('fr-TN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      setStock((prev) =>
        prev.map((med) => {
          if (med.id !== id) return med;
          return {
            ...med,
            lowStockThreshold: parsedThreshold,
            status: newStatus,
            lastUpdate: nowStr,
          };
        })
      );

      // Enregistrement dans l'historique
      const newHistoryItem = {
        id: `MOV-CFG-${Date.now()}`,
        medicineId: targetMed.id,
        medicineName: targetMed.name,
        dosage: targetMed.dosage,
        form: targetMed.form,
        reference: targetMed.reference,
        oldQuantity: targetMed.quantity,
        newQuantity: targetMed.quantity,
        delta: 0,
        type: 'adjustment',
        action: `Seuil d'alerte configuré à ${parsedThreshold} boîtes (Ancien : ${targetMed.lowStockThreshold})`,
        note: `Statut recalculé automatiquement : ${newStatus === 'available' ? 'Disponible' : newStatus === 'low' ? 'Stock limité' : 'Indisponible'}`,
        date: nowStr,
        timestamp: Date.now(),
        user,
        statusBefore: targetMed.status,
        statusAfter: newStatus,
      };

      setHistory((prev) => [newHistoryItem, ...prev]);
    },
    [stock]
  );

  /**
   * Déclaration manuelle de disponibilité (ex: indisponibilité temporaire)
   */
  const updateAvailability = useCallback(
    (id, status, user = 'Dr. Nadia Mansour') => {
      const targetMed = stock.find((m) => m.id === id);
      if (!targetMed) return;

      const nowStr = new Date().toLocaleString('fr-TN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      // Si le statut déclaré est 'unavailable', la quantité peut être passée à 0 si demandé
      const newQty = status === 'unavailable' ? 0 : targetMed.quantity === 0 ? 1 : targetMed.quantity;

      setStock((prev) =>
        prev.map((med) => {
          if (med.id !== id) return med;
          return {
            ...med,
            quantity: newQty,
            status,
            lastUpdate: nowStr,
          };
        })
      );

      const statusLabels = {
        available: 'Disponible',
        low: 'Stock limité',
        unavailable: 'Indisponible (Rupture)',
      };

      setHistory((prev) => [
        {
          id: `MOV-STAT-${Date.now()}`,
          medicineId: targetMed.id,
          medicineName: targetMed.name,
          dosage: targetMed.dosage,
          form: targetMed.form,
          reference: targetMed.reference,
          oldQuantity: targetMed.quantity,
          newQuantity: newQty,
          delta: newQty - targetMed.quantity,
          type: status === 'unavailable' ? 'rupture' : 'adjustment',
          action: `Statut modifié manuellement : ${statusLabels[status] || status}`,
          note: 'Mise à jour déclarative pour l’affichage citoyen',
          date: nowStr,
          timestamp: Date.now(),
          user,
          statusBefore: targetMed.status,
          statusAfter: status,
        },
        ...prev,
      ]);
    },
    [stock]
  );

  /**
   * Ajout d'un nouveau médicament
   */
  const addMedicine = useCallback((medicineData) => {
    const qty = parseInt(medicineData.quantity, 10) || 0;
    const threshold = parseInt(medicineData.lowStockThreshold, 10) || 5;
    const computedStatus = computeAutoStatus(qty, threshold);
    const nowStr = new Date().toLocaleString('fr-TN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newMed = {
      ...medicineData,
      id: `stk-${Date.now()}`,
      quantity: qty,
      lowStockThreshold: threshold,
      status: computedStatus,
      lastUpdate: nowStr,
      reference: medicineData.reference || `MED-TN-${Math.floor(Math.random() * 9000 + 1000)}-X`,
    };

    setStock((prev) => [newMed, ...prev]);

    setHistory((prev) => [
      {
        id: `MOV-ADD-${Date.now()}`,
        medicineId: newMed.id,
        medicineName: newMed.name,
        dosage: newMed.dosage,
        form: newMed.form,
        reference: newMed.reference,
        oldQuantity: 0,
        newQuantity: qty,
        delta: qty,
        type: 'reception',
        action: `Création de référence & stock initial (+${qty} boîtes)`,
        note: `Fournisseur : ${newMed.supplier || 'SIPHAT'}`,
        date: nowStr,
        timestamp: Date.now(),
        user: 'Dr. Nadia Mansour',
        statusBefore: 'unavailable',
        statusAfter: computedStatus,
      },
      ...prev,
    ]);

    return newMed;
  }, []);

  /**
   * Suppression d'un médicament
   */
  const deleteMedicine = useCallback(
    (id) => {
      const targetMed = stock.find((m) => m.id === id);
      if (!targetMed) return;

      const nowStr = new Date().toLocaleString('fr-TN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      setStock((prev) => prev.filter((m) => m.id !== id));

      setHistory((prev) => [
        {
          id: `MOV-DEL-${Date.now()}`,
          medicineId: targetMed.id,
          medicineName: targetMed.name,
          dosage: targetMed.dosage,
          form: targetMed.form,
          reference: targetMed.reference,
          oldQuantity: targetMed.quantity,
          newQuantity: 0,
          delta: -targetMed.quantity,
          type: 'adjustment',
          action: `Suppression de la fiche médicament (${targetMed.name})`,
          note: 'Référence déréférencée du catalogue officinal',
          date: nowStr,
          timestamp: Date.now(),
          user: 'Dr. Nadia Mansour',
          statusBefore: targetMed.status,
          statusAfter: 'unavailable',
        },
        ...prev,
      ]);
    },
    [stock]
  );

  /**
   * Réinitialisation aux données démo
   */
  const resetStock = useCallback(() => {
    setStock(mockStockMedicines);
    setHistory(mockStockHistory);
    saveToStorage(STOCK_STORAGE_KEY, mockStockMedicines);
    saveToStorage(HISTORY_STORAGE_KEY, mockStockHistory);
  }, []);

  // Statistiques calculées dynamiquement
  const stats = {
    total: stock.length,
    available: stock.filter((m) => m.status === 'available').length,
    low: stock.filter((m) => m.status === 'low').length,
    unavailable: stock.filter((m) => m.status === 'unavailable').length,
    movementsCount: history.length,
  };

  const value = {
    stock,
    history,
    stats,
    updateQuantity,
    quickAdjust,
    updateThreshold,
    updateAvailability,
    addMedicine,
    deleteMedicine,
    resetStock,
  };

  return <PharmacyContext.Provider value={value}>{children}</PharmacyContext.Provider>;
}

export function usePharmacyStore() {
  const context = useContext(PharmacyContext);
  if (!context) {
    throw new Error('usePharmacyStore doit être utilisé à l’intérieur d’un PharmacyProvider');
  }
  return context;
}
