import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Building2,
  User,
  CreditCard,
  Banknote,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileText,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

/**
 * Page récapitulative de confirmation de la demande de médicament (Feature 8.C & 8.D)
 */
export default function RequestConfirmationView({ request, onNewRequest }) {
  const navigate = useNavigate();

  if (!request) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', maxWidth: '820px', margin: '0 auto' }}>
      {/* En-tête de Succès */}
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-success-light)',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <CheckCircle2 size={38} strokeWidth={2.3} />
        </div>

        <div style={{ display: 'inline-flex', marginBottom: '8px' }}>
          <Badge variant="primary" size="md">
            Réf : {request.id}
          </Badge>
        </div>

        <h1 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-text-primary)', margin: '0 0 8px' }}>
          Demande de médicament transmise avec succès !
        </h1>

        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', maxWidth: '580px', margin: '0 auto' }}>
          L'officine sélectionnée a reçu votre demande de mise à disposition.
        </p>
      </div>

      {/* RAPPEL STRICT : RETRAIT OBLIGATOIRE AU COMPTOIR */}
      <div
        style={{
          padding: '14px 18px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: '#EFF6FF',
          border: '1.5px solid #BFDBFE',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Building2 size={24} color="#1D4ED8" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: 'var(--font-size-xs)', color: '#1E40AF', lineHeight: 1.5 }}>
          <strong>Consigne stricte de retrait :</strong> Le bénéficiaire désigné (
          <strong>{request.beneficiary?.name}</strong>) doit se présenter personnellement au comptoir de
          la pharmacie pour récupérer les médicaments. <strong>Aucune livraison à domicile n'est proposée</strong>,
          conformément à la réglementation pharmaceutique en vigueur en Tunisie.
        </div>
      </div>

      {/* RÉCAPITULATIF DÉTAILLÉ DE LA DEMANDE */}
      <Card
        title="Récapitulatif Officiel de la Demande"
        subtitle={`Transmise le ${request.createdAt}`}
        padding="lg"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Ligne 1 : Médicament & Pharmacie */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--color-border-subtle)',
            }}
          >
            {/* Médicament */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={labelStyle}>MÉDICAMENT DEMANDÉ</span>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                {request.medicine?.name} {request.medicine?.dosage}
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                {request.medicine?.form} • Quantité : <strong>{request.quantity} boîte(s)</strong>
              </div>
              <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                Montant total : {request.totalAmount}
              </div>
            </div>

            {/* Pharmacie */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={labelStyle}>PHARMACIE SÉLECTIONNÉE</span>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                {request.pharmacy?.name}
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={13} color="var(--color-primary)" />
                {request.pharmacy?.address}, {request.pharmacy?.city}
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={13} color="var(--color-primary)" />
                {request.pharmacy?.phone}
              </div>
            </div>
          </div>

          {/* Ligne 2 : LES TROIS RÔLES DISTINCTS */}
          <div>
            <span style={labelStyle}>DISTINCTION DES TROIS RÔLES</span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginTop: '8px',
              }}
            >
              {/* Rôle 1 : Demandeur */}
              <div style={roleBoxStyle}>
                <div style={roleHeaderStyle}>
                  <span>1. Demandeur</span>
                  <Badge variant="neutral" size="sm">Initiateur</Badge>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                  {request.applicant?.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  {request.applicant?.phone}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  {request.applicant?.email}
                </div>
              </div>

              {/* Rôle 2 : Payeur */}
              <div style={roleBoxStyle}>
                <div style={roleHeaderStyle}>
                  <span>2. Payeur</span>
                  <Badge variant="primary" size="sm">Règlement</Badge>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                  {request.payer?.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  {request.payer?.phone}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-primary-dark)', fontWeight: 'bold', marginTop: '2px' }}>
                  {request.paymentMethod === 'card' ? '💳 Carte bancaire (Démo)' : '💵 Espèces à l’officine'}
                </div>
              </div>

              {/* Rôle 3 : Bénéficiaire */}
              <div style={{ ...roleBoxStyle, border: '1.5px solid var(--color-primary)' }}>
                <div style={roleHeaderStyle}>
                  <span>3. Bénéficiaire</span>
                  <Badge variant="success" size="sm">Retrait</Badge>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                  {request.beneficiary?.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  Tél : <strong>{request.beneficiary?.phone}</strong>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-success-dark)', fontWeight: '600', marginTop: '2px' }}>
                  Habilité au retrait au comptoir
                </div>
              </div>
            </div>
          </div>

          {/* Ligne 3 : Statut & Méthode de paiement */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid var(--color-border-subtle)',
              gap: '12px',
            }}
          >
            <div>
              <span style={labelStyle}>STATUT ACTUEL</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <Badge variant="warning" dot>
                  {request.statusLabel}
                </Badge>
              </div>
            </div>

            <div>
              <span style={labelStyle}>MÉTHODE DE PAIEMENT</span>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-primary)', marginTop: '4px' }}>
                {request.paymentMethod === 'card'
                  ? 'Carte bancaire (Pré-autorisation simulée)'
                  : 'Règlement en espèces au comptoir lors du retrait'}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ======================================================================
          NOTIFICATIONS VISUELLES SIMULÉES (DEMANDEUR & BÉNÉFICIAIRE)
          ====================================================================== */}
      <Card
        title="Notifications Visuelles Simulées"
        subtitle="Aperçu des alertes automatiques générées par la plateforme"
        padding="lg"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '14px',
          }}
        >
          {/* Notification pour le Demandeur */}
          <div
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                📱 Notification Demandeur
              </span>
              <Badge variant="info" size="sm">In-App</Badge>
            </div>
            <strong style={{ fontSize: '13px' }}>
              {request.simulatedNotifications?.applicant?.title}
            </strong>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>
              {request.simulatedNotifications?.applicant?.message}
            </p>
          </div>

          {/* Notification pour le Bénéficiaire (SMS) */}
          <div
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#166534' }}>
                💬 SMS envoyé au Bénéficiaire ({request.beneficiary?.phone})
              </span>
              <Badge variant="success" size="sm">SMS</Badge>
            </div>
            <strong style={{ fontSize: '13px', color: '#14532D' }}>
              {request.simulatedNotifications?.beneficiary?.title}
            </strong>
            <p style={{ fontSize: '12px', color: '#166534', margin: 0 }}>
              {request.simulatedNotifications?.beneficiary?.message}
            </p>
          </div>
        </div>
      </Card>

      {/* AVERTISSEMENT RÉGLEMENTAIRE FORMEL */}
      <div
        style={{
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-bg-subtle)',
          border: '1px solid var(--color-border)',
          fontSize: '11px',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
          textAlign: 'center',
        }}
      >
        <strong>Avertissement technique & réglementaire :</strong> Ce parcours est une démonstration frontend
        prototype. Il ne constitue pas un système de réservation ou de paiement réellement opérationnel.
        Toute mise en service effective dépendra d’une validation réglementaire et conventionnelle préalable
        avec les autorités sanitaires et l’Ordre des Pharmaciens de Tunisie.
      </div>

      {/* ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
        <Button variant="outline" onClick={onNewRequest}>
          Faire une autre demande
        </Button>
        <Button variant="primary" icon={ArrowRight} onClick={() => navigate('/user/requests')}>
          Consulter le suivi de mes demandes
        </Button>
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: '11px',
  fontWeight: '700',
  color: 'var(--color-text-muted)',
  letterSpacing: '0.04em',
};

const roleBoxStyle = {
  padding: '12px',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-bg-subtle)',
  border: '1px solid var(--color-border-subtle)',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const roleHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '11px',
  fontWeight: '600',
  color: 'var(--color-text-muted)',
};
