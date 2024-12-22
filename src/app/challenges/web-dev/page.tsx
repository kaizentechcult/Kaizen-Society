'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Challenge } from '@/types';

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
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-12">Web Development Challenges</h1>
        
        <motion.div className="space-y-6" variants={containerVariants}>
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              variants={itemVariants}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                  <p className="text-gray-300 mb-4">{challenge.description}</p>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    challenge.difficulty === 'Easy' ? 'bg-green-500' :
                    challenge.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="checkbox"
                    checked={challenge.completed}
                    onChange={() => toggleComplete(challenge.id)}
                    className="w-6 h-6 rounded-md border-2 border-blue-500 checked:bg-blue-500"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WebDevChallenges; 