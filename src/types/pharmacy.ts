/**
 * Types TypeScript pour les Pharmacies & Officines (PharmaCityTN)
 */

export interface PharmacySchedule {
  weekdays: string;
  saturday: string;
  sunday: string;
}

export interface PharmacyCoordinates {
  lat: number;
  lng: number;
}

export interface Pharmacy {
  id: string;
  name: string;
  pharmacist?: string;
  titular?: string;
  substitute?: string;
  registrationNumber?: string;
  address: string;
  city: string;
  region?: string;
  governorate?: string;
  zipCode?: string;
  phone: string;
  emergencyPhone?: string;
  email?: string;
  isOpen: boolean;
  isDuty?: boolean;
  isNightDuty?: boolean;
  schedule?: PharmacySchedule | string;
  distance?: string;
  availableCount?: number;
  features?: string[];
  agreementMSP?: boolean;
  cnssConvention?: boolean;
  coordinates?: PharmacyCoordinates;
}
