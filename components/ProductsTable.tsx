'use client';

import { useState, useMemo } from 'react';
import { DUMMY_PRODUCTS } from '@/lib/data';
import { Product } from '@/types';
import { Search, Package, Eye, TrendingUp, TrendingDown } from 'lucide-react';
import DetailModal from './DetailModal';

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  Electronics:    { bg: 'var(--accent-blue-dim)',   color: 'var(--accent-blue)'   },
  'Home & Office':{ bg: 'var(--accent-purple-dim)', color: 'var(--accent-purple)' },
  Footwear:       { bg: 'var(--accent-amber-dim)',  color: 'var(--accent-amber)'  },
  Stationery:     { bg: 'var(--accent-teal-dim)',   color: 'var(--accent-teal)'   },
  Accessories:    { bg: 'var(--accent-rose-dim)',   color: 'var(--accent-rose)'   },
};

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Active:           { bg: 'var(--accent-green-dim)', color: 'var(--accent-green)' },
  'Low Stock':      { bg: 'var(--accent-amber-dim)', color: 'var(--accent-amber)' },
  'Out of Stock':   { bg: 'var(--accent-rose-dim)',  color: 'var(--accent-rose)'  },
};

function StatusBadge({ status }: { status: Product['status'] }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE['Active'];
  return (
    <span className="badge" style={{ background: s.bg, color: s.color }}>
      {status}
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const s = CATEGORY_COLORS[category] ?? { bg: 'rgba(79,90,110,0.2)', color: 'var(--text-muted)' };
  return (
    <span
      className="badge"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}33` }}
    >
      {category}
    </span>
  );
}

export default function ProductsTable({ loading }: { loading: boolean }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(
    () =>
      DUMMY_PRODUCTS.filter(p => {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
        );
      }),
    [search],
  );

  const totalRevenue = DUMMY_PRODUCTS.reduce((sum, p) => sum + p.price * p.sold, 0);
  const totalStock   = DUMMY_PRODUCTS.reduce((sum, p) => sum + p.stock, 0);
  const activeCount  = DUMMY_PRODUCTS.filter(p => p.status === 'Active').length;

  if (loading) {
    return (
      <div className="glass-card" style={{ padding: '24px' }}>
        <div className="skeleton" style={{ height: '24px', width: '120px', marginBottom: '20px' }} />
        <div className="skeleton" style={{ height: '40px', marginBottom: '16px' }} />
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton" style={{ height: '52px', marginBottom: '8px' }} />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Summary row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        {[
          { label: 'Total Products', value: DUMMY_PRODUCTS.length.toString(), delta: '↑ 3 this month', deltaColor: 'var(--accent-green)' },
          { label: 'Active Listings', value: activeCount.toString(), delta: 'All healthy', deltaColor: 'var(--accent-green)' },
          { label: 'Units in Stock',  value: totalStock.toLocaleString(), delta: '2 low stock items', deltaColor: 'var(--accent-amber)' },
          { label: 'Catalog Revenue', value: `$${(totalRevenue / 1000).toFixed(0)}k`, delta: '↑ +14.2% vs last month', deltaColor: 'var(--accent-green)' },
        ].map(card => (
          <div key={card.label} className="glass-card animate-fade-in" style={{ padding: '16px 18px' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Syne, sans-serif', marginBottom: '8px' }}>
              {card.label}
            </p>
            <p style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              {card.value}
            </p>
            <p style={{ fontSize: '11px', color: card.deltaColor }}>{card.delta}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card animate-fade-in" style={{ overflow: 'hidden' }}>
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px', height: '32px',
                background: 'var(--accent-teal-dim)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Package size={14} color="var(--accent-teal)" />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '14px' }}>Products</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                {filtered.length} of {DUMMY_PRODUCTS.length} products
              </p>
            </div>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search
              size={13}
              style={{
                position: 'absolute', left: '12px', top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)', pointerEvents: 'none',
              }}
            />
            <input
              className="input-field"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '34px', height: '36px', fontSize: '13px' }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Product', 'SKU', 'Category', 'Price', 'Stock', 'Units Sold', 'Status', ''].map(h => (
                  <th
                    key={h}
                    style={{
                      padding: '12px 16px', textAlign: 'left',
                      fontSize: '10px', fontWeight: 700,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      fontFamily: 'Syne, sans-serif', whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '60px 20px', textAlign: 'center' }}>
                    <div>
                      <div
                        style={{
                          width: '48px', height: '48px',
                          background: 'var(--bg-card-hover)',
                          borderRadius: '12px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          margin: '0 auto 12px',
                        }}
                      >
                        <Package size={20} color="var(--text-muted)" />
                      </div>
                      <p style={{ fontWeight: 600, marginBottom: '4px' }}>No products found</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                        Try adjusting your search
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((product, i) => {
                  const catStyle = CATEGORY_COLORS[product.category] ?? {
                    bg: 'rgba(79,90,110,0.2)', color: 'var(--text-muted)',
                  };
                  const stockColor =
                    product.stock === 0
                      ? 'var(--accent-rose)'
                      : product.stock < 15
                      ? 'var(--accent-amber)'
                      : 'var(--text-primary)';

                  return (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: '1px solid var(--border)',
                        transition: 'background 0.15s',
                        animationDelay: `${i * 0.03}s`,
                      }}
                      onMouseEnter={e =>
                        ((e.currentTarget as HTMLElement).style.background = 'var(--bg-card-hover)')
                      }
                      onMouseLeave={e =>
                        ((e.currentTarget as HTMLElement).style.background = 'transparent')
                      }
                    >
                      {/* Product */}
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '34px', height: '34px', borderRadius: '8px',
                              background: catStyle.bg,
                              border: `1px solid ${catStyle.color}44`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <Package size={14} color={catStyle.color} />
                          </div>
                          <div>
                            <p style={{ fontWeight: 600, fontSize: '13px' }}>{product.name}</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{product.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td
                        style={{
                          padding: '12px 16px',
                          color: 'var(--text-secondary)',
                          fontSize: '11.5px',
                          fontFamily: 'monospace',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {product.sku}
                      </td>

                      {/* Category */}
                      <td style={{ padding: '12px 16px' }}>
                        <CategoryBadge category={product.category} />
                      </td>

                      {/* Price */}
                      <td style={{ padding: '12px 16px', fontWeight: 600, fontSize: '13px' }}>
                        ${product.price}
                      </td>

                      {/* Stock */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 600, fontSize: '13px', color: stockColor }}>
                            {product.stock}
                          </span>
                          {product.stock > 0 && product.stock < 15 && (
                            <span style={{ fontSize: '9.5px', color: 'var(--accent-amber)', fontWeight: 600 }}>
                              low
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Units Sold */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ fontWeight: 600, fontSize: '13px' }}>
                            {product.sold.toLocaleString()}
                          </span>
                          {product.trend === 'up' ? (
                            <TrendingUp size={13} color="var(--accent-green)" />
                          ) : (
                            <TrendingDown size={13} color="var(--accent-rose)" />
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px 16px' }}>
                        <StatusBadge status={product.status} />
                      </td>

                      {/* Action */}
                      <td style={{ padding: '12px 16px' }}>
                        <button
                          onClick={() => setSelected(product)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            padding: '5px 10px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            color: 'var(--text-secondary)',
                            fontSize: '11px', fontWeight: 600,
                            transition: 'all 0.15s',
                            whiteSpace: 'nowrap',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)';
                            (e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                            (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                          }}
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

      {selected && (
        <DetailModal item={selected} type="product" onClose={() => setSelected(null)} />
      )}
    </>
  );
}