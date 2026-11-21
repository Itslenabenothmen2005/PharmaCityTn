import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Search, Star, Bell, ArrowRight } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export default function UserDashboard() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: 'var(--font-size-2xl)' }}>Espace Citoyen — Tableau de bord</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Consultez vos recherches récentes, pharmacies favorites et alertes en Tunisie.
          </p>
        </div>
        <Badge variant="primary" dot>
          Session active
        </Badge>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <Card padding="md" hoverable>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
              <Search size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Recherches récentes</div>
              <strong style={{ fontSize: '18px' }}>8 médicaments</strong>
            </div>
          </div>
        </Card>

        <Card padding="md" hoverable>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}>
              <Star size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Officines favorites</div>
              <strong style={{ fontSize: '18px' }}>3 pharmacies</strong>
            </div>
          </div>
        </Card>

        <Card padding="md" hoverable>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'var(--color-info-light)', color: 'var(--color-info)' }}>
              <Bell size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Alertes disponibilité</div>
              <strong style={{ fontSize: '18px' }}>1 alerte active</strong>
            </div>
          </div>
        </Card>
      </div>

      <Card
        title="Accès Rapide aux Services"
        subtitle="Pages disponibles dans votre espace"
        padding="lg"
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/user/search" style={{ textDecoration: 'none' }}>
            <Button variant="primary" icon={Search}>
              Rechercher un médicament
            </Button>
          </Link>
          <Link to="/user/favorites" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" icon={Star}>
              Voir mes favoris
            </Button>
          </Link>
          <Link to="/user/notifications" style={{ textDecoration: 'none' }}>
            <Button variant="outline" icon={Bell}>
              Gérer mes alertes
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
