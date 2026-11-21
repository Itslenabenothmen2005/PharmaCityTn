import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Shield, HeartHandshake, MapPin } from 'lucide-react';
import Logo from '../common/Logo';

/**
 * Composant Footer Réutilisable PharmaCityTN
 */
export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'auto',
      }}
    >
      {/* Section Principale */}
      <div className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--spacing-2xl)',
          }}
        >
          {/* Colonne 1 : Présentation & Logo */}
          <div style={{ maxWidth: '340px' }}>
            <Logo size="md" showTagline={true} />
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-secondary)',
                marginTop: 'var(--spacing-md)',
                lineHeight: 'var(--line-height-relaxed)',
              }}
            >
              Première plateforme numérique tunisienne dédiée à la localisation et à la
              vérification de disponibilité des médicaments en temps réel dans les officines
              partenaires.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: 'var(--spacing-md)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary-dark)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              <Shield size={14} />
              Données certifiées & sécurisées
            </div>
          </div>

          {/* Colonne 2 : Recherche & Services */}
          <div>
            <h4
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              Services Citoyens
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/user/search" style={footerLinkStyle}>
                  🔍 Rechercher un médicament
                </Link>
              </li>
              <li>
                <Link to="/user/search" style={footerLinkStyle}>
                  🌙 Pharmacies de garde (Tunis, Sousse, Sfax...)
                </Link>
              </li>
              <li>
                <Link to="/user/favorites" style={footerLinkStyle}>
                  ⭐ Mes pharmacies favorites
                </Link>
              </li>
              <li>
                <Link to="/user/notifications" style={footerLinkStyle}>
                  🔔 Alertes disponibilité en stock
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Espace Pharmaciens */}
          <div>
            <h4
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              Espace Professionnels
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/pharmacy/dashboard" style={footerLinkStyle}>
                  🏥 Portail Officine
                </Link>
              </li>
              <li>
                <Link to="/pharmacy/medicines" style={footerLinkStyle}>
                  💊 Catalogue des médicaments
                </Link>
              </li>
              <li>
                <Link to="/pharmacy/stock" style={footerLinkStyle}>
                  📦 Gestion et mise à jour du stock
                </Link>
              </li>
              <li>
                <Link to="/register" style={footerLinkStyle}>
                  ✨ Inscrire une nouvelle pharmacie
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Numéros d'urgence Tunisie */}
          <div>
            <h4
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              Urgences Tunisie
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: 'var(--font-size-xs)',
              }}
            >
              <div style={emergencyItemStyle}>
                <span>🚑 SAMU Tunisie</span>
                <strong>190</strong>
              </div>
              <div style={emergencyItemStyle}>
                <span>🚒 Protection Civile</span>
                <strong>198</strong>
              </div>
              <div style={emergencyItemStyle}>
                <span>🧪 Centre Anti-Poisons</span>
                <strong>71 335 500</strong>
              </div>
              <div style={emergencyItemStyle}>
                <span>👮 Police Secours</span>
                <strong>197</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de Copyright & Mention Santé */}
      <div
        style={{
          borderTop: '1px solid var(--color-border-subtle)',
          backgroundColor: 'var(--color-bg)',
          padding: '16px 0',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-muted)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div>
            © 2026 <strong>PharmaCityTN</strong>. Tous droits réservés. Développé pour la santé publique en Tunisie.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Confidentialité</span>
            <span>Conditions d'utilisation</span>
            <span>Mentions légales</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerLinkStyle = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  textDecoration: 'none',
  transition: 'color var(--transition-fast)',
};

const emergencyItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '6px 10px',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--color-bg-subtle)',
  color: 'var(--color-text-primary)',
};
