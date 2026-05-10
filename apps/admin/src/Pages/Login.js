import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/User/UserHook';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mutate: login } = useLogin();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      await login(values);
      message.success('Welcome back.');
      navigate('/dashboard');
    } catch (error) {
      message.error('Login failed: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT — Animated editorial brand panel */}
      <div
        className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden"
        style={{ backgroundColor: '#1a1612' }}
      >
        {/* Drifting red gradient blobs */}
        <div
          className="login-blob login-blob-1"
          style={{
            top: '-12%',
            left: '-10%',
            width: '60vh',
            height: '60vh',
            background: 'rgba(160, 19, 19, 0.35)',
          }}
        />
        <div
          className="login-blob login-blob-2"
          style={{
            top: '30%',
            right: '-15%',
            width: '55vh',
            height: '55vh',
            background: 'rgba(160, 19, 19, 0.22)',
          }}
        />
        <div
          className="login-blob login-blob-3"
          style={{
            bottom: '-15%',
            left: '20%',
            width: '50vh',
            height: '50vh',
            background: 'rgba(160, 19, 19, 0.18)',
          }}
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        {/* Top + bottom shimmer hairlines */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: '1px',
            background:
              'linear-gradient(to right, transparent, rgba(160,19,19,0.7), transparent)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '1px',
            background:
              'linear-gradient(to right, transparent, rgba(160,19,19,0.4), transparent)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between w-full p-12 xl:p-16">
          {/* Top: brand mark */}
          <div className="login-fade-up flex items-center gap-3">
            <span
              className="login-display text-3xl tracking-tight"
              style={{ color: '#ffffff' }}
            >
              ASIOS
            </span>
            <span
              className="login-eyebrow"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              · Admin
            </span>
          </div>

          {/* Center: editorial welcome */}
          <div className="login-fade-up max-w-xl" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="login-rule login-rule-light" />
              <span
                className="login-eyebrow"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                Control Panel
              </span>
            </div>
            <h1
              className="login-display"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginBottom: '24px' }}
            >
              Welcome back to{' '}
              <span
                className="login-display-italic"
                style={{ color: '#a01313' }}
              >
                the studio.
              </span>
            </h1>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '15px',
                lineHeight: 1.85,
                color: 'rgba(255,255,255,0.65)',
                maxWidth: '32rem',
              }}
            >
              Manage catalogues, products, blogs, and inquiries from one editorial
              workspace. Pick up where you left off.
            </p>
          </div>

          {/* Bottom: small footnote */}
          <div
            className="login-fade-up flex items-center justify-between"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex items-center gap-3">
              <span
                className="login-rule login-rule-light"
                style={{ width: '24px' }}
              />
              <span
                className="login-eyebrow"
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '10px',
                }}
              >
                Crafted in Morbi · Shipped Worldwide
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '11px',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.18em',
              }}
            >
              v1.0
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT — Editorial form panel */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-white relative">
        {/* Mobile: small brand mark at top */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
          <span
            className="login-display"
            style={{ color: '#1a1612', fontSize: '24px' }}
          >
            ASIOS
          </span>
          <span
            className="login-eyebrow"
            style={{ color: 'rgba(26,22,18,0.45)' }}
          >
            · Admin
          </span>
        </div>

        <div className="login-fade-up w-full max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <span className="login-rule" />
            <span
              className="login-eyebrow"
              style={{ color: 'rgba(26,22,18,0.55)' }}
            >
              Sign In
            </span>
          </div>

          <h2
            className="login-display"
            style={{
              color: '#1a1612',
              fontSize: 'clamp(32px, 4vw, 44px)',
              marginBottom: '12px',
              lineHeight: 1.05,
            }}
          >
            Pick up where{' '}
            <span
              className="login-display-italic"
              style={{ color: '#a01313' }}
            >
              you left off.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '14px',
              color: 'rgba(26,22,18,0.55)',
              marginBottom: '40px',
              lineHeight: 1.7,
            }}
          >
            Enter your credentials to access the Asios admin workspace.
          </p>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            className="login-form"
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label={
                <span
                  className="login-eyebrow"
                  style={{
                    color: 'rgba(26,22,18,0.55)',
                    fontSize: '10px',
                  }}
                >
                  Email
                </span>
              }
              rules={[
                { required: true, message: 'Please enter your email.' },
                { type: 'email', message: 'Please enter a valid email.' },
              ]}
            >
              <Input placeholder="you@asios.in" autoComplete="email" />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span
                  className="login-eyebrow"
                  style={{
                    color: 'rgba(26,22,18,0.55)',
                    fontSize: '10px',
                  }}
                >
                  Password
                </span>
              }
              rules={[
                { required: true, message: 'Please enter your password.' },
              ]}
            >
              <Input.Password
                placeholder="••••••••"
                autoComplete="current-password"
                visibilityToggle={{
                  visible: showPassword,
                  onVisibleChange: setShowPassword,
                }}
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined style={{ color: '#797466' }} />
                  ) : (
                    <EyeInvisibleOutlined style={{ color: '#797466' }} />
                  )
                }
              />
            </Form.Item>

            <Form.Item style={{ marginTop: '32px', marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-submit"
                loading={loading}
              >
                {loading ? 'Signing in…' : 'Sign in →'}
              </Button>
            </Form.Item>
          </Form>

          <div
            style={{
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: '1px solid #e8e4da',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '12px',
              color: 'rgba(26,22,18,0.5)',
              lineHeight: 1.7,
            }}
          >
            Need access? Contact the system administrator at{' '}
            <a
              href="mailto:info@asios.in"
              style={{ color: '#a01313', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              info@asios.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
