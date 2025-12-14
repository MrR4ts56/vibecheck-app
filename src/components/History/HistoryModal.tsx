import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { useHistory } from '../../hooks/useHistory';
import { getLuckLabel, createGradient } from '../../lib/vibeLogic';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal สำหรับแสดงประวัติ Vibe ย้อนหลัง 7 วัน
 */
export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  const { history, isLoading, loadHistory } = useHistory();

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[80vh] z-50"
          >
            <div className="glass-card h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-white/70" />
                  <h2 className="text-xl font-bold text-white">
                    ประวัติย้อนหลัง 7 วัน
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {isLoading ? (
                  <div className="text-center text-white/60 py-12">
                    กำลังโหลด...
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center text-white/60 py-12">
                    ยังไม่มีประวัติ
                  </div>
                ) : (
                  <div className="space-y-4">
                    {history.map((vibe, index) => {
                      const date = new Date(vibe.created_at);
                      const dateStr = date.toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      });
                      const gradient = createGradient(vibe.colors);
                      const luckLabel = getLuckLabel(vibe.luck_score);

                      return (
                        <motion.div
                          key={vibe.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors relative overflow-hidden"
                        >
                          {/* Background Gradient */}
                          <div
                            className="absolute inset-0 opacity-10"
                            style={{ background: gradient }}
                          />

                          <div className="relative z-10 flex items-center gap-4">
                            {/* Luck Score */}
                            <div className="flex-shrink-0 text-center">
                              <div className="text-3xl font-bold text-white">
                                {vibe.luck_score}
                                <span className="text-sm text-white/60">%</span>
                              </div>
                              <div className="text-xs text-white/60 mt-1">
                                {luckLabel}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-white/50 mb-1">
                                {dateStr}
                              </div>
                              <div className="text-white/90 text-sm line-clamp-2">
                                {vibe.fortune_text}
                              </div>
                              <div className="text-white/60 text-xs mt-1 truncate">
                                {vibe.song}
                              </div>
                            </div>

                            {/* Colors */}
                            <div className="flex gap-1 flex-shrink-0">
                              {vibe.colors.slice(0, 3).map((color, i) => (
                                <div
                                  key={i}
                                  className="w-6 h-6 rounded-full border border-white/20"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
