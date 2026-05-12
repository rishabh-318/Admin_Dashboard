'use client';

import { useState, useMemo } from 'react';
import { DUMMY_USERS } from '@/lib/data';
import { User } from '@/types';
import { Search, SlidersHorizontal, Eye, Users, ChevronDown } from 'lucide-react';
import DetailModal from './DetailModal';

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: 'var(--accent-green-dim)', color: 'var(--accent-green)' },
    Inactive: { bg: 'rgba(79,90,110,0.2)', color: 'var(--text-muted)' },
    Pending: { bg: 'var(--accent-amber-dim)', color: 'var(--accent-amber)' },
  };
  const style = map[status] || map.Inactive;
  return <span className="badge" style={{ background: style.bg, color: style.color }}>{status}</span>;
}

function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = {
    Admin: 'var(--accent-rose)', Manager: 'var(--accent-purple)', Editor: 'var(--accent-amber)', Viewer: 'var(--accent-blue)',
  };
  const color = map[role] || 'var(--text-secondary)';
  return <span className="badge" style={{ background: `${color}22`, color, border: `1px solid ${color}33` }}>{role}</span>;
}

export default function UsersTable({ loading }: { loading: boolean }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterRole, setFilterRole] = useState('All');
  const [selected, setSelected] = useState<User | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return DUMMY_USERS.filter(u => {
      const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'All' || u.status === filterStatus;
      const matchRole = filterRole === 'All' || u.role === filterRole;
      return matchSearch && matchStatus && matchRole;
    });
  }, [search, filterStatus, filterRole]);

  const avatarColors: Record<string, string> = {
    Admin: 'var(--accent-rose)', Manager: 'var(--accent-purple)', Editor: 'var(--accent-amber)', Viewer: 'var(--accent-blue)',
  };

  if (loading) {
    return (
      <div className="glass-card" style={{ padding: '24px' }}>
        <div className="skeleton" style={{ height: '24px', width: '120px', marginBottom: '20px' }} />
        <div className="skeleton" style={{ height: '40px', marginBottom: '16px' }} />
        {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: '52px', marginBottom: '8px' }} />)}
      </div>
    );
  }

  return (
    <>
      <div className="glass-card animate-fade-in" style={{ overflow: 'hidden' }}>
        {/* Table header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--accent-blue-dim)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={14} color="var(--accent-blue)" />
            </div>
            <div>
              <h3 style={{ fontWeight: '700', fontSize: '14px' }}>Users</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{filtered.length} of {DUMMY_USERS.length} users</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', minWidth: '220px' }}>
              <Search size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
              <input
                className="input-field"
                placeholder="Search users..."
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

        {/* Filters row */}
        {showFilters && (
          <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Syne, sans-serif' }}>Filters:</span>
            <FilterSelect label="Status" value={filterStatus} onChange={setFilterStatus} options={['All', 'Active', 'Inactive', 'Pending']} />
            <FilterSelect label="Role" value={filterRole} onChange={setFilterRole} options={['All', 'Admin', 'Manager', 'Editor', 'Viewer']} />
            {(filterStatus !== 'All' || filterRole !== 'All') && (
              <button onClick={() => { setFilterStatus('All'); setFilterRole('All'); }} style={{ fontSize: '11px', color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['User', 'Status', 'Role', 'Location', 'Orders', 'Spent', ''].map(h => (
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
                        <Users size={20} color="var(--text-muted)" />
                      </div>
                      <p style={{ fontWeight: '600', marginBottom: '4px' }}>No users found</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((user, i) => {
                  const color = avatarColors[user.role] || 'var(--accent-blue)';
                  return (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s', animationDelay: `${i * 0.03}s` }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-card-hover)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: `${color}22`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color, flexShrink: 0, fontFamily: 'Syne, sans-serif' }}>
                            {user.avatar}
                          </div>
                          <div>
                            <p style={{ fontWeight: '600', fontSize: '13px' }}>{user.name}</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}><StatusBadge status={user.status} /></td>
                      <td style={{ padding: '12px 16px' }}><RoleBadge role={user.role} /></td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '12px', whiteSpace: 'nowrap' }}>{user.location}</td>
                      <td style={{ padding: '12px 16px', fontWeight: '600', fontSize: '13px' }}>{user.orders}</td>
                      <td style={{ padding: '12px 16px', fontWeight: '600', fontSize: '13px', color: 'var(--accent-green)' }}>${user.spent.toLocaleString()}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <button
                          onClick={() => setSelected(user)}
                          style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '600', transition: 'all 0.15s', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                        >
                          <Eye size={11} /> View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <DetailModal item={selected} type="user" onClose={() => setSelected(null)} />}
    </>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ appearance: 'none', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px', color: value !== 'All' ? 'var(--accent-blue)' : 'var(--text-secondary)', padding: '5px 28px 5px 10px', fontSize: '12px', cursor: 'pointer', outline: 'none', fontFamily: 'DM Sans, sans-serif', borderColor: value !== 'All' ? 'rgba(79,142,247,0.3)' : 'var(--border)' }}
      >
        {options.map(o => <option key={o} value={o}>{o === 'All' ? `All ${label}s` : o}</option>)}
      </select>
      <ChevronDown size={11} style={{ position: 'absolute', right: '8px', pointerEvents: 'none', color: 'var(--text-muted)' }} />
    </div>
  );
}
