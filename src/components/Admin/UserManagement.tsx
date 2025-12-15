import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getAllUsers,
  getUserAllVibes,
  deleteUser,
  updateUser,
  deleteVibe,
  deleteTodayVibe,
} from '../../lib/db';
import {
  Trash2,
  Eye,
  Shield,
  ShieldOff,
  Calendar,
  X,
  RotateCcw,
} from 'lucide-react';
import type { User, DailyVibe } from '../../lib/db';

/**
 * User Management - จัดการ Users
 */
export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userVibes, setUserVibes] = useState<DailyVibe[]>([]);
  const [isLoadingVibes, setIsLoadingVibes] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteUser(user: User) {
    if (!confirm(`ต้องการลบ ${user.username} ใช่หรือไม่?`)) return;

    try {
      await deleteUser(user.clerk_user_id);
      await fetchUsers();
      if (selectedUser?.id === user.id) {
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  }

  async function handleToggleAdmin(user: User) {
    try {
      await updateUser(user.id, { is_admin: !user.is_admin });
      await fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  }

  async function handleViewHistory(user: User) {
    setSelectedUser(user);
    setIsLoadingVibes(true);
    try {
      const vibes = await getUserAllVibes(user.clerk_user_id);
      setUserVibes(vibes);
    } catch (error) {
      console.error('Error fetching user vibes:', error);
    } finally {
      setIsLoadingVibes(false);
    }
  }

  async function handleDeleteVibe(vibeId: string) {
    if (!confirm('ต้องการลบ Vibe นี้ใช่หรือไม่?')) return;

    try {
      await deleteVibe(vibeId);
      if (selectedUser) {
        handleViewHistory(selectedUser);
      }
    } catch (error) {
      console.error('Error deleting vibe:', error);
      alert('Failed to delete vibe');
    }
  }

  async function handleResetTodayVibe(user: User) {
    if (!confirm(`ต้องการ Reset Vibe วันนี้ของ ${user.username} ใช่หรือไม่?\n(User จะสามารถเล่นใหม่ได้)`)) return;

    try {
      await deleteTodayVibe(user.clerk_user_id);
      await fetchUsers();
      alert(`Reset สำเร็จ! ${user.username} สามารถเล่นใหม่ได้แล้ว`);
    } catch (error) {
      console.error('Error resetting today vibe:', error);
      alert('Failed to reset vibe');
    }
  }

  if (isLoading) {
    return <div className="text-white/70">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">User Management</h2>

      {/* Users Table */}
      <div className="glass-card p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/80 font-medium py-3 px-4">
                Username
              </th>
              <th className="text-left text-white/80 font-medium py-3 px-4">
                Email
              </th>
              <th className="text-left text-white/80 font-medium py-3 px-4">
                Role
              </th>
              <th className="text-left text-white/80 font-medium py-3 px-4">
                Locked Score
              </th>
              <th className="text-right text-white/80 font-medium py-3 px-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="py-3 px-4 text-white">{user.username}</td>
                <td className="py-3 px-4 text-white/70 text-sm">
                  {user.email}
                </td>
                <td className="py-3 px-4">
                  {user.is_admin ? (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                      Admin
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded">
                      User
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {user.locked_score !== null ? (
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded">
                      {user.locked_score}
                    </span>
                  ) : (
                    <span className="text-white/40 text-xs">-</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleResetTodayVibe(user)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Reset Today's Vibe (ให้เล่นใหม่ได้)"
                    >
                      <RotateCcw className="w-4 h-4 text-green-400" />
                    </button>
                    <button
                      onClick={() => handleViewHistory(user)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="View History"
                    >
                      <Eye className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleToggleAdmin(user)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title={
                        user.is_admin ? 'Remove Admin' : 'Make Admin'
                      }
                    >
                      {user.is_admin ? (
                        <ShieldOff className="w-4 h-4 text-purple-400" />
                      ) : (
                        <Shield className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* History Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedUser.username}'s History
                  </h3>
                  <p className="text-white/60 text-sm">
                    {selectedUser.email}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {isLoadingVibes ? (
                <div className="text-white/70 text-center py-8">
                  Loading history...
                </div>
              ) : userVibes.length === 0 ? (
                <div className="text-white/50 text-center py-8">
                  No vibes found
                </div>
              ) : (
                <div className="space-y-4">
                  {userVibes.map((vibe) => (
                    <div
                      key={vibe.id}
                      className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-3xl font-bold text-white">
                              {vibe.luck_score}%
                            </div>
                            <div className="flex gap-1">
                              {vibe.colors.map((color, i) => (
                                <div
                                  key={i}
                                  className="w-6 h-6 rounded-full border border-white/30"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-white/80 text-sm mb-1">
                            "{vibe.fortune_text}"
                          </p>
                          <p className="text-white/60 text-xs mb-2">
                            {vibe.song}
                          </p>
                          <div className="flex items-center gap-2 text-white/40 text-xs">
                            <Calendar className="w-3 h-3" />
                            {new Date(vibe.created_at).toLocaleString()}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteVibe(vibe.id)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-4"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
