'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
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

const MemberLoading = ({ theme }: { theme: 'dark' | 'light' }) => {
  return (
    <div className={`p-8 rounded-xl animate-pulse ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-900/50 border border-zinc-800/50'
        : 'bg-gradient-to-b from-gray-50 via-gray-50 to-gray-50/50 border border-gray-200'
    }`}>
      <div className="flex flex-col items-center">
        <div className={`w-28 h-28 rounded-full mb-6 ${
          theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-200/50'
        }`}></div>
        <div className={`h-4 w-3/4 rounded mb-2 ${
          theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-200/50'
        }`}></div>
        <div className={`h-3 w-1/2 rounded mb-6 ${
          theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-200/50'
        }`}></div>
        <div className="flex gap-6">
          <div className={`w-6 h-6 rounded-full ${
            theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-200/50'
          }`}></div>
          <div className={`w-6 h-6 rounded-full ${
            theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-200/50'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export default function LoadingState() {
  const { theme } = useTheme();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1 }}
        >
          <MemberLoading theme={theme} />
        </motion.div>
      ))}
    </motion.div>
  );
} 