'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Users, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  onRefresh: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export default function EmptyState({ onRefresh }: EmptyStateProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`text-center py-12 px-4 rounded-xl ${
        theme === 'dark'
          ? 'bg-zinc-900/50 border border-zinc-800/50'
          : 'bg-gray-50/50 border border-gray-200'
      }`}
    >
      <Users className="w-16 h-16 mx-auto mb-6 text-purple-400" />
      <h3 className={`text-xl font-bold mb-2 ${
        theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
      }`}>
        No Team Members Found
      </h3>
      <p className={`mb-6 ${
        theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
      }`}>
        We couldn&apos;t find any team members at the moment.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRefresh}
        className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
          theme === 'dark'
            ? 'bg-purple-500 hover:bg-purple-600 text-white'
            : 'bg-purple-100 hover:bg-purple-200 text-purple-900'
        }`}
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh
      </motion.button>
    </motion.div>
  );
} 