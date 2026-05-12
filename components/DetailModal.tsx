'use client';

import { User, Order, Product } from '@/types';

import {
  X,
  Mail,
  MapPin,
  ShoppingBag,
  DollarSign,
  Calendar,
  Shield,
} from 'lucide-react';

interface ModalProps {
  item: User | Order | Product | null;
  type: 'user' | 'order' | 'product';
  onClose: () => void;
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const map: Record<
    string,
    { bg: string; color: string }
  > = {
    Active: {
      bg: 'var(--accent-green-dim)',
      color: 'var(--accent-green)',
    },

    Inactive: {
      bg: 'rgba(79,90,110,0.2)',
      color: 'var(--text-muted)',
    },

    Pending: {
      bg: 'var(--accent-amber-dim)',
      color: 'var(--accent-amber)',
    },

    Completed: {
      bg: 'var(--accent-green-dim)',
      color: 'var(--accent-green)',
    },

    Processing: {
      bg: 'var(--accent-blue-dim)',
      color: 'var(--accent-blue)',
    },

    Cancelled: {
      bg: 'var(--accent-rose-dim)',
      color: 'var(--accent-rose)',
    },

    'In Stock': {
      bg: 'var(--accent-green-dim)',
      color: 'var(--accent-green)',
    },

    'Low Stock': {
      bg: 'var(--accent-amber-dim)',
      color: 'var(--accent-amber)',
    },

    'Out of Stock': {
      bg: 'var(--accent-rose-dim)',
      color: 'var(--accent-rose)',
    },
  };

  const style = map[status] || map.Inactive;

  return (
    <span
      className="badge"
      style={{
        background: style.bg,
        color: style.color,
      }}
    >
      {status}
    </span>
  );
}

export default function DetailModal({
  item,
  type,
  onClose,
}: ModalProps) {
  if (!item) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={e => {
        if (e.target === e.currentTarget)
          onClose();
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
        }}
        onClick={onClose}
      />

      <div
        className="animate-modal-in glass-card"
        style={{
          width: '100%',
          maxWidth: '480px',
          position: 'relative',
          zIndex: 1,
          padding: '28px',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems: 'flex-start',
            marginBottom: '24px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '4px',
                fontFamily:
                  'Syne, sans-serif',
              }}
            >
              {type === 'user'
                ? 'User Profile'
                : type === 'order'
                ? 'Order Details'
                : 'Product Details'}
            </p>

            <h2
              style={{
                fontSize: '18px',
                fontWeight: '800',
                letterSpacing: '-0.02em',
              }}
            >
              {type === 'user'
                ? (item as User).name
                : type === 'order'
                ? (item as Order).id
                : (item as Product).name}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background:
                'var(--bg-card-hover)',
              border:
                '1px solid var(--border)',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color:
                'var(--text-secondary)',
              flexShrink: 0,
            }}
          >
            <X size={15} />
          </button>
        </div>

        {type === 'user' ? (
          <UserDetails user={item as User} />
        ) : type === 'order' ? (
          <OrderDetails
            order={item as Order}
          />
        ) : (
          <ProductDetails
            product={item as Product}
          />
        )}
      </div>
    </div>
  );
}

