import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldPlus } from 'lucide-react';

/**
 * Logo textuel provisoire PharmaCityTN avec icône médicale adaptée.
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Taille du logo
 * @param {'dark' | 'light'} [props.variant='dark'] - Thème couleur
 * @param {boolean} [props.showTagline=false] - Afficher le sous-titre
 * @param {boolean} [props.asLink=true] - Rendre cliquable vers /
 */
export default function Logo({
  size = 'md',
  variant = 'dark',
  showTagline = false,
  asLink = true,
  className = '',
}) {
  const isLight = variant === 'light';

  // Tailles
  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 32,
  };

  const badgePadding = {
    sm: '6px',
    md: '8px',
    lg: '12px',
  };

  const fontSizes = {
    sm: '1rem',
    md: '1.35rem',
    lg: '1.75rem',
  };

  const content = (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'lg' ? '12px' : '10px',
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      {/* Icône Médicale Stylisée */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: badgePadding[size],
          borderRadius: 'var(--radius-md)',
          background: isLight ? 'rgba(255, 255, 255, 0.15)' : 'var(--color-primary-light)',
          color: isLight ? 'var(--color-white)' : 'var(--color-primary)',
          boxShadow: isLight ? 'none' : 'var(--shadow-xs)',
          transition: 'transform var(--transition-fast)',
        }}
      >
        <ShieldPlus size={iconSizes[size]} strokeWidth={2.5} />
      </div>

      {/* Texte du Logo */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            lineHeight: 1,
            fontSize: fontSizes[size],
            fontWeight: 'var(--font-weight-extrabold)',
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ color: isLight ? '#FFFFFF' : 'var(--color-text-primary)' }}>Pharma</span>
          <span style={{ color: isLight ? '#E8F5F0' : 'var(--color-primary)' }}>City</span>
          <span
            style={{
              marginLeft: '4px',
              padding: '2px 5px',
              borderRadius: 'var(--radius-xs)',
              background: isLight ? 'rgba(255, 255, 255, 0.25)' : 'var(--color-primary)',
              color: 'var(--color-white)',
              fontSize: size === 'lg' ? '0.65em' : '0.6em',
              fontWeight: 'var(--font-weight-bold)',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
            }}
          >
            TN
          </span>
        </div>

        {showTagline && (
          <span
            style={{
              fontSize: '0.725rem',
              color: isLight ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-text-secondary)',
              marginTop: '4px',
              fontWeight: 'var(--font-weight-medium)',
              letterSpacing: '0.01em',
            }}
          >
            Santé & Médicaments en Tunisie
          </span>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
}
