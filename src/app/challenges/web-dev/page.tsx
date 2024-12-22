'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Challenge } from '@/types';
import { Code2, Sparkles } from 'lucide-react';

const WebDevChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "Responsive Navigation Bar",
      description: "Create a responsive navigation bar that transforms into a hamburger menu on mobile devices.",
      difficulty: "Easy",
      completed: false
    },
    {
      id: 2,
      title: "Interactive Form Validation",
      description: "Build a form with real-time validation for email, password, and phone number fields.",
      difficulty: "Medium",
      completed: false
    },
    {
      id: 3,
      title: "Image Gallery with Filters",
      description: "Create an image gallery with category filters and smooth animations.",
      difficulty: "Medium",
      completed: false
    }
  ]);

  const toggleComplete = (id: number) => {
    setChallenges(challenges.map(challenge =>
      challenge.id === id ? { ...challenge, completed: !challenge.completed } : challenge
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 pt-32">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <Code2 className="w-12 h-12 text-emerald-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Web{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 text-transparent bg-clip-text">
              Development
            </span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            Master modern web technologies through practical challenges. Build real-world
            applications and improve your frontend & backend skills.
          </p>
        </motion.div>

        <motion.div className="space-y-6" variants={containerVariants}>
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/10 to-blue-600/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-900/50 p-8 rounded-xl border border-zinc-800/50 group-hover:border-emerald-500/30 transition-colors relative">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">
                      {challenge.title}
                    </h3>
                    <p className="text-zinc-400 mb-4">{challenge.description}</p>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm border ${challenge.difficulty === 'Easy'
                          ? 'border-emerald-500/30 text-emerald-400'
                          : challenge.difficulty === 'Medium'
                            ? 'border-blue-500/30 text-blue-400'
                            : 'border-red-500/30 text-red-400'
                        }`}>
                        {challenge.difficulty}
                      </span>
                      {challenge.completed && (
                        <span className="flex items-center text-emerald-400 text-sm">
                          <Sparkles className="w-4 h-4 mr-1" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <input
                      type="checkbox"
                      checked={challenge.completed}
                      onChange={() => toggleComplete(challenge.id)}
                      className="w-6 h-6 rounded-md border-2 border-emerald-500/50 checked:bg-emerald-500/50 
                        transition-colors cursor-pointer appearance-none checked:before:content-['✓'] 
                        checked:before:absolute checked:before:left-1/2 checked:before:top-1/2 
                        checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-1/2
                        checked:before:text-white"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};


export default WebDevChallenges; 