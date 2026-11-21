import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Composant Modal Réutilisable PharmaCityTN
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {string|React.ReactNode} [props.title]
 * @param {string|React.ReactNode} [props.description]
 * @param {React.ReactNode} [props.footer]
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.closeOnOverlay=true]
 * @param {React.ReactNode} props.children
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  footer,
  size = 'md',
  closeOnOverlay = true,
  children,
}) {
  // Gestion de la touche Échap et verrouillage du défilement
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthes = {
    sm: '420px',
    md: '540px',
    lg: '720px',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-modal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-md)',
      }}
    >
      {/* Arrière-plan sombre avec flou discret */}
      <div
        onClick={closeOnOverlay ? onClose : undefined}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(3px)',
          animation: 'fadeIn var(--transition-fast) ease-out',
        }}
        aria-hidden="true"
      />

      {/* Conteneur de la Fenêtre Modale */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: maxWidthes[size] || maxWidthes.md,
          backgroundColor: 'var(--color-bg-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          zIndex: 1,
          animation: 'slideDown var(--transition-normal) cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        {/* En-tête de la Modale */}
        <div
          style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        >
          <div>
            {title && (
              <h3
                style={{
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                {title}
              </h3>
            )}
            {description && (
              <p
                style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-secondary)',
                  marginTop: '4px',
                  margin: 0,
                }}
              >
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              marginLeft: '12px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)';
              e.currentTarget.style.color = 'var(--color-text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Corps de la Modale */}
        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {children}
        </div>

        {/* Pied de Modale (Actions) */}
        {footer && (
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: 'var(--color-bg-subtle)',
              borderTop: '1px solid var(--color-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
