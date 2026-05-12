'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Eye, EyeOff, Zap, ArrowRight } from 'lucide-react';
import { z } from 'zod';

// Zod Schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Validate using Zod
    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });

      return;
    }

    setLoading(true);

    const loginResult = await login(email, password);

    setLoading(false);

    if (loginResult.success) {
      router.push('/dashboard');
    } else {
      setErrors({
        general: loginResult.error || 'Login failed',
      });
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(circle, rgba(79,142,247,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />

      <div
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '420px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                background: 'var(--accent-blue)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Zap size={20} color="#fff" fill="#fff" />
            </div>

            <span
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '22px',
                fontWeight: '800',
                color: 'var(--text-primary)',
              }}
            >
              NexAdmin
            </span>
          </div>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '13px',
            }}
          >
            Sign in to your admin panel
          </p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: '36px' }}>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '6px',
            }}
          >
            Welcome back
          </h1>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '13px',
              marginBottom: '28px',
            }}
          >
            Use any valid email + password (min 6 chars)
          </p>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '6px',
                }}
              >
                Email
              </label>

              <input
                className="input-field"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              {errors.email && (
                <p
                  style={{
                    color: '#f43f5e',
                    fontSize: '12px',
                    marginTop: '6px',
                  }}
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '6px',
                }}
              >
                Password
              </label>

              <div style={{ position: 'relative' }}>
                <input
                  className="input-field"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ paddingRight: '44px' }}
                />

                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {showPwd ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p
                  style={{
                    color: '#f43f5e',
                    fontSize: '12px',
                    marginTop: '6px',
                  }}
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* GENERAL ERROR */}
            {errors.general && (
              <div
                style={{
                  background: 'var(--accent-rose-dim)',
                  border: '1px solid rgba(247,97,122,0.3)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  marginBottom: '16px',
                  color: 'var(--accent-rose)',
                  fontSize: '13px',
                }}
              >
                {errors.general}
              </div>
            )}

            <button
              className="btn-primary"
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                fontSize: '15px',
              }}
            >
              {loading ? (
                'Signing in...'
              ) : (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  Sign In <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}