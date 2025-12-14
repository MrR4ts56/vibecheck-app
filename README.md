# VibeCheck ✨

Web Application สำหรับเช็คดวงและอารมณ์รายวัน (Mood Board Generator) พร้อมดีไซน์แบบ Minimal & Elegant ธีม Obsidian

## 🎯 Features

- ✨ **สุ่มดวงรายวัน** - เล่นได้วันละ 1 ครั้ง
- 📊 **Luck Score** - แสดงดวงเป็นเปอร์เซ็นต์ 0-100%
- 🎨 **Color Palette** - สุ่มสี 3 สี สำหรับ Gradient Background
- 💬 **คำทำนาย** - คำทำนายแบบสนุกๆ และแซวๆ
- 🎵 **เพลงประจำวัน** - สุ่มเพลงไทยยุคใหม่
- 📅 **ประวัติ 7 วัน** - ดูดวงย้อนหลัง 7 วัน
- 💾 **Save เป็นรูปภาพ** - บันทึก Result Card เป็น PNG
- 🔐 **Login ด้วย Clerk** - รองรับ Google OAuth และ Magic Link

## 🛠 Tech Stack

- **Frontend:** React 18+ (Vite), TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Screenshot:** html2canvas
- **Database:** Neon PostgreSQL (Serverless)
- **Authentication:** Clerk
- **Deployment:** Vercel

## 📦 Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd lms
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

สร้างไฟล์ `.env.local` และเพิ่ม:

```bash
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here

# Neon PostgreSQL Database
VITE_DATABASE_URL=postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
```

### 4. Setup Neon Database

ไปที่ [Neon Console](https://console.neon.tech/) และรัน SQL Script นี้:

```sql
CREATE TABLE daily_vibes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  luck_score INT CHECK (luck_score >= 0 AND luck_score <= 100),
  fortune_text TEXT NOT NULL,
  colors JSONB NOT NULL,
  song TEXT,
  UNIQUE(user_id, DATE(created_at))
);

CREATE INDEX idx_user_date ON daily_vibes(user_id, created_at DESC);
```

### 5. Setup Clerk Authentication

1. ไปที่ [Clerk Dashboard](https://dashboard.clerk.com/)
2. สร้าง Application ใหม่
3. เปิดใช้งาน **Google OAuth** และ **Email (Magic Link)**
4. Copy **Publishable Key** มาใส่ใน `.env.local`

### 6. Run Development Server

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:5173`

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: VibeCheck app"
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Deploy to Vercel

1. ไปที่ [Vercel Dashboard](https://vercel.com/)
2. Import GitHub Repository
3. เพิ่ม Environment Variables:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_DATABASE_URL`
4. Deploy

### 3. Update Clerk Settings

1. ไปที่ Clerk Dashboard
2. เพิ่ม Production URL ใน **Allowed Origins**

## 📁 Project Structure

```
lms/
├── src/
│   ├── components/
│   │   ├── Auth/           # Login, ProtectedRoute
│   │   ├── Vibe/           # MoodInput, ResultCard, LoadingAnimation
│   │   ├── History/        # HistoryButton, HistoryModal
│   │   └── Layout/         # Header, Background
│   ├── hooks/
│   │   ├── useAuth.ts      # Clerk Authentication Wrapper
│   │   ├── useDailyVibe.ts # Daily Vibe CRUD Operations
│   │   └── useHistory.ts   # History Loading
│   ├── lib/
│   │   ├── db.ts           # Neon PostgreSQL Client
│   │   ├── vibeLogic.ts    # Random Logic
│   │   └── constants.ts    # FORTUNES & SONGS
│   ├── types/
│   │   └── vibe.ts         # TypeScript Interfaces
│   ├── App.tsx             # Main Application
│   ├── main.tsx            # Entry Point (ClerkProvider)
│   └── index.css           # Global Styles (Tailwind + Custom)
├── .env.local              # Environment Variables
├── tailwind.config.js      # Tailwind CSS Config
└── vite.config.ts          # Vite Config
```

## 🎨 Design System

### Colors (Obsidian Theme)

- Background: `#050505` (ดำลึก)
- Card: `rgba(0,0,0,0.4)` (Glassmorphism)
- Border: `rgba(255,255,255,0.1)`
- Text: `#FFFFFF` / `rgba(255,255,255,0.7)`

### Fonts

- **Headings/Numbers:** Manrope
- **Body (ไทย):** IBM Plex Sans Thai
- **Fortune Text:** Playfair Display + Noto Serif Thai

### Components

- **Glassmorphism Cards:** `backdrop-blur-xl` + `border-white/10`
- **Buttons:** Scale effect on hover
- **Animations:** Framer Motion (Fade In, Slide Up, Stagger)

## 📝 License

MIT License

## 👨‍💻 Author

Created with ❤️ using Claude Code
