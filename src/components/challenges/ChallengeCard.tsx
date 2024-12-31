'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, RefreshCw, Link as LinkIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Problem, ProjectSubmission } from '@/types/challenges';
import { useState } from 'react';
import SubmissionPopup from './SubmissionPopup';

interface ChallengeCardProps {
  problem: Problem;
  submission?: ProjectSubmission;
  submitting: boolean;
  onSubmit: (url?: string) => void;
  isAuthenticated: boolean;
}

export function getDifficultyStyle(difficulty: 'Easy' | 'Medium' | 'Hard') {
  switch (difficulty) {
    case 'Easy': return 'bg-emerald-400/10 text-emerald-400';
    case 'Medium': return 'bg-blue-400/10 text-blue-400';
    case 'Hard': return 'bg-red-400/10 text-red-400';
    default: return '';
  }
}

export default function ChallengeCard({ problem, submission, submitting, onSubmit, isAuthenticated }: ChallengeCardProps) {
  const { theme } = useTheme();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isCompleted = submission?.status === 'approved';
  const isPending = submission?.status === 'pending';
  const isWebDev = problem.category === 'WebDev';

  const handleSubmit = (url?: string) => {
    onSubmit(url);
    setIsPopupOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`rounded-lg relative group ${theme === 'dark'
          ? 'bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50'
          : 'bg-gray-50/50 border border-gray-200 hover:bg-gray-100/50'
          } transition-colors`}
      >
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4">
          {/* Status */}
          <div
            className={`flex-shrink-0 p-1.5 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/50'
              }`}
            title={isPending ? 'Submission pending review' : isCompleted ? 'Challenge completed' : 'Not submitted yet'}
          >
            <CheckCircle2
              className={`w-5 h-5 ${isCompleted
                ? 'text-emerald-400'
                : isPending
                  ? 'text-yellow-400'
                  : theme === 'dark'
                    ? 'text-zinc-600'
                    : 'text-gray-400'
                } cursor-pointer`}
              onClick={isWebDev ? undefined : () => handleSubmit()}
            />
          </div>

          {/* Problem Details */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                #{problem.srNo}
              </span>
              <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-sm font-medium ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/50'
                }`}>
                <span>Topic:</span>
                <span className={`${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}`}>
                  {problem.topic}
                </span>
              </div>
              <span className={`text-sm px-2 py-0.5 rounded-full ${getDifficultyStyle(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <h3 className={`text-base font-medium ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                {problem.title}
              </h3>
            </div>
          </div>

          {/* Submit Button - Only show for WebDev challenges */}
          {isWebDev && (
            <button
              onClick={() => isAuthenticated && setIsPopupOpen(true)}
              disabled={submitting || isCompleted}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isCompleted
                ? theme === 'dark'
                  ? 'bg-zinc-800/50 text-zinc-500 cursor-not-allowed'
                  : 'bg-gray-100/50 text-gray-500 cursor-not-allowed'
                : theme === 'dark'
                  ? 'bg-zinc-800/50 hover:bg-zinc-800 text-zinc-100'
                  : 'bg-gray-100/50 hover:bg-gray-200 text-gray-900'
                }`}
              title={!isAuthenticated ? 'Sign in to submit your project' : undefined}
            >
              {submitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <LinkIcon className="w-4 h-4" />
              )}
              {isCompleted ? 'Completed' : 'Submit Project'}
            </button>
          )}
        </div>

        {/* Submission URL - Only show for WebDev challenges */}
        {isWebDev && submission?.deployedUrl && (
          <div className={`px-4 pb-4 pt-0 -mt-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
            }`}>
            <span className="text-sm">
              Submitted URL: <a href={submission.deployedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{submission.deployedUrl}</a>
            </span>
          </div>
        )}
      </motion.div>

      {/* Submission Popup */}
      <SubmissionPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </>
  );
} 