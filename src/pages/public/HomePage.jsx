import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  MapPin,
  Pill,
  Building2,
  User,
  ShieldCheck,
  Heart,
  Bell,
  Package,
  Layers,
  Sparkles,
  ArrowRight,
  Send,
  SlidersHorizontal,
} from 'lucide-react';
import Logo from '../../components/common/Logo';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import SearchBar from '../../components/common/SearchBar';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';
import EmptyState from '../../components/common/EmptyState';
import { useToast } from '../../hooks/useToast';

export default function HomePage() {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [demoInput, setDemoInput] = useState('');
  const [demoError, setDemoError] = useState('');

  const handleSearch = (query) => {
    toast.info(`Recherche simulée pour : "${query || 'Tous les médicaments'}"`, 'Recherche');
  };

  const handleTestLoading = () => {
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      toast.success('Action terminée avec succès !', 'Chargement');
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100%' }}>
      {/* ==========================================================================
          HERO SECTION PHARMACITYTN
          ========================================================================== */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--color-primary-light) 0%, var(--color-bg) 100%)',
          padding: 'var(--spacing-3xl) 0 var(--spacing-2xl)',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '860px' }}>
          {/* Tagline / Badge Supérieur */}
          <div style={{ display: 'inline-flex', marginBottom: 'var(--spacing-md)' }}>
            <Badge variant="primary" size="md" icon={<Sparkles size={14} />}>
              Plateforme Santé Officielle en Tunisie
            </Badge>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 'var(--font-weight-extrabold)',
              color: 'var(--color-text-primary)',
              lineHeight: 1.15,
              marginBottom: 'var(--spacing-md)',
            }}
          >
            Trouvez vos médicaments disponibles{' '}
            <span style={{ color: 'var(--color-primary)' }}>en pharmacie</span> en Tunisie
          </h1>

          <p
            style={{
              fontSize: 'var(--font-size-lg)',
              color: 'var(--color-text-secondary)',
              maxWidth: '680px',
              margin: '0 auto var(--spacing-xl)',
              lineHeight: 'var(--line-height-relaxed)',
            }}
          >
            Vérifiez en temps réel la disponibilité des stocks dans les officines les plus proches,
            localisez les pharmacies de garde et gagnez du temps.
          </p>

          {/* SearchBar Principale Réutilisable */}
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto var(--spacing-xl)',
            }}
          >
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
              size="lg"
              placeholder="Rechercher par nom de médicament, DCI ou laboratoire..."
              suggestions={['Doliprane 1000', 'Augmentin 1g', 'Maxilase', 'Panadol', 'Paracétamol']}
              onSelectSuggestion={(item) => {
                setSearchQuery(item);
                handleSearch(item);
              }}
            />
          </div>

          {/* Raccourcis Rapides vers les Espaces */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to="/user/search" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="md" icon={Search}>
                Recherche Médicaments
              </Button>
            </Link>
            <Link to="/user/dashboard" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="md" icon={User}>
                Espace Citoyen
              </Button>
            </Link>
            <Link to="/pharmacy/dashboard" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="md" icon={Building2}>
                Espace Pharmacie
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SHOWCASE DU DESIGN SYSTEM REUTILISABLE
          ========================================================================== */}
      <section className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <Badge variant="neutral" size="sm">
            Architecture Frontend
          </Badge>
          <h2
            style={{
              fontSize: 'var(--font-size-3xl)',
              marginTop: 'var(--spacing-xs)',
              marginBottom: 'var(--spacing-xs)',
            }}
          >
            Design System PharmaCityTN
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Composants UI modulaires, accessibles et conformes aux exigences du domaine médical
          </p>
        </div>

        {/* 1. PALETTE DE COULEURS OFFICIELLE */}
        <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
          <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-md)' }}>
            🎨 1. Palette de Couleurs
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
              gap: '12px',
            }}
          >
            {[
              { name: 'Vert principal', hex: '#168B70', bg: '#168B70', text: '#FFFFFF', desc: 'Action & Marque' },
              { name: 'Vert foncé', hex: '#116B58', bg: '#116B58', text: '#FFFFFF', desc: 'Survol & Accent' },
              { name: 'Vert clair', hex: '#E8F5F0', bg: '#E8F5F0', text: '#116B58', desc: 'Fonds doux & Badges' },
              { name: 'Blanc', hex: '#FFFFFF', bg: '#FFFFFF', text: '#0F172A', border: true, desc: 'Surfaces cartes' },
              { name: 'Fond app', hex: '#F7F9F8', bg: '#F7F9F8', text: '#0F172A', border: true, desc: 'Arrière-plan' },
              { name: 'Texte secondaire', hex: '#64748B', bg: '#64748B', text: '#FFFFFF', desc: 'Labels & Légendes' },
              { name: 'Rouge Erreur', hex: '#EF4444', bg: '#EF4444', text: '#FFFFFF', desc: 'Rupture & Alertes' },
              { name: 'Orange Stock', hex: '#F59E0B', bg: '#F59E0B', text: '#FFFFFF', desc: 'Stocks faibles' },
            ].map((col) => (
              <div
                key={col.hex}
                style={{
                  backgroundColor: col.bg,
                  color: col.text,
                  padding: '16px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: col.border ? '1px solid var(--color-border)' : 'none',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{col.name}</span>
                <span style={{ fontSize: '11px', opacity: 0.9, fontFamily: 'var(--font-family-mono)' }}>
                  {col.hex}
                </span>
                <span style={{ fontSize: '10px', opacity: 0.8, marginTop: 'auto' }}>{col.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. BOUTONS REUTILISABLES */}
        <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
          <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-md)' }}>
            🔘 2. Boutons Réutilisables (`Button`)
          </h3>
          <Card padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>
                  Variantes de styles :
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <Button variant="primary">Bouton Primary</Button>
                  <Button variant="secondary">Bouton Secondary</Button>
                  <Button variant="outline">Bouton Outline</Button>
                  <Button variant="ghost">Bouton Ghost</Button>
                  <Button variant="danger">Bouton Danger</Button>
                  <Button variant="warning">Bouton Warning</Button>
                </div>
              </div>

              <div>
                <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>
                  Tailles & États Interactifs :
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button size="sm" icon={Pill}>
                    Taille Small (sm)
                  </Button>
                  <Button size="md" icon={Search}>
                    Taille Medium (md)
                  </Button>
                  <Button size="lg" icon={Heart}>
                    Taille Large (lg)
                  </Button>
                  <Button
                    variant="primary"
                    loading={btnLoading}
                    onClick={handleTestLoading}
                    icon={Send}
                  >
                    {btnLoading ? 'Chargement...' : 'Tester Loading State'}
                  </Button>
                  <Button variant="primary" disabled>
                    Désactivé
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 3. BADGES DE STATUT */}
        <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
          <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-md)' }}>
            🏷️ 3. Badges de Disponibilité & Statut (`Badge`)
          </h3>
          <Card padding="md">
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Badge variant="success" dot icon={<CheckCircle2 size={13} />}>
                Disponible (En stock)
              </Badge>
              <Badge variant="warning" dot icon={<AlertTriangle size={13} />}>
                Stock faible (&lt; 5 boîtes)
              </Badge>
              <Badge variant="danger" dot icon={<XCircle size={13} />}>
                Rupture de stock
              </Badge>
              <Badge variant="info" icon={<Clock size={13} />}>
                Pharmacie de nuit
              </Badge>
              <Badge variant="primary">Espace Officine</Badge>
              <Badge variant="neutral">Générique disponible</Badge>
              <Badge variant="success" size="sm" dot>
                Ouverte
              </Badge>
              <Badge variant="danger" size="sm" dot>
                Fermée
              </Badge>
            </div>
          </Card>
        </div>

        {/* 4. CARTES METIER EXEMPLES */}
        <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
          <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-md)' }}>
            🃏 4. Cartes Réutilisables (`Card`)
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Carte Médicament */}
            <Card
              hoverable
              title="Doliprane 1000 mg"
              subtitle="Paracétamol — Comprimés effervescents (Boîte de 8)"
              icon={<Pill size={20} />}
              headerAction={<Badge variant="success" dot>Disponible</Badge>}
              footer={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                    2.850 TND
                  </span>
                  <Button variant="outline" size="sm" icon={MapPin}>
                    12 pharmacies
                  </Button>
                </div>
              }
            >
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                Indiqué dans le traitement symptomatique des douleurs d'intensité légère à modérée et/ou des états fébriles.
              </p>
            </Card>

            {/* Carte Pharmacie de Garde */}
            <Card
              hoverable
              title="Pharmacie El Manar"
              subtitle="Dr. Nadia Mansour • Tunis"
              icon={<Building2 size={20} />}
              headerAction={<Badge variant="info">Garde de Nuit</Badge>}
              footer={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                    Ouvert jusqu'à 08h00
                  </span>
                  <Button variant="secondary" size="sm">
                    Itinéraire
                  </Button>
                </div>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: 'var(--font-size-xs)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--color-primary)" /> Avenue Habib Bourguiba, El Manar II
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="var(--color-primary)" /> Tél : 71 885 920
                </span>
              </div>
            </Card>

            {/* Carte Rupture de Stock */}
            <Card
              hoverable
              title="Augmentin 1g"
              subtitle="Amoxicilline / Acide clavulanique"
              icon={<AlertTriangle size={20} />}
              headerAction={<Badge variant="danger" dot>Rupture</Badge>}
              footer={
                <Button variant="ghost" size="sm" fullWidth icon={Bell}>
                  Créer une alerte de disponibilité
                </Button>
              }
            >
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                Ce médicament est actuellement indisponible dans votre secteur. Vous pouvez activer une alerte pour être notifié du réapprovisionnement.
              </p>
            </Card>
          </div>
        </div>

        {/* 5. FORMULAIRES & INPUTS */}
        <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
          <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-md)' }}>
            📝 5. Champs de Saisie (`Input`)
          </h3>
          <Card padding="lg">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px',
              }}
            >
              <Input
                label="Champ Standard"
                placeholder="Entrez une valeur..."
                helperText="Texte indicatif sous le champ"
              />
              <Input
                label="Avec Icône & Obligatoire"
                placeholder="Ex : Tunis, Sousse, Sfax..."
                startIcon={<MapPin size={18} />}
                required
              />
              <Input
                label="État avec Erreur de Validation"
                value={demoInput}
                onChange={(e) => {
                  setDemoInput(e.target.value);
                  setDemoError(e.target.value.length < 5 ? 'Le texte doit comporter au moins 5 caractères' : '');
                }}
                error={demoError || 'Exemple : Médicament non reconnu dans la nomenclature'}
              />
              <Input
                label="Champ Désactivé"
                value="Officine agréée #TN-8491"
                disabled
              />
            </div>
          </Card>
        </div>

        {/* 6. MODALE, LOADING, NOTIFICATIONS TOAST & EMPTY STATE */}
        <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
          <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-md)' }}>
            ⚡ 6. Modale, Toasts, Loading & États Vides
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Boîte à Outils Interactive */}
            <Card title="Composants Interactifs" padding="lg">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: 'var(--font-size-xs)' }}>
                  Testez en direct la modale et les notifications toasts personnalisées :
                </p>

                <Button variant="primary" onClick={() => setIsModalOpen(true)} icon={Layers}>
                  Ouvrir la Fenêtre Modale
                </Button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => toast.success('Disponibilité confirmée en pharmacie !')}
                  >
                    Toast Succès
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => toast.warning('Attention : Stock inférieur à 3 unités.')}
                  >
                    Toast Alerte
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => toast.error('Rupture constatée dans tout le gouvernorat.')}
                  >
                    Toast Erreur
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.info('Pharmacie de garde activée à 20h00.')}
                  >
                    Toast Info
                  </Button>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', marginBottom: '8px' }}>
                    Indicateurs de Chargement (`Loading`) :
                  </p>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Loading size="sm" text="Petit" />
                    <Loading size="md" text="Normal" />
                    <div style={{ flex: 1 }}>
                      <Loading type="skeleton" height="18px" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Démonstration EmptyState */}
            <div>
              <EmptyState
                icon={Search}
                title="Aucun médicament trouvé"
                description="Nous n'avons trouvé aucun résultat correspondant à vos critères dans les pharmacies environnantes."
                action={
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => toast.info('Suggestions d’alternatives génériques')}
                  >
                    Voir les alternatives génériques
                  </Button>
                }
              />
            </div>
          </div>
        </div>

        {/* 7. MATRICE COMPLETE DES ROUTES DU PROJET */}
        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-md)' }}>
            🧭 7. Navigation Globale du Projet (Vérification des Routes)
          </h3>
          <Card padding="lg">
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px', fontSize: 'var(--font-size-sm)' }}>
              Toutes les routes principales sont branchées et opérationnelles. Cliquez pour naviguer :
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px',
              }}
            >
              {[
                { path: '/', label: 'Accueil Public', icon: '🏠', desc: 'Page principale' },
                { path: '/login', label: '/login', icon: '🔐', desc: 'Connexion' },
                { path: '/register', label: '/register', icon: '📝', desc: 'Inscription' },
                { path: '/user/dashboard', label: '/user/dashboard', icon: '👤', desc: 'Tableau de bord citoyen' },
                { path: '/user/search', label: '/user/search', icon: '🔍', desc: 'Recherche médicaments' },
                { path: '/user/favorites', label: '/user/favorites', icon: '⭐', desc: 'Pharmacies favorites' },
                { path: '/user/notifications', label: '/user/notifications', icon: '🔔', desc: 'Alertes stock' },
                { path: '/pharmacy/dashboard', label: '/pharmacy/dashboard', icon: '🏥', desc: 'Tableau de bord pharmacien' },
                { path: '/pharmacy/medicines', label: '/pharmacy/medicines', icon: '💊', desc: 'Catalogue officine' },
                { path: '/pharmacy/stock', label: '/pharmacy/stock', icon: '📦', desc: 'Gestion de stock' },
                { path: '/pharmacy/profile', label: '/pharmacy/profile', icon: '🏪', desc: 'Profil officine' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-subtle)',
                    border: '1px solid var(--color-border-subtle)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)';
                    e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{item.icon}</span>
                    <div>
                      <div
                        style={{
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'bold',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {item.label}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={14} color="var(--color-primary)" />
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ==========================================================================
          FENETRE MODALE DE DEMONSTRATION
          ========================================================================== */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Détails de la Pharmacie & Disponibilité"
        description="Informations certifiées transmises par l'officine partenaire"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Fermer
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsModalOpen(false);
                toast.success('Pharmacie ajoutée à vos favoris !');
              }}
              icon={Heart}
            >
              Ajouter aux favoris
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <ShieldCheck size={24} color="var(--color-primary)" />
            <div>
              <strong style={{ color: 'var(--color-primary-dark)', fontSize: 'var(--font-size-sm)' }}>
                Pharmacie Conventionnée CNAM & MSP
              </strong>
              <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                Mise à jour automatique des stocks toutes les 15 minutes.
              </p>
            </div>
          </div>

          <Input
            label="Note personnelle / Mémo"
            placeholder="Ex : Récupérer après 18h..."
            helperText="Visible uniquement depuis votre espace citoyen"
          />

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Badge variant="success" dot>En stock : 14 boîtes</Badge>
            <Badge variant="info">Prix conventionné</Badge>
          </div>
        </div>
      </Modal>
    </div>
  );
}
