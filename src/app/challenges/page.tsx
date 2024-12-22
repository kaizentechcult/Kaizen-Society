'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Challenges = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-12">Coding Challenges</h1>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <Link href="/challenges/web-dev">
              <h2 className="text-2xl font-bold mb-4">Web Development Challenges</h2>
              <p className="text-gray-300">Practice your frontend and backend skills with real-world web development challenges.</p>
            </Link>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <Link href="/challenges/dsa">
              <h2 className="text-2xl font-bold mb-4">DSA Challenges</h2>
              <p className="text-gray-300">Improve your problem-solving skills with data structures and algorithms challenges.</p>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Challenges; 