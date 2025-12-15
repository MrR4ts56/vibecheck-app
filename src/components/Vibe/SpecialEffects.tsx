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

  // 0 หรือ 100: Perfect Score - Fireworks
  if ((luckScore === 0 || luckScore === 100) && showEffect) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {/* Fireworks Effect */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
            >
              <Sparkles
                className={`w-8 h-8 ${
                  luckScore === 100 ? 'text-yellow-400' : 'text-purple-400'
                }`}
              />
            </motion.div>
          ))}

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

  // 69: Hot Face Emoji ตกลงมา
  if (luckScore === 69 && showEffect) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl"
              initial={{
                x: `${Math.random() * 100}%`,
                y: -100,
                rotate: 0,
              }}
              animate={{
                y: '110vh',
                rotate: 360,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.2,
                ease: 'linear',
              }}
            >
              🥵
            </motion.div>
          ))}

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
        <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center">
          <motion.div
            className="text-center"
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

          {/* Laughing Emoji Rain */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-5xl"
              initial={{
                x: `${10 + i * 10}%`,
                y: -50,
              }}
              animate={{
                y: '110vh',
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: i * 0.3,
              }}
            >
              😆
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    );
  }

  // 7 หรือ 77: Lucky Golden UI
  if ((luckScore === 7 || luckScore === 77) && showEffect) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 pointer-events-none z-40">
          {/* Golden Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-600/30 via-yellow-400/20 to-orange-600/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />

          {/* Sparkles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 2,
                repeat: 2,
              }}
            >
              ✨
            </motion.div>
          ))}

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
        <div className="fixed inset-0 pointer-events-none z-40">
          {/* Dark Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Floating Skulls */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
                rotate: 360,
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            >
              <Skull className="w-12 h-12 text-gray-400" />
            </motion.div>
          ))}

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
