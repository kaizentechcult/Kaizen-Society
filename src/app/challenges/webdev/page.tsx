'use client';

import { motion } from 'framer-motion';
import { Code2, CheckCircle2, RefreshCw, Link as LinkIcon } from 'lucide-react';
import { useCompletedChallenges } from '@/hooks/useCompletedChallenges';
import { useTheme } from '@/contexts/ThemeContext';
import ProgressBar from '@/components/common/ProgressBar';
import { useEffect, useState, useCallback } from 'react';
import CompletionConfetti from '@/components/CompletionConfetti';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Problem {
  _id: string;
  srNo: number;
  name: string;
  title: string;
  difficulty: Difficulty;
  category: 'DSA' | 'WebDev';
  topic: string;
}

interface ProjectSubmission {
  _id: string;
  problemId: string;
  deployedUrl: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function WebDevChallenges() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [submissions, setSubmissions] = useState<Record<string, ProjectSubmission>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const { completedChallenges, isLoading, progress } = useCompletedChallenges('web-dev', problems.length);
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/problems?category=WebDev');
      if (!response.ok) throw new Error('Failed to fetch problems');
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setProblems(result.data);
      } else {
        console.error('Invalid response format:', result);
        setProblems([]);
      }
    } catch (error) {
      console.error('Error fetching problems:', error);
      setProblems([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = useCallback(async () => {
    if (!user?.email) return;
    try {
      const response = await fetch(`/api/project-submission?email=${user.email}`);
      if (!response.ok) throw new Error('Failed to fetch submissions');
      const result = await response.json();
      if (result.success && Array.isArray(result.data.submissions)) {
        const submissionsMap = result.data.submissions.reduce((acc: Record<string, ProjectSubmission>, sub: ProjectSubmission) => {
          acc[sub.problemId] = sub;
          return acc;
        }, {});
        setSubmissions(submissionsMap);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetchSubmissions();
    }
  }, [user?.email, fetchSubmissions]);

  const handleSubmit = async (problemId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }

    const deployedUrl = prompt('Please enter your deployed project URL:');
    if (!deployedUrl) return;

    try {
      setSubmitting(problemId);
      const response = await fetch('/api/project-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          problemId,
          deployedUrl
        })
      });

      if (!response.ok) throw new Error('Failed to submit project');
      const result = await response.json();

      if (result.success) {
        await fetchSubmissions();
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('Failed to submit project. Please try again.');
    } finally {
      setSubmitting(null);
    }
  };

  const getTechnologyColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'html':
        return 'text-orange-400';
      case 'css':
        return 'text-blue-400';
      case 'javascript':
        return 'text-yellow-400';
      case 'react':
        return 'text-cyan-400';
      case 'node.js':
        return 'text-green-400';
      default:
        return theme === 'dark' ? 'text-zinc-400' : 'text-gray-400';
    }
  };

  const getDifficultyStyle = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-400/10 text-emerald-400';
      case 'Medium':
        return 'bg-blue-400/10 text-blue-400';
      case 'Hard':
        return 'bg-red-400/10 text-red-400';
      default:
        return theme === 'dark' ? 'text-zinc-400' : 'text-gray-400';
    }
  };

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-12 text-center ${theme === 'dark'
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
        onClick={fetchProblems}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh
      </button>
    </motion.div>
  );

  const LoadingState = () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
    </div>
  );

  return (
    <div className={`min-h-screen py-8 px-4 sm:py-16 sm:px-6 lg:px-8 pt-24 sm:pt-32 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
      }`}>
      {showConfetti && <CompletionConfetti isCompleted={true} />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
          <div className="flex items-center">
            <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mr-3 sm:mr-4 flex-shrink-0" />
            <h1 className="text-2xl sm:text-4xl font-bold">Web Development Challenges</h1>
          </div>
          <ProgressBar
            progress={progress}
            color="bg-gradient-to-r from-blue-500 to-blue-400"
            textColor="text-blue-400"
          />
        </div>

        {loading ? (
          <LoadingState />
        ) : problems.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4">
            {problems.map((problem) => {
              const submission = submissions[problem._id];
              const isCompleted = submission?.status === 'approved';
              const isPending = submission?.status === 'pending';

              return (
                <motion.div
                  key={problem._id}
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
                          <span className={getTechnologyColor(problem.topic)}>Topic:</span>
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

                    {/* Submit Button */}
                    <button
                      onClick={() => handleSubmit(problem._id)}
                      disabled={submitting === problem._id || isCompleted}
                      className={`flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isCompleted
                          ? theme === 'dark'
                            ? 'bg-zinc-800/50 text-zinc-500 cursor-not-allowed'
                            : 'bg-gray-100/50 text-gray-500 cursor-not-allowed'
                          : theme === 'dark'
                            ? 'bg-zinc-800/50 hover:bg-zinc-800 text-zinc-100'
                            : 'bg-gray-100/50 hover:bg-gray-200 text-gray-900'
                        }`}
                      title={!user ? 'Sign in to submit your project' : undefined}
                    >
                      {submitting === problem._id ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <LinkIcon className="w-4 h-4" />
                      )}
                      {isCompleted ? 'Completed' : 'Submit Project'}
                    </button>
                  </div>

                  {/* Submission URL */}
                  {submission?.deployedUrl && (
                    <div className={`px-4 pb-4 pt-0 -mt-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                      }`}>
                      <span className="text-sm">
                        Submitted URL: <a href={submission.deployedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{submission.deployedUrl}</a>
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}