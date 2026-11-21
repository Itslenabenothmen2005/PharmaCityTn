import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Pill, Package, Store } from 'lucide-react';

const pharmacyLinks = [
  { to: '/pharmacy/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/pharmacy/medicines', label: 'Médicaments', icon: Pill },
  { to: '/pharmacy/stock', label: 'Stock', icon: Package },
  { to: '/pharmacy/profile', label: 'Profil', icon: Store },
];

function PharmacyLayout() {
  const location = useLocation();

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)' }}>
      <aside style={{
        width: '220px',
        background: '#f0fdf4',
        borderRight: '1px solid #d1fae5',
        padding: '24px 0',
      }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {pharmacyLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 20px',
                color: location.pathname === to ? '#16a34a' : '#64748b',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: location.pathname === to ? '600' : '400',
                background: location.pathname === to ? '#dcfce7' : 'transparent',
                borderRight: location.pathname === to ? '3px solid #16a34a' : '3px solid transparent',
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

export default PharmacyLayout;
