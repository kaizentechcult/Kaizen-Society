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
    <div className={`fixed top-20 right-12 z-50 ${isChallengePage ? 'md:right-8' : ''}`}>
      {user ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-sm rounded-lg p-2"
        >
          <span className="text-zinc-400 text-sm hidden md:block">{user.email}</span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors text-sm"
          >
            Sign Out
          </button>
        </motion.div>
      ) : (
        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 ${
              isChallengePage 
                ? 'bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600'
                : 'bg-zinc-900 hover:bg-zinc-800'
            } text-white rounded-lg transition-colors text-sm`}
          >
            {isChallengePage ? 'Sign in to Save Progress' : 'Sign In'}
          </motion.button>
        </Link>
      )}
    </div>
  );
} 