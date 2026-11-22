import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Plus,
  Minus,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  ArrowUpDown,
  History,
  Sliders,
  Check,
  TrendingUp,
  FileText,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';
import StockAdjustModal from '../../components/pharmacy/StockAdjustModal';
import ThresholdModal from '../../components/pharmacy/ThresholdModal';
import { usePharmacyStore } from '../../hooks/usePharmacyStore';
import { useToast } from '../../hooks/useToast';

export default function StockPage() {
  const { stock, stats, history, updateQuantity, quickAdjust, updateThreshold } = usePharmacyStore();
  const toast = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // all | available | low | unavailable
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Il y a 3 minutes');

  // Modales
  const [adjustModalMed, setAdjustModalMed] = useState(null);
  const [thresholdModalMed, setThresholdModalMed] = useState(null);

  // Saisie directe
  const [inputValues, setInputValues] = useState({});

  /**
   * 1. Augmentation / Diminution rapide avec boutons
   */
  const handleQuickStep = (med, delta) => {
    const res = quickAdjust(med.id, delta, {
      reasonType: delta > 0 ? 'reception' : 'delivery',
      actionText: delta > 0 ? `Réception rapide (+${delta})` : `Délivrance rapide (${delta})`,
      note: delta > 0 ? 'Ajout unitaire en rayon' : 'Délivrance unitaire au comptoir',
    });

    if (res) {
      if (res.newQuantity === 0) {
        toast.error(`« ${med.name} » est maintenant en rupture de stock (0 boîte).`, 'Indisponible');
      } else if (res.statusAfter === 'low' && res.statusBefore !== 'low') {
        toast.warning(
          `Attention : « ${med.name} » a basculé en stock limité (${res.newQuantity} boîtes, seuil : ${med.lowStockThreshold}).`,
          'Stock critique'
        );
      } else {
        toast.success(`Quantité mise à jour : ${res.newQuantity} boîtes.`, med.name);
      }
    }
  };

  /**
   * Saisie directe de la quantité
   */
  const handleDirectInputBlur = (med) => {
    const val = inputValues[med.id];
    if (val === undefined || val === '') return;

    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed < 0) {
      toast.error('Veuillez saisir un nombre entier positif ou nul.', 'Valeur invalide');
      // Réinitialiser la valeur saisie
      setInputValues((prev) => ({ ...prev, [med.id]: med.quantity }));
      return;
    }

    if (parsed === med.quantity) return;

    const res = updateQuantity(med.id, parsed, {
      reasonType: 'adjustment',
      actionText: `Ajustement direct en rayon (${med.quantity} ➜ ${parsed})`,
      note: 'Modification directe via l’interface de gestion du stock',
    });

    if (res) {
      if (parsed === 0) {
        toast.error(`« ${med.name} » est passé à 0 (Indisponible).`, 'Rupture déclarée');
      } else {
        toast.success(`Stock de « ${med.name} » actualisé à ${parsed} boîtes.`, 'Quantité enregistrée');
      }
    }
  };

  /**
   * Validation de la modale avancée de mouvement
   */
  const handleAdjustModalConfirm = ({ medicineId, newQuantity, movementType, actionText, note }) => {
    const res = updateQuantity(medicineId, newQuantity, {
      reasonType: movementType,
      actionText,
      note,
    });

    if (res) {
      if (newQuantity === 0) {
        toast.error(`« ${res.medicine.name} » déclaré en rupture immédiate (Stock = 0).`, 'Rupture');
      } else {
        toast.success(
          `Mouvement enregistré : ${actionText}. Nouveau stock : ${newQuantity} boîtes.`,
          res.medicine.name
        );
      }
    }
  };

  /**
   * Validation de la modale de seuil configurable
   */
  const handleThresholdConfirm = (medicineId, newThreshold) => {
    updateThreshold(medicineId, newThreshold);
    toast.success(`Nouveau seuil d’alerte configuré à ${newThreshold} boîtes.`, 'Seuil actualisé');
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastSyncTime('À l’instant');
      toast.success('Inventaire synchronisé avec succès avec la base PharmaCityTN.', 'Synchronisation réussie');
    }, 600);
  };

  const filteredStock = stock.filter((med) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      const matchName = med.name.toLowerCase().includes(q);
      const matchDci = med.dci.toLowerCase().includes(q);
      const matchRef = med.reference.toLowerCase().includes(q);
      if (!matchName && !matchDci && !matchRef) return false;
    }

    if (filterMode === 'available') return med.status === 'available';
    if (filterMode === 'low') return med.status === 'low';
    if (filterMode === 'unavailable') return med.status === 'unavailable';
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* En-tête */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', color: '#0F172A', margin: 0 }}>
              Gestion Interactive du Stock
            </h1>
            <Badge variant="primary" size="sm">
              Mise à jour en temps réel
            </Badge>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            Augmentez, diminuez ou saisissez directement les quantités en stock. Les statuts se recalculent automatiquement.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link to="/pharmacy/history" style={{ textDecoration: 'none' }}>
            <Button variant="outline" icon={History}>
              Historique des mouvements ({history.length})
            </Button>
          </Link>

          <Button
            variant="secondary"
            icon={RefreshCw}
            onClick={handleSync}
            disabled={syncing}
          >
            {syncing ? 'Synchronisation...' : 'Synchroniser l’inventaire'}
          </Button>
        </div>
      </div>

      {/* Cartes métriques de stock & statuts automatiques */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        {/* Disponible */}
        <div
          onClick={() => setFilterMode('available')}
          style={{
            padding: '16px 18px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: filterMode === 'available' ? '2px solid #16A34A' : '1px solid #BBF7D0',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(22, 139, 112, 0.05)',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#DCFCE7',
                color: '#16A34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={20} />
            </div>
            <Badge variant="success" size="sm" dot>
              Quantité &gt; Seuil
            </Badge>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#166534', lineHeight: 1.1 }}>
            {stats.available}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
            Médicaments disponibles
          </div>
        </div>

        {/* Stock limité */}
        <div
          onClick={() => setFilterMode('low')}
          style={{
            padding: '16px 18px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: filterMode === 'low' ? '2px solid #D97706' : '1px solid #FDE68A',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(217, 119, 6, 0.05)',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={20} />
            </div>
            <Badge variant="warning" size="sm" dot>
              0 &lt; Quantité ≤ Seuil
            </Badge>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#B45309', lineHeight: 1.1 }}>
            {stats.low}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
            Stocks critiques (à réapprovisionner)
          </div>
        </div>

        {/* Indisponible */}
        <div
          onClick={() => setFilterMode('unavailable')}
          style={{
            padding: '16px 18px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: filterMode === 'unavailable' ? '2px solid #DC2626' : '1px solid #FECACA',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(220, 38, 38, 0.05)',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <XCircle size={20} />
            </div>
            <Badge variant="danger" size="sm" dot>
              Quantité = 0
            </Badge>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#991B1B', lineHeight: 1.1 }}>
            {stats.unavailable}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
            Ruptures d’officine (Indisponibles)
          </div>
        </div>
      </div>

      {/* Règle des statuts rappel automatique */}
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: '#F8FAFC',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '12px',
          color: '#475569',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={16} color="var(--color-primary)" />
          <span>
            <strong>Dernière synchronisation :</strong> {lastSyncTime}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
            Disponible (Quantité &gt; Seuil)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D97706' }} />
            Stock limité (0 &lt; Qté ≤ Seuil)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#DC2626' }} />
            Indisponible (Qté = 0)
          </span>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          backgroundColor: '#FFFFFF',
          padding: '14px 16px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ flex: 1, minWidth: '240px' }}>
          <SearchBar
            placeholder="Rechercher par médicament, DCI ou référence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12px',
              fontWeight: filterMode === 'all' ? '700' : '500',
              border: filterMode === 'all' ? '1.5px solid var(--color-primary)' : '1px solid #CBD5E1',
              backgroundColor: filterMode === 'all' ? 'var(--color-primary-light)' : '#FFFFFF',
              color: filterMode === 'all' ? 'var(--color-primary-dark)' : '#475569',
              cursor: 'pointer',
            }}
          >
            Tous ({stock.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('available')}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12px',
              fontWeight: filterMode === 'available' ? '700' : '500',
              border: filterMode === 'available' ? '1.5px solid #16A34A' : '1px solid #CBD5E1',
              backgroundColor: filterMode === 'available' ? '#DCFCE7' : '#FFFFFF',
              color: filterMode === 'available' ? '#15803D' : '#475569',
              cursor: 'pointer',
            }}
          >
            Disponibles ({stats.available})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('low')}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12px',
              fontWeight: filterMode === 'low' ? '700' : '500',
              border: filterMode === 'low' ? '1.5px solid #D97706' : '1px solid #CBD5E1',
              backgroundColor: filterMode === 'low' ? '#FEF3C7' : '#FFFFFF',
              color: filterMode === 'low' ? '#B45309' : '#475569',
              cursor: 'pointer',
            }}
          >
            Stock limité ({stats.low})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('unavailable')}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12px',
              fontWeight: filterMode === 'unavailable' ? '700' : '500',
              border: filterMode === 'unavailable' ? '1.5px solid #DC2626' : '1px solid #CBD5E1',
              backgroundColor: filterMode === 'unavailable' ? '#FEE2E2' : '#FFFFFF',
              color: filterMode === 'unavailable' ? '#991B1B' : '#475569',
              cursor: 'pointer',
            }}
          >
            Ruptures ({stats.unavailable})
          </button>
        </div>
      </div>

      {/* LISTE DÉTAILLÉE DE GESTION DU STOCK */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredStock.map((med) => {
          const isUnavailable = med.quantity === 0;
          const isLow = !isUnavailable && med.quantity <= med.lowStockThreshold;
          const isAvailable = med.quantity > med.lowStockThreshold;

          // Valeur d'input courante
          const currentInputVal =
            inputValues[med.id] !== undefined ? inputValues[med.id] : med.quantity;

          return (
            <div
              key={med.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: isUnavailable
                  ? '1.5px solid #FECACA'
                  : isLow
                  ? '1.5px solid #FDE68A'
                  : '1px solid #E2E8F0',
                padding: '18px 20px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              {/* Colonne 1 : Informations du médicament */}
              <div style={{ flex: '1 1 280px', minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>
                    {med.name}
                  </h3>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>({med.dosage})</span>
                  {med.prescriptionRequired && (
                    <span
                      title="Ordonnance requise"
                      style={{
                        padding: '1px 5px',
                        borderRadius: '4px',
                        backgroundColor: '#FEE2E2',
                        color: '#991B1B',
                        fontSize: '10px',
                        fontWeight: '700',
                      }}
                    >
                      Rx
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '12px', color: '#475569', marginTop: '3px' }}>
                  <strong>DCI :</strong> {med.dci} • {med.form}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px', fontSize: '11px', color: '#94A3B8' }}>
                  <span>Réf : {med.reference}</span>
                  <span>•</span>
                  <span>Fournisseur : {med.supplier || 'National'}</span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B' }}>
                    <Clock size={12} /> Dernière MàJ : <strong>{med.lastUpdate}</strong>
                  </span>
                </div>
              </div>

              {/* Colonne 2 : Statut automatique & Seuil configurable */}
              <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '160px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isAvailable && (
                    <Badge variant="success" dot size="md">
                      Disponible
                    </Badge>
                  )}
                  {isLow && (
                    <Badge variant="warning" dot size="md">
                      Stock limité
                    </Badge>
                  )}
                  {isUnavailable && (
                    <Badge variant="danger" dot size="md">
                      Indisponible
                    </Badge>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>
                    Seuil d'alerte : <strong>{med.lowStockThreshold} boîtes</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setThresholdModalMed(med)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-primary)',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '2px',
                      padding: 0,
                    }}
                    title="Modifier le seuil d'alerte pour ce médicament"
                  >
                    <Sliders size={12} /> Modifier
                  </button>
                </div>
              </div>

              {/* Colonne 3 : Commandes interactives de stock */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#F8FAFC',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                }}
              >
                {/* Bouton -1 */}
                <button
                  type="button"
                  onClick={() => handleQuickStep(med, -1)}
                  disabled={med.quantity <= 0}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: med.quantity <= 0 ? '#F1F5F9' : '#FFFFFF',
                    color: med.quantity <= 0 ? '#94A3B8' : '#0F172A',
                    cursor: med.quantity <= 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                  title="Diminuer de 1 boîte (-1)"
                >
                  <Minus size={16} />
                </button>

                {/* Champ de saisie directe */}
                <div style={{ textAlign: 'center' }}>
                  <input
                    type="number"
                    min="0"
                    value={currentInputVal}
                    onChange={(e) =>
                      setInputValues({ ...inputValues, [med.id]: e.target.value })
                    }
                    onBlur={() => handleDirectInputBlur(med)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.target.blur();
                      }
                    }}
                    style={{
                      width: '64px',
                      height: '36px',
                      textAlign: 'center',
                      borderRadius: '8px',
                      border: `2px solid ${
                        isUnavailable ? '#DC2626' : isLow ? '#D97706' : 'var(--color-primary)'
                      }`,
                      backgroundColor: '#FFFFFF',
                      fontSize: '17px',
                      fontWeight: '800',
                      color: isUnavailable ? '#DC2626' : isLow ? '#D97706' : '#166534',
                      outline: 'none',
                    }}
                    title="Saisissez directement une quantité puis appuyez sur Entrée"
                  />
                  <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>boîtes</div>
                </div>

                {/* Bouton +1 */}
                <button
                  type="button"
                  onClick={() => handleQuickStep(med, 1)}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#0F172A',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                  title="Ajouter 1 boîte (+1)"
                >
                  <Plus size={16} />
                </button>

                {/* Bouton +10 (Réception de lot) */}
                <button
                  type="button"
                  onClick={() => handleQuickStep(med, 10)}
                  style={{
                    padding: '0 10px',
                    height: '34px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-primary)',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary-dark)',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  title="Réception rapide de lot grossiste (+10 boîtes)"
                >
                  +10
                </button>

                {/* Bouton Mouvement avec motif & confirmation */}
                <button
                  type="button"
                  onClick={() => setAdjustModalMed(med)}
                  style={{
                    padding: '0 12px',
                    height: '34px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  title="Ouvrir le formulaire détaillé de mouvement de stock"
                >
                  Motif...
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de mouvement détaillé & confirmation */}
      <StockAdjustModal
        isOpen={Boolean(adjustModalMed)}
        onClose={() => setAdjustModalMed(null)}
        medicine={adjustModalMed}
        onConfirm={handleAdjustModalConfirm}
      />

      {/* Modal de configuration du seuil */}
      <ThresholdModal
        isOpen={Boolean(thresholdModalMed)}
        onClose={() => setThresholdModalMed(null)}
        medicine={thresholdModalMed}
        onConfirm={handleThresholdConfirm}
      />
    </div>
  );
}
