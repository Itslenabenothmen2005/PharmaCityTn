import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Eye,
  SlidersHorizontal,
  Zap,
  HeartHandshake,
  CalendarCheck,
  Navigation,
} from 'lucide-react';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import MedicalHeroIllustration from '../../components/common/MedicalHeroIllustration';
import { mockPharmacies } from '../../data/pharmacies';
import { useToast } from '../../hooks/useToast';
import { useLanguage } from '../../context/LanguageContext';

export default function HomePage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { language, isRtl, t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Redirection cohérente de la barre de recherche vers la page de recherche
  const handleSearchSubmit = (term) => {
    const query = term !== undefined ? term : searchQuery;
    if (query && query.trim()) {
      navigate(`/user/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/user/search');
    }
  };

  // Filtrage des pharmacies fictives
  const filteredPharmacies = mockPharmacies.filter((pharma) => {
    if (selectedCity === 'all') return true;
    if (selectedCity === 'open') return pharma.isOpen;
    if (selectedCity === 'night') return pharma.isNightDuty;
    return pharma.city.toLowerCase() === selectedCity.toLowerCase();
  });

  const handleOpenDetails = (pharma) => {
    setSelectedPharmacy(pharma);
    setIsDetailsModalOpen(true);
  };

  const handleCallPharmacy = (pharma, e) => {
    e.stopPropagation();
    toast.info(`Appel vers ${pharma.name} : ${pharma.phone}`, 'Appel Officine');
    window.location.href = `tel:${pharma.phone.replace(/\s+/g, '')}`;
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100%' }}>
      {/* ==========================================================================
          2. SECTION HERO
          ========================================================================== */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--color-primary-light) 0%, var(--color-bg) 100%)',
          padding: 'var(--spacing-3xl) 0 var(--spacing-4xl)',
          borderBottom: '1px solid var(--color-border-subtle)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--spacing-3xl)',
              alignItems: 'center',
            }}
          >
            {/* Colonne Gauche : Titres, Sous-titre & Barre de recherche */}
            <div style={{ maxWidth: '600px' }}>
              <div style={{ display: 'inline-flex', marginBottom: 'var(--spacing-md)' }}>
                <Badge variant="primary" size="md" icon={<Sparkles size={14} />}>
                  {t('hero.badge')}
                </Badge>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.1rem, 4.5vw, 3.25rem)',
                  fontWeight: 'var(--font-weight-extrabold)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                {t('hero.title')}{' '}
                <span style={{ color: 'var(--color-primary)' }}>{t('hero.titleHighlight')}</span>
              </h1>

              <p
                style={{
                  fontSize: 'var(--font-size-lg)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--line-height-relaxed)',
                  marginBottom: 'var(--spacing-xl)',
                }}
              >
                {t('hero.subtitle')}
              </p>

              {/* Barre de recherche centrale */}
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <SearchBar
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onSearch={handleSearchSubmit}
                  size="lg"
                  buttonText={t('hero.searchBtn')}
                  placeholder={t('hero.searchPlaceholder')}
                  suggestions={['Doliprane 1000', 'Augmentin 1g', 'Maxilase', 'Panadol', 'Paracétamol']}
                  onSelectSuggestion={(s) => {
                    setSearchQuery(s);
                    handleSearchSubmit(s);
                  }}
                />
              </div>

              {/* Indicateurs de confiance */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="var(--color-primary)" />
                  <span>{t('hero.cnam')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={16} color="var(--color-primary)" />
                  <span>{t('hero.duty')}</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Illustration médicale moderne */}
            <div>
              <MedicalHeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          3. SECTION « COMMENT ÇA MARCHE ? »
          ========================================================================== */}
      <section
        id="how-it-works"
        style={{
          padding: 'var(--spacing-4xl) 0',
          backgroundColor: 'var(--color-bg-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
            <Badge variant="primary" size="sm">
              {t('how.badge')}
            </Badge>
            <h2
              style={{
                fontSize: 'var(--font-size-3xl)',
                marginTop: 'var(--spacing-xs)',
                marginBottom: 'var(--spacing-xs)',
              }}
            >
              {t('how.title')}
            </h2>
            <p
              style={{
                fontSize: 'var(--font-size-base)',
                color: 'var(--color-text-secondary)',
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              {t('how.subtitle')}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--spacing-xl)',
              position: 'relative',
            }}
          >
            {/* Étape 1 */}
            <Card hoverable padding="lg">
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--spacing-md)',
                  }}
                >
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Search size={26} strokeWidth={2.2} />
                  </div>
                  <span
                    style={{
                      fontSize: 'var(--font-size-2xl)',
                      fontWeight: 'var(--font-weight-extrabold)',
                      color: 'var(--color-primary)',
                      opacity: 0.35,
                      fontFamily: 'var(--font-family-mono)',
                    }}
                  >
                    01
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-xs)',
                  }}
                >
                  {t('how.step1.title')}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 'var(--line-height-relaxed)',
                    margin: 0,
                  }}
                >
                  {t('how.step1.desc')}
                </p>
              </div>
            </Card>

            {/* Étape 2 */}
            <Card hoverable padding="lg">
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--spacing-md)',
                  }}
                >
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Building2 size={26} strokeWidth={2.2} />
                  </div>
                  <span
                    style={{
                      fontSize: 'var(--font-size-2xl)',
                      fontWeight: 'var(--font-weight-extrabold)',
                      color: 'var(--color-primary)',
                      opacity: 0.35,
                      fontFamily: 'var(--font-family-mono)',
                    }}
                  >
                    02
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-xs)',
                  }}
                >
                  {t('how.step2.title')}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 'var(--line-height-relaxed)',
                    margin: 0,
                  }}
                >
                  {t('how.step2.desc')}
                </p>
              </div>
            </Card>

            {/* Étape 3 */}
            <Card hoverable padding="lg">
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--spacing-md)',
                  }}
                >
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PhoneCall size={26} strokeWidth={2.2} />
                  </div>
                  <span
                    style={{
                      fontSize: 'var(--font-size-2xl)',
                      fontWeight: 'var(--font-weight-extrabold)',
                      color: 'var(--color-primary)',
                      opacity: 0.35,
                      fontFamily: 'var(--font-family-mono)',
                    }}
                  >
                    03
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-xs)',
                  }}
                >
                  {t('how.step3.title')}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 'var(--line-height-relaxed)',
                    margin: 0,
                  }}
                >
                  {t('how.step3.desc')}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          4. SECTION AVANTAGES
          ========================================================================== */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
            <Badge variant="neutral" size="sm">
              {t('advantages.badge')}
            </Badge>
            <h2
              style={{
                fontSize: 'var(--font-size-3xl)',
                marginTop: 'var(--spacing-xs)',
                marginBottom: 'var(--spacing-xs)',
              }}
            >
              {t('advantages.title')}
            </h2>
            <p
              style={{
                fontSize: 'var(--font-size-base)',
                color: 'var(--color-text-secondary)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              {t('advantages.subtitle')}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--spacing-xl)',
            }}
          >
            {/* Avantage 1 : Recherche simplifiée */}
            <Card hoverable padding="lg">
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                <Search size={22} />
              </div>
              <h3
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              >
                {t('adv.1.title')}
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                {t('adv.1.desc')}
              </p>
            </Card>

            {/* Avantage 2 : Informations de disponibilité */}
            <Card hoverable padding="lg">
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                <CheckCircle2 size={22} />
              </div>
              <h3
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              >
                {t('adv.2.title')}
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                {t('adv.2.desc')}
              </p>
            </Card>

            {/* Avantage 3 : Gain de temps */}
            <Card hoverable padding="lg">
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                <Zap size={22} />
              </div>
              <h3
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              >
                {t('adv.3.title')}
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                {t('adv.3.desc')}
              </p>
            </Card>

            {/* Avantage 4 : Accès aux informations des pharmacies */}
            <Card hoverable padding="lg">
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                <Building2 size={22} />
              </div>
              <h3
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              >
                {t('adv.4.title')}
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                {t('adv.4.desc')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          5. SECTION PHARMACIES (CARTES FICTIVES)
          ========================================================================== */}
      <section
        style={{
          padding: 'var(--spacing-4xl) 0',
          backgroundColor: 'var(--color-bg-surface)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '16px',
              marginBottom: 'var(--spacing-2xl)',
            }}
          >
            <div>
              <Badge variant="primary" size="sm">
                {t('pharmacies.badge')}
              </Badge>
              <h2
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  marginTop: 'var(--spacing-xs)',
                  marginBottom: 'var(--spacing-2xs)',
                }}
              >
                {t('pharmacies.title')}
              </h2>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                {t('pharmacies.subtitle')}
              </p>
            </div>

            {/* Filtres de sélection rapide */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                backgroundColor: 'var(--color-bg-subtle)',
                padding: '4px',
                borderRadius: 'var(--radius-md)',
              }}
            >
              {[
                { id: 'all', label: t('pharmacies.filter.all') },
                { id: 'open', label: t('pharmacies.filter.open') },
                { id: 'night', label: t('pharmacies.filter.night') },
                { id: 'tunis', label: 'Tunis' },
                { id: 'sousse', label: 'Sousse' },
                { id: 'sfax', label: 'Sfax' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setSelectedCity(filter.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    backgroundColor:
                      selectedCity === filter.id ? 'var(--color-white)' : 'transparent',
                    color:
                      selectedCity === filter.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    boxShadow: selectedCity === filter.id ? 'var(--shadow-xs)' : 'none',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grille des cartes pharmacies */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--spacing-xl)',
            }}
          >
            {filteredPharmacies.map((pharma) => (
              <Card
                key={pharma.id}
                hoverable
                title={pharma.name}
                subtitle={`${pharma.pharmacist} • ${pharma.city}`}
                icon={<Building2 size={20} />}
                headerAction={
                  pharma.isNightDuty ? (
                    <Badge variant="info" dot>
                      Garde 24h/24
                    </Badge>
                  ) : pharma.isOpen ? (
                    <Badge variant="success" dot>
                      Ouverte
                    </Badge>
                  ) : (
                    <Badge variant="danger" dot>
                      Fermée
                    </Badge>
                  )
                }
                footer={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                    }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Eye}
                      onClick={() => handleOpenDetails(pharma)}
                    >
                      Détails
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={PhoneCall}
                      onClick={(e) => handleCallPharmacy(pharma, e)}
                    >
                      Appeler
                    </Button>
                  </div>
                }
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--font-size-xs)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)' }}>
                    <MapPin size={14} color="var(--color-primary)" />
                    <span>{pharma.address}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)' }}>
                    <Clock size={14} color="var(--color-primary)" />
                    <span>{pharma.schedule} • à {pharma.distance}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)' }}>
                    <Phone size={14} color="var(--color-primary)" />
                    <span>{pharma.phone}</span>
                  </div>

                  {/* Tags d'agréments / services */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                    {pharma.features.map((feat) => (
                      <span
                        key={feat}
                        style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: 'var(--color-bg-subtle)',
                          color: 'var(--color-text-secondary)',
                          border: '1px solid var(--color-border-subtle)',
                        }}
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Lien pour rechercher plus de pharmacies */}
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}>
            <Link to="/user/search" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="md" icon={Search}>
                Rechercher une autre pharmacie en Tunisie
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION APPEL À L'ACTION (CTA PHARMACIENS & CITOYENS)
          ========================================================================== */}
      <section
        style={{
          padding: 'var(--spacing-4xl) 0',
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
          color: 'var(--color-white)',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              color: 'var(--color-white)',
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            Vous êtes pharmacien titulaire d'une officine ?
          </h2>
          <p
            style={{
              fontSize: 'var(--font-size-base)',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 'var(--line-height-relaxed)',
              marginBottom: 'var(--spacing-xl)',
            }}
          >
            Rejoignez le réseau PharmaCityTN pour renseigner vos stocks, indiquer vos horaires de garde
            et orienter les patients vers votre établissement en toute simplicité.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button
                variant="secondary"
                size="lg"
                icon={Building2}
                style={{
                  backgroundColor: 'var(--color-white)',
                  color: 'var(--color-primary-dark)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                Inscrire mon officine
              </Button>
            </Link>
            <Link to="/pharmacy/dashboard" style={{ textDecoration: 'none' }}>
              <Button
                variant="outline"
                size="lg"
                style={{
                  color: 'var(--color-white)',
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                Espace Pharmacien
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          MODALE DE DÉTAILS DE PHARMACIE
          ========================================================================== */}
      {selectedPharmacy && (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title={selectedPharmacy.name}
          description={`${selectedPharmacy.pharmacist} • ${selectedPharmacy.city}`}
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsDetailsModalOpen(false)}>
                Fermer
              </Button>
              <Button
                variant="secondary"
                icon={Search}
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  navigate(`/user/search?pharmacy=${encodeURIComponent(selectedPharmacy.name)}`);
                }}
              >
                Voir les stocks
              </Button>
              <Button
                variant="primary"
                icon={PhoneCall}
                onClick={(e) => handleCallPharmacy(selectedPharmacy, e)}
              >
                Appeler l'officine
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} color="var(--color-primary)" />
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                  Officine Agréée Conseil de l'Ordre
                </span>
              </div>
              {selectedPharmacy.isNightDuty ? (
                <Badge variant="info">Garde de Nuit</Badge>
              ) : selectedPharmacy.isOpen ? (
                <Badge variant="success">Ouverte</Badge>
              ) : (
                <Badge variant="danger">Fermée</Badge>
              )}
            </div>

            <div style={{ fontSize: 'var(--font-size-sm)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <strong>Adresse :</strong>
                <p style={{ margin: '2px 0 0', color: 'var(--color-text-secondary)' }}>
                  {selectedPharmacy.address}, {selectedPharmacy.region}
                </p>
              </div>

              <div>
                <strong>Horaires & Garde :</strong>
                <p style={{ margin: '2px 0 0', color: 'var(--color-text-secondary)' }}>
                  {selectedPharmacy.schedule}
                </p>
              </div>

              <div>
                <strong>Contact Téléphonique :</strong>
                <p style={{ margin: '2px 0 0', color: 'var(--color-text-primary)', fontWeight: 'bold' }}>
                  {selectedPharmacy.phone}
                </p>
              </div>

              <div>
                <strong>Services disponibles :</strong>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {selectedPharmacy.features.map((f) => (
                    <Badge key={f} variant="neutral" size="sm">
                      {f}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
