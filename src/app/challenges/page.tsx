'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2, Brain, Trophy, Users, Timer, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const Challenges = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

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

  const stats = [
    {
      icon: <Trophy className="w-6 h-6 text-emerald-400" />,
      title: "Challenges Completed",
      value: "5000+"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Active Learners",
      value: "1000+"
    },
    {
      icon: <Timer className="w-6 h-6 text-blue-400" />,
      title: "Practice Hours",
      value: "10000+"
    }
  ];

  return (
    <div className={`min-h-screen py-16 px-4 pt-32 relative ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        {/* Hero Section */}
        <motion.div
          variants={cardVariants}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Master Your{" "}
            <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 text-transparent bg-clip-text">
              Craft
            </span>
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Take on real-world challenges, improve your skills, and build your portfolio
            with our curated collection of coding problems.
          </p>
          {!user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                Sign in to save your progress across devices
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Section */}


        {/* Challenge Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          <motion.div
            variants={cardVariants}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/10 to-blue-600/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Link href="/challenges/webdev">
              <div className={`p-8 rounded-xl relative h-full transition-colors ${
                theme === 'dark'
                  ? 'bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-900/50 border border-zinc-800/50 group-hover:border-emerald-500/30'
                  : 'bg-gradient-to-b from-gray-50 via-gray-50 to-gray-50/50 border border-gray-200 group-hover:border-emerald-500/30'
              }`}>
                <div className="flex items-center mb-6">
                  <Code2 className="w-8 h-8 text-emerald-400 mr-4" />
                  <h2 className="text-2xl font-bold">Web Development</h2>
                </div>
                <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Master modern web technologies through practical challenges. Build real-world
                  applications and improve your frontend & backend skills.
                </p>
                <div className="flex items-center text-emerald-400 group-hover:translate-x-2 transition-transform">
                  <span className="mr-2">Start Challenge</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-blue-600/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Link href="/challenges/dsa">
              <div className={`p-8 rounded-xl relative h-full transition-colors ${
                theme === 'dark'
                  ? 'bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-900/50 border border-zinc-800/50 group-hover:border-purple-500/30'
                  : 'bg-gradient-to-b from-gray-50 via-gray-50 to-gray-50/50 border border-gray-200 group-hover:border-purple-500/30'
              }`}>
                <div className="flex items-center mb-6">
                  <Brain className="w-8 h-8 text-purple-400 mr-4" />
                  <h2 className="text-2xl font-bold">DSA Challenges</h2>
                </div>
                <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Level up your problem-solving skills with our curated collection of DSA challenges.
                  From basic to advanced algorithms, we&apos;ve got you covered.
                </p>
                <div className="flex items-center text-purple-400 group-hover:translate-x-2 transition-transform">
                  <span className="mr-2">Start Challenge</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Challenges;