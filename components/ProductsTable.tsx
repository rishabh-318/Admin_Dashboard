'use client';

import { useState, useMemo } from 'react';
import { DUMMY_PRODUCTS } from '@/lib/data';
import { Product } from '@/types';
import { Search, SlidersHorizontal, Eye, Package, TrendingUp, TrendingDown } from 'lucide-react';
import DetailModal from './DetailModal';

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  Electronics:    { bg: 'var(--accent-blue-dim)',   color: 'var(--accent-blue)'   },
  'Home & Office':{ bg: 'var(--accent-purple-dim)', color: 'var(--accent-purple)' },
  Footwear:       { bg: 'var(--accent-amber-dim)',  color: 'var(--accent-amber)'  },
  Stationery:     { bg: 'var(--accent-green-dim)',  color: 'var(--accent-green)'  },
  Accessories:    { bg: 'var(--accent-rose-dim)',   color: 'var(--accent-rose)'   },
};

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  'In Stock':     { bg: 'var(--accent-green-dim)', color: 'var(--accent-green)' },
  'Low Stock':    { bg: 'var(--accent-amber-dim)', color: 'var(--accent-amber)' },
  'Out of Stock': { bg: 'var(--accent-rose-dim)',  color: 'var(--accent-rose)'  },
};

function StatusBadge({ status }: { status: Product['status'] }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE['In Stock'];
  return <span className="badge" style={{ background: s.bg, color: s.color }}>{status}</span>;
}

function CategoryBadge({ category }: { category: string }) {
  const s = CATEGORY_COLORS[category] ?? { bg: 'rgba(79,90,110,0.2)', color: 'var(--text-muted)' };
  return (
    <span className="badge" style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}33` }}>
      {category}
    </span>
  );
}

export default function ProductsTable({ loading }: { loading: boolean }) {
  const [search, setSearch]           = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selected, setSelected]       = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return DUMMY_PRODUCTS.filter(p => {
      const q = search.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(q)     ||
        p.sku.toLowerCase().includes(q)      ||
        p.category.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q);
      const matchStatus   = filterStatus   === 'All' || p.status   === filterStatus;
      const matchCategory = filterCategory === 'All' || p.category === filterCategory;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [search, filterStatus, filterCategory]);

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
      <div className="glass-card animate-fade-in">
        {/* ── Table header ─────────────────────────── */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--accent-purple-dim)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={14} color="var(--accent-purple)" />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '14px' }}>Products</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                {filtered.length} of {DUMMY_PRODUCTS.length} products
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', minWidth: '220px' }}>
              <Search size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
              <input
                className="input-field"
                placeholder="Search products..."
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

        {/* ── Filter row ───────────────────────────── */}
        {showFilters && (
          <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Status pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Syne, sans-serif' }}>Status:</span>
              {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, fontFamily: 'Syne, sans-serif', cursor: 'pointer', border: '1px solid', transition: 'all 0.15s',
                    background:   filterStatus === s ? 'var(--accent-blue-dim)' : 'transparent',
                    borderColor:  filterStatus === s ? 'rgba(79,142,247,0.3)'  : 'var(--border)',
                    color:        filterStatus === s ? 'var(--accent-blue)'     : 'var(--text-secondary)',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Category pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Syne, sans-serif' }}>Category:</span>
              {['All', 'Electronics', 'Home & Office', 'Footwear', 'Stationery', 'Accessories'].map(c => (
                <button
                  key={c}
                  onClick={() => setFilterCategory(c)}
                  style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, fontFamily: 'Syne, sans-serif', cursor: 'pointer', border: '1px solid', transition: 'all 0.15s',
                    background:  filterCategory === c ? 'var(--accent-purple-dim)'     : 'transparent',
                    borderColor: filterCategory === c ? 'rgba(167,139,250,0.3)'        : 'var(--border)',
                    color:       filterCategory === c ? 'var(--accent-purple)'         : 'var(--text-secondary)',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            {(filterStatus !== 'All' || filterCategory !== 'All') && (
              <button
                onClick={() => { setFilterStatus('All'); setFilterCategory('All'); }}
                style={{ fontSize: '11px', color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* ── Table ────────────────────────────────── */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Product', 'SKU', 'Category', 'Price', 'Stock', 'Sales', 'Rating', 'Status', ''].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Syne, sans-serif', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: '60px 20px', textAlign: 'center' }}>
                    <div>
                      <div style={{ width: '48px', height: '48px', background: 'var(--bg-card-hover)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                        <Package size={20} color="var(--text-muted)" />
                      </div>
                      <p style={{ fontWeight: 600, marginBottom: '4px' }}>No products found</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((product, i) => {
                  const catStyle  = CATEGORY_COLORS[product.category] ?? { bg: 'rgba(79,90,110,0.2)', color: 'var(--text-muted)' };
                  const stockColor =
                    product.stock === 0  ? 'var(--accent-rose)'   :
                    product.stock < 15   ? 'var(--accent-amber)'  :
                                           'var(--text-primary)';
                  return (
                    <tr
                      key={product.id}
                      style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s', animationDelay: `${i * 0.03}s` }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--bg-card-hover)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                    >
                      {/* Product */}
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: catStyle.bg, border: `1px solid ${catStyle.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                            {product.image}
                          </div>
                          <div>
                            <p style={{ fontWeight: 600, fontSize: '13px' }}>{product.name}</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{product.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '11.5px', fontFamily: 'monospace', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                        {product.sku}
                      </td>

                      {/* Category */}
                      <td style={{ padding: '12px 16px' }}>
                        <CategoryBadge category={product.category} />
                      </td>

                      {/* Price */}
                      <td style={{ padding: '12px 16px', fontWeight: 700, fontSize: '13px', whiteSpace: 'nowrap' }}>
                        ${product.price}
                      </td>

                      {/* Stock */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ fontWeight: 600, fontSize: '13px', color: stockColor }}>
                            {product.stock}
                          </span>
                          {product.stock > 0 && product.stock < 15 && (
                            <span style={{ fontSize: '9.5px', color: 'var(--accent-amber)', fontWeight: 700 }}>low</span>
                          )}
                        </div>
                      </td>

                      {/* Sales */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ fontWeight: 600, fontSize: '13px' }}>
                            {product.sales.toLocaleString()}
                          </span>
                          {product.trend === 'up'
                            ? <TrendingUp  size={13} color="var(--accent-green)" />
                            : <TrendingDown size={13} color="var(--accent-rose)"  />
                          }
                        </div>
                      </td>

                      {/* Rating */}
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ color: 'var(--accent-amber)', fontSize: '12px' }}>★</span>
                          <span style={{ fontWeight: 600, fontSize: '13px' }}>{product.rating}</span>
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
                          style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 600, transition: 'all 0.15s', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';     (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
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