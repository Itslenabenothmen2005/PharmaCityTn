import React, { useState, useId } from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Composant Input Réutilisable PharmaCityTN
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} [props.helperText]
 * @param {string} [props.error]
 * @param {React.ReactNode} [props.startIcon]
 * @param {React.ReactNode} [props.endIcon]
 * @param {boolean} [props.fullWidth=true]
 * @param {boolean} [props.required=false]
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.id]
 */
export default function Input({
  label,
  helperText,
  error,
  startIcon,
  endIcon,
  fullWidth = true,
  required = false,
  disabled = false,
  id: propId,
  className = '',
  style = {},
  ...rest
}) {
  const autoId = useId();
  const id = propId || autoId;
  const [isFocused, setIsFocused] = useState(false);

  // Bordure & ombre dynamique selon l'état focus/erreur
  let borderColor = 'var(--color-border)';
  let boxShadow = 'none';

  if (error) {
    borderColor = 'var(--color-danger)';
    if (isFocused) {
      boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
    }
  } else if (isFocused) {
    borderColor = 'var(--color-primary)';
    boxShadow = 'var(--shadow-focus)';
  }

  return (
    <div
      style={{
        display: fullWidth ? 'flex' : 'inline-flex',
        flexDirection: 'column',
        gap: '6px',
        width: fullWidth ? '100%' : 'auto',
      }}
      className={className}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: error ? 'var(--color-danger-dark)' : 'var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {label}
          {required && (
            <span style={{ color: 'var(--color-danger)', fontWeight: 'var(--font-weight-bold)' }}>
              *
            </span>
          )}
        </label>
      )}

      {/* Conteneur d'input */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Start Icon */}
        {startIcon && (
          <div
            style={{
              position: 'absolute',
              left: '14px',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              color: error
                ? 'var(--color-danger)'
                : isFocused
                ? 'var(--color-primary)'
                : 'var(--color-text-muted)',
              transition: 'color var(--transition-fast)',
            }}
          >
            {startIcon}
          </div>
        )}

        {/* Balise Input */}
        <input
          id={id}
          disabled={disabled}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            height: '42px',
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft: startIcon ? '42px' : '14px',
            paddingRight: endIcon || error ? '42px' : '14px',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-primary)',
            backgroundColor: disabled ? 'var(--color-bg-subtle)' : 'var(--color-white)',
            border: `1px solid ${borderColor}`,
            borderRadius: 'var(--radius-md)',
            boxShadow: boxShadow,
            outline: 'none',
            transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
            cursor: disabled ? 'not-allowed' : 'text',
            ...style,
          }}
          {...rest}
        />

        {/* End Icon ou indicateur d'erreur */}
        {(endIcon || error) && (
          <div
            style={{
              position: 'absolute',
              right: '14px',
              display: 'flex',
              alignItems: 'center',
              color: error ? 'var(--color-danger)' : 'var(--color-text-muted)',
            }}
          >
            {error ? <AlertCircle size={18} /> : endIcon}
          </div>
        )}
      </div>

      {/* Helper text ou message d'erreur */}
      {(error || helperText) && (
        <span
          style={{
            fontSize: 'var(--font-size-xs)',
            color: error ? 'var(--color-danger)' : 'var(--color-text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '2px',
          }}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
}
