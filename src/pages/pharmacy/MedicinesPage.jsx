import React, { useState, useMemo } from 'react';
import {
  Pill,
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  MoreVertical,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';
import EmptyState from '../../components/common/EmptyState';
import MedicineFormModal from '../../components/pharmacy/MedicineFormModal';
import { usePharmacyStore } from '../../hooks/usePharmacyStore';
import { useToast } from '../../hooks/useToast';

const ITEMS_PER_PAGE = 7;

export default function MedicinesPage() {
  const { stock, stats, addMedicine, updateQuantity, deleteMedicine } = usePharmacyStore();
  const toast = useToast();

  // État filtres et recherche
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | available | low | unavailable
  const [prescriptionFilter, setPrescriptionFilter] = useState('all'); // all | rx | otc
  const [currentPage, setCurrentPage] = useState(1);

  // État de la modale d'ajout / édition
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);

  // Tri
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Filtrage
  const filteredMedicines = useMemo(() => {
    return stock.filter((med) => {
      // Recherche
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = med.name.toLowerCase().includes(q);
        const matchesDci = med.dci.toLowerCase().includes(q);
        const matchesRef = med.reference.toLowerCase().includes(q);
        const matchesForm = med.form.toLowerCase().includes(q);
        if (!matchesName && !matchesDci && !matchesRef && !matchesForm) return false;
      }

      // Filtre statut
      if (statusFilter !== 'all' && med.status !== statusFilter) return false;

      // Filtre ordonnance
      if (prescriptionFilter === 'rx' && !med.prescriptionRequired) return false;
      if (prescriptionFilter === 'otc' && med.prescriptionRequired) return false;

      return true;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [stock, searchQuery, statusFilter, prescriptionFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE) || 1;
  const paginatedMedicines = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMedicines.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMedicines, currentPage]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleOpenAdd = () => {
    setEditingMedicine(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (med) => {
    setEditingMedicine(med);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editingMedicine) {
      // Modification
      updateQuantity(editingMedicine.id, data.quantity);
      toast.success(`Le médicament « ${data.name} » a été mis à jour avec succès.`, 'Modification enregistrée');
    } else {
      // Ajout
      addMedicine(data);
      toast.success(`Le médicament « ${data.name} » a été ajouté au catalogue.`, 'Nouveau médicament');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Confirmez-vous la suppression de « ${name} » du catalogue de votre officine ?`)) {
      deleteMedicine(id);
      toast.info(`La référence « ${name} » a été retirée du catalogue.`, 'Suppression');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* En-tête */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', color: '#0F172A', margin: 0 }}>
              Catalogue des Médicaments
            </h1>
            <Badge variant="primary" size="sm">
              {stock.length} références
            </Badge>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
            Nomenclature, gestion des fiches produits et synchronisation des disponibilités déclarées.
          </p>
        </div>

        <Button variant="primary" icon={Plus} onClick={handleOpenAdd}>
          Ajouter un médicament
        </Button>
      </div>

      {/* Barre de recherche & Filtres */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          backgroundColor: '#F8FAFC',
          padding: '16px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <SearchBar
              placeholder="Rechercher par nom commercial, DCI, forme ou référence..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              onClear={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Filtres par boutons de statut */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'Tous', count: stats.total },
              { id: 'available', label: 'Disponibles', count: stats.available, color: '#16A34A' },
              { id: 'low', label: 'Stock limité', count: stats.low, color: '#D97706' },
              { id: 'unavailable', label: 'Rupture', count: stats.unavailable, color: '#DC2626' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setStatusFilter(f.id);
                  setCurrentPage(1);
                }}
                style={{
                  padding: '7px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                  fontWeight: statusFilter === f.id ? '700' : '500',
                  border: statusFilter === f.id ? '1.5px solid var(--color-primary)' : '1px solid #CBD5E1',
                  backgroundColor: statusFilter === f.id ? 'var(--color-primary-light)' : '#FFFFFF',
                  color: statusFilter === f.id ? 'var(--color-primary-dark)' : '#475569',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{f.label}</span>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    backgroundColor: statusFilter === f.id ? 'var(--color-primary)' : '#F1F5F9',
                    color: statusFilter === f.id ? '#FFFFFF' : '#64748B',
                    fontWeight: 'bold',
                  }}
                >
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          {/* Filtre Ordonnance */}
          <select
            value={prescriptionFilter}
            onChange={(e) => {
              setPrescriptionFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              fontSize: '12px',
              color: '#334155',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="all">Prescription : Toutes</option>
            <option value="rx">Sur ordonnance obligatoire</option>
            <option value="otc">Vente libre</option>
          </select>
        </div>
      </div>

      {/* TABLEAU PROFESSIONNEL DES MÉDICAMENTS */}
      {paginatedMedicines.length > 0 ? (
        <div
          style={{
            overflowX: 'auto',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: '#F8FAFC',
                  borderBottom: '2px solid #E2E8F0',
                  color: '#475569',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <th
                  onClick={() => handleSort('name')}
                  style={{ padding: '12px 16px', cursor: 'pointer', userSelect: 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Nom commercial <ArrowUpDown size={12} />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('dci')}
                  style={{ padding: '12px 16px', cursor: 'pointer', userSelect: 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Principe Actif (DCI) <ArrowUpDown size={12} />
                  </div>
                </th>
                <th style={{ padding: '12px 16px' }}>Dosage & Forme</th>
                <th
                  onClick={() => handleSort('quantity')}
                  style={{ padding: '12px 16px', cursor: 'pointer', userSelect: 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Stock <ArrowUpDown size={12} />
                  </div>
                </th>
                <th style={{ padding: '12px 16px' }}>Disponibilité</th>
                <th style={{ padding: '12px 16px' }}>Dernière MàJ</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMedicines.map((med, index) => {
                const isEven = index % 2 === 0;
                return (
                  <tr
                    key={med.id}
                    style={{
                      backgroundColor: isEven ? '#FFFFFF' : '#FDFDFD',
                      borderBottom: '1px solid #F1F5F9',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = isEven ? '#FFFFFF' : '#FDFDFD')
                    }
                  >
                    {/* Nom commercial */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ color: '#0F172A', fontSize: '14px' }}>{med.name}</strong>
                          {med.prescriptionRequired && (
                            <span
                              title="Ordonnance requise"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '1px 5px',
                                borderRadius: '4px',
                                backgroundColor: '#FEE2E2',
                                color: '#991B1B',
                                fontSize: '10px',
                                fontWeight: '700',
                              }}
                            >
                              Rx
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                          Réf : {med.reference} • {med.supplier || 'Laboratoire National'}
                        </span>
                      </div>
                    </td>

                    {/* DCI */}
                    <td style={{ padding: '14px 16px', color: '#334155' }}>
                      <div style={{ fontWeight: '500' }}>{med.dci}</div>
                    </td>

                    {/* Dosage & Forme */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ color: '#0F172A', fontWeight: '500' }}>{med.dosage}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{med.form}</div>
                    </td>

                    {/* Quantité */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            color:
                              med.quantity === 0
                                ? '#DC2626'
                                : med.quantity <= med.lowStockThreshold
                                ? '#D97706'
                                : '#166534',
                          }}
                        >
                          {med.quantity}
                        </span>
                        <span style={{ fontSize: '11px', color: '#64748B' }}>boîte{med.quantity > 1 ? 's' : ''}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: '#94A3B8' }}>
                        Seuil : {med.lowStockThreshold}
                      </div>
                    </td>

                    {/* Disponibilité */}
                    <td style={{ padding: '14px 16px' }}>
                      {med.status === 'available' ? (
                        <Badge variant="success" dot size="sm">
                          Disponible
                        </Badge>
                      ) : med.status === 'low' ? (
                        <Badge variant="warning" dot size="sm">
                          Stock limité
                        </Badge>
                      ) : (
                        <Badge variant="danger" dot size="sm">
                          Rupture
                        </Badge>
                      )}
                    </td>

                    {/* Dernière mise à jour */}
                    <td style={{ padding: '14px 16px', color: '#64748B', fontSize: '12px' }}>
                      {med.lastUpdate}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(med)}
                          style={{
                            padding: '6px',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            color: '#0F172A',
                            cursor: 'pointer',
                          }}
                          title="Modifier les informations"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(med.id, med.name)}
                          style={{
                            padding: '6px',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid #FECACA',
                            backgroundColor: '#FFF5F5',
                            color: '#DC2626',
                            cursor: 'pointer',
                          }}
                          title="Retirer du catalogue"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="Aucun médicament trouvé"
          description="Aucune référence ne correspond à votre recherche ou aux filtres actifs."
          actionLabel="Réinitialiser les filtres"
          onAction={() => {
            setSearchQuery('');
            setStatusFilter('all');
            setPrescriptionFilter('all');
          }}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: '#F8FAFC',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            Affichage de {(currentPage - 1) * ITEMS_PER_PAGE + 1} à{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredMedicines.length)} sur{' '}
            {filteredMedicines.length} médicaments
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #CBD5E1',
                backgroundColor: currentPage === 1 ? '#F1F5F9' : '#FFFFFF',
                color: currentPage === 1 ? '#94A3B8' : '#334155',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '12px',
              }}
            >
              <ChevronLeft size={14} /> Précédent
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: 'var(--radius-md)',
                  border: currentPage === page ? '1px solid var(--color-primary)' : '1px solid #CBD5E1',
                  backgroundColor: currentPage === page ? 'var(--color-primary)' : '#FFFFFF',
                  color: currentPage === page ? '#FFFFFF' : '#334155',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: currentPage === page ? '700' : '500',
                }}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #CBD5E1',
                backgroundColor: currentPage === totalPages ? '#F1F5F9' : '#FFFFFF',
                color: currentPage === totalPages ? '#94A3B8' : '#334155',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: '12px',
              }}
            >
              Suivant <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Modale d'ajout ou édition de médicament */}
      <MedicineFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingMedicine}
      />
    </div>
  );
}
