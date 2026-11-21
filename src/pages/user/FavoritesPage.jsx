import React from 'react';
import { Star, MapPin, Phone, Building2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';

export default function FavoritesPage() {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)' }}>Mes Pharmacies Favorites</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          Accédez rapidement aux horaires et disponibilités de vos officines habituelles.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        <Card
          hoverable
          title="Pharmacie El Menzah"
          subtitle="Dr. Mehdi Trabelsi"
          icon={<Building2 size={20} />}
          headerAction={<Badge variant="success" dot>Ouverte</Badge>}
          footer={
            <Button variant="outline" size="sm" fullWidth icon={MapPin}>
              Itinéraire & Contact
            </Button>
          }
        >
          <div style={{ fontSize: 'var(--font-size-xs)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>📍 El Menzah 6, Tunis</span>
            <span>📞 Tél : 71 234 567</span>
          </div>
        </Card>

        <Card
          hoverable
          title="Pharmacie Centrale de Sousse"
          subtitle="Dr. Leila Bouazizi"
          icon={<Building2 size={20} />}
          headerAction={<Badge variant="info">Garde de Nuit</Badge>}
          footer={
            <Button variant="outline" size="sm" fullWidth icon={MapPin}>
              Itinéraire & Contact
            </Button>
          }
        >
          <div style={{ fontSize: 'var(--font-size-xs)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>📍 Avenue Habib Bourguiba, Sousse</span>
            <span>📞 Tél : 73 987 654</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
