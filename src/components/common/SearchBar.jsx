import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import Button from './Button';

/**
 * Composant SearchBar Réutilisable PharmaCityTN
 * @param {Object} props
 * @param {string} [props.value]
 * @param {Function} [props.onChange]
 * @param {Function} [props.onSearch]
 * @param {string} [props.placeholder='Rechercher un médicament (ex: Doliprane, Paracétamol)...']
 * @param {'md' | 'lg'} [props.size='lg']
 * @param {boolean} [props.showButton=true]
 * @param {string} [props.buttonText='Rechercher']
 * @param {Array<string>} [props.suggestions]
 * @param {Function} [props.onSelectSuggestion]
 */
export default function SearchBar({
  value: controlledValue,
  onChange,
  onSearch,
  placeholder = 'Rechercher un médicament (ex: Doliprane, Paracétamol, Amoxicilline)...',
  size = 'lg',
  showButton = true,
  buttonText = 'Rechercher',
  suggestions = [],
  onSelectSuggestion,
  className = '',
  style = {},
}) {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  const isLg = size === 'lg';

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '10px',
        ...style,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--color-white)',
          borderRadius: isLg ? 'var(--radius-lg)' : 'var(--radius-md)',
          border: `1.5px solid ${isFocused ? 'var(--color-primary)' : 'var(--color-border)'}`,
          boxShadow: isFocused ? 'var(--shadow-focus)' : 'var(--shadow-sm)',
          padding: isLg ? '6px 8px 6px 16px' : '4px 6px 4px 12px',
          transition: 'all var(--transition-fast)',
        }}
      >
        {/* Search Icon */}
        <Search
          size={isLg ? 22 : 18}
          color={isFocused ? 'var(--color-primary)' : 'var(--color-text-muted)'}
          style={{ flexShrink: 0, marginRight: '10px', transition: 'color var(--transition-fast)' }}
        />

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: isLg ? 'var(--font-size-base)' : 'var(--font-size-sm)',
            color: 'var(--color-text-primary)',
            background: 'transparent',
            paddingRight: '8px',
          }}
        />

        {/* Bouton Effacer */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: 'var(--radius-full)',
              color: 'var(--color-text-muted)',
              marginRight: showButton ? '6px' : '0',
              transition: 'background var(--transition-fast), color var(--transition-fast)',
            }}
            aria-label="Effacer la recherche"
          >
            <X size={16} />
          </button>
        )}

        {/* Bouton de Soumission */}
        {showButton && (
          <Button
            type="submit"
            variant="primary"
            size={isLg ? 'md' : 'sm'}
            icon={Search}
          >
            {buttonText}
          </Button>
        )}
      </form>

      {/* Suggestions Rapides / Tags de Recherche Populaire */}
      {suggestions.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <span style={{ fontWeight: 'var(--font-weight-medium)' }}>Suggestions fréquentes :</span>
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                if (!isControlled) setInternalValue(item);
                if (onSelectSuggestion) onSelectSuggestion(item);
                else if (onSearch) onSearch(item);
              }}
              style={{
                background: 'var(--color-white)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '3px 10px',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.background = 'var(--color-primary-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.background = 'var(--color-white)';
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
