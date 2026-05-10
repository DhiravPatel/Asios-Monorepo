import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  AppstoreOutlined,
  CodeSandboxOutlined,
  ShoppingOutlined,
  BookOutlined,
  FormOutlined,
  MailOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const overviewItems = [
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <HomeOutlined /> },
];

const catalogueItems = [
  { key: 'category', label: 'Category', path: '/category', icon: <AppstoreOutlined /> },
  { key: 'type', label: 'Type', path: '/type', icon: <CodeSandboxOutlined /> },
  { key: 'products', label: 'Product', path: '/products', icon: <ShoppingOutlined /> },
  { key: 'catalogue', label: 'Catalogue', path: '/catalogue', icon: <BookOutlined /> },
  { key: 'blog', label: 'Blog', path: '/blog', icon: <FormOutlined /> },
];

const engagementItems = [
  { key: 'bulk-email', label: 'Bulk Email', path: '/bulk-email', icon: <MailOutlined /> },
  {
    key: 'product-inquiry',
    label: 'Product Inquiry',
    path: '/product-inquiry',
    icon: <MessageOutlined />,
  },
  {
    key: 'inquiry',
    label: 'General Inquiry',
    path: '/inquiry',
    icon: <QuestionCircleOutlined />,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const renderItem = (item) => (
    <button
      key={item.key}
      type="button"
      onClick={() => navigate(item.path)}
      className={`admin-sidebar__item ${
        isActive(item.path) ? 'admin-sidebar__item--active' : ''
      }`}
    >
      <span className="admin-sidebar__item-icon">{item.icon}</span>
      <span>{item.label}</span>
    </button>
  );

  return (
    <aside className="admin-sidebar">
      {/* Brand */}
      <div className="admin-sidebar__brand">
        <span className="admin-sidebar__brand-name">ASIOS</span>
        <span className="admin-sidebar__brand-tag">· Admin</span>
      </div>

      {/* Nav */}
      <nav className="admin-sidebar__nav">
        <div className="admin-sidebar__section-label">Overview</div>
        {overviewItems.map(renderItem)}

        <div className="admin-sidebar__section-label">Catalogue</div>
        {catalogueItems.map(renderItem)}

        <div className="admin-sidebar__section-label">Engagement</div>
        {engagementItems.map(renderItem)}
      </nav>

      {/* Footer */}
      <div className="admin-sidebar__footer">v1.0 · Morbi</div>
    </aside>
  );
};

export default Sidebar;
