import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  CodeSandboxOutlined,
  ShoppingOutlined,
  BookOutlined,
  MessageOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useGetAllCategories } from '../../hooks/Category/CategoryHook';
import { useGetAllSubCategories } from '../../hooks/SubCategory/SubCategoryHook';
import { useGetAllProducts } from '../../hooks/Product/ProductHook';
import { useGetAllInquiries } from '../../hooks/Inquiry/InquiryHook';
import { useGetAllProductInquiries } from '../../hooks/Product/ProductInquiryHook';
import { useGetAllCatalogue } from '../../hooks/Catalogue/CatalogueHook';
import { useGetAllBlogs } from '../../hooks/Blog/BlogHook';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 5) return 'Burning the midnight oil';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Working late';
};

const formatDate = () =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

const initials = (str) => {
  if (!str) return '?';
  const parts = String(str).trim().split(/\s+/);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || '?';
};

const fmtTimeAgo = (date) => {
  if (!date) return '—';
  const d = new Date(date);
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 86400 * 7) return `${Math.floor(seconds / 86400)}d ago`;
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: category } = useGetAllCategories();
  const { data: subCategory } = useGetAllSubCategories();
  const { data: product } = useGetAllProducts();
  const { data: inquiry } = useGetAllInquiries();
  const { data: productInquiry } = useGetAllProductInquiries();
  const { data: catalogue } = useGetAllCatalogue();
  const { data: blogs } = useGetAllBlogs();

  const stats = useMemo(
    () => [
      {
        key: 'products',
        label: 'Products',
        value: product?.length ?? 0,
        hint: 'Active SKUs across all collections',
        icon: <ShoppingOutlined />,
        path: '/products',
      },
      {
        key: 'category',
        label: 'Categories',
        value: category?.length ?? 0,
        hint: 'Top-level collections',
        icon: <AppstoreOutlined />,
        path: '/category',
      },
      {
        key: 'subCategory',
        label: 'Types',
        value: subCategory?.length ?? 0,
        hint: 'Sub-collections under categories',
        icon: <CodeSandboxOutlined />,
        path: '/type',
      },
      {
        key: 'catalogue',
        label: 'Catalogues',
        value: catalogue?.length ?? 0,
        hint: 'Published e-catalogue editions',
        icon: <BookOutlined />,
        path: '/catalogue',
      },
      {
        key: 'inquiry',
        label: 'Inquiries',
        value: inquiry?.length ?? 0,
        hint: 'General inquiries received',
        icon: <MessageOutlined />,
        path: '/inquiry',
      },
      {
        key: 'productInquiry',
        label: 'Product Inquiries',
        value: productInquiry?.length ?? 0,
        hint: 'Inquiries on specific SKUs',
        icon: <MessageOutlined />,
        path: '/product-inquiry',
      },
    ],
    [product, category, subCategory, catalogue, inquiry, productInquiry]
  );

  // Latest inquiries — combine general + product, sort by createdAt desc, take 6
  const recentInquiries = useMemo(() => {
    const general = (inquiry || []).map((i) => ({
      id: i._id,
      name: i.name || 'Anonymous',
      message: i.message || `New inquiry from ${i.email || 'someone'}`,
      createdAt: i.createdAt,
      type: 'general',
    }));
    const productI = (productInquiry || []).map((i) => ({
      id: i._id,
      name: i.name || 'Anonymous',
      message: i.product_name
        ? `Asked about "${i.product_name}"`
        : i.message || `New product inquiry`,
      createdAt: i.createdAt,
      type: 'product',
    }));
    return [...general, ...productI]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 6);
  }, [inquiry, productInquiry]);

  const quickActions = [
    {
      label: 'Add a product',
      hint: 'Upload a new SKU to the catalogue',
      path: '/products',
    },
    {
      label: 'New blog post',
      hint: 'Publish a journal entry',
      path: '/add-blog',
    },
    {
      label: 'Send bulk email',
      hint: 'Reach all inquiries at once',
      path: '/bulk-email',
    },
    {
      label: 'View inquiries',
      hint: 'Go through unread requests',
      path: '/inquiry',
    },
    {
      label: 'Add a catalogue',
      hint: 'Upload a new edition PDF',
      path: '/catalogue',
    },
  ];

  const totalContent =
    (product?.length || 0) +
    (category?.length || 0) +
    (subCategory?.length || 0) +
    (catalogue?.length || 0) +
    (blogs?.length || 0);

  return (
    <div className="dash-page">
      {/* Welcome */}
      <div>
        <div className="dash-welcome-eyebrow">{formatDate()}</div>
        <h1 className="dash-welcome-title">
          {greeting()},{' '}
          <span className="dash-welcome-italic">Admin.</span>
        </h1>
        <p className="dash-welcome-sub">
          You have <strong>{recentInquiries.length}</strong> recent inquiries waiting
          and <strong>{totalContent}</strong> content items live across the site.
          Pick up where you left off.
        </p>
      </div>

      {/* Stats grid */}
      <div className="dash-stats">
        {stats.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => navigate(s.path)}
            className="dash-stat"
            style={{ textAlign: 'left' }}
          >
            <span className="dash-stat__rule" />
            <span className="dash-stat__icon">{s.icon}</span>
            <div className="dash-stat__label">{s.label}</div>
            <div className="dash-stat__value">{String(s.value).padStart(2, '0')}</div>
            <div className="dash-stat__hint">{s.hint}</div>
          </button>
        ))}
      </div>

      {/* Recent + actions */}
      <div className="dash-grid">
        {/* Recent inquiries feed */}
        <section className="dash-panel">
          <div className="dash-panel__head">
            <div>
              <span className="dash-panel__eyebrow">Latest activity</span>
              <h2 className="dash-panel__title">Recent inquiries</h2>
            </div>
            <button
              type="button"
              className="dash-panel__view-all"
              onClick={() => navigate('/inquiry')}
            >
              View all →
            </button>
          </div>

          {recentInquiries.length === 0 ? (
            <div
              style={{
                padding: '40px 0',
                textAlign: 'center',
                color: 'rgba(26,22,18,0.4)',
                fontSize: 13,
              }}
            >
              No inquiries yet. New requests will appear here.
            </div>
          ) : (
            <div>
              {recentInquiries.map((item) => (
                <div key={item.id} className="dash-feed-item">
                  <span className="dash-feed-avatar">{initials(item.name)}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="dash-feed-name">
                      {item.name}{' '}
                      <span
                        style={{
                          fontSize: 9.5,
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          color:
                            item.type === 'product' ? '#a01313' : 'rgba(26,22,18,0.4)',
                          fontWeight: 600,
                          marginLeft: 8,
                        }}
                      >
                        · {item.type === 'product' ? 'Product' : 'General'}
                      </span>
                    </div>
                    <div className="dash-feed-msg">{item.message}</div>
                  </div>
                  <span className="dash-feed-meta">{fmtTimeAgo(item.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quick actions */}
        <section className="dash-panel">
          <div className="dash-panel__head">
            <div>
              <span className="dash-panel__eyebrow">Shortcuts</span>
              <h2 className="dash-panel__title">Quick actions</h2>
            </div>
          </div>

          <div>
            {quickActions.map((a) => (
              <button
                key={a.path}
                type="button"
                onClick={() => navigate(a.path)}
                className="dash-action"
                style={{ width: '100%' }}
              >
                <div>
                  <div className="dash-action__label">{a.label}</div>
                  <div className="dash-action__hint">{a.hint}</div>
                </div>
                <ArrowRightOutlined
                  className="dash-action__arrow"
                  style={{ fontSize: 14 }}
                />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
