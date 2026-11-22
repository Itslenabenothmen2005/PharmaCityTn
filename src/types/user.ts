/**
 * Types TypeScript pour les Utilisateurs et Citoyens (PharmaCityTN)
 */

export type UserRole = 'citizen' | 'pharmacist' | 'admin';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  governorate: string;
  address: string;
  birthDate?: string;
  preferredPharmacy?: string;
  notifyEmail?: boolean;
  notifySms?: boolean;
}

export interface DemoUser {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  city: string;
  description: string;
  redirectUrl: string;
}
