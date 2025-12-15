-- Migration: Create users table for Admin Panel
-- Description: เพิ่ม table users สำหรับเก็บข้อมูล user และ admin settings

-- สร้าง table users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  username TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  locked_score INTEGER CHECK (locked_score >= 0 AND locked_score <= 100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- สร้าง index สำหรับ clerk_user_id (ใช้บ่อย)
CREATE INDEX IF NOT EXISTS idx_users_clerk_user_id ON users(clerk_user_id);

-- สร้าง index สำหรับ is_admin (สำหรับ query admin users)
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON users(is_admin);

-- คอมเมนต์อธิบาย table และ columns
COMMENT ON TABLE users IS 'เก็บข้อมูล user และ admin settings';
COMMENT ON COLUMN users.clerk_user_id IS 'User ID จาก Clerk Authentication';
COMMENT ON COLUMN users.is_admin IS 'สถานะว่าเป็น admin หรือไม่';
COMMENT ON COLUMN users.locked_score IS 'Score ที่ถูกล็อคไว้สำหรับการเทส (NULL = ไม่ล็อค)';
