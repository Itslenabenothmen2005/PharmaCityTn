import React from 'react';
import { Package, RefreshCw } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export default function StockPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: 'var(--font-size-2xl)' }}>Gestion des Stocks</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Mettez à jour en temps réel vos disponibilités pour les patients et citoyens.
          </p>
        </div>
        <Button variant="secondary" icon={RefreshCw}>
          Synchroniser l'inventaire
        </Button>
      </div>

      <Card
        title="Aperçu des Mouvements de Stock"
        subtitle="Dernière synchronisation effectuée il y a 8 minutes"
        padding="lg"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span>Panadol Extra 500mg</span>
            <Badge variant="success">En stock (48)</Badge>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span>Inexium 20mg</span>
            <Badge variant="warning">Faible (4)</Badge>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span>Spasfon Lyoc</span>
            <Badge variant="danger">Rupture (0)</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
