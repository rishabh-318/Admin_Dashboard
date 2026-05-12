'use client';

import { TrendingUp, Activity, Target, Zap } from 'lucide-react';

const recentActivity = [
  { action: 'New user registered', user: 'Amira Osei', time: '2 min ago', color: 'var(--accent-green)' },
  { action: 'Order completed', user: 'Tom Erikson — $599', time: '8 min ago', color: 'var(--accent-blue)' },
  { action: 'Subscription cancelled', user: 'Nina Petrova', time: '24 min ago', color: 'var(--accent-rose)' },
  { action: 'New order placed', user: 'Rafael Costa — $199', time: '1 hr ago', color: 'var(--accent-amber)' },
  { action: 'Support ticket opened', user: 'Chen Wei', time: '2 hr ago', color: 'var(--accent-purple)' },
];

const weekData = [65, 78, 52, 90, 88, 74, 95];
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function OverviewExtras() {
  const maxVal = Math.max(...weekData);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginTop: '24px' }}>
      {/* Weekly chart */}
      <div className="glass-card animate-fade-in" style={{ padding: '24px', animationDelay: '0.1s', opacity: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Activity size={14} color="var(--accent-blue)" />
          <h3 style={{ fontWeight: '700', fontSize: '13px' }}>Weekly Activity</h3>
          <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--accent-green)', fontWeight: '600' }}>↑ 12.4%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
          {weekData.map((val, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: i === 6 ? 'var(--accent-blue)' : 'var(--border-light)', height: `${(val / maxVal) * 64}px`, transition: 'height 0.5s ease', minHeight: '4px' }} />
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: '600' }}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="glass-card animate-fade-in" style={{ padding: '24px', animationDelay: '0.2s', opacity: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Target size={14} color="var(--accent-amber)" />
          <h3 style={{ fontWeight: '700', fontSize: '13px' }}>Monthly Goals</h3>
        </div>
        {[
          { label: 'New Users', current: 847, target: 1000, color: 'var(--accent-blue)' },
          { label: 'Revenue', current: 62400, target: 80000, color: 'var(--accent-green)' },
          { label: 'Conversions', current: 68, target: 100, color: 'var(--accent-amber)' },
        ].map(g => {
          const pct = Math.round((g.current / g.target) * 100);
          return (
            <div key={g.label} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '12px', fontWeight: '500' }}>{g.label}</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: g.color, fontFamily: 'Syne, sans-serif' }}>{pct}%</span>
              </div>
              <div style={{ height: '5px', background: 'var(--border-light)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: g.color, borderRadius: '3px', transition: 'width 0.8s ease' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent activity */}
      <div className="glass-card animate-fade-in" style={{ padding: '24px', animationDelay: '0.3s', opacity: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Zap size={14} color="var(--accent-purple)" />
          <h3 style={{ fontWeight: '700', fontSize: '13px' }}>Recent Activity</h3>
        </div>
        {recentActivity.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', paddingBottom: '12px', marginBottom: '12px', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: '5px' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '12px', fontWeight: '500', marginBottom: '2px' }}>{item.action}</p>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.user}</p>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontFamily: 'Syne, sans-serif' }}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
