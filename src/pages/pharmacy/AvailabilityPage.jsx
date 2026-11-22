import React, { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Clock,
  Sparkles,
  ShieldCheck,
  Info,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';
import { usePharmacyStore } from '../../hooks/usePharmacyStore';
import { useToast } from '../../hooks/useToast';

export default function AvailabilityPage() {
  const { stock, stats, updateAvailability } = usePharmacyStore();
  const toast = useToast();
  const [search, setSearch] = useState('');

  const handleStatusChange = (med, newStatus) => {
    updateAvailability(med.id, newStatus);
    const labels = {
      available: 'Disponible',
      low: 'Stock limité',
      unavailable: 'Rupture temporaire',
    };
    toast.success(
      `Disponibilité déclarée pour « ${med.name} » : ${labels[newStatus]}.`,
      'Statut synchronisé'
    );
  };

  const filtered = stock.filter((med) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return med.name.toLowerCase().includes(q) || med.dci.toLowerCase().includes(q);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* En-tête */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', color: '#0F172A', margin: 0 }}>
              Gestion Déclarative des Disponibilités
            </h1>
            <Badge variant="primary" size="sm">
              Visibilité Citoyenne
            </Badge>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            Déclarez en un clic l'état réel de délivrance de vos produits pour orienter efficacement les patients tunisiens.
          </p>
        </div>
      </div>

      {/* Avertissement déontologique */}
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: 'var(--font-size-xs)',
          color: '#1E40AF',
        }}
      >
        <Info size={16} color="#2563EB" style={{ flexShrink: 0 }} />
        <span>
          <strong>Réglementation pharmaceutique :</strong> La mise à jour des disponibilités engage l'officine dans le cadre du réseau citoyen PharmaCityTN. En cas de rupture inopinée, pensez à basculer la référence en « Rupture » pour éviter les déplacements inutiles des patients.
        </span>
      </div>

      {/* Recherche */}
      <div style={{ maxWidth: '420px' }}>
        <SearchBar
          placeholder="Rechercher une référence à mettre à jour..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />
      </div>

      {/* Liste des bascules rapides */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map((med) => (
          <div
            key={med.id}
            style={{
              padding: '14px 18px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ fontSize: '15px', color: '#0F172A' }}>{med.name}</strong>
                <span style={{ fontSize: '12px', color: '#64748B' }}>({med.dosage})</span>
                {med.prescriptionRequired && (
                  <Badge variant="danger" size="sm">
                    Ordonnance
                  </Badge>
                )}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                {med.dci} • Réf : {med.reference} • Stock déclaré : <strong>{med.quantity} boîtes</strong>
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                Dernière confirmation : {med.lastUpdate}
              </div>
            </div>

            {/* Sélecteur 1-clic */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleStatusChange(med, 'available')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  border: med.status === 'available' ? '1.5px solid #16A34A' : '1px solid #CBD5E1',
                  backgroundColor: med.status === 'available' ? '#DCFCE7' : '#FFFFFF',
                  color: med.status === 'available' ? '#166534' : '#64748B',
                  transition: 'all 0.15s ease',
                }}
              >
                <CheckCircle2 size={14} color={med.status === 'available' ? '#16A34A' : 'currentColor'} />
                Disponible
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange(med, 'low')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  border: med.status === 'low' ? '1.5px solid #D97706' : '1px solid #CBD5E1',
                  backgroundColor: med.status === 'low' ? '#FEF3C7' : '#FFFFFF',
                  color: med.status === 'low' ? '#B45309' : '#64748B',
                  transition: 'all 0.15s ease',
                }}
              >
                <AlertTriangle size={14} color={med.status === 'low' ? '#D97706' : 'currentColor'} />
                Stock limité
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange(med, 'unavailable')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  border: med.status === 'unavailable' ? '1.5px solid #DC2626' : '1px solid #CBD5E1',
                  backgroundColor: med.status === 'unavailable' ? '#FEE2E2' : '#FFFFFF',
                  color: med.status === 'unavailable' ? '#991B1B' : '#64748B',
                  transition: 'all 0.15s ease',
                }}
              >
                <XCircle size={14} color={med.status === 'unavailable' ? '#DC2626' : 'currentColor'} />
                Rupture
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
