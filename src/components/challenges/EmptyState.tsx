'use client';

import { motion } from 'framer-motion';
import { Code2, RefreshCw } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface EmptyStateProps {
  onRefresh: () => void;
}

export default function EmptyState({ onRefresh }: EmptyStateProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-12 text-center ${
        theme === 'dark'
          ? 'bg-zinc-900/50 border border-zinc-800/50'
          : 'bg-gray-50/50 border border-gray-200'
      }`}
    >
      <Code2 className="w-16 h-16 mx-auto mb-6 text-blue-400/50" />
      <h3 className="text-xl font-semibold mb-3">No Challenges Available</h3>
      <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
        Looks like there are not any Web Development challenges at the moment.
        <br />Check back later or try refreshing the page.
      </p>
      <button
        onClick={onRefresh}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh
      </button>
    </motion.div>
  );
} 