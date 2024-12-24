'use client';

import { motion } from 'framer-motion';
import { Brain, CheckCircle2 } from 'lucide-react';
import { useCompletedChallenges } from '@/hooks/useCompletedChallenges';
import { useAuth } from '@/contexts/AuthContext';
import LoginButton from '@/components/LoginButton';
import ProgressBar from '@/components/common/ProgressBar';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const dsaChallenges: Challenge[] = [
  {
    id: 'dsa1',
    title: 'Two Sum',
    description: 'Find two numbers in an array that add up to a target sum.',
    difficulty: 'Easy'
  },
  {
    id: 'dsa2',
    title: 'Binary Tree Level Order Traversal',
    description: 'Implement level-order traversal of a binary tree.',
    difficulty: 'Medium'
  },
  {
    id: 'dsa3',
    title: 'Merge K Sorted Lists',
    description: 'Merge k sorted linked lists into one sorted linked list.',
    difficulty: 'Hard'
  },
];

export default function DSAChallenges() {
  const { user } = useAuth();
  const { completedChallenges, toggleChallenge, isInitialized, progress } = useCompletedChallenges('dsa', dsaChallenges.length);

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-emerald-400';
      case 'Medium':
        return 'text-purple-400';
      case 'Hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:py-16 sm:px-6 lg:px-8 pt-24 sm:pt-32">
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

        <div className="grid gap-6">
          {dsaChallenges.map((challenge) => (
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
                  onClick={() => toggleChallenge(challenge.id)}
                  className="ml-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <CheckCircle2
                    className={`w-6 h-6 ${completedChallenges.includes(challenge.id)
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