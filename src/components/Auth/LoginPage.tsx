import { SignIn } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

/**
 * หน้า Login สำหรับผู้ใช้ที่ยังไม่ได้ Login
 * ใช้ Clerk's SignIn component พร้อม Custom Styling
 */
export function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 glow-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
          VibeCheck
        </h1>
        <p className="text-lg md:text-xl text-white/70 font-light">
          เช็คดวงและอารมณ์รายวัน ✨
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <SignIn
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: '#ffffff',
              colorBackground: 'rgba(0, 0, 0, 0.4)',
              colorInputBackground: 'rgba(255, 255, 255, 0.05)',
              colorInputText: '#ffffff',
              colorText: '#ffffff',
              colorTextSecondary: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '1rem',
            },
            elements: {
              card: 'backdrop-blur-xl border border-white/10 shadow-2xl',
              headerTitle: 'text-white',
              headerSubtitle: 'text-white/70',
              socialButtonsBlockButton: 'bg-white/15 border-2 border-white/30 hover:bg-white/25 hover:border-white/50 text-white font-medium',
              formButtonPrimary: 'bg-white/10 hover:bg-white/20 border border-white/20',
              footerActionLink: 'text-white hover:text-white/80',
            },
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 text-center text-white/50 text-sm"
      >
        <p>สร้างโดย Karit Rermride</p>
      </motion.div>
    </div>
  );
}
