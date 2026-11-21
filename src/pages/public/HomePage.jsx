import { Link } from 'react-router-dom';
import { Home, Search, Pill } from 'lucide-react';

function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <Pill size={64} color="#0ea5e9" style={{ marginBottom: '20px' }} />
      <h1>Bienvenue sur PharmaCityTN</h1>
      <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto 40px' }}>
        Recherchez vos médicaments et consultez leur disponibilité
        dans les pharmacies en Tunisie.
      </p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/login" style={linkStyle}>
          <Home size={18} />
          Se connecter
        </Link>
        <Link to="/register" style={linkStyle}>
          Créer un compte
        </Link>
        <Link to="/user/search" style={linkStyle}>
          <Search size={18} />
          Rechercher un médicament
        </Link>
      </div>

      <div style={{ marginTop: '60px', padding: '30px', background: '#f0f9ff', borderRadius: '12px', maxWidth: '700px', margin: '60px auto 0' }}>
        <h2 style={{ marginBottom: '16px' }}>🧭 Navigation de test</h2>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>
          Toutes les routes sont fonctionnelles. Cliquez pour vérifier :
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <Link to="/login" style={testLinkStyle}>🔐 /login</Link>
          <Link to="/register" style={testLinkStyle}>📝 /register</Link>
          <Link to="/user/dashboard" style={testLinkStyle}>👤 /user/dashboard</Link>
          <Link to="/user/search" style={testLinkStyle}>🔍 /user/search</Link>
          <Link to="/user/favorites" style={testLinkStyle}>⭐ /user/favorites</Link>
          <Link to="/user/notifications" style={testLinkStyle}>🔔 /user/notifications</Link>
          <Link to="/pharmacy/dashboard" style={testLinkStyle}>🏥 /pharmacy/dashboard</Link>
          <Link to="/pharmacy/medicines" style={testLinkStyle}>💊 /pharmacy/medicines</Link>
          <Link to="/pharmacy/stock" style={testLinkStyle}>📦 /pharmacy/stock</Link>
          <Link to="/pharmacy/profile" style={testLinkStyle}>🏪 /pharmacy/profile</Link>
        </div>
      </div>
    </div>
  );
}

const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 24px',
  background: '#0ea5e9',
  color: '#fff',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '16px',
};

const testLinkStyle = {
  color: '#0ea5e9',
  textDecoration: 'none',
  fontSize: '15px',
  padding: '4px 8px',
  borderRadius: '4px',
  transition: 'background 0.2s',
};

export default HomePage;
