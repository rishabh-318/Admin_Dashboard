'use client';

import { Menu, Bell } from 'lucide-react';

interface TopbarProps {
  activeTab: string;
  onMenuClick: () => void;
}

const tabLabels: Record<string, string> = {
  overview: 'Overview',
  users: 'Users',
  orders: 'Orders',
  analytics: 'Analytics',
  notifications: 'Alerts',
  settings: 'Settings',
};

export default function Topbar({
  activeTab,
  onMenuClick,
}: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          onClick={onMenuClick}
          className="menu-btn"
        >
          <Menu size={20} />
        </button>

        <div className="topbar-heading">
          <h1>{tabLabels[activeTab]}</h1>

          <p>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className="topbar-right">
        <div className="notification-wrapper">
          <div className="notification-dot" />

          <button className="notification-btn">
            <Bell size={15} />
          </button>
        </div>

        <div className="avatar">
          AD
        </div>
      </div>

      <style>{`
        .topbar {
          height: 60px;
          border-bottom: 1px solid var(--border);
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          gap: 12px;
          position: sticky;
          top: 0;
          z-index: 40;
          width: 100%;
          box-sizing: border-box;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .topbar-heading {
          min-width: 0;
        }

        .topbar-heading h1 {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .topbar-heading p {
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-secondary);
          display: flex;
          padding: 6px;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .notification-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .notification-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-rose);
          border-radius: 50%;
          position: absolute;
          top: 6px;
          right: 6px;
          border: 2px solid var(--bg-secondary);
          z-index: 2;
        }

        .notification-btn {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-secondary);
        }

        .avatar {
          width: 32px;
          height: 32px;
          background: var(--accent-blue-dim);
          border: 1px solid rgba(79,142,247,0.3);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          color: var(--accent-blue);
          font-family: 'Syne', sans-serif;
          cursor: pointer;
          flex-shrink: 0;
        }

        @media (min-width: 1024px) {
          .menu-btn {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .topbar {
            padding: 0 12px;
          }

          .topbar-heading p {
            display: none;
          }

          .topbar-heading h1 {
            font-size: 15px;
          }
        }
      `}</style>
    </header>
  );
}