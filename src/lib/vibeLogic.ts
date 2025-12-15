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
 * สร้างดวงรายวันด้วย Groq AI
 *
 * ขั้นตอน:
 * 1. สุ่ม Luck Score (0-100) ด้วย Math.random() - สุ่มจริงๆ ไม่มี bias
 *    (หรือใช้ lockedScore ถ้ามีการกำหนดไว้สำหรับเทส)
 * 2. ส่ง Mood + Luck Score ให้ AI วิเคราะห์และสร้าง:
 *    - คำทำนายที่เข้ากับทั้ง mood และ luck score
 *    - สี 3 สีที่เข้ากับอารมณ์
 *    - เพลงไทยที่เหมาะสม
 *
 * @param moodInput ข้อความความรู้สึกจากผู้ใช้
 * @param lockedScore (Optional) Score ที่ถูกล็อคไว้สำหรับการเทส
 */
export async function generateVibe(moodInput: string, lockedScore?: number): Promise<VibeResult> {
  // 1. ใช้ lockedScore ถ้ามี ไม่งั้นสุ่มแบบปกติ
  const luckScore = lockedScore !== undefined ? lockedScore : Math.floor(Math.random() * 101);

  console.log('🎲 Luck Score:', luckScore, lockedScore !== undefined ? '(locked)' : '(random)');

  try {
    // 2. เรียก Groq AI โดยส่ง mood และ luckScore ไปด้วย
    const aiResult = await generateVibeWithAI(moodInput, luckScore);

    return {
      luckScore: luckScore, // ใช้ค่าที่สุ่มด้วย Math.random()
      fortuneText: aiResult.fortune_text,
      colors: aiResult.colors,
      song: aiResult.song,
    };
  } catch (error) {
    console.error('Groq AI failed, using fallback random logic:', error);

    // ถ้า AI fail ให้ใช้ fallback (แต่ยังใช้ luckScore ที่สุ่มไว้แล้ว)
    const fallbackResult = generateVibeFallback();
    return {
      ...fallbackResult,
      luckScore: luckScore, // ใช้ค่าที่สุ่มไว้แล้ว ไม่ใช้ของ fallback
    };
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
