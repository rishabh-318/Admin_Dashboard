'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

import SummaryCards from '@/components/SummaryCards';

import UsersTable from '@/components/UsersTable';
import OrdersTable from '@/components/OrdersTable';
import ProductsTable from '@/components/ProductsTable';

import OverviewExtras from '@/components/OverviewExtras';
import PlaceholderTab from '@/components/PlaceholderTab';

export default function DashboardPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState('overview');

  const [loading, setLoading] =
    useState(true);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
      return;
    }

    const t = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(t);
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Right Side */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          width: '100%',
        }}
      >
        {/* Topbar */}
        <Topbar
          activeTab={activeTab}
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />

        {/* Main Content */}
        <div
          className="dashboard-content"
          style={{
            flex: 1,
            padding: '24px',
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          {/* Summary Cards */}
          {[
            'overview',
            'users',
            'orders',
            'products',
          ].includes(activeTab) && (
            <SummaryCards loading={loading} />
          )}

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              <div className="dashboard-grid">
                <div style={{ minWidth: 0 }}>
                  <UsersTable loading={loading} />
                </div>

                <div style={{ minWidth: 0 }}>
                  <OrdersTable loading={loading} />
                </div>
              </div>

              <div
                style={{
                  marginTop: '16px',
                }}
              >
                <ProductsTable
                  loading={loading}
                />
              </div>

              <OverviewExtras />
            </>
          )}

          {/* USERS */}
          {activeTab === 'users' && (
            <UsersTable loading={loading} />
          )}

          {/* ORDERS */}
          {activeTab === 'orders' && (
            <OrdersTable loading={loading} />
          )}

          {/* PRODUCTS */}
          {activeTab === 'products' && (
            <ProductsTable
              loading={loading}
            />
          )}

          {/* PLACEHOLDER TABS */}
          {[
            'analytics',
            'notifications',
            'settings',
          ].includes(activeTab) && (
            <PlaceholderTab
              tab={activeTab}
            />
          )}
        </div>
      </main>

      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-content {
            padding: 16px !important;
          }
        }

        @media (max-width: 480px) {
          .dashboard-content {
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}