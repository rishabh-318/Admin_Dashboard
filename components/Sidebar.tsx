'use client';

import { useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  Zap,
  LogOut,
  BarChart2,
  Bell,
  X,
  Package,          // ← NEW
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

// ─── Add 'products' between orders and analytics ───────────────────────────
const navItems = [
  { id: 'overview',       label: 'Overview',  icon: LayoutDashboard },
  { id: 'users',          label: 'Users',     icon: Users           },
  { id: 'orders',         label: 'Orders',    icon: ShoppingCart    },
  { id: 'products',       label: 'Products',  icon: Package         }, // ← NEW
  { id: 'analytics',      label: 'Analytics', icon: BarChart2       },
  { id: 'notifications',  label: 'Alerts',    icon: Bell            },
  { id: 'settings',       label: 'Settings',  icon: Settings        },
];

export default function Sidebar({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const { logout, userEmail } = useAuth();
  const initials = userEmail ? userEmail.slice(0, 2).toUpperCase() : 'AD';

  const handleNav = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px 16px' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', paddingLeft: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', background: 'var(--accent-blue)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            NexAdmin
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: '4px' }}
          className="lg-hidden"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        <p style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', paddingLeft: '8px', fontFamily: 'Syne, sans-serif' }}>
          Main
        </p>
        {/* First 4 items: Overview, Users, Orders, Products */}
        {navItems.slice(0, 4).map(item => (
          <NavItem
            key={item.id}
            item={item}
            active={activeTab === item.id}
            onClick={() => handleNav(item.id)}
          />
        ))}

        <p style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', paddingLeft: '8px', marginTop: '20px', fontFamily: 'Syne, sans-serif' }}>
          More
        </p>
        {/* Remaining: Analytics, Alerts, Settings */}
        {navItems.slice(4).map(item => (
          <NavItem
            key={item.id}
            item={item}
            active={activeTab === item.id}
            onClick={() => handleNav(item.id)}
          />
        ))}
      </nav>

      {/* User + Logout */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', borderRadius: '8px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-blue-dim)', border: '1px solid var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: 'var(--accent-blue)', flexShrink: 0, fontFamily: 'Syne, sans-serif' }}>
            {initials}
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Administrator
            </p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {userEmail}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '13px', transition: 'color 0.2s, background 0.2s' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(247,97,122,0.1)';
            (e.currentTarget as HTMLElement).style.color = 'var(--accent-rose)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'none';
            (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
          }}
        >
          <LogOut size={15} />
          <span style={{ fontWeight: '500' }}>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        style={{ width: '220px', minHeight: '100vh', background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflow: 'auto', display: 'none' }}
        className="sidebar-desktop"
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}>
          <div
            onClick={() => setMobileOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          />
          <aside
            style={{ width: '260px', background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)', position: 'relative', zIndex: 1, animation: 'slideRight 0.25s ease forwards' }}
          >
            <style>{`@keyframes slideRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
            {sidebarContent}
          </aside>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .sidebar-desktop { display: block !important; }
          .lg-hidden { display: none !important; }
        }
      `}</style>
    </>
  );
}

function NavItem({
  item,
  active,
  onClick,
}: {
  item: (typeof navItems)[0];
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 10px',
        borderRadius: '8px',
        background: active ? 'var(--accent-blue-dim)' : 'none',
        border: active ? '1px solid rgba(79,142,247,0.2)' : '1px solid transparent',
        cursor: 'pointer',
        color: active ? 'var(--accent-blue)' : 'var(--text-secondary)',
        fontSize: '13px',
        fontWeight: active ? '600' : '400',
        fontFamily: 'DM Sans, sans-serif',
        transition: 'all 0.15s',
        marginBottom: '2px',
        textAlign: 'left',
      }}
      onMouseEnter={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
          (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.background = 'none';
          (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
        }
      }}
    >
      <Icon size={15} />
      <span>{item.label}</span>
    </button>
  );
}