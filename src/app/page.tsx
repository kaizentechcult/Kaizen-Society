'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto text-center"
        >
          {/* Logo Section */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <Image
              src="/logoK"
              alt="Kaizen Logo"
              width={120}
              height={120}
              className="mx-auto filter invert"
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Kaizen Community
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-zinc-400 text-xl md:text-2xl mb-6"
          >
            Continuous Improvement
          </motion.p>

          {/* About Section */}
          <motion.div
            variants={itemVariants}
            className="bg-zinc-900 rounded-xl p-8 mb-12 max-w-3xl mx-auto border border-zinc-800"
          >
            <h2 className="text-2xl font-bold text-white mb-4">About Kaizen</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Welcome to Kaizen Tech Community, where tech enthusiasts and innovators unite. From hackathons to deep-dive webinars (and fun quiz sessions), ideas ignite here. Whether you&quots;re here to grow skills, share knowledge, or connect with fellow techies, you&quots; ve found your tribe. Let&apos;s create magic with tech! ✨
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-6 justify-center mb-20"
          >
            <Link href="/challenges">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-900 to-emerald-800 text-white rounded-lg font-semibold text-lg transition-all border border-emerald-700 hover:border-emerald-600 hover:from-emerald-800 hover:to-emerald-700"
              >
                Start Challenges
              </motion.button>
            </Link>
            <Link href="/team">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-900 to-purple-800 text-white rounded-lg font-semibold text-lg transition-all border border-purple-700 hover:border-purple-600 hover:from-purple-800 hover:to-purple-700"
              >
                Meet the Team
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-8 bg-gradient-to-b from-zinc-900 to-blue-900/20 rounded-xl border border-blue-900/30 hover:border-blue-700/30 transition-all"
            >
              <div className="mb-4">
                <svg className="w-8 h-8 text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Web Development</h3>
              <p className="text-zinc-400">Master modern web technologies through practical challenges</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-8 bg-gradient-to-b from-zinc-900 to-emerald-900/20 rounded-xl border border-emerald-900/30 hover:border-emerald-700/30 transition-all"
            >
              <div className="mb-4">
                <svg className="w-8 h-8 text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">DSA</h3>
              <p className="text-zinc-400">Strengthen your problem-solving skills with algorithmic challenges</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-8 bg-gradient-to-b from-zinc-900 to-purple-900/20 rounded-xl border border-purple-900/30 hover:border-purple-700/30 transition-all"
            >
              <div className="mb-4">
                <svg className="w-8 h-8 text-purple-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community</h3>
              <p className="text-zinc-400">Connect with fellow developers and share your solutions</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}