import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Logo from '../../components/common/Logo';
import { useToast } from '../../hooks/useToast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.info('Authentification simulée (Frontend uniquement)', 'Connexion');
    }, 600);
  };

  return (
    <div
      className="container"
      style={{
        padding: '60px 20px',
        maxWidth: '460px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Logo size="lg" />
        <h2 style={{ fontSize: 'var(--font-size-2xl)', marginTop: '16px' }}>
          Connexion à votre espace
        </h2>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          Accédez aux disponibilités de médicaments en Tunisie
        </p>
      </div>

      <Card padding="lg">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Adresse Email"
            type="email"
            placeholder="exemple@pharmacity.tn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startIcon={<Mail size={18} />}
            required
          />

          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
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
              <input type="checkbox" style={{ accentColor: 'var(--color-primary)' }} />
              Se souvenir de moi
            </label>
            <a href="#forgot" style={{ color: 'var(--color-primary)' }}>
              Mot de passe oublié ?
            </a>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} icon={LogIn}>
            Se connecter
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
          }}
        >
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
