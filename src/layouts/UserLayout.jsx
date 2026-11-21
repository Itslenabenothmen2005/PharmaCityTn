import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, Star, Bell } from 'lucide-react';

const userLinks = [
  { to: '/user/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/user/search', label: 'Recherche', icon: Search },
  { to: '/user/favorites', label: 'Favoris', icon: Star },
  { to: '/user/notifications', label: 'Notifications', icon: Bell },
];

function UserLayout() {
  const location = useLocation();

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)' }}>
      <aside style={{
        width: '220px',
        background: '#f8fafc',
        borderRight: '1px solid #e2e8f0',
        padding: '24px 0',
      }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {userLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 20px',
                color: location.pathname === to ? '#0ea5e9' : '#64748b',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: location.pathname === to ? '600' : '400',
                background: location.pathname === to ? '#e0f2fe' : 'transparent',
                borderRight: location.pathname === to ? '3px solid #0ea5e9' : '3px solid transparent',
              }}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div style={{ flex: 1, padding: '0 24px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
