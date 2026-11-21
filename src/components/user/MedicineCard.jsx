import React from 'react';
import { Pill, Heart, Building2, Eye, ShieldCheck, AlertCircle } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useUserStore } from '../../hooks/useUserStore';
import { useToast } from '../../hooks/useToast';

/**
 * Carte de présentation standardisée d'un médicament avec bouton Voir les pharmacies et Favoris
 */
export default function MedicineCard({ medicine, onViewPharmacies }) {
  const { isFavorite, toggleFavorite, addRecentView } = useUserStore();
  const toast = useToast();

  const favorite = isFavorite(medicine.id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(medicine);
    if (!favorite) {
      toast.success(`${medicine.name} ajouté aux favoris`, 'Favoris');
    } else {
      toast.info(`${medicine.name} retiré des favoris`, 'Favoris');
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
      label: 'Disponible',
    },
    'low-stock': {
      variant: 'warning',
      label: 'Stock faible',
    },
    'out-of-stock': {
      variant: 'danger',
      label: 'Rupture',
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
          aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
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
          title={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
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
              {medicine.pharmaciesCount} {medicine.pharmaciesCount > 1 ? 'pharmacies' : 'pharmacie'}
            </span>
          </div>

          <Button variant="primary" size="sm" icon={Eye} onClick={handleView}>
            Voir les pharmacies
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
              DCI : <strong>{medicine.dci}</strong>
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
            Forme : <strong>{medicine.form}</strong>
          </div>
          <div>
            Classe : <span>{medicine.category}</span>
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
            {medicine.prescriptionRequired ? 'Sur ordonnance' : 'Sans ordonnance'}
          </span>
        </div>
      </div>
    </Card>
  );
}
