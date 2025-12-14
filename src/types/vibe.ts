/**
 * TypeScript Type Definitions สำหรับ VibeCheck
 */

export interface DailyVibe {
  id: string;
  user_id: string;
  created_at: string;
  luck_score: number;
  fortune_text: string;
  colors: string[];
  song: string;
}

export interface VibeResult {
  luckScore: number;
  fortuneText: string;
  colors: string[];
  song: string;
}

export interface InsertVibeData {
  userId: string;
  luckScore: number;
  fortuneText: string;
  colors: string[];
  song: string;
}
