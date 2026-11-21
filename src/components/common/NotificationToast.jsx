import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

/**
 * Composant NotificationToast Réutilisable PharmaCityTN
 * @param {Object} props
 * @param {'success' | 'warning' | 'error' | 'info'} [props.type='info']
 * @param {string} [props.title]
 * @param {string} props.message
 * @param {Function} [props.onClose]
 * @param {number} [props.duration] - Durée en ms avant fermeture auto
 */
export default function NotificationToast({
  type = 'info',
  title,
  message,
  onClose,
  duration,
  className = '',
  style = {},
}) {
  useEffect(() => {
    if (!duration || !onClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle2,
      color: 'var(--color-success)',
      bg: 'var(--color-success-light)',
      border: 'var(--color-success-border)',
      titleColor: 'var(--color-success-dark)',
      defaultTitle: 'Succès',
    },
    warning: {
      icon: AlertTriangle,
      color: 'var(--color-warning)',
      bg: 'var(--color-warning-light)',
      border: 'var(--color-warning-border)',
      titleColor: 'var(--color-warning-dark)',
      defaultTitle: 'Avertissement',
    },
    error: {
      icon: AlertCircle,
      color: 'var(--color-danger)',
      bg: 'var(--color-danger-light)',
      border: 'var(--color-danger-border)',
      titleColor: 'var(--color-danger-dark)',
      defaultTitle: 'Erreur',
    },
    info: {
      icon: Info,
      color: 'var(--color-info)',
      bg: 'var(--color-info-light)',
      border: 'var(--color-info-border)',
      titleColor: 'var(--color-info-dark)',
      defaultTitle: 'Information',
    },
  };

  const current = config[type] || config.info;
  const Icon = current.icon;

  return (
    <div
      role="alert"
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--color-bg-surface)',
        border: `1px solid ${current.border}`,
        boxShadow: 'var(--shadow-md)',
        maxWidth: '420px',
        width: '100%',
        animation: 'slideDown var(--transition-fast) ease-out',
        position: 'relative',
        ...style,
      }}
    >
      {/* Pastille Icône */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: current.bg,
          color: current.color,
          flexShrink: 0,
        }}
      >
        <Icon size={18} strokeWidth={2.2} />
      </div>

      {/* Contenu Texte */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4
          style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-bold)',
            color: current.titleColor,
            marginBottom: '2px',
          }}
        >
          {title || current.defaultTitle}
        </h4>
        <p
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-secondary)',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {message}
        </p>
      </div>

      {/* Bouton de Fermeture */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la notification"
          style={{
            color: 'var(--color-text-muted)',
            padding: '2px',
            borderRadius: 'var(--radius-xs)',
            cursor: 'pointer',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
