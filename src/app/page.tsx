'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';
import Hero from '@/components/home/Hero';
import FeaturesGrid from '@/components/home/FeaturesGrid';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export default function Home() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"
      >
        <motion.div
          variants={itemVariants}
          className="fixed left-0 top-0 flex w-full justify-center border-b pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4"
          whileHover={{
            boxShadow: theme === 'dark' 
              ? "0 0 20px rgba(168, 85, 247, 0.2)" 
              : "0 0 20px rgba(168, 85, 247, 0.1)"
          }}
        >
          <p className="flex w-full justify-center lg:static lg:w-auto">
            Welcome to{' '}
            <motion.span
              variants={itemVariants}
              className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 text-transparent bg-clip-text font-bold ml-2"
              animate={{ 
                backgroundPosition: ["0%", "100%"],
                transition: { 
                  duration: 5, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }
              }}
              style={{ backgroundSize: "200%" }}
            >
              Kaizen Society
            </motion.span>
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none"
        >
          <div className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
            By{' '}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-bold"
            >
              Kaizen Society
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      <Hero />
      <FeaturesGrid />
    </main>
  );
}