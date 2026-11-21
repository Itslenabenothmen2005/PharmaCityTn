import React, { useState } from 'react';

/**
 * Composant Card Réutilisable PharmaCityTN
 * @param {Object} props
 * @param {string|React.ReactNode} [props.title]
 * @param {string|React.ReactNode} [props.subtitle]
 * @param {React.ReactNode} [props.icon]
 * @param {React.ReactNode} [props.headerAction]
 * @param {React.ReactNode} [props.footer]
 * @param {boolean} [props.hoverable=false]
 * @param {boolean} [props.bordered=true]
 * @param {'none' | 'sm' | 'md' | 'lg'} [props.padding='md']
 * @param {Function} [props.onClick]
 * @param {React.ReactNode} props.children
 */
export default function Card({
  title,
  subtitle,
  icon,
  headerAction,
  footer,
  hoverable = false,
  bordered = true,
  padding = 'md',
  onClick,
  children,
  className = '',
  style = {},
  ...rest
}) {
  const [isHovered, setIsHovered] = useState(false);

  const paddingValues = {
    none: '0',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-xl)',
  };

  const hasHeader = Boolean(title || subtitle || icon || headerAction);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: bordered
          ? `1px solid ${hoverable && isHovered ? 'var(--color-primary)' : 'var(--color-border)'}`
          : 'none',
        boxShadow: hoverable && isHovered ? 'var(--shadow-card-hover)' : 'var(--shadow-sm)',
        transform: hoverable && isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all var(--transition-normal)',
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      {...rest}
    >
      {/* En-tête de Carte */}
      {hasHeader && (
        <div
          style={{
            padding: paddingValues[padding],
            paddingBottom: children ? 'var(--spacing-sm)' : paddingValues[padding],
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
            borderBottom: children ? '1px solid var(--color-border-subtle)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {icon && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3
                  style={{
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    marginTop: '2px',
                    margin: 0,
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {headerAction && <div style={{ flexShrink: 0 }}>{headerAction}</div>}
        </div>
      )}

      {/* Corps de la Carte */}
      {children && (
        <div
          style={{
            padding: paddingValues[padding],
            flex: 1,
          }}
        >
          {children}
        </div>
      )}

      {/* Pied de Carte */}
      {footer && (
        <div
          style={{
            padding: paddingValues[padding],
            paddingTop: 'var(--spacing-sm)',
            borderTop: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-bg-subtle)',
            marginTop: 'auto',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
