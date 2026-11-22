import React, { useState } from 'react';
import {
  History,
  Package,
  AlertTriangle,
  Plus,
  XCircle,
  ClipboardList,
  Filter,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Truck,
  ShoppingCart,
  FileCheck2,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/common/SearchBar';
import EmptyState from '../../components/common/EmptyState';
import { usePharmacyStore } from '../../hooks/usePharmacyStore';
import { useToast } from '../../hooks/useToast';

const MOVEMENT_TYPE_CONFIG = {
  reception: {
    label: 'Réception Grossiste',
    icon: Truck,
    badgeVariant: 'success',
    color: '#16A34A',
    bg: '#DCFCE7',
  },
  delivery: {
    label: 'Délivrance Comptoir',
    icon: ShoppingCart,
    badgeVariant: 'info',
    color: '#2563EB',
    bg: '#EFF6FF',
  },
  adjustment: {
    label: 'Ajustement Inventaire',
    icon: FileCheck2,
    badgeVariant: 'primary',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
  rupture: {
    label: 'Rupture Déclarée',
    icon: XCircle,
    badgeVariant: 'danger',
    color: '#DC2626',
    bg: '#FEE2E2',
  },
  loss: {
    label: 'Perte / Avarie',
    icon: Trash2,
    badgeVariant: 'warning',
    color: '#B45309',
    bg: '#FEF3C7',
  },
};

export default function HistoryPage() {
  const { history, resetStock } = usePharmacyStore();
  const toast = useToast();

  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = history.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchMed = item.medicineName?.toLowerCase().includes(q);
      const matchAction = item.action?.toLowerCase().includes(q);
      const matchNote = item.note?.toLowerCase().includes(q);
      const matchRef = item.reference?.toLowerCase().includes(q);
      if (!matchMed && !matchAction && !matchNote && !matchRef) return false;
    }

    return true;
  });

  // Synthèse des mouvements
  const receptionsCount = history.filter((h) => h.type === 'reception').length;
  const deliveriesCount = history.filter((h) => h.type === 'delivery').length;
  const adjustmentsCount = history.filter((h) => h.type === 'adjustment').length;
  const rupturesCount = history.filter((h) => h.type === 'rupture').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* En-tête */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', color: '#0F172A', margin: 0 }}>
              Historique des Mouvements de Stock
            </h1>
            <Badge variant="primary" size="sm">
              {history.length} entrées enregistrées
            </Badge>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            Journal d’audit officiel retraçant chaque modification de quantité, réception, délivrance et régularisation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Voulez-vous réinitialiser l’historique aux données d’origine ?')) {
              resetStock();
              toast.info('Données de démonstration réinitialisées.', 'Réinitialisation');
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #CBD5E1',
            backgroundColor: '#FFFFFF',
            color: '#64748B',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={14} /> Réinitialiser démo
        </button>
      </div>

      {/* Cartes de synthèse des mouvements */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        <div
          onClick={() => setFilterType('reception')}
          style={{
            padding: '14px 16px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: filterType === 'reception' ? '2px solid #16A34A' : '1px solid #E2E8F0',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#DCFCE7', color: '#16A34A' }}>
              <Truck size={18} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>RÉCEPTIONS DE STOCK</div>
              <strong style={{ fontSize: '18px', color: '#166534' }}>{receptionsCount} entrées</strong>
            </div>
          </div>
        </div>

        <div
          onClick={() => setFilterType('delivery')}
          style={{
            padding: '14px 16px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: filterType === 'delivery' ? '2px solid #2563EB' : '1px solid #E2E8F0',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#2563EB' }}>
              <ShoppingCart size={18} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>DÉLIVRANCES COMPTOIR</div>
              <strong style={{ fontSize: '18px', color: '#1E40AF' }}>{deliveriesCount} sorties</strong>
            </div>
          </div>
        </div>

        <div
          onClick={() => setFilterType('adjustment')}
          style={{
            padding: '14px 16px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: filterType === 'adjustment' ? '2px solid #7C3AED' : '1px solid #E2E8F0',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#F5F3FF', color: '#7C3AED' }}>
              <FileCheck2 size={18} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>AJUSTEMENTS D'INVENTAIRE</div>
              <strong style={{ fontSize: '18px', color: '#6B21A8' }}>{adjustmentsCount} contrôles</strong>
            </div>
          </div>
        </div>

        <div
          onClick={() => setFilterType('rupture')}
          style={{
            padding: '14px 16px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: filterType === 'rupture' ? '2px solid #DC2626' : '1px solid #E2E8F0',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#FEE2E2', color: '#DC2626' }}>
              <XCircle size={18} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>RUPTURES CONSTATÉES</div>
              <strong style={{ fontSize: '18px', color: '#991B1B' }}>{rupturesCount} déclarations</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres par type */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          backgroundColor: '#F8FAFC',
          padding: '14px 16px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ flex: 1, minWidth: '240px' }}>
          <SearchBar
            placeholder="Rechercher par médicament, référence ou motif..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Tous les mouvements' },
            { id: 'reception', label: 'Réceptions (+)' },
            { id: 'delivery', label: 'Délivrances (-)' },
            { id: 'adjustment', label: 'Ajustements' },
            { id: 'rupture', label: 'Ruptures' },
            { id: 'loss', label: 'Pertes' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '12px',
                fontWeight: filterType === tab.id ? '700' : '500',
                border: filterType === tab.id ? '1.5px solid var(--color-primary)' : '1px solid #CBD5E1',
                backgroundColor: filterType === tab.id ? 'var(--color-primary-light)' : '#FFFFFF',
                color: filterType === tab.id ? 'var(--color-primary-dark)' : '#475569',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TABLEAU / JOURNAL D'AUDIT DE L'HISTORIQUE */}
      {filteredHistory.length > 0 ? (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #E2E8F0',
            overflowX: 'auto',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: '#F8FAFC',
                  borderBottom: '2px solid #E2E8F0',
                  color: '#475569',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <th style={{ padding: '12px 16px' }}>Date & Heure</th>
                <th style={{ padding: '12px 16px' }}>Médicament</th>
                <th style={{ padding: '12px 16px' }}>Type de Mouvement</th>
                <th style={{ padding: '12px 16px' }}>Évolution du Stock</th>
                <th style={{ padding: '12px 16px' }}>Statut Résultant</th>
                <th style={{ padding: '12px 16px' }}>Action & Motif</th>
                <th style={{ padding: '12px 16px' }}>Responsable</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, index) => {
                const typeCfg = MOVEMENT_TYPE_CONFIG[item.type] || MOVEMENT_TYPE_CONFIG.adjustment;
                const IconComponent = typeCfg.icon;
                const isEven = index % 2 === 0;

                return (
                  <tr
                    key={item.id}
                    style={{
                      backgroundColor: isEven ? '#FFFFFF' : '#FAFAFA',
                      borderBottom: '1px solid #F1F5F9',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = isEven ? '#FFFFFF' : '#FAFAFA')
                    }
                  >
                    {/* Date & Heure */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0F172A', fontWeight: '600' }}>
                        <Clock size={14} color="#64748B" />
                        {item.date}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                        {item.id}
                      </div>
                    </td>

                    {/* Médicament */}
                    <td style={{ padding: '14px 16px' }}>
                      <strong style={{ color: '#0F172A', fontSize: '14px', display: 'block' }}>
                        {item.medicineName}
                      </strong>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>
                        {item.dosage ? `${item.dosage} • ` : ''}{item.reference || ''}
                      </span>
                    </td>

                    {/* Type de Mouvement avec badge coloré */}
                    <td style={{ padding: '14px 16px' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          backgroundColor: typeCfg.bg,
                          color: typeCfg.color,
                          fontSize: '11px',
                          fontWeight: '700',
                        }}
                      >
                        <IconComponent size={13} />
                        {typeCfg.label}
                      </div>
                    </td>

                    {/* Évolution Quantité (Ancienne -> Nouvelle & Delta) */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#64748B', fontSize: '13px' }}>
                          {item.oldQuantity}
                        </span>
                        <span style={{ color: '#94A3B8' }}>➜</span>
                        <strong style={{ color: '#0F172A', fontSize: '14px' }}>
                          {item.newQuantity} boîtes
                        </strong>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: '800',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor:
                              item.delta > 0
                                ? '#DCFCE7'
                                : item.delta < 0
                                ? '#FEE2E2'
                                : '#F1F5F9',
                            color:
                              item.delta > 0
                                ? '#166534'
                                : item.delta < 0
                                ? '#991B1B'
                                : '#475569',
                          }}
                        >
                          {item.delta > 0 ? `+${item.delta}` : item.delta}
                        </span>
                      </div>
                    </td>

                    {/* Statut résultant */}
                    <td style={{ padding: '14px 16px' }}>
                      {item.statusAfter === 'available' ? (
                        <Badge variant="success" dot size="sm">
                          Disponible
                        </Badge>
                      ) : item.statusAfter === 'low' ? (
                        <Badge variant="warning" dot size="sm">
                          Stock limité
                        </Badge>
                      ) : (
                        <Badge variant="danger" dot size="sm">
                          Indisponible
                        </Badge>
                      )}
                    </td>

                    {/* Action & Motif */}
                    <td style={{ padding: '14px 16px', maxWidth: '260px' }}>
                      <div style={{ fontSize: '13px', color: '#1E293B', fontWeight: '500' }}>
                        {item.action}
                      </div>
                      {item.note && (
                        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', fontStyle: 'italic' }}>
                          « {item.note} »
                        </div>
                      )}
                    </td>

                    {/* Responsable */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                        {item.user || 'Dr. Nadia Mansour'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="Aucun mouvement trouvé"
          description="Aucune opération ne correspond aux critères de recherche ou au filtre sélectionné."
          actionLabel="Afficher tous les mouvements"
          onAction={() => {
            setFilterType('all');
            setSearchQuery('');
          }}
        />
      )}
    </div>
  );
}
