import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Skull } from 'lucide-react';

interface SpecialEffectsProps {
  luckScore: number;
}

/**
 * Special Effects Component
 * แสดงเอฟเฟคพิเศษตามเลข Luck Score:
 * - 0 หรือ 100: Fireworks/Celebration
 * - 69: Hot Face Emoji ตกลงมา 🥵
 * - 55: ตลกเฮฮา (555)
 * - 7 หรือ 77: UI สีทอง หรูหรา
 * - 4 หรือ 44: หัวกระโหลก (เลขตาย)
 */
export function SpecialEffects({ luckScore }: SpecialEffectsProps) {
  const [showEffect, setShowEffect] = useState(true);

  // เอฟเฟคจะหายไปหลังจาก 5 วินาที
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEffect(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [luckScore]);

  // 0 หรือ 100: Perfect Score - Fireworks ตกลงมาแล้วเด้งบนพื้น
  if ((luckScore === 0 || luckScore === 100) && showEffect) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {/* Fireworks Effect - ตกลงมาจากบนแล้วเด้ง */}
          {[...Array(30)].map((_, i) => {
            const startX = 5 + Math.random() * 90;
            const ground = 90; // พื้น = 90vh
            const horizontalDrift = (Math.random() - 0.5) * 30; // เลื่อนซ้ายขวาเล็กน้อย
            return (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{ left: `${startX}%` }}
                initial={{
                  y: -100,
                  x: 0,
                  rotate: Math.random() * 360,
                  scale: 0.5,
                  opacity: 1,
                }}
                animate={{
                  y: [
                    -100,    // เริ่มจากบนจอ
                    ground,  // ตกถึงพื้น
                    ground - 25,  // เด้งขึ้นสูง
                    ground,  // ตกลงพื้น
                    ground - 15,  // เด้งขึ้นปานกลาง
                    ground,  // ตกลงพื้น
                    ground - 8,   // เด้งขึ้นเบา
                    ground,  // หยุดที่พื้น
                  ],
                  x: [0, horizontalDrift * 0.3, horizontalDrift * 0.6, horizontalDrift, horizontalDrift, horizontalDrift, horizontalDrift, horizontalDrift],
                  rotate: [
                    Math.random() * 360,
                    Math.random() * 720,
                    Math.random() * 360,
                    Math.random() * 540,
                    Math.random() * 360,
                    Math.random() * 180,
                    0,
                    0,
                  ],
                  scale: [0.5, 1, 1.2, 1, 1.1, 1, 1, 0],
                  opacity: [1, 1, 1, 1, 1, 1, 0.8, 0],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.08,
                  times: [0, 0.3, 0.38, 0.5, 0.58, 0.68, 0.76, 1],
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <Sparkles
                  className={`w-8 h-8 ${
                    luckScore === 100 ? 'text-yellow-400' : 'text-purple-400'
                  }`}
                />
              </motion.div>
            );
          })}

          {/* Center Text */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: [0, 1.2, 1], rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl">
              {luckScore === 100 ? '🎉💯🎉' : '🌑💀🌑'}
            </div>
            <motion.p
              className="text-2xl md:text-3xl text-white text-center mt-4 font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {luckScore === 100 ? 'PERFECT SCORE!' : 'ROCK BOTTOM!'}
            </motion.p>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  // 69: Hot Face Emoji ตกลงมาแล้วเด้งบนพื้น
  if (luckScore === 69 && showEffect) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {[...Array(25)].map((_, i) => {
            const startX = 5 + Math.random() * 90;
            const ground = 88;
            const horizontalDrift = (Math.random() - 0.5) * 40;
            return (
              <motion.div
                key={i}
                className="absolute text-5xl"
                style={{ left: `${startX}%` }}
                initial={{
                  y: -150,
                  x: 0,
                  rotate: 0,
                  scale: 0.3,
                }}
                animate={{
                  y: [
                    -150,        // เริ่มจากบนจอ
                    ground,      // ตกถึงพื้น
                    ground - 30, // เด้งสูงมาก (ตัวใหญ่เด้งสูงกว่า)
                    ground,      // ตกลงพื้น
                    ground - 18, // เด้งปานกลาง
                    ground,      // ตกลงพื้น
                    ground - 10, // เด้งเบา
                    ground,      // ตกลงพื้น
                    ground - 5,  // เด้งเบามาก
                    ground,      // หยุดที่พื้น
                  ],
                  x: [
                    0,
                    horizontalDrift * 0.2,
                    horizontalDrift * 0.4,
                    horizontalDrift * 0.6,
                    horizontalDrift * 0.8,
                    horizontalDrift,
                    horizontalDrift,
                    horizontalDrift,
                    horizontalDrift,
                    horizontalDrift,
                  ],
                  rotate: [0, 120, 240, 360, 480, 540, 580, 600, 620, 630],
                  scale: [0.3, 1, 1.4, 1, 1.3, 1, 1.2, 1, 1.1, 0],
                  opacity: [1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0],
                }}
                transition={{
                  duration: 4.5,
                  delay: i * 0.12,
                  times: [0, 0.25, 0.32, 0.42, 0.49, 0.59, 0.66, 0.76, 0.83, 1],
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                🥵
              </motion.div>
            );
          })}

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-8xl md:text-9xl drop-shadow-2xl">69</div>
            <p className="text-2xl text-white text-center mt-2 font-bold drop-shadow-lg">
              NICE! 🔥
            </p>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  // 55: ตลกเฮฮา (555 = ฮ่าๆๆ ในภาษาไทย)
  if (luckScore === 55 && showEffect) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: [0, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              scale: { duration: 0.8 },
              rotate: { duration: 0.5, repeat: 8 },
            }}
          >
            <div className="text-9xl mb-4">😂</div>
            <div className="text-6xl font-bold text-yellow-400 drop-shadow-2xl">
              555
            </div>
            <p className="text-3xl text-white mt-4 font-bold">ฮ่าๆๆๆ!</p>
          </motion.div>

          {/* Laughing Emoji Rain - ตกลงมาแล้วเด้งบนพื้น */}
          {[...Array(20)].map((_, i) => {
            const startX = 5 + Math.random() * 90;
            const ground = 88;
            const horizontalDrift = (Math.random() - 0.5) * 35;
            return (
              <motion.div
                key={i}
                className="absolute text-5xl"
                style={{ left: `${startX}%` }}
                initial={{
                  y: -120,
                  x: 0,
                  rotate: -30,
                  scale: 0.4,
                }}
                animate={{
                  y: [
                    -120,
                    ground,
                    ground - 28,
                    ground,
                    ground - 16,
                    ground,
                    ground - 9,
                    ground,
                    ground - 4,
                    ground,
                  ],
                  x: [
                    0,
                    horizontalDrift * 0.3,
                    horizontalDrift * 0.5,
                    horizontalDrift * 0.7,
                    horizontalDrift * 0.85,
                    horizontalDrift,
                    horizontalDrift,
                    horizontalDrift,
                    horizontalDrift,
                    horizontalDrift,
                  ],
                  rotate: [-30, 60, -20, 40, -10, 20, -5, 10, 0, 0],
                  scale: [0.4, 1, 1.3, 1, 1.2, 1, 1.1, 1, 1, 0],
                  opacity: [1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0],
                }}
                transition={{
                  duration: 4.2,
                  delay: i * 0.15,
                  times: [0, 0.25, 0.32, 0.42, 0.49, 0.59, 0.66, 0.76, 0.83, 1],
                  ease: 'easeOut',
                }}
              >
                😆
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>
    );
  }

  // 7 หรือ 77: Lucky Golden UI
  if ((luckScore === 7 || luckScore === 77) && showEffect) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {/* Golden Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-600/30 via-yellow-400/20 to-orange-600/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />

          {/* Sparkles - ตกลงมาแล้วเด้งบนพื้น */}
          {[...Array(35)].map((_, i) => {
            const startX = 5 + Math.random() * 90;
            const ground = 89;
            const horizontalDrift = (Math.random() - 0.5) * 25;
            return (
              <motion.div
                key={i}
                className="absolute text-3xl"
                style={{ left: `${startX}%` }}
                initial={{
                  y: -80,
                  x: 0,
                  scale: 0.2,
                  rotate: 0,
                }}
                animate={{
                  y: [
                    -80,
                    ground,
                    ground - 22,
                    ground,
                    ground - 13,
                    ground,
                    ground - 7,
                    ground,
                  ],
                  x: [
                    0,
                    horizontalDrift * 0.4,
                    horizontalDrift * 0.6,
                    horizontalDrift * 0.8,
                    horizontalDrift * 0.9,
                    horizontalDrift,
                    horizontalDrift,
                    horizontalDrift,
                  ],
                  scale: [0.2, 1.2, 1.5, 1.2, 1.3, 1.2, 1.1, 0],
                  rotate: [0, 180, 360, 450, 540, 600, 630, 0],
                  opacity: [1, 1, 1, 1, 1, 1, 0.9, 0],
                }}
                transition={{
                  duration: 3.8,
                  delay: i * 0.08,
                  times: [0, 0.3, 0.38, 0.5, 0.58, 0.7, 0.8, 1],
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                ✨
              </motion.div>
            );
          })}

          {/* Center Message */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-8xl mb-4">🎰</div>
            <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
              {luckScore}
            </div>
            <p className="text-3xl font-bold mt-4 text-yellow-300 drop-shadow-lg">
              LUCKY {luckScore === 77 ? 'JACKPOT!' : 'NUMBER!'}
            </p>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  // 4 หรือ 44: เลขตาย - Skull Effect
  if ((luckScore === 4 || luckScore === 44) && showEffect) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {/* Dark Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Floating Skulls - ตกลงมาแล้วเด้งบนพื้น */}
          {[...Array(22)].map((_, i) => {
            const startX = 5 + Math.random() * 90;
            const ground = 87;
            const horizontalDrift = (Math.random() - 0.5) * 30;
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: `${startX}%` }}
                initial={{
                  y: -120,
                  x: 0,
                  opacity: 0,
                  scale: 0,
                  rotate: -45,
                }}
                animate={{
                  y: [
                    -120,
                    ground,
                    ground - 26,
                    ground,
                    ground - 15,
                    ground,
                    ground - 8,
                    ground,
                  ],
                  x: [
                    0,
                    horizontalDrift * 0.3,
                    horizontalDrift * 0.5,
                    horizontalDrift * 0.7,
                    horizontalDrift * 0.85,
                    horizontalDrift,
                    horizontalDrift,
                    horizontalDrift,
                  ],
                  opacity: [0, 0.9, 0.9, 0.9, 0.8, 0.8, 0.7, 0],
                  scale: [0, 1.4, 1.8, 1.4, 1.6, 1.4, 1.3, 0],
                  rotate: [-45, 90, -30, 60, -15, 30, 0, 0],
                }}
                transition={{
                  duration: 4.3,
                  delay: i * 0.12,
                  times: [0, 0.28, 0.36, 0.48, 0.56, 0.68, 0.8, 1],
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Skull className="w-12 h-12 text-gray-400" />
              </motion.div>
            );
          })}

          {/* Center Skull */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            exit={{ scale: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="text-9xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              💀
            </motion.div>
            <div className="text-6xl font-bold text-gray-400 mt-4 drop-shadow-2xl">
              {luckScore}
            </div>
            <p className="text-3xl text-gray-300 mt-2 font-bold">
              เลขตาย! 😱
            </p>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return null;
}
