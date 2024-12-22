'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6"
          >
            Learn. Code. Grow.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-300 text-xl md:text-2xl mb-12"
          >
            Join our community of developers and level up your coding skills with hands-on challenges
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <Link href="/challenges">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors"
              >
                Start Challenges
              </motion.button>
            </Link>
            <Link href="/team">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold text-lg transition-colors"
              >
                Meet the Team
              </motion.button>
            </Link>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            <motion.div 
              variants={itemVariants}
              className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-white mb-3">Web Development</h3>
              <p className="text-gray-400">Master modern web technologies through practical challenges</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-white mb-3">DSA</h3>
              <p className="text-gray-400">Strengthen your problem-solving skills with algorithmic challenges</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-white mb-3">Community</h3>
              <p className="text-gray-400">Connect with fellow developers and share your solutions</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
