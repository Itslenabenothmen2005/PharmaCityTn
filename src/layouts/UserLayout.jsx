import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Heart,
  Bell,
  User,
  ArrowLeft,
  Menu,
  X,
  ShieldCheck,
  FilePlus2,
  ClipboardList,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Badge from '../components/common/Badge';
import { useUserStore } from '../hooks/useUserStore';

const userLinks = [
  { to: '/user/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/user/search', label: 'Recherche médicaments', icon: Search },
  { to: '/user/request', label: 'Demander un médicament', icon: FilePlus2 },
  { to: '/user/requests', label: 'Suivi des demandes', icon: ClipboardList, showRequestsCount: true },
  { to: '/user/favorites', label: 'Médicaments favoris', icon: Heart, showFavCount: true },
  { to: '/user/notifications', label: 'Alertes & Notifications', icon: Bell, showNotifCount: true },
  { to: '/user/profile', label: 'Mon Profil', icon: User },
];

/**
 * Layout Espace Citoyen / Utilisateur PharmaCityTN avec navigation responsive
 */
export default function UserLayout() {
  const location = useLocation();
  const { profile, favoriteIds, unreadCount, requests } = useUserStore();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : 'A');
  const activeRequestsCount = requests?.filter(
    (r) => r.status === 'pending_verification' || r.status === 'pending_pharmacy' || r.status === 'confirmed'
  ).length || 0;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      <Header variant="user" />

      {/* Barre de navigation mobile rapide / déclencheur */}
      <div
        className="user-mobile-bar"
        style={{
          display: 'none',
          backgroundColor: 'var(--color-bg-surface)',
          borderBottom: '1px solid var(--color-border)',
          padding: '10px 16px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '13px',
            }}
          >
            {getInitial(profile.name)}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
              {profile.name}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Espace Citoyen</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary-dark)',
            fontSize: '12px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {mobileDrawerOpen ? <X size={16} /> : <Menu size={16} />}
          <span>Menu Espace</span>
        </button>
      </div>

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
          {/* Sidebar Navigation Desktop / Tablette */}
          <aside
            className={`user-sidebar ${mobileDrawerOpen ? 'mobile-open' : ''}`}
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: 'var(--spacing-md)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Profil Utilisateur Résumé cliquable vers /user/profile */}
            <Link
              to="/user/profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingBottom: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-md)',
                borderBottom: '1px solid var(--color-border-subtle)',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'var(--font-weight-bold)',
                  fontSize: 'var(--font-size-base)',
                  boxShadow: 'var(--shadow-xs)',
                  flexShrink: 0,
                }}
              >
                {getInitial(profile.name)}
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
                  {profile.name}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Badge variant="primary" size="sm">
                    {profile.city || 'Citoyen'}
                  </Badge>
                </div>
              </div>
            </Link>

            {/* Menu Liens */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {userLinks.map(({ to, label, icon: Icon, showFavCount, showNotifCount, showRequestsCount }) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileDrawerOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={18} color={active ? 'var(--color-primary)' : 'currentColor'} />
                      <span>{label}</span>
                    </div>

                    {showRequestsCount && activeRequestsCount > 0 && (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                          padding: '1px 7px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: active ? 'var(--color-primary)' : 'var(--color-primary-light)',
                          color: active ? 'var(--color-white)' : 'var(--color-primary-dark)',
                        }}
                      >
                        {activeRequestsCount}
                      </span>
                    )}

                    {showFavCount && favoriteIds.length > 0 && (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                          padding: '1px 7px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-subtle)',
                          color: active ? 'var(--color-white)' : 'var(--color-text-secondary)',
                        }}
                      >
                        {favoriteIds.length}
                      </span>
                    )}

                    {showNotifCount && unreadCount > 0 && (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                          padding: '1px 7px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--color-danger)',
                          color: 'var(--color-white)',
                        }}
                      >
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mention Déontologique Déclarative */}
            <div
              style={{
                marginTop: 'var(--spacing-lg)',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-subtle)',
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: 'var(--color-text-secondary)' }}>
                <ShieldCheck size={14} color="var(--color-primary)" />
                <strong>Réseau PharmaCityTN</strong>
              </div>
              Retrait personnel obligatoire au comptoir. Aucune livraison à domicile.
            </div>

            {/* Lien retour portail public */}
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
                  padding: '6px 10px',
                }}
              >
                <ArrowLeft size={14} />
                Retour au portail public
              </Link>
            </div>
          </aside>

          {/* Contenu Principal de la Page */}
          <main
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: 'var(--spacing-xl)',
              boxShadow: 'var(--shadow-sm)',
              minHeight: '560px',
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />

      {/* Styles responsive CSS inline pour UserLayout */}
      <style>{`
        @media (max-width: 860px) {
          .user-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .user-mobile-bar {
            display: flex !important;
          }
          .user-sidebar {
            display: none;
          }
          .user-sidebar.mobile-open {
            display: block !important;
            margin-bottom: var(--spacing-md);
          }
        }
      `}</style>
    </div>
  );
}
