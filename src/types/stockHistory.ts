/**
 * Types TypeScript pour l'Historique des Mouvements de Stock (PharmaCityTN)
 */

export type MovementType =
  | 'reception'   // Réception de commande / lot grossiste (+)
  | 'delivery'    // Délivrance / vente au comptoir (-)
  | 'adjustment'  // Ajustement inventaire / contrôle (±)
  | 'rupture'     // Déclaration de rupture (➜ 0)
  | 'loss';       // Avarie / Péremption (-)

export interface StockMovement {
  id: string;
  medicineId: string;
  medicineName: string;
  dosage?: string;
  form?: string;
  reference?: string;
  oldQuantity: number;
  newQuantity: number;
  delta: number;
  type: MovementType;
  action: string;
  note?: string;
  date: string;
  timestamp: number;
  user: string;
  statusBefore?: string;
  statusAfter?: string;
}
