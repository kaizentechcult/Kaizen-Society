'use client';

import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import ProgressBar from '@/components/common/ProgressBar';

interface ChallengeHeaderProps {
  title: string;
  progress: number;
}

export default function ChallengeHeader({ title, progress }: ChallengeHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
      <div className="flex items-center">
        <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mr-3 sm:mr-4 flex-shrink-0" />
        <h1 className="text-2xl sm:text-4xl font-bold">{title}</h1>
      </div>
      <ProgressBar
        progress={progress}
        color="bg-gradient-to-r from-blue-500 to-blue-400"
        textColor="text-blue-400"
      />
    </div>
  );
} 