import { Link } from 'react-router-dom';

function FavoritesPage() {
  return (
    <div style={{ padding: '40px 20px' }}>
      <h1>Mes favoris</h1>
      <p style={{ color: '#6b7280' }}>Page des favoris — à développer</p>
      <Link to="/" style={{ color: '#0ea5e9', marginTop: '20px', display: 'inline-block' }}>
        ← Retour à l'accueil
      </Link>
    </div>
  );
}

export default FavoritesPage;
