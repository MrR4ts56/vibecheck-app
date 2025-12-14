import { useState, useEffect } from 'react';
import { getTodayVibe, insertVibe, type DailyVibe } from '../lib/db';
import { generateVibe, type VibeResult } from '../lib/vibeLogic';
import { useAuth } from './useAuth';

/**
 * Custom Hook สำหรับจัดการ Daily Vibe CRUD operations
 */
export function useDailyVibe() {
  const { userId } = useAuth();
  const [todayVibe, setTodayVibe] = useState<DailyVibe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // โหลดข้อมูล Vibe ของวันนี้
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    loadTodayVibe();
  }, [userId]);

  async function loadTodayVibe() {
    if (!userId) return;

    try {
      setIsLoading(true);
      setError(null);
      const vibe = await getTodayVibe(userId);
      setTodayVibe(vibe);
    } catch (err) {
      console.error('Error loading today vibe:', err);
      setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * สร้าง Vibe ใหม่สำหรับวันนี้
   */
  async function createTodayVibe(moodInput?: string): Promise<DailyVibe | null> {
    if (!userId) {
      setError('กรุณา Login ก่อนเล่น');
      return null;
    }

    if (todayVibe) {
      setError('คุณเล่นไปแล้วในวันนี้');
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);

      // สุ่มดวงด้วย Gemini AI
      const vibeResult: VibeResult = await generateVibe(moodInput || 'วันนี้รู้สึกดี');

      // บันทึกลง Database
      const newVibe = await insertVibe({
        userId,
        luckScore: vibeResult.luckScore,
        fortuneText: vibeResult.fortuneText,
        colors: vibeResult.colors,
        song: vibeResult.song,
      });

      setTodayVibe(newVibe);
      return newVibe;
    } catch (err) {
      console.error('Error creating vibe:', err);
      setError('ไม่สามารถสร้างดวงได้ กรุณาลองใหม่อีกครั้ง');
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * ตรวจสอบว่าเล่นไปแล้วหรือยัง
   */
  const hasPlayedToday = todayVibe !== null;

  return {
    todayVibe,
    hasPlayedToday,
    isLoading,
    error,
    createTodayVibe,
    refreshVibe: loadTodayVibe,
  };
}
