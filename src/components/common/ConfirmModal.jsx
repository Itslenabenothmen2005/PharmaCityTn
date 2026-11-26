import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

/**
 * Modale de confirmation réutilisable PharmaCityTN
 */
export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmation requise',
  message = 'Êtes-vous sûr de vouloir effectuer cette action ? Cette opération est irréversible.',
  confirmLabel = 'Confirmer la suppression',
  cancelLabel = 'Annuler',
  variant = 'danger', // 'danger' | 'warning' | 'primary'
  icon = null,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: variant === 'danger' ? '#FEE2E2' : '#FEF3C7',
              color: variant === 'danger' ? '#DC2626' : '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {icon ? icon : variant === 'danger' ? <Trash2 size={22} /> : <AlertTriangle size={22} />}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: '1.5' }}>
              {message}
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            borderTop: '1px solid #E2E8F0',
            paddingTop: '14px',
            marginTop: '8px',
          }}
        >
          <Button variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
