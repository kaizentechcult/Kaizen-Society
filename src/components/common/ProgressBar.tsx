'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface ProgressBarProps {
  progress: number;
  color?: string;
  textColor?: string;
}

export default function ProgressBar({ progress, color, textColor }: ProgressBarProps) {
  const { theme } = useTheme();

  const defaultColor = theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600';
  const defaultTextColor = theme === 'dark' ? 'text-zinc-200' : 'text-gray-900';
  const labelColor = theme === 'dark' ? 'text-zinc-400' : 'text-gray-500';
  const bgColor = theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200';

  return (
    <div className="w-full sm:w-auto">
      <p className={`${labelColor} text-xs sm:text-sm mb-2`}>Progress</p>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className={`w-full sm:w-32 md:w-48 h-2 ${bgColor} rounded-full overflow-hidden`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className={color || defaultColor}
          />
        </div>
        <span className={`${textColor || defaultTextColor} text-xs sm:text-sm font-semibold whitespace-nowrap min-w-[40px] text-right`}>
          {progress}%
        </span>
      </div>
    </div>
  );
} 