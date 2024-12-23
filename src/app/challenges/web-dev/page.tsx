'use client';

import { motion } from 'framer-motion';
import { Code2, CheckCircle2 } from 'lucide-react';
import { useCompletedChallenges } from '@/hooks/useCompletedChallenges';
import { useAuth } from '@/contexts/AuthContext';

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
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <Code2 className="w-10 h-10 text-emerald-400 mr-4" />
            <h1 className="text-4xl font-bold">Web Development Challenges</h1>
          </div>
          <div className="text-right">
            <p className="text-zinc-400 mb-2">Progress</p>
            <div className="flex items-center gap-4">
              <div className="w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                />
              </div>
              <span className="text-emerald-400 font-semibold">{progress}%</span>
            </div>
          </div>
        </div>

        {!user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg"
          >
            <p className="text-zinc-400">
              Sign in to sync your progress across devices
            </p>
          </motion.div>
        )}

        <div className="grid gap-6">
          {webDevChallenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 relative group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    {challenge.title}
                    <span className={`ml-3 text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </h3>
                  <p className="text-zinc-400">{challenge.description}</p>
                </div>
                <button
                  onClick={() => isInitialized && toggleChallenge(challenge.id)}
                  className={`ml-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors ${
                    !isInitialized ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <CheckCircle2 
                    className={`w-6 h-6 ${
                      isInitialized && completedChallenges.includes(challenge.id)
                        ? 'text-emerald-400'
                        : 'text-zinc-600'
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