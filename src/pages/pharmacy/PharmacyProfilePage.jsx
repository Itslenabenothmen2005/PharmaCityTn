import React, { useState } from 'react';
import {
  Store,
  MapPin,
  Phone,
  Clock,
  User,
  ShieldCheck,
  Edit2,
  Save,
  CheckCircle2,
  Building2,
  Mail,
  AlertCircle,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { pharmacyProfile as initialProfile } from '../../data/pharmacyStock';
import { useToast } from '../../hooks/useToast';

export default function PharmacyProfilePage() {
  const toast = useToast();
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...initialProfile });

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(editData);
    setIsEditing(false);
    toast.success('Les coordonnées de l’officine ont été mises à jour.', 'Profil actualisé');
  };

  const handleToggleDuty = () => {
    const updatedDuty = !profile.isDuty;
    const updated = {
      ...profile,
      isDuty: updatedDuty,
      status: updatedDuty ? 'duty' : 'open',
    };
    setProfile(updated);
    setEditData(updated);
    toast.info(
      `Statut de garde ${updatedDuty ? 'activé (Garde de nuit / week-end)' : 'désactivé (Régime normal)'}.`,
      'Statut officiel'
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* En-tête de la page */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', color: '#0F172A', margin: 0 }}>
              Profil de l’Officine & Accréditation
            </h1>
            <Badge variant="success" dot size="sm">
              Agrément Ministère de la Santé
            </Badge>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            Coordonnées légales, permanence des soins (garde) et informations destinées aux citoyens.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant={profile.isDuty ? 'warning' : 'outline'}
            onClick={handleToggleDuty}
          >
            {profile.isDuty ? 'Officine de Garde (Actif)' : 'Passer en service de garde'}
          </Button>

          {!isEditing ? (
            <Button variant="primary" icon={Edit2} onClick={() => setIsEditing(true)}>
              Modifier les informations
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              Annuler
            </Button>
          )}
        </div>
      </div>

      {/* Carte Résumé Pharmacie */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0F5244 0%, #168B70 100%)',
          borderRadius: '16px',
          padding: '24px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: '0 4px 20px rgba(15, 82, 68, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.25)',
            }}
          >
            <Store size={32} color="#FFFFFF" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800' }}>{profile.name}</h2>
            <div style={{ fontSize: '13px', opacity: 0.85, marginTop: '4px' }}>
              N° d'enregistrement au Conseil de l'Ordre : <strong>{profile.registrationNumber}</strong>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <span
                style={{
                  fontSize: '11px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontWeight: '600',
                }}
              >
                Gouvernorat : {profile.governorate}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontWeight: '600',
                }}
              >
                Convention CNSS : Active
              </span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Statut actuel de l'officine</div>
          <div style={{ fontSize: '18px', fontWeight: '700', marginTop: '4px' }}>
            {profile.isDuty ? '🌙 Ouverte de Garde (24h/24)' : '☀️ Ouverte au public (Régime Jour)'}
          </div>
        </div>
      </div>

      {/* Formulaire ou affichage des détails */}
      <form onSubmit={handleSave}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Bloc 1: Coordonnées & Localisation */}
          <Card title="Localisation & Contact" icon={<MapPin size={18} />} padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Input
                label="Nom de l'établissement"
                value={editData.name}
                disabled={!isEditing}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />

              <Input
                label="Adresse complète"
                value={editData.address}
                disabled={!isEditing}
                onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Input
                  label="Ville"
                  value={editData.city}
                  disabled={!isEditing}
                  onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                />
                <Input
                  label="Code Postal"
                  value={editData.zipCode}
                  disabled={!isEditing}
                  onChange={(e) => setEditData({ ...editData, zipCode: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Input
                  label="Téléphone d'appel standard"
                  value={editData.phone}
                  disabled={!isEditing}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                />
                <Input
                  label="Ligne d'urgence / Nuit"
                  value={editData.emergencyPhone}
                  disabled={!isEditing}
                  onChange={(e) => setEditData({ ...editData, emergencyPhone: e.target.value })}
                />
              </div>

              <Input
                label="Adresse email officielle"
                value={editData.email}
                disabled={!isEditing}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            </div>
          </Card>

          {/* Bloc 2: Horaires d'ouverture */}
          <Card title="Horaires d’Ouverture" icon={<Clock size={18} />} padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>
                  Lundi au Vendredi
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.schedule.weekdays}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        schedule: { ...editData.schedule, weekdays: e.target.value },
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '6px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                    }}
                  />
                ) : (
                  <strong style={{ fontSize: '15px', color: '#0F172A', display: 'block', marginTop: '4px' }}>
                    {profile.schedule.weekdays}
                  </strong>
                )}
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>
                  Samedi
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.schedule.saturday}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        schedule: { ...editData.schedule, saturday: e.target.value },
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '6px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                    }}
                  />
                ) : (
                  <strong style={{ fontSize: '15px', color: '#0F172A', display: 'block', marginTop: '4px' }}>
                    {profile.schedule.saturday}
                  </strong>
                )}
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>
                  Dimanche & Jours fériés
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.schedule.sunday}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        schedule: { ...editData.schedule, sunday: e.target.value },
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '6px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                    }}
                  />
                ) : (
                  <strong style={{ fontSize: '15px', color: '#0F172A', display: 'block', marginTop: '4px' }}>
                    {profile.schedule.sunday}
                  </strong>
                )}
              </div>
            </div>
          </Card>

          {/* Bloc 3: Corps Médical & Titulaires */}
          <Card title="Pharmacien Responsable" icon={<User size={18} />} padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Input
                label="Pharmacien Titulaire Responsable *"
                value={editData.titular}
                disabled={!isEditing}
                onChange={(e) => setEditData({ ...editData, titular: e.target.value })}
              />

              <Input
                label="Pharmacien Remplaçant / Adjoint"
                value={editData.substitute}
                disabled={!isEditing}
                onChange={(e) => setEditData({ ...editData, substitute: e.target.value })}
              />

              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: 'var(--color-primary-light)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-success-border)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  marginTop: '10px',
                }}
              >
                <ShieldCheck size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-dark)' }}>
                  <strong>Agrément MSP N° 2018-TN-45</strong>
                  <p style={{ margin: '2px 0 0', color: 'var(--color-text-secondary)' }}>
                    Sous contrôle de l'Inspection Pharmaceutique du Ministère de la Santé Publique de la République Tunisienne.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {isEditing && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid #E2E8F0',
            }}
          >
            <Button variant="ghost" type="button" onClick={() => setIsEditing(false)}>
              Annuler
            </Button>
            <Button variant="primary" type="submit" icon={Save}>
              Enregistrer les modifications
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
