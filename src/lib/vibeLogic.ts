import { FORTUNES, SONGS } from './constants';
import { generateVibeWithAI } from './groq'; // เปลี่ยนจาก gemini เป็น groq

export interface VibeResult {
  luckScore: number;
  fortuneText: string;
  colors: string[];
  song: string;
}

/**
 * สุ่มสี 3 สี สำหรับ Gradient Background (Fallback)
 */
function generateRandomColors(count: number = 3): string[] {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 60 + Math.floor(Math.random() * 30); // 60-90%
    const lightness = 50 + Math.floor(Math.random() * 20); // 50-70%
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

/**
 * Fallback Function: สุ่มดวงแบบ Random (ใช้ตอน AI ล้มเหลว)
 */
function generateVibeFallback(): VibeResult {
  const luckScore = Math.floor(Math.random() * 101);

  let fortunePool = FORTUNES;
  if (luckScore < 20) {
    fortunePool = FORTUNES.filter(f => f.type === 'bad' || f.type === 'funny');
  } else if (luckScore > 80) {
    fortunePool = FORTUNES.filter(f => f.type === 'good');
  }

  const fortune = fortunePool[Math.floor(Math.random() * fortunePool.length)];
  const colors = generateRandomColors(3);
  const song = SONGS[Math.floor(Math.random() * SONGS.length)];

  return {
    luckScore,
    fortuneText: fortune.text,
    colors,
    song,
  };
}

/**
 * สร้างดวงรายวันด้วย Gemini AI
 *
 * ใช้ Gemini 1.5 Flash เพื่อสร้าง:
 * - Luck Score (0-100) ที่สะท้อนอารมณ์
 * - คำทำนายที่สนุก แซว และเข้ากับ mood
 * - สี 3 สีที่เข้ากับอารมณ์
 * - เพลงไทยที่เหมาะสม
 *
 * @param moodInput ข้อความความรู้สึกจากผู้ใช้
 */
export async function generateVibe(moodInput: string): Promise<VibeResult> {
  try {
    // เรียก Gemini AI
    const aiResult = await generateVibeWithAI(moodInput);

    return {
      luckScore: aiResult.luck_score,
      fortuneText: aiResult.fortune_text,
      colors: aiResult.colors,
      song: aiResult.song,
    };
  } catch (error) {
    console.error('Groq AI failed, using fallback random logic:', error);

    // ถ้า AI fail ให้ใช้ fallback
    return generateVibeFallback();
  }
}

/**
 * แปลง Luck Score เป็น Text สำหรับแสดง
 */
export function getLuckLabel(luckScore: number): string {
  if (luckScore >= 90) return 'เทพมาก! 🎉';
  if (luckScore >= 70) return 'ดีเลย! ✨';
  if (luckScore >= 50) return 'ปานกลาง 👌';
  if (luckScore >= 30) return 'พอใช้ได้ 😅';
  return 'ซวยเข้าไปใหญ่ 💀';
}

/**
 * สร้าง CSS Gradient String จาก Array ของสี
 */
export function createGradient(colors: string[]): string {
  if (colors.length === 0) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  if (colors.length === 1) return colors[0];

  const angle = 135;
  const stops = colors.map((color, index) => {
    const position = (index / (colors.length - 1)) * 100;
    return `${color} ${position}%`;
  }).join(', ');

  return `linear-gradient(${angle}deg, ${stops})`;
}
