import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface MoodInputProps {
  onSubmit: (mood: string) => void;
  isLoading?: boolean;
}

/**
 * Component สำหรับให้ผู้ใช้พิมพ์ความรู้สึก
 * และกดปุ่ม "Check Vibe" เพื่อสุ่มดวง
 */
export function MoodInput({ onSubmit, isLoading }: MoodInputProps) {
  const [mood, setMood] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(mood);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="glass-card p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            วันนี้คุณรู้สึกยังไง?
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            เล่าความรู้สึกของคุณ แล้วเราจะทำนายดวงให้
          </p>
        </div>

        <textarea
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="เช่น: วันนี้รู้สึกดีมาก พร้อมไปเรื่อยๆ..."
          className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
          disabled={isLoading}
        />

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">
            {isLoading ? 'กำลังสุ่ม...' : 'Check Vibe'}
          </span>
        </motion.button>
      </form>
    </motion.div>
  );
}
