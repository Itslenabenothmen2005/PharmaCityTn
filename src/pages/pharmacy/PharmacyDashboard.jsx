import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Pill,
  Package,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  RefreshCw,
  Clock,
  ClipboardList,
  Plus,
  Store,
  ShieldCheck,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { usePharmacyStore } from '../../hooks/usePharmacyStore';
import { recentActivities, pharmacyProfile } from '../../data/pharmacyStock';

// Mini bar chart simulé (SVG inline)
function MiniBar({ value, max, color }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{
          flex: 1, height: '8px', borderRadius: '4px',
          backgroundColor: '#F1F5F9', overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`, height: '100%',
            backgroundColor: color,
            borderRadius: '4px',
            transition: 'width 0.5s ease',
          }}
        />
      </div>
      <span style={{ fontSize: '11px', fontWeight: '700', color, minWidth: '32px', textAlign: 'right' }}>
        {pct}%
      </span>
    </div>
  );
}

// Icône d'activité
function ActivityIcon({ type }) {
  const configs = {
    stock_update: { icon: <Package size={14} />, bg: '#DCFCE7', color: '#16A34A' },
    stock_alert:  { icon: <AlertTriangle size={14} />, bg: '#FEF3C7', color: '#D97706' },
    medicine_added: { icon: <Plus size={14} />, bg: '#EFF6FF', color: '#2563EB' },
    stock_rupture: { icon: <XCircle size={14} />, bg: '#FEE2E2', color: '#DC2626' },
    demand_received: { icon: <ClipboardList size={14} />, bg: '#F0FDF4', color: '#168B70' },
  };
  const cfg = configs[type] || configs.stock_update;
  return (
    <div
      style={{
        width: '30px', height: '30px', borderRadius: '8px',
        backgroundColor: cfg.bg, color: cfg.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {cfg.icon}
    </div>
  );
}

export default function PharmacyDashboard() {
  const { stock, stats, history } = usePharmacyStore();
  const [lastRefresh] = useState(new Date().toLocaleTimeString('fr-TN', { hour: '2-digit', minute: '2-digit' }));

  const lowItems = stock.filter((m) => m.status === 'low');
  const unavailableItems = stock.filter((m) => m.status === 'unavailable');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ============================================================
          EN-TÊTE DU TABLEAU DE BORD
          ============================================================ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', margin: 0, color: '#0F172A' }}>
              Tableau de bord
            </h1>
            <Badge variant="success" dot>Officine Ouverte</Badge>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            {pharmacyProfile.name} — Dernière mise à jour à {lastRefresh}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link to="/pharmacy/medicines" style={{ textDecoration: 'none' }}>
            <Button variant="primary" icon={Plus} size="sm">
              Ajouter un médicament
            </Button>
          </Link>
          <Link to="/pharmacy/stock" style={{ textDecoration: 'none' }}>
            <Button variant="outline" icon={RefreshCw} size="sm">
              Mettre à jour le stock
            </Button>
          </Link>
        </div>
      </div>

      {/* ============================================================
          4 STATISTIQUES PRINCIPALES
          ============================================================ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        {/* Total */}
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '18px 20px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div
              style={{
                width: '40px', height: '40px', borderRadius: '10px',
                backgroundColor: '#EFF6FF', color: '#2563EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Pill size={20} />
            </div>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>TOTAL</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', lineHeight: 1 }}>
            {stats.total}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>références en catalogue</div>
          <MiniBar value={stats.total} max={stats.total} color="#2563EB" />
        </div>

        {/* Disponibles */}
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #BBF7D0',
            borderRadius: '14px',
            padding: '18px 20px',
            boxShadow: '0 1px 4px rgba(22,139,112,0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div
              style={{
                width: '40px', height: '40px', borderRadius: '10px',
                backgroundColor: '#DCFCE7', color: '#16A34A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={20} />
            </div>
            <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: '700' }}>DISPONIBLES</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#16A34A', lineHeight: 1 }}>
            {stats.available}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>médicaments en stock</div>
          <MiniBar value={stats.available} max={stats.total} color="#16A34A" />
        </div>

        {/* Stock limité */}
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #FDE68A',
            borderRadius: '14px',
            padding: '18px 20px',
            boxShadow: '0 1px 4px rgba(217,119,6,0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div
              style={{
                width: '40px', height: '40px', borderRadius: '10px',
                backgroundColor: '#FEF3C7', color: '#D97706',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <AlertTriangle size={20} />
            </div>
            <span style={{ fontSize: '11px', color: '#D97706', fontWeight: '700' }}>STOCK LIMITÉ</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#D97706', lineHeight: 1 }}>
            {stats.low}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>alertes de réapprovisionnement</div>
          <MiniBar value={stats.low} max={stats.total} color="#D97706" />
        </div>

        {/* Indisponibles */}
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #FECACA',
            borderRadius: '14px',
            padding: '18px 20px',
            boxShadow: '0 1px 4px rgba(220,38,38,0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div
              style={{
                width: '40px', height: '40px', borderRadius: '10px',
                backgroundColor: '#FEE2E2', color: '#DC2626',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <XCircle size={20} />
            </div>
            <span style={{ fontSize: '11px', color: '#DC2626', fontWeight: '700' }}>INDISPONIBLES</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#DC2626', lineHeight: 1 }}>
            {stats.unavailable}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>ruptures constatées</div>
          <MiniBar value={stats.unavailable} max={stats.total} color="#DC2626" />
        </div>
      </div>

      {/* ============================================================
          GRAPHIQUE + ALERTES
          ============================================================ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>

        {/* Répartition du stock */}
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '20px 24px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>Répartition du catalogue</h3>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0' }}>Distribution par statut de disponibilité</p>
            </div>
            <TrendingUp size={18} color="#168B70" />
          </div>

          {/* Graphique donut SVG simulé */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '20px' }}>
            <svg width="100" height="100" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F1F5F9" strokeWidth="4" />
              {/* Disponibles */}
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#16A34A" strokeWidth="4"
                strokeDasharray={`${(stats.available / stats.total) * 100} 100`}
                strokeLinecap="round"
              />
              {/* Limités */}
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#D97706" strokeWidth="4"
                strokeDasharray={`${(stats.low / stats.total) * 100} 100`}
                strokeDashoffset={`-${(stats.available / stats.total) * 100}`}
                strokeLinecap="round"
              />
              {/* Indisponibles */}
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#DC2626" strokeWidth="4"
                strokeDasharray={`${(stats.unavailable / stats.total) * 100} 100`}
                strokeDashoffset={`-${((stats.available + stats.low) / stats.total) * 100}`}
                strokeLinecap="round"
              />
            </svg>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Disponibles', value: stats.available, color: '#16A34A', bg: '#DCFCE7' },
                { label: 'Stock limité', value: stats.low, color: '#D97706', bg: '#FEF3C7' },
                { label: 'Indisponibles', value: stats.unavailable, color: '#DC2626', bg: '#FEE2E2' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: '#475569', flex: 1 }}>{item.label}</span>
                  <span
                    style={{
                      fontSize: '12px', fontWeight: '700',
                      color: item.color,
                      backgroundColor: item.bg,
                      padding: '1px 7px', borderRadius: '20px',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '12px 14px',
              backgroundColor: '#F8FAFC',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Taux de disponibilité global</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#168B70' }}>
                {Math.round((stats.available / stats.total) * 100)}%
              </div>
            </div>
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '12px', fontWeight: '600',
                color: '#16A34A', backgroundColor: '#DCFCE7',
                padding: '4px 10px', borderRadius: '20px',
              }}
            >
              <TrendingUp size={13} /> +3% ce mois
            </div>
          </div>
        </div>

        {/* Alertes urgentes */}
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '20px 24px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>Alertes critiques</h3>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0' }}>Stock limité & ruptures à traiter</p>
            </div>
            <Link to="/pharmacy/stock" style={{ fontSize: '12px', color: '#168B70', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
              Tout voir <ArrowRight size={13} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {unavailableItems.length > 0 && (
              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#FFF5F5',
                  border: '1px solid #FECACA',
                  borderRadius: '10px',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#DC2626', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <XCircle size={13} /> RUPTURES ({unavailableItems.length})
                </div>
                {unavailableItems.map((m) => (
                  <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#7F1D1D', padding: '3px 0', borderBottom: '1px solid rgba(220,38,38,0.1)' }}>
                    <span>{m.name}</span>
                    <span style={{ fontWeight: '700' }}>0 boîte</span>
                  </div>
                ))}
              </div>
            )}

            {lowItems.length > 0 && (
              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  borderRadius: '10px',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#D97706', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <AlertTriangle size={13} /> STOCK LIMITÉ ({lowItems.length})
                </div>
                {lowItems.map((m) => (
                  <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#78350F', padding: '3px 0', borderBottom: '1px solid rgba(217,119,6,0.1)' }}>
                    <span>{m.name}</span>
                    <span style={{ fontWeight: '700' }}>{m.quantity} boîte{m.quantity > 1 ? 's' : ''}</span>
                  </div>
                ))}
              </div>
            )}

            {unavailableItems.length === 0 && lowItems.length === 0 && (
              <div style={{ textAlign: 'center', padding: '24px', color: '#16A34A' }}>
                <CheckCircle2 size={32} style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '14px', fontWeight: '600' }}>Stock en bonne santé</div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>Aucune alerte critique.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================
          ACTIVITÉS RÉCENTES
          ============================================================ */}
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #E2E8F0',
          borderRadius: '14px',
          padding: '20px 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>Activités récentes</h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0' }}>Journal des dernières opérations de l'officine</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#64748B' }}>
            <Clock size={13} /> Mise à jour automatique
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {(history && history.length > 0 ? history.slice(0, 6) : recentActivities).map((act, idx) => (
            <div
              key={act.id}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '12px 0',
                borderBottom: idx < 5 ? '1px solid #F1F5F9' : 'none',
              }}
            >
              <ActivityIcon type={act.type} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>
                    {act.medicineName ? `${act.medicineName} — ${act.action}` : act.title}
                  </span>
                  <span style={{ fontSize: '11px', color: '#94A3B8', flexShrink: 0 }}>{act.date || act.time}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0', lineHeight: '1.5' }}>
                  {act.note ? act.note : act.description}
                </p>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>Par : {act.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
          RACCOURCIS RAPIDES
          ============================================================ */}
      <div
        style={{
          backgroundColor: '#0F5244',
          borderRadius: '14px',
          padding: '20px 24px',
        }}
      >
        <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'rgba(255,255,255,0.7)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Accès rapide
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
          {[
            { to: '/pharmacy/medicines', label: 'Ajouter un médicament', icon: <Plus size={16} />, color: '#168B70' },
            { to: '/pharmacy/stock', label: 'Mettre à jour le stock', icon: <RefreshCw size={16} />, color: '#2563EB' },
            { to: '/pharmacy/availability', label: 'Gérer les disponibilités', icon: <ClipboardList size={16} />, color: '#D97706' },
            { to: '/pharmacy/profile', label: "Profil de l'officine", icon: <Store size={16} />, color: '#7C3AED' },
          ].map(({ to, label, icon, color }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 14px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'all 0.15s',
              }}
            >
              <div
                style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  backgroundColor: color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {React.cloneElement(icon, { color: '#fff' })}
              </div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#fff', lineHeight: '1.3' }}>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
