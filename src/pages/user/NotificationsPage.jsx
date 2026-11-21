import React from 'react';
import { Bell, CheckCircle2, AlertTriangle } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export default function NotificationsPage() {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)' }}>Alertes & Notifications</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          Suivez l'état de retour en stock de vos médicaments surveillés.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Card padding="md">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', background: 'var(--color-success-light)', color: 'var(--color-success)' }}>
                <CheckCircle2 size={18} />
              </div>
              <div>
                <strong style={{ fontSize: 'var(--font-size-sm)' }}>Doliprane 1000mg de nouveau disponible</strong>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                  Pharmacie El Manar (Tunis) a réapprovisionné son stock (25 boîtes).
                </p>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Il y a 25 minutes</span>
              </div>
            </div>
            <Badge variant="success" size="sm">Nouveau</Badge>
          </div>
        </Card>

        <Card padding="md">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}>
                <AlertTriangle size={18} />
              </div>
              <div>
                <strong style={{ fontSize: 'var(--font-size-sm)' }}>Alerte stock faible : Augmentin 1g</strong>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                  Moins de 3 boîtes restantes dans votre secteur habituel.
                </p>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Hier à 17h40</span>
              </div>
            </div>
            <Badge variant="warning" size="sm">Stock faible</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
