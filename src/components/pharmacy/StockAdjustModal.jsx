import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Truck,
  ShoppingCart,
  FileCheck2,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { computeAutoStatus } from '../../hooks/usePharmacyStore';

const MOVEMENT_TYPES = [
  {
    id: 'reception',
    label: 'Réception de commande / Livraison grossiste',
    icon: Truck,
    color: '#16A34A',
    bg: '#DCFCE7',
    sign: '+',
  },
  {
    id: 'delivery',
    label: 'Délivrance au comptoir / Vente ordonnance',
    icon: ShoppingCart,
    color: '#2563EB',
    bg: '#EFF6FF',
    sign: '-',
  },
  {
    id: 'adjustment',
    label: 'Inventaire physique / Régularisation',
    icon: FileCheck2,
    color: '#7C3AED',
    bg: '#F5F3FF',
    sign: '±',
  },
  {
    id: 'rupture',
    label: 'Déclaration de rupture (Quantité ➜ 0)',
    icon: XCircle,
    color: '#DC2626',
    bg: '#FEE2E2',
    sign: '0',
  },
  {
    id: 'loss',
    label: 'Pertes / Avaries / Produits périmés',
    icon: Trash2,
    color: '#B45309',
    bg: '#FEF3C7',
    sign: '-',
  },
];

