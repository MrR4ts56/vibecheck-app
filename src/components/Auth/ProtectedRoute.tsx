import { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LoginPage } from './LoginPage';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Component สำหรับป้องกัน Route ที่ต้อง Login ก่อน
 * ถ้ายังไม่ Login จะแสดงหน้า LoginPage แทน
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // แสดง Loading State ระหว่างตรวจสอบ Auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/70">Loading...</div>
      </div>
    );
  }

  // ถ้ายังไม่ Login ให้แสดงหน้า Login
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // ถ้า Login แล้วให้แสดง children
  return <>{children}</>;
}
