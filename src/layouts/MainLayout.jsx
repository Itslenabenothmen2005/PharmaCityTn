import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: '#0ea5e9',
        color: '#fff',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <a href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: '700', fontSize: '20px' }}>
          💊 PharmaCityTN
        </a>
      </header>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        padding: '20px 24px',
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '14px',
      }}>
        © 2026 PharmaCityTN — Tous droits réservés
      </footer>
    </div>
  );
}

export default MainLayout;
