import React, { useState, useEffect } from 'react';
import { Sliders, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { computeAutoStatus } from '../../hooks/usePharmacyStore';

export default function ThresholdModal({
  isOpen,
  onClose,
  medicine,
  onConfirm,
}) {
  if (!medicine) return null;

  const currentThreshold = Number(medicine.lowStockThreshold) || 5;
  const currentQty = Number(medicine.quantity) || 0;

  const [threshold, setThreshold] = useState(currentThreshold);

  useEffect(() => {
    if (isOpen && medicine) {
      setThreshold(Number(medicine.lowStockThreshold) || 5);
    }
  }, [isOpen, medicine]);

  const simulatedStatus = computeAutoStatus(currentQty, threshold);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalThreshold = Math.max(1, parseInt(threshold, 10) || 5);
    onConfirm(medicine.id, finalThreshold);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Configuration du Seuil d'Alerte — ${medicine.name}`}
      size="sm"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
          Définissez la quantité minimale sous laquelle l'officine déclenche une alerte de réapprovisionnement pour ce produit.
        </div>

        {/* Rappel du stock actuel */}
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
            <div style={{ fontSize: '11px', color: '#64748B' }}>Stock actuel en rayon</div>
            <strong style={{ fontSize: '16px', color: '#0F172A' }}>{currentQty} boîtes</strong>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Seuil actuel</div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#D97706' }}>
              {currentThreshold} boîtes
            </span>
          </div>
        </div>

        {/* Saisie du nouveau seuil */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
            Nouveau seuil critique (boîtes) :
          </label>
          <input
            type="number"
            min="1"
            max="200"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
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

        {/* Raccourcis courants */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[3, 5, 10, 15, 20].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setThreshold(val)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: Number(threshold) === val ? '1.5px solid var(--color-primary)' : '1px solid #CBD5E1',
                backgroundColor: Number(threshold) === val ? 'var(--color-primary-light)' : '#FFFFFF',
                color: Number(threshold) === val ? 'var(--color-primary-dark)' : '#475569',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              {val} boîtes
            </button>
          ))}
        </div>

        {/* Impact automatique sur le statut */}
        <div
          style={{
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: '12px', color: '#1E40AF' }}>
            Statut automatique calculé :
          </div>
          {simulatedStatus === 'available' ? (
            <Badge variant="success" dot size="sm">
              Disponible
            </Badge>
          ) : simulatedStatus === 'low' ? (
            <Badge variant="warning" dot size="sm">
              Stock limité
            </Badge>
          ) : (
            <Badge variant="danger" dot size="sm">
              Indisponible
            </Badge>
          )}
        </div>

        {/* Boutons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px' }}>
          <Button variant="ghost" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit" icon={CheckCircle2}>
            Enregistrer le seuil
          </Button>
        </div>
      </form>
    </Modal>
  );
}
