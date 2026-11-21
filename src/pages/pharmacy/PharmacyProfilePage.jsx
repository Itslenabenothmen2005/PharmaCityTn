import React from 'react';
import { Store, MapPin, Phone, ShieldCheck, Clock } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function PharmacyProfilePage() {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)' }}>Profil de l'Officine</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          Paramètres officiels de la pharmacie, coordonnées et statut de garde.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <Card title="Informations Générales" padding="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Input label="Nom de l'officine" value="Pharmacie Centrale Tunis" readOnly />
            <Input label="Pharmacien Titulaire" value="Dr. Nadia Mansour" readOnly />
            <Input label="N° d'enregistrement Conseil de l'Ordre" value="TN-PH-19842" readOnly />
            <Input label="Numéro de téléphone" value="71 885 920" readOnly />
          </div>
        </Card>

        <Card title="Localisation & Statut de Garde" padding="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '12px', background: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <ShieldCheck size={18} color="var(--color-primary)" />
                <strong style={{ color: 'var(--color-primary-dark)', fontSize: 'var(--font-size-sm)' }}>Statut Actuel</strong>
              </div>
              <Badge variant="success" dot>Ouverte au public (Jour)</Badge>
            </div>
            <Input label="Adresse complète" value="Avenue Habib Bourguiba, Tunis" readOnly />
            <Input label="Gouvernorat" value="Grand Tunis" readOnly />
          </div>
        </Card>
      </div>
    </div>
  );
}
