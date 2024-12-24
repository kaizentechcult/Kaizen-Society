'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function LoginButton() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const isChallengePage = pathname.includes('/challenges');

  return (
    <div className="relative z-50">
      {user ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 sm:gap-4 bg-zinc-900/80 backdrop-blur-sm rounded-lg p-2"
        >
          <span className="text-zinc-400 text-xs sm:text-sm hidden sm:block max-w-[150px] truncate">
            {user.email}
          </span>
          <button
            onClick={logout}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            Sign Out
          </button>
        </motion.div>
      ) : (
        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap
              ${isChallengePage 
                ? 'bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white'
                : 'bg-zinc-900 hover:bg-zinc-800 text-white'
              } rounded-lg transition-colors`}
          >
            Sign In
          </motion.button>
        </Link>
      )}
    </div>
  );
} 