import React from 'react';

/**
 * Composant Badge Réutilisable PharmaCityTN
 * @param {Object} props
 * @param {'success' | 'danger' | 'warning' | 'info' | 'neutral' | 'primary'} [props.variant='primary']
 * @param {'sm' | 'md'} [props.size='md']
 * @param {boolean} [props.dot=false]
 * @param {React.ReactNode} [props.icon]
 * @param {React.ReactNode} props.children
 */
export default function Badge({
  variant = 'primary',
  size = 'md',
  dot = false,
  icon: Icon,
  children,
  className = '',
  style = {},
  ...rest
}) {
  const variantStyles = {
    success: {
      background: 'var(--color-success-light)',
      color: 'var(--color-success-text)',
      border: '1px solid var(--color-success-border)',
      dotColor: 'var(--color-success)',
    },
    danger: {
      background: 'var(--color-danger-light)',
      color: 'var(--color-danger-text)',
      border: '1px solid var(--color-danger-border)',
      dotColor: 'var(--color-danger)',
    },
    warning: {
      background: 'var(--color-warning-light)',
      color: 'var(--color-warning-text)',
      border: '1px solid var(--color-warning-border)',
      dotColor: 'var(--color-warning)',
    },
    info: {
      background: 'var(--color-info-light)',
      color: 'var(--color-info-text)',
      border: '1px solid var(--color-info-border)',
      dotColor: 'var(--color-info)',
    },
    neutral: {
      background: 'var(--color-bg-subtle)',
      color: 'var(--color-text-secondary)',
      border: '1px solid var(--color-border)',
      dotColor: 'var(--color-text-muted)',
    },
    primary: {
      background: 'var(--color-primary-light)',
      color: 'var(--color-primary-dark)',
      border: '1px solid var(--color-success-border)',
      dotColor: 'var(--color-primary)',
    },
  };

  const sizeStyles = {
    sm: {
      padding: '2px 8px',
      fontSize: '0.6875rem', /* 11px */
      gap: '4px',
      height: '20px',
    },
    md: {
      padding: '4px 10px',
      fontSize: 'var(--font-size-xs)', /* 12px */
      gap: '6px',
      height: '24px',
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.primary;
  const currentSize = sizeStyles[size] || sizeStyles.md;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 1,
        borderRadius: 'var(--radius-full)',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ...currentSize,
        ...currentVariant,
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span
          style={{
            width: size === 'sm' ? '5px' : '6px',
            height: size === 'sm' ? '5px' : '6px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: currentVariant.dotColor,
            flexShrink: 0,
          }}
        />
      )}
      {Icon && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{Icon}</span>}
      <span>{children}</span>
    </span>
  );
}
