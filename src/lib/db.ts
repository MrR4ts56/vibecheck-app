import { neon } from '@neondatabase/serverless';

// สร้าง SQL client สำหรับ query Neon PostgreSQL
export const sql = neon(import.meta.env.VITE_DATABASE_URL);

// Type Definitions
export interface DailyVibe {
  id: string;
  user_id: string;
  created_at: string;
  luck_score: number;
  fortune_text: string;
  colors: string[]; // Array ของ color codes
  song: string;
}

export interface InsertVibeData {
  userId: string;
  luckScore: number;
  fortuneText: string;
  colors: string[];
  song: string;
}

/**
 * ดึงข้อมูล Vibe ของผู้ใช้ในวันนี้
 */
export async function getTodayVibe(userId: string): Promise<DailyVibe | null> {
  try {
    const result = await sql`
      SELECT * FROM daily_vibes
      WHERE user_id = ${userId}
        AND DATE(created_at) = CURRENT_DATE
      LIMIT 1
    `;
    return result[0] as DailyVibe || null;
  } catch (error) {
    console.error('Error fetching today vibe:', error);
    throw new Error('Failed to fetch today vibe');
  }
}

/**
 * เพิ่มข้อมูล Vibe ใหม่ลงฐานข้อมูล
 */
export async function insertVibe(data: InsertVibeData): Promise<DailyVibe> {
  try {
    const result = await sql`
      INSERT INTO daily_vibes (user_id, luck_score, fortune_text, colors, song)
      VALUES (
        ${data.userId},
        ${data.luckScore},
        ${data.fortuneText},
        ${JSON.stringify(data.colors)},
        ${data.song}
      )
      RETURNING *
    `;
    return result[0] as DailyVibe;
  } catch (error) {
    console.error('Error inserting vibe:', error);
    throw new Error('Failed to insert vibe');
  }
}

/**
 * ดึงประวัติ Vibe ย้อนหลัง 7 วัน
 */
export async function getVibeHistory(userId: string): Promise<DailyVibe[]> {
  try {
    const result = await sql`
      SELECT * FROM daily_vibes
      WHERE user_id = ${userId}
        AND created_at >= NOW() - INTERVAL '7 days'
      ORDER BY created_at DESC
    `;
    return result as DailyVibe[];
  } catch (error) {
    console.error('Error fetching vibe history:', error);
    throw new Error('Failed to fetch vibe history');
  }
}
