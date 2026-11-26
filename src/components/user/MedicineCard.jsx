import React from 'react';
import { Heart, Building2, Eye } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useUserStore } from '../../hooks/useUserStore';
import { useToast } from '../../hooks/useToast';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Carte de présentation standardisée d'un médicament avec bouton Voir les pharmacies et Favoris
 */
export default function MedicineCard({ medicine, onViewPharmacies }) {
  const { isFavorite, toggleFavorite, addRecentView } = useUserStore();
  const toast = useToast();
  const { language, isRtl, t } = useLanguage();

  const favorite = isFavorite(medicine.id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(medicine);
    if (!favorite) {
      toast.success(
        language === 'ar' ? `تمت إضافة ${medicine.name} إلى المفضلة` : `${medicine.name} ajouté aux favoris`,
        language === 'ar' ? 'المفضلة' : 'Favoris'
      );
    } else {
      toast.info(
        language === 'ar' ? `تم حذف ${medicine.name} من المفضلة` : `${medicine.name} retiré des favoris`,
        language === 'ar' ? 'المفضلة' : 'Favoris'
      );
    }
  };

  const handleView = () => {
    addRecentView(medicine);
    if (onViewPharmacies) {
      onViewPharmacies(medicine);
    }
  };

  const availabilityConfig = {
    available: {
      variant: 'success',
      label: t('status.available'),
    },
    'low-stock': {
      variant: 'warning',
      label: t('status.lowStock'),
    },
    'out-of-stock': {
      variant: 'danger',
      label: t('status.outOfStock'),
    },
  };

  const status = availabilityConfig[medicine.overallAvailability] || availabilityConfig.available;

  return (
    <Card
      hoverable
      padding="md"
      headerAction={
        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-label={favorite ? t('medicine.removeFav') : t('medicine.addFav')}
          style={{
            padding: '6px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: favorite ? '#FEE2E2' : 'var(--color-bg-subtle)',
            color: favorite ? '#EF4444' : 'var(--color-text-muted)',
            cursor: 'pointer',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all var(--transition-fast)',
          }}
          title={favorite ? t('medicine.removeFav') : t('medicine.addFav')}
        >
          <Heart size={18} fill={favorite ? '#EF4444' : 'transparent'} strokeWidth={2.2} />
        </button>
      }
      footer={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-xs)' }}>
            <Building2 size={15} color="var(--color-primary)" />
            <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
              {medicine.pharmaciesCount}{' '}
              {medicine.pharmaciesCount > 1 ? t('medicine.pharmaciesCount') : t('medicine.pharmacyCount')}
            </span>
          </div>

          <Button variant="primary" size="sm" icon={Eye} onClick={handleView}>
            {t('medicine.viewPharmacies')}
          </Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* En-tête Médicament */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h3
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                {medicine.name}
              </h3>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: 'var(--color-primary-dark)',
                  backgroundColor: 'var(--color-primary-light)',
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-xs)',
                }}
              >
                {medicine.dosage}
              </span>
            </div>
            <p
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-secondary)',
                margin: '2px 0 0',
              }}
            >
              {t('medicine.dci')} <strong>{medicine.dci}</strong>
            </p>
          </div>

          <Badge variant={status.variant} size="sm" dot>
            {status.label}
          </Badge>
        </div>

        {/* Détails forme & catégorie */}
        <div
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
          }}
        >
          <div>
            {t('medicine.form')} <strong>{medicine.form}</strong>
          </div>
          <div>
            {t('medicine.class')} <span>{medicine.category}</span>
          </div>
        </div>

        {/* Prix et ordonnance */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '6px',
            borderTop: '1px solid var(--color-border-subtle)',
            fontSize: 'var(--font-size-xs)',
          }}
        >
          <span style={{ fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
            {medicine.price}
          </span>
          <span style={{ color: 'var(--color-text-muted)' }}>
            {medicine.prescriptionRequired ? t('medicine.prescription') : t('medicine.noPrescription')}
          </span>
        </div>
      </div>
    </Card>
  );
}
