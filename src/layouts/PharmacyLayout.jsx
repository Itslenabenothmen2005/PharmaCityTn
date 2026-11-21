import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Pill, Package, Store, ShieldCheck, ArrowLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Badge from '../components/common/Badge';

const pharmacyLinks = [
  { to: '/pharmacy/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/pharmacy/medicines', label: 'Catalogue Médicaments', icon: Pill },
  { to: '/pharmacy/stock', label: 'Gestion des Stocks', icon: Package },
  { to: '/pharmacy/profile', label: 'Profil de l’Officine', icon: Store },
];

/**
 * Layout Espace Pharmacie Professionnelle PharmaCityTN
 */
export default function PharmacyLayout() {
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header variant="pharmacy" />

      <div className="container" style={{ flex: 1, padding: 'var(--spacing-xl) var(--spacing-md)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '270px 1fr',
            gap: 'var(--spacing-xl)',
            alignItems: 'start',
          }}
          className="pharmacy-layout-grid"
        >
          {/* Sidebar Navigation Professionnelle */}
          <aside
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: 'var(--spacing-md)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Profil Officine Pharmacie */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingBottom: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-md)',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Store size={22} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <h4
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-text-primary)',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  Pharmacie Centrale Tunis
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Badge variant="success" size="sm" dot>
                    Agréée MSP
                  </Badge>
                </div>
              </div>
            </div>

            {/* Menu Liens */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {pharmacyLinks.map(({ to, label, icon: Icon }) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: active
                        ? 'var(--font-weight-semibold)'
                        : 'var(--font-weight-medium)',
                      color: active ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)',
                      backgroundColor: active ? 'var(--color-primary-light)' : 'transparent',
                      borderLeft: active
                        ? '3px solid var(--color-primary)'
                        : '3px solid transparent',
                      transition: 'all var(--transition-fast)',
                      textDecoration: 'none',
                    }}
                  >
                    <Icon size={18} color={active ? 'var(--color-primary)' : 'currentColor'} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Accréditation & Sécurité */}
            <div
              style={{
                marginTop: 'var(--spacing-lg)',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-subtle)',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-secondary)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              <ShieldCheck size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Officine de Garde</strong>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Statut synchronisé en temps réel avec le portail régional.
                </p>
              </div>
            </div>

            {/* Retour */}
            <div
              style={{
                marginTop: 'var(--spacing-md)',
                paddingTop: 'var(--spacing-md)',
                borderTop: '1px solid var(--color-border-subtle)',
              }}
            >
              <Link
                to="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  padding: '6px 12px',
                }}
              >
                <ArrowLeft size={14} />
                Retour au portail public
              </Link>
            </div>
          </aside>

          {/* Contenu de la Page */}
          <main
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: 'var(--spacing-xl)',
              boxShadow: 'var(--shadow-sm)',
              minHeight: '520px',
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .pharmacy-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
