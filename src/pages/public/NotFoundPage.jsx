import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: '72px', margin: '0 0 16px', color: '#0ea5e9' }}>404</h1>
      <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '30px' }}>
        Page introuvable
      </p>
      <Link to="/" style={{ color: '#0ea5e9', fontSize: '16px' }}>
        ← Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFoundPage;
