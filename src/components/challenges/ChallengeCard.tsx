'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, RefreshCw, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Problem, ProjectSubmission } from '@/types/challenges';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubmissionPopup from './SubmissionPopup';

interface ChallengeCardProps {
  problem: Problem;
  submission?: ProjectSubmission;
  submitting: boolean;
  onSubmit: (problemId: string, url: string) => Promise<boolean>;
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
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isCompleted = submission?.status === 'approved';
  const isPending = submission?.status === 'pending';
  const isWebDev = problem.category === 'WebDev';
  const hasSubmission = isCompleted || isPending;

  const handleSubmitClick = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (isWebDev) {
      setIsPopupOpen(true);
    } else {
      onSubmit(problem._id, '');
    }
  };

  const handlePopupSubmit = async (url: string) => {
    try {
      const success = await onSubmit(problem._id, url);
      if (success) {
        setIsPopupOpen(false);
      }
      return success;
    } catch (error) {
      console.error('Error submitting:', error);
      return false;
    }
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
                }`}
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

          {/* Action Button */}
          <button
            onClick={handleSubmitClick}
            disabled={submitting || hasSubmission}
            className={`flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${hasSubmission
              ? theme === 'dark'
                ? 'bg-zinc-800/50 text-zinc-500 cursor-not-allowed'
                : 'bg-gray-100/50 text-gray-500 cursor-not-allowed'
              : theme === 'dark'
                ? 'bg-zinc-800/50 hover:bg-zinc-800 text-zinc-100'
                : 'bg-gray-100/50 hover:bg-gray-200 text-gray-900'
              }`}
            title={!isAuthenticated ? 'Sign in to submit your project' : hasSubmission ? 'Project already submitted' : undefined}
          >
            {submitting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : isWebDev ? (
              <LinkIcon className="w-4 h-4" />
            ) : (
              <ExternalLink className="w-4 h-4" />
            )}
            {hasSubmission 
              ? (isPending ? 'Pending Review' : 'Completed') 
              : (isWebDev ? 'Submit Project' : 'Solve')}
          </button>
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

      {/* Submission Popup - Only for WebDev challenges */}
      {isWebDev && (
        <SubmissionPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handlePopupSubmit}
          submitting={submitting}
        />
      )}
    </>
  );
} 