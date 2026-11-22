import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Pill,
  Package,
  Store,
  ArrowLeft,
  ShieldCheck,
  History,
  ClipboardCheck,
  Menu,
  X,
  Bell,
  LogOut,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Badge from '../components/common/Badge';
import { pharmacyProfile } from '../data/pharmacyStock';
import { PharmacyProvider, usePharmacyStore } from '../hooks/usePharmacyStore';

const pharmacyLinks = [
  { to: '/pharmacy/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/pharmacy/medicines', label: 'Médicaments', icon: Pill },
  { to: '/pharmacy/stock', label: 'Gestion du stock', icon: Package, showStockBadge: true },
  { to: '/pharmacy/availability', label: 'Disponibilités', icon: ClipboardCheck },
  { to: '/pharmacy/history', label: 'Historique', icon: History, showHistoryBadge: true },
  { to: '/pharmacy/profile', label: 'Profil pharmacie', icon: Store },
];

function PharmacyLayoutContent() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { stats } = usePharmacyStore();

  const statusColor = {
    open: '#168B70',
    closed: '#EF4444',
    duty: '#F59E0B',
  };
  const statusLabel = {
    open: 'Ouverte',
    closed: 'Fermée',
    duty: 'De garde',
  };

  const alertCount = stats.low + stats.unavailable;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F7F9F8' }}>
      <Header variant="pharmacy" />

      {/* Mobile top bar */}
      <div
        className="ph-mobile-bar"
        style={{
          display: 'none',
          backgroundColor: '#0F5244',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
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
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Store size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{pharmacyProfile.name}</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>Espace Professionnel</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '7px 12px',
            gap: '6px',
            fontSize: '12px',
            fontWeight: '600',
          }}
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          Menu
        </button>
      </div>

      <div className="container" style={{ flex: 1, padding: 'var(--spacing-xl) var(--spacing-md)' }}>
        <div
          className="ph-layout-grid"
          style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'start' }}
        >
          {/* ======= SIDEBAR ======= */}
          <aside
            className={`ph-sidebar${mobileOpen ? ' ph-sidebar-open' : ''}`}
            style={{
              backgroundColor: '#0F5244',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(15,82,68,0.18)',
              position: 'sticky',
              top: '24px',
            }}
          >
            {/* En-tête sidebar */}
            <div
              style={{
                padding: '20px 18px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: '#168B70',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Store size={22} color="#fff" />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#fff',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {pharmacyProfile.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>
                    {pharmacyProfile.registrationNumber}
                  </div>
                </div>
              </div>

              {/* Statut dynamique */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: statusColor[pharmacyProfile.status],
                      boxShadow: `0 0 6px ${statusColor[pharmacyProfile.status]}`,
                    }}
                  />
                  <span style={{ fontSize: '12px', color: '#fff', fontWeight: '600' }}>
                    {statusLabel[pharmacyProfile.status]}
                  </span>
                </div>
                {pharmacyProfile.isDuty && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: '700',
                      color: '#F59E0B',
                      backgroundColor: 'rgba(245,158,11,0.15)',
                      padding: '2px 7px',
                      borderRadius: '20px',
                      border: '1px solid rgba(245,158,11,0.3)',
                    }}
                  >
                    DE GARDE
                  </span>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav style={{ padding: '12px 10px' }}>
              {pharmacyLinks.map(({ to, label, icon: Icon, showStockBadge, showHistoryBadge }) => {
                const active = location.pathname === to || location.pathname.startsWith(to + '/');
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      marginBottom: '2px',
                      fontSize: '13px',
                      fontWeight: active ? '700' : '500',
                      color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                      backgroundColor: active ? 'rgba(22,139,112,0.5)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    <Icon size={17} />
                    <span style={{ flex: 1 }}>{label}</span>

                    {/* Badge alertes stock */}
                    {showStockBadge && alertCount > 0 && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 'bold',
                          padding: '1px 6px',
                          borderRadius: '10px',
                          backgroundColor: '#EF4444',
                          color: '#FFFFFF',
                        }}
                        title={`${alertCount} alertes ou ruptures`}
                      >
                        {alertCount}
                      </span>
                    )}

                    {/* Badge historique mouvements */}
                    {showHistoryBadge && stats.movementsCount > 0 && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: '600',
                          padding: '1px 6px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255,255,255,0.15)',
                          color: 'rgba(255,255,255,0.8)',
                        }}
                      >
                        {stats.movementsCount}
                      </span>
                    )}

                    {active && <ChevronRight size={14} color="rgba(255,255,255,0.5)" />}
                  </Link>
                );
              })}
            </nav>

            {/* Pharmacien & actions */}
            <div
              style={{
                padding: '14px 18px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: '#168B70',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  {pharmacyProfile.titular.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#fff' }}>
                    {pharmacyProfile.titular}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                    Pharmacien Titulaire
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  to="/"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    padding: '7px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '11px',
                    textDecoration: 'none',
                  }}
                >
                  <ArrowLeft size={13} />
                  Portail Public
                </Link>
              </div>
            </div>

            {/* Accréditation */}
            <div
              style={{
                margin: '0 10px 10px',
                padding: '10px 12px',
                borderRadius: '10px',
                backgroundColor: 'rgba(22,139,112,0.2)',
                border: '1px solid rgba(22,139,112,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <ShieldCheck size={15} color="#4ADE80" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.4' }}>
                <strong style={{ color: '#4ADE80' }}>Agréée MSP</strong> — Convention CNSS active
              </span>
            </div>
          </aside>

          {/* ======= CONTENU PRINCIPAL ======= */}
          <main
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: 'var(--spacing-xl)',
              boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
              minHeight: '560px',
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .ph-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .ph-mobile-bar {
            display: flex !important;
          }
          .ph-sidebar {
            display: none;
            border-radius: 12px;
            position: static !important;
          }
          .ph-sidebar.ph-sidebar-open {
            display: block !important;
            margin-bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default function PharmacyLayout() {
  return (
    <PharmacyProvider>
      <PharmacyLayoutContent />
    </PharmacyProvider>
  );
}
