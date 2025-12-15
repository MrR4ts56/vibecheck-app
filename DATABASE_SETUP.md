# Database Setup Guide

## สร้าง Database Tables

### 1. Daily Vibes Table (ถ้ายังไม่มี)

```sql
CREATE TABLE IF NOT EXISTS daily_vibes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  luck_score INTEGER NOT NULL CHECK (luck_score >= 0 AND luck_score <= 100),
  fortune_text TEXT NOT NULL,
  colors JSONB NOT NULL,
  song TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_daily_vibes_user_id ON daily_vibes(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_vibes_created_at ON daily_vibes(created_at);
```

### 2. Users Table (สำหรับ Admin Panel)

```sql
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

CREATE INDEX IF NOT EXISTS idx_users_clerk_user_id ON users(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON users(is_admin);
```

## วิธีรัน Migration

### Option 1: รันผ่าน Neon Console
1. เข้า [Neon Console](https://console.neon.tech/)
2. เลือก Project ของคุณ
3. ไปที่ SQL Editor
4. Copy & Paste SQL จากไฟล์ `src/lib/migrations/001_create_users_table.sql`
5. กด Run

### Option 2: รันผ่าน psql
```bash
psql "YOUR_DATABASE_URL" < src/lib/migrations/001_create_users_table.sql
```

## ตั้งค่า Admin User แรก

หลังจากสร้าง table แล้ว ให้ตั้งค่า admin user แรกด้วย SQL:

```sql
-- แทน 'YOUR_CLERK_USER_ID' ด้วย Clerk User ID ของคุณ
UPDATE users
SET is_admin = TRUE
WHERE clerk_user_id = 'YOUR_CLERK_USER_ID';
```

**วิธีหา Clerk User ID ของคุณ:**
1. Login เข้าแอพ
2. เปิด Browser Console (F12)
3. พิมพ์: `localStorage` หรือดูที่ Clerk Dashboard

หรือใช้วิธีนี้:
```sql
-- Login เข้าแอพครั้งแรก แล้วรัน SQL นี้เพื่อดู users ทั้งหมด
SELECT * FROM users;

-- เลือก user ที่ต้องการทำเป็น admin แล้วรัน:
UPDATE users SET is_admin = TRUE WHERE id = 'USER_UUID_HERE';
```

## เข้าใช้งาน Admin Panel

หลังจากตั้งค่า admin แล้ว:
1. Login เข้าแอพ
2. ไปที่ `/admin` หรือคลิกปุ่ม Admin Panel ที่ Header
3. เริ่มจัดการ Users และ Settings ได้เลย

## ฟีเจอร์ที่ใช้ได้ใน Admin Panel

### 1. Dashboard
- ดูภาพรวมของ Users ทั้งหมด
- จำนวน Admin Users
- Active Tests (users ที่มี locked score)

### 2. User Management
- ดู User List ทั้งหมด
- ลบ User และ Vibes ของ User
- เปลี่ยน User เป็น Admin หรือถอด Admin
- ดูประวัติ Vibes ทั้งหมดของ User

### 3. Test Settings
- ตั้งค่า Locked Score สำหรับเทส (0, 4, 7, 44, 55, 69, 77, 100)
- เทสเอฟเฟคพิเศษต่างๆ
- Admin ไม่มีจำกัดการเล่นต่อวัน
