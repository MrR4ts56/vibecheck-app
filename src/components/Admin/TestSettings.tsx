import { useState, useEffect } from 'react';
import { getAllUsers, setLockedScore } from '../../lib/db';
import { Lock, Unlock, Search } from 'lucide-react';
import type { User } from '../../lib/db';

/**
 * Test Settings - ตั้งค่า Locked Score สำหรับการเทส
 */
export function TestSettings() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [lockedScores, setLockedScores] = useState<Record<string, number | null>>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);

      // Initialize locked scores from users
      const scores: Record<string, number | null> = {};
      allUsers.forEach((user) => {
        scores[user.clerk_user_id] = user.locked_score;
      });
      setLockedScores(scores);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSetLockedScore(clerkUserId: string, score: number | null) {
    try {
      await setLockedScore(clerkUserId, score);
      setLockedScores((prev) => ({ ...prev, [clerkUserId]: score }));
    } catch (error) {
      console.error('Error setting locked score:', error);
      alert('Failed to set locked score');
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-white/70">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Test Settings</h2>
        <p className="text-white/60">
          ตั้งค่า Locked Score เพื่อเทสเอฟเฟคพิเศษต่างๆ (0, 100, 69, 55, 7, 77, 4, 44)
        </p>
      </div>

      {/* Search */}
      <div className="glass-card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => {
          const currentScore = lockedScores[user.clerk_user_id];
          return (
            <div key={user.id} className="glass-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">
                      {user.username}
                    </h3>
                    {user.is_admin && (
                      <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm mb-4">{user.email}</p>

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="text-white/80 text-sm font-medium">
                      Locked Score:
                    </label>

                    {/* Quick Set Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {[0, 4, 7, 44, 55, 69, 77, 100].map((score) => (
                        <button
                          key={score}
                          onClick={() =>
                            handleSetLockedScore(user.clerk_user_id, score)
                          }
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                            currentScore === score
                              ? 'bg-blue-500 text-white'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>

                    {/* Custom Input */}
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Custom"
                        className="w-24 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseInt(e.currentTarget.value);
                            if (!isNaN(value) && value >= 0 && value <= 100) {
                              handleSetLockedScore(user.clerk_user_id, value);
                              e.currentTarget.value = '';
                            }
                          }
                        }}
                      />
                    </div>

                    {/* Clear Button */}
                    {currentScore !== null && (
                      <button
                        onClick={() =>
                          handleSetLockedScore(user.clerk_user_id, null)
                        }
                        className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
                      >
                        <Unlock className="w-3 h-3" />
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Current Status */}
                  <div className="mt-4 flex items-center gap-2">
                    {currentScore !== null ? (
                      <>
                        <Lock className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-300 text-sm">
                          Score locked at {currentScore}%
                        </span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 text-green-400" />
                        <span className="text-green-300 text-sm">
                          Random score (normal mode)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-white/50">No users found</p>
        </div>
      )}
    </div>
  );
}
