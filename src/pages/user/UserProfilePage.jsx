import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Save,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  BellRing,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useUserStore } from '../../hooks/useUserStore';
import { useToast } from '../../hooks/useToast';

export default function UserProfilePage() {
  const { profile, updateProfile } = useUserStore();
  const toast = useToast();

  const [formData, setFormData] = useState({ ...profile });
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      updateProfile(formData);
      setLoading(false);
      setHasChanges(false);
      toast.success('Vos informations personnelles ont été mises à jour.', 'Profil Actualisé');
    }, 600);
  };

  const handleReset = () => {
    setFormData({ ...profile });
    setHasChanges(false);
    toast.info('Modifications annulées.', 'Profil');
  };

  const cities = ['Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Bizerte', 'Sousse', 'Monastir', 'Sfax', 'Gabès'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      {/* En-tête */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', margin: 0 }}>Mon Profil Citoyen</h1>
            <Badge variant="success" size="sm" dot>
              Compte Actif
            </Badge>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            Gérez vos coordonnées de contact et configurez votre officine de référence en Tunisie.
          </p>
        </div>

        {hasChanges && (
          <Badge variant="warning" size="sm">
            Modifications non enregistrées
          </Badge>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--spacing-xl)',
          alignItems: 'start',
        }}
      >
        {/* Formulaire Principal de Modification */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <Card
            title="Informations Personnelles"
            subtitle="Données de contact pour les alertes et réservations"
            padding="lg"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input
                label="Nom et Prénom"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                startIcon={<User size={18} />}
                required
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '14px',
                }}
              >
                <Input
                  label="Adresse Email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  startIcon={<Mail size={18} />}
                  required
                />

                <Input
                  label="Numéro de Téléphone (Tunisie)"
                  value={formData.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  startIcon={<Phone size={18} />}
                  placeholder="+216 98 000 000"
                  required
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '14px',
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-text-primary)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Gouvernorat de résidence
                  </label>
                  <select
                    value={formData.city || 'Tunis'}
                    onChange={(e) => {
                      handleChange('city', e.target.value);
                      handleChange('governorate', e.target.value);
                    }}
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-surface)',
                      fontSize: 'var(--font-size-sm)',
                      outline: 'none',
                    }}
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Date de naissance"
                  type="date"
                  value={formData.birthDate || ''}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  startIcon={<Calendar size={18} />}
                />
              </div>

              <Input
                label="Adresse postale / Quartier"
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                startIcon={<MapPin size={18} />}
                placeholder="Ex : Avenue Habib Bourguiba..."
              />
            </div>
          </Card>

          {/* Préférences d'officine & Notifications */}
          <Card
            title="Officine Habituelle & Alertes"
            subtitle="Personnalisez vos préférences de surveillance des stocks"
            padding="lg"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input
                label="Pharmacie de référence habituelle"
                value={formData.preferredPharmacy || ''}
                onChange={(e) => handleChange('preferredPharmacy', e.target.value)}
                startIcon={<Building2 size={18} />}
                helperText="Vos recherches mettront cette officine en priorité lorsque le médicament y est déclaré."
              />

              <div
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                  Canaux de réception des alertes :
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: 'var(--font-size-sm)' }}>
                  <input
                    type="checkbox"
                    checked={formData.notifyEmail}
                    onChange={(e) => handleChange('notifyEmail', e.target.checked)}
                    style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
                  />
                  <span>M'avertir par email dès qu'un médicament favori est de nouveau disponible</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: 'var(--font-size-sm)' }}>
                  <input
                    type="checkbox"
                    checked={formData.notifySms}
                    onChange={(e) => handleChange('notifySms', e.target.checked)}
                    style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
                  />
                  <span>Recevoir une alerte SMS pour les gardes de nuit urgentes</span>
                </label>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '12px',
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--color-border-subtle)',
              }}
            >
              {hasChanges && (
                <Button variant="ghost" type="button" icon={RotateCcw} onClick={handleReset}>
                  Annuler
                </Button>
              )}
              <Button variant="primary" type="submit" loading={loading} icon={Save}>
                Enregistrer les modifications
              </Button>
            </div>
          </Card>
        </form>

        {/* Colonne Latérale : Carte Récapitulative Sécurisée */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card padding="lg">
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: '0 auto 12px',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {formData.name ? formData.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <h3 style={{ fontSize: 'var(--font-size-base)', margin: 0 }}>{formData.name}</h3>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                {formData.email}
              </p>
              <div style={{ marginTop: '8px' }}>
                <Badge variant="primary" size="sm">
                  Citoyen Enregistré
                </Badge>
              </div>
            </div>

            <div
              style={{
                fontSize: 'var(--font-size-xs)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                paddingTop: '12px',
                borderTop: '1px solid var(--color-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Identifiant :</span>
                <strong>TN-CIT-88421</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Secteur :</span>
                <strong>{formData.city || 'Tunis'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Officine habituelle :</span>
                <strong>{formData.preferredPharmacy || 'Non définie'}</strong>
              </div>
            </div>
          </Card>

          {/* Déontologie & Données */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border-subtle)',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-secondary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: 'var(--color-primary-dark)' }}>
              <ShieldCheck size={18} color="var(--color-primary)" />
              <strong>Confidentialité & Données Médicales</strong>
            </div>
            <p style={{ margin: 0, lineHeight: 1.5 }}>
              PharmaCityTN ne collecte aucune ordonnance ni donnée de santé sans votre consentement.
              Les informations de disponibilité sont transmises à titre indicatif par les pharmaciens d'officine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
