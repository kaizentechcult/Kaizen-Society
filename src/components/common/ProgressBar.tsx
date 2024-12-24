'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  color: string;
  textColor: string;
}

export default function ProgressBar({ progress, color, textColor }: ProgressBarProps) {
  return (
    <div className="w-full sm:w-auto">
      <p className="text-zinc-400 text-xs sm:text-sm mb-2">Progress</p>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="w-full sm:w-32 md:w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full ${color}`}
          />
        </div>
        <span className={`${textColor} text-xs sm:text-sm font-semibold whitespace-nowrap min-w-[40px] text-right`}>
          {progress}%
        </span>
      </div>
    </div>
  );
} 