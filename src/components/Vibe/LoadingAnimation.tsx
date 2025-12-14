import { motion } from 'framer-motion';

/**
 * Loading Animation แบบ Mystical Effect
 * แสดงระหว่างรอสุ่มดวง (2 วินาที)
 */
export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Spinning Orb */}
      <motion.div
        className="relative w-32 h-32"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Middle Ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-purple-400/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Glow */}
        <motion.div
          className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <p className="text-white/70 text-lg font-light">
          กำลังสุ่มดวง...
        </p>
        <motion.div
          className="flex gap-1 justify-center mt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="w-2 h-2 bg-white/50 rounded-full" />
          <span className="w-2 h-2 bg-white/50 rounded-full" />
          <span className="w-2 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
