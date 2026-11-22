/**
 * Données simulées des utilisateurs et profils de démonstration (PharmaCityTN)
 * Conforme à l'interface TypeScript UserProfile / DemoUser
 */
import { UserProfile, DemoUser } from '../types/user';

export const defaultCitizenProfile: UserProfile = {
  name: 'Ahmed Ben Salem',
  email: 'ahmed.bensalem@gmail.tn',
  phone: '+216 98 450 123',
  city: 'Tunis',
  governorate: 'Grand Tunis',
  address: '14 Rue Habib Thameur, El Manar II',
  birthDate: '1988-06-14',
  preferredPharmacy: 'Pharmacie El Manar',
  notifyEmail: true,
  notifySms: true,
};

export const demoAccounts: DemoUser[] = [
  {
    id: 'demo-citizen',
    name: 'Ahmed Ben Salem',
    role: 'citizen',
    email: 'ahmed.bensalem@gmail.tn',
    phone: '+216 98 450 123',
    city: 'Tunis (Grand Tunis)',
    description: 'Accédez à l’espace citoyen pour rechercher des médicaments, suivre vos favoris et faire des demandes de retrait.',
    redirectUrl: '/user/dashboard',
  },
  {
    id: 'demo-pharmacist',
    name: 'Dr. Nadia Mansour',
    role: 'pharmacist',
    email: 'contact@pharmaciemanar.tn',
    phone: '+216 71 885 920',
    city: 'Pharmacie El Manar (Tunis)',
    description: 'Gérez le catalogue de l’officine, mettez à jour le stock en direct, suivez les ruptures et paramétrez le profil de garde.',
    redirectUrl: '/pharmacy/dashboard',
  },
];
