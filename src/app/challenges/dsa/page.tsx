'use client';

import { motion } from 'framer-motion';
import { Brain, CheckCircle2, ExternalLink, Code2, RefreshCw } from 'lucide-react';
import { useCompletedChallenges } from '@/hooks/useCompletedChallenges';
import { useTheme } from '@/contexts/ThemeContext';
import ProgressBar from '@/components/common/ProgressBar';
import { useEffect, useState } from 'react';
import CompletionConfetti from '@/components/CompletionConfetti';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Problem {
  _id: string;
  srNo: number;
  name: string;
  title: string;
  link: string;
  difficulty: Difficulty;
  category: 'DSA' | 'WebDev';
}

export default function DSAChallenges() {
  const { theme } = useTheme();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const { completedChallenges, toggleChallenge, isInitialized, progress } = useCompletedChallenges('dsa', problems.length);
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/problems?category=DSA');
      if (!response.ok) throw new Error('Failed to fetch problems');
      const data = await response.json();
      setProblems(data || []);
    } catch (error) {
      console.error('Error fetching problems:', error);
      setProblems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-400/10 text-emerald-400';
      case 'Medium':
        return 'bg-purple-400/10 text-purple-400';
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
      <Code2 className="w-16 h-16 mx-auto mb-6 text-purple-400/50" />
      <h3 className="text-xl font-semibold mb-3">No Challenges Available</h3>
      <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
        Looks like there aren&apos;t any DSA challenges at the moment.
        <br />Check back later or try refreshing the page.
      </p>
      <button
        onClick={fetchProblems}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-400/10 text-purple-400 hover:bg-purple-400/20 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh
      </button>
    </motion.div>
  );

  const LoadingState = () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400"></div>
    </div>
  );

  const handleToggle = (problemId: string) => {
    if (!isInitialized) return;
    
    const wasCompleted = completedChallenges.includes(problemId);
    if (!wasCompleted) {
      setShowConfetti(true);
      // Reset confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    toggleChallenge(problemId);
  };

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
          <div className="flex items-center">
            <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 mr-3 sm:mr-4 flex-shrink-0" />
            <h1 className="text-2xl sm:text-4xl font-bold">DSA Challenges</h1>
          </div>
          <ProgressBar
            progress={progress}
            color="bg-gradient-to-r from-purple-500 to-purple-400"
            textColor="text-purple-400"
          />
        </div>

        {loading ? (
          <LoadingState />
        ) : problems.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6">
            {problems.map((problem) => (
              <motion.div
                key={problem._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`rounded-xl p-6 relative group ${theme === 'dark'
                    ? 'bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-900/70'
                    : 'bg-gray-50/50 border border-gray-200 hover:bg-gray-100/50'
                  } transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 text-sm text-gray-500">
                      <span>#{problem.srNo}</span>
                      <span>•</span>
                      <span>{problem.name}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <a
                        href={problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-purple-400 transition-colors inline-flex items-center gap-2"
                      >
                        {problem.title}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <span className={`text-sm px-2 py-0.5 rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </h3>
                  </div>
                  <button
                    onClick={(e) => handleToggle(problem._id)}
                    className={`ml-4 p-2 rounded-lg transition-colors ${!isInitialized
                        ? 'opacity-50 cursor-not-allowed'
                        : theme === 'dark'
                          ? 'hover:bg-zinc-800'
                          : 'hover:bg-gray-100'
                      }`}
                  >
                    <CheckCircle2
                      className={`w-6 h-6 ${isInitialized && completedChallenges.includes(problem._id)
                          ? 'text-emerald-400'
                          : theme === 'dark'
                            ? 'text-zinc-600'
                            : 'text-gray-400'
                        }`}
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
} 