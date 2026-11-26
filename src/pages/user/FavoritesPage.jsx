import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Info } from 'lucide-react';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import MedicineCard from '../../components/user/MedicineCard';
import MedicineDetailsModal from '../../components/user/MedicineDetailsModal';
import { useUserStore } from '../../hooks/useUserStore';
import { useLanguage } from '../../context/LanguageContext';

export default function FavoritesPage() {
  const { language, isRtl, t } = useLanguage();
  const { favoriteMedicines } = useUserStore();
  const [filterText, setFilterText] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredFavorites = favoriteMedicines.filter((m) => {
    if (!filterText.trim()) return true;
    const clean = filterText.toLowerCase();
    return (
      m.name.toLowerCase().includes(clean) ||
      m.dci.toLowerCase().includes(clean) ||
      m.category.toLowerCase().includes(clean)
    );
  });

  const handleOpenPharmacies = (med) => {
    setSelectedMedicine(med);
    setIsModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      {/* En-tête */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', margin: 0 }}>{t('favorites.title')}</h1>
            <Badge variant="primary" size="sm">
              {favoriteMedicines.length} {t('favorites.badge')}
            </Badge>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            {t('favorites.subtitle')}
          </p>
        </div>

        <Link to="/user/search" style={{ textDecoration: 'none' }}>
          <Button variant="secondary" icon={Search}>
            {t('favorites.addBtn')}
          </Button>
        </Link>
      </div>

      {/* Avertissement Déontologique */}
      <div
        style={{
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-primary-light)',
          border: '1px solid var(--color-success-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-primary-dark)',
        }}
      >
        <Info size={16} color="var(--color-primary)" style={{ flexShrink: 0 }} />
        <span>
          <strong>{language === 'ar' ? 'تذكير :' : 'Rappel :'}</strong> {t('legal.disclaimer')}
        </span>
      </div>

      {/* Barre de filtre local parmi les favoris */}
      {favoriteMedicines.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            padding: '4px 12px',
            maxWidth: '380px',
          }}
        >
          <Search size={16} color="var(--color-text-muted)" style={{ marginRight: '8px', marginLeft: '8px' }} />
          <input
            type="text"
            placeholder={t('favorites.filterPlaceholder')}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              fontSize: 'var(--font-size-xs)',
              width: '100%',
              color: 'var(--color-text-primary)',
            }}
          />
        </div>
      )}

      {/* Grille des Médicaments Favoris */}
      {filteredFavorites.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {filteredFavorites.map((med) => (
            <MedicineCard key={med.id} medicine={med} onViewPharmacies={handleOpenPharmacies} />
          ))}
        </div>
      ) : favoriteMedicines.length === 0 ? (
        <EmptyState
          icon={Heart}
          title={t('favorites.emptyTitle')}
          description={t('favorites.emptyDesc')}
          action={
            <Link to="/user/search" style={{ textDecoration: 'none' }}>
              <Button variant="primary" icon={Search}>
                {t('favorites.addBtn')}
              </Button>
            </Link>
          }
        />
      ) : (
        <EmptyState
          icon={Search}
          title={language === 'ar' ? 'لا يوجد دواء يطابق التصفية' : "Aucun favori ne correspond à votre filtre"}
          description={language === 'ar' ? `لا توجد أدوية مسجلة تحتوي على « ${filterText} ».` : `Aucun médicament enregistré ne contient « ${filterText} ».`}
          action={
            <Button variant="secondary" onClick={() => setFilterText('')}>
              {language === 'ar' ? 'مسح التصفية' : 'Effacer le filtre'}
            </Button>
          }
        />
      )}

      {/* MODALE DE DÉTAILS AVEC PHARMACIES DÉCLARANTES */}
      <MedicineDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        medicine={selectedMedicine}
      />
    </div>
  );
}
