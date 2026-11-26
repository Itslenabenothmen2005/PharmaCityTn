import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building2, UserPlus, ArrowLeft } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Logo from '../../components/common/Logo';
import { useToast } from '../../hooks/useToast';
import { userService } from '../../services/userService';

export default function RegisterPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Veuillez remplir tous les champs obligatoires.', 'Erreur');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'pharmacy') {
        toast.success(
          `Compte Officine « ${name} » créé avec succès ! Bienvenue sur le portail professionnel.`,
          'Inscription réussie'
        );
        navigate('/pharmacy/dashboard');
      } else {
        userService.updateProfile({ name, email });
        toast.success(
          `Bienvenue sur PharmaCityTN, ${name} ! Votre compte citoyen est actif.`,
          'Inscription réussie'
        );
        navigate('/user/dashboard');
      }
    }, 450);
  };

  return (
    <div
      className="container"
      style={{
        padding: '50px 20px',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Logo size="lg" />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', marginTop: '16px' }}>
          Rejoignez PharmaCityTN
        </h2>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          Créez votre compte en quelques instants
        </p>
      </div>

      <Card padding="lg">
        {/* Sélecteur de Rôle */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            backgroundColor: 'var(--color-bg-subtle)',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px',
          }}
        >
          <button
            type="button"
            onClick={() => setRole('user')}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backgroundColor: role === 'user' ? 'var(--color-white)' : 'transparent',
              color: role === 'user' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              boxShadow: role === 'user' ? 'var(--shadow-xs)' : 'none',
              transition: 'all var(--transition-fast)',
            }}
          >
            <User size={16} />
            Citoyen
          </button>
          <button
            type="button"
            onClick={() => setRole('pharmacy')}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backgroundColor: role === 'pharmacy' ? 'var(--color-white)' : 'transparent',
              color: role === 'pharmacy' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              boxShadow: role === 'pharmacy' ? 'var(--shadow-xs)' : 'none',
              transition: 'all var(--transition-fast)',
            }}
          >
            <Building2 size={16} />
            Pharmacie
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label={role === 'pharmacy' ? "Nom de l'officine" : 'Nom complet'}
            placeholder={role === 'pharmacy' ? 'Pharmacie Centrale' : 'Ahmed Ben Salem'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            startIcon={role === 'pharmacy' ? <Building2 size={18} /> : <User size={18} />}
            required
          />

          <Input
            label="Adresse Email"
            type="email"
            placeholder="contact@pharmacity.tn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startIcon={<Mail size={18} />}
            required
          />

          <Input
            label="Mot de passe"
            type="password"
            placeholder="Au moins 8 caractères"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            startIcon={<Lock size={18} />}
            helperText="Doit contenir au moins une lettre majuscule et un chiffre"
            required
          />

          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} icon={UserPlus}>
            Créer mon compte
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
          Vous avez déjà un compte ?{' '}
          <Link to="/login" style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
            Se connecter
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
          }}
        >
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
