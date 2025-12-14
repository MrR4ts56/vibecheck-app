import { motion } from 'framer-motion';
import { History } from 'lucide-react';

interface HistoryButtonProps {
  onClick: () => void;
}

/**
 * ปุ่มมุมขวาบนสำหรับเปิด History Modal
 */
export function HistoryButton({ onClick }: HistoryButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-4 right-20 md:top-6 md:right-24 z-40 btn-secondary flex items-center gap-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <History className="w-4 h-4" />
      <span className="hidden md:inline">ประวัติ 7 วัน</span>
    </motion.button>
  );
}
