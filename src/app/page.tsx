'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';

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

const gradientVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const cardVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

const shimmerVariants = {
  initial: {
    backgroundPosition: "0 0"
  },
  animate: {
    backgroundPosition: "100% 100%",
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const,
      duration: 3
    }
  }
};

export default function Home() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      {isMounted && (
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
                variants={gradientVariants}
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
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex place-items-center"
      >
        <motion.div
          className="absolute inset-0 -z-10"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(45deg, rgba(168, 85, 247, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)'
              : 'linear-gradient(45deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            backgroundSize: "200% 200%"
          }}
        />
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl font-bold text-center mb-8"
        >
          Building the Future{' '}
          <motion.span
            className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 text-transparent bg-clip-text"
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
            Together
          </motion.span>
        </motion.h1>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left gap-6"
      >
        {[
          {
            title: 'Challenges',
            description: 'Test your skills with our coding challenges.',
            href: '/challenges'
          },
          {
            title: 'Events',
            description: 'Explore our comprehensive learning resources and tutorials.',
            href: '/events-hosted'
          },
          {
            title: 'Projects',
            description: 'Build real-world projects with our community.',
            href: '/projects'
          },
          {
            title: 'Team',
            description: 'Meet our passionate community members.',
            href: '/team'
          }
        ].map((item, index) => (
          <motion.a
            key={item.title}
            href={item.href}
            variants={cardVariants}
            whileHover="hover"
            className={`group rounded-xl border px-5 py-4 transition-all ${
              theme === 'dark'
                ? 'border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800/50 hover:border-zinc-700'
                : 'border-gray-200 bg-white/50 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className={`mb-3 text-2xl font-semibold ${
                theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
              }`}>
                {item.title}{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                {item.description}
              </p>
            </motion.div>
          </motion.a>
        ))}
      </motion.div>
    </main>
  );
}