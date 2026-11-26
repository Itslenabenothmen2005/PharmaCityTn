import React, { useState, useEffect } from 'react';
import { Pill, Save, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import Badge from '../common/Badge';

const PHARMACEUTICAL_FORMS = [
  'Comprimé pelliculé',
  'Comprimé effervescent',
  'Gélule',
  'Sirop flacon',
  'Poudre suspension buvable',
  'Lyophilisat oral',
  'Aérosol pour inhalation',
  'Solution injectable',
  'Pommade / Crème dermique',
  'Collyre ophtalmique',
];

const COMMON_SUPPLIERS = [
  'SIPHAT (Tunisie)',
  'ADWYA (Tunisie)',
  'SOPHAPHAR (Tunisie)',
  'IPI (Industries Pharmaceutiques d’Ibn Sina)',
  'MEDIPHA Santé',
  'CERES PHARMA',
  'Autre / Importation PCT',
];

export default function MedicineFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const [formData, setFormData] = useState({
    name: '',
    dci: '',
    dosage: '',
    form: PHARMACEUTICAL_FORMS[0],
    reference: '',
    quantity: 10,
    lowStockThreshold: 5,
    prescriptionRequired: false,
    unitPrice: '3.500',
    supplier: COMMON_SUPPLIERS[0],
    category: 'Général',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        dci: initialData.dci || '',
        dosage: initialData.dosage || '',
        form: initialData.form || PHARMACEUTICAL_FORMS[0],
        reference: initialData.reference || '',
        quantity: initialData.quantity ?? 10,
        lowStockThreshold: initialData.lowStockThreshold ?? 5,
        prescriptionRequired: Boolean(initialData.prescriptionRequired),
        unitPrice: initialData.unitPrice || '3.500',
        supplier: initialData.supplier || COMMON_SUPPLIERS[0],
        category: initialData.category || 'Général',
      });
    } else {
      setFormData({
        name: '',
        dci: '',
        dosage: '',
        form: PHARMACEUTICAL_FORMS[0],
        reference: `REF-TN-${Math.floor(1000 + Math.random() * 9000)}`,
        quantity: 10,
        lowStockThreshold: 5,
        prescriptionRequired: false,
        unitPrice: '3.500',
        supplier: COMMON_SUPPLIERS[0],
        category: 'Général',
      });
    }
    setErrors({});
    setTouched({});
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom commercial est obligatoire.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit comporter au moins 2 caractères.';
    }

    if (!formData.dci.trim()) {
      newErrors.dci = 'Le principe actif (DCI) est obligatoire.';
    }

    if (!formData.dosage.trim()) {
      newErrors.dosage = 'Le dosage est obligatoire (ex: 500 mg, 1 g).';
    }

    if (!formData.form.trim()) {
      newErrors.form = 'La forme pharmaceutique est obligatoire.';
    }

    if (!formData.reference.trim()) {
      newErrors.reference = 'La référence du produit est obligatoire.';
    }

    if (formData.quantity === '' || isNaN(formData.quantity) || Number(formData.quantity) < 0) {
      newErrors.quantity = 'La quantité en stock doit être un entier positif ou nul.';
    }

    if (
      formData.lowStockThreshold === '' ||
      isNaN(formData.lowStockThreshold) ||
      Number(formData.lowStockThreshold) < 1
    ) {
      newErrors.lowStockThreshold = 'Le seuil d’alerte doit être au minimum de 1.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      quantity: parseInt(formData.quantity, 10),
      lowStockThreshold: parseInt(formData.lowStockThreshold, 10),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Modifier le médicament' : 'Ajouter un nouveau médicament'}
      size="lg"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div
          style={{
            padding: '10px 14px',
            backgroundColor: 'var(--color-primary-light)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-success-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-primary-dark)',
          }}
        >
          <Pill size={16} color="var(--color-primary)" style={{ flexShrink: 0 }} />
          <span>
            Les informations renseignées alimenteront le catalogue de votre officine et mettront à jour
            instantanément les disponibilités déclarées pour les citoyens.
          </span>
        </div>

        {/* Ligne 1: Nom & DCI */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div>
            <Input
              label="Nom commercial *"
              placeholder="ex: Doliprane, Augmentin..."
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={touched.name && errors.name}
              required
            />
          </div>

          <div>
            <Input
              label="Principe actif (DCI) *"
              placeholder="ex: Paracétamol, Amoxicilline..."
              value={formData.dci}
              onChange={(e) => handleChange('dci', e.target.value)}
              error={touched.dci && errors.dci}
              required
            />
          </div>
        </div>

        {/* Ligne 2: Dosage & Forme pharmaceutique */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div>
            <Input
              label="Dosage *"
              placeholder="ex: 1000 mg, 500 mg, 100 µg/dose..."
              value={formData.dosage}
              onChange={(e) => handleChange('dosage', e.target.value)}
              error={touched.dosage && errors.dosage}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600', color: 'var(--color-text-primary)' }}>
              Forme pharmaceutique *
            </label>
            <select
              value={formData.form}
              onChange={(e) => handleChange('form', e.target.value)}
              style={{
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-surface)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                outline: 'none',
              }}
            >
              {PHARMACEUTICAL_FORMS.map((form) => (
                <option key={form} value={form}>
                  {form}
                </option>
              ))}
            </select>
            {touched.form && errors.form && (
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-danger)' }}>{errors.form}</span>
            )}
          </div>
        </div>

        {/* Ligne 3: Référence & Fournisseur */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div>
            <Input
              label="Référence / Code nomenclature *"
              placeholder="ex: MED-TN-0012-A"
              value={formData.reference}
              onChange={(e) => handleChange('reference', e.target.value)}
              error={touched.reference && errors.reference}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600', color: 'var(--color-text-primary)' }}>
              Laboratoire / Fournisseur
            </label>
            <select
              value={formData.supplier}
              onChange={(e) => handleChange('supplier', e.target.value)}
              style={{
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-surface)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                outline: 'none',
              }}
            >
              {COMMON_SUPPLIERS.map((sup) => (
                <option key={sup} value={sup}>
                  {sup}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ligne 4: Quantité en stock, Seuil d'alerte & Prix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
          <div>
            <Input
              label="Quantité en stock (boîtes) *"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              error={touched.quantity && errors.quantity}
              required
            />
          </div>

          <div>
            <Input
              label="Seuil d'alerte faible *"
              type="number"
              min="1"
              value={formData.lowStockThreshold}
              onChange={(e) => handleChange('lowStockThreshold', e.target.value)}
              error={touched.lowStockThreshold && errors.lowStockThreshold}
              required
            />
          </div>

          <div>
            <Input
              label="Prix unitaire estimé (TND)"
              placeholder="ex: 3.500"
              value={formData.unitPrice}
              onChange={(e) => handleChange('unitPrice', e.target.value)}
            />
          </div>
        </div>

        {/* Ligne 5: Prescription obligatoire (OUI / NON) */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: formData.prescriptionRequired ? '#FEF2F2' : '#F0FDF4',
            border: `1.5px solid ${formData.prescriptionRequired ? '#FECACA' : '#BBF7D0'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: formData.prescriptionRequired ? '#FEE2E2' : '#DCFCE7',
                color: formData.prescriptionRequired ? 'var(--color-danger)' : 'var(--color-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {formData.prescriptionRequired ? <ShieldAlert size={20} /> : <CheckCircle2 size={20} />}
            </div>
            <div>
              <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                Prescription médicale obligatoire
              </div>
              <p style={{ margin: '2px 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                {formData.prescriptionRequired
                  ? 'Exige une ordonnance d’un médecin certifié pour la délivrance.'
                  : 'Médicament en vente libre (automédication encadrée).'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleChange('prescriptionRequired', false)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: '600',
                cursor: 'pointer',
                border: !formData.prescriptionRequired ? '1.5px solid #16A34A' : '1px solid #CBD5E1',
                backgroundColor: !formData.prescriptionRequired ? '#DCFCE7' : '#FFFFFF',
                color: !formData.prescriptionRequired ? '#166534' : '#64748B',
              }}
            >
              Non (Libre)
            </button>
            <button
              type="button"
              onClick={() => handleChange('prescriptionRequired', true)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: '600',
                cursor: 'pointer',
                border: formData.prescriptionRequired ? '1.5px solid #DC2626' : '1px solid #CBD5E1',
                backgroundColor: formData.prescriptionRequired ? '#FEE2E2' : '#FFFFFF',
                color: formData.prescriptionRequired ? '#991B1B' : '#64748B',
              }}
            >
              Oui (Ordonnance)
            </button>
          </div>
        </div>

        {/* Boutons d'action */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            borderTop: '1px solid var(--color-border-subtle)',
            paddingTop: '14px',
            marginTop: '8px',
          }}
        >
          <Button variant="ghost" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit" icon={Save}>
            {initialData ? 'Enregistrer les modifications' : 'Ajouter au catalogue'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