export default function StockAdjustModal({
  isOpen,
  onClose,
  medicine,
  onConfirm,
}) {
  if (!medicine) return null;

  const currentQty = Number(medicine.quantity) || 0;
  const threshold = Number(medicine.lowStockThreshold) || 5;

  const [movementType, setMovementType] = useState('reception');
  const [targetQuantity, setTargetQuantity] = useState(currentQty + 10);
  const [deltaAmount, setDeltaAmount] = useState(10);
  const [note, setNote] = useState('');
  const [requireConfirmRupture, setRequireConfirmRupture] = useState(false);

  useEffect(() => {
    if (isOpen && medicine) {
      setMovementType('reception');
      setDeltaAmount(10);
      setTargetQuantity(currentQty + 10);
      setNote('');
      setRequireConfirmRupture(false);
    }
  }, [isOpen, medicine]);

  const handleTypeSelect = (typeId) => {
    setMovementType(typeId);
    if (typeId === 'rupture') {
      setTargetQuantity(0);
      setDeltaAmount(currentQty);
    } else if (typeId === 'reception') {
      const add = 10;
      setDeltaAmount(add);
      setTargetQuantity(currentQty + add);
    } else if (typeId === 'delivery') {
      const sub = Math.min(1, currentQty);
      setDeltaAmount(sub);
      setTargetQuantity(Math.max(0, currentQty - sub));
    } else if (typeId === 'loss') {
      const sub = Math.min(1, currentQty);
      setDeltaAmount(sub);
      setTargetQuantity(Math.max(0, currentQty - sub));
    } else if (typeId === 'adjustment') {
      setTargetQuantity(currentQty);
      setDeltaAmount(0);
    }
  };

  const handleDeltaChange = (delta) => {
    if (movementType === 'reception') {
      const d = Math.max(1, parseInt(delta, 10) || 1);
      setDeltaAmount(d);
      setTargetQuantity(currentQty + d);
    } else if (movementType === 'delivery' || movementType === 'loss') {
      const d = Math.max(1, parseInt(delta, 10) || 1);
      setDeltaAmount(d);
      setTargetQuantity(Math.max(0, currentQty - d));
    }
  };

  const handleDirectTargetChange = (val) => {
    const parsed = Math.max(0, parseInt(val, 10) || 0);
    setTargetQuantity(parsed);
    setDeltaAmount(Math.abs(parsed - currentQty));
  };

  const projectedStatus = computeAutoStatus(targetQuantity, threshold);
  const currentStatus = computeAutoStatus(currentQty, threshold);
  const delta = targetQuantity - currentQty;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Si la nouvelle quantité est 0 et que l'utilisateur n'a pas encore validé l'avertissement de rupture
    if (targetQuantity === 0 && currentQty > 0 && !requireConfirmRupture) {
      setRequireConfirmRupture(true);
      return;
    }

    const selectedTypeObj = MOVEMENT_TYPES.find((t) => t.id === movementType);
    const actionText = `${selectedTypeObj?.label} (${delta >= 0 ? `+${delta}` : delta} boîtes)`;

    onConfirm({
      medicineId: medicine.id,
      newQuantity: targetQuantity,
      movementType,
      actionText,
      note: note.trim() || `Mouvement manuel enregistré par le pharmacien titulaire.`,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Mouvement de Stock — ${medicine.name}`}
      size="md"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Rappel du produit */}
        <div
          style={{
            padding: '12px 14px',
            backgroundColor: '#F8FAFC',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>
              {medicine.name}{' '}
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 'normal' }}>
                ({medicine.dosage} • {medicine.form})
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
              Réf : {medicine.reference} • Seuil d'alerte configuré : <strong>{threshold} boîtes</strong>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Stock actuel</div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
              {currentQty} boîtes
            </div>
          </div>
        </div>

        {/* 1. Sélection du motif de mouvement */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A', marginBottom: '8px', display: 'block' }}>
            1. Type d'opération :
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
            {MOVEMENT_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = movementType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleTypeSelect(type.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? `2px solid ${type.color}` : '1px solid #CBD5E1',
                    backgroundColor: isSelected ? type.bg : '#FFFFFF',
                    color: isSelected ? type.color : '#334155',
                    fontSize: '12px',
                    fontWeight: isSelected ? '700' : '500',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Icon size={16} color={type.color} style={{ flexShrink: 0 }} />
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Saisie du volume ou de la nouvelle quantité */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A', marginBottom: '8px', display: 'block' }}>
            2. Définir la nouvelle quantité en stock :
          </label>

          {movementType === 'rupture' ? (
            <div
              style={{
                padding: '12px 14px',
                backgroundColor: '#FFF5F5',
                border: '1.5px solid #FECACA',
                borderRadius: 'var(--radius-md)',
                color: '#991B1B',
                fontSize: '13px',
              }}
            >
              <strong>Déclaration d'épuisement :</strong> La quantité en stock sera ramenée à <strong>0 boîte</strong> et le médicament passera automatiquement en statut <strong>Indisponible</strong> sur la plateforme.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Raccourcis de quantité rapide */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', color: '#64748B' }}>Raccourcis :</span>
                {movementType === 'reception' && (
                  <>
                    {[5, 10, 20, 50].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleDeltaChange(num)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: '1px solid #16A34A',
                          backgroundColor: '#DCFCE7',
                          color: '#15803D',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        +{num}
                      </button>
                    ))}
                  </>
                )}

                {(movementType === 'delivery' || movementType === 'loss') && (
                  <>
                    {[1, 2, 5, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleDeltaChange(num)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: '1px solid #EF4444',
                          backgroundColor: '#FEE2E2',
                          color: '#B91C1C',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        -{num}
                      </button>
                    ))}
                  </>
                )}
              </div>

              {/* Saisie directe */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '4px' }}>
                    Saisie directe de la quantité finale en rayon :
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={targetQuantity}
                    onChange={(e) => handleDirectTargetChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid var(--color-primary)',
                      fontSize: '18px',
                      fontWeight: '800',
                      color: '#0F172A',
                      outline: 'none',
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: '8px 14px',
                    backgroundColor: '#F1F5F9',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    minWidth: '100px',
                  }}
                >
                  <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 'bold' }}>VARIATION (DELTA)</div>
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: '800',
                      color: delta > 0 ? '#16A34A' : delta < 0 ? '#DC2626' : '#64748B',
                    }}
                  >
                    {delta > 0 ? `+${delta}` : delta}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Champ motif / commentaire */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
            Numéro de bon / Motif du mouvement (optionnel) :
          </label>
          <input
            type="text"
            placeholder="ex: BL-SIPHAT-2026-44, Contrôle péremption, etc."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #CBD5E1',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        {/* 4. VISUALISATION DU STATUT AUTOMATIQUE RÉSULTANT */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 'bold' }}>STATUT AUTOMATIQUE APRÈS OPÉRATION</div>
            <div style={{ fontSize: '13px', color: '#0F172A', marginTop: '2px' }}>
              Stock prévu : <strong>{targetQuantity} boîtes</strong> (Seuil : {threshold})
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#64748B' }}>Nouveau statut :</span>
            {projectedStatus === 'available' ? (
              <Badge variant="success" dot size="md">
                Disponible
              </Badge>
            ) : projectedStatus === 'low' ? (
              <Badge variant="warning" dot size="md">
                Stock limité
              </Badge>
            ) : (
              <Badge variant="danger" dot size="md">
                Indisponible
              </Badge>
            )}
          </div>
        </div>

        {/* Avertissement de confirmation de rupture */}
        {requireConfirmRupture && (
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: '#FEF2F2',
              border: '1.5px solid #DC2626',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              color: '#991B1B',
            }}
          >
            <AlertTriangle size={20} color="#DC2626" style={{ flexShrink: 0 }} />
            <span>
              <strong>Attention :</strong> Cette action déclarera une <strong>rupture immédiate</strong> pour « {medicine.name} ». Les patients en recherche verront ce médicament indisponible. Cliquez à nouveau pour confirmer.
            </span>
          </div>
        )}

        {/* Actions du modal */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            borderTop: '1px solid #E2E8F0',
            paddingTop: '14px',
          }}
        >
          <Button variant="ghost" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button
            variant={requireConfirmRupture ? 'danger' : 'primary'}
            type="submit"
            icon={CheckCircle2}
          >
            {requireConfirmRupture ? 'Confirmer la rupture (Stock = 0)' : 'Enregistrer le mouvement de stock'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
