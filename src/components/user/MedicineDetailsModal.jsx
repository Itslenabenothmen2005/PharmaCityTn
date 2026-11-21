import React from 'react';
import {
  Pill,
  Heart,
  PhoneCall,
  Clock,
  MapPin,
  AlertCircle,
  ShieldCheck,
  Building2,
  FileText,
  BadgeAlert,
  Info,
} from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useUserStore } from '../../hooks/useUserStore';
import { useToast } from '../../hooks/useToast';

/**
 * Modale complète de détails d'un médicament et des officines déclarantes
 */
export default function MedicineDetailsModal({ isOpen, onClose, medicine }) {
  const { isFavorite, toggleFavorite } = useUserStore();
  const toast = useToast();

  if (!medicine) return null;

  const favorite = isFavorite(medicine.id);

  const handleToggleFavorite = () => {
    toggleFavorite(medicine);
    if (!favorite) {
      toast.success(`${medicine.name} ajouté à vos favoris`, 'Favoris');
    } else {
      toast.info(`${medicine.name} retiré de vos favoris`, 'Favoris');
    }
  };

  const handleCallPharmacy = (pharma) => {
    toast.info(`Appel vers ${pharma.name} (${pharma.phone})`, 'Contact Pharmacie');
    window.location.href = `tel:${pharma.phone.replace(/\s+/g, '')}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
            }}
          >
            <Pill size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
              {medicine.name} <span style={{ color: 'var(--color-primary)' }}>{medicine.dosage}</span>
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontWeight: 'normal' }}>
              DCI : {medicine.dci} • {medicine.form}
            </div>
          </div>
        </div>
      }
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Fermer
          </Button>
          <Button
            variant={favorite ? 'secondary' : 'outline'}
            icon={Heart}
            onClick={handleToggleFavorite}
            style={{
              color: favorite ? '#DC2626' : undefined,
              borderColor: favorite ? '#FCA5A5' : undefined,
            }}
          >
            {favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* BANDEAU LÉGAL OBLIGATOIRE */}
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
          <Info size={20} color="var(--color-warning-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-warning-text)', lineHeight: 1.45 }}>
            <strong>Avertissement déontologique :</strong> Les disponibilités affichées sont déclaratives
            par les officines partenaires et ne constituent pas une garantie absolue de délivrance.
            Cette fiche technique n'est pas une recommandation thérapeutique. Ne modifiez jamais votre
            traitement sans l'avis d'un médecin ou d'un pharmacien.
          </div>
        </div>

        {/* FICHE SYNTHÉTIQUE MÉDICAMENT */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            padding: '16px',
            backgroundColor: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Principe Actif (DCI)
            </span>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
              {medicine.dci}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Dosage & Forme
            </span>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
              {medicine.dosage} • {medicine.form}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Tarif conventionné
            </span>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
              {medicine.price}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Condition de délivrance
            </span>
            <div>
              {medicine.prescriptionRequired ? (
                <Badge variant="warning" size="sm">
                  Ordonnance requise
                </Badge>
              ) : (
                <Badge variant="neutral" size="sm">
                  Sans ordonnance
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* LISTE DES PHARMACIES DÉCLARANT LE POSSÉDER */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            <h4
              style={{
                fontSize: '0.9375rem',
                fontWeight: 'bold',
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              Pharmacies déclarant posséder ce médicament ({medicine.pharmaciesList?.length || 0})
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Données déclaratives transmises par les officines
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {medicine.pharmaciesList && medicine.pharmaciesList.length > 0 ? (
              medicine.pharmaciesList.map((pharma) => (
                <div
                  key={pharma.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '0.9375rem',
                          fontWeight: 'bold',
                          color: 'var(--color-text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <Building2 size={16} color="var(--color-primary)" />
                        {pharma.name}
                        {pharma.isDuty && (
                          <Badge variant="info" size="sm">
                            Garde
                          </Badge>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: '0.8125rem',
                          color: 'var(--color-text-secondary)',
                          marginTop: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <MapPin size={13} color="var(--color-primary)" />
                        {pharma.address}, {pharma.city}
                      </div>
                    </div>

                    <Badge
                      variant={
                        pharma.status === 'available'
                          ? 'success'
                          : pharma.status === 'low-stock'
                          ? 'warning'
                          : 'danger'
                      }
                      dot
                    >
                      {pharma.statusText}
                    </Badge>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '8px',
                      borderTop: '1px solid var(--color-border-subtle)',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={13} />
                      <span>Mis à jour : {pharma.lastUpdated}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '600', color: 'var(--color-text-secondary)' }}>
                        {pharma.phone}
                      </span>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={PhoneCall}
                        onClick={() => handleCallPharmacy(pharma)}
                      >
                        Appeler
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  color: 'var(--color-text-secondary)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                }}
              >
                Aucune pharmacie partenaire ne déclare actuellement ce médicament en stock dans votre secteur.
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
