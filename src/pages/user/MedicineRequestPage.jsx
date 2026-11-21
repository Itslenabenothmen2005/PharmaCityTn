import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Pill,
  Building2,
  User,
  Users,
  CreditCard,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Info,
  ShieldCheck,
  ArrowLeft,
  X,
  Phone,
  HelpCircle,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import PaymentDemoSection from '../../components/user/PaymentDemoSection';
import RequestConfirmationView from '../../components/user/RequestConfirmationView';
import { mockMedicines } from '../../data/medicines';
import { mockPharmacies } from '../../data/pharmacies';
import { useUserStore } from '../../hooks/useUserStore';
import { useToast } from '../../hooks/useToast';

export default function MedicineRequestPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { profile, addRequest } = useUserStore();

  const medParamId = searchParams.get('medId');
  const pharmacyParamId = searchParams.get('pharmacyId');

  // Médicament et Pharmacie
  const [selectedMedId, setSelectedMedId] = useState(medParamId || mockMedicines[0].id);
  const selectedMedicine = mockMedicines.find((m) => m.id === selectedMedId) || mockMedicines[0];

  // Liste des pharmacies disponibles pour ce médicament
  const availablePharmacies = selectedMedicine.pharmaciesList?.length
    ? selectedMedicine.pharmaciesList
    : mockPharmacies;

  const [selectedPharmacyId, setSelectedPharmacyId] = useState(
    pharmacyParamId || availablePharmacies[0]?.id || 'ph-1'
  );
  const selectedPharmacy =
    availablePharmacies.find((p) => p.id === selectedPharmacyId) || availablePharmacies[0];

  const [quantity, setQuantity] = useState(1);

  // ==========================================================================
  // LES TROIS RÔLES : DEMANDEUR, PAYEUR, BÉNÉFICIAIRE
  // ==========================================================================
  // 1. Demandeur
  const [applicantName, setApplicantName] = useState(profile.name || 'Ahmed Ben Salem');
  const [applicantPhone, setApplicantPhone] = useState(profile.phone || '+216 98 450 123');
  const [applicantEmail, setApplicantEmail] = useState(profile.email || 'ahmed.bensalem@gmail.tn');

  // 2. Bénéficiaire
  const [isBeneficiaryApplicant, setIsBeneficiaryApplicant] = useState(true);
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryPhone, setBeneficiaryPhone] = useState('');
  const [beneficiaryRelation, setBeneficiaryRelation] = useState('Parent');

  // 3. Payeur
  const [isPayerApplicant, setIsPayerApplicant] = useState(true);
  const [payerName, setPayerName] = useState('');
  const [payerPhone, setPayerPhone] = useState('');

  // Mode de Paiement
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' ou 'card'

  // Ordonnance
  const [doctorName, setDoctorName] = useState('');
  const [prescriptionFile, setPrescriptionFile] = useState(null);

  // État de chargement et confirmation
  const [submitting, setSubmitting] = useState(false);
  const [createdRequest, setCreatedRequest] = useState(null);

  // Calcul du montant estimé
  const unitPriceNum = parseFloat(selectedMedicine.price?.replace(' TND', '')) || 3.5;
  const totalAmountNum = (unitPriceNum * quantity).toFixed(3);
  const formattedTotalAmount = `${totalAmountNum} TND`;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrescriptionFile({
        name: file.name,
        size: `${Math.round(file.size / 1024)} Ko`,
      });
      toast.info(`Ordonnance « ${file.name} » prête pour la démo`, 'Document joint');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation du numéro de téléphone du bénéficiaire
    const finalBeneficiaryName = isBeneficiaryApplicant ? applicantName : beneficiaryName.trim();
    const finalBeneficiaryPhone = isBeneficiaryApplicant ? applicantPhone : beneficiaryPhone.trim();

    if (!finalBeneficiaryName) {
      toast.error('Veuillez renseigner le nom du bénéficiaire qui retirera le médicament.', 'Erreur');
      return;
    }

    if (!finalBeneficiaryPhone) {
      toast.error('Le numéro de téléphone du bénéficiaire est obligatoire pour le retrait.', 'Erreur');
      return;
    }

    // Validation de l'ordonnance si requise
    if (selectedMedicine.prescriptionRequired && !doctorName.trim()) {
      toast.warning('Veuillez indiquer le nom du médecin prescripteur pour ce médicament sous ordonnance.', 'Ordonnance');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      const newRequestData = {
        medicine: {
          id: selectedMedicine.id,
          name: selectedMedicine.name,
          dosage: selectedMedicine.dosage,
          form: selectedMedicine.form,
          price: selectedMedicine.price,
          prescriptionRequired: selectedMedicine.prescriptionRequired,
        },
        pharmacy: {
          id: selectedPharmacy.id,
          name: selectedPharmacy.name,
          address: selectedPharmacy.address,
          city: selectedPharmacy.city,
          phone: selectedPharmacy.phone,
        },
        quantity,
        totalAmount: formattedTotalAmount,
        applicant: {
          name: applicantName,
          phone: applicantPhone,
          email: applicantEmail,
        },
        payer: {
          name: isPayerApplicant ? applicantName : payerName,
          phone: isPayerApplicant ? applicantPhone : payerPhone,
          isApplicant: isPayerApplicant,
        },
        beneficiary: {
          name: finalBeneficiaryName,
          phone: finalBeneficiaryPhone,
          relation: isBeneficiaryApplicant ? 'Moi-même' : beneficiaryRelation,
          isApplicant: isBeneficiaryApplicant,
        },
        paymentMethod,
        prescription: {
          required: selectedMedicine.prescriptionRequired,
          doctorName: doctorName.trim(),
          fileName: prescriptionFile?.name || (selectedMedicine.prescriptionRequired ? 'ordonnance_jointe.pdf' : ''),
        },
      };

      const result = addRequest(newRequestData);
      setSubmitting(false);
      setCreatedRequest(result);
      toast.success('Demande transmise avec succès à l’officine !', 'Demande enregistrée');
    }, 600);
  };

  // Si la demande a été créée, afficher la page récapitulative de confirmation
  if (createdRequest) {
    return (
      <RequestConfirmationView
        request={createdRequest}
        onNewRequest={() => {
          setCreatedRequest(null);
          setQuantity(1);
        }}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', maxWidth: '860px', margin: '0 auto' }}>
      {/* En-tête */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Link
            to="/user/search"
            style={{
              color: 'var(--color-text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: 'var(--font-size-xs)',
              marginRight: '8px',
            }}
          >
            <ArrowLeft size={14} /> Retour à la recherche
          </Link>
          <Badge variant="primary" size="sm">
            Parcours Démo Officine
          </Badge>
        </div>

        <h1 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-text-primary)', margin: 0 }}>
          Demande de Médicament & Retrait en Pharmacie
        </h1>

        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '4px' }}>
          Effectuez une demande de mise à disposition pour vous-même ou pour un proche.
        </p>
      </div>

      {/* AVERTISSEMENT RÉGLEMENTAIRE & RETRAIT OBLIGATOIRE EN PHARMACIE */}
      <div
        style={{
          padding: '14px 18px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: '#EFF6FF',
          border: '1.5px solid #BFDBFE',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <ShieldCheck size={24} color="#1D4ED8" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: 'var(--font-size-xs)', color: '#1E40AF', lineHeight: 1.5 }}>
          <strong>Cadre réglementaire & Déontologique :</strong> Cette démarche permet de réserver la
          mise de côté de médicaments déclarés disponibles. <strong>Le bénéficiaire doit impérativement se
          présenter en personne au comptoir de l'officine pour le retrait physique.</strong> Aucune livraison
          à domicile n'est autorisée. Ce parcours est une démonstration frontend soumise à validation
          réglementaire préalable.
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
        {/* ==================================================================
            SECTION 1 : MÉDICAMENT & PHARMACIE CHOISIE
            ================================================================== */}
        <Card
          title="1. Médicament & Pharmacie Choisi"
          subtitle="Sélectionnez le traitement et l'officine déclarée"
          padding="lg"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '14px',
              }}
            >
              {/* Choix du médicament */}
              <div>
                <label style={labelStyle}>Médicament demandé *</label>
                <select
                  value={selectedMedId}
                  onChange={(e) => {
                    setSelectedMedId(e.target.value);
                    const newMed = mockMedicines.find((m) => m.id === e.target.value);
                    if (newMed?.pharmaciesList?.length) {
                      setSelectedPharmacyId(newMed.pharmaciesList[0].id);
                    }
                  }}
                  style={selectStyle}
                >
                  {mockMedicines.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} {m.dosage} ({m.form}) — {m.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantité */}
              <div>
                <label style={labelStyle}>Quantité souhaitée (boîtes) *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
                    style={{ ...selectStyle, width: '100px' }}
                    required
                  />
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                    Total estimé : <strong>{formattedTotalAmount}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Choix de la pharmacie */}
            <div>
              <label style={labelStyle}>Pharmacie de retrait sélectionnée *</label>
              <select
                value={selectedPharmacyId}
                onChange={(e) => setSelectedPharmacyId(e.target.value)}
                style={selectStyle}
              >
                {availablePharmacies.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.address}, {p.city} ({p.phone})
                  </option>
                ))}
              </select>
            </div>

            {/* Badge de rappel d'ordonnance si requis */}
            {selectedMedicine.prescriptionRequired && (
              <div
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-warning-light)',
                  border: '1px solid var(--color-warning-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-warning-text)',
                }}
              >
                <AlertCircle size={16} color="var(--color-warning-dark)" style={{ flexShrink: 0 }} />
                <span>
                  Ce médicament est soumis à prescription médicale obligatoire. L’original de l’ordonnance
                  devra être obligatoirement présenté au pharmacien lors du retrait.
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* ==================================================================
            SECTION 2 : DISTINCTION DES TROIS RÔLES
            ================================================================== */}
        <Card
          title="2. Rôles : Demandeur, Payeur & Bénéficiaire"
          subtitle="Distinguez qui commande, qui règle et qui récupère au comptoir"
          padding="lg"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* RÔLE 1 : DEMANDEUR */}
            <div style={roleContainerStyle}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                  👤 Rôle 1 : Le Demandeur (Personne effectuant la demande)
                </span>
                <Badge variant="primary" size="sm">Connecté</Badge>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <Input
                  label="Nom complet du demandeur"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  required
                />
                <Input
                  label="Numéro de téléphone"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  required
                />
                <Input
                  label="Adresse Email"
                  type="email"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* RÔLE 2 : BÉNÉFICIAIRE (QUI RÉCUPÈRE LE MÉDICAMENT) */}
            <div style={{ ...roleContainerStyle, border: '1.5px solid var(--color-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                  🏥 Rôle 2 : Le Bénéficiaire (Personne qui retire le médicament au comptoir)
                </span>
                <Badge variant="success" size="sm">Retrait obligatoire</Badge>
              </div>

              {/* Option permettant d'indiquer que le demandeur est le bénéficiaire */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  padding: '6px 0',
                }}
              >
                <input
                  type="checkbox"
                  checked={isBeneficiaryApplicant}
                  onChange={(e) => setIsBeneficiaryApplicant(e.target.checked)}
                  style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
                />
                <span>Le demandeur est également le bénéficiaire (Je récupère moi-même mon médicament)</span>
              </label>

              {/* Si le bénéficiaire est une tierce personne */}
              {!isBeneficiaryApplicant && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <Input
                    label="Nom complet du bénéficiaire *"
                    placeholder="Ex: Fatma Ben Salem"
                    value={beneficiaryName}
                    onChange={(e) => setBeneficiaryName(e.target.value)}
                    required
                  />

                  <Input
                    label="Numéro de téléphone du bénéficiaire *"
                    placeholder="+216 22 000 000"
                    value={beneficiaryPhone}
                    onChange={(e) => setBeneficiaryPhone(e.target.value)}
                    helperText="Requis pour l'envoi du SMS de confirmation de retrait"
                    required
                  />

                  <div>
                    <label style={labelStyle}>Lien avec le bénéficiaire</label>
                    <select
                      value={beneficiaryRelation}
                      onChange={(e) => setBeneficiaryRelation(e.target.value)}
                      style={selectStyle}
                    >
                      <option value="Parent">Parent (Père / Mère)</option>
                      <option value="Enfant">Enfant</option>
                      <option value="Conjoint">Conjoint(e)</option>
                      <option value="Proche">Proche / Voisin</option>
                      <option value="Patient pris en charge">Patient pris en charge</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* RÔLE 3 : LE PAYEUR (QUI PREND EN CHARGE LE RÈGLEMENT) */}
            <div style={roleContainerStyle}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                  💳 Rôle 3 : Le Payeur (Personne ou entité qui prend en charge le règlement)
                </span>
                <Badge variant="neutral" size="sm">Règlement</Badge>
              </div>

              {/* Option permettant d'indiquer que le payeur est le demandeur */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  padding: '6px 0',
                }}
              >
                <input
                  type="checkbox"
                  checked={isPayerApplicant}
                  onChange={(e) => setIsPayerApplicant(e.target.checked)}
                  style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
                />
                <span>Le payeur est également le demandeur (Je prends en charge le paiement)</span>
              </label>

              {/* Si le payeur est un tiers */}
              {!isPayerApplicant && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <Input
                    label="Nom complet du payeur / Organisme"
                    placeholder="Ex: Tiers payeur, Mutuelle, Membre de famille"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    required
                  />

                  <Input
                    label="Téléphone du payeur"
                    placeholder="+216 00 000 000"
                    value={payerPhone}
                    onChange={(e) => setPayerPhone(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* ==================================================================
            SECTION 3 : ORDONNANCE MÉDICALE (SI NÉCESSAIRE)
            ================================================================== */}
        <Card
          title="3. Ordonnance Médicale & Prescription"
          subtitle={
            selectedMedicine.prescriptionRequired
              ? 'Médicament sous prescription obligatoire'
              : 'Facultatif pour ce médicament'
          }
          padding="lg"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Input
              label={
                selectedMedicine.prescriptionRequired
                  ? 'Nom du médecin prescripteur *'
                  : 'Nom du médecin (optionnel)'
              }
              placeholder="Ex : Dr. Mehdi Jaziri (Pneumologue)"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              startIcon={<User size={16} />}
              required={selectedMedicine.prescriptionRequired}
            />

            {/* Zone de téléversement simulée de l'ordonnance */}
            <div>
              <label style={labelStyle}>Pièce jointe de l'ordonnance (Démonstration frontend)</label>
              <div
                style={{
                  border: '2px dashed var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: 'var(--color-bg-subtle)',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <Upload size={24} color="var(--color-primary)" />
                  <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold' }}>
                    Glissez votre ordonnance ici ou cliquez pour parcourir
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    Formats acceptés : JPG, PNG, PDF (Simulation de téléversement sécurisé)
                  </span>
                </div>
              </div>

              {/* Fichier joint affiché */}
              {prescriptionFile && (
                <div
                  style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: 'var(--font-size-xs)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={16} color="var(--color-primary)" />
                    <span>
                      <strong>{prescriptionFile.name}</strong> ({prescriptionFile.size})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPrescriptionFile(null)}
                    style={{ color: 'var(--color-danger)', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* ==================================================================
            SECTION 4 : MODALITÉS DE PAIEMENT
            ================================================================== */}
        <Card
          title="4. Méthode de Paiement"
          subtitle="Choisissez entre pré-autorisation par carte ou règlement en espèces"
          padding="lg"
        >
          <PaymentDemoSection
            paymentMethod={paymentMethod}
            onMethodChange={setPaymentMethod}
            totalAmount={formattedTotalAmount}
          />
        </Card>

        {/* ==================================================================
            VALIDATION ET SOUMISSION
            ================================================================== */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            padding: '16px 0',
          }}
        >
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textAlign: 'center' }}>
            En validant cette demande, vous acceptez que vos coordonnées soient transmises à l'officine pour la mise de côté.
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={submitting}
            icon={CheckCircle2}
            style={{ minWidth: '280px' }}
          >
            {submitting ? 'Transmission en cours...' : 'Confirmer et transmettre la demande'}
          </Button>
        </div>
      </form>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: '600',
  color: 'var(--color-text-secondary)',
  marginBottom: '4px',
};

const selectStyle = {
  width: '100%',
  height: '42px',
  padding: '8px 12px',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-bg-surface)',
  color: 'var(--color-text-primary)',
  fontSize: 'var(--font-size-sm)',
  outline: 'none',
};

const roleContainerStyle = {
  padding: '14px',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-bg-subtle)',
  border: '1px solid var(--color-border-subtle)',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};
