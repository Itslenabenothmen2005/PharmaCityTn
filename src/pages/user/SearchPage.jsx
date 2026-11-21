import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Card from '../../components/common/Card';
import SearchBar from '../../components/common/SearchBar';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import { useToast } from '../../hooks/useToast';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const toast = useToast();

  const handleSearch = (term) => {
    toast.info(`Recherche de "${term || 'médicaments'}"`, 'Recherche');
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)' }}>Recherche de Médicaments</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          Consultez la disponibilité des médicaments et trouvez l'officine la plus proche en Tunisie.
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
          placeholder="Ex : Doliprane, Panadol, Amoxicilline..."
          suggestions={['Doliprane 1000', 'Panadol Extra', 'Augmentin', 'Aspegic 500']}
          onSelectSuggestion={(s) => {
            setQuery(s);
            handleSearch(s);
          }}
        />
      </div>

      <EmptyState
        icon={Search}
        title="Lancez une recherche de médicament"
        description="Saisissez le nom commercial, la DCI ou le laboratoire pour consulter la disponibilité en temps réel dans les pharmacies tunisiennes."
      />
    </div>
  );
}
