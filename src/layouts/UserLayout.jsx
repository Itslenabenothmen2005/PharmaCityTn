import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, Star, Bell, Shield, ArrowLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Badge from '../components/common/Badge';

const userLinks = [
  { to: '/user/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/user/search', label: 'Recherche médicaments', icon: Search },
  { to: '/user/favorites', label: 'Mes pharmacies favorites', icon: Star },
  { to: '/user/notifications', label: 'Alertes & Notifications', icon: Bell },
];

/**
 * Layout Espace Citoyen / Utilisateur PharmaCityTN
 */
export default function UserLayout() {
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header variant="user" />

      <div className="container" style={{ flex: 1, padding: 'var(--spacing-xl) var(--spacing-md)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: 'var(--spacing-xl)',
            alignItems: 'start',
          }}
          className="user-layout-grid"
        >
          {/* Sidebar Navigation */}
          <aside
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: 'var(--spacing-md)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Profil Utilisateur Résumé */}
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
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'var(--font-weight-bold)',
                  fontSize: 'var(--font-size-base)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                A
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
                  Ahmed Ben Salem
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Badge variant="primary" size="sm">
                    Citoyen
                  </Badge>
                </div>
              </div>
            </div>

            {/* Menu Liens */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {userLinks.map(({ to, label, icon: Icon }) => {
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

            {/* Lien retour accueil */}
            <div
              style={{
                marginTop: 'var(--spacing-lg)',
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
          .user-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
