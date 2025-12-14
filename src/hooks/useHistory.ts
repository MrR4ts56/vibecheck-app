import { useState } from 'react';
import { getVibeHistory, type DailyVibe } from '../lib/db';
import { useAuth } from './useAuth';

/**
 * Custom Hook สำหรับดูประวัติ Vibe ย้อนหลัง 7 วัน
 */
export function useHistory() {
  const { userId } = useAuth();
  const [history, setHistory] = useState<DailyVibe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * โหลดประวัติย้อนหลัง 7 วัน
   */
  async function loadHistory() {
    if (!userId) {
      setError('กรุณา Login ก่อน');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await getVibeHistory(userId);
      setHistory(data);
    } catch (err) {
      console.error('Error loading history:', err);
      setError('ไม่สามารถโหลดประวัติได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    history,
    isLoading,
    error,
    loadHistory,
  };
}
