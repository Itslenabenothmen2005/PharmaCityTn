import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  ShieldCheck,
  LogIn,
  UserPlus,
  Heart,
  Package,
  HelpCircle,
  Globe,
  FilePlus2,
  History,
  LogOut,
} from 'lucide-react';
import Logo from '../common/Logo';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useUserStore } from '../../hooks/useUserStore';
import { useToast } from '../../hooks/useToast';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Composant Header Réutilisable PharmaCityTN
 * @param {Object} props
 * @param {'public' | 'user' | 'pharmacy'} [props.variant='public']
 */
export default function Header({ variant = 'public' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, isRtl, switchLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    toast.info(t('nav.logoutConfirm'), 'Déconnexion');
    navigate('/');
  };

  // On récupère le profil et le compteur non-lu si on est dans le UserStoreProvider
  let profile = { name: 'Ahmed Ben Salem' };
  let unreadCount = 0;
  try {
    const store = useUserStore();
    if (store) {
      profile = store.profile;
      unreadCount = store.unreadCount;
    }
  } catch (err) {
    void err;
  }

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : 'A');

  // Navigation selon l'espace requis avec traduction dynamique :
  const publicLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/user/search', label: t('nav.search'), icon: Search },
    { to: '/#how-it-works', label: t('nav.howItWorks'), icon: HelpCircle, isAnchor: true },
  ];

  const userLinks = [
    { to: '/user/dashboard', label: t('nav.dashboard') },
    { to: '/user/search', label: t('nav.searchMed'), icon: Search },
    { to: '/user/request', label: t('nav.request'), icon: FilePlus2 },
    { to: '/user/favorites', label: t('nav.favorites'), icon: Heart },
    { to: '/user/notifications', label: t('nav.notifications'), icon: Bell },
    { to: '/user/profile', label: t('nav.profile'), icon: User },
  ];

  const pharmacyLinks = [
    { to: '/pharmacy/dashboard', label: t('nav.pharma.dashboard') },
    { to: '/pharmacy/medicines', label: t('nav.pharma.medicines') },
    { to: '/pharmacy/stock', label: t('nav.pharma.stock'), icon: Package },
    { to: '/pharmacy/history', label: t('nav.pharma.history'), icon: History },
    { to: '/pharmacy/profile', label: t('nav.pharma.profile') },
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
              <strong>PharmaCityTN</strong> — {t('topbar.network')}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Sélecteur de Langue RTL / LTR */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'rgba(22, 139, 112, 0.12)',
                borderRadius: 'var(--radius-full)',
                padding: '2px 4px',
                gap: '2px',
              }}
              title="Changer la langue (Français / العربية)"
            >
              <Globe size={12} color="var(--color-primary-dark)" style={{ marginLeft: '4px', marginRight: '2px' }} />
              <button
                type="button"
                onClick={() => switchLanguage('fr')}
                style={{
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  fontWeight: language === 'fr' ? '700' : '500',
                  backgroundColor: language === 'fr' ? 'var(--color-primary)' : 'transparent',
                  color: language === 'fr' ? '#FFFFFF' : 'var(--color-primary-dark)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => switchLanguage('ar')}
                style={{
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  fontWeight: language === 'ar' ? '700' : '500',
                  backgroundColor: language === 'ar' ? 'var(--color-primary)' : 'transparent',
                  color: language === 'ar' ? '#FFFFFF' : 'var(--color-primary-dark)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                عربي
              </button>
            </div>

            <span className="hide-on-mobile">{t('topbar.emergency')}</span>
            {variant === 'pharmacy' && (
              <Badge variant="success" size="sm" dot>
                {t('topbar.pharmacyMode')}
              </Badge>
            )}
            {variant === 'user' && (
              <Badge variant="primary" size="sm" dot>
                {t('topbar.citizenMode')}
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
                    {t('header.login')}
                  </Button>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button variant="primary" size="sm" icon={UserPlus}>
                    {t('header.register')}
                  </Button>
                </Link>
              </>
            )}

            {variant === 'user' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link to="/user/notifications" style={{ textDecoration: 'none' }}>
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
                    {unreadCount > 0 && (
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
                    )}
                  </div>
                </Link>

                <Link to="/user/profile" style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '4px 10px 4px 6px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--color-bg-subtle)',
                      border: '1px solid var(--color-border)',
                      cursor: 'pointer',
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
                      {getInitial(profile.name)}
                    </div>
                    <span
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {profile.name?.split(' ')[0] || 'Mon Compte'}
                    </span>
                  </div>
                </Link>

                {/* Bouton Déconnexion Directe (Citoyen) */}
                <button
                  type="button"
                  onClick={handleLogout}
                  title={t('header.logout')}
                  aria-label={t('header.logout')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-md)',
                    background: '#FEE2E2',
                    color: '#DC2626',
                    fontSize: '11px',
                    fontWeight: '700',
                    border: '1px solid #FECACA',
                    cursor: 'pointer',
                  }}
                >
                  <LogOut size={14} />
                  <span>{t('header.logout')}</span>
                </button>
              </div>
            )}

            {variant === 'pharmacy' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Badge variant="success" dot icon={<ShieldCheck size={14} />}>
                  {language === 'ar' ? 'صيدلية مفتوحة' : 'Pharmacie Ouverte'}
                </Badge>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg-surface)',
                    color: '#DC2626',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  <LogOut size={14} />
                  <span>{t('header.logout')}</span>
                </button>
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

            {variant === 'public' && (
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
            )}

            {/* Sélecteur de Langue & Direction Mobile */}
            <div
              style={{
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '4px',
                paddingRight: '4px',
              }}
            >
              <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={16} /> Langue (RTL)
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  type="button"
                  onClick={() => switchLanguage('fr')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '12px',
                    fontWeight: currentLang === 'fr' ? '700' : '500',
                    backgroundColor: currentLang === 'fr' ? 'var(--color-primary)' : 'var(--color-bg-subtle)',
                    color: currentLang === 'fr' ? '#FFFFFF' : 'var(--color-text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Français
                </button>
                <button
                  type="button"
                  onClick={() => switchLanguage('ar')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '12px',
                    fontWeight: currentLang === 'ar' ? '700' : '500',
                    backgroundColor: currentLang === 'ar' ? 'var(--color-primary)' : 'var(--color-bg-subtle)',
                    color: currentLang === 'ar' ? '#FFFFFF' : 'var(--color-text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  العربية
                </button>
              </div>
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
