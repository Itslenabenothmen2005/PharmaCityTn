import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  LogIn,
  ArrowLeft,
  User,
  Store,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Logo from '../../components/common/Logo';
import { demoAccounts } from '../../data/users';
import { useToast } from '../../hooks/useToast';

export default function LoginPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [selectedRole, setSelectedRole] = useState('citizen'); // 'citizen' | 'pharmacist'
  const [email, setEmail] = useState('ahmed.bensalem@gmail.tn');
  const [password, setPassword] = useState('demo2026');
  const [loading, setLoading] = useState(false);

  const handleRoleToggle = (role) => {
    setSelectedRole(role);
    if (role === 'citizen') {
      setEmail('ahmed.bensalem@gmail.tn');
    } else {
      setEmail('contact@pharmaciemanar.tn');
    }
  };

  const handleFastDemoLogin = (account) => {
    toast.success(`Bienvenue, ${account.name} ! Connexion réussie au mode démonstration.`, 'Connexion rapide');
    navigate(account.redirectUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (selectedRole === 'pharmacist') {
        toast.success('Bienvenue, Dr. Nadia Mansour ! Connexion à l’Espace Pharmacie.', 'Authentification réussie');
        navigate('/pharmacy/dashboard');
      } else {
        toast.success('Bienvenue, Ahmed Ben Salem ! Connexion à l’Espace Citoyen.', 'Authentification réussie');
        navigate('/user/dashboard');
      }
    }, 450);
  };

  return (
    <div
      className="container"
      style={{
        padding: '40px 20px 60px',
        maxWidth: '560px',
        margin: '0 auto',
      }}
    >
      {/* En-tête */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Logo size="lg" />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', marginTop: '16px', color: '#0F172A' }}>
          Connexion à PharmaCityTN
        </h2>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>
          Plateforme nationale d'information et de disponibilité des médicaments en Tunisie
        </p>
      </div>

      {/* ============================================================
          SECTION 1 : ACCÈS RAPIDE DÉMONSTRATION SANS AUTHENTIFICATION
          ============================================================ */}
      <div
        style={{
          marginBottom: '24px',
          padding: '16px 20px',
          backgroundColor: '#F0FDF4',
          borderRadius: '16px',
          border: '1.5px solid #BBF7D0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Sparkles size={18} color="#168B70" />
          <strong style={{ fontSize: '13px', color: '#166534', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Accès Démonstration Immédiat (1-Clic)
          </strong>
        </div>

        <p style={{ fontSize: '12px', color: '#14532D', margin: '0 0 14px', lineHeight: '1.4' }}>
          Sélectionnez un profil pour explorer l'ensemble des parcours frontend sans mot de passe :
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          {demoAccounts.map((account) => {
            const isCitizen = account.role === 'citizen';
            return (
              <div
                key={account.id}
                onClick={() => handleFastDemoLogin(account)}
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: isCitizen ? '1.5px solid #168B70' : '1.5px solid #0F5244',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        backgroundColor: isCitizen ? '#DCFCE7' : '#EFF6FF',
                        color: isCitizen ? '#166534' : '#1E40AF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isCitizen ? <User size={15} /> : <Store size={15} />}
                    </div>
                    <strong style={{ fontSize: '13px', color: '#0F172A' }}>
                      {isCitizen ? 'Espace Citoyen' : 'Espace Pharmacie'}
                    </strong>
                  </div>
                  <ArrowRight size={14} color="#168B70" />
                </div>

                <div style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                  {account.name}
                </div>

                <div style={{ fontSize: '11px', color: '#64748B', lineHeight: '1.3' }}>
                  {isCitizen ? 'Recherche, favoris & demandes' : 'Stock, catalogue & alertes'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          SECTION 2 : FORMULAIRE DE CONNEXION AVEC CHOIX DU RÔLE
          ============================================================ */}
      <Card padding="lg">
        {/* Sélecteur d'espace */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => handleRoleToggle('citizen')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: selectedRole === 'citizen' ? '2px solid var(--color-primary)' : '1px solid #CBD5E1',
              backgroundColor: selectedRole === 'citizen' ? 'var(--color-primary-light)' : '#FFFFFF',
              color: selectedRole === 'citizen' ? 'var(--color-primary-dark)' : '#64748B',
              fontSize: '13px',
              fontWeight: selectedRole === 'citizen' ? '700' : '500',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <User size={16} /> Citoyen / Patient
          </button>

          <button
            type="button"
            onClick={() => handleRoleToggle('pharmacist')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: selectedRole === 'pharmacist' ? '2px solid #0F5244' : '1px solid #CBD5E1',
              backgroundColor: selectedRole === 'pharmacist' ? '#EFF6FF' : '#FFFFFF',
              color: selectedRole === 'pharmacist' ? '#0F5244' : '#64748B',
              fontSize: '13px',
              fontWeight: selectedRole === 'pharmacist' ? '700' : '500',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Store size={16} /> Pharmacien / Officine
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label={selectedRole === 'citizen' ? 'Identifiant / Email Citoyen' : 'Identifiant / Email Professionnel Officine'}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startIcon={<Mail size={18} />}
            required
          />

          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            startIcon={<Lock size={18} />}
            required
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 'var(--font-size-xs)',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-primary)' }} />
              Se souvenir de moi
            </label>
            <span style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>
              Mot de passe oublié ?
            </span>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} icon={LogIn}>
            {selectedRole === 'citizen'
              ? 'Se connecter à l’Espace Citoyen'
              : 'Se connecter à l’Espace Pharmacie'}
          </Button>
        </form>

        <div
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid var(--color-border-subtle)',
            textAlign: 'center',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Vous n'avez pas de compte ?{' '}
          <Link to="/register" style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
            Créer un compte
          </Link>
        </div>
      </Card>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
          Retour au portail public
        </Link>
      </div>
    </div>
  );
}
