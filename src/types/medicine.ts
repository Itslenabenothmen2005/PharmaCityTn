/**
 * Types TypeScript pour les Médicaments (PharmaCityTN)
 */

export type AvailabilityStatus = 'available' | 'low' | 'unavailable';

export interface PharmacyStockItem {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  status: AvailabilityStatus;
  statusText: string;
  lastUpdated: string;
  isDuty: boolean;
}

export interface Medicine {
  id: string;
  name: string;
  dci: string;
  dosage: string;
  form: string;
  category: string;
  price: string;
  prescriptionRequired: boolean;
  overallAvailability: AvailabilityStatus;
  pharmaciesCount: number;
  description: string;
  pharmaciesList?: PharmacyStockItem[];
  reference?: string;
  quantity?: number;
  lowStockThreshold?: number;
  supplier?: string;
  lastUpdate?: string;
}
