import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Building2,
  User,
  Phone,
  PhoneCall,
  MapPin,
  Plus,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  AlertCircle,
  Info,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import { useUserStore } from '../../hooks/useUserStore';
import { useToast } from '../../hooks/useToast';

export default function RequestsTrackingPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { requests } = useUserStore();

  const [activeTab, setActiveTab] = useState('all');
  const [expandedNotifs, setExpandedNotifs] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrage selon les statuts requis
  const filteredRequests = requests.filter((req) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') {
      return req.status === 'pending_verification' || req.status === 'pending_pharmacy';
    }
    if (activeTab === 'confirmed') return req.status === 'confirmed';
    if (activeTab === 'completed') return req.status === 'completed';
    if (activeTab === 'rejected') return req.status === 'rejected';
    return true;
  });

  const toggleNotifPanel = (id) => {
    setExpandedNotifs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending_verification':
        return <Badge variant="warning" dot>En attente de vérification</Badge>;
      case 'pending_pharmacy':
        return <Badge variant="info" dot>En attente confirmation pharmacie</Badge>;
      case 'confirmed':
        return <Badge variant="success" dot>Confirmée (Prête pour retrait)</Badge>;
      case 'rejected':
        return <Badge variant="danger" dot>Refusée</Badge>;
      case 'completed':
        return <Badge variant="neutral">Terminée (Retirée)</Badge>;
      default:
        return <Badge variant="primary">{status}</Badge>;
    }
  };

  const handleCall = (phone, name, e) => {
    e.stopPropagation();
    toast.info(`Appel vers ${name} : ${phone}`, 'Appel');
    window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      {/* En-tête de la page */}
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
              Suivi de mes Demandes de Médicaments
            </h1>
            <Badge variant="primary" size="sm">
              {requests.length} demande(s)
            </Badge>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            Consultez le statut des mises à disposition de médicaments en temps réel dans les officines.
          </p>
        </div>

        <Link to="/user/request" style={{ textDecoration: 'none' }}>
          <Button variant="primary" icon={Plus}>
            Nouvelle demande
          </Button>
        </Link>
      </div>

      {/* RAPPEL STRICT DU RETRAIT PHYSIQUE AU COMPTOIR */}
      <div
        style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: 'var(--font-size-xs)',
          color: '#1E40AF',
        }}
      >
        <Building2 size={18} color="#1D4ED8" style={{ flexShrink: 0 }} />
        <span>
          <strong>Retrait physique obligatoire au comptoir :</strong> Le bénéficiaire désigné doit
          récupérer personnellement les médicaments à la pharmacie partenaire muni d'une pièce d'identité
          et de l'ordonnance originale. <strong>Aucune livraison à domicile n'est proposée.</strong>
        </span>
      </div>

      {/* Onglets de filtrage par statut */}
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
          { id: 'all', label: 'Toutes les demandes', count: requests.length },
          {
            id: 'pending',
            label: 'En attente',
            count: requests.filter((r) => r.status === 'pending_verification' || r.status === 'pending_pharmacy').length,
          },
          {
            id: 'confirmed',
            label: 'Confirmées (À retirer)',
            count: requests.filter((r) => r.status === 'confirmed').length,
          },
          {
            id: 'completed',
            label: 'Terminées',
            count: requests.filter((r) => r.status === 'completed').length,
          },
          {
            id: 'rejected',
            label: 'Refusées',
            count: requests.filter((r) => r.status === 'rejected').length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-semibold)',
              backgroundColor: activeTab === tab.id ? 'var(--color-white)' : 'transparent',
              color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              boxShadow: activeTab === tab.id ? 'var(--shadow-xs)' : 'none',
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
                  backgroundColor: activeTab === tab.id ? 'var(--color-primary-light)' : 'var(--color-border)',
                  color: activeTab === tab.id ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)',
                  fontSize: '10px',
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Liste des Demandes */}
      {filteredRequests.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredRequests.map((req) => (
            <Card key={req.id} padding="lg" hoverable>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Ligne 1 : En-tête de la demande */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '10px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        padding: '8px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                      }}
                    >
                      <FileText size={20} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '15px', color: 'var(--color-text-primary)' }}>
                          {req.id}
                        </strong>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                          • {req.createdAt}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                        {req.medicine?.name} {req.medicine?.dosage} ({req.quantity} boîtes) — Total :{' '}
                        <strong>{req.totalAmount}</strong>
                      </div>
                    </div>
                  </div>

                  <div>{getStatusBadge(req.status)}</div>
                </div>

                {/* Ligne 2 : Pharmacie & Distinction des Trois Rôles */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '12px',
                    backgroundColor: 'var(--color-bg-subtle)',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-xs)',
                  }}
                >
                  {/* Pharmacie */}
                  <div>
                    <div style={{ fontWeight: 'bold', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Building2 size={14} color="var(--color-primary)" />
                      {req.pharmacy?.name}
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {req.pharmacy?.address}, {req.pharmacy?.city}
                    </div>
                    <div style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      Tél : {req.pharmacy?.phone}
                    </div>
                  </div>

                  {/* Les 3 Rôles */}
                  <div>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)' }}>Demandeur :</span>{' '}
                      <strong>{req.applicant?.name}</strong>
                    </div>
                    <div style={{ marginTop: '2px' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Payeur :</span>{' '}
                      <strong>{req.payer?.name}</strong>{' '}
                      <span style={{ fontSize: '10px', color: 'var(--color-primary)' }}>
                        ({req.paymentMethod === 'card' ? 'Carte Démo' : 'Espèces'})
                      </span>
                    </div>
                    <div style={{ marginTop: '2px', color: 'var(--color-success-dark)', fontWeight: 'bold' }}>
                      <span style={{ color: 'var(--color-text-muted)', fontWeight: 'normal' }}>Bénéficiaire :</span>{' '}
                      {req.beneficiary?.name} ({req.beneficiary?.phone})
                    </div>
                  </div>
                </div>

                {/* Ligne 3 : Timeline Visuelle des Étapes */}
                {req.timeline && (
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                      ÉTAPES DE LA DEMANDE :
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '6px',
                        overflowX: 'auto',
                        paddingBottom: '4px',
                      }}
                    >
                      {req.timeline.map((step, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            flex: 1,
                            minWidth: '100px',
                          }}
                        >
                          <div
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: step.completed
                                ? 'var(--color-primary)'
                                : step.error
                                ? 'var(--color-danger)'
                                : 'var(--color-border)',
                              color: 'var(--color-white)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              fontWeight: 'bold',
                              marginBottom: '4px',
                            }}
                          >
                            {step.completed ? '✓' : idx + 1}
                          </div>
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: step.current ? 'bold' : 'normal',
                              color: step.current ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)',
                            }}
                          >
                            {step.step}
                          </span>
                          <span style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>
                            {step.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ligne 4 : Volet Notifications Simulées Dépliable */}
                <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => toggleNotifPanel(req.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-primary)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '600',
                      padding: 0,
                    }}
                  >
                    <MessageSquare size={14} />
                    <span>
                      {expandedNotifs[req.id]
                        ? 'Masquer les notifications simulées'
                        : 'Voir les notifications simulées (Demandeur & Bénéficiaire)'}
                    </span>
                    {expandedNotifs[req.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  {expandedNotifs[req.id] && (
                    <div
                      style={{
                        marginTop: '10px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '10px',
                      }}
                    >
                      <div
                        style={{
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--color-bg-subtle)',
                          fontSize: 'var(--font-size-xs)',
                        }}
                      >
                        <div style={{ fontWeight: 'bold', color: 'var(--color-primary-dark)', marginBottom: '2px' }}>
                          📱 Notification Demandeur ({req.applicant?.name})
                        </div>
                        <div style={{ fontWeight: '600' }}>
                          {req.simulatedNotifications?.applicant?.title}
                        </div>
                        <p style={{ margin: '2px 0 0', color: 'var(--color-text-secondary)' }}>
                          {req.simulatedNotifications?.applicant?.message}
                        </p>
                      </div>

                      <div
                        style={{
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: '#F0FDF4',
                          border: '1px solid #BBF7D0',
                          fontSize: 'var(--font-size-xs)',
                        }}
                      >
                        <div style={{ fontWeight: 'bold', color: '#166534', marginBottom: '2px' }}>
                          💬 SMS envoyé au Bénéficiaire ({req.beneficiary?.phone})
                        </div>
                        <div style={{ fontWeight: '600', color: '#14532D' }}>
                          {req.simulatedNotifications?.beneficiary?.title}
                        </div>
                        <p style={{ margin: '2px 0 0', color: '#166534' }}>
                          {req.simulatedNotifications?.beneficiary?.message}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Ligne 5 : Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--color-border-subtle)',
                    gap: '10px',
                    flexWrap: 'wrap',
                  }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={PhoneCall}
                    onClick={(e) => handleCall(req.pharmacy?.phone, req.pharmacy?.name, e)}
                  >
                    Appeler l'officine
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedRequest(req);
                      setIsModalOpen(true);
                    }}
                  >
                    Détails complets
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="Aucune demande trouvée"
          description={
            activeTab === 'all'
              ? 'Vous n’avez encore transmis aucune demande de médicament.'
              : 'Aucune demande ne correspond à ce filtre.'
          }
          action={
            <Link to="/user/request" style={{ textDecoration: 'none' }}>
              <Button variant="primary" icon={Plus}>
                Faire une demande de médicament
              </Button>
            </Link>
          }
        />
      )}

      {/* MODALE DE DÉTAILS D'UNE DEMANDE */}
      {selectedRequest && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Détails de la demande ${selectedRequest.id}`}
          description={`Transmise le ${selectedRequest.createdAt}`}
          footer={
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Fermer
            </Button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: 'var(--font-size-sm)' }}>
            <div>
              <strong>Statut :</strong> {getStatusBadge(selectedRequest.status)}
              <p style={{ color: 'var(--color-text-secondary)', margin: '4px 0 0', fontSize: 'var(--font-size-xs)' }}>
                {selectedRequest.statusDescription}
              </p>
            </div>

            <div style={{ padding: '10px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <strong>Médicament :</strong> {selectedRequest.medicine?.name} {selectedRequest.medicine?.dosage} ({selectedRequest.quantity} boîtes)
              <br />
              <strong>Montant total :</strong> {selectedRequest.totalAmount}
              <br />
              <strong>Paiement :</strong> {selectedRequest.paymentMethod === 'card' ? 'Carte bancaire (Démo)' : 'Espèces à la pharmacie'}
            </div>

            <div style={{ padding: '10px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <strong>Bénéficiaire désigné pour le retrait :</strong> {selectedRequest.beneficiary?.name}
              <br />
              <strong>Numéro de téléphone :</strong> {selectedRequest.beneficiary?.phone}
            </div>

            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              Rappel : Le bénéficiaire doit impérativement se présenter en personne à la pharmacie {selectedRequest.pharmacy?.name}.
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
