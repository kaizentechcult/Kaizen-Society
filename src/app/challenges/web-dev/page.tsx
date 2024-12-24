'use client';

import { motion } from 'framer-motion';
import { Code2, CheckCircle2 } from 'lucide-react';
import { useCompletedChallenges } from '@/hooks/useCompletedChallenges';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import ProgressBar from '@/components/common/ProgressBar';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const webDevChallenges: Challenge[] = [
  {
    id: 'web1',
    title: 'Responsive Portfolio',
    description: 'Create a responsive portfolio website using HTML, CSS, and JavaScript.',
    difficulty: 'Beginner'
  },
  {
    id: 'web2',
    title: 'Interactive Quiz App',
    description: 'Build a quiz application with multiple-choice questions and score tracking.',
    difficulty: 'Intermediate'
  },
  {
    id: 'web3',
    title: 'E-commerce Dashboard',
    description: 'Develop a dashboard for managing products, orders, and customer data.',
    difficulty: 'Advanced'
  },
];

export default function WebDevChallenges() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { completedChallenges, toggleChallenge, isInitialized, progress } = useCompletedChallenges('web-dev', webDevChallenges.length);

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-emerald-400';
      case 'Intermediate':
        return 'text-purple-400';
      case 'Advanced':
        return 'text-red-400';
      default:
        return theme === 'dark' ? 'text-zinc-400' : 'text-gray-400';
    }
  };

  return (
    <div className={`min-h-screen py-8 px-4 sm:py-16 sm:px-6 lg:px-8 pt-24 sm:pt-32 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
          <div className="flex items-center">
            <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 mr-3 sm:mr-4 flex-shrink-0" />
            <h1 className="text-2xl sm:text-4xl font-bold">Web Development Challenges</h1>
          </div>
          <ProgressBar 
            progress={progress}
            color="bg-gradient-to-r from-emerald-500 to-emerald-400"
            textColor="text-emerald-400"
          />
        </div>
        <div className="grid gap-6">
          {webDevChallenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`rounded-xl p-6 relative group ${
                theme === 'dark' 
                  ? 'bg-zinc-900/50 border border-zinc-800/50'
                  : 'bg-gray-50/50 border border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    {challenge.title}
                    <span className={`ml-3 text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </h3>
                  <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                    {challenge.description}
                  </p>
                </div>
                <button
                  onClick={() => isInitialized && toggleChallenge(challenge.id)}
                  className={`ml-4 p-2 rounded-lg transition-colors ${
                    !isInitialized 
                      ? 'opacity-50 cursor-not-allowed' 
                      : theme === 'dark'
                        ? 'hover:bg-zinc-800'
                        : 'hover:bg-gray-100'
                  }`}
                >
                  <CheckCircle2
                    className={`w-6 h-6 ${
                      isInitialized && completedChallenges.includes(challenge.id)
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
      </motion.div>
    </div>
  );
} 