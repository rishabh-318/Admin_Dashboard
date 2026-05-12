'use client';

import { useState, useMemo } from 'react';
import { DUMMY_ORDERS } from '@/lib/data';
import { Order } from '@/types';
import { Search, SlidersHorizontal, Eye, ShoppingCart, ChevronDown } from 'lucide-react';
import DetailModal from './DetailModal';

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Completed: { bg: 'var(--accent-green-dim)', color: 'var(--accent-green)' },
    Processing: { bg: 'var(--accent-blue-dim)', color: 'var(--accent-blue)' },
    Pending: { bg: 'var(--accent-amber-dim)', color: 'var(--accent-amber)' },
    Cancelled: { bg: 'var(--accent-rose-dim)', color: 'var(--accent-rose)' },
  };
  const style = map[status] || map.Pending;
  return <span className="badge" style={{ background: style.bg, color: style.color }}>{status}</span>;
}

export default function OrdersTable({ loading }: { loading: boolean }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selected, setSelected] = useState<Order | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return DUMMY_ORDERS.filter(o => {
      const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.product.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'All' || o.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [search, filterStatus]);

  if (loading) {
    return (
      <div className="glass-card" style={{ padding: '24px' }}>
        <div className="skeleton" style={{ height: '24px', width: '120px', marginBottom: '20px' }} />
        {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: '52px', marginBottom: '8px' }} />)}
      </div>
    );
  }

  return (
    <>
      <div className="glass-card animate-fade-in">
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--accent-green-dim)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingCart size={14} color="var(--accent-green)" />
            </div>
            <div>
              <h3 style={{ fontWeight: '700', fontSize: '14px' }}>Orders</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{filtered.length} of {DUMMY_ORDERS.length} orders</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', minWidth: '220px' }}>
              <Search size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
              <input
                className="input-field"
                placeholder="Search orders..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: '34px', height: '36px', fontSize: '13px' }}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{ height: '36px', padding: '0 12px', background: showFilters ? 'var(--accent-blue-dim)' : 'var(--bg-secondary)', border: `1px solid ${showFilters ? 'rgba(79,142,247,0.3)' : 'var(--border)'}`, borderRadius: '8px', cursor: 'pointer', color: showFilters ? 'var(--accent-blue)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', transition: 'all 0.2s' }}
            >
              <SlidersHorizontal size={13} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Syne, sans-serif' }}>Status:</span>
            {['All', 'Completed', 'Processing', 'Pending', 'Cancelled'].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', fontFamily: 'Syne, sans-serif', cursor: 'pointer', border: '1px solid', transition: 'all 0.15s',
                  background: filterStatus === s ? 'var(--accent-blue-dim)' : 'transparent',
                  borderColor: filterStatus === s ? 'rgba(79,142,247,0.3)' : 'var(--border)',
                  color: filterStatus === s ? 'var(--accent-blue)' : 'var(--text-secondary)',
                }}
              >{s}</button>
            ))}
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date', ''].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Syne, sans-serif', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '60px 20px', textAlign: 'center' }}>
                    <div>
                      <div style={{ width: '48px', height: '48px', background: 'var(--bg-card-hover)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                        <ShoppingCart size={20} color="var(--text-muted)" />
                      </div>
                      <p style={{ fontWeight: '600', marginBottom: '4px' }}>No orders found</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-card-hover)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <td style={{ padding: '12px 16px', fontFamily: 'Syne, sans-serif', fontWeight: '700', fontSize: '12px', color: 'var(--accent-blue)', whiteSpace: 'nowrap' }}>{order.id}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '500', whiteSpace: 'nowrap' }}>{order.customer}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.product}</td>
                    <td style={{ padding: '12px 16px', fontWeight: '700', fontSize: '14px', fontFamily: 'Syne, sans-serif', whiteSpace: 'nowrap' }}>${order.amount.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px' }}><StatusBadge status={order.status} /></td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '12px', whiteSpace: 'nowrap' }}>{new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <button
                        onClick={() => setSelected(order)}
                        style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '600', transition: 'all 0.15s', whiteSpace: 'nowrap' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                      >
                        <Eye size={11} /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <DetailModal item={selected} type="order" onClose={() => setSelected(null)} />}
    </>
  );
}
