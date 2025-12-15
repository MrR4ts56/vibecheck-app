import { useState, useEffect } from 'react';
import { getTodayVibe, insertVibe, getLockedScore, type DailyVibe } from '../lib/db';
import { generateVibe, type VibeResult } from '../lib/vibeLogic';
import { useAuth } from './useAuth';
import { useAdmin } from './useAdmin';

/**
 * Custom Hook สำหรับจัดการ Daily Vibe CRUD operations
 */
export function useDailyVibe() {
  const { userId } = useAuth();
  const { isAdmin, user } = useAdmin();
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

    // Admin เล่นได้ไม่จำกัด, User ทั่วไปเล่นได้วันละครั้ง
    if (!isAdmin && todayVibe) {
      setError('คุณเล่นไปแล้วในวันนี้');
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);

      // เช็คว่ามี locked_score หรือไม่
      const lockedScore = user?.locked_score ?? await getLockedScore(userId);

      let vibeResult: VibeResult;

      if (lockedScore !== null && lockedScore !== undefined) {
        // ใช้ locked_score แทนการสุ่ม
        vibeResult = await generateVibe(moodInput || 'วันนี้รู้สึกดี', lockedScore);
      } else {
        // สุ่มดวงด้วย Gemini AI แบบปกติ
        vibeResult = await generateVibe(moodInput || 'วันนี้รู้สึกดี');
      }

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
