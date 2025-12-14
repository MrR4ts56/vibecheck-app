-- VibeCheck - Neon PostgreSQL Setup Script
-- รัน script นี้ใน Neon SQL Editor

-- เปิดใช้งาน uuid-ossp extension สำหรับ UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- สร้างตาราง daily_vibes
CREATE TABLE IF NOT EXISTS daily_vibes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  luck_score INT CHECK (luck_score >= 0 AND luck_score <= 100),
  fortune_text TEXT NOT NULL,
  colors JSONB NOT NULL,
  song TEXT
);

-- สร้าง Index สำหรับเพิ่มความเร็วในการ Query
CREATE INDEX IF NOT EXISTS idx_user_date ON daily_vibes(user_id, created_at DESC);

-- สร้าง UNIQUE INDEX เพื่อป้องกันการเล่นซ้ำในวันเดียวกัน
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_daily_unique ON daily_vibes(user_id, DATE(created_at));

-- ตรวจสอบว่าสร้างตารางสำเร็จหรือไม่
SELECT
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'daily_vibes'
ORDER BY ordinal_position;
