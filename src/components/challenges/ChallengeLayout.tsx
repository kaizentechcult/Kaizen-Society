'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import CompletionConfetti from '@/components/CompletionConfetti';
import { Problem, ProjectSubmission } from '@/types/challenges';
import ChallengeCard from './ChallengeCard';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import ChallengeHeader from './ChallengeHeader';

interface ChallengeLayoutProps {
  title: string;
  progress: number;
  loading: boolean;
  problems: Problem[];
  submissions: Record<string, ProjectSubmission>;
  submitting: string | null;
  showConfetti: boolean;
  onSubmit: (problemId: string) => void;
  onRefresh: () => void;
  isAuthenticated: boolean;
}

export default function ChallengeLayout({
  title,
  progress,
  loading,
  problems,
  submissions,
  submitting,
  showConfetti,
  onSubmit,
  onRefresh,
  isAuthenticated
}: ChallengeLayoutProps) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen py-8 px-4 sm:py-16 sm:px-6 lg:px-8 pt-24 sm:pt-32 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      {showConfetti && <CompletionConfetti isCompleted={true} />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <ChallengeHeader title={title} progress={progress} />

        {loading ? (
          <LoadingState />
        ) : problems.length === 0 ? (
          <EmptyState onRefresh={onRefresh} />
        ) : (
          <div className="grid gap-4">
            {problems.map((problem) => (
              <ChallengeCard
                key={problem._id}
                problem={problem}
                submission={submissions[problem._id]}
                submitting={submitting === problem._id}
                onSubmit={() => onSubmit(problem._id)}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
} 