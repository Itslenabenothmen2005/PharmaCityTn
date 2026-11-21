import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Card from '../../components/common/Card';
import SearchBar from '../../components/common/SearchBar';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import { useToast } from '../../hooks/useToast';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const toast = useToast();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      toast.info(`Résultats pour : "${q}"`, 'Recherche');
    }
  }, [searchParams, toast]);

  const handleSearch = (term) => {
    setSearchParams(term ? { q: term } : {});
    toast.info(`Recherche actualisée pour : "${term || 'Tous les médicaments'}"`, 'Recherche');
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
        title={query ? `Résultats pour "${query}"` : 'Lancez une recherche de médicament'}
        description={
          query
            ? `Recherche en cours dans les officines partenaires de Tunisie. La liste des pharmacies et stocks s'affichera ici lors de la prochaine étape.`
            : 'Saisissez le nom commercial, la DCI ou le laboratoire pour consulter la disponibilité en temps réel dans les pharmacies tunisiennes.'
        }
      />
    </div>
  );
}
