import React from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_TITLES = {
  '/dashboard': { eyebrow: 'Overview', title: 'Dashboard' },
  '/category': { eyebrow: 'Catalogue', title: 'Category' },
  '/viewcategory': { eyebrow: 'Catalogue', title: 'View Category' },
  '/type': { eyebrow: 'Catalogue', title: 'Sub Category' },
  '/products': { eyebrow: 'Catalogue', title: 'Product' },
  '/catalogue': { eyebrow: 'Catalogue', title: 'Catalogue' },
  '/blog': { eyebrow: 'Catalogue', title: 'Blog' },
  '/add-blog': { eyebrow: 'Catalogue · Blog', title: 'New Post' },
  '/bulk-email': { eyebrow: 'Engagement', title: 'Bulk Email' },
  '/product-inquiry': { eyebrow: 'Engagement', title: 'Product Inquiry' },
  '/inquiry': { eyebrow: 'Engagement', title: 'General Inquiry' },
};

const formatToday = () =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

const AppHeader = () => {
  const location = useLocation();

  const exact = ROUTE_TITLES[location.pathname];
  const fallback = Object.entries(ROUTE_TITLES).find(([key]) =>
    location.pathname.startsWith(key)
  );
  const current = exact || (fallback && fallback[1]) || {
    eyebrow: 'Asios',
    title: 'Admin',
  };

  return (
    <header className="admin-header">
      <div>
        <div className="admin-header__crumb">{current.eyebrow}</div>
        <div className="admin-header__title">{current.title}</div>
      </div>

      <div
        className="hidden md:block text-right"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(26,22,18,0.45)',
          fontWeight: 500,
        }}
      >
        {formatToday()}
      </div>
    </header>
  );
};

export default AppHeader;
