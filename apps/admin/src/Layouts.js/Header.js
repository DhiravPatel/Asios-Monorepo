import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

const ROUTE_TITLES = {
  '/dashboard': { eyebrow: 'Overview', title: 'Dashboard' },
  '/category': { eyebrow: 'Catalogue', title: 'Category' },
  '/viewcategory': { eyebrow: 'Catalogue', title: 'View Category' },
  '/type': { eyebrow: 'Catalogue', title: 'Type' },
  '/products': { eyebrow: 'Catalogue', title: 'Product' },
  '/catalogue': { eyebrow: 'Catalogue', title: 'Catalogue' },
  '/blog': { eyebrow: 'Catalogue', title: 'Blog' },
  '/add-blog': { eyebrow: 'Catalogue · Blog', title: 'New Post' },
  '/bulk-email': { eyebrow: 'Engagement', title: 'Bulk Email' },
  '/product-inquiry': { eyebrow: 'Engagement', title: 'Product Inquiry' },
  '/inquiry': { eyebrow: 'Engagement', title: 'General Inquiry' },
};

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Resolve current route — fall back to first matching prefix for nested routes
  const exact = ROUTE_TITLES[location.pathname];
  const fallback = Object.entries(ROUTE_TITLES).find(([key]) =>
    location.pathname.startsWith(key)
  );
  const current = exact || (fallback && fallback[1]) || {
    eyebrow: 'Asios',
    title: 'Admin',
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="admin-header">
      <div>
        <div className="admin-header__crumb">{current.eyebrow}</div>
        <div className="admin-header__title">{current.title}</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3">
          <span
            className="admin-header__avatar"
            aria-label="Admin user avatar"
          >
            A
          </span>
          <div className="leading-tight">
            <div
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 13,
                fontWeight: 500,
                color: '#1a1612',
              }}
            >
              Admin
            </div>
            <div
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 11,
                color: 'rgba(26,22,18,0.5)',
              }}
            >
              Asios Global
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="admin-header__action admin-header__action--danger"
        >
          <LogoutOutlined style={{ fontSize: 13 }} />
          <span>Sign out</span>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
