import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Clock,
  Trash2,
  Info,
  Search,
  Pill,
} from 'lucide-react';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import MedicineDetailsModal from '../../components/user/MedicineDetailsModal';
import { useUserStore } from '../../hooks/useUserStore';
import { mockMedicines } from '../../data/medicines';
import { useToast } from '../../hooks/useToast';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } =
    useUserStore();

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'unread') return !notif.read;
    if (activeFilter === 'stock') return notif.type === 'success' || notif.type === 'warning';
    if (activeFilter === 'out') return notif.type === 'error';
    return true;
  });

  const handleOpenMedicine = (notif) => {
    markAsRead(notif.id);
    const med = mockMedicines.find((m) => m.id === notif.medicineId);
    if (med) {
      setSelectedMedicine(med);
      setIsModalOpen(true);
    } else {
      navigate(`/user/search?q=${encodeURIComponent(notif.medicineName)}`);
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    deleteNotification(id);
    toast.info('Notification supprimée de l’historique', 'Historique');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      {/* En-tête */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', margin: 0 }}>
              Alertes & Historique des Disponibilités
            </h1>
            {unreadCount > 0 ? (
              <Badge variant="danger" size="sm" dot>
                {unreadCount} nouvelle(s)
              </Badge>
            ) : (
              <Badge variant="success" size="sm">
                À jour
              </Badge>
            )}
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            Suivez les déclarations de retour en stock et les alertes d'approvisionnement des pharmacies partenaires.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button variant="secondary" icon={CheckCheck} onClick={markAllAsRead}>
            Tout marquer comme lu
          </Button>
        )}
      </div>

      {/* Avertissement Déontologique */}
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
          Les notifications sont générées à partir des déclarations volontaires des officines.
          Veuillez toujours joindre la pharmacie par téléphone avant tout déplacement.
        </span>
      </div>

      {/* Onglets de filtrage */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          backgroundColor: 'var(--color-bg-subtle)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          width: 'fit-content',
        }}
      >
        {[
          { id: 'all', label: 'Toutes les alertes', count: notifications.length },
          { id: 'unread', label: 'Non lues', count: unreadCount },
          { id: 'stock', label: 'Mouvements de stock' },
          { id: 'out', label: 'Ruptures signalées' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-semibold)',
              backgroundColor: activeFilter === tab.id ? 'var(--color-white)' : 'transparent',
              color: activeFilter === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              boxShadow: activeFilter === tab.id ? 'var(--shadow-xs)' : 'none',
              cursor: 'pointer',
              border: 'none',
              transition: 'all var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span
                style={{
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: activeFilter === tab.id ? 'var(--color-primary-light)' : 'var(--color-border)',
                  color: activeFilter === tab.id ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)',
                  fontSize: '10px',
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Liste des Notifications */}
      {filteredNotifications.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredNotifications.map((notif) => {
            const config = {
              success: {
                icon: CheckCircle2,
                color: 'var(--color-success)',
                bg: 'var(--color-success-light)',
                badgeVariant: 'success',
                badgeText: 'Disponible',
              },
              warning: {
                icon: AlertTriangle,
                color: 'var(--color-warning)',
                bg: 'var(--color-warning-light)',
                badgeVariant: 'warning',
                badgeText: 'Stock faible',
              },
              error: {
                icon: AlertCircle,
                color: 'var(--color-danger)',
                bg: 'var(--color-danger-light)',
                badgeVariant: 'danger',
                badgeText: 'Rupture',
              },
              info: {
                icon: Bell,
                color: 'var(--color-info)',
                bg: 'var(--color-info-light)',
                badgeVariant: 'info',
                badgeText: 'Officine',
              },
            };

            const current = config[notif.type] || config.info;
            const Icon = current.icon;

            return (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: notif.read ? 'var(--color-bg-surface)' : 'var(--color-white)',
                  border: `1.5px solid ${notif.read ? 'var(--color-border)' : 'var(--color-primary)'}`,
                  boxShadow: notif.read ? 'var(--shadow-xs)' : 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: current.bg,
                      color: current.color,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} strokeWidth={2.2} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)' }}>
                        {notif.title}
                      </strong>
                      <Badge variant={current.badgeVariant} size="sm" dot>
                        {current.badgeText}
                      </Badge>
                      {!notif.read && (
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'var(--color-primary)',
                          }}
                          title="Non lu"
                        />
                      )}
                    </div>

                    <p
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-text-secondary)',
                        margin: '4px 0 8px',
                        lineHeight: 1.5,
                      }}
                    >
                      {notif.message}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {notif.date}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenMedicine(notif);
                        }}
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                          color: 'var(--color-primary)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: 0,
                        }}
                      >
                        <Pill size={12} />
                        Consulter {notif.medicineName}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bouton Supprimer */}
                <button
                  type="button"
                  onClick={(e) => handleDelete(notif.id, e)}
                  aria-label="Supprimer la notification"
                  style={{
                    color: 'var(--color-text-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: 'var(--radius-xs)',
                    flexShrink: 0,
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-danger)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title="Aucune notification dans cette catégorie"
          description="Vous recevrez ici les alertes de réapprovisionnement et les signalements d'indisponibilité pour vos médicaments suivis."
          action={
            <Button variant="secondary" onClick={() => setActiveFilter('all')}>
              Afficher toutes les alertes
            </Button>
          }
        />
      )}

      {/* Modale de détails du médicament */}
      <MedicineDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        medicine={selectedMedicine}
      />
    </div>
  );
}
