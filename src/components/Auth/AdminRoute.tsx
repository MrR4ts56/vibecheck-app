import type { ReactNode } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { motion } from 'framer-motion';
import { ShieldX } from 'lucide-react';

interface AdminRouteProps {
  children: ReactNode;
}

/**
 * Component สำหรับป้องกัน Route ที่ต้องเป็น Admin
 */
export function AdminRoute({ children }: AdminRouteProps) {
  const { isAdmin, isLoading } = useAdmin();

  // แสดง Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/70">Loading...</div>
      </div>
    );
  }

  // ถ้าไม่ใช่ Admin ให้แสดง Access Denied
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShieldX className="w-20 h-20 text-red-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-white/70">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
        </motion.div>
      </div>
    );
  }

  // ถ้าเป็น Admin ให้แสดง children
  return <>{children}</>;
}
