import React, { useState } from 'react';
import { CreditCard, Banknote, ShieldCheck, AlertCircle, Lock } from 'lucide-react';
import Input from '../common/Input';
import Badge from '../common/Badge';

/**
 * Composant de démonstration visuelle des méthodes de paiement (Carte bancaire & Espèces en pharmacie).
 * Aucun paiement ni transaction réelle - strictement démonstratif.
 */
export default function PaymentDemoSection({
  paymentMethod,
  onMethodChange,
  totalAmount = '0.000 TND',
}) {
  const [cardNumber, setCardNumber] = useState('4152 •••• •••• 8841');
  const [cardHolder, setCardHolder] = useState('AHMED BEN SALEM');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
        Choisissez votre modalité de règlement :
      </div>

      {/* Sélecteur des deux méthodes de paiement */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
        }}
      >
        {/* Option 1 : Paiement par Carte Bancaire (Simulation) */}
        <div
          onClick={() => onMethodChange('card')}
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            border: `2px solid ${
              paymentMethod === 'card' ? 'var(--color-primary)' : 'var(--color-border)'
            }`,
            backgroundColor:
              paymentMethod === 'card' ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <input
            type="radio"
            name="paymentMethod"
            checked={paymentMethod === 'card'}
            onChange={() => onMethodChange('card')}
            style={{ accentColor: 'var(--color-primary)', marginTop: '3px' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)' }}>
                Carte bancaire
              </strong>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ fontSize: '10px', padding: '1px 5px', borderRadius: '3px', background: '#e2e8f0', fontWeight: 'bold' }}>CIB</span>
                <span style={{ fontSize: '10px', padding: '1px 5px', borderRadius: '3px', background: '#dbeafe', color: '#1d4ed8', fontWeight: 'bold' }}>VISA</span>
                <span style={{ fontSize: '10px', padding: '1px 5px', borderRadius: '3px', background: '#ffedd5', color: '#c2410c', fontWeight: 'bold' }}>MC</span>
              </div>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>
              Pré-autorisation en ligne sécurisée (Simulation démo).
            </p>
          </div>
        </div>

        {/* Option 2 : Espèces directement à la pharmacie */}
        <div
          onClick={() => onMethodChange('cash')}
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            border: `2px solid ${
              paymentMethod === 'cash' ? 'var(--color-primary)' : 'var(--color-border)'
            }`,
            backgroundColor:
              paymentMethod === 'cash' ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <input
            type="radio"
            name="paymentMethod"
            checked={paymentMethod === 'cash'}
            onChange={() => onMethodChange('cash')}
            style={{ accentColor: 'var(--color-primary)', marginTop: '3px' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)' }}>
                Espèces à la pharmacie
              </strong>
              <Banknote size={18} color="var(--color-primary)" />
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>
              Règlement en espèces au comptoir lors du retrait par le bénéficiaire.
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================================
          INTERFACE VISUELLE SPÉCIFIQUE SELON LA MÉTHODE CHOISIE
          ====================================================================== */}
      {paymentMethod === 'card' ? (
        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-bg-subtle)',
            border: '1px solid var(--color-border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Avertissement démo bancaire */}
          <div
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: '#FEF3C7',
              border: '1px solid #FDE68A',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: 'var(--font-size-xs)',
              color: '#92400E',
            }}
          >
            <Lock size={15} color="#B45309" />
            <span>
              <strong>Démonstration visuelle :</strong> Formulaire de paiement simulé. Aucune information bancaire réelle n'est collectée ni transmise.
            </span>
          </div>

          {/* Carte virtuelle stylisée */}
          <div
            style={{
              maxWidth: '340px',
              margin: '0 auto',
              width: '100%',
              padding: '18px 20px',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, #168B70 0%, #0F5C4A 100%)',
              color: 'var(--color-white)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.08em', opacity: 0.9 }}>
                CARTE BANCAIRE TUNISIE
              </span>
              <CreditCard size={20} />
            </div>

            <div
              style={{
                fontSize: '17px',
                letterSpacing: '2px',
                fontFamily: 'var(--font-family-mono)',
                fontWeight: 'bold',
                padding: '4px 0',
              }}
            >
              {cardNumber}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '11px' }}>
              <div>
                <div style={{ opacity: 0.7, fontSize: '9px' }}>TITULAIRE</div>
                <div style={{ fontWeight: 'bold' }}>{cardHolder}</div>
              </div>
              <div>
                <div style={{ opacity: 0.7, fontSize: '9px' }}>EXPIRE FIN</div>
                <div style={{ fontWeight: 'bold', fontFamily: 'var(--font-family-mono)' }}>{cardExpiry}</div>
              </div>
            </div>
          </div>

          {/* Formulaire visuel des champs habituels de paiement */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
            }}
          >
            <Input
              label="Numéro de carte (Simulation)"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4152 0000 0000 0000"
              startIcon={<CreditCard size={16} />}
            />

            <Input
              label="Titulaire de la carte"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Nom et prénom sur la carte"
            />

            <Input
              label="Date d'expiration"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
              placeholder="MM/AA"
            />

            <Input
              label="Cryptogramme (CVV)"
              value={cardCvv}
              onChange={(e) => setCardCvv(e.target.value)}
              placeholder="123"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            <span>Montant pré-autorisé estimé :</span>
            <strong style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-primary-dark)' }}>
              {totalAmount}
            </strong>
          </div>
        </div>
      ) : (
        /* Message d'information pour le paiement en espèces */
        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-primary-light)',
            border: '1px solid var(--color-success-border)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <Banknote size={22} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-primary-dark)' }}>
              Règlement en espèces directement à la pharmacie
            </strong>
            <p style={{ margin: '4px 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-dark)', lineHeight: 1.5 }}>
              Aucun paiement en ligne n'est nécessaire. Le bénéficiaire désigné réglera la somme de{' '}
              <strong>{totalAmount}</strong> directement au comptoir de l'officine lors de la récupération
              matérielle des médicaments sur présentation d'une pièce d'identité.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
