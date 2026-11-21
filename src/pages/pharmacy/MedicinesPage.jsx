import React from 'react';
import { Pill, Search, Plus } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';

export default function MedicinesPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: 'var(--font-size-2xl)' }}>Catalogue des Médicaments</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Nomenclature nationale et fiches produits référencées par votre pharmacie.
          </p>
        </div>
        <Button variant="primary" icon={Plus}>
          Ajouter une référence
        </Button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <SearchBar placeholder="Rechercher dans le catalogue de l'officine..." />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { name: 'Doliprane 1000mg', form: 'Comprimés effervescents', dci: 'Paracétamol', status: 'success', statusText: 'Disponible (24 boîtes)' },
          { name: 'Augmentin 1g Adulte', form: 'Poudre pour suspension', dci: 'Amoxicilline', status: 'warning', statusText: 'Stock critique (3 boîtes)' },
          { name: 'Maxilase Sirop', form: 'Flacon 125ml', dci: 'Alpha-amylase', status: 'danger', statusText: 'Rupture temporaire' },
        ].map((med, idx) => (
          <Card key={idx} padding="md" hoverable>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>
                  {med.name}
                </strong>
                <p style={{ margin: '2px 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                  {med.form} • DCI : {med.dci}
                </p>
              </div>
              <Badge variant={med.status} dot>
                {med.statusText}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
