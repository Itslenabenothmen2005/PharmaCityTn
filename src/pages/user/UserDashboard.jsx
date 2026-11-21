import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Heart,
  Clock,
  Bell,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Info,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';
import MedicineCard from '../../components/user/MedicineCard';
import MedicineDetailsModal from '../../components/user/MedicineDetailsModal';
import { useUserStore } from '../../hooks/useUserStore';

export default function UserDashboard() {
  const navigate = useNavigate();
  const { profile, favoriteMedicines, recentMedicines, notifications, unreadCount } = useUserStore();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = (med) => {
    setSelectedMedicine(med);
    setIsModalOpen(true);
  };

  const handleQuickSearch = (term) => {
    if (term && term.trim()) {
      navigate(`/user/search?q=${encodeURIComponent(term.trim())}`);
    } else {
      navigate('/user/search');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xl)' }}>
      {/* ======================================================================
          1. MESSAGE DE BIENVENUE & BANDEAU CONTEXTUEL
          ====================================================================== */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', margin: 0 }}>
              Bienvenue, {profile.name} 👋
            </h1>
            <Badge variant="primary" size="sm">
              Espace Citoyen
            </Badge>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            Localisez vos médicaments et consultez les stocks déclarés dans les officines de votre secteur ({profile.city || 'Tunisie'}).
          </p>
        </div>

        <Link to="/user/search" style={{ textDecoration: 'none' }}>
          <Button variant="primary" icon={Search}>
            Nouvelle recherche
          </Button>
        </Link>
      </div>

      {/* Avertissement déontologique discret */}
      <div
        style={{
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-primary-light)',
          border: '1px solid var(--color-success-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-primary-dark)',
        }}
      >
        <Info size={16} color="var(--color-primary)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Rappel santé :</strong> Les disponibilités sont déclaratives et ne garantissent pas la délivrance.
          Contactez l'officine pour confirmer la disponibilité avant tout déplacement.
        </span>
      </div>

      {/* ======================================================================
          2. BARRE DE RECHERCHE RAPIDE
          ====================================================================== */}
      <Card padding="md">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
            Recherche rapide d'un médicament :
          </span>
          <SearchBar
            size="md"
            placeholder="Saisissez un nom commercial (ex: Doliprane), molécule ou dosage..."
            onSearch={handleQuickSearch}
            suggestions={['Doliprane 1000', 'Augmentin 1g', 'Maxilase', 'Panadol Extra', 'Inexium']}
            onSelectSuggestion={(s) => handleQuickSearch(s)}
          />
        </div>
      </Card>

      {/* ======================================================================
          3. CARTES STATISTIQUES / SYNTHÈSE
          ====================================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
        }}
      >
        <Card padding="md" hoverable onClick={() => navigate('/user/favorites')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FEE2E2',
                color: '#EF4444',
              }}
            >
              <Heart size={20} fill="#EF4444" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Médicaments favoris</div>
              <strong style={{ fontSize: '20px', color: 'var(--color-text-primary)' }}>
                {favoriteMedicines.length} {favoriteMedicines.length > 1 ? 'produits' : 'produit'}
              </strong>
            </div>
          </div>
        </Card>

        <Card padding="md" hoverable onClick={() => navigate('/user/notifications')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: unreadCount > 0 ? '#FEF2F2' : 'var(--color-info-light)',
                color: unreadCount > 0 ? 'var(--color-danger)' : 'var(--color-info)',
              }}
            >
              <Bell size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Alertes disponibilité</div>
              <strong style={{ fontSize: '20px', color: 'var(--color-text-primary)' }}>
                {unreadCount > 0 ? `${unreadCount} non lues` : 'À jour'}
              </strong>
            </div>
          </div>
        </Card>

        <Card padding="md" hoverable onClick={() => navigate('/user/search')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
              }}
            >
              <Clock size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Consultés récemment</div>
              <strong style={{ fontSize: '20px', color: 'var(--color-text-primary)' }}>
                {recentMedicines.length} références
              </strong>
            </div>
          </div>
        </Card>
      </div>

      {/* ======================================================================
          4. MÉDICAMENTS RÉCEMMENT CONSULTÉS
          ====================================================================== */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="var(--color-primary)" />
            <h2 style={{ fontSize: 'var(--font-size-lg)', margin: 0 }}>
              Médicaments récemment consultés
            </h2>
          </div>
          <Link
            to="/user/search"
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Explorer tout le catalogue <ArrowRight size={14} />
          </Link>
        </div>

        {recentMedicines.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {recentMedicines.slice(0, 3).map((med) => (
              <MedicineCard key={med.id} medicine={med} onViewPharmacies={handleOpenDetails} />
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: '24px',
              textAlign: 'center',
              color: 'var(--color-text-secondary)',
              backgroundColor: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Aucun médicament consulté récemment. Utilisez la barre de recherche ci-dessus pour démarrer.
          </div>
        )}
      </div>

      {/* ======================================================================
          5. MÉDICAMENTS FAVORIS (APERÇU RAPIDE)
          ====================================================================== */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={18} color="#EF4444" fill="#EF4444" />
            <h2 style={{ fontSize: 'var(--font-size-lg)', margin: 0 }}>
              Mes médicaments favoris ({favoriteMedicines.length})
            </h2>
          </div>
          <Link
            to="/user/favorites"
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Gérer mes favoris <ArrowRight size={14} />
          </Link>
        </div>

        {favoriteMedicines.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {favoriteMedicines.slice(0, 3).map((med) => (
              <MedicineCard key={med.id} medicine={med} onViewPharmacies={handleOpenDetails} />
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: '24px',
              textAlign: 'center',
              color: 'var(--color-text-secondary)',
              backgroundColor: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Vous n'avez pas encore de favoris enregistrés. Cliquez sur le cœur d'un médicament pour le suivre.
          </div>
        )}
      </div>

      {/* ======================================================================
          6. NOTIFICATIONS RÉCENTES (APERÇU)
          ====================================================================== */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} color="var(--color-primary)" />
            <h2 style={{ fontSize: 'var(--font-size-lg)', margin: 0 }}>
              Derniers changements de disponibilité
            </h2>
          </div>
          <Link
            to="/user/notifications"
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Voir tout l'historique <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {notifications.slice(0, 3).map((notif) => (
            <div
              key={notif.id}
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: notif.read ? 'var(--color-bg-surface)' : 'var(--color-bg-subtle)',
                border: `1px solid ${notif.read ? 'var(--color-border-subtle)' : 'var(--color-primary-light)'}`,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div
                  style={{
                    padding: '6px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor:
                      notif.type === 'success'
                        ? 'var(--color-success-light)'
                        : notif.type === 'warning'
                        ? 'var(--color-warning-light)'
                        : 'var(--color-danger-light)',
                    color:
                      notif.type === 'success'
                        ? 'var(--color-success)'
                        : notif.type === 'warning'
                        ? 'var(--color-warning)'
                        : 'var(--color-danger)',
                    marginTop: '2px',
                  }}
                >
                  {notif.type === 'success' ? (
                    <CheckCircle2 size={16} />
                  ) : notif.type === 'warning' ? (
                    <AlertTriangle size={16} />
                  ) : (
                    <Bell size={16} />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                    {notif.title} — <span style={{ color: 'var(--color-primary)' }}>{notif.medicineName}</span>
                  </div>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                    {notif.message}
                  </p>
                </div>
              </div>

              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                {notif.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MODALE DE DÉTAILS DU MÉDICAMENT */}
      <MedicineDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        medicine={selectedMedicine}
      />
    </div>
  );
}
