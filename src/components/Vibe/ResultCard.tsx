import { motion } from 'framer-motion';
import { Heart, Music } from 'lucide-react';
import { createGradient, getLuckLabel } from '../../lib/vibeLogic';
import type { DailyVibe } from '../../lib/db';

interface ResultCardProps {
  vibe: DailyVibe;
}

/**
 * Component สำหรับแสดงผลลัพธ์ Vibe Check
 * แสดง Luck Score, Colors, Fortune, และ Song
 */
export function ResultCard({ vibe }: ResultCardProps) {
  const gradient = createGradient(vibe.colors);
  const luckLabel = getLuckLabel(vibe.luck_score);

  return (
    <motion.div
      id="vibe-result-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: gradient }}
        />

        {/* Content */}
        <div className="relative z-10 space-y-8">
          {/* Luck Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="text-6xl md:text-8xl font-bold text-white mb-2">
              {vibe.luck_score}
              <span className="text-3xl md:text-4xl text-white/60">%</span>
            </div>
            <div className="text-lg md:text-xl text-white/80 font-medium">
              {luckLabel}
            </div>
          </motion.div>

          {/* Color Palette */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-3"
          >
            {vibe.colors.map((color, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/30 shadow-lg"
                style={{ backgroundColor: color }}
              />
            ))}
          </motion.div>

          {/* Fortune Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-pink-400" />
              <span className="text-white/60 text-sm uppercase tracking-wider">
                คำทำนาย
              </span>
            </div>
            <p className="text-xl md:text-2xl text-white font-serif leading-relaxed">
              "{vibe.fortune_text}"
            </p>
          </motion.div>

          {/* Song */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center pt-6 border-t border-white/10"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Music className="w-4 h-4 text-purple-400" />
              <span className="text-white/60 text-xs uppercase tracking-wider">
                เพลงประจำวัน
              </span>
            </div>
            <p className="text-white/90 text-base md:text-lg">
              {vibe.song}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
