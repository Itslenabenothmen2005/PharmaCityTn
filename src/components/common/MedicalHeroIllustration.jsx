import React from 'react';
import { Pill, ShieldCheck, MapPin, Clock, HeartPulse } from 'lucide-react';
import Badge from './Badge';

/**
 * Illustration médicale moderne et interactive pour la section Hero PharmaCityTN
 */
export default function MedicalHeroIllustration({ className = '', style = {} }) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 20px',
        ...style,
      }}
    >
      {/* Cercle d'ambiance vert doux en arrière-plan */}
      <div
        style={{
          position: 'absolute',
          width: '380px',
          height: '380px',
          borderRadius: 'var(--radius-full)',
          background: 'radial-gradient(circle, rgba(22, 139, 112, 0.15) 0%, rgba(232, 245, 240, 0.4) 60%, transparent 80%)',
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />

      {/* Composition Visuelle Centrale Médicale */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Écusson Central Vert Médical & Croix de Pharmacie */}
        <div
          style={{
            width: '160px',
            height: '160px',
            borderRadius: '36px',
            background: 'linear-gradient(135deg, #168B70 0%, #116B58 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px -10px rgba(22, 139, 112, 0.35)',
            position: 'relative',
            transform: 'rotate(-3deg)',
            transition: 'transform var(--transition-normal)',
          }}
        >
          {/* Croix de Pharmacie Lumineuse Stylisée */}
          <div
            style={{
              position: 'relative',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Barre verticale */}
            <div
              style={{
                position: 'absolute',
                width: '24px',
                height: '76px',
                backgroundColor: 'var(--color-white)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
            {/* Barre horizontale */}
            <div
              style={{
                position: 'absolute',
                width: '76px',
                height: '24px',
                backgroundColor: 'var(--color-white)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
            {/* Cœur au centre de la croix */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                color: 'var(--color-primary)',
              }}
            >
              <HeartPulse size={26} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ====================================================================
            Cartes Flottantes de Disponibilité Réalistes
            ==================================================================== */}

        {/* Carte Flottante 1 : Disponibilité Médicament (Haut Droite) */}
        <div
          style={{
            position: 'absolute',
            top: '-15px',
            right: '-10px',
            backgroundColor: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 16px',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 2,
            animation: 'fadeIn 0.5s ease-out',
            maxWidth: '250px',
          }}
        >
          <div
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-success-light)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Pill size={20} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
              Doliprane 1000 mg
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <Badge variant="success" size="sm" dot>
                En stock (14 boîtes)
              </Badge>
            </div>
          </div>
        </div>

        {/* Carte Flottante 2 : Pharmacie de Garde Ouverte (Bas Gauche) */}
        <div
          style={{
            position: 'absolute',
            bottom: '-15px',
            left: '-15px',
            backgroundColor: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 16px',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 2,
            animation: 'fadeIn 0.6s ease-out',
            maxWidth: '260px',
          }}
        >
          <div
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MapPin size={20} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
              Pharmacie El Manar 🇹🇳
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <Clock size={12} color="var(--color-primary)" />
              <span>Garde de Nuit • à 450 m</span>
            </div>
          </div>
        </div>

        {/* Badge Flottant 3 : Données Certifiées (Bas Droite) */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '-12px',
            backgroundColor: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 14px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 3,
            fontSize: '11px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-primary-dark)',
          }}
        >
          <ShieldCheck size={14} color="var(--color-primary)" />
          <span>Vérifié en direct</span>
        </div>
      </div>
    </div>
  );
}
