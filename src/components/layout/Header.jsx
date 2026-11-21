import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  ShieldCheck,
  Building2,
  LogIn,
  UserPlus,
  Heart,
  Package,
  HelpCircle,
} from 'lucide-react';
import Logo from '../common/Logo';
import Button from '../common/Button';
import Badge from '../common/Badge';

/**
 * Composant Header Réutilisable PharmaCityTN
 * @param {Object} props
 * @param {'public' | 'user' | 'pharmacy'} [props.variant='public']
 */
export default function Header({ variant = 'public' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation selon l'espace public requis :
  // - Accueil
  // - Rechercher un médicament
  // - Comment ça marche ?
  const publicLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/user/search', label: 'Rechercher un médicament', icon: Search },
    { to: '/#how-it-works', label: 'Comment ça marche ?', icon: HelpCircle, isAnchor: true },
  ];

  const userLinks = [
    { to: '/user/dashboard', label: 'Tableau de bord' },
    { to: '/user/search', label: 'Recherche', icon: Search },
    { to: '/user/favorites', label: 'Favoris', icon: Heart },
    { to: '/user/notifications', label: 'Notifications', icon: Bell },
  ];

  const pharmacyLinks = [
    { to: '/pharmacy/dashboard', label: 'Tableau de bord' },
    { to: '/pharmacy/medicines', label: 'Médicaments' },
    { to: '/pharmacy/stock', label: 'Gestion Stock', icon: Package },
    { to: '/pharmacy/profile', label: 'Profil Officine' },
  ];

  const navLinks =
    variant === 'user' ? userLinks : variant === 'pharmacy' ? pharmacyLinks : publicLinks;

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/' && !location.hash) return true;
    if (path !== '/' && !path.includes('#') && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLinkClick = (e, link) => {
    if (link.isAnchor) {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (location.pathname !== '/') {
        navigate('/#how-it-works');
        setTimeout(() => {
          const el = document.getElementById('how-it-works');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)',
        backgroundColor: 'var(--color-bg-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {/* Barre supérieure discrète (Information / Urgence Tunisie) */}
      <div
        style={{
          backgroundColor: 'var(--color-primary-light)',
          borderBottom: '1px solid var(--color-border-subtle)',
          padding: '4px 0',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-primary-dark)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px' }}>🇹🇳</span>
            <span>
              <strong>PharmaCityTN</strong> — Réseau national des officines de pharmacie en Tunisie
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Urgences médicales : <strong>190</strong></span>
            {variant === 'pharmacy' && (
              <Badge variant="success" size="sm" dot>
                Mode Pharmacien
              </Badge>
            )}
            {variant === 'user' && (
              <Badge variant="primary" size="sm" dot>
                Mode Citoyen
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Barre Principale */}
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '68px',
          }}
        >
          {/* Logo PharmaCityTN */}
          <Logo size="md" showTagline={false} />

          {/* Navigation Liens (Desktop) */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={(e) => handleLinkClick(e, link)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: active
                      ? 'var(--font-weight-semibold)'
                      : 'var(--font-weight-medium)',
                    color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    backgroundColor: active ? 'var(--color-primary-light)' : 'transparent',
                    transition: 'all var(--transition-fast)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--color-primary)';
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {link.icon && <link.icon size={16} />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions Droite (Desktop) */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '12px',
            }}
            className="desktop-actions"
          >
            {variant === 'public' && (
              <>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button variant="ghost" size="sm" icon={LogIn}>
                    Connexion
                  </Button>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button variant="primary" size="sm" icon={UserPlus}>
                    Créer un compte
                  </Button>
                </Link>
              </>
            )}

            {variant === 'user' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link to="/user/notifications">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-bg-subtle)',
                      color: 'var(--color-text-secondary)',
                      position: 'relative',
                    }}
                  >
                    <Bell size={18} />
                    <span
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'var(--color-danger)',
                        borderRadius: 'var(--radius-full)',
                      }}
                    />
                  </div>
                </Link>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 10px 4px 6px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-bg-subtle)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-white)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    A
                  </div>
                  <span
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Mon Compte
                  </span>
                </div>
              </div>
            )}

            {variant === 'pharmacy' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Badge variant="success" dot icon={<ShieldCheck size={14} />}>
                  Pharmacie Ouverte
                </Badge>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button variant="outline" size="sm">
                    Quitter
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Bouton Hamburger Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-bg-subtle)',
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu Déroulant Mobile */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-surface)',
            padding: '16px',
            animation: 'slideDown var(--transition-fast) ease-out',
          }}
          className="mobile-menu"
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => handleLinkClick(e, link)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: isActive(link.to) ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  backgroundColor: isActive(link.to)
                    ? 'var(--color-primary-light)'
                    : 'transparent',
                  textDecoration: 'none',
                }}
              >
                {link.icon && <link.icon size={18} />}
                <span>{link.label}</span>
              </Link>
            ))}

            <div
              style={{
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid var(--color-border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{ textDecoration: 'none' }}
              >
                <Button variant="outline" size="sm" fullWidth icon={LogIn}>
                  Connexion
                </Button>
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                style={{ textDecoration: 'none' }}
              >
                <Button variant="primary" size="sm" fullWidth icon={UserPlus}>
                  Créer un compte
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Styles responsive CSS inline pour Header */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </header>
  );
}
