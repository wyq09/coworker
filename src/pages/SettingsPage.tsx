/**
 * 设置页面
 * iOS 26 Liquid Glass 风格
 */

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Modal } from '@/components/Modal';

export function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const settings = [
    {
      title: 'Appearance',
      items: [
        {
          label: 'Theme',
          type: 'select',
          value: theme,
          options: ['light', 'dark', 'system'],
          onChange: (value: string) => setTheme(value as 'light' | 'dark' | 'system'),
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          label: 'Email',
          value: user?.email || '',
          readonly: true,
        },
        {
          label: 'Name',
          value: user?.name || '',
          readonly: true,
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          label: 'Version',
          value: '0.1.0',
          readonly: true,
        },
        {
          label: 'Build',
          value: 'Development',
          readonly: true,
        },
      ],
    },
  ];

  const handleLogout = async () => {
    await logout();
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-text-secondary mt-1">Manage your preferences</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settings.map((section, sectionIndex) => (
            <Card key={sectionIndex} padding="lg">
              <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
                  >
                    <span className="text-text-secondary">{item.label}</span>

                    {item.type === 'select' ? (
                      <select
                        value={item.value}
                        onChange={(e) => (item as any).onChange(e.target.value)}
                        className="glass-input px-4 py-2 rounded-xl text-sm"
                      >
                        {(item as any).options.map((option: string) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`font-medium ${item.readonly ? 'text-text-secondary' : ''}`}>
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {/* Danger Zone */}
          <Card variant="default" padding="lg" className="border-red-200 dark:border-red-900">
            <h2 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">
              Danger Zone
            </h2>
            <Button
              variant="ghost"
              onClick={() => setShowLogoutModal(true)}
              className="text-red-600 hover:text-red-700 dark:text-red-400"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </Button>
          </Card>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Sign Out"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowLogoutModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Sign Out
            </Button>
          </>
        }
      >
        <p className="text-text-secondary">
          Are you sure you want to sign out? You'll need to sign in again to access your account.
        </p>
      </Modal>
    </div>
  );
}
