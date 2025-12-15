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

export interface User {
  id: string;
  clerk_user_id: string;
  email: string;
  username: string;
  is_admin: boolean;
  locked_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface AdminSettings {
  userId: string;
  lockedScore: number | null;
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

// ==================== ADMIN FUNCTIONS ====================

/**
 * สร้างหรืออัพเดท User (เรียกตอน Login ครั้งแรก)
 */
export async function getOrCreateUser(
  clerkUserId: string,
  email: string,
  username: string
): Promise<User> {
  try {
    // ตรวจสอบว่ามี user อยู่แล้วหรือไม่
    const existing = await sql`
      SELECT * FROM users
      WHERE clerk_user_id = ${clerkUserId}
      LIMIT 1
    `;

    if (existing.length > 0) {
      return existing[0] as User;
    }

    // สร้าง user ใหม่
    const result = await sql`
      INSERT INTO users (clerk_user_id, email, username, is_admin, locked_score)
      VALUES (${clerkUserId}, ${email}, ${username}, false, NULL)
      RETURNING *
    `;
    return result[0] as User;
  } catch (error) {
    console.error('Error getting/creating user:', error);
    throw new Error('Failed to get or create user');
  }
}

/**
 * ดึงข้อมูล User ตาม Clerk User ID
 */
export async function getUserByClerkId(clerkUserId: string): Promise<User | null> {
  try {
    const result = await sql`
      SELECT * FROM users
      WHERE clerk_user_id = ${clerkUserId}
      LIMIT 1
    `;
    return result[0] as User || null;
  } catch (error) {
    console.error('Error fetching user by clerk ID:', error);
    return null;
  }
}

/**
 * ดึงข้อมูล User ทั้งหมด (Admin Only)
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    const result = await sql`
      SELECT * FROM users
      ORDER BY created_at DESC
    `;
    return result as User[];
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw new Error('Failed to fetch all users');
  }
}

/**
 * อัพเดทข้อมูล User (Admin Only)
 */
export async function updateUser(
  userId: string,
  updates: Partial<Pick<User, 'email' | 'username' | 'is_admin' | 'locked_score'>>
): Promise<User> {
  try {
    if (updates.email !== undefined) {
      const result = await sql`
        UPDATE users
        SET email = ${updates.email}, updated_at = NOW()
        WHERE id = ${userId}
        RETURNING *
      `;
      return result[0] as User;
    }

    if (updates.username !== undefined) {
      const result = await sql`
        UPDATE users
        SET username = ${updates.username}, updated_at = NOW()
        WHERE id = ${userId}
        RETURNING *
      `;
      return result[0] as User;
    }

    if (updates.is_admin !== undefined) {
      const result = await sql`
        UPDATE users
        SET is_admin = ${updates.is_admin}, updated_at = NOW()
        WHERE id = ${userId}
        RETURNING *
      `;
      return result[0] as User;
    }

    if (updates.locked_score !== undefined) {
      const result = await sql`
        UPDATE users
        SET locked_score = ${updates.locked_score}, updated_at = NOW()
        WHERE id = ${userId}
        RETURNING *
      `;
      return result[0] as User;
    }

    // If no updates provided, just return current user
    const result = await sql`
      SELECT * FROM users WHERE id = ${userId} LIMIT 1
    `;
    return result[0] as User;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}

/**
 * ลบ User และ Vibes ทั้งหมดของ User (Admin Only)
 */
export async function deleteUser(clerkUserId: string): Promise<void> {
  try {
    // ลบ vibes ของ user ก่อน
    await sql`
      DELETE FROM daily_vibes
      WHERE user_id = ${clerkUserId}
    `;

    // ลบ user
    await sql`
      DELETE FROM users
      WHERE clerk_user_id = ${clerkUserId}
    `;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
}

/**
 * ดึง Vibes ทั้งหมดของ User (Admin Only)
 */
export async function getUserAllVibes(userId: string): Promise<DailyVibe[]> {
  try {
    const result = await sql`
      SELECT * FROM daily_vibes
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;
    return result as DailyVibe[];
  } catch (error) {
    console.error('Error fetching user vibes:', error);
    throw new Error('Failed to fetch user vibes');
  }
}

/**
 * ลบ Vibe (Admin Only)
 */
export async function deleteVibe(vibeId: string): Promise<void> {
  try {
    await sql`
      DELETE FROM daily_vibes
      WHERE id = ${vibeId}
    `;
  } catch (error) {
    console.error('Error deleting vibe:', error);
    throw new Error('Failed to delete vibe');
  }
}

/**
 * ลบ Vibe ของวันนี้ (Admin Reset User)
 */
export async function deleteTodayVibe(userId: string): Promise<void> {
  try {
    await sql`
      DELETE FROM daily_vibes
      WHERE user_id = ${userId}
        AND DATE(created_at) = CURRENT_DATE
    `;
  } catch (error) {
    console.error('Error deleting today vibe:', error);
    throw new Error('Failed to delete today vibe');
  }
}

/**
 * อัพเดท Vibe (Admin Only)
 */
export async function updateVibe(
  vibeId: string,
  updates: Partial<Pick<DailyVibe, 'luck_score' | 'fortune_text' | 'colors' | 'song'>>
): Promise<DailyVibe> {
  try {
    if (updates.luck_score !== undefined) {
      const result = await sql`
        UPDATE daily_vibes
        SET luck_score = ${updates.luck_score}
        WHERE id = ${vibeId}
        RETURNING *
      `;
      return result[0] as DailyVibe;
    }

    if (updates.fortune_text !== undefined) {
      const result = await sql`
        UPDATE daily_vibes
        SET fortune_text = ${updates.fortune_text}
        WHERE id = ${vibeId}
        RETURNING *
      `;
      return result[0] as DailyVibe;
    }

    if (updates.colors !== undefined) {
      const result = await sql`
        UPDATE daily_vibes
        SET colors = ${JSON.stringify(updates.colors)}
        WHERE id = ${vibeId}
        RETURNING *
      `;
      return result[0] as DailyVibe;
    }

    if (updates.song !== undefined) {
      const result = await sql`
        UPDATE daily_vibes
        SET song = ${updates.song}
        WHERE id = ${vibeId}
        RETURNING *
      `;
      return result[0] as DailyVibe;
    }

    // If no updates, return current vibe
    const result = await sql`
      SELECT * FROM daily_vibes WHERE id = ${vibeId} LIMIT 1
    `;
    return result[0] as DailyVibe;
  } catch (error) {
    console.error('Error updating vibe:', error);
    throw new Error('Failed to update vibe');
  }
}

/**
 * ตั้งค่า Locked Score สำหรับการเทส (Admin Only)
 */
export async function setLockedScore(clerkUserId: string, score: number | null): Promise<void> {
  try {
    await sql`
      UPDATE users
      SET locked_score = ${score}, updated_at = NOW()
      WHERE clerk_user_id = ${clerkUserId}
    `;
  } catch (error) {
    console.error('Error setting locked score:', error);
    throw new Error('Failed to set locked score');
  }
}

/**
 * ดึงค่า Locked Score
 */
export async function getLockedScore(clerkUserId: string): Promise<number | null> {
  try {
    const result = await sql`
      SELECT locked_score FROM users
      WHERE clerk_user_id = ${clerkUserId}
      LIMIT 1
    `;
    return result[0]?.locked_score || null;
  } catch (error) {
    console.error('Error getting locked score:', error);
    return null;
  }
}