function UserDetails({
  user,
}: {
  user: User;
}) {
  const avatarColors: Record<
    string,
    string
  > = {
    Admin: 'var(--accent-rose)',
    Manager: 'var(--accent-purple)',
    Editor: 'var(--accent-amber)',
    Viewer: 'var(--accent-blue)',
  };

  const color =
    avatarColors[user.role] ||
    'var(--accent-blue)';

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px',
          padding: '16px',
          background:
            'var(--bg-secondary)',
          borderRadius: '10px',
          border:
            '1px solid var(--border)',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: `${color}22`,
            border: `2px solid ${color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: '800',
            color,
            fontFamily:
              'Syne, sans-serif',
            flexShrink: 0,
          }}
        >
          {user.avatar}
        </div>

        <div>
          <p
            style={{
              fontWeight: '700',
              fontSize: '16px',
              marginBottom: '4px',
            }}
          >
            {user.name}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap',
            }}
          >
            <StatusBadge
              status={user.status}
            />

            <span
              className="badge"
              style={{
                background: `${color}22`,
                color,
              }}
            >
              {user.role}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            '1fr 1fr',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <DetailRow
          icon={<Mail size={13} />}
          label="Email"
          value={user.email}
          fullWidth
        />

        <DetailRow
          icon={<MapPin size={13} />}
          label="Location"
          value={user.location}
        />

        <DetailRow
          icon={<Calendar size={13} />}
          label="Joined"
          value={new Date(
            user.joinedAt
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        />

        <DetailRow
          icon={<Shield size={13} />}
          label="User ID"
          value={user.id}
        />

        <DetailRow
          icon={<ShoppingBag size={13} />}
          label="Total Orders"
          value={`${user.orders} orders`}
        />

        <DetailRow
          icon={<DollarSign size={13} />}
          label="Total Spent"
          value={`$${user.spent.toLocaleString()}`}
        />
      </div>
    </div>
  );
}

function OrderDetails({
  order,
}: {
  order: Order;
}) {
  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          padding: '24px',
          background:
            'var(--bg-secondary)',
          borderRadius: '10px',
          border:
            '1px solid var(--border)',
          marginBottom: '20px',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontFamily:
              'Syne, sans-serif',
            marginBottom: '8px',
          }}
        >
          Order Amount
        </p>

        <p
          style={{
            fontSize: '36px',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            fontFamily:
              'Syne, sans-serif',
            color:
              'var(--text-primary)',
          }}
        >
          $
          {(order.amount ?? 0).toLocaleString()}
        </p>

        <div style={{ marginTop: '10px' }}>
          <StatusBadge
            status={order.status}
          />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            '1fr 1fr',
          gap: '12px',
        }}
      >
        <DetailRow
          icon={<ShoppingBag size={13} />}
          label="Product"
          value={order.product}
          fullWidth
        />

        <DetailRow
          icon={<Mail size={13} />}
          label="Customer"
          value={order.customer}
          fullWidth
        />

        <DetailRow
          icon={<Calendar size={13} />}
          label="Order Date"
          value={new Date(
            order.date
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        />

        <DetailRow
          icon={<Shield size={13} />}
          label="Order ID"
          value={order.id}
        />

        <DetailRow
          icon={<ShoppingBag size={13} />}
          label="Items"
          value={`${order.items} item${
            order.items > 1 ? 's' : ''
          }`}
        />

        <DetailRow
          icon={<DollarSign size={13} />}
          label="Payment"
          value={order.paymentMethod}
        />
      </div>
    </div>
  );
}

function ProductDetails({
  product,
}: {
  product: Product;
}) {
  const statusColors: Record<
    string,
    string
  > = {
    'In Stock':
      'var(--accent-green)',

    'Low Stock':
      'var(--accent-amber)',

    'Out of Stock':
      'var(--accent-rose)',
  };

  const color =
    statusColors[product.status] ||
    'var(--text-secondary)';

  return (
    <div>
      <div
        style={{
          padding: '20px',
          background:
            'var(--bg-secondary)',
          borderRadius: '10px',
          border:
            '1px solid var(--border)',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '12px',
              background:
                'var(--bg-card)',
              border:
                '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              flexShrink: 0,
            }}
          >
            {product.image || '📦'}
          </div>

          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '6px',
              }}
            >
              {product.name}
            </p>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <StatusBadge
                status={product.status}
              />

              <span
                className="badge"
                style={{
                  background: `${color}22`,
                  color,
                }}
              >
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          padding: '24px',
          background:
            'var(--bg-secondary)',
          borderRadius: '10px',
          border:
            '1px solid var(--border)',
          marginBottom: '20px',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontFamily:
              'Syne, sans-serif',
            marginBottom: '8px',
          }}
        >
          Product Price
        </p>

        <p
          style={{
            fontSize: '36px',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            fontFamily:
              'Syne, sans-serif',
          }}
        >
          $
          {(product.price ?? 0).toLocaleString()}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            '1fr 1fr',
          gap: '12px',
        }}
      >
        <DetailRow
          icon={<ShoppingBag size={13} />}
          label="Brand"
          value={product.brand}
        />

        <DetailRow
          icon={<Shield size={13} />}
          label="SKU"
          value={product.sku}
        />

        <DetailRow
          icon={<DollarSign size={13} />}
          label="Stock"
          value={`${
            product.stock ?? 0
          } units`}
        />

        <DetailRow
          icon={<ShoppingBag size={13} />}
          label="Sales"
          value={`${
            product.sales ?? 0
          } sold`}
        />

        <DetailRow
          icon={<Calendar size={13} />}
          label="Created"
          value={new Date(
            product.createdAt
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        />

        <DetailRow
          icon={<Mail size={13} />}
          label="Rating"
          value={`${
            product.rating ?? 0
          }/5`}
        />
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  fullWidth,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div
      style={{
        gridColumn: fullWidth
          ? '1 / -1'
          : undefined,
        padding: '12px',
        background:
          'var(--bg-secondary)',
        borderRadius: '8px',
        border:
          '1px solid var(--border)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '4px',
        }}
      >
        <span
          style={{
            color: 'var(--text-muted)',
          }}
        >
          {icon}
        </span>

        <span
          style={{
            fontSize: '10px',
            fontWeight: '700',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontFamily:
              'Syne, sans-serif',
          }}
        >
          {label}
        </span>
      </div>

      <p
        style={{
          fontSize: '13px',
          fontWeight: '500',
          color: 'var(--text-primary)',
          wordBreak: 'break-all',
        }}
      >
        {value}
      </p>
    </div>
  );
}