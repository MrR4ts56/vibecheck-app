import { useUser } from '@clerk/clerk-react';

/**
 * Custom Hook สำหรับ Authentication
 * Wrapper รอบ Clerk's useUser() hook เพื่อให้ใช้งานง่ายขึ้น
 */
export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser();

  return {
    user,
    userId: user?.id || null,
    username: user?.username || user?.firstName || 'Guest',
    email: user?.primaryEmailAddress?.emailAddress || '',
    imageUrl: user?.imageUrl || '',
    isLoading: !isLoaded,
    isAuthenticated: isSignedIn || false,
  };
}
