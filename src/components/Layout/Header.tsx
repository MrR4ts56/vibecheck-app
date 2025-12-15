import { UserButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, History } from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';

interface HeaderProps {
  showHistory?: boolean;
  onHistoryClick?: () => void;
}

/**
 * Header Component พร้อมปุ่ม Logout และโลโก้
 */
export function Header({ showHistory = false, onHistoryClick }: HeaderProps) {
  const { isAdmin } = useAdmin();
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 md:py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-white" />
          <h1 className="text-xl md:text-2xl font-bold text-white">
            VibeCheck
          </h1>
        </div>

        {/* Game Rule - Hidden on mobile */}
        <div className="hidden md:block">
          <p className="text-white/50 text-sm">
            เล่นได้วันละ 1 ครั้ง • ประวัติย้อนหลัง 7 วัน
          </p>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* History Button */}
          {showHistory && (
            <button
              onClick={onHistoryClick}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all text-white text-sm font-medium"
            >
              <History className="w-4 h-4" />
              <span className="hidden md:inline">ประวัติ</span>
            </button>
          )}

          {/* Admin Panel Button */}
          {isAdmin && (
            <a
              href="/admin"
              className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg transition-all text-purple-300 hover:text-purple-200 text-sm font-medium"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden md:inline">Admin</span>
            </a>
          )}

          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-10 h-10',
                userButtonPopoverCard: 'bg-black/90 backdrop-blur-xl border border-white/10',
                userButtonPopoverActionButton: 'hover:bg-white/10',
              },
            }}
          />
        </div>
      </div>
    </motion.header>
  );
}
