import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Composant Loading Réutilisable PharmaCityTN
 * @param {Object} props
 * @param {'spinner' | 'dots' | 'skeleton'} [props.type='spinner']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string} [props.text]
 * @param {boolean} [props.fullPage=false]
 * @param {string} [props.height] - Pour le type skeleton
 * @param {string} [props.width] - Pour le type skeleton
 */
export default function Loading({
  type = 'spinner',
  size = 'md',
  text,
  fullPage = false,
  height,
  width,
  className = '',
  style = {},
}) {
  const spinnerSizes = {
    sm: 18,
    md: 28,
    lg: 42,
  };

  if (type === 'skeleton') {
    return (
      <div
        className={`animate-pulse ${className}`}
        style={{
          width: width || '100%',
          height: height || '20px',
          backgroundColor: 'var(--color-bg-muted)',
          borderRadius: 'var(--radius-md)',
          ...style,
        }}
      />
    );
  }

  const content = (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        ...style,
      }}
    >
      <Loader2
        size={spinnerSizes[size] || spinnerSizes.md}
        color="var(--color-primary)"
        className="animate-spin"
      />
      {text && (
        <span
          style={{
            fontSize: size === 'sm' ? 'var(--font-size-xs)' : 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          {text}
        </span>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(247, 249, 248, 0.85)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 'var(--z-modal)',
        }}
      >
        {content}
      </div>
    );
  }

  return content;
}
