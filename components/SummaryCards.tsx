'use client';

import { Users, ShoppingCart, DollarSign, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { SUMMARY_DATA } from '@/lib/data';

const cards = [
  {
    title: 'Total Users',
    ...SUMMARY_DATA.totalUsers,
    icon: Users,
    color: 'var(--accent-blue)',
    bgColor: 'var(--accent-blue-dim)',
    borderColor: 'rgba(79,142,247,0.2)',
  },
  {
    title: 'Total Orders',
    ...SUMMARY_DATA.totalOrders,
    icon: ShoppingCart,
    color: 'var(--accent-green)',
    bgColor: 'var(--accent-green-dim)',
    borderColor: 'rgba(45,212,160,0.2)',
  },
  {
    title: 'Total Revenue',
    ...SUMMARY_DATA.totalRevenue,
    icon: DollarSign,
    color: 'var(--accent-amber)',
    bgColor: 'var(--accent-amber-dim)',
    borderColor: 'rgba(245,166,35,0.2)',
  },
  {
    title: 'Pending Tasks',
    ...SUMMARY_DATA.pendingTasks,
    icon: Clock,
    color: 'var(--accent-rose)',
    bgColor: 'var(--accent-rose-dim)',
    borderColor: 'rgba(247,97,122,0.2)',
  },
];

export default function SummaryCards({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[1,2,3,4].map(i => (
          <div key={i} className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="skeleton" style={{ width: '80px', height: '12px', marginBottom: '12px' }} />
                <div className="skeleton" style={{ width: '120px', height: '28px', marginBottom: '8px' }} />
                <div className="skeleton" style={{ width: '60px', height: '12px' }} />
              </div>
              <div className="skeleton" style={{ width: '44px', height: '44px', borderRadius: '10px' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="glass-card animate-fade-in"
            style={{ padding: '24px', animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Syne, sans-serif', marginBottom: '8px' }}>
                  {card.title}
                </p>
                <p style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '10px', fontFamily: 'Syne, sans-serif' }}>
                  {card.value}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {card.positive ? <TrendingUp size={12} color="var(--accent-green)" /> : <TrendingDown size={12} color="var(--accent-rose)" />}
                  <span style={{ fontSize: '12px', fontWeight: '500', color: card.positive ? 'var(--accent-green)' : 'var(--accent-rose)' }}>
                    {card.change}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>vs last month</span>
                </div>
              </div>
              <div style={{ width: '44px', height: '44px', background: card.bgColor, border: `1px solid ${card.borderColor}`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} color={card.color} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
