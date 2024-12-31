"use client";

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Users, Code2, Brain } from 'lucide-react';
import TeamGrid from '@/components/team/TeamGrid';
import LoadingState from '@/components/team/LoadingState';
import EmptyState from '@/components/team/EmptyState';
import { useEffect, useState } from 'react';
import { MemberType } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
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

export default function Team() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<MemberType[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setTeamMembers(data);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      setError(error instanceof Error ? error.message : 'Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const stats = [
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Techies",
      value: "650+"
    },
    {
      icon: <Brain className="w-6 h-6 text-blue-400" />,
      title: "Events Organized",
      value: "5+"
    }
  ];

  if (error) {
    return (
      <div className={`min-h-screen pt-32 flex items-center justify-center ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-32 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      {isMounted && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto px-4"
        >
          {/* Hero Section with Stats */}
          <div className="py-20">
            <motion.div
              variants={textVariants}
              className="text-center max-w-4xl mx-auto mb-16"
            >
              <motion.h1 
                className="text-5xl sm:text-7xl font-bold mb-6"
                variants={gradientVariants}
              >
                Our{" "}
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
                  Community
                </motion.span>
              </motion.h1>
              <motion.p 
                variants={textVariants}
                className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}
              >
                Meet the passionate individuals driving innovation and excellence at Kaizen Society.
                Together, we&apos;re building future with emerging technologies.
              </motion.p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={textVariants}
                  className={`backdrop-blur-sm rounded-xl p-6 text-center ${
                    theme === 'dark'
                      ? 'bg-zinc-900/50 border border-zinc-800/50'
                      : 'bg-gray-50/50 border border-gray-200'
                  }`}
                >
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                  <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>{stat.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Team Section */}
          <motion.div
            variants={textVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet the{" "}
              <span className="bg-gradient-to-r from-purple-400 to-emerald-400 text-transparent bg-clip-text">
                Active Contributors
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-emerald-400 mx-auto rounded-full mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            }`}>
              Our diverse team brings together expertise from various domains of software development,
              creating a powerhouse of innovation and creativity.
            </p>
          </motion.div>

          {/* Team Grid */}
          {loading ? (
            <LoadingState />
          ) : error ? (
            <EmptyState onRefresh={fetchTeamMembers} />
          ) : teamMembers.length > 0 ? (
            <TeamGrid members={teamMembers} />
          ) : (
            <EmptyState onRefresh={fetchTeamMembers} />
          )}
        </motion.div>
      )}
    </div>
  );
}