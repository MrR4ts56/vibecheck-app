import { useEffect, useState } from 'react';
import { getAllUsers } from '../../lib/db';
import { Users, TrendingUp, Activity } from 'lucide-react';
import type { User } from '../../lib/db';

/**
 * Admin Dashboard - แสดงภาพรวมของระบบ
 */
export function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-white/70">Loading...</div>;
  }

  const stats = [
    {
      label: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Admin Users',
      value: users.filter((u) => u.is_admin).length,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Active Tests',
      value: users.filter((u) => u.locked_score !== null).length,
      icon: Activity,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Users */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Users</h3>
        <div className="space-y-3">
          {users.slice(0, 5).map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <div>
                <div className="text-white font-medium">{user.username}</div>
                <div className="text-white/60 text-sm">{user.email}</div>
              </div>
              <div className="flex items-center gap-2">
                {user.is_admin && (
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                    Admin
                  </span>
                )}
                {user.locked_score !== null && (
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded">
                    Test Mode
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
