'use client';

import { BarChart2, Bell, Settings, Construction } from 'lucide-react';

const placeholders: Record<string, { icon: React.ElementType; title: string; desc: string; color: string }> = {
  analytics: { icon: BarChart2, title: 'Analytics', desc: 'Detailed charts and reports will appear here.', color: 'var(--accent-purple)' },
  notifications: { icon: Bell, title: 'Alerts & Notifications', desc: 'Manage your notification preferences here.', color: 'var(--accent-amber)' },
  settings: { icon: Settings, title: 'Settings', desc: 'Account, security, and system settings.', color: 'var(--text-secondary)' },
};

export default function PlaceholderTab({ tab }: { tab: string }) {
  const p = placeholders[tab] || placeholders.settings;
  const Icon = p.icon;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', textAlign: 'center' }}>
      <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `${p.color}22`, border: `1px solid ${p.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
        <Icon size={28} color={p.color} />
      </div>
      <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.02em' }}>{p.title}</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '300px', marginBottom: '20px' }}>{p.desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px' }}>
        <Construction size={12} color="var(--text-muted)" />
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Coming soon</span>
      </div>
    </div>
  );
}
