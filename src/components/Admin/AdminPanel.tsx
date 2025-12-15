import { useState } from 'react';
import { AdminRoute } from '../Auth/AdminRoute';
import { Background } from '../Layout/Background';
import { motion } from 'framer-motion';
import { Users, Settings, Home, LogOut } from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { UserManagement } from './UserManagement';
import { TestSettings } from './TestSettings';
import { useAuth } from '../../hooks/useAuth';

type TabType = 'dashboard' | 'users' | 'settings';

/**
 * Admin Panel - หน้าหลักสำหรับ Admin
 */
export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const { username } = useAuth();

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: Home },
    { id: 'users' as TabType, label: 'User Management', icon: Users },
    { id: 'settings' as TabType, label: 'Test Settings', icon: Settings },
  ];

  return (
    <AdminRoute>
      <Background />

      <div className="min-h-screen relative">
        {/* Header */}
        <div className="glass-card border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                <p className="text-white/60 text-sm">Welcome, {username}</p>
              </div>
              <a
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <LogOut className="w-4 h-4" />
                Back to App
              </a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <AdminDashboard />}
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'settings' && <TestSettings />}
          </motion.div>
        </div>
      </div>
    </AdminRoute>
  );
}
