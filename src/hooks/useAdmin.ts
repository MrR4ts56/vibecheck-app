import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getOrCreateUser } from '../lib/db';
import type { User } from '../lib/db';

/**
 * Hook สำหรับตรวจสอบสิทธิ์ Admin
 */
export function useAdmin() {
  const { userId, email, username, isAuthenticated, isLoading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAdminStatus() {
      if (!isAuthenticated || !userId) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        // สร้างหรือดึงข้อมูล user จาก database
        const userData = await getOrCreateUser(userId, email, username);
        setUser(userData);
        setIsAdmin(userData.is_admin);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    }

    if (!authLoading) {
      checkAdminStatus();
    }
  }, [userId, email, username, isAuthenticated, authLoading]);

  return {
    isAdmin,
    user,
    isLoading: authLoading || isLoading,
  };
}
