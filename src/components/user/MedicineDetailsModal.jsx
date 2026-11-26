import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Pill,
  Heart,
  PhoneCall,
  Clock,
  MapPin,
  Building2,
  FileText,
  Info,
} from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useUserStore } from '../../hooks/useUserStore';
import { useToast } from '../../hooks/useToast';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Modale complète de détails d'un médicament et des officines déclarantes
 */
export default function MedicineDetailsModal({ isOpen, onClose, medicine }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useUserStore();
  const toast = useToast();
  const { language, isRtl, t } = useLanguage();

  if (!medicine) return null;

  const favorite = isFavorite(medicine.id);

  const handleToggleFavorite = () => {
    toggleFavorite(medicine);
    if (!favorite) {
      toast.success(
        language === 'ar' ? `تمت إضافة ${medicine.name} إلى المفضلة` : `${medicine.name} ajouté à vos favoris`,
        language === 'ar' ? 'المفضلة' : 'Favoris'
      );
    } else {
      toast.info(
        language === 'ar' ? `تم حذف ${medicine.name} من المفضلة` : `${medicine.name} retiré de vos favoris`,
        language === 'ar' ? 'المفضلة' : 'Favoris'
      );
    }
  };

  const handleCallPharmacy = (pharma) => {
    toast.info(
      language === 'ar' ? `جاري الاتصال بـ ${pharma.name}` : `Appel vers ${pharma.name} (${pharma.phone})`,
      language === 'ar' ? 'الاتصال بالصيدلية' : 'Contact Pharmacie'
    );
    window.location.href = `tel:${pharma.phone.replace(/\s+/g, '')}`;
  };

  const handleStartRequest = (pharmacyId) => {
    onClose();
    const query = pharmacyId
      ? `?medId=${medicine.id}&pharmacyId=${pharmacyId}`
      : `?medId=${medicine.id}`;
    navigate(`/user/request${query}`);
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
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
          <Button variant="ghost" onClick={onClose}>
            {t('medicine.close')}
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
            {favorite ? t('medicine.removeFav') : t('medicine.addFav')}
          </Button>
          <Button
            variant="primary"
            icon={FileText}
            onClick={() => handleStartRequest()}
          >
            {t('medicine.makeRequest')}
          </Button>
        </div>
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
            <strong>{language === 'ar' ? 'تنبيه صحي وقانوني :' : 'Avertissement déontologique :'}</strong> {t('legal.disclaimer')}
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
              {language === 'ar' ? 'المادة الفعالة (DCI)' : 'Principe Actif (DCI)'}
            </span>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
              {medicine.dci}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              {language === 'ar' ? 'الجرعة والشكل' : 'Dosage & Forme'}
            </span>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
              {medicine.dosage} • {medicine.form}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              {language === 'ar' ? 'السعر التعاقدي' : 'Tarif conventionné'}
            </span>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
              {medicine.price}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              {language === 'ar' ? 'شروط الصرف' : 'Condition de délivrance'}
            </span>
            <div>
              {medicine.prescriptionRequired ? (
                <Badge variant="warning" size="sm">
                  {t('medicine.prescription')}
                </Badge>
              ) : (
                <Badge variant="neutral" size="sm">
                  {t('medicine.noPrescription')}
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
              {language === 'ar'
                ? `الصيدليات المصرحة بوجود الدواء (${medicine.pharmaciesList?.length || 0})`
                : `Pharmacies déclarant posséder ce médicament (${medicine.pharmaciesList?.length || 0})`}
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {language === 'ar' ? 'بيانات تصريحية من الصيدليات' : 'Données déclaratives transmises par les officines'}
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
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={13} />
                      <span>{language === 'ar' ? `آخر تحديث : ${pharma.lastUpdated}` : `Mis à jour : ${pharma.lastUpdated}`}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={PhoneCall}
                        onClick={() => handleCallPharmacy(pharma)}
                      >
                        {language === 'ar' ? 'اتصال' : 'Appeler'} ({pharma.phone})
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={FileText}
                        onClick={() => handleStartRequest(pharma.id)}
                      >
                        {language === 'ar' ? 'حجز هنا' : 'Demander ici'}
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
                {language === 'ar'
                  ? 'لا توجد حالياً أي صيدلية شريكة تصرح بوجود هذا الدواء في المخزون في منطقتك.'
                  : 'Aucune pharmacie partenaire ne déclare actuellement ce médicament en stock dans votre secteur.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
