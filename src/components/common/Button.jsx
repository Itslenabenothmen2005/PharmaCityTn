import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Composant Bouton Réutilisable PharmaCityTN
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'warning'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {React.ReactNode} [props.icon]
 * @param {'left' | 'right'} [props.iconPosition='left']
 * @param {boolean} [props.loading=false]
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.fullWidth=false]
 * @param {string} [props.type='button']
 * @param {Function} [props.onClick]
 * @param {React.ReactNode} props.children
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  children,
  className = '',
  style = {},
  ...rest
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const isDisabled = disabled || loading;

  // Tailles
  const sizeStyles = {
    sm: {
      padding: '6px 12px',
      fontSize: 'var(--font-size-xs)',
      height: '32px',
      gap: '6px',
      borderRadius: 'var(--radius-sm)',
    },
    md: {
      padding: '9px 16px',
      fontSize: 'var(--font-size-sm)',
      height: '40px',
      gap: '8px',
      borderRadius: 'var(--radius-md)',
    },
    lg: {
      padding: '12px 24px',
      fontSize: 'var(--font-size-base)',
      height: '48px',
      gap: '10px',
      borderRadius: 'var(--radius-md)',
    },
  };

  // Variantes
  const variantStyles = {
    primary: {
      background: isHovered && !isDisabled ? 'var(--color-primary-dark)' : 'var(--color-primary)',
      color: 'var(--color-white)',
      border: '1px solid transparent',
      boxShadow: isHovered && !isDisabled ? 'var(--shadow-md)' : 'var(--shadow-sm)',
    },
    secondary: {
      background: isHovered && !isDisabled ? '#d7ede5' : 'var(--color-primary-light)',
      color: 'var(--color-primary-dark)',
      border: '1px solid transparent',
      boxShadow: 'none',
    },
    outline: {
      background: isHovered && !isDisabled ? 'var(--color-primary-light)' : 'transparent',
      color: isHovered && !isDisabled ? 'var(--color-primary-dark)' : 'var(--color-primary)',
      border: '1px solid var(--color-primary)',
      boxShadow: 'none',
    },
    ghost: {
      background: isHovered && !isDisabled ? 'var(--color-bg-subtle)' : 'transparent',
      color: isHovered && !isDisabled ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
      border: '1px solid transparent',
      boxShadow: 'none',
    },
    danger: {
      background: isHovered && !isDisabled ? 'var(--color-danger-dark)' : 'var(--color-danger)',
      color: 'var(--color-white)',
      border: '1px solid transparent',
      boxShadow: isHovered && !isDisabled ? 'var(--shadow-md)' : 'var(--shadow-sm)',
    },
    warning: {
      background: isHovered && !isDisabled ? 'var(--color-warning-dark)' : 'var(--color-warning)',
      color: 'var(--color-white)',
      border: '1px solid transparent',
      boxShadow: isHovered && !isDisabled ? 'var(--shadow-md)' : 'var(--shadow-sm)',
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;
  const currentVariant = variantStyles[variant] || variantStyles.primary;

  const baseStyle = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'var(--font-weight-semibold)',
    lineHeight: 1,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.6 : 1,
    transform: isActive && !isDisabled ? 'translateY(1px) scale(0.99)' : 'translateY(0)',
    transition: 'all var(--transition-fast)',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    ...currentSize,
    ...currentVariant,
    ...style,
  };

  const iconElement = loading ? (
    <Loader2 size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="animate-spin" />
  ) : Icon ? (
    <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
  ) : null;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      className={className}
      style={baseStyle}
      {...rest}
    >
      {iconPosition === 'left' && iconElement}
      <span>{children}</span>
      {iconPosition === 'right' && iconElement}
    </button>
  );
}
