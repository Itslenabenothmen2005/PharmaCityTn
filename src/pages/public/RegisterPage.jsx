import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1>Inscription</h1>
      <p style={{ color: '#6b7280' }}>Page d'inscription — à développer</p>
      <Link to="/" style={{ color: '#0ea5e9', marginTop: '20px', display: 'inline-block' }}>
        ← Retour à l'accueil
      </Link>
    </div>
  );
}

export default RegisterPage;
