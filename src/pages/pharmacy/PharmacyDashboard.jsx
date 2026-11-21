import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Pill, Package, AlertTriangle, TrendingUp, Store } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export default function PharmacyDashboard() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: 'var(--font-size-2xl)' }}>Portail Professionnel — Pharmacie</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Supervisez le catalogue de l'officine, gérez vos niveaux de stocks et mettez à jour votre statut.
          </p>
        </div>
        <Badge variant="success" dot>
          Officine Agréée Ouverte
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
              <Pill size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Médicaments actifs</div>
              <strong style={{ fontSize: '18px' }}>1 480 réf.</strong>
            </div>
          </div>
        </Card>

        <Card padding="md" hoverable>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Stocks faibles</div>
              <strong style={{ fontSize: '18px' }}>12 alertes</strong>
            </div>
          </div>
        </Card>

        <Card padding="md" hoverable>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>
              <Package size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Ruptures constatées</div>
              <strong style={{ fontSize: '18px' }}>4 réf.</strong>
            </div>
          </div>
        </Card>
      </div>

      <Card
        title="Gestion de l'Officine"
        subtitle="Raccourcis vers les modules de travail"
        padding="lg"
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/pharmacy/medicines" style={{ textDecoration: 'none' }}>
            <Button variant="primary" icon={Pill}>
              Catalogue Médicaments
            </Button>
          </Link>
          <Link to="/pharmacy/stock" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" icon={Package}>
              Mise à jour du Stock
            </Button>
          </Link>
          <Link to="/pharmacy/profile" style={{ textDecoration: 'none' }}>
            <Button variant="outline" icon={Store}>
              Paramètres de l'Officine
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
