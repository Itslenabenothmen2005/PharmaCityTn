import React from 'react';
import { PackageOpen } from 'lucide-react';

/**
 * Composant EmptyState Réutilisable PharmaCityTN
 * @param {Object} props
 * @param {React.ReactNode} [props.icon]
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {React.ReactNode} [props.action]
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
  style = {},
}) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--spacing-3xl) var(--spacing-lg)',
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed var(--color-border)',
        ...style,
      }}
    >
      {/* Cercle d'icône */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          marginBottom: 'var(--spacing-md)',
        }}
      >
        {Icon ? <Icon size={32} strokeWidth={1.75} /> : <PackageOpen size={32} strokeWidth={1.75} />}
      </div>

      {/* Titre */}
      <h3
        style={{
          fontSize: 'var(--font-size-lg)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--spacing-xs)',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            maxWidth: '440px',
            marginBottom: action ? 'var(--spacing-lg)' : 0,
            lineHeight: 'var(--line-height-normal)',
          }}
        >
          {description}
        </p>
      )}

      {/* Action (Bouton ou lien) */}
      {action && <div>{action}</div>}
    </div>
  );
}
