import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  X,
  RotateCcw,
  Building2,
  Info,
  Pill,
  Sparkles,
  MapPin,
} from 'lucide-react';
import SearchBar from '../../components/common/SearchBar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import MedicineCard from '../../components/user/MedicineCard';
import MedicineDetailsModal from '../../components/user/MedicineDetailsModal';
import { mockMedicines } from '../../data/medicines';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [filterDosage, setFilterDosage] = useState('all');
  const [filterForm, setFilterForm] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [filterCity, setFilterCity] = useState('all');

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Synchronisation avec les paramètres URL
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null && q !== query) {
      setQuery(q);
    }
  }, [searchParams]);

  // Extraction dynamique des filtres disponibles dans les données
  const dosagesList = useMemo(() => {
    const set = new Set(mockMedicines.map((m) => m.dosage));
    return ['all', ...Array.from(set)];
  }, []);

  const formsList = useMemo(() => {
    const set = new Set(mockMedicines.map((m) => m.form));
    return ['all', ...Array.from(set)];
  }, []);

  const citiesList = ['all', 'Tunis', 'Ariana', 'Sousse', 'Sfax', 'Nabeul'];

  // Moteur de recherche et de filtrage multi-critères
  const filteredMedicines = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();

    return mockMedicines.filter((med) => {
      // 1. Recherche texte (Nom commercial, DCI, Dosage, Forme)
      if (cleanQuery) {
        const matchesName = med.name.toLowerCase().includes(cleanQuery);
        const matchesDci = med.dci.toLowerCase().includes(cleanQuery);
        const matchesDosage = med.dosage.toLowerCase().includes(cleanQuery);
        const matchesForm = med.form.toLowerCase().includes(cleanQuery);
        const matchesCategory = med.category.toLowerCase().includes(cleanQuery);

        if (!matchesName && !matchesDci && !matchesDosage && !matchesForm && !matchesCategory) {
          return false;
        }
      }

      // 2. Filtre Dosage
      if (filterDosage !== 'all' && med.dosage !== filterDosage) {
        return false;
      }

      // 3. Filtre Forme pharmaceutique
      if (filterForm !== 'all' && med.form !== filterForm) {
        return false;
      }

      // 4. Filtre Disponibilité
      if (filterAvailability !== 'all' && med.overallAvailability !== filterAvailability) {
        return false;
      }

      // 5. Filtre Ville (vérifie si au moins une pharmacie déclarée se situe dans cette ville)
      if (filterCity !== 'all') {
        const hasPharmacyInCity = med.pharmaciesList?.some(
          (p) => p.city.toLowerCase() === filterCity.toLowerCase()
        );
        if (!hasPharmacyInCity) return false;
      }

      return true;
    });
  }, [query, filterDosage, filterForm, filterAvailability, filterCity]);

  const hasActiveFilters =
    Boolean(query) ||
    filterDosage !== 'all' ||
    filterForm !== 'all' ||
    filterAvailability !== 'all' ||
    filterCity !== 'all';

  const handleResetFilters = () => {
    setQuery('');
    setFilterDosage('all');
    setFilterForm('all');
    setFilterAvailability('all');
    setFilterCity('all');
    setSearchParams({});
  };

  const handleSearchSubmit = (term) => {
    setQuery(term);
    if (term) {
      setSearchParams({ q: term });
    } else {
      setSearchParams({});
    }
  };

  const handleOpenPharmacies = (med) => {
    setSelectedMedicine(med);
    setIsModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      {/* ======================================================================
          EN-TÊTE DE LA PAGE DE RECHERCHE
          ====================================================================== */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <h1 style={{ fontSize: 'var(--font-size-2xl)', margin: 0 }}>
            Recherche de Médicaments en Tunisie
          </h1>
          <Badge variant="primary" size="sm">
            Temps Réel
          </Badge>
        </div>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
          Recherchez par nom commercial, principe actif (DCI), dosage ou forme galénique dans le réseau d'officines.
        </p>
      </div>

      {/* AVERTISSEMENT LÉGAL ET DÉONTOLOGIQUE */}
      <div
        style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-warning-light)',
          border: '1px solid var(--color-warning-border)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <Info size={18} color="var(--color-warning-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.8125rem', color: 'var(--color-warning-text)', lineHeight: 1.45 }}>
          <strong>Important :</strong> Les disponibilités affichées sont déclaratives de la part des officines
          et ne constituent pas une garantie de délivrance. Les médicaments présentés ne sont en aucun cas des
          recommandations médicales. Consultez toujours un professionnel de santé agréé.
        </div>
      </div>

      {/* ======================================================================
          BARRE DE RECHERCHE MULTI-CRITÈRES
          ====================================================================== */}
      <div>
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearchSubmit}
          size="lg"
          placeholder="Rechercher par nom (Doliprane), DCI (Paracétamol), dosage ou forme..."
          suggestions={['Doliprane 1000', 'Amoxicilline', 'Augmentin', 'Panadol', 'Maxilase', 'Inexium']}
          onSelectSuggestion={(s) => handleSearchSubmit(s)}
        />
      </div>

      {/* ======================================================================
          PANNEAU DE FILTRES AVANCÉS
          ====================================================================== */}
      <div
        style={{
          backgroundColor: 'var(--color-bg-subtle)',
          padding: '16px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-size-xs)', fontWeight: 'bold' }}>
            <Filter size={15} color="var(--color-primary)" />
            <span>Filtrer les résultats de recherche</span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-danger)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              <RotateCcw size={13} />
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* Grille des sélecteurs de filtres */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
          }}
        >
          {/* Filtre Dosage */}
          <div>
            <label style={filterLabelStyle}>Dosage</label>
            <select
              value={filterDosage}
              onChange={(e) => setFilterDosage(e.target.value)}
              style={selectStyle}
            >
              <option value="all">Tous les dosages</option>
              {dosagesList
                .filter((d) => d !== 'all')
                .map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </select>
          </div>

          {/* Filtre Forme pharmaceutique */}
          <div>
            <label style={filterLabelStyle}>Forme pharmaceutique</label>
            <select
              value={filterForm}
              onChange={(e) => setFilterForm(e.target.value)}
              style={selectStyle}
            >
              <option value="all">Toutes les formes</option>
              {formsList
                .filter((f) => f !== 'all')
                .map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
            </select>
          </div>

          {/* Filtre Disponibilité */}
          <div>
            <label style={filterLabelStyle}>Disponibilité</label>
            <select
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
              style={selectStyle}
            >
              <option value="all">Toutes disponibilités</option>
              <option value="available">🟢 Disponible en stock</option>
              <option value="low-stock">🟠 Stock faible</option>
              <option value="out-of-stock">🔴 Rupture signalée</option>
            </select>
          </div>

          {/* Filtre Ville */}
          <div>
            <label style={filterLabelStyle}>Ville / Gouvernorat</label>
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              style={selectStyle}
            >
              <option value="all">Toutes les villes</option>
              {citiesList
                .filter((c) => c !== 'all')
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* ======================================================================
          BARRE DE STATUT DES RÉSULTATS
          ====================================================================== */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: '8px',
        }}
      >
        <div>
          Résultats : <strong>{filteredMedicines.length}</strong> médicament(s) trouvé(s)
          {query && (
            <span>
              {' '}
              pour « <strong>{query}</strong> »
            </span>
          )}
        </div>

        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
          Données déclaratives vérifiées
        </div>
      </div>

      {/* ======================================================================
          3. RÉSULTATS : GRILLE DE CARTES MÉDICAMENTS
          ====================================================================== */}
      {filteredMedicines.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {filteredMedicines.map((med) => (
            <MedicineCard
              key={med.id}
              medicine={med}
              onViewPharmacies={handleOpenPharmacies}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="Aucun médicament ne correspond à vos critères"
          description="Vérifiez l'orthographe du nom ou du principe actif (DCI), ou réinitialisez les filtres de dosage, forme ou ville."
          action={
            <Button variant="secondary" icon={RotateCcw} onClick={handleResetFilters}>
              Réinitialiser tous les filtres
            </Button>
          }
        />
      )}

      {/* MODALE DE DÉTAILS AVEC OFFICINES DÉCLARANTES */}
      <MedicineDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        medicine={selectedMedicine}
      />
    </div>
  );
}

const filterLabelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: '600',
  color: 'var(--color-text-secondary)',
  marginBottom: '4px',
};

const selectStyle = {
  width: '100%',
  height: '38px',
  padding: '6px 10px',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-bg-surface)',
  color: 'var(--color-text-primary)',
  fontSize: 'var(--font-size-xs)',
  outline: 'none',
  cursor: 'pointer',
};
